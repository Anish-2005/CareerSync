
import type { ResumeData } from '@/models/ResumeData';

export const ProfessionalTemplate = ({ resumeData }: { resumeData: ResumeData }) => (
  <div className="bg-white text-black p-8 rounded-2xl shadow-2xl" style={{ minHeight: '11in', fontFamily: 'Times New Roman, serif' }}>
    {/* Header */}
    <div className="text-center mb-8 pb-6 border-b-2 border-gray-800">
      <h1 className="text-4xl font-bold mb-3 text-gray-900">{resumeData.personalInfo.firstName} {resumeData.personalInfo.lastName}</h1>
      <div className="flex justify-center gap-8 text-sm text-gray-700">
        <span>{resumeData.personalInfo.email}</span>
        <span>{resumeData.personalInfo.phone}</span>
        <span>{resumeData.personalInfo.location}</span>
      </div>
      {(resumeData.personalInfo.linkedin || resumeData.personalInfo.github) && (
        <div className="flex justify-center gap-8 text-sm text-gray-600 mt-2">
          {resumeData.personalInfo.linkedin && <span>{resumeData.personalInfo.linkedin}</span>}
          {resumeData.personalInfo.github && <span>{resumeData.personalInfo.github}</span>}
        </div>
      )}
    </div>

    {/* Summary */}
    {resumeData.personalInfo.summary && (
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-3 text-gray-900 uppercase tracking-wide">Professional Summary</h2>
        <p className="text-gray-700 leading-relaxed text-justify">{resumeData.personalInfo.summary}</p>
      </div>
    )}

    {/* Experience */}
    {resumeData.experience.length > 0 && (
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-900 uppercase tracking-wide">Professional Experience</h2>
        {resumeData.experience.map(exp => (
          <div key={exp.id} className="mb-6">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                <p className="text-gray-700 font-medium">{exp.company}, {exp.location}</p>
              </div>
              <span className="text-sm text-gray-600">
                {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
              </span>
            </div>
            <p className="text-gray-700 leading-relaxed text-justify">{exp.description}</p>
          </div>
        ))}
      </div>
    )}

    {/* Education */}
    {resumeData.education.length > 0 && (
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-900 uppercase tracking-wide">Education</h2>
        {resumeData.education.map(edu => (
          <div key={edu.id} className="mb-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                <p className="text-gray-700">{edu.institution}</p>
              </div>
              <span className="text-sm text-gray-600">
                {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
                {edu.gpa && ` • GPA: ${edu.gpa}`}
              </span>
            </div>
          </div>
        ))}
      </div>
    )}

    {/* Skills */}
    {resumeData.skills.length > 0 && (
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-900 uppercase tracking-wide">Skills & Competencies</h2>
        <div className="grid grid-cols-2 gap-2">
          {resumeData.skills.map(skill => (
            <div key={skill.id} className="text-gray-700">
              • {skill.name} ({skill.level})
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Projects */}
    {resumeData.projects.length > 0 && (
      <div>
        <h2 className="text-xl font-bold mb-4 text-gray-900 uppercase tracking-wide">Projects</h2>
        {resumeData.projects.map(project => (
          <div key={project.id} className="mb-4">
            <h3 className="text-lg font-bold text-gray-900">{project.name}</h3>
            <p className="text-gray-700 mb-2 leading-relaxed text-justify">{project.description}</p>
            <div className="text-sm text-gray-600 mb-1">
              Technologies: {project.technologies.join(', ')}
            </div>
            {project.url && <p className="text-gray-600 text-sm">{project.url}</p>}
          </div>
        ))}
      </div>
    )}
  </div>
)
