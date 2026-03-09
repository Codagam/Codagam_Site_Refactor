# Codagam Website Theme Colors – Full Reference

This document describes every theme color used across the site and where it is applied.

---

## 1. Core CSS Variables (defined in `src/index.css`)

### Backgrounds
| Variable | Value | Usage |
|----------|-------|--------|
| `--bg-deep` | `#0a1245` | Main page background, nav, footer base, dark sections, scrollbar track |
| `--bg-mid` | `#0d165a` | Mid-tone backgrounds, gradients |
| `--bg-card` | `rgba(17, 29, 106, 0.6)` | Card/surface backgrounds on dark sections |

### Accent (blue family)
| Variable | Value | Usage |
|----------|-------|--------|
| `--accent` | `#5b8dee` (theme) / oklch in :root | Primary blue; TrustSection quote mark |
| `--acc2` | `#7aaaf5` | Main accent: headings emphasis, CTAs, links, icons, badges, borders |
| `--acc3` | `#a3c4f9` | Lighter accent: tags, secondary highlights |

### Text
| Variable | Value | Usage |
|----------|-------|--------|
| `--text-dim` | `rgba(255, 255, 255, 0.42)` | Muted body text, captions, secondary copy |
| `--text-mid` | `rgba(255, 255, 255, 0.62)` | Medium emphasis body text |
| `--text-hi` | `rgba(255, 255, 255, 0.88)` | High-contrast text on dark |

### Borders
| Variable | Value | Usage |
|----------|-------|--------|
| `--border` | `rgba(255, 255, 255, 0.08)` | Section dividers, card borders, subtle lines |
| `--border-hi` | `rgba(255, 255, 255, 0.15)` | Stronger borders on hover/focus |

### Effects
| Variable | Value | Usage |
|----------|-------|--------|
| `--glow` | `rgba(91, 141, 238, 0.15)` | Glow effects (accent tint) |

### Typography
| Variable | Value | Usage |
|----------|-------|--------|
| `--font-serif` | `"Fraunces", Georgia, serif` | Headings (h1–h4) |
| `--font-sans` | `"DM Sans", sans-serif` | Body, UI labels, nav |

---

## 2. Hardcoded Colors (used in components)

These are used where a specific opacity or one-off value is needed:

| Color | Where used |
|-------|------------|
| `#fff` / `white` | Body text, headings, nav logo, buttons, links on dark |
| `rgba(10,18,69,...)` | Hero overlay, nav bar, footer, section gradients, cards |
| `rgba(13,22,90,...)` | Section gradients (ServicesSection) |
| `rgba(8,14,56,...)` | Marquee strip, ProcessSection background |
| `rgba(6,10,38,.98)` | Footer background |
| `rgba(91,141,238,...)` | Accent glows, gradients, hover states, scrollbar thumb |
| `rgba(122,170,245,...)` | ProcessSection gradient, CanvasBackground |
| `rgba(44,210,252,.18)` | CTA section gradient (cyan tint) |
| `rgba(17,29,106,...)` | Card backgrounds |
| `rgba(26,47,142,...)` | TrustSection gradient, hover states |
| `rgba(20,35,120,...)` | Card hover backgrounds |
| `white/30`, `white/40`, `white/45`, etc. | Eyebrows, links, icons, muted text |
| `bg-blue-100` | PromiseSection, WorkSection (light contrast sections) |
| `text-slate-700`, `text-slate-800`, `border-slate-200` | Light-section body text and borders |

---

## 3. Section-by-Section Color Usage

### Global (index.css)
- **body**: `background: var(--bg-deep)`, `color: #fff`, `font-family: var(--font-sans)`
- **Scrollbar**: track `var(--bg-deep)`, thumb `rgba(91, 141, 238, 0.3)`
- **h1–h4**: `font-family: var(--font-serif)`

