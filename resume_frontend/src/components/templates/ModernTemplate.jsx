import React from "react";
import { FaGithub, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ModernTemplate = ({ data, resumeRef }) => {
  return (
    <div
      ref={resumeRef}
      className="max-w-4xl mx-auto bg-white text-gray-800 p-10 shadow-xl border-t-8 border-primary rounded-sm transition-all duration-300"
    >
      {/* Header Section */}
      <header className="mb-8">
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 border-b-2 border-gray-100 pb-4 mb-4">
          {data.personalInformation.fullName}
        </h1>
        <div className="flex flex-wrap gap-y-2 text-sm text-gray-600 font-medium">
          <span className="flex items-center mr-6"><FaMapMarkerAlt className="mr-2 text-primary" /> {data.personalInformation.location}</span>
          {data.personalInformation.email && (
            <span className="flex items-center mr-6"><FaEnvelope className="mr-2 text-primary" /> {data.personalInformation.email}</span>
          )}
          {data.personalInformation.phoneNumber && (
            <span className="flex items-center mr-6"><FaPhone className="mr-2 text-primary" /> {data.personalInformation.phoneNumber}</span>
          )}
          {data.personalInformation.linkedIn && (
            <span className="flex items-center mr-6"><FaLinkedin className="mr-2 text-primary" /> LinkedIn</span>
          )}
          {data.personalInformation.gitHub && (
            <span className="flex items-center mr-6"><FaGithub className="mr-2 text-primary" /> GitHub</span>
          )}
        </div>
      </header>

      {/* Summary */}
      <section className="mb-8">
        <h2 className="text-xs uppercase tracking-widest font-black text-primary mb-3">Professional Summary</h2>
        <p className="text-gray-700 leading-relaxed text-lg italic">"{data.summary}"</p>
      </section>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-8">
          {/* Experience */}
          <section>
            <h2 className="text-xs uppercase tracking-widest font-black text-primary mb-4 border-b border-gray-100 pb-1">Experience</h2>
            {(data.experience || []).map((exp, index) => (
              <div key={index} className="mb-6 group">
                <div className="flex justify-between items-baseline">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">{exp?.jobTitle}</h3>
                  <span className="text-sm font-semibold text-gray-400">{exp?.duration}</span>
                </div>
                <p className="text-md font-semibold text-gray-600 mb-2">{exp?.company} | {exp?.location}</p>
                <p className="text-gray-600 leading-relaxed">{exp?.responsibility}</p>
              </div>
            ))}
          </section>

          {/* Projects */}
          {data.projects && data.projects.length > 0 && (
            <section>
              <h2 className="text-xs uppercase tracking-widest font-black text-primary mb-4 border-b border-gray-100 pb-1">Key Projects</h2>
              {(data.projects || []).map((proj, index) => (
                <div key={index} className="mb-6">
                  <h3 className="text-lg font-bold text-gray-800">{proj?.title}</h3>
                  <p className="text-gray-600 mb-2">{proj?.description}</p>
                  <p className="text-sm font-mono text-gray-500 bg-gray-50 p-2 rounded">
                    {proj?.technologiesUsed?.join(", ")}
                  </p>
                </div>
              ))}
            </section>
          )}
        </div>

        <div className="space-y-8">
          {/* Skills */}
          <section>
            <h2 className="text-xs uppercase tracking-widest font-black text-primary mb-4 border-b border-gray-100 pb-1">Top Skills</h2>
            <div className="flex flex-wrap gap-2">
              {(data.skills || []).map((skill, index) => (
                <span key={index} className="px-3 py-1 bg-gray-100 text-gray-800 text-xs font-bold rounded-full">
                  {skill?.title}
                </span>
              ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <h2 className="text-xs uppercase tracking-widest font-black text-primary mb-4 border-b border-gray-100 pb-1">Education</h2>
            {(data.education || []).map((edu, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-sm font-bold text-gray-900">{edu?.degree}</h3>
                <p className="text-xs text-gray-600">{edu?.university}</p>
                <p className="text-xs font-semibold text-gray-400">{edu?.graduationYear}</p>
              </div>
            ))}
          </section>

          {/* Languages */}
          {data.languages && data.languages.length > 0 && (
            <section>
              <h2 className="text-xs uppercase tracking-widest font-black text-primary mb-4 border-b border-gray-100 pb-1">Languages</h2>
              <div className="text-sm text-gray-600 space-y-1">
                {data.languages.map((lang, index) => (
                  <p key={index} className="font-medium">• {lang?.name}</p>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
