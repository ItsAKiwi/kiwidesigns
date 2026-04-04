# KiwiDesigns — Project Handoff Document
**Last updated:** 2026-04-03
**Repo:** https://github.com/ItsAKiwi/kiwidesigns
**Live site:** https://itsakiwi.github.io/kiwidesigns/index-2.html
**Stack:** React 18 (Babel inline JSX), Tailwind CDN, vanilla CSS, WebGL canvas

---

## File Map

```
J:\kiwidesigns\
├── index-2.html          ← PRIMARY FILE — active portfolio page (~1,300 lines)
├── index.html            ← Original v1 page (kept, not active)
├── gamer-community.html  ← Full case study page
├── css/styles.css        ← Shared base styles (Industrial Zen × Wukong theme)
├── images/               ← All assets (see list below)
├── js/app.js             ← Unused legacy JS
└── index-2-content.txt  ← Plain text dump of all page content (for copy editing)
```

### Images
| File | Used in |
|------|---------|
| `Video.mp4` | Hero background video |
| `Mountain Silhouette.png` | Expertise section bottom-right decoration |
| `Gamer-Community-Preview.png` | Selected Work — Project 01 card image |
| `GC-header-frame2.png` | gamer-community.html hero |
| `Claude.png` / `Gemini.png` / `Notebook LM.png` / `Stitch.png` / `Lovart.png` / `Figma Make.png` / `Krea AI.png` | AI Tools carousel |
| `Mountain-Silhouette_V.png` / `Cloud-Effect.png` | Available, unused in index-2 |

---

## index-2.html Architecture

The file is a single HTML file with:
- **Inline `<style>`** block — all index-2-specific CSS
- **React components** in a `<script type="text/babel">` block
- **WebGL water cursor** in a plain `<script>` at the bottom

### React Component Tree
```
App
├── Nav
├── Hero
├── ServicesGrid       ← "Expertise" section
├── AIToolsStrip
├── SelectedWork
│   └── WorkCard (×3) ← liquid glass hover glow component
├── About
└── Footer
```

### Key Design Tokens
| Token | Value | Where |
|-------|-------|-------|
| Background | `#0A0C10` | Body |
| Brand cyan | `#3FB1FF` | Accents, spine glow |
| Gold | `#E8B82A` | Borders, links, eyebrow text |
| Body font | `DM Sans` | All prose |
| Display font | `Noto Serif SC` | Expertise titles, 留白 |

---

## Section-by-Section State

### Nav
- Fixed top, `backdrop-filter: blur`
- Logo: "KiwiDesigns" → links to index-2.html
- Links: About, Work, View Work (CTA button)

### Hero
- Full-viewport (`min-height: 100vh`), dark `#0A0C10` bg
- `Video.mp4` behind content (`mix-blend-mode: screen`, 62.5vw wide, fades at 68% height)
- Gradient blur backdrop div: transparent at top → fully opaque at `52vh` → fades out at bottom
- Text container starts at `paddingTop: 52vh`
- Title: **"Architecting / Digital Ecosystems"** — line break after "Architecting", "Digital" is faded (`rgba(255,255,255,0.28)`)
- Body: *"I bridge technical utility and social growth to solve for long-term retention..."*
- Eyebrow "Portfolio — 2024" **removed**

### Expertise (ServicesGrid)
- Background: `transparent` (inherits page `#0A0C10`)
- 3 columns side-by-side, `flex-row`, divided by thin `rgba(255,255,255,0.06)` rules
- Left-aligned text within each column
- **留白** watermark: `font-weight: 700`, `9rem`, `color: #888`, `opacity: 0.075`, positioned `top: 20%`, `right: 3.5rem`
- **Mountain Silhouette**: `bottom: -55%` (only ~45% visible), `opacity: 0.126`, left edge fades via `mask-image`
- Vertical spine and vertical 留白 removed in earlier iteration

