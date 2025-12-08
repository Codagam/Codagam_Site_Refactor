const techStack = [
  { icon: "⚛️", name: "React & Next.js" },
  { icon: "📱", name: "React Native" },
  { icon: "🟩", name: "Node.js" },
  { icon: "🐍", name: "FastAPI Python" },
  { icon: "🗄️", name: "MongoDB & SQL" },
  { icon: "☁️", name: "Azure & Vercel" },
  { icon: "🤖", name: "AI/LLM Integration" },
  { icon: "⚙️", name: "n8n Automation" },
];

export default function TechStack() {
  return (
    <section
      id="stack"
      className="py-6 sm:py-8 md:py-10 lg:py-12 bg-slate-50 scroll-mt-[60px] sm:scroll-mt-[70px] w-full overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-5 md:px-6 lg:px-8 xl:px-8 w-full">
        <h2 className="text-2xl min-[375px]:text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 md:mb-8 text-center font-semibold text-blue-900 wrap-break-word px-2 sm:px-0">
          Our Tech Stack
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-3 min-[375px]:gap-4 sm:gap-5 md:gap-6 lg:gap-8 w-full">
          {techStack.map((tech, index) => (
            <div
              key={index}
              className="bg-white p-4 sm:p-6 md:p-8 rounded-xl text-center border border-slate-200 transition-all hover:border-blue-900 hover:-translate-y-1 hover:shadow-md w-full max-w-full">
              <div className="text-3xl sm:text-4xl mb-2 sm:mb-3">
                {tech.icon}
              </div>
              <p className="text-xs sm:text-sm md:text-[15px] font-medium m-0">
                {tech.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
