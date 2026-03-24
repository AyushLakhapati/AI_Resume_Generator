import React from "react";
import { FaGithub, FaLinkedin, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ElegantTemplate = ({ data, resumeRef }) => {
  return (
    <div
      ref={resumeRef}
      className="w-full bg-[#faf9f6] text-[#333] p-12 shadow-md font-serif border border-[#e0dacd]"
      style={{ fontFamily: "'Merriweather', 'Playfair Display', serif" }}
    >
      {/* Header Container */}
      <div className="text-center mb-10 pb-6 border-b border-[#d1c8b3]">
        <h1 className="text-4xl font-normal tracking-widest text-[#2c2c2c] uppercase mb-4">
          {data?.personalInformation?.fullName}
        </h1>
        
        <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 text-sm text-[#5a5a5a]">
          {data?.personalInformation?.location && (
            <span className="flex items-center gap-2 whitespace-nowrap"><FaMapMarkerAlt className="opacity-70"/> {data.personalInformation.location}</span>
          )}
          {data?.personalInformation?.phoneNumber && (
            <span className="flex items-center gap-2 whitespace-nowrap"><FaPhone className="opacity-70"/> {data.personalInformation.phoneNumber}</span>
          )}
          {data?.personalInformation?.email && (
            <span className="flex items-center gap-2 whitespace-nowrap"><FaEnvelope className="opacity-70"/> {data.personalInformation.email}</span>
          )}
          {data?.personalInformation?.linkedIn && (
            <a href={data.personalInformation.linkedIn} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-black transition-colors whitespace-nowrap">
              <FaLinkedin className="opacity-70"/> LinkedIn
            </a>
          )}
          {data?.personalInformation?.gitHub && (
            <a href={data.personalInformation.gitHub} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-black transition-colors whitespace-nowrap">
              <FaGithub className="opacity-70"/> GitHub
            </a>
          )}
        </div>
      </div>

      <div className="space-y-8">
        
        {/* Summary Component */}
        {data?.summary && (
          <section>
            <h2 className="text-xl font-bold tracking-widest text-[#2c2c2c] uppercase mb-3 flex items-center after:content-[''] after:flex-1 after:h-[1px] after:bg-[#d1c8b3] after:ml-4">
              Profile
            </h2>
            <p className="text-[#4a4a4a] leading-loose text-justify text-sm">
              {data.summary}
            </p>
          </section>
        )}

        {/* Experience Component */}
        {data?.experience && data.experience.length > 0 && (
          <section>
            <h2 className="text-xl font-bold tracking-widest text-[#2c2c2c] uppercase mb-4 flex items-center after:content-[''] after:flex-1 after:h-[1px] after:bg-[#d1c8b3] after:ml-4">
              Experience
            </h2>
            <div className="space-y-6">
              {data.experience.map((exp, idx) => (
                <div key={idx} className="relative pl-4 border-l-2 border-[#d1c8b3]">
                  <div className="flex flex-wrap justify-between items-baseline gap-2 mb-1">
                    <h3 className="text-lg font-bold text-[#2c2c2c]">{exp?.jobTitle}</h3>
                    <em className="text-sm text-[#666] whitespace-nowrap">{exp?.duration}</em>
                  </div>
                  <div className="text-md font-medium text-[#444] mb-2">{exp?.company} <span className="text-[#888] font-normal px-2">|</span> {exp?.location}</div>
                  <p className="text-[#555] leading-relaxed text-sm">{exp?.responsibility}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Skills Grid */}
        <div className="grid grid-cols-2 gap-8">
          {/* Education Component */}
          {data?.education && data.education.length > 0 && (
            <section>
              <h2 className="text-xl font-bold tracking-widest text-[#2c2c2c] uppercase mb-4 flex items-center after:content-[''] after:flex-1 after:h-[1px] after:bg-[#d1c8b3] after:ml-4">
                Education
              </h2>
              <div className="space-y-4">
                {data.education.map((edu, idx) => (
                  <div key={idx}>
                    <h3 className="text-md font-bold text-[#2c2c2c]">{edu?.degree}</h3>
                    <div className="text-sm text-[#444] mt-1">{edu?.university}</div>
                    <div className="text-[0.8rem] text-[#666] italic">{edu?.location} • {edu?.graduationYear}</div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Skills Component */}
          {data?.skills && data.skills.length > 0 && (
            <section>
              <h2 className="text-xl font-bold tracking-widest text-[#2c2c2c] uppercase mb-4 flex items-center after:content-[''] after:flex-1 after:h-[1px] after:bg-[#d1c8b3] after:ml-4">
                Expertise
              </h2>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {data.skills.map((skill, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-[#888] rounded-full inline-block"></span>
                    <span className="text-sm text-[#333] font-medium">{skill?.title}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Projects Component */}
        {data?.projects && data.projects.length > 0 && (
          <section>
            <h2 className="text-xl font-bold tracking-widest text-[#2c2c2c] uppercase mb-4 flex items-center after:content-[''] after:flex-1 after:h-[1px] after:bg-[#d1c8b3] after:ml-4">
              Selected Works
            </h2>
            <div className="grid grid-cols-2 gap-6">
              {data.projects.map((proj, idx) => (
                <div key={idx} className="p-4 bg-white/50 border border-[#eee] rounded-sm">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-md font-bold text-[#2c2c2c]">{proj?.title}</h3>
                    {proj?.githubLink && (
                      <a href={proj.githubLink} target="_blank" rel="noopener noreferrer" className="text-xs uppercase tracking-wider text-[#666] hover:text-black border-b border-transparent hover:border-black transition-all">
                        Link
                      </a>
                    )}
                  </div>
                  <p className="text-sm text-[#555] leading-relaxed mb-3">{proj?.description}</p>
                  {proj?.technologiesUsed && proj.technologiesUsed.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-auto">
                      {proj.technologiesUsed.map((tech, i) => (
                        <span key={i} className="text-[0.7rem] bg-[#f0eee9] px-2 py-0.5 text-[#555] rounded-sm uppercase tracking-wider">
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ElegantTemplate;
