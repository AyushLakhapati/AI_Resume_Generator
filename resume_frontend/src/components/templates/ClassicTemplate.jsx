import React from "react";
import { FaGithub, FaLinkedin, FaPhone, FaEnvelope } from "react-icons/fa";

const ClassicTemplate = ({ data, resumeRef }) => {
  return (
    <div
      ref={resumeRef}
      className="w-full shadow-2xl rounded-lg p-8 space-y-6 bg-base-100 text-base-content border border-gray-200 dark:border-gray-700 transition-all duration-300"
    >
      {/* Header Section */}
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-primary">
          {data.personalInformation.fullName}
        </h1>
        <p className="text-lg text-gray-500">
          {data.personalInformation.location}
        </p>

        <div className="flex justify-center space-x-4 mt-2">
          {data.personalInformation.email && (
            <a
              href={`mailto:${data.personalInformation.email}`}
              className="flex items-center text-secondary hover:underline"
            >
              <FaEnvelope className="mr-2" /> {data.personalInformation.email}
            </a>
          )}
          {data.personalInformation.phoneNumber && (
            <p className="flex items-center text-gray-500">
              <FaPhone className="mr-2" /> {data.personalInformation.phoneNumber}
            </p>
          )}
        </div>

        <div className="flex justify-center space-x-4 mt-2">
          {data.personalInformation.gitHub && (
            <a
              href={data.personalInformation.gitHub}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-gray-700 flex items-center"
            >
              <FaGithub className="mr-2" /> GitHub
            </a>
          )}
          {data.personalInformation.linkedIn && (
            <a
              href={data.personalInformation.linkedIn}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-700 flex items-center"
            >
              <FaLinkedin className="mr-2" /> LinkedIn
            </a>
          )}
        </div>
      </div>

      <div className="divider"></div>

      {/* Summary Section */}
      <section>
        <h2 className="text-2xl font-semibold text-secondary border-b-2 border-secondary/20 pb-1 mb-2">Summary</h2>
        <p className="text-gray-700 dark:text-gray-300">{data.summary}</p>
      </section>

      {/* Skills Section */}
      <section>
        <h2 className="text-2xl font-semibold text-secondary border-b-2 border-secondary/20 pb-1 mb-2">Skills</h2>
        <div className="flex flex-wrap gap-2 mt-2">
          {(data.skills || []).map((skill, index) => (
            <div key={index} className="badge badge-outline badge-lg px-4 py-2">
              {skill?.title} - <span className="ml-1 font-semibold">{skill?.level}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section>
        <h2 className="text-2xl font-semibold text-secondary border-b-2 border-secondary/20 pb-1 mb-2">Experience</h2>
        {(data.experience || []).map((exp, index) => (
          <div key={index} className="mb-4">
            <h3 className="text-xl font-bold">{exp?.jobTitle}</h3>
            <div className="flex justify-between text-gray-500 italic mb-1">
              <span>{exp?.company} | {exp?.location}</span>
              <span>{exp?.duration}</span>
            </div>
            <p className="text-gray-600 dark:text-gray-300">{exp?.responsibility}</p>
          </div>
        ))}
      </section>

      {/* Education Section */}
      <section>
        <h2 className="text-2xl font-semibold text-secondary border-b-2 border-secondary/20 pb-1 mb-2">Education</h2>
        {(data.education || []).map((edu, index) => (
          <div key={index} className="mb-2">
            <h3 className="text-xl font-bold">{edu?.degree}</h3>
            <div className="flex justify-between text-gray-500">
              <span>{edu?.university}, {edu?.location}</span>
              <span>Graduation: {edu?.graduationYear}</span>
            </div>
          </div>
        ))}
      </section>

      {/* Projects Section */}
      {data.projects && data.projects.length > 0 && (
        <section>
          <h2 className="text-2xl font-semibold text-secondary border-b-2 border-secondary/20 pb-1 mb-2">Projects</h2>
          {(data.projects || []).map((proj, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-xl font-bold">{proj?.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">{proj?.description}</p>
              <p className="text-sm text-gray-500 mt-1">
                <span className="font-semibold text-secondary">Tech: </span>{(proj?.technologiesUsed || []).join(", ")}
              </p>
              {proj?.githubLink && (
                <a href={proj.githubLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm block mt-1">
                  🔗 Project Repository
                </a>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Languages and Interests */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {data.languages && data.languages.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-secondary border-b-2 border-secondary/20 pb-1 mb-2">Languages</h2>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
              {data.languages.map((lang, index) => (
                <li key={index}>{lang?.name}</li>
              ))}
            </ul>
          </section>
        )}
        {data.interests && data.interests.length > 0 && (
          <section>
            <h2 className="text-xl font-semibold text-secondary border-b-2 border-secondary/20 pb-1 mb-2">Interests</h2>
            <ul className="list-disc pl-5 text-gray-700 dark:text-gray-300">
              {data.interests.map((interest, index) => (
                <li key={index}>{interest?.name}</li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};

export default ClassicTemplate;
