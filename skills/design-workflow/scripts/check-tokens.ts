#!/usr/bin/env bun
/**
 * Gate determinístico: cada token do front matter do DESIGN.md mapeado em
 * `x-parity.cssVars` deve estar declarado com o valor EXATO no ESCOPO CSS
 * indicado. Semântica e limites (deliberados, sem parser CSS real):
 *   - só blocos de NÍVEL SUPERIOR contam; seletor-alvo aninhado em
 *     `@layer`/`@media` é REJEITADO explicitamente (não ignorado);
 *   - comentários/strings são mascarados só para estrutura e localização;
 *     o valor sai do CSS original com leitura quote-aware; comparação é
 *     LÉXICA EXATA (só trim/caixa/espaços): aspas CSS devem estar
 *     representadas no valor do token (delimitadores YAML não contam);
 *   - declarações duplicadas no escopo: a ÚLTIMA vence (semântica CSS) e é
 *     a única comparada — valor "em qualquer lugar" nunca passa.
 *
 * Config (front matter do DESIGN.md):
 *   x-parity:
 *     cssFile: "src/index.css"
 *     cssVars:
 *       colors.primary: { selector: ":root", var: "--primary" }
 *       darkColors.primary: { selector: ".dark", var: "--primary" }
 *       colors.border: "--border"        # atalho = selector ":root"
 *
 * Uso: bun check-tokens.ts --project <root> [--design DESIGN.md]
 * Sai 1 listando cada divergência token → escopo/var. Sem `cssVars`, no-op.
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

interface VarMapping {
  selector: string;
  var: string;
}

function arg(flag: string, fallback?: string) {
  const i = process.argv.indexOf(flag);
  return i >= 0 ? process.argv[i + 1] : fallback;
}

if (typeof Bun === "undefined" || !("YAML" in Bun)) {
  console.error("check-tokens: requer Bun >= 1.2.21 (Bun.YAML nativo)");
  process.exit(2);
}

const root = arg("--project", process.cwd())!;
const designPath = join(root, arg("--design", "DESIGN.md")!);

const design = readFileSync(designPath, "utf8");
const fm = design.match(/^---\n([\s\S]*?)\n---/);
if (!fm) {
  console.error(`Sem front matter em ${designPath}`);
  process.exit(2);
}
const yaml = Bun.YAML.parse(fm[1]) as Record<string, unknown>;
const parity = (yaml["x-parity"] ?? {}) as {
  cssFile?: string;
  cssVars?: Record<string, string | VarMapping>;
};

const entries = Object.entries(parity.cssVars ?? {});
if (entries.length === 0) {
  console.log("x-parity.cssVars ausente — nada a checar.");
  process.exit(0);
}
if (!parity.cssFile) {
  console.error("x-parity.cssVars presente mas x-parity.cssFile ausente.");
  process.exit(2);
}

const rawCss = readFileSync(join(root, parity.cssFile), "utf8");
// Duas visões com ÍNDICES ALINHADOS (máscara preserva comprimento):
//   structural — comentários E strings viram espaços: chaves/`;` dentro
//     deles não corrompem varredura nem localização de declarações;
//   content — só comentários mascarados: valores (inclusive quoted) são
//     extraídos daqui, nunca da cópia sem strings.
const blankNonNewline = (m: string) => m.replace(/[^\n]/g, " ");
const content = rawCss.replace(/\/\*[\s\S]*?\*\//g, blankNonNewline);
const structural = content.replace(/(["'])(?:\\.|(?!\1).)*\1/g, blankNonNewline);

interface ScopeScan {
  blocks: Array<{ start: number; end: number }>;
  nestedHits: number;
}

/**
 * Varredura estrutural rasa: só blocos de NÍVEL SUPERIOR contam como escopo.
 * Um seletor-alvo encontrado aninhado (`@layer { :root {…} }`, `@media`)
 * é registrado e REJEITADO adiante — este scanner não resolve contexto de
 * at-rules; para isso, use um parser CSS real.
 */
