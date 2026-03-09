"use client";

import { useEffect, useRef } from "react";

const SECTORS = [
  { deg: 20, label: "Finance", icon: "◈", r: 1 },
  { deg: 75, label: "Aviation", icon: "✈", r: 1.15 },
  { deg: 115, label: "Education", icon: "◉", r: 1.05 },
  { deg: 155, label: "Healthcare", icon: "✚", r: 1 },
  { deg: 205, label: "Logistics", icon: "⊞", r: 1.05 },
  { deg: 245, label: "Hospitality", icon: "⌂", r: 1 },
  { deg: 290, label: "Government", icon: "⊙", r: 1.1 },
  { deg: 335, label: "Retail", icon: "◫", r: 0.95 }
];

interface HouseParams {
  u: number;
  hcx: number;
  hcy: number;
  hw: number;
  bh: number;
  rh: number;
  bx: number;
  by: number;
  bw: number;
  rL: { x: number; y: number };
  rR: { x: number; y: number };
  rTop: { x: number; y: number };
  chx: number;
  chy: number;
  chw: number;
  chh: number;
  dx: number;
  dy: number;
  dw: number;
  dh: number;
  wL: { x: number; y: number; w: number; h: number };
  wR: { x: number; y: number; w: number; h: number };
}

interface Node {
  x: number;
  y: number;
  label: string;
  icon: string;
  deg: number;
  phase: number;
  pulseR: number;
}

interface Trace {
  pts: { x: number; y: number }[];
  nodeIdx: number;
  decor?: boolean;
}

interface Signal {
  trace: Trace;
  t: number;
  dir: number;
  speed: number;
  r: number;
  tail: { x: number; y: number }[];
  opacity: number;
  dead: boolean;
}

function polyLen(pts: { x: number; y: number }[]): number {
  let l = 0;
  for (let i = 1; i < pts.length; i++) {
    const dx = pts[i].x - pts[i - 1].x,
      dy = pts[i].y - pts[i - 1].y;
    l += Math.sqrt(dx * dx + dy * dy);
  }
  return l;
}

function pointAtT(
  pts: { x: number; y: number }[],
  t: number
): { x: number; y: number } {
  const total = polyLen(pts);
  let target = t * total,
    acc = 0;
  for (let i = 1; i < pts.length; i++) {
    const dx = pts[i].x - pts[i - 1].x,
      dy = pts[i].y - pts[i - 1].y,
      seg = Math.sqrt(dx * dx + dy * dy);
    if (acc + seg >= target) {
      const f = (target - acc) / seg;
      return {
        x: pts[i - 1].x + dx * f,
        y: pts[i - 1].y + dy * f
      };
    }
    acc += seg;
  }
  return { ...pts[pts.length - 1] };
}

interface CanvasBackgroundProps {
  /** When set, canvas sizes to this container (hero right side) instead of full window */
  containerRef?: React.RefObject<HTMLDivElement | null>;
}