### Hero
- Overlay: `rgba(10,18,69,...)` gradients (from/via/to)
- Badge: `text-[var(--acc2)]`, `bg-[rgba(5,12,55,.92)]`, `border-white/12`
- Dot: `bg-[var(--acc2)]`, `shadow-[0_0_7px_var(--acc2)]`
- Headline: `text-white`, `[&_em]:text-[var(--acc2)]`
- Subtext: `text-[var(--text-dim)]`
- Primary button: `bg-white`, `!text-[var(--bg-deep)]`, hover `bg-[var(--acc2)]`
- Secondary link: `text-[var(--text-dim)]`, `border-white/15`, hover `text-white`, `border-white/35`

### Nav
- Bar: `bg-[rgba(10,18,69,.94)]`, `border-[var(--border)]`
- Logo: `text-white`, `[&_span]:text-[var(--acc2)]`
- Links: `text-white/45`, hover `text-white`, `bg-white/[.07]`
- CTA button: `bg-white/[.08]`, `border-white/20`, hover `!bg-white`, `!text-[var(--bg-deep)]`
- Mobile menu: `bg-[var(--bg-deep)]`, same link/button styles

### MarqueeStrip
- Background: `bg-[rgba(8,14,56,.98)]`, `border-[var(--border)]`
- Items: `text-white/30`, separator `text-[var(--acc2)]`

### SectionHeader (SectionEyebrow, SectionTitle, SectionSub)
- Eyebrow: `text-white/30`, `before:bg-[var(--acc2)]`
- Title: `text-white`, `[&_em]:text-[var(--acc2)]`
- Sub: `text-[var(--text-dim)]`

### TrustSection
- Section bg: `radial-gradient(..., rgba(26,47,142,.35)...)`, `var(--bg-deep)`, `border-[var(--border)]`
- Card: `bg-[var(--bg-card)]`, `border-[var(--border)]`
- Quote mark: `text-[var(--accent)]` (opacity 20%)
- Body: `text-[var(--text-mid)]`
- Cite: `text-white/30`
- Stat items: `border-[var(--border)]`, icon box `bg-[rgba(91,141,238,.1)]`, `border-[rgba(91,141,238,.2)]`, `text-[var(--acc2)]`
- Stat title: `text-white`, body `text-[var(--text-dim)]`

### ProcessSection
- Section bg: `radial-gradient(..., rgba(122,170,245,.24)...)`, `rgba(8,14,56,.98)`, `border-[var(--border)]`
- Step grid: `bg-[var(--border)]`, cells `bg-[rgba(10,18,69,.95)]`, hover `bg-[rgba(20,35,120,.45)]`
- Step number: `text-white/[.08]`, title `text-white`, text `text-[var(--text-dim)]`
- Security cards: `bg-[var(--bg-card)]`, `border-[var(--border)]`, hover `bg-[rgba(26,47,142,.4)]`, `border-[var(--border-hi)]`
- Icon: `text-[var(--acc2)]`, text `text-[var(--text-dim)]`

### PromiseSection (light section)
- Section: `bg-blue-100`
- Title: `text-[var(--bg-deep)]`, `[&_em]:text-[var(--acc2)]`
- Body: `text-slate-800`, `[&_em]:text-[var(--acc2)]`
- Cards: `bg-white/95`, `border-slate-200`, hover `hover:bg-slate-50`, `hover:border-slate-300`
- Icon: `text-[var(--acc2)]`, title `text-[var(--bg-deep)]`, body `text-slate-700`

### ServicesSection
- Section: `bg-gradient-to-b from-[rgba(13,22,90,.9)] to-[var(--bg-deep)]`, `border-[var(--border)]`
- Side card: `bg-[var(--bg-card)]`, `border-[var(--border)]`, labels `text-white/30`, icon `bg-[rgba(91,141,238,.15)]`, `text-[var(--acc2)]`, title `text-[var(--text-hi)]`, body `text-[var(--text-dim)]`
- Service cards grid: `bg-[var(--border)]`, cards `bg-[rgba(10,18,69,.95)]`, hover `bg-[rgba(20,35,120,.6)]`, icon `text-[var(--acc2)]`, eyebrow `text-[var(--acc2)]`, `bg-[rgba(91,141,238,.12)]`, body `text-[var(--text-dim)]`
- Tags: `bg-[rgba(91,141,238,.08)]`, `border-[rgba(91,141,238,.2)]`, `text-[var(--acc3)]`
- Bottom CTA strip: `bg-[rgba(91,141,238,.06)]`, `border-[rgba(91,141,238,.18)]`, `[&_em]:text-[var(--acc2)]`

