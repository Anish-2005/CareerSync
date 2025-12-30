import React from 'react';
import type { ResumeData } from '@/models/ResumeData';
import { Briefcase, Code, GraduationCap, Lightbulb, Link, Mail, MapPin, Phone, Rocket, Sparkles, Zap } from 'lucide-react';

export const CreativeTemplate = ({ resumeData }: { resumeData: ResumeData }) => (
  <div className="bg-gradient-to-br from-purple-50 to-pink-50 text-black p-8 rounded-2xl shadow-2xl" style={{ minHeight: '11in', fontFamily: 'Poppins, sans-serif' }}>
    {/* Header with creative design */}
    <div className="relative mb-8">
      <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full opacity-20"></div>
      <div className="relative z-10">
        <h1 className="text-5xl font-black mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          {resumeData.personalInfo.firstName} {resumeData.personalInfo.lastName}
        </h1>
        <div className="flex flex-wrap gap-6 text-sm font-medium text-gray-700 mb-3">
          <span className="flex items-center gap-2">
            <span className="text-purple-500"><Mail className="w-4 h-4" /></span> {resumeData.personalInfo.email}
          </span>
          <span className="flex items-center gap-2">
            <span className="text-pink-500"><Phone className="w-4 h-4" /></span> {resumeData.personalInfo.phone}
          </span>
          <span className="flex items-center gap-2">
            <span className="text-purple-500"><MapPin className="w-4 h-4" /></span> {resumeData.personalInfo.location}
          </span>
        </div>
        {(resumeData.personalInfo.linkedin || resumeData.personalInfo.github) && (
          <div className="flex gap-6 text-sm font-medium text-purple-600">
            {resumeData.personalInfo.linkedin && <span className="flex items-center gap-2">
              <span><Briefcase className="w-4 h-4" /></span> {resumeData.personalInfo.linkedin}
            </span>}
            {resumeData.personalInfo.github && <span className="flex items-center gap-2">
              <span><Code className="w-4 h-4" /></span> {resumeData.personalInfo.github}
            </span>}
          </div>
        )}
      </div>
    </div>

    {/* Summary */}
    {resumeData.personalInfo.summary && (
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-3">
          <span className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm"><Sparkles className="w-4 h-4" /></span>
          About Me
        </h2>
        <div className="bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-purple-100">
          <p className="text-gray-700 leading-relaxed">{resumeData.personalInfo.summary}</p>
        </div>
      </div>
    )}

    {/* Experience */}
    {resumeData.experience.length > 0 && (
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-3">
          <span className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm"><Rocket className="w-4 h-4" /></span>
          Experience
        </h2>
        {resumeData.experience.map(exp => (
          <div key={exp.id} className="mb-6 bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-purple-100">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{exp.position}</h3>
                <p className="text-purple-600 font-semibold">{exp.company}, {exp.location}</p>
              </div>
              <span className="text-sm text-gray-500 bg-purple-50 px-3 py-1 rounded-full">
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
        <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-3">
          <span className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm"><GraduationCap className="w-4 h-4" /></span>
          Education
        </h2>
        {resumeData.education.map(edu => (
          <div key={edu.id} className="mb-4 bg-white/70 backdrop-blur-sm p-4 rounded-xl border border-purple-100">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-gray-900">{edu.degree} in {edu.field}</h3>
                <p className="text-purple-600">{edu.institution}</p>
              </div>
              <span className="text-sm text-gray-500 bg-purple-50 px-3 py-1 rounded-full">
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
        <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-3">
          <span className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm"><Zap className="w-4 h-4" /></span>
          Skills
        </h2>
        <div className="flex flex-wrap gap-3">
          {resumeData.skills.map(skill => (
            <span key={skill.id} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg">
              {skill.name} • {skill.level}
            </span>
          ))}
        </div>
      </div>
    )}

    {/* Projects */}
    {resumeData.projects.length > 0 && (
      <div>
        <h2 className="text-2xl font-bold mb-4 text-gray-900 flex items-center gap-3">
          <span className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm"><Lightbulb className="w-4 h-4" /></span>
          Projects
        </h2>
        {resumeData.projects.map(project => (
          <div key={project.id} className="mb-6 bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-purple-100">
            <h3 className="text-xl font-bold text-gray-900 mb-3">{project.name}</h3>
            <p className="text-gray-700 mb-4 leading-relaxed">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {project.technologies.map((tech, idx) => (
                <span key={idx} className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-xs font-medium">
                  {tech}
                </span>
              ))}
            </div>
            {project.url && <p className="text-pink-600 text-sm font-medium flex items-center gap-1"><Link className="w-4 h-4" /> {project.url}</p>}
          </div>
        ))}
      </div>
    )}
  </div>
)

