import React from 'react';
import type { ResumeData } from '@/models/ResumeData';

export const ExecutiveTemplate = ({ resumeData }: { resumeData: ResumeData }) => (
  <div className="bg-white text-black p-8 rounded-2xl shadow-2xl" style={{ minHeight: '11in', fontFamily: 'Crimson Text, serif' }}>
    {/* Elegant header */}
    <div className="text-center mb-10 pb-8 border-b border-amber-200">
      <div className="w-24 h-24 bg-gradient-to-br from-amber-100 to-amber-200 rounded-full mx-auto mb-6 flex items-center justify-center">
        <span className="text-3xl text-amber-800 font-bold">
          {resumeData.personalInfo.firstName[0]}{resumeData.personalInfo.lastName[0]}
        </span>
      </div>
      <h1 className="text-4xl font-bold mb-4 text-gray-900">{resumeData.personalInfo.firstName} {resumeData.personalInfo.lastName}</h1>
      <div className="flex justify-center gap-8 text-sm text-gray-600 mb-4">
        <span>{resumeData.personalInfo.email}</span>
        <span>{resumeData.personalInfo.phone}</span>
        <span>{resumeData.personalInfo.location}</span>
      </div>
      {(resumeData.personalInfo.linkedin || resumeData.personalInfo.github) && (
        <div className="flex justify-center gap-8 text-sm text-amber-700">
          {resumeData.personalInfo.linkedin && <span>{resumeData.personalInfo.linkedin}</span>}
          {resumeData.personalInfo.github && <span>{resumeData.personalInfo.github}</span>}
        </div>
      )}
    </div>

    {/* Summary */}
    {resumeData.personalInfo.summary && (
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 border-l-4 border-amber-500 pl-4">Executive Summary</h2>
        <p className="text-gray-700 leading-relaxed italic text-lg">{resumeData.personalInfo.summary}</p>
      </div>
    )}

    {/* Experience */}
    {resumeData.experience.length > 0 && (
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 border-l-4 border-amber-500 pl-4">Professional Experience</h2>
        {resumeData.experience.map(exp => (
          <div key={exp.id} className="mb-8 relative">
            <div className="absolute left-0 top-2 w-2 h-2 bg-amber-500 rounded-full"></div>
            <div className="ml-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-bold text-gray-900">{exp.position}</h3>
                  <p className="text-amber-700 font-semibold text-lg">{exp.company}, {exp.location}</p>
                </div>
                <span className="text-sm text-gray-500 bg-amber-50 px-3 py-1 rounded border border-amber-200">
                  {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <p className="text-gray-700 leading-relaxed">{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    )}

    {/* Education */}
    {resumeData.education.length > 0 && (
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 border-l-4 border-amber-500 pl-4">Education</h2>
        {resumeData.education.map(edu => (
          <div key={edu.id} className="mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                <p className="text-amber-700 font-semibold">{edu.institution}</p>
              </div>
              <span className="text-sm text-gray-500 bg-amber-50 px-3 py-1 rounded border border-amber-200">
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
      <div className="mb-10">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 border-l-4 border-amber-500 pl-4">Core Competencies</h2>
        <div className="grid grid-cols-2 gap-3">
          {resumeData.skills.map(skill => (
            <div key={skill.id} className="flex items-center gap-2">
              <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
              <span className="text-gray-700 font-medium">{skill.name}</span>
              <span className="text-gray-500 text-sm">({skill.level})</span>
            </div>
          ))}
        </div>
      </div>
    )}

    {/* Projects */}
    {resumeData.projects.length > 0 && (
      <div>
        <h2 className="text-2xl font-bold mb-6 text-gray-900 border-l-4 border-amber-500 pl-4">Key Projects</h2>
        {resumeData.projects.map(project => (
          <div key={project.id} className="mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-3">{project.name}</h3>
            <p className="text-gray-700 leading-relaxed mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {project.technologies.map((tech, idx) => (
                <span key={idx} className="bg-amber-50 text-amber-800 px-3 py-1 rounded-full text-sm font-medium border border-amber-200">
                  {tech}
                </span>
              ))}
            </div>
            {project.url && <p className="text-amber-700 font-medium">Portfolio: {project.url}</p>}
          </div>
        ))}
      </div>
    )}
  </div>
)
