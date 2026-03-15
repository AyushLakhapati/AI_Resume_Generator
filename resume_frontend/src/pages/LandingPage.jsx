import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen transition-colors duration-300">
      {/* Hero Section */}
      <section 
        className="relative hero min-h-[90vh] overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/70 to-transparent dark:via-slate-900/80"></div>
        
        <div className="hero-content relative z-10 container mx-auto px-6 flex flex-col lg:flex-row items-center justify-between pointer-events-none">
          <div className="max-w-xl text-left animate-fade-in-up pointer-events-auto">
            <div className="badge badge-primary badge-outline mb-4 font-bold tracking-widest px-4 py-3 border-2">AI-POWERED GENERATOR</div>
            <h1 className="text-6xl md:text-7xl font-black text-white leading-tight mb-6 mt-2">
              Step Into Your <span className="text-gradient">Future</span>
            </h1>
            <p className="text-xl text-slate-100 leading-relaxed mb-10 max-w-lg font-bold drop-shadow-lg">
              Craft a professional, ATS-friendly resume in seconds. Let our AI handle the design while you focus on landing that dream job.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to={"/generate-resume"} className="btn btn-primary btn-lg rounded-2xl px-10 shadow-xl shadow-primary/30 hover:scale-105 transition-all text-white border-none">
                Create My Resume
              </Link>
              <Link to={"/services"} className="btn btn-ghost btn-lg text-white font-bold rounded-2xl border-2 border-white/40 hover:bg-white/10 backdrop-blur-md">
                Explore Features
              </Link>
            </div>
          </div>

          <div className="hidden lg:block lg:w-1/3 animate-fade-in-up delay-200 pointer-events-auto">
             <div className="glass-dark p-8 rounded-[2rem] shadow-2xl border border-white/20 scale-110">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center text-white text-2xl font-bold italic shadow-lg shadow-primary/30">AI</div>
                  <div>
                    <h3 className="text-white font-bold text-lg">Smart Analyzer</h3>
                    <p className="text-slate-300 text-xs font-bold uppercase tracking-wider">Processing profile...</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-3/4 animate-pulse shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
                  </div>
                  <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-secondary w-1/2 animate-pulse delay-75 shadow-[0_0_10px_rgba(168,85,247,0.5)]"></div>
                  </div>
                  <div className="mt-8 p-5 bg-white/5 rounded-2xl text-slate-200 text-sm italic border border-white/10 leading-relaxed">
                    "Your experience aligns perfectly with <span className="text-primary font-bold">Senior Engineer</span> roles in top-tier tech firms."
                  </div>
                </div>
             </div>
          </div>
        </div>

        {/* Floating background elements */}
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-base-100 to-transparent z-10"></div>
      </section>

      {/* Features Section */}
      <section className="py-24 relative overflow-hidden bg-white/50 dark:bg-slate-900/50 transition-colors">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20 animate-fade-in-up">
            <h2 className="text-5xl font-black mb-4 text-slate-900 dark:text-white">Why Choose Our <span className="text-primary italic">AI</span></h2>
            <p className="text-slate-700 dark:text-slate-400 text-lg max-w-2xl mx-auto italic font-black">Cutting-edge technology meets professional career growth.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Feature 1 */}
            <div className="group p-10 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
              <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-3xl mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all shadow-lg">🚀</div>
              <h3 className="text-2xl font-black mb-4 text-slate-900 dark:text-white italic">Ollama Integration</h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-bold">
                Leveraging the power of local LLMs to analyze your skills and generate high-impact professional summaries that get noticed.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="group p-10 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
              <div className="w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center text-3xl mb-8 group-hover:scale-110 group-hover:bg-secondary group-hover:text-white transition-all shadow-lg">🎨</div>
              <h3 className="text-2xl font-black mb-4 text-slate-900 dark:text-white italic">Modern Templates</h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-bold">
                Choose from Classic, Modern, or Creative layouts tailored to stand out in today's competitive job market with style.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="group p-10 rounded-3xl bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/50 shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
              <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center text-3xl mb-8 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-white transition-all shadow-lg">🌐</div>
              <h3 className="text-2xl font-black mb-4 text-slate-900 dark:text-white italic">ATS Optimized</h3>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-bold">
                Every resume generated is formatted to pass through Applicant Tracking Systems (ATS) with maximum efficiency and clarity.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats/Social Proof Section */}
      <section className="py-20 bg-slate-900 border-y border-white/5 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 rounded-full blur-[100px]"></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <h4 className="text-5xl font-black text-white tracking-tighter">50k+</h4>
              <p className="text-slate-400 text-xs uppercase tracking-widest font-black">Resumes Built</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-5xl font-black text-primary tracking-tighter">98%</h4>
              <p className="text-slate-400 text-xs uppercase tracking-widest font-black">Success Rate</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-5xl font-black text-white tracking-tighter">100%</h4>
              <p className="text-slate-400 text-xs uppercase tracking-widest font-black">Open Source</p>
            </div>
            <div className="space-y-2">
              <h4 className="text-5xl font-black text-secondary tracking-tighter">24/7</h4>
              <p className="text-slate-400 text-xs uppercase tracking-widest font-black">AI Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-32 relative overflow-hidden group bg-base-100 dark:bg-slate-900 transition-colors">
        <div className="absolute inset-0 bg-primary/5 dark:bg-primary/10 group-hover:bg-primary/10 transition-colors"></div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <div className="inline-block p-4 rounded-3xl bg-primary/10 mb-8 animate-bounce">
             <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center text-white text-2xl shadow-lg shadow-primary/20">✨</div>
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-6 dark:text-white italic">
            Stop Searching, Start <span className="text-gradient">Landing</span>
          </h2>
          <p className="mb-12 text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed italic">
            "Your dream job is just a few descriptive sentences away. Let's build your professional story together."
          </p>
          <Link to="/generate-resume" className="btn btn-primary btn-lg rounded-2xl px-16 shadow-2xl hover:scale-110 hover:shadow-primary/40 transition-all text-white border-none">
            Get Started Now
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer p-20 bg-slate-950 text-slate-300 border-t border-white/5">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-16">
          <div className="md:col-span-2">
            <h4 className="text-3xl font-black mb-6 text-white tracking-tighter"><span className="text-primary italic">AI</span> Resume</h4>
            <p className="text-lg text-slate-400 mb-8 max-w-md font-medium leading-relaxed">
              The world's most intuitive AI resume generator. Built by developers, for developers, to bridge the gap between talent and opportunity.
            </p>
            <div className="flex gap-4">
               {/* Social Icons Placeholders */}
               <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer shadow-lg group">
                <span className="font-bold">In</span>
               </div>
               <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer shadow-lg group">
                <span className="font-bold">Tw</span>
               </div>
               <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-primary hover:text-white transition-all cursor-pointer shadow-lg group">
                <span className="font-bold">Gh</span>
               </div>
            </div>
          </div>
          <div>
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-8">Platform</h4>
            <ul className="space-y-4 font-bold text-slate-400">
              <li><Link to="/about" className="hover:text-primary transition-colors">How it works</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">Templates</Link></li>
              <li><Link to="/generate-resume" className="hover:text-primary transition-colors">AI Engine</Link></li>
              <li><Link to="/contact" className="hover:text-primary transition-colors">Support</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-black uppercase tracking-[0.2em] text-xs mb-8">Contact</h4>
            <ul className="space-y-4 font-bold">
              <li className="text-slate-500 hover:text-slate-300 transition-colors cursor-pointer">hello@airesume.com</li>
              <li className="text-slate-500 hover:text-slate-300 transition-colors cursor-pointer">+1 (555) 123-4567</li>
              <li className="text-slate-500 hover:text-slate-300 transition-colors cursor-pointer">Silicon Valley, CA</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
