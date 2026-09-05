# Providers — LLM, embeddings, auto-improve

The engine works with **zero** LLM calls (capture, FTS search, handoffs). An LLM adds
consolidation (observations → pages), lint by contradiction, auto-improve proposals and the
prose of `memory_explore`. Embeddings add the vector stream to hybrid search.

## Env matrix (engine container)

| Purpose | Variables | Notes |
|---|---|---|
| LLM | `AI_MEMORY_LLM_PROVIDER` (`anthropic`, `openai`, `openai-compat`, `gemini`, `copilot`, `openai-oauth`…), `AI_MEMORY_LLM_MODEL`, `AI_MEMORY_LLM_BASE_URL`, `LLM_API_KEY` | `openai-compat` covers OrcaRouter/OpenRouter-style gateways, Cloudflare Workers AI (`…/accounts/<id>/ai/v1`), Ollama, vLLM |
| LLM budget | `AI_MEMORY_LLM__MAX_INPUT_TOKENS` (default 100 000), `…MAX_OUTPUT_TOKENS` (32 000), consolidation chunk 24 000 | small-context models must lower both; sessions then get chunked and lose cross-chunk coherence |
| Embeddings | `AI_MEMORY_EMBEDDING_PROVIDER` (`openai`, `openai-compat`, `voyage`, `gemini`, `local`, `none`), `AI_MEMORY_EMBEDDING_MODEL`, `AI_MEMORY_EMBEDDING_DIM`, `AI_MEMORY_EMBEDDING_BASE_URL` | **2.0+: unset provider ⇒ `local` (all-MiniLM-L6-v2, 384-dim, English-only, ~87 MB download into `data/models/`).** Set it explicitly. |
| Embedding key | `EMBEDDING_API_KEY` → `OPENAI_API_KEY` → `LLM_API_KEY` (provider `openai`); `EMBEDDING_API_KEY` → `LLM_API_KEY` (`openai-compat`) | ≥1.34. Lets LLM and embeddings use different vendors |
| Auto-improve | `AI_MEMORY_AUTO_IMPROVE__SCHEDULER__ENABLED` (default **true** when an LLM exists), `AI_MEMORY_AUTO_IMPROVE__SCHEDULER__INTERVAL_SECS` (3600), `AI_MEMORY_AUTO_IMPROVE__REQUIRE_APPROVAL` (false) | with `require_approval=true` proposals wait in `_pending/auto-improve/`; review with `ai-memory pending-writes list|show|diff|approve|reject`, `/admin/pending-writes`, `/admin/auto-improve/report` |

Vectors are stored with their `(provider, model, dim)` triple; changing any of them makes
old vectors inert until re-embedded (`ai-memory embed --force`, or the startup backfill).

## Choosing an LLM for consolidation

- **Context:** typical sessions consolidate at 20–60k input tokens; 64k is comfortable,
  128k+ avoids chunking entirely. Output rarely exceeds 8k except project bootstraps.
- **Cost model:** per session ≈ `input_tokens × in_price + output_tokens × out_price`. At
  $0.07/M in and $0.25/M out a 60k/5k session is ~$0.006; 30 sessions/day ≈ $5/month. Cache
  reads (if the gateway offers them) cut input further. **Reasoning tokens bill as output**:
  disable reasoning (`reasoning_effort: none` or gateway default) — the engine does not send
  the parameter.
- **Quality bar:** the model must extract facts without inventing causality. Benchmark by
  consolidating the same 3–5 real sessions with each candidate and comparing pages; a model
  that narrates instead of writing actionable guidance, or hallucinates links between events,
  is disqualified regardless of price. Large local models (≥27B) are the floor for this in
  non-English wikis; 2–8B on-device models are not adequate.
- **Latency is irrelevant** (background), **error rate is not**: gateways with >5% errors drop
  consolidations silently — grep `provider error` in engine logs weekly.

## Choosing embeddings

- Multilingual wiki ⇒ multilingual model (`bge-m3` 1024d, `text-embedding-3-large` 3072d,
  `gemini-embedding-001` 3072d). The bundled `local` MiniLM is English-only.
- Volume is tiny: re-embedding a few thousand pages ≈ 2–3M tokens once; steady state is
  tens of thousands of tokens/day. Even the priciest hosted model costs cents/month — choose
  by quality and by not needing yet another vendor key.
- Local option without GPU: Ollama `bge-m3` (~1.3 GiB RAM loaded, unloads when idle) as
  `openai-compat` at `http://ollama:11434/v1`. Same model as the hosted bge-m3 ⇒ no quality loss.

## Local LLM: when it is worth it

CPU-only hosts (16 vCPU, AVX2) run a **MoE** 30B-class model quantized to Q4 at 15–25 tok/s
generation but only 100–400 tok/s prompt reading: a 60k-token consolidation is 3–5 min of
full CPU. Dense 27B models are 3–5 tok/s — impractical. vLLM/SGLang bring nothing on CPU
(batch-1, no Q4); llama.cpp/Ollama is the right engine. GPU rental (serverless, scale-to-zero)
costs ~$25–40/month for bursty consolidation; a hosted gateway at $0.07/M is 5–10× cheaper.
Rent a GPU only for privacy or model choice, and only after the quality benchmark above.

## Switching providers safely

1. LLM: change `AI_MEMORY_LLM_*` + `LLM_API_KEY`, recreate the engine, exercise a real call
   (`memory_explore` from a client) — a 401 shows there, not in the startup log. Keep the
   previous key in `.env.bak-*` for rollback.
2. Embeddings: change the triple, recreate, watch `startup embedding backfill` in the log or
   run `ai-memory embed --force`; until done, search degrades to FTS.
3. Transcribing keys from screenshots: verify with `GET <base>/v1/models` before deploying —
   `0`/`O` and `l`/`I` confusions are common.
