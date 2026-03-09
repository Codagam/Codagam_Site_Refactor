const ITEMS = [
  "Next.js",
  "React",
  "TypeScript",
  "MongoDB",
  "Node.js",
  "C# / .NET",
  "SQL Server",
  "React Native",
  "Prisma",
  "AWS",
  "Vercel",
  "Tailwind CSS",
  "Docker",
  "Groq",
];

export function MarqueeStrip() {
  const chunk = (
    <>
      {ITEMS.flatMap((item) => [
        <span key={`${item}-t`} className="text-[.72rem] font-normal tracking-[.08em] uppercase text-white/30">
          {item}
        </span>,
        <span key={`${item}-d`} className="text-[var(--acc2)] text-[.5rem] opacity-50">
          ✦
        </span>,
      ])}
    </>
  );

  return (
    <div
      className="bg-[rgba(8,14,56,.98)] py-3.5 overflow-hidden whitespace-nowrap border-t border-b border-[var(--border)]"
      aria-hidden
    >
      <div className="inline-flex gap-10 animate-[marq_28s_linear_infinite]">
        {chunk}
        {chunk}
      </div>
    </div>
  );
}
