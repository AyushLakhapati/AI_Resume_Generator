import React from 'react';

function About() {
  return (
    <div className="min-h-[80vh]">
      <div className="container mx-auto px-6 py-24 text-center md:text-left">
        <div className="max-w-4xl mx-auto glass-effect p-12 rounded-[3rem] shadow-2xl border border-white/40 animate-fade-in-up">
          <h1 className="text-5xl font-black mb-8 italic">Our <span className="text-primary tracking-tighter">Mission</span></h1>
          
          <div className="space-y-8 text-lg text-slate-800 dark:text-slate-200 leading-relaxed font-bold">
            <p>
              At <strong className="text-slate-900 dark:text-white font-black underline decoration-primary/30">AI Resume</strong>, we believe everyone deserves a shot at their dream career regardless of their design skills. Our mission is to democratize professional branding by bridging the gap between talent and presentation.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
               <div className="p-8 bg-primary/5 rounded-[2rem] border border-primary/20 shadow-inner">
                  <h3 className="font-black text-primary mb-3 italic text-left text-2xl">Intelligence</h3>
                  <p className="text-sm text-left dark:text-slate-300 font-bold leading-relaxed">Using advanced LLM technology to analyze and optimize your professional narrative for maximum impact.</p>
               </div>
               <div className="p-8 bg-secondary/5 rounded-[2rem] border border-secondary/20 shadow-inner">
                  <h3 className="font-black text-secondary mb-3 italic text-left text-2xl">Design</h3>
                  <p className="text-sm text-left dark:text-slate-300 font-bold leading-relaxed">Hand-crafted templates that balance aesthetic appeal with strict ATS compatibility standards.</p>
               </div>
            </div>

            <p>
              Founded by a team of passionate developers, we wanted to create a tool that isn't just another form builder. We built an AI engine that understands context, identifies hidden skills, and highlights achievements that capture attention.
            </p>

            <div className="mt-12 pt-10 border-t-2 border-slate-200 dark:border-slate-800">
              <h4 className="text-sm uppercase tracking-[0.2em] font-black text-slate-400 mb-6 text-center">Powered By</h4>
              <div className="flex flex-wrap justify-center gap-8 opacity-60">
                <span className="font-black text-2xl tracking-tighter text-slate-800 dark:text-slate-200">Ollama</span>
                <span className="font-black text-2xl tracking-tighter text-slate-800 dark:text-slate-200">Spring Boot</span>
                <span className="font-black text-2xl tracking-tighter text-slate-800 dark:text-slate-200">React</span>
                <span className="font-black text-2xl tracking-tighter text-slate-800 dark:text-slate-200">Tailwind</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About;