# Ground Truth Prototype (GitHub Pages temp)

Repo: `ruchitgarg/ground-truth-proto-temp`

## Pages URLs

- Inbox prototype: https://ruchitgarg.github.io/ground-truth-proto-temp/
- Capture prototype (default Hindi): https://ruchitgarg.github.io/ground-truth-proto-temp/capture.html
- Capture English: https://ruchitgarg.github.io/ground-truth-proto-temp/capture.html?l=en
- Capture Punjabi: https://ruchitgarg.github.io/ground-truth-proto-temp/capture.html?l=pa
- FPO links page: https://ruchitgarg.github.io/ground-truth-proto-temp/fpo-links.html

## What is implemented

### 1) `capture.html`
- Low-literacy and low-vision layout with large heading, large helper text, and very large CTA buttons.
- Visible language switch buttons (Hindi, English, Punjabi).
- URL query based language support: `?l=hi|en|pa`.
- URL updates immediately when user switches language.

### 2) `index.html` inbox prototype
- Top filters (phone, state, district, type, text search).
- Map pins with click-to-focus interaction.
- Compact list thumbnails.
- Click-to-detail larger preview on right panel.
- Stable loading: image fallback placeholders, no-break empty state, map size refresh and reset-map action.

### 3) `fpo-links.html`
- Reads static `fpo-links-data.json`.
- Uses all available rows in the file.
- Builds ready-to-send unique URLs in required format:
  - `capture.html?p=<phone>&l=<lang>`
- Clear filter UX (search, state, language, status).
- Status counts and badges (shown, total, ready, missing, per-language counts).

## Quick test instructions

### Local check (simple static server)

```bash
cd /tmp/gt-proto
python3 -m http.server 8080
```

Open:
- `http://localhost:8080/`
- `http://localhost:8080/capture.html?l=hi`
- `http://localhost:8080/capture.html?l=en`
- `http://localhost:8080/capture.html?l=pa`
- `http://localhost:8080/fpo-links.html`

### Curl/web-style smoke checks

```bash
curl -I http://localhost:8080/
curl -I http://localhost:8080/capture.html?l=hi
curl -I http://localhost:8080/fpo-links.html
```

After push (once GitHub Pages refreshes):

```bash
curl -I https://ruchitgarg.github.io/ground-truth-proto-temp/
curl -I https://ruchitgarg.github.io/ground-truth-proto-temp/capture.html?l=en
curl -I https://ruchitgarg.github.io/ground-truth-proto-temp/fpo-links.html
```
