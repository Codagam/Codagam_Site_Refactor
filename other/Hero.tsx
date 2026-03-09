const HERO_OVERLAY =
  "linear-gradient(to bottom, rgba(10,18,69,.6) 0%, transparent 35%), linear-gradient(to right, rgba(10,18,69,.95) 0%, rgba(10,18,69,.8) 28%, rgba(10,18,69,.35) 55%, transparent 75%)";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative z-10 min-h-screen flex flex-col justify-center items-start pt-24 pb-20 px-6 sm:px-10 lg:px-[5vw] pointer-events-none font-sans"
    >
      <div
        className="fixed inset-0 z-1 pointer-events-none"
        style={{ background: HERO_OVERLAY }}
        aria-hidden
      />
      <div className="relative z-2 w-full max-w-[520px] lg:max-w-[44%] mx-auto lg:mx-0">
        <div className="inline-flex items-center gap-2 text-[.68rem] font-medium uppercase tracking-[.14em] text-(--acc2) bg-[rgba(5,12,55,.92)] border border-white/12 py-1.5 px-4 rounded-full mb-7 opacity-0 animate-[rise_.8s_.3s_cubic-bezier(.22,1,.36,1)_forwards] shadow-[0_18px_45px_rgba(1,5,32,.95)] backdrop-blur-[6px]">
          <span className="w-1.5 h-1.5 rounded-full bg-(--acc2) shadow-[0_0_7px_var(--acc2)] animate-[blink_2.5s_ease-in-out_infinite]" />
          Code + Agam · Tamil Nadu, India
        </div>
        <h1 className="font-(--font-serif) text-[clamp(2.2rem,4.5vw,4.75rem)] text-white leading-[1.07] tracking-[-.03em] mb-5 opacity-0 animate-[rise_.8s_.5s_cubic-bezier(.22,1,.36,1)_forwards] [&_em]:italic [&_em]:font-light [&_em]:text-(--acc2)">
          The mind that
          <br />
          powers your
          <br />
          <em>world.</em>
        </h1>
        <p className="text-[clamp(.875rem,1.3vw,1.05rem)] text-(--text-dim) leading-8 max-w-[400px] mb-9 opacity-0 animate-[rise_.8s_.7s_cubic-bezier(.22,1,.36,1)_forwards]">
          Agam — mind, home, inside — meets precision engineering. Bespoke
          software powering aviation, healthcare, hospitality and more.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 items-stretch sm:items-center flex-wrap pointer-events-auto opacity-0 animate-[rise_.8s_.9s_cubic-bezier(.22,1,.36,1)_forwards]">
          <a
            href="#contact"
            className="inline-flex justify-center sm:justify-start items-center w-full sm:w-auto rounded-[999px] bg-white text-(--bg-deep)! px-7 py-3 font-(--font-sans) text-[.9rem] shadow-[0_14px_40px_rgba(0,0,0,.45)] transition-colors duration-150 hover:bg-(--acc2) hover:text-(--bg-deep)! hover:-translate-y-0.5"
          >
            Book a discovery call →
          </a>
          <a
            href="#work"
            className="text-[.85rem] text-(--text-dim) border-b border-white/15 pb-0.5 hover:text-white hover:border-white/35 transition-colors cursor-pointer"
          >
            See our work
          </a>
        </div>
      </div>
    </section>
  );
}
