import React from 'react';
import type { ResumeData } from '@/models/ResumeData';

export const MinimalistTemplate = ({ resumeData }: { resumeData: ResumeData }) => (
  <div className="bg-white text-black p-8 rounded-2xl shadow-2xl" style={{ minHeight: '11in', fontFamily: 'Inter, sans-serif' }}>
    {/* Clean header */}
    <div className="mb-12">
      <h1 className="text-5xl font-light mb-4 text-gray-900 tracking-tight">
        {resumeData.personalInfo.firstName} {resumeData.personalInfo.lastName}
      </h1>
      <div className="w-16 h-0.5 bg-gray-900 mb-6"></div>
      <div className="text-sm text-gray-600 space-y-1">
        <div>{resumeData.personalInfo.email}</div>
        <div>{resumeData.personalInfo.phone}</div>
        <div>{resumeData.personalInfo.location}</div>
        {(resumeData.personalInfo.linkedin || resumeData.personalInfo.github) && (
          <div className="pt-2">
            {resumeData.personalInfo.linkedin && <div>{resumeData.personalInfo.linkedin}</div>}
            {resumeData.personalInfo.github && <div>{resumeData.personalInfo.github}</div>}
          </div>
        )}
      </div>
    </div>

    {/* Summary */}
    {resumeData.personalInfo.summary && (
      <div className="mb-12">
        <h2 className="text-sm font-bold mb-4 text-gray-900 uppercase tracking-wider">Summary</h2>
        <p className="text-gray-700 leading-relaxed font-light text-lg">{resumeData.personalInfo.summary}</p>
      </div>
    )}

    {/* Experience */}
    {resumeData.experience.length > 0 && (
      <div className="mb-12">
        <h2 className="text-sm font-bold mb-6 text-gray-900 uppercase tracking-wider">Experience</h2>
        {resumeData.experience.map(exp => (
          <div key={exp.id} className="mb-8">
            <div className="flex justify-between items-baseline mb-2">
              <h3 className="text-xl font-light text-gray-900">{exp.position}</h3>
              <span className="text-xs text-gray-500 uppercase tracking-wide">
                {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
              </span>
            </div>
            <p className="text-gray-600 mb-3 font-medium">{exp.company}, {exp.location}</p>
            <p className="text-gray-700 leading-relaxed font-light">{exp.description}</p>
          </div>
        ))}
      </div>
    )}

    {/* Education */}
    {resumeData.education.length > 0 && (
      <div className="mb-12">
        <h2 className="text-sm font-bold mb-6 text-gray-900 uppercase tracking-wider">Education</h2>
        {resumeData.education.map(edu => (
          <div key={edu.id} className="mb-6">
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="text-lg font-light text-gray-900">{edu.degree} in {edu.field}</h3>
              <span className="text-xs text-gray-500 uppercase tracking-wide">
                {edu.startDate} - {edu.current ? 'Present' : edu.endDate}
              </span>
            </div>
            <p className="text-gray-600 font-medium">{edu.institution}</p>
            {edu.gpa && <p className="text-xs text-gray-500 mt-1">GPA: {edu.gpa}</p>}
          </div>
        ))}
      </div>
    )}

    {/* Skills */}
    {resumeData.skills.length > 0 && (
      <div className="mb-12">
        <h2 className="text-sm font-bold mb-6 text-gray-900 uppercase tracking-wider">Skills</h2>
        <div className="flex flex-wrap gap-4">
          {resumeData.skills.map(skill => (
            <span key={skill.id} className="text-gray-700 font-light">
              {skill.name} <span className="text-gray-400">•</span> {skill.level}
            </span>
          ))}
        </div>
      </div>
    )}

    {/* Projects */}
    {resumeData.projects.length > 0 && (
      <div>
        <h2 className="text-sm font-bold mb-6 text-gray-900 uppercase tracking-wider">Projects</h2>
        {resumeData.projects.map(project => (
          <div key={project.id} className="mb-8">
            <h3 className="text-xl font-light text-gray-900 mb-2">{project.name}</h3>
            <p className="text-gray-700 leading-relaxed font-light mb-4">{project.description}</p>
            <div className="text-xs text-gray-600 mb-2">
              {project.technologies.join(' • ')}
            </div>
            {project.url && <p className="text-xs text-gray-500">{project.url}</p>}
          </div>
        ))}
      </div>
    )}
  </div>
)