function scanScope(selector: string): ScopeScan {
  const result: ScopeScan = { blocks: [], nestedHits: 0 };
  let depth = 0;
  let headStart = 0;
  let blockStart = -1;
  let topSelector = "";
  for (let index = 0; index < structural.length; index++) {
    const char = structural[index];
    if (char === "{") {
      const selectorText = structural.slice(headStart, index).split("\n").at(-1)?.trim() ?? "";
      if (depth === 0) {
        topSelector = selectorText;
        blockStart = index + 1;
      } else if (selectorText === selector) {
        result.nestedHits++;
      }
      depth++;
      headStart = index + 1;
    } else if (char === "}") {
      depth--;
      if (depth === 0 && topSelector === selector) {
        result.blocks.push({ start: blockStart, end: index });
      }
      headStart = index + 1;
    }
  }
  return result;
}

/** Valor a partir de `from` no CSS original: para em `;`/`}` FORA de aspas. */
function readValue(from: number, until: number): string {
  let index = from;
  let quote = "";
  while (index < until) {
    const char = content[index];
    if (quote) {
      if (char === "\\") index++;
      else if (char === quote) quote = "";
    } else if (char === '"' || char === "'") quote = char;
    else if (char === ";" || char === "}") break;
    index++;
  }
  return content.slice(from, index);
}

function tokenValue(path: string) {
  let node: unknown = yaml;
  for (const key of path.split(".")) {
    if (node === null || typeof node !== "object") return undefined;
    node = (node as Record<string, unknown>)[key];
  }
  return typeof node === "string" || typeof node === "number" ? String(node) : undefined;
}
const normalize = (value: string) => value.trim().toLowerCase().replace(/\s+/g, " ");

const failures: string[] = [];
for (const [tokenPath, rawMapping] of entries) {
  const mapping: VarMapping =
    typeof rawMapping === "string" ? { selector: ":root", var: rawMapping } : rawMapping;
  const label = `${tokenPath} → ${mapping.selector} ${mapping.var}`;

  const expected = tokenValue(tokenPath);
  if (expected === undefined) {
    failures.push(`${label}: token inexistente no front matter`);
    continue;
  }
  const scan = scanScope(mapping.selector);
  if (scan.nestedHits > 0) {
    failures.push(
      `${label}: seletor "${mapping.selector}" aparece ANINHADO (@layer/@media) em ${parity.cssFile} — escopo aninhado não é suportado por este scanner; mova as vars para o nível superior ou use um parser CSS real`,
    );
    continue;
  }
  if (scan.blocks.length === 0) {
    failures.push(`${label}: seletor "${mapping.selector}" ausente em ${parity.cssFile}`);
    continue;
  }
  // Declarações LOCALIZADAS na visão structural (strings mascaradas não
  // produzem falsos `--x:`), valores EXTRAÍDOS da visão content (strings
  // intactas), via índices alinhados. Fronteira de DECLARAÇÃO à esquerda
  // (início do bloco ou `;`/`{`/`}`) — `--alias--primary:` não casa — e só
  // profundidade relativa 0: `--primary` dentro de regra aninhada
  // (`:root { .child { … } }`) NÃO é declaração do escopo-alvo.
  // Última declaração vence (CSS).
  const re = new RegExp(
    `(^|[;{}])\\s*${mapping.var.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*:`,
    "g",
  );
  const declarations = scan.blocks.flatMap((block) => {
    const slice = structural.slice(block.start, block.end);
    return [...slice.matchAll(re)].flatMap((match) => {
      const before = slice.slice(0, match.index);
      const boundary = match[1] === "{" ? 1 : match[1] === "}" ? -1 : 0;
      const depth =
        (before.match(/\{/g)?.length ?? 0) - (before.match(/\}/g)?.length ?? 0) + boundary;
      if (depth !== 0) return [];
      return [normalize(readValue(block.start + match.index + match[0].length, block.end))];
    });
  });
  const effective = declarations.at(-1);
  if (effective === undefined) {
    failures.push(`${label}: var ausente NESSE escopo`);
    continue;
  }
  if (effective !== normalize(expected)) {
    failures.push(`${label}: esperado "${expected}", efetivo "${effective}"`);
  }
}

if (failures.length > 0) {
  console.error(`${failures.length} divergência(s) token↔CSS:`);
  for (const failure of failures) console.error(`  ${failure}`);
  process.exit(1);
}
console.log(`check-tokens: OK (${entries.length} mapeamento(s), escopo exato)`);
