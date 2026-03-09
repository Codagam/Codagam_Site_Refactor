# Hero Right-Side Animation – How It Works

This document explains how the hero section’s right-side animation is built so you can reuse or adapt it.

---

## 1. Overall Layout

- **Left side**: Hero content (headline, text, buttons) in a column.
- **Right side**: An animated canvas that is mostly visible on the right; the left is faded by a gradient overlay so the canvas doesn’t compete with the text.

So there are two parts:
1. **Hero section** – content + overlay gradient.
2. **Canvas background** – full-screen canvas behind everything, drawn so the “scene” (house, nodes, traces, signals) sits toward the center/right.

---

## 2. Hero Section (Left Content + Overlay)

**File:** `src/components/Hero.tsx`

- The hero is a full-viewport section with content aligned to the **left** (`items-start`, `max-w-[520px]` / `lg:max-w-[44%]`).
- A **gradient overlay** is done with a `before:` pseudo-element on the same section:
  - **Position:** `before:fixed before:inset-0 before:z-[1]` so it covers the whole viewport and sits above the canvas.
  - **Horizontal gradient:** `before:from-[rgba(10,18,69,.95)]` at 0% → `via-[rgba(10,18,69,.35)]` at 55% → `before:to-transparent` at 75%. So the **left is dark blue**, the **right is transparent** and the canvas shows through.
  - **Vertical gradient:** Same element also has `before:from-[rgba(10,18,69,.6)]` at top → `before:to-transparent` at 35%, so the top is slightly faded too.
- The hero has `pointer-events-none` so clicks pass through the overlay; buttons/links use `pointer-events-auto` so they still work.

Result: content on the left is readable; the right side shows the canvas animation.

---

## 3. Canvas Background (The Right-Side Animation)

**File:** `src/components/CanvasBackground.tsx`

The canvas is **fixed, full viewport**, and rendered **behind** the rest of the UI (`z-0`). The Hero (and Nav) sit above it with higher `z-index`.

### 3.1 Setup

- **Ref:** `useRef<HTMLCanvasElement>(null)`.
- **Resize:** On mount and on `window.resize`, the canvas is sized to `window.innerWidth` and `window.innerHeight`, with `devicePixelRatio` applied for sharpness (capped at 2).
- **Loop:** `requestAnimationFrame(render)` drives the animation. Each frame gets a timestamp `ts`; `now = ts - t0` is the elapsed time used for all time-based effects.

### 3.2 What Gets Drawn (in order)

1. **Background (`drawBg`)**  
   Radial gradient from center: `#1a2f8e` → `#111d6a` → `#0d165a` → `#0a1245`. Matches the site’s deep blue theme.

2. **Grid (`drawGrid`)**  
   Subtle grid lines and dots (white, low opacity) to suggest a technical/PCB feel.

3. **Traces (`drawTraces`)**  
   PCB-style routes: polygonal paths from a central “house” to each sector node. Two stroke passes: thicker faint line, then thinner brighter line.

4. **Pads (`drawPads`)**  
   Small squares/circles at trace waypoints (not at start/end) to look like connection pads.

5. **Nodes (`drawNodes(now)`)**  
   Each sector (Finance, Aviation, Healthcare, etc.) is a **node** with:
   - **Pulsing rings:** A radius `nd.pulseR` increases every frame and is drawn as a circle; when it exceeds a max, it resets to 0. So you see rings expanding and disappearing.
   - **Glow:** Radial gradient from node center (accent blue) to transparent.
   - **Outer ring:** Circle stroke whose opacity uses `Math.sin(now * 0.0014 + nd.phase)` so it pulses.
   - **Body:** Filled circle with gradient and border.
   - **Icon + label:** Centered icon and text below (e.g. “Finance”, “Aviation”).

6. **Signals (`drawSignals`)**  
   **Moving dots** that travel along the traces:
   - **Spawning:** New signals are created periodically (`spawnSignal`). Each picks a random trace and a random direction (house→node or node→house). `t` goes from 0→1 or 1→0.
   - **Movement:** Each frame `s.t += s.dir * s.speed`. Position on the path is computed with `pointAtT(trace.pts, s.t)` (linear interpolation along the polyline by distance).
   - **Drawing:** A short **tail** of circles behind the head (older positions with lower opacity and smaller radius). The head has a radial gradient (white/light blue) for a glow. When `t` goes past 0 or 1, the signal is marked dead and removed.

7. **House (`drawHouse(now)`)**  
   A central “chip” shape:
   - **Halo:** Elliptical radial gradient (accent blue) that pulses with `now`.
   - **Body:** Rounded rectangle with stroke; inner details (corners, chimney, door, windows).
   - **Roof:** Triangle with a gradient stroke.
   - **Internal lines:** Dashed horizontal/vertical lines and small circles to suggest circuitry.
   - Stroke opacities use `Math.sin(now * 0.001)` so the house outline pulses slightly.

### 3.3 Key Animation Techniques

- **Time:** Single `now` (ms since start) drives all time-based effects so everything stays in sync.
- **Pulsing:** `0.5 + 0.5 * Math.sin(now * speed + phase)` for opacity/glow.
- **Expanding rings:** A per-node radius variable incremented each frame and reset when it exceeds a limit.
- **Path following:** Polyline stored as array of points; `pointAtT(pts, t)` returns the point at fraction `t` along the path (by segment length).
- **Signals:** List of objects with `{ trace, t, dir, speed, tail, opacity, dead }`; update `t`, compute position, draw tail + head, remove when `t` out of [0,1].

### 3.4 Responsiveness

- `isMobile = W < 768` changes:
  - Grid unit `u` and house position (e.g. `hcx`/`hcy`).
  - Number of nodes (fewer on mobile).
- On resize, `resize()` recalculates house, nodes, and traces and clears signals so the next frame redraws everything correctly.

---

## 4. App Structure

**File:** `src/App.tsx`

```tsx
<>
  <CanvasBackground />   {/* z-0, fixed full screen */}
  <Nav />
  <Hero />               {/* z-10, gradient overlay so right shows canvas */}
  ...
</>
```

So the **right-side animation** is just the **CanvasBackground** showing through the **Hero’s gradient overlay** on the right. The canvas itself is full-screen; the overlay makes it appear as a “right-side” effect.

---

## 5. Summary

| Part | Role |
|------|------|
| Hero `before:` overlay | Gradient left→right (and top) so left is dark, right is transparent. |
| Canvas | Full-screen, fixed, z-0; draws gradient bg, grid, traces, pads, nodes, signals, house. |
| Animation loop | `requestAnimationFrame(render)`; `now` for pulses; per-node ring expansion; signals move along paths with `pointAtT`. |
| Signals | Spawn on random trace/direction; move `t += dir * speed`; draw tail + glowing head; remove when `t` out of [0,1]. |

To replicate this on another site you need: (1) a full-screen fixed canvas, (2) a hero (or similar) section with a left→right gradient overlay, and (3) canvas content (can be simpler: e.g. only gradient + grid + a few moving dots) driven by the same kind of `requestAnimationFrame` + `now` + path-based motion.
