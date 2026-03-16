import React from "react";

function Services() {
  const services = [
    {
      title: "AI Resume Generation",
      desc: "Our core engine uses advanced Ollama-powered LLMs to transform your description into a professional resume with perfect grammar and impact.",
      icon: "⚡"
    },
    {
      title: "Multiple Templates",
      desc: "Choose from Classic, Modern, or Creative templates. All designs are battle-tested for ATS compatibility and human readability.",
      icon: "🎨"
    },
    {
      title: "Smart Keyword Analysis",
      desc: "We scan your industry requirements and suggest the best keywords to ensure your resume reaches the recruiters' hands.",
      icon: "🔍"
    },
    {
      title: "Instant Export",
      desc: "Download your beautifully designed resume in high-quality PDF format in just one click, ready for your next application.",
      icon: "📥"
    }
  ];

  return (
    <div className="min-h-[80vh]">
      <div className="container mx-auto px-6 py-24">
        <div className="text-center mb-16 animate-fade-in-up">
           <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-4 italic dark:text-white">Premium <span className="text-primary tracking-tighter">Services</span></h1>
           <p className="text-slate-500 dark:text-slate-400 text-lg italic">Empowering your career with next-generation tools.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {services.map((s, i) => (
            <div key={i} className="glass-effect p-10 rounded-[2.5rem] border border-white/40 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all group animate-fade-in-up" style={{animationDelay: `${i * 0.1}s`}}>
               <div className="text-4xl mb-6 group-hover:scale-110 transition-transform">{s.icon}</div>
               <h3 className="text-2xl font-black mb-4 italic dark:text-white">{s.title}</h3>
               <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-medium">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Services;