### WorkSection (light section)
- Section: `bg-blue-100`, `border-[var(--border)]`
- Title: `text-[var(--bg-deep)]`, `[&_em]:text-[var(--acc2)]`
- Cards: `bg-white/95`, `border-slate-200`, hover `hover:bg-slate-50`, `hover:border-slate-300`
- Number: `text-slate-200`, eyebrow `text-[var(--acc2)]`, title `text-[var(--bg-deep)]`
- Highlight box: `bg-[rgba(91,141,238,.06)]`, `border-[rgba(91,141,238,.18)]`, label `text-[var(--acc2)]`
- Footer text: `text-[var(--text-dim)]`

### CtaSection
- Section: gradients with `rgba(91,141,238,.28)`, `rgba(44,210,252,.18)`, `var(--bg-deep)`, `border-[var(--border)]`
- Eyebrow: `text-white/30`, `before:bg-[var(--acc2)]`
- Title: `text-white`, `[&_em]:text-[var(--acc2)]`
- Body: `text-[var(--text-dim)]`
- Secondary button: `text-[var(--text-dim)]`, `border-[var(--border-hi)]`, hover `text-white`, `border-[var(--acc2)]`, `hover:bg-[rgba(91,141,238,.08)]`
- Checkmarks: `text-[var(--acc2)]`

### Footer
- Background: `bg-[rgba(6,10,38,.98)]`, `border-[var(--border)]`
- Logo: `text-white`, `[&_span]:text-[var(--acc2)]`
- Social icons: `bg-white/5`, `border-[var(--border)]`, `text-white/40`, hover `hover:bg-[rgba(91,141,238,.15)]`, `hover:text-[var(--acc2)]`, `hover:border-[rgba(91,141,238,.3)]`
- Column titles: `text-white/20`
- Links: `text-white/40`, hover `hover:text-[var(--acc2)]`
- Copyright: `text-white/[.12]`

### PoweredStrip
- Bar: `from-[rgba(10,18,69,.9)]` gradient
- Text: `text-white/40`, dot `before:bg-[var(--acc2)]`

### CanvasBackground (canvas/gradient)
- Uses same palette in JS: `#0a1245`, `#0d165a`, `#111d6a`, `#1a2f8e`, `rgba(91,141,238,...)`, `rgba(122,170,245,...)`, white at various opacities.

---

## 4. Tailwind @theme (index.css)

So that Tailwind classes like `bg-bg-deep` work:

```css
@theme {
  --color-bg-deep: #0a1245;
  --color-bg-mid: #0d165a;
  --color-bg-card: rgba(17, 29, 106, 0.6);
  --color-accent: #5b8dee;
  --color-acc2: #7aaaf5;
  --color-acc3: #a3c4f9;
  --color-border: rgba(255, 255, 255, 0.08);
  --color-border-hi: rgba(255, 255, 255, 0.15);
  --font-serif: "Fraunces", Georgia, serif;
  --font-sans: "DM Sans", sans-serif;
}
```

---

## 5. Summary: Palette at a Glance

- **Deep blue**: `#0a1245` (bg-deep)
- **Mid blue**: `#0d165a` (bg-mid)
- **Card blue**: `rgba(17, 29, 106, 0.6)` (bg-card)
- **Primary accent**: `#5b8dee`
- **Main accent**: `#7aaaf5` (acc2) – use for emphasis, links, icons
- **Light accent**: `#a3c4f9` (acc3)
- **Borders**: `rgba(255,255,255,0.08)` / `0.15`
- **Text on dark**: white, then `0.88`, `0.62`, `0.42` opacity
- **Light sections**: `bg-blue-100`, `text-slate-700/800`, `border-slate-200`, keep accent `--acc2`/`--bg-deep` for consistency
