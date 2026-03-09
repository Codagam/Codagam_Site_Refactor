# Cursor Prompt: Apply Codagam Theme to My Website

Use this prompt in Cursor when you want to apply the Codagam website theme (colors, typography, borders) to another site. Copy the entire block below and paste it into Cursor with your project open.

---

## Prompt (copy from here)

Apply the Codagam website theme to my project so that all sections use the same color system and feel. Use the reference below; prefer CSS variables so the theme is easy to tweak later.

### 1. Add or update global CSS variables

In your main CSS file (e.g. `index.css`, `globals.css`, or `tailwind.css`), define these variables under `:root`:

**Backgrounds**
- `--bg-deep: #0a1245;` — main page/section background
- `--bg-mid: #0d165a;` — mid-tone and gradients
- `--bg-card: rgba(17, 29, 106, 0.6);` — cards/surfaces on dark

**Accent (blue)**
- `--accent: #5b8dee;` — primary blue
- `--acc2: #7aaaf5;` — main accent (headings, links, icons, CTAs)
- `--acc3: #a3c4f9;` — lighter accent (tags, secondary highlights)

**Text (on dark backgrounds)**
- `--text-dim: rgba(255, 255, 255, 0.42);` — muted
- `--text-mid: rgba(255, 255, 255, 0.62);` — medium
- `--text-hi: rgba(255, 255, 255, 0.88);` — high contrast

**Borders**
- `--border: rgba(255, 255, 255, 0.08);` — subtle
- `--border-hi: rgba(255, 255, 255, 0.15);` — stronger

**Effects**
- `--glow: rgba(91, 141, 238, 0.15);` — glow

**Typography**
- `--font-serif: "Fraunces", Georgia, serif;` — headings
- `--font-sans: "DM Sans", sans-serif;` — body (or keep my existing sans if I don’t have these fonts)

### 2. Apply the theme consistently

- **Page background**: `background: var(--bg-deep);` on `body` (and `color: #fff` or equivalent for default text).
- **Headings (h1–h4)**: Use `font-family: var(--font-serif);`. For emphasis (e.g. italic words), use `color: var(--acc2)`.
- **Body / UI**: Use `font-family: var(--font-sans);`.
- **Section dividers**: `border-color: var(--border);` or `border-[var(--border)]` in Tailwind.
- **Cards on dark**: `background: var(--bg-card);` and `border: 1px solid var(--border);`.
- **Primary accent elements** (links, icons, badges, CTA highlights): `color: var(--acc2);`.
- **Muted text**: `color: var(--text-dim);` or `var(--text-mid)` for slightly stronger.
- **Buttons**: Primary = white background, text `var(--bg-deep)`, hover background `var(--acc2)`. Secondary = transparent with `border: var(--border-hi)`, text `var(--text-dim)`, hover text white and border `var(--acc2)`, optional hover background `rgba(91,141,238,.08)`.
- **Light contrast sections** (e.g. alternating blocks): Use `background: #e0e7ff` (blue-100 equivalent), text `#1e293b` / `#334155` (slate-800/700), borders `#e2e8f0` (slate-200). Keep accent and deep blue for emphasis: `var(--acc2)` and `var(--bg-deep)`.

### 3. Optional: Tailwind @theme

If using Tailwind v4-style `@theme`, map the same values so utilities work:

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

### 4. Gradients and one-off colors (optional)

Where you need gradients or hover states, use:

- Dark overlays: `rgba(10,18,69,.9)` to `transparent`
- Accent glow: `rgba(91,141,238,.15)` to `transparent` or `rgba(91,141,238,.28)` in radial gradients
- Accent hover: `rgba(91,141,238,.08)` background, `rgba(91,141,238,.2)` border
- Scrollbar thumb: `rgba(91,141,238,0.3)`

### 5. What to change in my codebase

- Replace existing background/primary/accent colors with the variables above.
- Ensure headings use the serif variable and accent color for emphasis.
- Ensure borders and dividers use `--border` / `--border-hi`.
- Ensure buttons and links follow the primary/secondary rules above.
- If I have a nav/footer, use `var(--bg-deep)` (or a slightly darker variant like `rgba(6,10,38,.98)`), `var(--border)`, and `var(--acc2)` for logo/hover states.

Do not change layout or content structure—only colors, borders, and typography to match this theme. If my stack uses Tailwind, prefer Tailwind classes that reference these variables (e.g. `bg-bg-deep`, `text-acc2`, `border-border`) or arbitrary values like `bg-[var(--bg-deep)]` where needed.

---

## End of prompt

After Cursor applies the theme, you can fine-tune by editing the CSS variables in one place; the rest of the site will follow.
