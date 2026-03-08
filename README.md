# Ground Truth Prototype (GitHub Pages temp)

Repo: `ruchitgarg/ground-truth-proto-temp`

## Pages URLs

- Inbox prototype: https://ruchitgarg.github.io/ground-truth-proto-temp/
- Capture prototype (default Hindi): https://ruchitgarg.github.io/ground-truth-proto-temp/capture.html
- FPO links page: https://ruchitgarg.github.io/ground-truth-proto-temp/fpo-links.html
- Disease hotspot map: https://ruchitgarg.github.io/ground-truth-proto-temp/disease-hotspot.html

## What is implemented

### 1) `capture.html`
- Low-literacy and low-vision layout with large heading, large helper text, and very large CTA buttons.
- Visible language switch buttons (Hindi, English, Punjabi).
- Browser language auto-detect (falls back to Hindi).
- Manual language switch buttons (Hindi, English, Punjabi) update UI instantly.
- Backward compatible with old URLs that include `?l=` and/or `?p=`; these are cleaned from the address bar.

### 2) `index.html` inbox prototype
- Top filters (phone, state, district, type, text search).
- Map pins with click-to-focus interaction.
- Compact list thumbnails.
- Click-to-detail larger preview on right panel.
- Stable loading: image fallback placeholders, no-break empty state, map size refresh and reset-map action.

### 3) `fpo-links.html`
- Reads static `fpo-links-data.json`.
- Uses all available rows in the file.
- Builds ready-to-send unique URLs in v2 format:
  - `capture.html?fpo=<identifier>`
- Adds queue scaffolding for FPO WhatsApp dispatch with a dedicated namespace:
  - Config source: `fpo-whatsapp-queue-config.json`
  - Utility: `queue-utils.js`
  - Per-row deterministic queue key: `whatsapp.fpo.capture.v1:<phone>:<lang>`
- Anti-ban controls are centrally configurable:
  - `rateLimitPerSecond`, `burstCap`, jitter range, retry/backoff policy
- Clear filter UX (search, state, language, status).
- Status counts and badges (shown, total, ready, missing, per-language counts).

### 4) `disease-hotspot.html`
- Hotspot page now uses ingestion-first loading scaffold.
- Reads endpoint from query param `?ingest=<url>` (default `./hotspot-cases.json`).
- Accepts either array payload or `{ cases: [...] }` payload.
- Normalizes ingestion records (`lat/lng` aliases, severity normalization, field fallbacks).
- Falls back to static local fixture when ingestion is unavailable or invalid.
- Source badge shows whether data came from ingestion or fallback.

## Quick test instructions

### Local check (simple static server)

```bash
cd /tmp/gt-proto
python3 -m http.server 8080
```

Open:
- `http://localhost:8080/`
- `http://localhost:8080/capture.html`
- Legacy check: `http://localhost:8080/capture.html?l=en&p=9999999999`
- `http://localhost:8080/fpo-links.html`
- `http://localhost:8080/disease-hotspot.html`
- `http://localhost:8080/disease-hotspot.html?ingest=./hotspot-cases.json`

### Curl/web-style smoke checks

```bash
curl -I http://localhost:8080/
curl -I http://localhost:8080/capture.html
curl -I http://localhost:8080/fpo-links.html
```

After push (once GitHub Pages refreshes):

```bash
curl -I https://ruchitgarg.github.io/ground-truth-proto-temp/
curl -I https://ruchitgarg.github.io/ground-truth-proto-temp/capture.html
curl -I https://ruchitgarg.github.io/ground-truth-proto-temp/fpo-links.html
```
