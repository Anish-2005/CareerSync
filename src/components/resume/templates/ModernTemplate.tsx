import React from 'react';
import type { ResumeData } from '@/models/ResumeData';
import { Mail, Phone, MapPin, Briefcase, Code, Link } from 'lucide-react';

export const ModernTemplate = ({ resumeData }: { resumeData: ResumeData }) => (
  <div className="bg-white text-black p-8 rounded-2xl shadow-2xl" style={{ minHeight: '11in', fontFamily: 'Inter, sans-serif' }}>
    {/* Header with accent bar */}
    <div className="relative mb-8">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400"></div>
      <div className="pt-4">
        <h1 className="text-4xl font-bold mb-2 text-gray-900">{resumeData.personalInfo.firstName} {resumeData.personalInfo.lastName}</h1>
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-2">
          <span className="flex items-center gap-1"><Mail className="w-4 h-4" /> {resumeData.personalInfo.email}</span>
          <span className="flex items-center gap-1"><Phone className="w-4 h-4" /> {resumeData.personalInfo.phone}</span>
          <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {resumeData.personalInfo.location}</span>
        </div>
        {(resumeData.personalInfo.linkedin || resumeData.personalInfo.github) && (
          <div className="flex gap-4 text-sm text-blue-600">
            {resumeData.personalInfo.linkedin && <span className="flex items-center gap-1"><Briefcase className="w-4 h-4" /> {resumeData.personalInfo.linkedin}</span>}
            {resumeData.personalInfo.github && <span className="flex items-center gap-1"><Code className="w-4 h-4" /> {resumeData.personalInfo.github}</span>}
          </div>
        )}
      </div>
    </div>

    {/* Summary */}
    {resumeData.personalInfo.summary && (
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-3 text-gray-900 border-b-2 border-blue-500 pb-1">Professional Summary</h2>
        <p className="text-gray-700 leading-relaxed">{resumeData.personalInfo.summary}</p>
      </div>
    )}

    {/* Experience */}
    {resumeData.experience.length > 0 && (
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-900 border-b-2 border-blue-500 pb-1">Experience</h2>
        {resumeData.experience.map(exp => (
          <div key={exp.id} className="mb-6 relative pl-4">
            <div className="absolute left-0 top-0 w-1 h-full bg-blue-500 rounded"></div>
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{exp.position}</h3>
                <p className="text-blue-600 font-medium">{exp.company}, {exp.location}</p>
              </div>
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
              </span>
            </div>
            <p className="text-gray-700 leading-relaxed">{exp.description}</p>
          </div>
        ))}
      </div>
    )}

    {/* Education */}
    {resumeData.education.length > 0 && (
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-4 text-gray-900 border-b-2 border-blue-500 pb-1">Education</h2>
        {resumeData.education.map(edu => (
          <div key={edu.id} className="mb-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                <p className="text-blue-600">{edu.institution}</p>
              </div>
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
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
        <h2 className="text-xl font-bold mb-4 text-gray-900 border-b-2 border-blue-500 pb-1">Skills</h2>
        <div className="flex flex-wrap gap-3">
          {resumeData.skills.map(skill => (
            <span key={skill.id} className="bg-blue-50 text-blue-700 px-3 py-2 rounded-full text-sm font-medium border border-blue-200">
              {skill.name} • {skill.level}
            </span>
          ))}
        </div>
      </div>
    )}

    {/* Projects */}
    {resumeData.projects.length > 0 && (
      <div>
        <h2 className="text-xl font-bold mb-4 text-gray-900 border-b-2 border-blue-500 pb-1">Projects</h2>
        {resumeData.projects.map(project => (
          <div key={project.id} className="mb-6">
            <h3 className="text-lg font-bold text-gray-900 mb-2">{project.name}</h3>
            <p className="text-gray-700 mb-3 leading-relaxed">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-2">
              {project.technologies.map((tech, idx) => (
                <span key={idx} className="bg-cyan-50 text-cyan-700 px-2 py-1 rounded text-xs font-medium">
                  {tech}
                </span>
              ))}
            </div>
            {project.url && <p className="text-blue-600 text-sm flex items-center gap-1"><Link className="w-4 h-4" /> {project.url}</p>}
          </div>
        ))}
      </div>
    )}
  </div>
)
