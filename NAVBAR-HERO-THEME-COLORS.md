# Navbar & Hero Section – Theme Colors How Applied

Single reference for how theme colors are used in the **Nav** and **Hero** components.

---

## CSS variables used (from `src/index.css`)

| Variable    | Value                          | Purpose                    |
|------------|---------------------------------|----------------------------|
| `--bg-deep` | `#0a1245`                      | Deep blue background       |
| `--acc2`    | `#7aaaf5`                      | Main accent (links, emphasis) |
| `--text-dim` | `rgba(255, 255, 255, 0.42)`    | Muted text                 |
| `--border`  | `rgba(255, 255, 255, 0.08)`     | Subtle borders             |
| `--font-serif` | `"Fraunces", Georgia, serif` | Headings / logo            |
| `--font-sans`  | `"DM Sans", sans-serif`      | Body / UI                  |

---

## Navbar (`Nav.tsx`)

### Container (`<nav>`)

| State    | Class / effect | Theme usage |
|----------|----------------|------------|
| Default  | Transparent, no border | — |
| Scrolled | `bg-[rgba(10,18,69,.94)]` | Same blue as `--bg-deep`, 94% opacity |
| Scrolled | `backdrop-blur-[20px]` | Blur content behind |
| Scrolled | `border-b border-[var(--border)]` | Bottom border uses `--border` |

### Logo link

| Element   | Class / selector | Color applied |
|-----------|------------------|----------------|
| Text      | `text-white`     | White          |
| Accent part (e.g. span) | `[&_span]:text-[var(--acc2)]` | Accent blue |
| Font      | `font-[var(--font-serif)]` | Serif for logo |

### Desktop nav links

| Element   | Class | Color applied |
|-----------|--------|----------------|
| Default   | `text-white/45` | White 45% opacity |
| Hover     | `hover:text-white` | Full white |
| Hover bg  | `hover:bg-white/[.07]` | White 7% |

### Desktop CTA button (“Book a call”)

| State   | Class | Color applied |
|---------|--------|----------------|
| Default | `bg-white/[.08]` | White 8% background |
| Default | `text-white` | White text |
| Default | `border border-white/20` | White 20% border |
| Hover   | `hover:!bg-white` | Solid white background |
| Hover   | `hover:!text-[var(--bg-deep)]` | Deep blue text |

### Mobile menu button (hamburger)

| Element | Class | Color applied |
|---------|--------|----------------|
| Bars    | `bg-white` | White |

### Mobile menu overlay

| Element | Class | Color applied |
|---------|--------|----------------|
| Overlay | `bg-[var(--bg-deep)]` | Full deep blue background |

### Mobile menu close button

| Element | Class | Color applied |
|---------|--------|----------------|
| Icon    | `text-white/50` | White 50% |

### Mobile menu links

| Element | Class | Color applied |
|---------|--------|----------------|
| Links   | `text-white` | White |
| Font    | `font-[var(--font-serif)]` | Serif |

### Mobile CTA button

| Element | Class | Color applied |
|---------|--------|----------------|
| Bg      | `bg-white` | White |
| Text    | `text-[var(--bg-deep)]` | Deep blue |
| Font    | `!font-[var(--font-sans)]` | Sans |

---

## Hero section (`Hero.tsx`)

### Section overlay (`before:` pseudo-element)

Overlay fades left→right and top→bottom so the canvas shows on the right. All values are **hardcoded rgba** (same blue family as `--bg-deep`):

| Gradient | Stops | Color applied |
|----------|--------|----------------|
| Horizontal (left→right) | 0% | `rgba(10,18,69,.95)` |
| Horizontal | 28% | `rgba(10,18,69,.8)` |
| Horizontal | 55% | `rgba(10,18,69,.35)` |
| Horizontal | 75% | `transparent` |
| Vertical (top→bottom) | 0% | `rgba(10,18,69,.6)` |
| Vertical | 35% | `transparent` |

### Eyebrow badge (“Code + Agam · Tamil Nadu, India”)

| Element | Class | Color applied |
|---------|--------|----------------|
| Text    | `text-[var(--acc2)]` | Accent blue |
| Background | `bg-[rgba(5,12,55,.92)]` | Dark blue (slightly darker than bg-deep) |
| Border  | `border-white/12` | White 12% |
| Shadow  | `shadow-[0_18px_45px_rgba(1,5,32,.95)]` | Dark blue shadow |

### Eyebrow dot (live indicator)

| Element | Class | Color applied |
|---------|--------|----------------|
| Dot     | `bg-[var(--acc2)]` | Accent blue |
| Glow    | `shadow-[0_0_7px_var(--acc2)]` | Accent glow |

### Headline (h1)

| Element | Class | Color applied |
|---------|--------|----------------|
| Text    | `text-white` | White |
| Emphasis (`<em>`) | `[&_em]:text-[var(--acc2)]` | Accent blue |
| Font    | `font-[var(--font-serif)]` | Serif |

### Subtext (paragraph)

| Element | Class | Color applied |
|---------|--------|----------------|
| Text    | `text-[var(--text-dim)]` | Muted white (theme dim) |

### Primary CTA (“Book a discovery call”)

| State   | Class | Color applied |
|---------|--------|----------------|
| Default | `bg-white` | White background |
| Default | `!text-[var(--bg-deep)]` | Deep blue text |
| Shadow  | `shadow-[0_14px_40px_rgba(0,0,0,.45)]` | Dark shadow |
| Hover   | `hover:bg-[var(--acc2)]` | Accent blue background |
| Hover   | `hover:!text-[var(--bg-deep)]` | Deep blue text (unchanged) |
| Font    | `font-[var(--font-sans)]` | Sans |

### Secondary link (“See our work”)

| State   | Class | Color applied |
|---------|--------|----------------|
| Default | `text-[var(--text-dim)]` | Muted text |
| Default | `border-b border-white/15` | White 15% bottom border |
| Hover   | `hover:text-white` | White text |
| Hover   | `hover:border-white/35` | White 35% border |

---

## Quick reference: variable → usage

| Variable     | Navbar usage | Hero usage |
|-------------|--------------|------------|
| `--bg-deep` | Mobile menu bg; CTA hover text | CTA text; CTA hover text |
| `--acc2`    | Logo accent span | Eyebrow text; dot; headline `<em>`; primary CTA hover bg |
| `--text-dim` | — | Subtext; secondary link text |
| `--border`  | Nav bottom border when scrolled | — |
| `--font-serif` | Logo; mobile links | Headline |
| `--font-sans` | Mobile CTA | Primary CTA |

---

## Hardcoded colors (no variable)

- **Nav:** `rgba(10,18,69,.94)` (scrolled bar), `white/45`, `white/07`, `white/20`, `white/50`.
- **Hero:** `rgba(10,18,69,...)` in overlay and badge bg, `white/12`, `white/15`, `white/35`, `rgba(1,5,32,.95)` shadow, `rgba(0,0,0,.45)` button shadow.

To make the navbar and hero fully theme-driven, replace these with CSS variables (e.g. `var(--bg-deep)` or a new `--nav-bg`) in the components or via Tailwind theme.
