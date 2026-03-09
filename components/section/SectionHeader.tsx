import * as React from "react";

export function SectionEyebrow({
  eyebrow,
  className,
}: {
  eyebrow: string;
  className?: string;
}) {
  return (
    <p
      className={
        "mb-4 flex items-center gap-2.5 text-[.7rem] font-medium uppercase tracking-[.14em] text-white/30 before:h-px before:w-6 before:shrink-0 before:bg-(--acc2) before:opacity-40 " +
        (className ?? "")
      }
      style={{ minHeight: 0 }}>
      {eyebrow}
    </p>
  );
}

export function SectionTitle({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={
        "mb-2 text-[clamp(2rem,4vw,3.25rem)] font-light tracking-tight text-white [&_em]:italic [&_em]:text-(--acc2) " +
        (className ?? "")
      }>
      {children}
    </h2>
  );
}

export function SectionSub({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <p
      className={
        "mt-3 max-w-[540px] text-base leading-8 text-(--text-dim) " +
        (className ?? "")
      }>
      {children}
    </p>
  );
}
