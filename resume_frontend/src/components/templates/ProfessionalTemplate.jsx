import React from "react";
import { FaGithub, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ProfessionalTemplate = ({ data, resumeRef }) => {
  return (
    <div
      ref={resumeRef}
      className="w-full bg-white text-gray-800 p-10 shadow-lg border-t-8 border-blue-800 font-sans"
    >
      {/* Header */}
      <header className="border-b-2 border-gray-300 pb-6 mb-6">
        <h1 className="text-5xl font-extrabold text-blue-900 tracking-tight uppercase">
          {data?.personalInformation?.fullName}
        </h1>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-sm font-medium text-gray-600">
          {data?.personalInformation?.email && (
            <span className="flex items-center gap-1.5 whitespace-nowrap"><FaEnvelope className="text-blue-800"/> {data.personalInformation.email}</span>
          )}
          {data?.personalInformation?.phoneNumber && (
            <span className="flex items-center gap-1.5 whitespace-nowrap"><FaPhone className="text-blue-800"/> {data.personalInformation.phoneNumber}</span>
          )}
          {data?.personalInformation?.location && (
            <span className="flex items-center gap-1.5 whitespace-nowrap"><FaMapMarkerAlt className="text-blue-800"/> {data.personalInformation.location}</span>
          )}
          {data?.personalInformation?.linkedIn && (
            <a href={data.personalInformation.linkedIn} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors whitespace-nowrap">
              <FaLinkedin className="text-blue-800"/> LinkedIn
            </a>
          )}
          {data?.personalInformation?.gitHub && (
            <a href={data.personalInformation.gitHub} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-blue-600 transition-colors whitespace-nowrap">
              <FaGithub className="text-blue-800"/> GitHub
            </a>
          )}
        </div>
      </header>

      {/* Grid Layout for body */}
      <div className="grid grid-cols-3 gap-8">
        
        {/* Left Column */}
        <div className="col-span-2 space-y-6">
          {/* Summary */}
          {data?.summary && (
            <section>
              <h2 className="text-2xl font-bold text-blue-900 border-b border-gray-300 pb-1 mb-3 uppercase tracking-wider">Professional Summary</h2>
              <p className="text-gray-700 leading-relaxed text-justify">{data.summary}</p>
            </section>
          )}

          {/* Experience */}
          {data?.experience && data.experience.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-blue-900 border-b border-gray-300 pb-1 mb-4 uppercase tracking-wider">Experience</h2>
              <div className="space-y-5">
                {data.experience.map((exp, idx) => (
                  <div key={idx}>
                    <div className="flex flex-wrap justify-between items-baseline gap-2 mb-1">
                      <h3 className="text-xl font-bold text-gray-800">{exp?.jobTitle}</h3>
                      <span className="text-sm font-semibold text-blue-800 bg-blue-50 px-2 py-1 rounded whitespace-nowrap">{exp?.duration}</span>
                    </div>
                    <div className="text-md font-semibold text-gray-600 mb-2">{exp?.company} | {exp?.location}</div>
                    <p className="text-gray-700 leading-relaxed text-sm">{exp?.responsibility}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Projects */}
          {data?.projects && data.projects.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-blue-900 border-b border-gray-300 pb-1 mb-4 uppercase tracking-wider">Projects</h2>
              <div className="space-y-4">
                {data.projects.map((proj, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-lg font-bold text-gray-800">{proj?.title}</h3>
                      {proj?.githubLink && (
                        <a href={proj.githubLink} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                          View Code
                        </a>
                      )}
                    </div>
                    <p className="text-sm text-gray-700 mb-1">{proj?.description}</p>
                    {proj?.technologiesUsed && proj.technologiesUsed.length > 0 && (
                      <p className="text-xs text-gray-500 font-medium">
                        <span className="text-gray-700">Tech Stack:</span> {proj.technologiesUsed.join(", ")}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Right Column */}
        <div className="col-span-1 space-y-6">
          {/* Skills */}
          {data?.skills && data.skills.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-blue-900 border-b border-gray-300 pb-1 mb-3 uppercase tracking-wider">Skills</h2>
              <div className="flex flex-wrap gap-3">
                {data.skills.map((skill, idx) => (
                  <div key={idx} className="flex flex-col bg-gray-50 p-2 rounded border border-gray-100 min-w-[80px]">
                    <span className="font-semibold text-gray-800 text-xs">{skill?.title}</span>
                    <span className="text-[10px] text-blue-700 uppercase font-black">{skill?.level}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {data?.education && data.education.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-blue-900 border-b border-gray-300 pb-1 mb-3 uppercase tracking-wider">Education</h2>
              <div className="space-y-3">
                {data.education.map((edu, idx) => (
                  <div key={idx}>
                    <h3 className="font-bold text-gray-800 text-sm leading-tight">{edu?.degree}</h3>
                    <div className="text-xs text-gray-600 mt-1">{edu?.university}</div>
                    <div className="text-xs text-gray-500">{edu?.location} • {edu?.graduationYear}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Languages */}
          {data?.languages && data.languages.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-blue-900 border-b border-gray-300 pb-1 mb-3 uppercase tracking-wider">Languages</h2>
              <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                {data.languages.map((lang, idx) => (
                  <li key={idx} className="marker:text-blue-800">{lang?.name}</li>
                ))}
              </ul>
            </section>
          )}

          {/* Interests */}
          {data?.interests && data.interests.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-blue-900 border-b border-gray-300 pb-1 mb-3 uppercase tracking-wider">Interests</h2>
              <div className="flex flex-wrap gap-2">
                {data.interests.map((interest, idx) => (
                  <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 text-xs rounded border border-gray-200">
                    {interest?.name}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>

      </div>
    </div>
  );
};

export default ProfessionalTemplate;