### AI Tools Carousel
- Seamless loop: 4× array copies, `translateX(-25%)` infinite
- `padding: 6.25rem 0` top and bottom (symmetric)
- Images at `height: 28px`, no borders/backgrounds

### Selected Work
- Centered container: `max-width: 85vw; margin: 0 auto`
- Header: "Selected Work" — centered
- 3 cards, each a dark glass strip (`rgba(6,8,11,0.35)`, `backdrop-filter: blur(12px)`)
- **Liquid glass hover glow**: `WorkCard` component tracks `mousemove`, sets `--mx`/`--my` CSS vars, `::before` renders `radial-gradient(circle 280px)` cyan glow following cursor
- Card grid: `1fr 1fr`, image left / content right

#### Projects
| # | Title | Year | Status |
|---|-------|------|--------|
| 01 | Gamer Community Platform | 2024 | Links to `gamer-community.html` |
| 02 | Newegg.ai | 2025 | "Case Study Coming Soon" |
| 03 | The Digital Aura Engine | 2025 | Links to `#` (placeholder) |

### About
- Two-column layout (text left, meta right)
- Philosophy: "World Building through Strategic Restraint"

### Footer
- CTA: "Ready to build something remarkable? / Let's create a Digital Citadel."
- mailto: hello@kiwidesigns.com
- Links: Work, About, LinkedIn, Dribbble

---

## WebGL Water Cursor Effect

Located at the bottom of `index-2.html` inside a plain `<script>` tag.

**How it works:**
- Canvas2D calligraphy brush also runs on `#fluid-canvas` (still present)
- WebGL simulation: 2D finite-difference wave equation on 256×256 float texture
- Mouse movement injects a Gaussian energy splat; ripples propagate + damp over ~2s
- Render pass: surface gradient (edge detection) → rendered as dark glass + icy cyan light-fracture highlights (`vec3(0.55, 0.80, 1.0)`) at wave crests
- Canvas: `position:fixed`, `pointer-events:none`, `z-index:9999`
- Requires `OES_texture_float` WebGL extension

---

## gamer-community.html State

- Left fixed scroll nav: 10 sections, gold `#E8B82A`, shine-once on hover
- Hero: two-column with `GC-header-frame2.png`
- All `<p>` at 18px
- Section 02 "Vertical Altar" design with spirit thread
- No quote wrappers, no goal-dots, no max-width constraints

---

## Git History (recent)
```
2792233  Cards 85vw wide, background opacity 0.35
3c6d814  Cards darker than bg; hover glow is perfect circle 280px
0154198  Selected Work: centered cards with liquid glass hover glow
b954e79  Shift blur backdrop gradient anchor 38vh → 52vh
660d590  Rebuild expertise shrine, update selected work
5dc1134  Replace brush with WebGL water surface disturbance cursor
9c59d96  Expertise 3-col row, hero bg, mountain clip, 留白 pattern
```

---

## Known Gotchas

- **React loads via CDN Babel** — no bundler. External `.js` files won't work over `file://`; all component code must stay inline in the `<script type="text/babel">` block.
- **WebGL float textures** — the water cursor requires `OES_texture_float`. Falls back silently if unavailable (mobile).
- **CSS `!important` for Tailwind** — `section { padding-bottom: 6.25rem !important }` in `styles.css` overrides Tailwind utility classes.
- **Three.js CDN** (if ever needed): use `https://cdnjs.cloudflare.com/ajax/libs/three.js/0.160.0/three.min.js` — v0.168.0 does not exist.
- **Image filenames with spaces**: `Notebook LM.png`, `Figma Make.png`, `Krea AI.png` — safe in `src` attributes, browsers handle it.

---

## Pending / Open Items

- Digital Aura Engine case study page (`href="#"` placeholder)
- Newegg.ai case study page (marked "Coming Soon")
- Mobile responsive pass for index-2.html
- `index-2-content.txt` is outdated — hero copy and section titles changed after it was written
