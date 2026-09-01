#!/usr/bin/env bun
/**
 * Gate determinístico: encontra utilitários de classe proibidos pelo
 * `x-parity` do DESIGN.md raiz do projeto.
 *
 * Config (front matter do DESIGN.md):
 *   x-parity:
 *     include: ["src"]                      # dirs varridos (relativos à raiz)
 *     exclude: ["**\/renderer/**"]          # sempre soma .test., locales por conta do projeto
 *     forbidden:
 *       - "text-(sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)(?![-\\w])"
 *       - "text-\\[[0-9.]+(px|rem)\\]"
 *     allowed: ["text-xs", "text-[11px]", "text-[0.625rem]", "text-[0.5625rem]"]
 *
 * Uso: bun check-classes.ts --project <root> [--design DESIGN.md]
 * Sai 1 listando file:line:token para cada violação.
 */
import { readdirSync, readFileSync, type Stats, statSync } from "node:fs";
import { join, relative } from "node:path";

function arg(flag: string, fallback?: string) {
  const i = process.argv.indexOf(flag);
  return i >= 0 ? process.argv[i + 1] : fallback;
}

const root = arg("--project", process.cwd())!;
if (typeof Bun === "undefined" || !("YAML" in Bun)) {
  console.error("check-classes: requer Bun >= 1.2.21 (Bun.YAML nativo)");
  process.exit(2);
}

const designPath = join(root, arg("--design", "DESIGN.md")!);

const design = readFileSync(designPath, "utf8");
const fm = design.match(/^---\n([\s\S]*?)\n---/);
if (!fm) {
  console.error(`Sem front matter em ${designPath}`);
  process.exit(2);
}
const yaml = Bun.YAML.parse(fm[1]) as Record<string, unknown>;
const parity = (yaml["x-parity"] ?? {}) as {
  allowed?: string[];
  exclude?: string[];
  forbidden?: string[];
  include?: string[];
};

if (!parity.forbidden?.length) {
  console.log("x-parity.forbidden ausente — nada a checar.");
  process.exit(0);
}

const include = parity.include ?? ["src"];
const exclude = parity.exclude ?? [];
const allowed = new Set(parity.allowed ?? []);
const forbidden = parity.forbidden.map((p) => new RegExp(p, "g"));
const extensions = new Set([".ts", ".tsx", ".jsx", ".vue", ".svelte", ".astro", ".html"]);

function globToRegExp(pattern: string) {
  const escaped = pattern.replace(/[.+^${}()|[\]\\]/g, "\\$&");
  const withGlobs = escaped
    .replaceAll("**", "\u0000")
    .replaceAll("*", "[^/]*")
    .replaceAll("\u0000", ".*");
  return new RegExp(`^${withGlobs}$`);
}

const excludeRes = exclude.map(globToRegExp);

function excluded(path: string) {
  const rel = relative(root, path);
  if (/\.(test|spec)\./.test(rel)) return true;
  return excludeRes.some((re) => re.test(rel));
}

function* walk(dir: string): Generator<string> {
  for (const entry of readdirSync(dir)) {
    if (entry === "node_modules" || entry.startsWith(".")) continue;
    const full = join(dir, entry);
    const stats = statSync(full);
    if (stats.isDirectory()) yield* walk(full);
    else if (extensions.has(full.slice(full.lastIndexOf(".")))) yield full;
  }
}

const includeDirs: string[] = [];
for (const base of include) {
  const dir = join(root, base);
  let stats: Stats;
  try {
    stats = statSync(dir);
  } catch {
    console.error(`x-parity.include aponta para diretório ausente: ${base}`);
    process.exit(2);
  }
  if (!stats.isDirectory()) {
    console.error(`x-parity.include não é diretório: ${base}`);
    process.exit(2);
  }
  includeDirs.push(dir);
}

const violations: string[] = [];
for (const dir of includeDirs) {
  for (const file of walk(dir)) {
    if (excluded(file)) continue;
    const lines = readFileSync(file, "utf8").split("\n");
    lines.forEach((line, index) => {
      for (const re of forbidden) {
        re.lastIndex = 0;
        for (const match of line.matchAll(re)) {
          if (allowed.has(match[0])) continue;
          violations.push(`${relative(root, file)}:${index + 1}: ${match[0]}`);
        }
      }
    });
  }
}

if (violations.length > 0) {
  console.error(`${violations.length} violação(ões) de vocabulário:`);
  for (const violation of violations) console.error(`  ${violation}`);
  process.exit(1);
}
console.log("check-classes: OK");
