# Full Website Rebuild Prompt — Codagam One-Page Site

**Instruction:** Recreate this entire website 100% from this spec. Follow the tech stack, file structure, theme, content, layout, animations, and behavior exactly. When done, the site should look and behave identically to the reference.

---

## 1. Tech stack & setup

- **React 19** + **TypeScript** + **Vite**
- **Tailwind CSS v4** (with `@tailwindcss/vite`)
- **Path alias:** `@/` → `src/`
- **Dependencies:** `clsx`, `tailwind-merge` (for `cn()`), `class-variance-authority`, optional Base UI/shadcn-style button (or a simple styled `<a>`/`<button>` with the same classes)
- **Fonts:** Fraunces (serif), DM Sans (sans) — load from Google Fonts in `index.html`. Optional: Geist Variable for a secondary sans.

---

## 2. Project structure

```
src/
  main.tsx
  App.tsx
  index.css
  components/
    Nav.tsx
    Hero.tsx
    CanvasBackground.tsx
    SectionHeader.tsx
    PoweredStrip.tsx
    MarqueeStrip.tsx
    Footer.tsx
    sections/
      PromiseSection.tsx
      ServicesSection.tsx
      WorkSection.tsx
      TrustSection.tsx
      ProcessSection.tsx
      CtaSection.tsx
    ui/
      button.tsx
  hooks/
    useScrollReveal.ts
  lib/
    utils.ts
```

- **utils.ts:** Export `cn(...inputs)` using `twMerge(clsx(inputs))`.
- **index.html:** Title "Codagam — Software Labs", description meta, preconnect + link to Google Fonts for Fraunces and DM Sans.

---

## 3. Global CSS & theme (`src/index.css`)

**Imports:** Tailwind, tw-animate-css, optional shadcn/tailwind; optional Geist.

**@theme block (Tailwind v4):**
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

**:root:** Same variables as above plus:
- `--bg-deep: #0a1245;` `--bg-mid: #0d165a;` `--bg-card: rgba(17, 29, 106, 0.6);`
- `--acc2: #7aaaf5;` `--acc3: #a3c4f9;`
- `--text-dim: rgba(255, 255, 255, 0.42);` `--text-mid: rgba(255, 255, 255, 0.62);` `--text-hi: rgba(255, 255, 255, 0.88);`
- `--border: rgba(255, 255, 255, 0.08);` `--border-hi: rgba(255, 255, 255, 0.15);`
- `--font-serif` / `--font-sans` as above.
- Include shadcn-style semantic tokens (--background, --foreground, --primary, --primary-foreground, --card, --muted, --radius, etc.) so UI components work; primary can be dark, primary-foreground light, or override button styles for CTAs.

**html:** `scroll-behavior: smooth;`

**body:** `margin: 0; width: 100%; background: var(--bg-deep); color: #fff; overflow-x: hidden; font-family: var(--font-sans); -webkit-font-smoothing: antialiased;`

**Scrollbar:** width 5px; track `var(--bg-deep)`; thumb `rgba(91, 141, 238, 0.3)`; border-radius 3px.

**h1–h4:** `font-family: var(--font-serif); font-weight: 600; line-height: 1.1;`

**a:** `color: inherit; text-decoration: none;`

**Keyframes:**
- **rise:** from opacity 0, translateY(14px) → to opacity 1, translateY(0).
- **blink:** 0% 100% opacity 1, 50% opacity 0.3.
- **marq:** from translateX(0) → to translateX(-50%).

**Scroll-reveal utility:**
- `.rv`: opacity 0, transform translateY(24px), transition opacity 0.75s ease, transform 0.75s ease.
- `.rv.vis`: opacity 1, transform translateY(0).
- `.rv-d1` … `.rv-d4`: transition-delay 0.1s … 0.4s.

---

## 4. App flow & component tree

**App.tsx:** Run `useScrollReveal()` once. Render in order:
1. `CanvasBackground` (fixed, full viewport, z-0)
2. `Nav`
3. `Hero`
4. `PoweredStrip`
5. A wrapper `div` with `relative z-20 bg-[var(--bg-deep)]` containing:
   - `MarqueeStrip`
   - `PromiseSection`
   - `ServicesSection`
   - `WorkSection`
   - `TrustSection`
   - `ProcessSection`
   - `CtaSection`
   - `Footer`