export function CanvasBackground({ containerRef }: CanvasBackgroundProps = {}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const c = canvas;
    const g = ctx;

    let W: number, H: number, dpr: number, isMobile: boolean;
    let H_: HouseParams;
    let nodes: Node[] = [];
    let traces: Trace[] = [];
    let signals: Signal[] = [];
    let t0: number | null = null;
    let lastSpawn = 0;

    function resize() {
      const el = containerRef?.current;
      if (containerRef && el) {
        W = el.clientWidth;
        H = el.clientHeight;
        if (W <= 0 || H <= 0) return;
      } else {
        W = window.innerWidth;
        H = window.innerHeight;
      }
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = W * dpr;
      c.height = H * dpr;
      c.style.width = W + "px";
      c.style.height = H + "px";
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      isMobile = W < 768;
      build();
    }

    function buildHouse() {
      const u = isMobile ? Math.min(W, H) * 0.04 : Math.min(W, H) * 0.046;
      const hcx = isMobile ? W * 0.62 : W * 0.64;
      const hcy = isMobile ? H * 0.38 : H * 0.46;
      const hw = u * 3,
        bh = u * 2.5,
        rh = u * 2.1;
      H_ = {
        u,
        hcx,
        hcy,
        hw,
        bh,
        rh,
        bx: hcx - hw,
        by: hcy - bh / 2,
        bw: hw * 2,
        rL: { x: hcx - hw - u * 0.2, y: hcy - bh / 2 },
        rR: { x: hcx + hw + u * 0.2, y: hcy - bh / 2 },
        rTop: { x: hcx, y: hcy - bh / 2 - rh },
        chx: hcx + hw * 0.28,
        chy: hcy - bh / 2 - rh + u * 0.45,
        chw: u * 0.3,
        chh: u * 0.62,
        dx: hcx - u * 0.38,
        dy: hcy + bh / 2 - u * 1.1,
        dw: u * 0.76,
        dh: u * 1.1,
        wL: {
          x: hcx - hw + u * 0.6,
          y: hcy - u * 0.45,
          w: u * 0.72,
          h: u * 0.56
        },
        wR: { x: hcx + u * 0.1, y: hcy - u * 0.45, w: u * 0.72, h: u * 0.56 }
      };
    }

    function buildNodes() {
      nodes = [];
      const { hcx, hcy, u } = H_;
      const baseR = isMobile ? Math.min(W, H) * 0.3 : Math.min(W, H) * 0.32;
      const limit = isMobile ? 5 : SECTORS.length;
      const step = isMobile ? Math.floor(SECTORS.length / limit) : 1;
      for (let i = 0; i < limit; i++) {
        const s = SECTORS[i * step];
        const rad = (s.deg * Math.PI) / 180;
        const r = baseR * s.r;
        let nx = hcx + Math.cos(rad) * r;
        let ny = hcy - Math.sin(rad) * r;
        const pad = u * 1.8;
        nx = Math.max(pad, Math.min(W - pad, nx));
        ny = Math.max(pad + 40, Math.min(H - pad - 30, ny));
        nodes.push({
          x: nx,
          y: ny,
          label: s.label,
          icon: s.icon,
          deg: s.deg,
          phase: Math.random() * Math.PI * 2,
          pulseR: Math.random() * 60
        });
      }
    }

    function routePCB(nd: Node, idx: number): { x: number; y: number }[] {
      const { hcx, hcy, bh, bx, by, bw, rTop, u } = H_;
      const nx = nd.x;
      const ny = nd.y;
      const angle = nd.deg;
      let exitX: number, exitY: number;
      if (angle >= 315 || angle < 45) {
        exitX = bx + bw;
        exitY = hcy + u * ((idx % 3) - 1) * 0.35;
      } else if (angle >= 45 && angle < 135) {
        exitX = rTop.x + u * ((idx % 3) - 1) * 0.5;
        exitY = rTop.y;
      } else if (angle >= 135 && angle < 225) {
        exitX = bx;
        exitY = hcy + u * ((idx % 3) - 1) * 0.4;
      } else {
        exitX = bx + bw * (0.3 + (idx % 3) * 0.2);
        exitY = by + bh;
      }
      const offX = exitX < hcx ? -u * 1.5 : u * 1.5;
      const offY = exitY < hcy ? -u * 1.2 : u * 1.2;
      if (exitY === rTop.y) {
        return [
          { x: exitX, y: exitY },
          { x: exitX, y: exitY - u * 1.2 },
          { x: nx, y: exitY - u * 1.2 },
          { x: nx, y: ny }
        ];
      }
      if (exitX === bx || exitX === bx + bw) {
        const midX = exitX + offX;
        return [
          { x: exitX, y: exitY },
          { x: midX, y: exitY },
          { x: midX, y: ny },
          { x: nx, y: ny }
        ];
      }
      const midY = exitY + offY;
      return [
        { x: exitX, y: exitY },
        { x: exitX, y: midY },
        { x: nx, y: midY },
        { x: nx, y: ny }
      ];
    }

    function buildTraces() {
      traces = [];
      const { rTop, bx, by, bw, bh, u } = H_;
      nodes.forEach((nd, i) => {
        traces.push({ pts: routePCB(nd, i), nodeIdx: i });
      });
      [
        [
          { x: rTop.x, y: rTop.y },
          { x: rTop.x, y: rTop.y - u * 1.5 },
          { x: rTop.x - u * 2, y: rTop.y - u * 1.5 },
          { x: rTop.x - u * 2, y: u * 0.5 }
        ],
        [
          { x: bx + bw * 0.65, y: by + bh },
          { x: bx + bw * 0.65, y: by + bh + u * 1.2 },
          { x: bx + bw + u * 1.5, y: by + bh + u * 1.2 },
          { x: bx + bw + u * 1.5, y: H - u * 0.5 }
        ],
        [
          { x: H_.chx + H_.chw / 2, y: H_.chy },
          { x: H_.chx + H_.chw / 2, y: rTop.y - u * 0.8 }
        ]
      ].forEach((pts) => traces.push({ pts, nodeIdx: -1, decor: true }));
    }

    function build() {
      buildHouse();
      buildNodes();
      buildTraces();
      signals = [];
    }

    function drawBg() {
      const { hcx, hcy } = H_;
      const grad = g.createRadialGradient(
        hcx,
        hcy,
        0,
        hcx,
        hcy,
        Math.max(W, H) * 0.9
      );
      grad.addColorStop(0, "#1a2f8e");
      grad.addColorStop(0.35, "#111d6a");
      grad.addColorStop(0.7, "#0d165a");
      grad.addColorStop(1, "#0a1245");
      g.fillStyle = grad;
      g.fillRect(0, 0, W, H);
    }

    function drawGrid() {
      const gridSize = H_.u * 1.6;
      g.strokeStyle = "rgba(255,255,255,.022)";
      g.lineWidth = 0.5;
      for (let x = 0; x < W; x += gridSize) {
        g.beginPath();
        g.moveTo(x, 0);
        g.lineTo(x, H);
        g.stroke();
      }
      for (let y = 0; y < H; y += gridSize) {
        g.beginPath();
        g.moveTo(0, y);
        g.lineTo(W, y);
        g.stroke();
      }
      g.fillStyle = "rgba(255,255,255,.028)";
      for (let x = 0; x < W; x += gridSize)
        for (let y = 0; y < H; y += gridSize) {
          g.beginPath();
          g.arc(x, y, 0.75, 0, Math.PI * 2);
          g.fill();
        }
    }

    function drawTraces() {
      const u = H_.u;
      traces.forEach((tr) => {
        g.strokeStyle = "rgba(255,255,255,.10)";
        g.lineWidth = u * 0.09;
        g.lineCap = "square";
        g.lineJoin = "miter";
        g.beginPath();
        tr.pts.forEach((p, i) =>
          i === 0 ? g.moveTo(p.x, p.y) : g.lineTo(p.x, p.y)
        );
        g.stroke();
        g.strokeStyle = "rgba(255,255,255,.22)";
        g.lineWidth = u * 0.035;
        g.beginPath();
        tr.pts.forEach((p, i) =>
          i === 0 ? g.moveTo(p.x, p.y) : g.lineTo(p.x, p.y)
        );
        g.stroke();
      });
    }

    function drawPads() {
      const u = H_.u;
      traces.forEach((tr) => {
        tr.pts.slice(1, -1).forEach((p) => {
          g.strokeStyle = "rgba(255,255,255,.3)";
          g.lineWidth = u * 0.055;
          g.beginPath();
          g.arc(p.x, p.y, u * 0.18, 0, Math.PI * 2);
          g.stroke();
          const s = u * 0.1;
          g.fillStyle = "rgba(17,35,120,.9)";
          g.fillRect(p.x - s, p.y - s, s * 2, s * 2);
          g.strokeStyle = "rgba(255,255,255,.35)";
          g.lineWidth = u * 0.04;
          g.strokeRect(p.x - s, p.y - s, s * 2, s * 2);
        });
      });
    }

    function drawNodes(now: number) {
      const u = H_.u;
      nodes.forEach((nd) => {
        const pulse = 0.5 + 0.5 * Math.sin(now * 0.0014 + nd.phase);
        const r = u * 0.52;
        nd.pulseR += 0.35;
        if (nd.pulseR > r * 4.5) nd.pulseR = 0;
        const pA = (1 - nd.pulseR / (r * 4.5)) * 0.2;
        g.strokeStyle = `rgba(122,170,245,${pA})`;
        g.lineWidth = u * 0.04;
        g.beginPath();
        g.arc(nd.x, nd.y, nd.pulseR + r, 0, Math.PI * 2);
        g.stroke();
        const grd = g.createRadialGradient(nd.x, nd.y, 0, nd.x, nd.y, r * 4);
        grd.addColorStop(0, `rgba(91,141,238,${0.18 + 0.07 * pulse})`);
        grd.addColorStop(1, "transparent");
        g.fillStyle = grd;
        g.beginPath();
        g.arc(nd.x, nd.y, r * 4, 0, Math.PI * 2);
        g.fill();
        g.strokeStyle = `rgba(122,170,245,${0.35 + 0.2 * pulse})`;
        g.lineWidth = u * 0.065;
        g.beginPath();
        g.arc(nd.x, nd.y, r * 1.55, 0, Math.PI * 2);
        g.stroke();
        const bodyG = g.createRadialGradient(
          nd.x - r * 0.3,
          nd.y - r * 0.3,
          0,
          nd.x,
          nd.y,
          r
        );
        bodyG.addColorStop(0, "rgba(30,50,140,.95)");
        bodyG.addColorStop(1, "rgba(10,18,70,.95)");
        g.fillStyle = bodyG;
        g.strokeStyle = `rgba(255,255,255,${0.3 + 0.12 * pulse})`;
        g.lineWidth = u * 0.07;
        g.beginPath();
        g.arc(nd.x, nd.y, r, 0, Math.PI * 2);
        g.fill();
        g.stroke();
        g.fillStyle = `rgba(255,255,255,${0.75 + 0.15 * pulse})`;
        g.font = `${u * 0.52}px serif`;
        g.textAlign = "center";
        g.textBaseline = "middle";
        g.fillText(nd.icon, nd.x, nd.y);
        g.fillStyle = `rgba(255,255,255,${0.5 + 0.1 * pulse})`;
        g.font = `${u * 0.27}px 'DM Sans',sans-serif`;
        g.textAlign = "center";
        g.textBaseline = "top";
        g.fillText(nd.label, nd.x, nd.y + r + u * 0.22);
        g.fillStyle = `rgba(122,170,245,${0.5 + 0.3 * pulse})`;
        g.beginPath();
        g.arc(nd.x, nd.y, u * 0.09, 0, Math.PI * 2);
        g.fill();
      });
    }

    function drawHouse(now: number) {
      const {
        hcx,
        hcy,
        bh,
        bx,
        by,
        bw,
        rL,
        rR,
        rTop,
        dx,
        dy,
        dw,
        dh,
        wL,
        wR,
        chx,
        chy,
        chw,
        chh,
        u
      } = H_;
      const pulse = 0.5 + 0.5 * Math.sin(now * 0.001);
      const halo = g.createRadialGradient(hcx, hcy, u, hcx, hcy, u * 7.5);
      halo.addColorStop(0, `rgba(91,141,238,${0.22 + 0.07 * pulse})`);
      halo.addColorStop(0.5, "rgba(26,50,155,.08)");
      halo.addColorStop(1, "transparent");
      g.fillStyle = halo;
      g.beginPath();
      g.ellipse(hcx, hcy, u * 7.5, u * 6, 0, 0, Math.PI * 2);
      g.fill();
      g.fillStyle = "rgba(15,30,100,.4)";
      g.strokeStyle = "rgba(255,255,255,.06)";
      g.lineWidth = u * 0.04;
      g.beginPath();
      (
        g as CanvasRenderingContext2D & {
          roundRect?: (
            x: number,
            y: number,
            w: number,
            h: number,
            r: number
          ) => void;
        }
      ).roundRect?.(
        bx - u * 0.4,
        by - u * 0.4,
        bw + u * 0.8,
        bh + u * 0.8,
        u * 0.3
      ) ?? g.rect(bx - u * 0.4, by - u * 0.4, bw + u * 0.8, bh + u * 0.8);
      g.fill();
      g.stroke();
      [
        [bx + u * 0.22, by + u * 0.22],
        [bx + bw - u * 0.22, by + u * 0.22],
        [bx + u * 0.22, by + bh - u * 0.22],
        [bx + bw - u * 0.22, by + bh - u * 0.22]
      ].forEach(([px, py]) => {
        g.strokeStyle = "rgba(255,255,255,.18)";
        g.lineWidth = u * 0.05;
        g.beginPath();
        g.arc(px, py, u * 0.14, 0, Math.PI * 2);
        g.stroke();
        g.fillStyle = "rgba(10,18,69,.9)";
        g.beginPath();
        g.arc(px, py, u * 0.07, 0, Math.PI * 2);
        g.fill();
      });
      g.fillStyle = "rgba(15,28,100,.48)";
      g.fillRect(bx, by, bw, bh);
      g.strokeStyle = `rgba(255,255,255,${0.58 + 0.1 * pulse})`;
      g.lineWidth = u * 0.09;
      g.lineJoin = "round";
      g.lineCap = "round";
      g.strokeRect(bx, by, bw, bh);
      g.strokeStyle = `rgba(255,255,255,${0.65 + 0.1 * pulse})`;
      g.lineWidth = u * 0.1;
      g.lineJoin = "miter";
      g.beginPath();
      g.moveTo(rL.x, rL.y);
      g.lineTo(rTop.x, rTop.y);
      g.lineTo(rR.x, rR.y);
      g.stroke();
      const rGrd = g.createLinearGradient(rL.x, rL.y, rTop.x, rTop.y);
      rGrd.addColorStop(0, "transparent");
      rGrd.addColorStop(0.5, `rgba(122,170,245,${0.6 + 0.2 * pulse})`);
      rGrd.addColorStop(1, "transparent");
      g.strokeStyle = rGrd;
      g.lineWidth = u * 0.045;
      g.beginPath();
      g.moveTo(rL.x, rL.y);
      g.lineTo(rTop.x, rTop.y);
      g.lineTo(rR.x, rR.y);
      g.stroke();
      g.strokeStyle = `rgba(255,255,255,${0.38 + 0.08 * pulse})`;
      g.lineWidth = u * 0.08;
      g.lineJoin = "round";
      g.strokeRect(chx, chy, chw, chh);
      g.strokeStyle = "rgba(255,255,255,.55)";
      g.lineWidth = u * 0.07;
      g.lineJoin = "round";
      g.strokeRect(dx, dy, dw, dh);
      g.beginPath();
      g.arc(dx + dw / 2, dy, dw / 2, Math.PI, 0);
      g.stroke();
      g.fillStyle = `rgba(122,170,245,${0.7 + 0.2 * pulse})`;
      g.beginPath();
      g.arc(dx + dw * 0.72, dy + dh * 0.52, u * 0.07, 0, Math.PI * 2);
      g.fill();
      [wL, wR].forEach((w, wi) => {
        g.strokeStyle = "rgba(255,255,255,.45)";
        g.lineWidth = u * 0.065;
        g.strokeRect(w.x, w.y, w.w, w.h);
        g.beginPath();
        g.moveTo(w.x + w.w / 2, w.y);
        g.lineTo(w.x + w.w / 2, w.y + w.h);
        g.moveTo(w.x, w.y + w.h / 2);
        g.lineTo(w.x + w.w, w.y + w.h / 2);
        g.stroke();
        g.fillStyle = `rgba(91,141,238,${0.08 + 0.05 * Math.sin(now * 0.0012 + wi)})`;
        g.fillRect(w.x, w.y, w.w, w.h);
      });
      g.save();
      g.beginPath();
      g.rect(bx + 1, by + 1, bw - 2, bh - 2);
      g.clip();
      g.strokeStyle = `rgba(122,170,245,${0.14 + 0.05 * pulse})`;
      g.lineWidth = u * 0.04;
      g.setLineDash([u * 0.12, u * 0.18]);
      g.beginPath();
      g.moveTo(bx + u * 0.35, hcy - u * 0.25);
      g.lineTo(bx + bw - u * 0.35, hcy - u * 0.25);
      g.stroke();
      g.beginPath();
      g.moveTo(hcx, by + u * 0.3);
      g.lineTo(hcx, by + bh - dh - u * 0.15);
      g.stroke();
      g.setLineDash([]);
      [
        { x: hcx - u * 0.7, y: hcy - u * 0.25 },
        { x: hcx + u * 0.7, y: hcy - u * 0.25 },
        { x: hcx, y: hcy - u * 0.25 }
      ].forEach((p) => {
        g.fillStyle = `rgba(122,170,245,${0.35 + 0.15 * pulse})`;
        g.beginPath();
        g.arc(p.x, p.y, u * 0.09, 0, Math.PI * 2);
        g.fill();
      });
      g.restore();
    }

    function spawnSignal() {
      if (!traces.length) return;
      const pool = traces.filter((t) => !t.decor);
      const tr = pool[Math.floor(Math.random() * pool.length)];
      const out = Math.random() > 0.3;
      signals.push({
        trace: tr,
        t: out ? 0 : 1,
        dir: out ? 1 : -1,
        speed: 0.002 + Math.random() * 0.003,
        r: H_.u * 0.11,
        tail: [],
        opacity: 0,
        dead: false
      });
    }

    function updateSignals() {
      signals = signals.filter((s) => !s.dead);
      signals.forEach((s) => {
        s.t += s.dir * s.speed;
        if (s.t <= 0 || s.t >= 1) s.dead = true;
        s.opacity = s.t < 0.05 ? s.t / 0.05 : s.t > 0.88 ? (1 - s.t) / 0.12 : 1;
      });
    }

    function drawSignals() {
      signals.forEach((s) => {
        if (s.dead) return;
        const pos = pointAtT(s.trace.pts, Math.max(0, Math.min(1, s.t)));
        s.tail.unshift({ ...pos });
        if (s.tail.length > 22) s.tail.pop();
        s.tail.forEach((tp, i) => {
          const a = (1 - i / s.tail.length) * s.opacity * 0.6;
          const r = s.r * (1 - (i / s.tail.length) * 0.55);
          g.fillStyle = `rgba(255,255,255,${a})`;
          g.beginPath();
          g.arc(tp.x, tp.y, r, 0, Math.PI * 2);
          g.fill();
        });
        const hg = g.createRadialGradient(
          pos.x,
          pos.y,
          0,
          pos.x,
          pos.y,
          s.r * 5
        );
        hg.addColorStop(0, `rgba(180,210,255,${s.opacity * 0.85})`);
        hg.addColorStop(0.5, `rgba(122,170,245,${s.opacity * 0.4})`);
        hg.addColorStop(1, "transparent");
        g.fillStyle = hg;
        g.beginPath();
        g.arc(pos.x, pos.y, s.r * 5, 0, Math.PI * 2);
        g.fill();
      });
    }

    function render(ts: number) {
      if (!t0) t0 = ts;
      const now = ts - t0;
      if (containerRef && (W <= 0 || H <= 0 || !H_)) {
        resize();
        if (W <= 0 || H <= 0) {
          rafId = requestAnimationFrame(render);
          return;
        }
      }
      g.clearRect(0, 0, W, H);
      drawBg();
      drawGrid();
      drawTraces();
      drawPads();
      drawNodes(now);
      drawSignals();
      drawHouse(now);
      updateSignals();
      if (now < 800 && signals.length < nodes.length) spawnSignal();
      const rate = 350 + Math.random() * 200;
      if (now - lastSpawn > rate) {
        spawnSignal();
        lastSpawn = now;
      }
      rafId = requestAnimationFrame(render);
    }

    let rafId: number;
    resize();
    rafId = requestAnimationFrame(render);

    const onResize = () => {
      t0 = null;
      resize();
    };
    window.addEventListener("resize", onResize, { passive: true });

    let resizeObserver: ResizeObserver | undefined;
    const el = containerRef?.current;
    if (el) {
      resizeObserver = new ResizeObserver(() => {
        t0 = null;
        resize();
      });
      resizeObserver.observe(el);
    }

    return () => {
      window.removeEventListener("resize", onResize);
      resizeObserver?.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [containerRef]);

  return (
    <canvas
      id="c"
      ref={canvasRef}
      className={containerRef ? "absolute inset-0 h-full w-full block" : "fixed inset-0 h-full w-full block z-0"}
      aria-hidden
    />
  );
}
