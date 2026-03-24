import React from "react";
import { FaGithub, FaLinkedin, FaPhone, FaEnvelope, FaGlobe, FaCertificate, FaRocket } from "react-icons/fa";

const CreativeTemplate = ({ data, resumeRef }) => {
  return (
    <div
      ref={resumeRef}
      className="w-full flex bg-white shadow-2xl overflow-hidden rounded-xl transition-all duration-300"
    >
      {/* Sidebar */}
      <aside className="w-1/3 bg-slate-900 text-white p-8 space-y-8">
        <div className="text-left">
          <div className="w-32 h-32 bg-primary/20 rounded-full flex items-center justify-center mx-0 mb-4 border-4 border-primary/30">
            <span className="text-4xl font-black text-primary">{data.personalInformation.fullName.split(' ').map(n=>n[0]).join('')}</span>
          </div>
          <h1 className="text-2xl font-bold leading-tight">{data.personalInformation.fullName}</h1>
          <p className="text-primary font-medium mt-1">{data.personalInformation.location}</p>
        </div>

        <section className="space-y-4">
          <h2 className="text-sm font-black uppercase tracking-widest text-primary/80 border-b border-white/10 pb-2">Contact</h2>
          <div className="space-y-3 text-sm text-slate-300">
            <div className="flex items-center gap-3">
              <FaEnvelope className="text-primary" />
              <span className="truncate">{data.personalInformation.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <FaPhone className="text-primary" />
              <span>{data.personalInformation.phoneNumber}</span>
            </div>
            {data.personalInformation.linkedIn && (
              <div className="flex items-center gap-3">
                <FaLinkedin className="text-primary" />
                <span>LinkedIn</span>
              </div>
            )}
            {data.personalInformation.gitHub && (
              <div className="flex items-center gap-3">
                <FaGithub className="text-primary" />
                <span>GitHub</span>
              </div>
            )}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="text-sm font-black uppercase tracking-widest text-primary/80 border-b border-white/10 pb-2">Top Skills</h2>
          <div className="flex flex-wrap gap-2">
            {(data.skills || []).map((skill, index) => (
              <span key={index} className="px-2 py-1 bg-white/5 border border-white/10 rounded text-xs font-medium">
                {skill?.title}
              </span>
            ))}
          </div>
        </section>

        {data.languages && data.languages.length > 0 && (
          <section className="space-y-4">
            <h2 className="text-sm font-black uppercase tracking-widest text-primary/80 border-b border-white/10 pb-2">Languages</h2>
            <div className="space-y-2 text-sm text-slate-300">
              {data.languages.map((lang, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>{lang?.name}</span>
                  <div className="h-1 w-16 bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-3/4"></div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </aside>

      {/* Main Content */}
      <main className="w-2/3 p-10 space-y-10 bg-slate-50">
        <section>
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-1 bg-primary rounded-full"></div>
            <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Summary</h2>
          </div>
          <p className="text-slate-600 leading-relaxed font-medium">
            {data.summary}
          </p>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-6">
            <div className="h-8 w-1 bg-primary rounded-full"></div>
            <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">Experience</h2>
          </div>
          <div className="space-y-8 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
            {(data.experience || []).map((exp, index) => (
              <div key={index} className="pl-8 relative">
                <div className="absolute left-0 top-1.5 w-4.5 h-4.5 bg-primary border-4 border-slate-50 rounded-full -translate-x-1/2"></div>
                <div className="bg-white p-5 rounded-lg shadow-sm border border-slate-100">
                   <h3 className="text-lg font-bold text-slate-800">{exp?.jobTitle}</h3>
                   <div className="flex justify-between items-center mb-2">
                     <span className="text-primary font-bold text-sm">{exp?.company}</span>
                     <span className="text-xs font-black text-slate-400 uppercase tracking-wider bg-slate-100 px-2 py-1 rounded">{exp?.duration}</span>
                   </div>
                   <p className="text-sm text-slate-600 leading-relaxed">{exp?.responsibility}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-2 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="h-6 w-1 bg-primary rounded-full"></div>
              <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight">Education</h2>
            </div>
            {(data.education || []).map((edu, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-bold text-slate-800">{edu?.degree}</h3>
                <p className="text-sm text-slate-500">{edu?.university}</p>
                <span className="text-xs font-bold text-primary">{edu?.graduationYear}</span>
              </div>
            ))}
          </div>

          {data.projects && data.projects.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="h-6 w-1 bg-primary rounded-full"></div>
                <h2 className="text-lg font-black text-slate-800 uppercase tracking-tight">Projects</h2>
              </div>
              {(data.projects || []).map((proj, index) => (
                <div key={index} className="mb-4 p-3 bg-white rounded border border-slate-100">
                  <h3 className="font-bold text-slate-800 text-sm truncate">{proj?.title}</h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">{proj?.description}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default CreativeTemplate;