---

## 5. Nav (`Nav.tsx`)

- **State:** `scrolled` (true when `window.scrollY > 20`), `mobileOpen` (boolean). On scroll, set scrolled; when mobileOpen, set `document.body.style.overflow = "hidden"`, else "".
- **Desktop nav:** Fixed top, full width, z-100, flex justify-between, padding 5vw horizontal, py 1.1rem. When scrolled: `bg-[rgba(10,18,69,.94)] backdrop-blur-[20px] border-b border-[var(--border)]`. Transition 0.4s.
- **Logo:** Link to #hero, text "Codagam", `font-[var(--font-serif)] text-xl font-bold text-white`, `[&_span]:text-[var(--acc2)]`, opacity-0 animate rise 0.6s 0.1s forwards.
- **Desktop links:** Services (#services), Work (#work), About (#about). Link class: `text-[.82rem] text-white/45 py-1.5 px-3 rounded hover:text-white hover:bg-white/[.07]`. Rise 0.6s 0.2s forwards.
- **Desktop CTA:** "Book a call →" href #contact, `ml-2 bg-white/[.08] text-white border border-white/20 py-1.5 px-3 rounded text-[.82rem] hover:!bg-white hover:!text-[var(--bg-deep)]`.
- **Mobile:** Hamburger button (three spans, w-5 h-[1.5px] bg-white), md:hidden. Mobile menu: fixed inset-0 z-200, `bg-[var(--bg-deep)]`, flex col center, gap-8, hidden when !mobileOpen. Close button top-6 right-6, text-white/50. Links same as desktop, `font-[var(--font-serif)] text-3xl font-light text-white`. CTA: `!font-[var(--font-sans)] !text-base !font-medium bg-white text-[var(--bg-deep)] py-3 px-10 rounded mt-2`. All links/CTA close menu on click.

---

## 6. Hero (`Hero.tsx`)

- **Section:** id hero, relative z-10, min-h-screen, flex col justify-center items-start, pt-24 pb-20, px-6 sm:px-10 lg:px-[5vw], pointer-events-none.
- **Overlay (before:):** fixed inset-0 z-[1], pointer-events-none. Two gradients: (1) left→right: from rgba(10,18,69,.95) 0%, via .8 28%, via .35 55%, to transparent 75%. (2) top→bottom: from rgba(10,18,69,.6) 0%, to transparent 35%.
- **Content wrapper:** relative z-[2], max-w-[520px] lg:max-w-[44%], mx-auto lg:mx-0.
- **Eyebrow badge:** "Code + Agam · Tamil Nadu, India". Inline-flex gap-2, text-[.68rem] font-medium uppercase tracking-[.14em] text-[var(--acc2)], bg-[rgba(5,12,55,.92)] border border-white/12 py-1.5 px-4 rounded-full mb-7, shadow, backdrop-blur, opacity-0 animate rise .8s .3s cubic-bezier(.22,1,.36,1) forwards. Before: small dot `w-1.5 h-1.5 rounded-full bg-[var(--acc2)] shadow-[0_0_7px_var(--acc2)] animate-[blink_2.5s_ease-in-out_infinite]`.
- **H1:** "The mind that" / "powers your" / "world." (last word in <em>). font-serif clamp(2.2rem,4.5vw,4.75rem) font-semibold text-white, [&_em]:italic font-light text-[var(--acc2)]. Rise .8s .5s forwards.
- **Paragraph:** "Agam — mind, home, inside — meets precision engineering. Bespoke software powering aviation, healthcare, hospitality and more." text-[var(--text-dim)] clamp(.875rem,1.3vw,1.05rem) leading-8 max-w-[400px] mb-9. Rise .8s .7s forwards.
- **CTAs wrapper:** flex col sm:flex-row gap-4, pointer-events-auto, rise .8s .9s forwards.
- **Primary CTA:** "Book a discovery call →" href #contact. rounded-[999px] bg-white !text-[var(--bg-deep)] px-7 py-3 font-sans text-[.9rem] font-semibold shadow, hover:bg-[var(--acc2)] hover:!text-[var(--bg-deep)] hover:-translate-y-0.5.
- **Secondary:** "See our work" href #work. text-[.85rem] text-[var(--text-dim)] border-b border-white/15, hover:text-white hover:border-white/35.

---

## 7. CanvasBackground (`CanvasBackground.tsx`)

- **Element:** `<canvas>` ref, class `fixed inset-0 h-full w-full block z-0`, aria-hidden.
- **Resize:** On mount and window resize: set canvas width/height to innerWidth/innerHeight * devicePixelRatio (cap 2); style.width/height to innerWidth/innerHeight; ctx.setTransform(dpr,0,0,dpr,0,0). isMobile = width < 768.
- **Animation loop:** requestAnimationFrame(render). In render: clearRect, then draw in order: drawBg, drawGrid, drawTraces, drawPads, drawNodes(now), drawSignals, drawHouse(now), updateSignals; spawn new signals periodically (e.g. every 350–550ms). now = timestamp - t0.
- **drawBg:** Radial gradient center (hcx, hcy) to max(W,H)*0.9; stops #1a2f8e, #111d6a, #0d165a, #0a1245. fillRect(0,0,W,H).
- **drawGrid:** Grid step = u*1.6; stroke rgba(255,255,255,.022); dots rgba(255,255,255,.028).
- **House:** Central “chip” shape: rounded rect body, triangle roof, chimney, door, two windows; position from center (e.g. hcx ~ 0.64*W, hcy ~ 0.46*H on desktop). Halo ellipse gradient accent blue with pulse; stroke opacities use sin(now*0.001).
- **Nodes:** 8 sectors: Finance ◈, Aviation ✈, Education ◉, Healthcare ✚, Logistics ⊞, Hospitality ⌂, Government ⊙, Retail ◫. Each at angle (deg), radius baseR; store x,y, label, icon, phase, pulseR. On mobile use 5 nodes. drawNodes: for each node draw expanding ring (pulseR += 0.35, reset at max), radial glow, outer ring (stroke rgba(122,170,245,…) with pulse), filled circle body, icon text, label below, small accent dot.
- **Traces:** Polylines from house exit points to each node (routePCB-style: orthogonal segments). drawTraces: thick faint stroke then thin brighter stroke. drawPads: small squares/circles at trace waypoints (not endpoints).
- **Signals:** Array of { trace, t, dir, speed, r, tail, opacity, dead }. Spawn on random trace, dir ±1, t 0 or 1. pointAtT(pts, t) = interpolate along polyline by arc length. Each frame: t += dir*speed; if t outside [0,1] set dead. Draw tail (circles behind head, fading), then head with radial gradient (white/light blue). Spawn rate ~ 350–550ms.
- **Cleanup:** cancelAnimationFrame, remove resize listener.

Implement the full canvas logic so the right side of the hero shows the animated PCB-style scene with moving signals; exact drawing code can match the reference implementation (gradients, colors rgba(91,141,238,…), rgba(122,170,245,…), white opacities).

---

## 8. PoweredStrip

- **Position:** fixed bottom-0 left-0 right-0 z-10, py-4 px-[5vw], bg-gradient-to-t from-[rgba(10,18,69,.9)] to-transparent, flex items-center gap-6 flex-wrap pointer-events-none, transition-opacity 500ms. Hidden when scrollY > innerHeight*0.6 (opacity-0).
- **Content:** "Powering" (text-[.63rem] uppercase text-white/[.28], with after:w-px after:h-3 after:bg-white/10). Then list: Aviation, Healthcare, Hospitality, Finance, Logistics, Government, Education, Retail — each text-[.68rem] text-white/40, before: 3px dot before:bg-[var(--acc2)] before:opacity-55. Animate rise .8s 1.2s forwards.

---

## 9. MarqueeStrip

- **Container:** bg-[rgba(8,14,56,.98)] py-3.5 overflow-hidden whitespace-nowrap border-t border-b border-[var(--border)], aria-hidden.
- **Items (repeated twice in a row for seamless loop):** Next.js, React, TypeScript, MongoDB, Node.js, C# / .NET, SQL Server, React Native, Prisma, AWS, Vercel, Tailwind CSS, Docker, Groq. Each item: span text-[.72rem] uppercase text-white/30; separator span text-[var(--acc2)] text-[.5rem] opacity-50 "✦". Single row: inline-flex gap-10 animate-[marq_28s_linear_infinite].

---

## 10. SectionHeader components

- **SectionEyebrow:** p, text-[.7rem] font-medium uppercase tracking-[.14em] text-white/30, flex items-center gap-2.5 mb-4, before:w-6 before:h-px before:bg-[var(--acc2)] before:opacity-40. Children = eyebrow string.
- **SectionTitle:** h2, text clamp(2rem,4vw,3.25rem) tracking-tight text-white mb-2, [&_em]:italic font-light text-[var(--acc2)]. Accept className override.
- **SectionSub:** p, text-base text-[var(--text-dim)] leading-8 max-w-[540px] mt-3.
- **SectionHeader:** Composes eyebrow + title + optional sub.

---

## 11. PromiseSection (id about)

- **Section:** py-28 px-[5vw], bg radial-gradient ellipse 80% 60% at 20% 40% rgba(26,47,142,.25) to transparent 50% + var(--bg-deep), border-t border-[var(--border)].
- **Layout:** max-w-[1100px] mx-auto. Grid 1 col sm: 1.4fr 1fr, gap-10 lg:gap-16.
- **Left:** SectionEyebrow "Who we are". H2 rv: "Your home-grown team" / "with a global outlook." (em), clamp 2rem–3.25rem text-white [&_em]:text-[var(--acc2)]. Three paragraphs: (1) "We started Codagam because we saw too many teams choose between **affordable and mediocre** or **premium and out-of-reach.** That's a false choice — and we built a firm to prove it." — [&_strong]:text-[var(--text-hi)] [&_em]:text-[var(--acc2)]. (2) "Based in Tamil Nadu, India, the name Codagam blends \"Code\" with Agam — the Tamil word for mind, home, the innermost self. We build software..." [&_em]:text-[var(--acc2)]. (3) "We love hard problems. The messier the architecture...". All text-[var(--text-mid)] .98rem leading-[1.85], rv / rv-d1 / rv-d2.
- **Right:** Three cards (rv, rv-d1, rv-d2). Each: py-2 px-7 bg-[var(--bg-card)] border border-[var(--border)] rounded-xl shadow, hover:bg-[rgba(20,35,120,.5)] hover:border-[var(--border-hi)]. Icon 1.1rem text-[var(--acc2)]; title font-sans text-base font-semibold text-[var(--text-hi)]; text .86rem text-[var(--text-dim)]. PILLARS: (1) "✦" "Bespoke, not templated" + text. (2) "◎" "Cost-effective without compromise" + text. (3) "⬡" "Advanced, by default" + text.

---

## 12. ServicesSection (id services)

- **Section:** py-28 px-[5vw], bg-gradient-to-b from-[rgba(13,22,90,.9)] to var(--bg-deep), border-t border-[var(--border)]. max-w-[1100px] mx-auto.
- **Header:** SectionEyebrow "What we build". SectionTitle "Engineering that ships and scales." (em). SectionSub "Outcome-focused engineering across three core practice areas..."
- **Grid of 3 cards:** gap-px bg-[var(--border)] border rounded-xl overflow-hidden. Each cell: rv rv-d2 bg-[rgba(10,18,69,.95)] p-10 pr-8, hover:bg-[rgba(20,35,120,.6)]. Top-right "↗" white/10 group-hover:text-[var(--acc2)]. Number serif 4xl italic text-white/[.06]. Tag .68rem uppercase text-[var(--acc2)] bg-[rgba(91,141,238,.12)] py-1 px-2.5 rounded. Title text-xl font-semibold text-white. Desc .86rem text-[var(--text-dim)]. SERVICES: 01 Web & SaaS "Modern Web Products" + desc; 02 Enterprise "Enterprise .NET + SQL" + desc; 03 End-to-End "Architecture & Full Delivery" + desc.
- **Two rows (1fr 1.1fr)** with DeliverablesCard on the right. Left: eyebrow tag, h3, paragraphs, tags (rounded-full bg-[rgba(91,141,238,.08)] border border-[rgba(91,141,238,.2)] text-[var(--acc3)]). Row 1: "Service 01 · Web & SaaS Products", "Build fast. Scale confidently. Own the codebase forever.", copy, tags Next.js React TypeScript MongoDB Node.js Prisma Tailwind CSS Vercel / AWS. DeliverablesCard "What you get": WEB_DELIVERABLES (Multi-tenant SaaS architecture, Role-based UI & access control, API design & documentation, Analytics & observability, Mobile-responsive & accessible with subs). Row 2: "Service 02 · Enterprise Systems", "Systems your business will depend on for decades.", copy, tags C# / .NET SQL Server Azure REST APIs Entity Framework RBAC / ABAC. ENTERPRISE_DELIVERABLES (Legacy system integration, Compliance-aware architecture, Complex reporting & PDF generation, Performance-tuned SQL, Cloud deployment on Azure).
- **DeliverablesCard:** bg-[var(--bg-card)] border rounded-xl p-8. "What you get" .75rem uppercase text-white/30. Rows: icon box bg-[rgba(91,141,238,.15)] text-[var(--acc2)] ✓, title .88rem text-[var(--text-hi)], sub .8rem text-[var(--text-dim)].
- **Bottom CTA strip:** rv bg-[rgba(91,141,238,.06)] border border-[rgba(91,141,238,.18)] rounded-xl p-10 flex flex-wrap justify-between items-center. P serif 1.1rem text-[var(--text-mid)] [&_em]:text-[var(--acc2)] "Need something unusual? Complex integrations...". Link "Tell us about it →" href #contact using buttonVariants().

---

## 13. WorkSection (id work)

- **Section:** py-28 px-[5vw] bg-blue-100 border-t border-[var(--border)].
- **Header:** h2 rv clamp text-[var(--bg-deep)] [&_em]:text-[var(--acc2)] "Real projects," / "real impact." (em). Span text-blue-950 text-sm "We don't talk in generalities. Here's what we've actually built — the situations, the challenges, and the outcomes."
- **Grid:** rv rv-d2 grid 1 col md:2, gap-8 mt-12. Cards: bg-white/95 border border-slate-200 rounded-xl p-8 shadow, hover:bg-slate-50 hover:border-slate-300. Case 01: md:col-span-2 (featured). Each card: number absolute top-5 right-6 serif 5xl italic text-slate-200; stack .68rem uppercase text-[var(--acc2)]; title clamp text-[var(--bg-deep)] whitespace-pre-line. Then optional "Situation" (label .65rem uppercase text-slate-400, p .86rem text-slate-700), optional "The challenge" same style. Outcome box: mt-6 py-4 px-5 bg-[rgba(91,141,238,.06)] border border-[rgba(91,141,238,.18)] rounded-lg; label "↗ Outcome" .65rem text-[var(--acc2)]; p .88rem text-[var(--bg-deep)] font-semibold.
- **CASES:** 01 Multi-Tenant Healthcare EMR with Tamil-English Voice Transcription (situation, challenge, outcome). 02 Enterprise Payroll & Payslip Generator. 03 Dynamic Link Platform — Firebase Alternative. 04 Hyperlocal Classifieds with Voice & AI Navigation. Use exact copy from reference.
- **Footer of section:** rv mt-12 text-center. p text-[var(--text-dim)] .9rem "Have a project that looks like these? Or completely unlike them?". Link buttonVariants() "Let's talk about yours →" #contact.

---

## 14. TrustSection (id team)

- **Section:** py-28 px-[5vw] bg radial-gradient ellipse 70% 50% rgba(26,47,142,.35) to transparent 55% + var(--bg-deep), border-t border-[var(--border)]. max-w-[1100px] mx-auto.
- **Header:** SectionEyebrow "Why teams choose us". SectionTitle "Extraordinary results," / "repeatedly." (em).
- **Layout:** grid 1 col lg: 1.1fr 1fr gap-16 mt-12.
- **Left card:** rv bg-[var(--bg-card)] rounded-xl p-11 border border-[var(--border)] relative. Decorative quote " (serif 7xl text-[var(--accent)] opacity-20). P 1.05rem text-[var(--text-mid)] italic: "Codagam brought a level of technical maturity we rarely see from offshore partners. They understood our compliance requirements from day one, asked the right questions, and delivered a system we're genuinely proud of." Cite .8rem text-white/30 "— Healthcare Technology Client · Multi-tenant EMR Platform".
- **Right column:** Four stat rows. Each: rv flex gap-5 py-5 border-b border-[var(--border)] last:border-0, rv-d1/d2/d3 on 2nd/3rd/4th. Icon box w-11 h-11 rounded-lg bg-[rgba(91,141,238,.1)] border border-[rgba(91,141,238,.2)] text-[var(--acc2)] center. Title .95rem font-medium text-white. Text .82rem text-[var(--text-dim)]. STATS: ⧫ A decade of engineering depth / ◈ Years of real-world experience, minimum / ◎ International delivery, proven / ⬡ Handover as a deliverable (full copy from reference).

---

## 15. ProcessSection

- **Section:** py-28 px-[5vw] bg radial-gradient ellipse 130% 170% at 100% 0% rgba(122,170,245,.24) to transparent 65% + rgba(8,14,56,.98), border-t border-[var(--border)]. max-w-[1100px] mx-auto.
- **Header:** SectionEyebrow "How every project starts". SectionTitle "Our engagement process." (em). SectionSub "Clear, predictable, and designed so you always know exactly where things stand."
- **Steps grid:** rv rv-d2 grid 1 col sm:2 lg:4 gap-px bg-[var(--border)] border rounded-xl overflow-hidden mt-12. Each cell: bg-[rgba(10,18,69,.95)] py-9 px-7 hover:bg-[rgba(20,35,120,.45)]. Number serif 1.75rem italic text-white/[.08]. Title .95rem font-semibold text-white. Text .83rem text-[var(--text-dim)]. STEPS: 01 Discovery call, 02 Scoping & proposal, 03 Architecture & kickoff, 04 Build & iterate (full copy).
- **Security grid:** grid 1 col md:2 gap-5 mt-16. Four cards: rv py-6 px-7 bg-[var(--bg-card)] border rounded-lg hover:bg-[rgba(26,47,142,.4)] hover:border-[var(--border-hi)], rv-d1/d2/d3. Icon 1.1rem text-[var(--acc2)]. Title base font-medium text-white. Text .86rem text-[var(--text-dim)]. SECURITY_ITEMS: 🔒 Security-first architecture, ☁ Cloud-native scaling, 📊 Observability baked in, 📋 Compliance-aware (full copy).

---

## 16. CtaSection (id contact)

- **Section:** rv py-32 px-[5vw] text-center bg radial-gradient ellipse 70% 80% at 50% 0% rgba(91,141,238,.28) + radial-gradient ellipse 120% 90% at 50% 100% rgba(44,210,252,.18) + var(--bg-deep), border-t border-[var(--border)].
- **Eyebrow:** "Get in touch" — same style as SectionEyebrow (text-white/30, before: line var(--acc2)).
- **H2:** rv clamp text-white [&_em]:text-[var(--acc2)] "Tell us what you're" / "building next." (em).
- **P:** rv 1.05rem text-[var(--text-dim)] max-w-[480px] mx-auto mb-10 "Whether you have a detailed spec or just a rough problem statement — we'd love to hear it. Free discovery call, honest assessment, clear proposal."
- **Buttons:** rv flex gap-5 justify-center flex-wrap. Primary: link to Calendly (target _blank) buttonVariants() "Book a discovery call →". Secondary: mailto:hello@codagam.com, inline-flex gap-2 font-sans .9rem font-medium text-[var(--text-dim)] py-3 px-6 rounded border-[var(--border-hi)] hover:text-white hover:border-[var(--acc2)] hover:bg-[rgba(91,141,238,.08)], "✉ hello@codagam.com".
- **Bullets:** rv mt-12 flex gap-8 justify-center flex-wrap. Three items .78rem text-white/25 with span text-[var(--acc2)] "✓": "Reply within a day", "No sales pressure, ever", "Honest assessment — even if it's not a fit".

---

## 17. Footer

- **Container:** bg-[rgba(6,10,38,.98)] border-t border-[var(--border)] pt-16 pb-8 px-[5vw].
- **Grid:** max-w-[1100px] mx-auto grid 1 col md:2 lg:4 gap-8 lg:gap-12 pb-12 border-b border-[var(--border)].
- **Column 1:** Logo "Coda" + span "gam" (span text-[var(--acc2)]), serif 1.3rem font-bold text-white. P .84rem text-white/35 max-w-[230px] mb-6 "Bespoke software engineering — crafted with deep thought and genuine pride, from Tamil Nadu to the world." Social: three links (LinkedIn, GitHub, Email) 34x34 rounded-md bg-white/5 border border-[var(--border)] text-white/40 hover:bg-[rgba(91,141,238,.15)] hover:text-[var(--acc2)] hover:border-[rgba(91,141,238,.3)]. Labels: in, gh, ✉.
- **Column 2:** H5 "Company" .7rem uppercase text-white/20 mb-4. Links .86rem text-white/40 hover:text-[var(--acc2)]: Home #hero, About us #about, Our team #team.
- **Column 3:** H5 "Services". Links: All services, Web & SaaS, Enterprise .NET, End-to-end delivery (#services).
- **Column 4:** H5 "Connect". Links: Case studies #work, Start a project #contact, Book a call (Calendly), hello@codagam.com (mailto).
- **Bottom row:** mt-7 flex justify-between items-center gap-3 .75rem text-white/[.18] "© Codagam Software Labs · Gobichettipalayam, Tamil Nadu, India". Span serif italic font-light text-white/[.12] text-sm "அகம் — the mind that builds".

---

## 18. useScrollReveal

- **Selector:** ".rv". IntersectionObserver threshold 0.08. When element intersects, add class "vis" and unobserve. On mount queryAll .rv and observe each; on cleanup disconnect.

---

## 19. Button / CTA styling

- If using a button component with variants, ensure the default (primary) CTA style matches: background white or primary, text --bg-deep or primary-foreground, hover background --acc2, rounded-lg, appropriate padding. Sections use `buttonVariants()` without args for "Book a discovery call", "Tell us about it →", "Let's talk about yours →". Either set :root --primary/--primary-foreground so default variant looks correct, or add a custom "cta" variant: bg-white text-[var(--bg-deep)] hover:bg-[var(--acc2)].

---

## 20. Summary checklist

- [ ] Vite + React 19 + TS + Tailwind v4 + path alias @/
- [ ] index.css: theme vars, :root, body, scrollbar, keyframes rise/blink/marq, .rv/.vis/.rv-d*
- [ ] App: CanvasBackground → Nav → Hero → PoweredStrip → wrapper with MarqueeStrip + 6 sections + Footer
- [ ] useScrollReveal runs once, observes .rv, adds .vis on intersect
- [ ] Nav: scrolled state, mobile menu, logo + links + CTA, exact copy and classes
- [ ] Hero: overlay gradient, eyebrow, h1, paragraph, two CTAs, rise timings
- [ ] CanvasBackground: resize, raf loop, drawBg/drawGrid/drawTraces/drawPads/drawNodes/drawSignals/drawHouse, nodes 8 sectors, signals along traces, spawn rate
- [ ] PoweredStrip: scroll hide, "Powering" + sector list
- [ ] MarqueeStrip: tech list, marq 28s infinite
- [ ] SectionHeader: SectionEyebrow, SectionTitle, SectionSub
- [ ] PromiseSection: Who we are, copy, 3 pillar cards
- [ ] ServicesSection: What we build, 3 service cards, 2 detail rows + DeliverablesCard, bottom CTA
- [ ] WorkSection: Real projects, 4 case cards (01 featured full width), outcome boxes, footer CTA
- [ ] TrustSection: Why teams choose us, quote card, 4 stat rows
- [ ] ProcessSection: Steps 01–04, 4 security cards
- [ ] CtaSection: Get in touch, headline, buttons, 3 bullets
- [ ] Footer: 4 columns, logo, social, links, copyright + Tamil line
- [ ] Fonts: Fraunces, DM Sans in index.html
- [ ] All section IDs: hero, about, services, work, team, contact for anchor links

Implement every section with the exact content and class names (or equivalent utility styles) so the rebuilt site is 100% faithful in content, flow, design, theme colors, and animations.
