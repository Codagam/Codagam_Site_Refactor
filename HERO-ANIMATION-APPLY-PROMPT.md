# Cursor Prompt: Add Hero Right-Side Canvas Animation to My Website

Use this prompt in Cursor to add a hero section with a right-side canvas animation similar to the Codagam site. Copy the entire "Prompt" section below and paste it into Cursor with your project open.

---

## Prompt (copy from here)

Add a hero section with a right-side canvas animation to my website, matching the Codagam behavior as much as possible.

### 1. Layout and stacking

- **Canvas:** A full-viewport, fixed-position canvas behind the hero (`position: fixed; inset: 0; z-index: 0` or Tailwind `fixed inset-0 z-0`). Size it to `window.innerWidth` and `window.innerHeight`, and scale by `devicePixelRatio` (cap at 2) so it stays sharp on retina.
- **Hero section:** Full viewport height, content aligned to the **left** (e.g. max-width ~44% or 520px on large screens). Hero (and nav) must sit **above** the canvas (e.g. `z-10`).
- **Overlay:** On the hero section, add a full-screen gradient overlay (e.g. with a `before:` pseudo-element or an absolutely positioned div) so that:
  - **Left:** Opaque or nearly opaque (e.g. `rgba(10,18,69,.95)` at 0%).
  - **Middle/right:** Fade to transparent (e.g. via 55% and 75% stops so the right side shows the canvas).
  - Optionally fade the top a bit (e.g. `rgba(10,18,69,.6)` at top to transparent at ~35%).
- The overlay should be non-interactive (e.g. `pointer-events: none` on the hero) and interactive elements (buttons, links) should have `pointer-events: auto`.

Result: hero text on the left; animated canvas visible on the right.

### 2. Canvas animation loop

- Use a single `requestAnimationFrame` loop in a `useEffect` (React) or equivalent.
- Track start time `t0` and compute `now = timestamp - t0` (milliseconds) for all time-based effects.
- On each frame: clear canvas, draw background, then draw all animated elements, then call `requestAnimationFrame` again.
- On window resize: recalculate canvas size and any layout (e.g. positions of nodes/traces); optionally reset animation state.
- Cleanup: cancel the animation frame and remove resize listener on unmount.

### 3. What to draw on the canvas (minimum)

- **Background:** A radial gradient matching the site’s dark blue (e.g. center `#1a2f8e` → `#0a1245` at edges).
- **Optional grid:** Very subtle white grid lines and dots (e.g. opacity 0.02–0.03) for a technical look.
- **Optional “nodes” and “traces”:** If you want the full Codagam-style scene:
  - A central shape (e.g. rounded rect + triangle “roof”) as the “house/chip”.
  - Several nodes (circles with icon/label) around it.
  - Polyline traces from the central shape to each node.
  - Small pads/circles at trace waypoints.
- **Animated signals (required for “animation”):** At least a few moving dots that travel along paths:
  - Define one or more paths as arrays of `{x, y}` points (e.g. from center to a few positions).
  - Each signal has: `t` (0 to 1 along path), `dir` (+1 or -1), `speed` (e.g. 0.002–0.005).
  - Each frame: `t += dir * speed`; if `t` is outside [0,1], remove the signal.
  - Position on path: interpolate along the polyline by **distance** (sum segment lengths, then find point at fraction `t` of total length).
  - Draw: a short **tail** of circles (older positions, smaller and more transparent) and a **head** with a soft gradient (e.g. radial white/light blue).
  - Spawn new signals periodically (e.g. every 350–550 ms) on a random path and random direction.
- **Optional pulsing:** For nodes and the central shape, use `Math.sin(now * 0.001 + phase)` to modulate stroke opacity or glow so elements “breathe”.

### 4. Colors (use CSS variables if my site has a theme)

- Background gradient: deep blues `#0a1245`, `#0d165a`, `#111d6a`, `#1a2f8e`.
- Grid/traces: `rgba(255,255,255,0.02)` to `0.22` depending on emphasis.
- Accent for glows/signals: `rgba(91,141,238,...)` and `rgba(122,170,245,...)`.
- Overlay: `rgba(10,18,69,.95)` to transparent so it matches the canvas background.

If my project already has theme variables (e.g. `--bg-deep`, `--acc2`), use those for the canvas and overlay instead of hardcoded hex/rgba where it makes sense.

### 5. Files to create or edit

- **Canvas component:** One component (e.g. `CanvasBackground.tsx` or `HeroCanvas.tsx`) that renders `<canvas ref={...} className="fixed inset-0 w-full h-full block z-0" aria-hidden />` and runs the animation in a `useEffect` with resize handling and cleanup.
- **Hero component:** Section with left-aligned content and the gradient overlay (e.g. `before:` with the gradient described above). Ensure the hero is inside the same stacking context as the canvas so `z-index` orders them correctly.
- **App/Layout:** Render the canvas first, then the hero (and nav) so the canvas is behind.

### 6. Simplify if needed

If my codebase is not React or you want a lighter version:

- **Minimal:** Just the canvas with (1) gradient background, (2) 2–3 paths (e.g. simple polylines), (3) 1–2 moving dots per path with tail + head. Same overlay on the hero so the right side shows the animation.
- **No “house” or nodes:** You can skip the central shape and sector nodes and only draw paths + moving signals; the right-side “animation” will still read as data/signals moving.

Do not change my existing routing or page structure beyond adding this hero and canvas where I specify. Prefer TypeScript and the same styling approach (Tailwind/CSS) as the rest of my project.

---

## End of prompt

After applying, you can tune speed (signal `speed`, spawn interval), colors (gradient and accent), and path complexity to match your brand. The key is: **fixed full-screen canvas** + **hero with left→right gradient overlay** + **requestAnimationFrame loop** with **path-based moving signals**.
