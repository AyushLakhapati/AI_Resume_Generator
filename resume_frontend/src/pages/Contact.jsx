import React from "react";

function Contact() {
  return (
    <div className="min-h-[80vh]">
      <div className="container mx-auto px-6 py-24">
        <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12">
          
          <div className="lg:w-1/2 animate-fade-in-up">
             <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black mb-8 italic dark:text-white">Get in <span className="text-primary tracking-tighter">Touch</span></h1>
             <p className="text-xl text-slate-600 dark:text-slate-300 mb-12 font-medium leading-relaxed">
               Have questions about our AI engine? Need help with a template? Our team is here to support your career journey.
             </p>

             <div className="space-y-6">
                <div className="flex items-center gap-6 glass-effect p-6 rounded-2xl border border-white/40 shadow-sm">
                   <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary text-xl">📧</div>
                   <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">Email Us</h4>
                      <p className="text-slate-500 dark:text-slate-400 font-medium italic">support@airesume.com</p>
                   </div>
                </div>
                <div className="flex items-center gap-6 glass-effect p-6 rounded-2xl border border-white/40 shadow-sm">
                   <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center text-secondary text-xl">📍</div>
                   <div>
                      <h4 className="font-bold text-slate-900 dark:text-white">Location</h4>
                      <p className="text-slate-500 dark:text-slate-400 font-medium italic">Silicon Valley, California</p>
                   </div>
                </div>
             </div>
          </div>

          <div className="lg:w-1/2 glass-effect p-6 sm:p-8 md:p-12 rounded-[3rem] shadow-2xl border border-white/40 animate-fade-in-up delay-200">
             <form className="space-y-6">
                <div className="space-y-2">
                   <label className="text-sm font-black uppercase tracking-widest text-slate-400 ml-2">Full Name</label>
                   <input type="text" placeholder="John Doe" className="input input-bordered w-full bg-white/50 dark:bg-slate-800/50 border-white/50 dark:border-slate-700/50 rounded-2xl focus:ring-2 focus:ring-primary h-14" />
                </div>
                <div className="space-y-2">
                   <label className="text-sm font-black uppercase tracking-widest text-slate-400 ml-2">Email Address</label>
                   <input type="email" placeholder="john@example.com" className="input input-bordered w-full bg-white/50 dark:bg-slate-800/50 border-white/50 dark:border-slate-700/50 rounded-2xl focus:ring-2 focus:ring-primary h-14" />
                </div>
                <div className="space-y-2">
                   <label className="text-sm font-black uppercase tracking-widest text-slate-400 ml-2">Your Message</label>
                   <textarea rows="4" placeholder="How can we help you?" className="textarea textarea-bordered w-full bg-white/50 dark:bg-slate-800/50 border-white/50 dark:border-slate-700/50 rounded-2xl focus:ring-2 focus:ring-primary"></textarea>
                </div>
                <button type="button" className="btn btn-primary w-full h-14 rounded-2xl text-lg font-black shadow-xl shadow-primary/20 text-white border-none">Send Message</button>
             </form>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Contact;
