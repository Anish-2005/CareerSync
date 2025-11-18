'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FileText, Download, Eye, Edit, Plus, Trash2, Save, Palette, Menu, X, User, Briefcase, GraduationCap, Zap, Rocket, Palette as PaletteIcon, Mail, Phone, MapPin, Code, Link, Sparkles, Lightbulb, BarChart3, ClipboardList, LogOut, LogIn } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { useThemeClasses } from '@/hooks/useThemeClasses'
import { RouteGuard } from '@/components/RouteGuard'
import ThemeToggle from '@/components/ThemeToggle'
import jsPDF from 'jspdf'
import html2canvas from 'html2canvas'

const m = motion as any

interface ResumeData {
  personalInfo: {
    firstName: string
    lastName: string
    email: string
    phone: string
    location: string
    linkedin?: string
    github?: string
    portfolio?: string
    summary: string
  }
  experience: Array<{
    id: string
    company: string
    position: string
    location: string
    startDate: string
    endDate: string
    current: boolean
    description: string
  }>
  education: Array<{
    id: string
    institution: string
    degree: string
    field: string
    startDate: string
    endDate: string
    current: boolean
    gpa?: string
  }>
  skills: Array<{
    id: string
    name: string
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert'
  }>
  projects: Array<{
    id: string
    name: string
    description: string
    technologies: string[]
    url?: string
  }>
}

// Template Components
const ModernTemplate = ({ resumeData }: { resumeData: ResumeData }) => (
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

const ProfessionalTemplate = ({ resumeData }: { resumeData: ResumeData }) => (
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

const CreativeTemplate = ({ resumeData }: { resumeData: ResumeData }) => (
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

const MinimalistTemplate = ({ resumeData }: { resumeData: ResumeData }) => (
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

const ExecutiveTemplate = ({ resumeData }: { resumeData: ResumeData }) => (
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

export default function ResumeBuilderPage() {
  const { user, logout } = useAuth()
  const theme = useThemeClasses()
  const morphBg = theme.theme === 'light' ? 'linear-gradient(135deg, rgba(59,130,246,0.6), rgba(29,78,216,0.6))' : 'linear-gradient(135deg, rgba(255,107,0,0.6), rgba(0,212,255,0.6))'
  const [resumeData, setResumeData] = useState<ResumeData>({
    personalInfo: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      location: '',
      summary: ''
    },
    experience: [],
    education: [],
    skills: [],
    projects: []
  })
  const [activeSection, setActiveSection] = useState('personal')
  const [selectedTemplate, setSelectedTemplate] = useState('modern')
  const [previewMode, setPreviewMode] = useState(false)
  const [showMobileMenu, setShowMobileMenu] = useState(false)

  // Load user data on mount
  useEffect(() => {
    // In a real app, this would fetch from the API
    // For now, we'll use mock data
    setResumeData({
      personalInfo: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@email.com',
        phone: '+1 (555) 123-4567',
        location: 'San Francisco, CA',
        linkedin: 'linkedin.com/in/johndoe',
        github: 'github.com/johndoe',
        summary: 'Experienced software engineer with 5+ years of expertise in full-stack development, cloud technologies, and agile methodologies.'
      },
      experience: [
        {
          id: '1',
          company: 'TechCorp Inc.',
          position: 'Senior Software Engineer',
          location: 'San Francisco, CA',
          startDate: '2022-01',
          endDate: '',
          current: true,
          description: 'Lead development of scalable web applications using React, Node.js, and AWS. Mentor junior developers and collaborate with cross-functional teams.'
        }
      ],
      education: [
        {
          id: '1',
          institution: 'University of California',
          degree: 'Bachelor of Science',
          field: 'Computer Science',
          startDate: '2016-09',
          endDate: '2020-05',
          current: false,
          gpa: '3.8'
        }
      ],
      skills: [
        { id: '1', name: 'JavaScript', level: 'expert' },
        { id: '2', name: 'React', level: 'expert' },
        { id: '3', name: 'Node.js', level: 'advanced' },
        { id: '4', name: 'Python', level: 'intermediate' }
      ],
      projects: [
        {
          id: '1',
          name: 'E-commerce Platform',
          description: 'Full-stack e-commerce solution with payment integration',
          technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
          url: 'github.com/johndoe/ecommerce'
        }
      ]
    })

    // Load saved draft if user is authenticated
    if (user) {
      loadSavedResume()
    }
  }, [user])

  // Load saved resume from API
  const loadSavedResume = async () => {
    if (!user) return

    try {
      const token = await user.getIdToken()
      const response = await fetch('/api/resume', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (response.ok) {
        const data = await response.json()
        if (data.resume) {
          setResumeData({
            personalInfo: data.resume.personalInfo,
            experience: data.resume.experience,
            education: data.resume.education,
            skills: data.resume.skills,
            projects: data.resume.projects
          })
          setSelectedTemplate(data.resume.selectedTemplate || 'modern')
        }
      }
    } catch (error) {
      console.error('Error loading saved resume:', error)
    }
  }

  const updatePersonalInfo = (field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }))
  }

  const addExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      company: '',
      position: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: ''
    }
    setResumeData(prev => ({
      ...prev,
      experience: [...prev.experience, newExp]
    }))
  }

  const updateExperience = (id: string, field: string, value: string | boolean) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.map(exp =>
        exp.id === id ? { ...exp, [field]: value } : exp
      )
    }))
  }

  const removeExperience = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      experience: prev.experience.filter(exp => exp.id !== id)
    }))
  }

  const addEducation = () => {
    const newEdu = {
      id: Date.now().toString(),
      institution: '',
      degree: '',
      field: '',
      startDate: '',
      endDate: '',
      current: false,
      gpa: ''
    }
    setResumeData(prev => ({
      ...prev,
      education: [...prev.education, newEdu]
    }))
  }

  const updateEducation = (id: string, field: string, value: string | boolean) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.map(edu =>
        edu.id === id ? { ...edu, [field]: value } : edu
      )
    }))
  }

  const removeEducation = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      education: prev.education.filter(edu => edu.id !== id)
    }))
  }

  const addSkill = () => {
    const newSkill = {
      id: Date.now().toString(),
      name: '',
      level: 'beginner' as const
    }
    setResumeData(prev => ({
      ...prev,
      skills: [...prev.skills, newSkill]
    }))
  }

  const updateSkill = (id: string, field: string, value: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.map(skill =>
        skill.id === id ? { ...skill, [field]: value } : skill
      )
    }))
  }

  const removeSkill = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill.id !== id)
    }))
  }

  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      url: ''
    }
    setResumeData(prev => ({
      ...prev,
      projects: [...prev.projects, newProject]
    }))
  }

  const updateProject = (id: string, field: string, value: string | string[]) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.map(project =>
        project.id === id ? { ...project, [field]: value } : project
      )
    }))
  }

  const removeProject = (id: string) => {
    setResumeData(prev => ({
      ...prev,
      projects: prev.projects.filter(project => project.id !== id)
    }))
  }

  // Template HTML Generation Functions
  const generateModernTemplateHTML = (resumeData: ResumeData) => `
    <div style="font-family: 'Inter', sans-serif; color: #000; background: #fff; padding: 40px; max-width: 800px; margin: 0 auto; line-height: 1.6;">
      <div style="margin-bottom: 30px;">
        <div style="width: 100%; height: 4px; background: linear-gradient(90deg, #2563eb, #06b6d4); margin-bottom: 20px;"></div>
        <h1 style="font-size: 36px; font-weight: bold; margin-bottom: 15px; color: #1f2937;">${resumeData.personalInfo.firstName} ${resumeData.personalInfo.lastName}</h1>
        <div style="display: flex; flex-wrap: wrap; gap: 20px; font-size: 14px; color: #6b7280; margin-bottom: 10px;">
          <span>Email: ${resumeData.personalInfo.email}</span>
          <span>Phone: ${resumeData.personalInfo.phone}</span>
          <span>Location: ${resumeData.personalInfo.location}</span>
        </div>
        ${(resumeData.personalInfo.linkedin || resumeData.personalInfo.github) ? `
          <div style="display: flex; gap: 20px; font-size: 14px; color: #2563eb;">
            ${resumeData.personalInfo.linkedin ? `<span>LinkedIn: ${resumeData.personalInfo.linkedin}</span>` : ''}
            ${resumeData.personalInfo.github ? `<span>GitHub: ${resumeData.personalInfo.github}</span>` : ''}
          </div>
        ` : ''}
      </div>

      ${resumeData.personalInfo.summary ? `
        <div style="margin-bottom: 30px;">
          <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 12px; color: #1f2937; border-bottom: 2px solid #2563eb; padding-bottom: 4px;">Professional Summary</h2>
          <p style="font-size: 15px; color: #374151; line-height: 1.7;">${resumeData.personalInfo.summary}</p>
        </div>
      ` : ''}

      ${resumeData.experience.length > 0 ? `
        <div style="margin-bottom: 30px;">
          <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 15px; color: #1f2937; border-bottom: 2px solid #2563eb; padding-bottom: 4px;">Experience</h2>
          ${resumeData.experience.map(exp => `
            <div style="margin-bottom: 25px; position: relative; padding-left: 20px;">
              <div style="position: absolute; left: 0; top: 0; width: 3px; height: 100%; background: #2563eb; border-radius: 2px;"></div>
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                <div>
                  <h3 style="font-size: 18px; font-weight: bold; color: #1f2937;">${exp.position}</h3>
                  <p style="font-size: 15px; color: #2563eb; font-weight: 500;">${exp.company}, ${exp.location}</p>
                </div>
                <span style="font-size: 13px; color: #6b7280; background: #f3f4f6; padding: 4px 10px; border-radius: 12px;">
                  ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <p style="font-size: 15px; color: #374151; line-height: 1.7;">${exp.description}</p>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${resumeData.education.length > 0 ? `
        <div style="margin-bottom: 30px;">
          <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 15px; color: #1f2937; border-bottom: 2px solid #2563eb; padding-bottom: 4px;">Education</h2>
          ${resumeData.education.map(edu => `
            <div style="margin-bottom: 18px;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div>
                  <h3 style="font-size: 18px; font-weight: bold; color: #1f2937;">${edu.degree} in ${edu.field}</h3>
                  <p style="font-size: 15px; color: #2563eb;">${edu.institution}</p>
                </div>
                <span style="font-size: 13px; color: #6b7280; background: #f3f4f6; padding: 4px 10px; border-radius: 12px;">
                  ${edu.startDate} - ${edu.current ? 'Present' : edu.endDate} ${edu.gpa ? ` • GPA: ${edu.gpa}` : ''}
                </span>
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${resumeData.skills.length > 0 ? `
        <div style="margin-bottom: 30px;">
          <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 15px; color: #1f2937; border-bottom: 2px solid #2563eb; padding-bottom: 4px;">Skills</h2>
          <div style="display: flex; flex-wrap: wrap; gap: 10px;">
            ${resumeData.skills.map(skill => `
              <span style="background: linear-gradient(135deg, #dbeafe, #bfdbfe); color: #1e40af; padding: 6px 14px; border-radius: 20px; font-size: 13px; font-weight: 500; border: 1px solid #93c5fd;">
                ${skill.name} • ${skill.level}
              </span>
            `).join('')}
          </div>
        </div>
      ` : ''}

      ${resumeData.projects.length > 0 ? `
        <div>
          <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 15px; color: #1f2937; border-bottom: 2px solid #2563eb; padding-bottom: 4px;">Projects</h2>
          ${resumeData.projects.map(project => `
            <div style="margin-bottom: 25px;">
              <h3 style="font-size: 18px; font-weight: bold; color: #1f2937; margin-bottom: 8px;">${project.name}</h3>
              <p style="font-size: 15px; color: #374151; margin-bottom: 12px; line-height: 1.7;">${project.description}</p>
              ${project.technologies.length > 0 ? `
                <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 10px;">
                  <span style="background: #e0f2fe; color: #0369a1; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 500;">
                    ${project.technologies.join('</span><span style="background: #e0f2fe; color: #0369a1; padding: 3px 10px; border-radius: 12px; font-size: 12px; font-weight: 500;">')}
                  </span>
                </div>
              ` : ''}
              ${project.url ? `<p style="font-size: 14px; color: #2563eb; font-weight: 500;">Link: ${project.url}</p>` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}
    </div>
  `

  const generateProfessionalTemplateHTML = (resumeData: ResumeData) => `
    <div style="font-family: 'Times New Roman', serif; color: #000; background: #fff; padding: 40px; max-width: 800px; margin: 0 auto; line-height: 1.6;">
      <div style="text-align: center; margin-bottom: 35px; padding-bottom: 25px; border-bottom: 2px solid #1f2937;">
        <h1 style="font-size: 36px; font-weight: bold; margin-bottom: 15px; color: #1f2937;">${resumeData.personalInfo.firstName} ${resumeData.personalInfo.lastName}</h1>
        <div style="display: flex; justify-content: center; gap: 25px; font-size: 14px; color: #4b5563;">
          <span>${resumeData.personalInfo.email}</span>
          <span>${resumeData.personalInfo.phone}</span>
          <span>${resumeData.personalInfo.location}</span>
        </div>
        ${(resumeData.personalInfo.linkedin || resumeData.personalInfo.github) ? `
          <div style="display: flex; justify-content: center; gap: 25px; font-size: 14px; color: #374151; margin-top: 8px;">
            ${resumeData.personalInfo.linkedin ? `<span>${resumeData.personalInfo.linkedin}</span>` : ''}
            ${resumeData.personalInfo.github ? `<span>${resumeData.personalInfo.github}</span>` : ''}
          </div>
        ` : ''}
      </div>

      ${resumeData.personalInfo.summary ? `
        <div style="margin-bottom: 30px;">
          <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 12px; color: #1f2937; text-transform: uppercase; letter-spacing: 1px;">Professional Summary</h2>
          <p style="font-size: 15px; color: #374151; line-height: 1.7; text-align: justify;">${resumeData.personalInfo.summary}</p>
        </div>
      ` : ''}

      ${resumeData.experience.length > 0 ? `
        <div style="margin-bottom: 30px;">
          <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 15px; color: #1f2937; text-transform: uppercase; letter-spacing: 1px;">Professional Experience</h2>
          ${resumeData.experience.map(exp => `
            <div style="margin-bottom: 25px;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                <div>
                  <h3 style="font-size: 18px; font-weight: bold; color: #1f2937;">${exp.position}</h3>
                  <p style="font-size: 15px; color: #4b5563; font-weight: 500;">${exp.company}, ${exp.location}</p>
                </div>
                <span style="font-size: 13px; color: #6b7280;">
                  ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <p style="font-size: 15px; color: #374151; line-height: 1.7; text-align: justify;">${exp.description}</p>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${resumeData.education.length > 0 ? `
        <div style="margin-bottom: 30px;">
          <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 15px; color: #1f2937; text-transform: uppercase; letter-spacing: 1px;">Education</h2>
          ${resumeData.education.map(edu => `
            <div style="margin-bottom: 18px;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div>
                  <h3 style="font-size: 18px; font-weight: bold; color: #1f2937;">${edu.degree} in ${edu.field}</h3>
                  <p style="font-size: 15px; color: #4b5563;">${edu.institution}</p>
                </div>
                <span style="font-size: 13px; color: #6b7280;">
                  ${edu.startDate} - ${edu.current ? 'Present' : edu.endDate} ${edu.gpa ? ` • GPA: ${edu.gpa}` : ''}
                </span>
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${resumeData.skills.length > 0 ? `
        <div style="margin-bottom: 30px;">
          <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 15px; color: #1f2937; text-transform: uppercase; letter-spacing: 1px;">Skills & Competencies</h2>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 6px;">
            ${resumeData.skills.map(skill => `
              <div style="font-size: 14px; color: #374151;">• ${skill.name} (${skill.level})</div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      ${resumeData.projects.length > 0 ? `
        <div>
          <h2 style="font-size: 20px; font-weight: bold; margin-bottom: 15px; color: #1f2937; text-transform: uppercase; letter-spacing: 1px;">Projects</h2>
          ${resumeData.projects.map(project => `
            <div style="margin-bottom: 25px;">
              <h3 style="font-size: 18px; font-weight: bold; color: #1f2937;">${project.name}</h3>
              <p style="font-size: 15px; color: #374151; margin-bottom: 10px; line-height: 1.7; text-align: justify;">${project.description}</p>
              <div style="font-size: 13px; color: #6b7280; margin-bottom: 8px;">Technologies: ${project.technologies.join(', ')}</div>
              ${project.url ? `<p style="font-size: 14px; color: #374151;">${project.url}</p>` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}
    </div>
  `

  const generateCreativeTemplateHTML = (resumeData: ResumeData) => `
    <div style="font-family: 'Poppins', sans-serif; color: #000; background: linear-gradient(135deg, #faf5ff 0%, #fce7f3 100%); padding: 40px; max-width: 800px; margin: 0 auto; line-height: 1.6; border-radius: 12px;">
      <div style="margin-bottom: 35px;">
        <div style="position: relative; margin-bottom: 20px;">
          <div style="position: absolute; top: -10px; left: -10px; width: 60px; height: 60px; background: linear-gradient(135deg, #8b5cf6, #ec4899); border-radius: 50%; opacity: 0.2;"></div>
          <h1 style="font-size: 42px; font-weight: 800; margin-bottom: 15px; background: linear-gradient(135deg, #7c3aed, #ec4899); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; position: relative; z-index: 1;">
            ${resumeData.personalInfo.firstName} ${resumeData.personalInfo.lastName}
          </h1>
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 20px; font-size: 14px; font-weight: 500; color: #6b7280; margin-bottom: 12px;">
          <span style="display: flex; align-items: center; gap: 6px;">
            <span style="color: #8b5cf6;">Email:</span> ${resumeData.personalInfo.email}
          </span>
          <span style="display: flex; align-items: center; gap: 6px;">
            <span style="color: #ec4899;">Phone:</span> ${resumeData.personalInfo.phone}
          </span>
          <span style="display: flex; align-items: center; gap: 6px;">
            <span style="color: #8b5cf6;">Location:</span> ${resumeData.personalInfo.location}
          </span>
        </div>
        ${(resumeData.personalInfo.linkedin || resumeData.personalInfo.github) ? `
          <div style="display: flex; gap: 20px; font-size: 14px; font-weight: 500; color: #7c3aed;">
            ${resumeData.personalInfo.linkedin ? `<span style="display: flex; align-items: center; gap: 6px;"><span>LinkedIn:</span> ${resumeData.personalInfo.linkedin}</span>` : ''}
            ${resumeData.personalInfo.github ? `<span style="display: flex; align-items: center; gap: 6px;"><span>GitHub:</span> ${resumeData.personalInfo.github}</span>` : ''}
          </div>
        ` : ''}
      </div>

      ${resumeData.personalInfo.summary ? `
        <div style="margin-bottom: 35px;">
          <h2 style="font-size: 22px; font-weight: bold; margin-bottom: 15px; color: #1f2937; display: flex; align-items: center; gap: 10px;">
            <span style="width: 32px; height: 32px; background: linear-gradient(135deg, #8b5cf6, #ec4899); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">★</span>
            About Me
          </h2>
          <div style="background: rgba(255,255,255,0.8); backdrop-filter: blur(10px); padding: 20px; border-radius: 12px; border: 1px solid rgba(139, 92, 246, 0.1);">
            <p style="font-size: 15px; color: #374151; line-height: 1.7;">${resumeData.personalInfo.summary}</p>
          </div>
        </div>
      ` : ''}

      ${resumeData.experience.length > 0 ? `
        <div style="margin-bottom: 35px;">
          <h2 style="font-size: 22px; font-weight: bold; margin-bottom: 18px; color: #1f2937; display: flex; align-items: center; gap: 10px;">
            <span style="width: 32px; height: 32px; background: linear-gradient(135deg, #8b5cf6, #ec4899); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">►</span>
            Experience
          </h2>
          ${resumeData.experience.map(exp => `
            <div style="margin-bottom: 25px; background: rgba(255,255,255,0.8); backdrop-filter: blur(10px); padding: 24px; border-radius: 12px; border: 1px solid rgba(139, 92, 246, 0.1);">
              <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
                <div>
                  <h3 style="font-size: 20px; font-weight: bold; color: #1f2937; margin-bottom: 4px;">${exp.position}</h3>
                  <p style="font-size: 16px; color: #7c3aed; font-weight: 600;">${exp.company}, ${exp.location}</p>
                </div>
                <span style="font-size: 13px; color: #6b7280; background: rgba(139, 92, 246, 0.1); padding: 6px 12px; border-radius: 20px;">
                  ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <p style="font-size: 15px; color: #374151; line-height: 1.7;">${exp.description}</p>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${resumeData.education.length > 0 ? `
        <div style="margin-bottom: 35px;">
          <h2 style="font-size: 22px; font-weight: bold; margin-bottom: 18px; color: #1f2937; display: flex; align-items: center; gap: 10px;">
            <span style="width: 32px; height: 32px; background: linear-gradient(135deg, #8b5cf6, #ec4899); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">∇</span>
            Education
          </h2>
          ${resumeData.education.map(edu => `
            <div style="margin-bottom: 20px; background: rgba(255,255,255,0.8); backdrop-filter: blur(10px); padding: 20px; border-radius: 12px; border: 1px solid rgba(139, 92, 246, 0.1);">
              <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div>
                  <h3 style="font-size: 18px; font-weight: bold; color: #1f2937;">${edu.degree} in ${edu.field}</h3>
                  <p style="font-size: 16px; color: #7c3aed;">${edu.institution}</p>
                </div>
                <span style="font-size: 13px; color: #6b7280; background: rgba(139, 92, 246, 0.1); padding: 6px 12px; border-radius: 20px;">
                  ${edu.startDate} - ${edu.current ? 'Present' : edu.endDate} ${edu.gpa ? ` • GPA: ${edu.gpa}` : ''}
                </span>
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${resumeData.skills.length > 0 ? `
        <div style="margin-bottom: 35px;">
          <h2 style="font-size: 22px; font-weight: bold; margin-bottom: 18px; color: #1f2937; display: flex; align-items: center; gap: 10px;">
            <span style="width: 32px; height: 32px; background: linear-gradient(135deg, #8b5cf6, #ec4899); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">⚡</span>
            Skills
          </h2>
          <div style="display: flex; flex-wrap: wrap; gap: 12px;">
            ${resumeData.skills.map(skill => `
              <span style="background: linear-gradient(135deg, #8b5cf6, #ec4899); color: white; padding: 8px 16px; border-radius: 25px; font-size: 13px; font-weight: 600; box-shadow: 0 4px 12px rgba(139, 92, 246, 0.3);">
                ${skill.name} • ${skill.level}
              </span>
            `).join('')}
          </div>
        </div>
      ` : ''}

      ${resumeData.projects.length > 0 ? `
        <div>
          <h2 style="font-size: 22px; font-weight: bold; margin-bottom: 18px; color: #1f2937; display: flex; align-items: center; gap: 10px;">
            <span style="width: 32px; height: 32px; background: linear-gradient(135deg, #8b5cf6, #ec4899); border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 14px;">💡</span>
            Projects
          </h2>
          ${resumeData.projects.map(project => `
            <div style="margin-bottom: 25px; background: rgba(255,255,255,0.8); backdrop-filter: blur(10px); padding: 24px; border-radius: 12px; border: 1px solid rgba(139, 92, 246, 0.1);">
              <h3 style="font-size: 20px; font-weight: bold; color: #1f2937; margin-bottom: 12px;">${project.name}</h3>
              <p style="font-size: 15px; color: #374151; margin-bottom: 15px; line-height: 1.7;">${project.description}</p>
              ${project.technologies.length > 0 ? `
                <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px;">
                  ${project.technologies.map(tech => `
                    <span style="background: rgba(139, 92, 246, 0.1); color: #7c3aed; padding: 4px 12px; border-radius: 15px; font-size: 12px; font-weight: 500;">
                      ${tech}
                    </span>
                  `).join('')}
                </div>
              ` : ''}
              ${project.url ? `<p style="font-size: 14px; color: #ec4899; font-weight: 600;">Link: ${project.url}</p>` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}
    </div>
  `

  const generateMinimalistTemplateHTML = (resumeData: ResumeData) => `
    <div style="font-family: 'Inter', sans-serif; color: #000; background: #fff; padding: 40px; max-width: 800px; margin: 0 auto; line-height: 1.6;">
      <div style="margin-bottom: 50px;">
        <h1 style="font-size: 48px; font-weight: 300; margin-bottom: 20px; color: #1f2937; letter-spacing: -1px;">
          ${resumeData.personalInfo.firstName} ${resumeData.personalInfo.lastName}
        </h1>
        <div style="width: 80px; height: 1px; background: #1f2937; margin-bottom: 25px;"></div>
        <div style="font-size: 14px; color: #6b7280; line-height: 1.8;">
          <div>${resumeData.personalInfo.email}</div>
          <div>${resumeData.personalInfo.phone}</div>
          <div>${resumeData.personalInfo.location}</div>
          ${(resumeData.personalInfo.linkedin || resumeData.personalInfo.github) ? `
            <div style="margin-top: 8px;">
              ${resumeData.personalInfo.linkedin ? `<div>${resumeData.personalInfo.linkedin}</div>` : ''}
              ${resumeData.personalInfo.github ? `<div>${resumeData.personalInfo.github}</div>` : ''}
            </div>
          ` : ''}
        </div>
      </div>

      ${resumeData.personalInfo.summary ? `
        <div style="margin-bottom: 50px;">
          <h2 style="font-size: 14px; font-weight: bold; margin-bottom: 20px; color: #1f2937; text-transform: uppercase; letter-spacing: 2px;">Summary</h2>
          <p style="font-size: 18px; color: #374151; line-height: 1.6; font-weight: 300;">${resumeData.personalInfo.summary}</p>
        </div>
      ` : ''}

      ${resumeData.experience.length > 0 ? `
        <div style="margin-bottom: 50px;">
          <h2 style="font-size: 14px; font-weight: bold; margin-bottom: 25px; color: #1f2937; text-transform: uppercase; letter-spacing: 2px;">Experience</h2>
          ${resumeData.experience.map(exp => `
            <div style="margin-bottom: 35px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 8px;">
                <h3 style="font-size: 24px; font-weight: 300; color: #1f2937;">${exp.position}</h3>
                <span style="font-size: 12px; color: #9ca3af; text-transform: uppercase; letter-spacing: 1px;">
                  ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}
                </span>
              </div>
              <p style="font-size: 16px; color: #6b7280; margin-bottom: 12px; font-weight: 500;">${exp.company}, ${exp.location}</p>
              <p style="font-size: 16px; color: #374151; line-height: 1.6; font-weight: 300;">${exp.description}</p>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${resumeData.education.length > 0 ? `
        <div style="margin-bottom: 50px;">
          <h2 style="font-size: 14px; font-weight: bold; margin-bottom: 25px; color: #1f2937; text-transform: uppercase; letter-spacing: 2px;">Education</h2>
          ${resumeData.education.map(edu => `
            <div style="margin-bottom: 25px;">
              <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
                <h3 style="font-size: 20px; font-weight: 300; color: #1f2937;">${edu.degree} in ${edu.field}</h3>
                <span style="font-size: 12px; color: #9ca3af; text-transform: uppercase; letter-spacing: 1px;">
                  ${edu.startDate} - ${edu.current ? 'Present' : edu.endDate}
                </span>
              </div>
              <p style="font-size: 16px; color: #6b7280; font-weight: 500;">${edu.institution}</p>
              ${edu.gpa ? `<p style="font-size: 12px; color: #9ca3af; margin-top: 4px;">GPA: ${edu.gpa}</p>` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${resumeData.skills.length > 0 ? `
        <div style="margin-bottom: 50px;">
          <h2 style="font-size: 14px; font-weight: bold; margin-bottom: 25px; color: #1f2937; text-transform: uppercase; letter-spacing: 2px;">Skills</h2>
          <div style="display: flex; flex-wrap: wrap; gap: 20px;">
            ${resumeData.skills.map(skill => `
              <span style="font-size: 16px; color: #374151; font-weight: 300;">
                ${skill.name} <span style="color: #d1d5db;">•</span> ${skill.level}
              </span>
            `).join('')}
          </div>
        </div>
      ` : ''}

      ${resumeData.projects.length > 0 ? `
        <div>
          <h2 style="font-size: 14px; font-weight: bold; margin-bottom: 25px; color: #1f2937; text-transform: uppercase; letter-spacing: 2px;">Projects</h2>
          ${resumeData.projects.map(project => `
            <div style="margin-bottom: 35px;">
              <h3 style="font-size: 24px; font-weight: 300; color: #1f2937; margin-bottom: 8px;">${project.name}</h3>
              <p style="font-size: 16px; color: #374151; line-height: 1.6; font-weight: 300; margin-bottom: 12px;">${project.description}</p>
              <div style="font-size: 12px; color: #9ca3af; margin-bottom: 8px;">
                ${project.technologies.join(' • ')}
              </div>
              ${project.url ? `<p style="font-size: 12px; color: #6b7280;">${project.url}</p>` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}
    </div>
  `

  const generateExecutiveTemplateHTML = (resumeData: ResumeData) => `
    <div style="font-family: 'Crimson Text', serif; color: #000; background: #fff; padding: 40px; max-width: 800px; margin: 0 auto; line-height: 1.6;">
      <div style="text-align: center; margin-bottom: 45px; padding-bottom: 30px; border-bottom: 1px solid #f59e0b;">
        <div style="width: 100px; height: 100px; background: linear-gradient(135deg, #fef3c7, #fde68a); border-radius: 50%; margin: 0 auto 20px; display: flex; align-items: center; justify-content: center;">
          <span style="font-size: 36px; color: #d97706; font-weight: bold;">
            ${resumeData.personalInfo.firstName[0]}${resumeData.personalInfo.lastName[0]}
          </span>
        </div>
        <h1 style="font-size: 36px; font-weight: bold; margin-bottom: 15px; color: #1f2937;">${resumeData.personalInfo.firstName} ${resumeData.personalInfo.lastName}</h1>
        <div style="display: flex; justify-content: center; gap: 25px; font-size: 14px; color: #6b7280; margin-bottom: 12px;">
          <span>${resumeData.personalInfo.email}</span>
          <span>${resumeData.personalInfo.phone}</span>
          <span>${resumeData.personalInfo.location}</span>
        </div>
        ${(resumeData.personalInfo.linkedin || resumeData.personalInfo.github) ? `
          <div style="display: flex; justify-content: center; gap: 25px; font-size: 14px; color: #d97706;">
            ${resumeData.personalInfo.linkedin ? `<span>${resumeData.personalInfo.linkedin}</span>` : ''}
            ${resumeData.personalInfo.github ? `<span>${resumeData.personalInfo.github}</span>` : ''}
          </div>
        ` : ''}
      </div>

      ${resumeData.personalInfo.summary ? `
        <div style="margin-bottom: 40px;">
          <h2 style="font-size: 24px; font-weight: bold; margin-bottom: 15px; color: #1f2937; border-left: 4px solid #f59e0b; padding-left: 15px;">Executive Summary</h2>
          <p style="font-size: 17px; color: #374151; line-height: 1.7; font-style: italic;">${resumeData.personalInfo.summary}</p>
        </div>
      ` : ''}

      ${resumeData.experience.length > 0 ? `
        <div style="margin-bottom: 40px;">
          <h2 style="font-size: 24px; font-weight: bold; margin-bottom: 20px; color: #1f2937; border-left: 4px solid #f59e0b; padding-left: 15px;">Professional Experience</h2>
          ${resumeData.experience.map(exp => `
            <div style="margin-bottom: 30px; position: relative;">
              <div style="position: absolute; left: 0; top: 6px; width: 8px; height: 8px; background: #f59e0b; border-radius: 50%;"></div>
              <div style="margin-left: 20px;">
                <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 8px;">
                  <div>
                    <h3 style="font-size: 20px; font-weight: bold; color: #1f2937;">${exp.position}</h3>
                    <p style="font-size: 17px; color: #d97706; font-weight: 600;">${exp.company}, ${exp.location}</p>
                  </div>
                  <span style="font-size: 13px; color: #6b7280; background: #fef3c7; padding: 6px 12px; border-radius: 15px; border: 1px solid #fde68a;">
                    ${exp.startDate} - ${exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p style="font-size: 16px; color: #374151; line-height: 1.7;">${exp.description}</p>
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${resumeData.education.length > 0 ? `
        <div style="margin-bottom: 40px;">
          <h2 style="font-size: 24px; font-weight: bold; margin-bottom: 20px; color: #1f2937; border-left: 4px solid #f59e0b; padding-left: 15px;">Education</h2>
          ${resumeData.education.map(edu => `
            <div style="margin-bottom: 20px;">
              <div style="display: flex; justify-content: space-between; align-items: flex-start;">
                <div>
                  <h3 style="font-size: 20px; font-weight: bold; color: #1f2937;">${edu.degree} in ${edu.field}</h3>
                  <p style="font-size: 17px; color: #d97706; font-weight: 600;">${edu.institution}</p>
                </div>
                <span style="font-size: 13px; color: #6b7280; background: #fef3c7; padding: 6px 12px; border-radius: 15px; border: 1px solid #fde68a;">
                  ${edu.startDate} - ${edu.current ? 'Present' : edu.endDate} ${edu.gpa ? ` • GPA: ${edu.gpa}` : ''}
                </span>
              </div>
            </div>
          `).join('')}
        </div>
      ` : ''}

      ${resumeData.skills.length > 0 ? `
        <div style="margin-bottom: 40px;">
          <h2 style="font-size: 24px; font-weight: bold; margin-bottom: 20px; color: #1f2937; border-left: 4px solid #f59e0b; padding-left: 15px;">Core Competencies</h2>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            ${resumeData.skills.map(skill => `
              <div style="display: flex; align-items: center; gap: 8px;">
                <div style="width: 6px; height: 6px; background: #f59e0b; border-radius: 50%;"></div>
                <span style="font-size: 15px; color: #374151; font-weight: 500;">${skill.name}</span>
                <span style="font-size: 13px; color: #6b7280;">(${skill.level})</span>
              </div>
            `).join('')}
          </div>
        </div>
      ` : ''}

      ${resumeData.projects.length > 0 ? `
        <div>
          <h2 style="font-size: 24px; font-weight: bold; margin-bottom: 20px; color: #1f2937; border-left: 4px solid #f59e0b; padding-left: 15px;">Key Projects</h2>
          ${resumeData.projects.map(project => `
            <div style="margin-bottom: 30px;">
              <h3 style="font-size: 20px; font-weight: bold; color: #1f2937; margin-bottom: 10px;">${project.name}</h3>
              <p style="font-size: 16px; color: #374151; line-height: 1.7; margin-bottom: 15px;">${project.description}</p>
              ${project.technologies.length > 0 ? `
                <div style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 12px;">
                  ${project.technologies.map(tech => `
                    <span style="background: #fef3c7; color: #d97706; padding: 4px 12px; border-radius: 15px; font-size: 13px; font-weight: 500; border: 1px solid #fde68a;">
                      ${tech}
                    </span>
                  `).join('')}
                </div>
              ` : ''}
              ${project.url ? `<p style="font-size: 15px; color: #d97706; font-weight: 600;">Portfolio: ${project.url}</p>` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}
    </div>
  `

  const exportResume = async () => {
    try {
      // Generate HTML based on selected template
      let resumeHTML = ''

      switch (selectedTemplate) {
        case 'modern':
          resumeHTML = generateModernTemplateHTML(resumeData)
          break
        case 'professional':
          resumeHTML = generateProfessionalTemplateHTML(resumeData)
          break
        case 'creative':
          resumeHTML = generateCreativeTemplateHTML(resumeData)
          break
        case 'minimalist':
          resumeHTML = generateMinimalistTemplateHTML(resumeData)
          break
        case 'executive':
          resumeHTML = generateExecutiveTemplateHTML(resumeData)
          break
        default:
          resumeHTML = generateModernTemplateHTML(resumeData)
      }

      // Create a temporary element with the resume content for PDF generation
      const resumeElement = document.createElement('div')
      resumeElement.innerHTML = resumeHTML

      // Style the element and add it to the document temporarily
      resumeElement.style.position = 'absolute'
      resumeElement.style.left = '-9999px'
      resumeElement.style.top = '-9999px'
      resumeElement.style.width = '800px'
      document.body.appendChild(resumeElement)

      // Generate canvas from the HTML
      const canvas = await html2canvas(resumeElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        width: 800,
        height: resumeElement.scrollHeight
      })

      // Remove the temporary element
      document.body.removeChild(resumeElement)

      // Create PDF
      const imgData = canvas.toDataURL('image/png')
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4'
      })

      // Calculate dimensions to fit A4
      const imgWidth = 210 // A4 width in mm
      const pageHeight = 295 // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width
      let heightLeft = imgHeight

      let position = 0

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      // Add additional pages if needed
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      // Download the PDF
      const fileName = `${resumeData.personalInfo.firstName}_${resumeData.personalInfo.lastName}_Resume.pdf`
      pdf.save(fileName)

    } catch (error) {
      console.error('Error generating PDF:', error)
      alert('Failed to generate PDF. Please try again.')
    }
  }

  // Save draft to database
  const saveDraft = async () => {
    if (!user) {
      alert('Please sign in to save your resume draft')
      return
    }

    try {
      const token = await user.getIdToken()
      const response = await fetch('/api/resume', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          personalInfo: resumeData.personalInfo,
          experience: resumeData.experience,
          education: resumeData.education,
          skills: resumeData.skills,
          projects: resumeData.projects,
          selectedTemplate
        }),
      })

      if (response.ok) {
        alert('Resume draft saved successfully!')
      } else {
        const error = await response.json()
        alert(`Failed to save draft: ${error.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error saving draft:', error)
      alert('Failed to save resume draft')
    }
  }

  const templates = [
    {
      id: 'modern',
      name: 'Modern',
      preview: 'Clean and contemporary design with subtle colors',
      description: 'Professional layout with modern typography and clean spacing',
      colors: { primary: '#2563eb', secondary: '#64748b', accent: '#06b6d4' }
    },
    {
      id: 'professional',
      name: 'Professional',
      preview: 'Traditional corporate style with formal layout',
      description: 'Classic business format preferred by traditional industries',
      colors: { primary: '#1f2937', secondary: '#6b7280', accent: '#374151' }
    },
    {
      id: 'creative',
      name: 'Creative',
      preview: 'Unique and eye-catching layout with vibrant colors',
      description: 'Stand out with creative design elements and bold styling',
      colors: { primary: '#7c3aed', secondary: '#a855f7', accent: '#ec4899' }
    },
    {
      id: 'minimalist',
      name: 'Minimalist',
      preview: 'Simple and elegant design focusing on content',
      description: 'Clean, distraction-free layout that lets your content shine',
      colors: { primary: '#111827', secondary: '#6b7280', accent: '#10b981' }
    },
    {
      id: 'executive',
      name: 'Executive',
      preview: 'Sophisticated design for senior-level positions',
      description: 'Premium layout with elegant typography and refined styling',
      colors: { primary: '#1e3a8a', secondary: '#475569', accent: '#f59e0b' }
    }
  ]

  return (
    <RouteGuard>
      <div style={{ minHeight: "100vh", overflow: "hidden", fontFamily: '"Geist", sans-serif', ...(theme.bgPrimaryStyle as any) }}>
        {/* Navigation */}
        <m.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, backdropFilter: "blur(8px)", ...(theme.bgNavStyle as any), borderBottom: `1px solid ${theme.borderLight}` }}
        >
          <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <m.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-1.5 sm:gap-3 cursor-pointer"
                onClick={() => window.location.href = '/'}
                style={{ display: "flex", alignItems: "center" }}
              >
                <div className="relative w-8 h-8 sm:w-12 sm:h-12 flex items-center justify-center">
                  <img src="/csync.png" alt="CareerSync" className="w-full h-full object-contain" />
                </div>
                <span style={{ fontSize: 18, fontWeight: 800, ...(theme.theme === 'light' ? { color: '#0f172a' } : theme.gradientText) }}>
                  CareerSync
                </span>
              </m.div>

              {/* Desktop Navigation */}
              <div className="hidden sm:flex items-center gap-6">
                <ThemeToggle />
                {user ? (
                  <>
                    <m.a
                      href="/dashboard"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 text-sm font-medium rounded-full"
                      style={{ color: theme.textPrimary, borderRadius: 9999, border: `1px solid ${theme.borderMedium}` }}
                    >
                      Dashboard
                    </m.a>
                    <m.a
                      href="/jobs"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 text-sm font-medium rounded-full"
                      style={{ color: theme.textPrimary, borderRadius: 9999, border: `1px solid ${theme.borderMedium}` }}
                    >
                      Jobs
                    </m.a>
                    <m.a
                      href="/applications"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 text-sm font-medium rounded-full"
                      style={{ color: theme.textPrimary, borderRadius: 9999, border: `1px solid ${theme.borderMedium}` }}
                    >
                      Applications
                    </m.a>
                    <m.a
                      href="/profile"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 text-sm font-medium rounded-full"
                      style={{ color: theme.textPrimary, borderRadius: 9999, border: `1px solid ${theme.borderMedium}` }}
                    >
                      Profile
                    </m.a>
                    <m.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={async () => {
                        await logout()
                        window.location.href = '/'
                      }}
                      className="px-6 py-2 text-white text-sm font-bold rounded-full bg-gradient-to-r hover:shadow-lg hover:shadow-[#ff6b00]/50 transition-all duration-300"
                      style={{
                        background: theme.theme === 'light'
                          ? "linear-gradient(to right, #f59e0b, #f97316)"
                          : "linear-gradient(to right, #ff6b00, #ff8c00)",
                        boxShadow: theme.theme === 'light'
                          ? "0 4px 14px rgba(245, 158, 11, 0.25)"
                          : "0 10px 30px rgba(255, 107, 0, 0.25)"
                      }}
                    >
                      Sign Out
                    </m.button>
                  </>
                ) : (
                  <m.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => window.location.href = '/login'}
                    className="px-6 py-2 text-white text-sm font-bold rounded-full bg-gradient-to-r hover:shadow-lg hover:shadow-[#3b82f6]/50 transition-all duration-300"
                    style={{
                      background: theme.theme === 'light'
                        ? "linear-gradient(to right, #3b82f6, #1d4ed8)"
                        : "linear-gradient(to right, #00d4ff, #ff6b00)",
                      boxShadow: theme.theme === 'light'
                        ? "0 4px 14px rgba(59, 130, 246, 0.25)"
                        : "0 10px 30px rgba(0, 212, 255, 0.25)"
                    }}
                  >
                    Sign In
                  </m.button>
                )}
              </div>

              {/* Mobile Menu Button */}
              <div className="sm:hidden flex items-center gap-2">
                <ThemeToggle />
                <m.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setShowMobileMenu(!showMobileMenu)}
                  className="p-1.5 rounded-full border border-[#00d4ff]/50 hover:border-[#00d4ff] transition-all duration-300"
                  style={{ color: theme.textPrimary }}
                >
                  {showMobileMenu ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </m.button>
              </div>
            </div>
          </div>
        </m.nav>

        {/* Mobile Menu */}
        <AnimatePresence>
          {showMobileMenu && (
            <m.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="sm:hidden fixed top-[73px] left-0 right-0 z-40 border-b border-[#00d4ff]/50"
              style={{ background: theme.bgNavStyle?.backgroundColor || '#ffffff', backdropFilter: "blur(12px)" }}
            >
              <div className="max-w-7xl mx-auto px-3 py-2">
                <div className="flex flex-col gap-2">
                  {user ? (
                    <>
                      <m.a
                        href="/dashboard"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowMobileMenu(false)}
                        className="w-full px-4 py-3 text-left text-sm font-medium rounded-xl border border-[#00d4ff]/50 hover:border-[#00d4ff] transition-all duration-300 flex items-center gap-2"
                        style={{ color: theme.textPrimary }}
                      >
                        <BarChart3 className="w-4 h-4" />
                        Dashboard
                      </m.a>

                      <m.a
                        href="/jobs"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowMobileMenu(false)}
                        className="w-full px-4 py-3 text-left text-sm font-medium rounded-xl border border-[#00d4ff]/50 hover:border-[#00d4ff] transition-all duration-300 flex items-center gap-2"
                        style={{ color: theme.textPrimary }}
                      >
                        <Briefcase className="w-4 h-4" />
                        Jobs
                      </m.a>

                      <m.a
                        href="/applications"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowMobileMenu(false)}
                        className="w-full px-4 py-3 text-left text-sm font-medium rounded-xl border border-[#00d4ff]/50 hover:border-[#00d4ff] transition-all duration-300 flex items-center gap-2"
                        style={{ color: theme.textPrimary }}
                      >
                        <ClipboardList className="w-4 h-4" />
                        Applications
                      </m.a>

                      <m.a
                        href="/profile"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setShowMobileMenu(false)}
                        className="w-full px-4 py-3 text-left text-sm font-medium rounded-xl border border-[#00d4ff]/50 hover:border-[#00d4ff] transition-all duration-300 flex items-center gap-2"
                        style={{ color: theme.textPrimary }}
                      >
                        <User className="w-4 h-4" />
                        Profile
                      </m.a>

                      <m.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={async () => {
                          await logout()
                          setShowMobileMenu(false)
                          window.location.href = '/'
                        }}
                        className="w-full px-4 py-3 text-left text-white text-sm font-bold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                        style={{
                          background: theme.theme === 'light'
                            ? "linear-gradient(to right, #f59e0b, #f97316)"
                            : "linear-gradient(to right, #ff6b00, #ff8c00)",
                          boxShadow: theme.theme === 'light'
                            ? "0 4px 14px rgba(245, 158, 11, 0.25)"
                            : "0 10px 30px rgba(255, 107, 0, 0.25)"
                        }}
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </m.button>
                    </>
                  ) : (
                    <m.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setShowMobileMenu(false)
                        window.location.href = '/login'
                      }}
                      className="w-full px-4 py-3 text-left text-white text-sm font-bold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-2"
                      style={{
                        background: theme.theme === 'light'
                          ? "linear-gradient(to right, #3b82f6, #1d4ed8)"
                          : "linear-gradient(to right, #00d4ff, #ff6b00)",
                        boxShadow: theme.theme === 'light'
                          ? "0 4px 14px rgba(59, 130, 246, 0.25)"
                          : "0 10px 30px rgba(0, 212, 255, 0.25)"
                      }}
                    >
                      <LogIn className="w-4 h-4" />
                      Sign In
                    </m.button>
                  )}
                </div>
              </div>
            </m.div>
          )}
        </AnimatePresence>

        {/* Background Effects */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
          <m.div
            className="absolute top-1/4 left-1/4"
            animate={{
              borderRadius: ["50% 20% 80% 30%", "30% 80% 20% 70%", "80% 30% 50% 20%", "50% 20% 80% 30%"],
              rotate: [0, 90, 180, 360],
              scale: [1, 1.2, 0.8, 1],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              top: "25%",
              left: "25%",
              width: 384,
              height: 384,
              opacity: 0.2,
              filter: "blur(40px)",
              background: morphBg,
            }}
          />
          <m.div
            className="absolute bottom-1/4 right-1/4"
            animate={{
              borderRadius: ["20% 80% 30% 70%", "70% 30% 80% 20%", "30% 70% 20% 80%", "20% 80% 30% 70%"],
              rotate: [360, 270, 180, 0],
              scale: [0.8, 1.3, 1, 0.8],
            }}
            transition={{
              duration: 25,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              bottom: "25%",
              right: "25%",
              width: 320,
              height: 320,
              opacity: 0.15,
              filter: "blur(30px)",
              background: morphBg,
            }}
          />
        </div>

        {/* Main Content */}
        <div className="relative z-10 pt-20 sm:pt-24 pb-12 px-4 sm:px-6 max-w-7xl mx-auto">
          {/* Header */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8 sm:mb-12"
          >
            <h1
              className="text-4xl sm:text-6xl md:text-7xl font-black mb-4 leading-none"
              style={{
                backgroundImage: theme.theme === 'light'
                  ? 'linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%)'
                  : 'linear-gradient(135deg, #ffffff 0%, #00d4ff 30%, #ff6b00 60%)',
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: theme.textPrimary,
              }}
            >
              Resume Builder
            </h1>
            <p style={{ color: theme.textSecondary }} className="text-base sm:text-xl">Create a professional resume that stands out to employers</p>
          </m.div>

          {/* Action Buttons */}
          <m.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap gap-4 mb-8"
          >
            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPreviewMode(!previewMode)}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold"
              style={{ background: theme.theme === 'light' ? 'linear-gradient(90deg,#3b82f6,#1d4ed8)' : 'linear-gradient(90deg,#ff6b00,#00d4ff)', color: "#fff" }}
            >
              {previewMode ? <Edit className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              {previewMode ? 'Edit Resume' : 'Preview Resume'}
            </m.button>

            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={exportResume}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold"
              style={{ background: theme.theme === 'light' ? 'linear-gradient(90deg,#10b981,#059669)' : 'linear-gradient(90deg,#00ff88,#00d4aa)', color: "#fff" }}
            >
              <Download className="w-5 h-5" />
              Export PDF
            </m.button>

            <m.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={saveDraft}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold"
              style={{ background: theme.bgCard, border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
            >
              <Save className="w-5 h-5" />
              Save Draft
            </m.button>
          </m.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            {!previewMode && (
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-4">
                  {[
                    { id: 'personal', label: 'Personal Info', icon: User },
                    { id: 'experience', label: 'Experience', icon: Briefcase },
                    { id: 'education', label: 'Education', icon: GraduationCap },
                    { id: 'skills', label: 'Skills', icon: Zap },
                    { id: 'projects', label: 'Projects', icon: Rocket },
                    { id: 'templates', label: 'Templates', icon: PaletteIcon }
                  ].map(section => (
                    <m.button
                      key={section.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full p-4 rounded-xl text-left transition-all ${activeSection === section.id ? 'ring-2' : ''} ${activeSection === section.id ? (theme.theme === 'light' ? 'ring-blue-500' : 'ring-cyan-400') : ''}`}
                      style={{
                        background: activeSection === section.id
                          ? (theme.theme === 'light' ? 'linear-gradient(90deg,#3b82f6,#1d4ed8)' : 'linear-gradient(90deg,#ff6b00,#00d4ff)')
                          : (theme.theme === 'light' ? 'rgba(255, 255, 255, 0.8)' : 'rgba(30, 41, 59, 0.6)'),
                        color: activeSection === section.id ? '#fff' : theme.textPrimary,
                        border: `1px solid ${activeSection === section.id ? (theme.theme === 'light' ? '#3b82f6' : '#ff6b00') : theme.borderMedium}`,
                        backdropFilter: activeSection !== section.id ? 'blur(10px)' : 'none',
                        boxShadow: activeSection === section.id
                          ? (theme.theme === 'light' ? '0 4px 14px rgba(59, 130, 246, 0.25)' : '0 4px 14px rgba(255, 107, 0, 0.25)')
                          : (theme.theme === 'light' ? '0 2px 8px rgba(0, 0, 0, 0.1)' : '0 2px 8px rgba(0, 0, 0, 0.3)')
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <section.icon className="w-5 h-5" />
                        <span className="font-semibold">{section.label}</span>
                      </div>
                    </m.button>
                  ))}
                </div>
              </div>
            )}

            {/* Main Content Area */}
            <div className={`${previewMode ? 'lg:col-span-4' : 'lg:col-span-3'}`}>
              {previewMode ? (
                // Resume Preview
                <div className="space-y-6">
                  {/* Preview Header */}
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-2xl font-bold" style={{ color: theme.textPrimary }}>Resume Preview</h2>
                      <p style={{ color: theme.textSecondary }}>Previewing: <span className="font-semibold capitalize">{selectedTemplate}</span> template</p>
                    </div>
                    <div className="flex items-center gap-4">
                      {/* Template Switcher in Preview */}
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium" style={{ color: theme.textSecondary }}>Template:</span>
                        <select
                          value={selectedTemplate}
                          onChange={(e) => setSelectedTemplate(e.target.value)}
                          className="px-3 py-2 rounded-lg focus:outline-none focus:ring-2 transition-all text-sm"
                          style={{
                            background: theme.bgInputStyle?.backgroundColor || theme.bgCard,
                            border: `1px solid ${theme.borderMedium}`,
                            color: theme.textPrimary,
                            '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                          } as any}
                        >
                          {templates.map(template => (
                            <option key={template.id} value={template.id}>
                              {template.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <m.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setPreviewMode(false)}
                        className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold"
                        style={{ background: theme.theme === 'light' ? 'linear-gradient(90deg,#6b7280,#4b5563)' : 'linear-gradient(90deg,#374151,#1f2937)', color: "#fff" }}
                      >
                        <Edit className="w-5 h-5" />
                        Back to Edit
                      </m.button>
                    </div>
                  </div>

                  {/* Preview Info Banner */}
                  <div className="p-4 rounded-xl" style={{ background: theme.theme === 'light' ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(147, 197, 253, 0.05))' : 'linear-gradient(135deg, rgba(0, 212, 255, 0.1), rgba(0, 255, 136, 0.05))', border: `1px solid ${theme.theme === 'light' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(0, 212, 255, 0.2)'}` }}>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0">
                        <Eye className="w-5 h-5" style={{ color: theme.textAccent }} />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1" style={{ color: theme.textPrimary }}>Preview Your Template</h4>
                        <p style={{ color: theme.textSecondary }}>
                          This is how your resume will look with the selected template. Switch templates using the dropdown above, then export as PDF when you're satisfied with the design.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Resume Preview Container */}
                  <div className="max-w-4xl mx-auto">
                    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                      {selectedTemplate === 'modern' && (
                        <ModernTemplate resumeData={resumeData} />
                      )}
                      {selectedTemplate === 'professional' && (
                        <ProfessionalTemplate resumeData={resumeData} />
                      )}
                      {selectedTemplate === 'creative' && (
                        <CreativeTemplate resumeData={resumeData} />
                      )}
                      {selectedTemplate === 'minimalist' && (
                        <MinimalistTemplate resumeData={resumeData} />
                      )}
                      {selectedTemplate === 'executive' && (
                        <ExecutiveTemplate resumeData={resumeData} />
                      )}
                    </div>
                  </div>

                  {/* Preview Actions */}
                  <div className="flex justify-center gap-4">
                    <m.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={exportResume}
                      className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg"
                      style={{ background: theme.theme === 'light' ? 'linear-gradient(90deg,#10b981,#059669)' : 'linear-gradient(90deg,#00ff88,#00d4aa)', color: "#fff" }}
                    >
                      <Download className="w-6 h-6" />
                      Export PDF
                    </m.button>
                    <m.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={saveDraft}
                      className="flex items-center gap-2 px-8 py-4 rounded-xl font-bold text-lg"
                      style={{ background: theme.bgCard, border: `1px solid ${theme.borderMedium}`, color: theme.textPrimary }}
                    >
                      <Save className="w-6 h-6" />
                      Save Draft
                    </m.button>
                  </div>
                </div>
              ) : (
                // Edit Mode
                <div className="space-y-8">
                  {/* Personal Information */}
                  {activeSection === 'personal' && (
                    <m.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="p-6 rounded-3xl"
                      style={{ background: theme.bgCard, border: `1px solid ${theme.borderMedium}` }}
                    >
                      <h2 className="text-2xl font-bold mb-6" style={{ color: theme.textPrimary }}>Personal Information</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold mb-2" style={{ color: theme.textTertiary }}>First Name</label>
                          <input
                            type="text"
                            value={resumeData.personalInfo.firstName}
                            onChange={(e) => updatePersonalInfo('firstName', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all"
                            style={{
                              background: theme.bgInputStyle?.backgroundColor || theme.bgCard,
                              border: `1px solid ${theme.borderMedium}`,
                              color: theme.textPrimary,
                              '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                            } as any}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold mb-2" style={{ color: theme.textTertiary }}>Last Name</label>
                          <input
                            type="text"
                            value={resumeData.personalInfo.lastName}
                            onChange={(e) => updatePersonalInfo('lastName', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all"
                            style={{
                              background: theme.bgInputStyle?.backgroundColor || theme.bgCard,
                              border: `1px solid ${theme.borderMedium}`,
                              color: theme.textPrimary,
                              '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                            } as any}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold mb-2" style={{ color: theme.textTertiary }}>Email</label>
                          <input
                            type="email"
                            value={resumeData.personalInfo.email}
                            onChange={(e) => updatePersonalInfo('email', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all"
                            style={{
                              background: theme.bgInputStyle?.backgroundColor || theme.bgCard,
                              border: `1px solid ${theme.borderMedium}`,
                              color: theme.textPrimary,
                              '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                            } as any}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold mb-2" style={{ color: theme.textTertiary }}>Phone</label>
                          <input
                            type="tel"
                            value={resumeData.personalInfo.phone}
                            onChange={(e) => updatePersonalInfo('phone', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all"
                            style={{
                              background: theme.bgInputStyle?.backgroundColor || theme.bgCard,
                              border: `1px solid ${theme.borderMedium}`,
                              color: theme.textPrimary,
                              '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                            } as any}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-bold mb-2" style={{ color: theme.textTertiary }}>Location</label>
                          <input
                            type="text"
                            value={resumeData.personalInfo.location}
                            onChange={(e) => updatePersonalInfo('location', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all"
                            style={{
                              background: theme.bgInputStyle?.backgroundColor || theme.bgCard,
                              border: `1px solid ${theme.borderMedium}`,
                              color: theme.textPrimary,
                              '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                            } as any}
                          />
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-bold mb-2" style={{ color: theme.textTertiary }}>Professional Summary</label>
                          <textarea
                            rows={4}
                            value={resumeData.personalInfo.summary}
                            onChange={(e) => updatePersonalInfo('summary', e.target.value)}
                            className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all resize-none"
                            style={{
                              background: theme.bgInputStyle?.backgroundColor || theme.bgCard,
                              border: `1px solid ${theme.borderMedium}`,
                              color: theme.textPrimary,
                              '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                            } as any}
                          />
                        </div>
                      </div>
                    </m.div>
                  )}

                  {/* Experience Section */}
                  {activeSection === 'experience' && (
                    <m.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold" style={{ color: theme.textPrimary }}>Work Experience</h2>
                        <m.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={addExperience}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold"
                          style={{ background: theme.theme === 'light' ? 'linear-gradient(90deg,#3b82f6,#1d4ed8)' : 'linear-gradient(90deg,#ff6b00,#00d4ff)', color: "#fff" }}
                        >
                          <Plus className="w-4 h-4" />
                          Add Experience
                        </m.button>
                      </div>

                      {resumeData.experience.map((exp, idx) => (
                        <div
                          key={exp.id}
                          className="p-6 rounded-3xl"
                          style={{ background: theme.bgCard, border: `1px solid ${theme.borderMedium}` }}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold" style={{ color: theme.textPrimary }}>Experience {idx + 1}</h3>
                            <button
                              onClick={() => removeExperience(exp.id)}
                              className="p-2 rounded-lg"
                              style={{ background: "rgba(255,68,68,0.12)", border: `1px solid rgba(255,68,68,0.28)`, color: "#ff4444" }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                              type="text"
                              placeholder="Company"
                              value={exp.company}
                              onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                              className="px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all"
                              style={{
                                background: theme.bgInputStyle?.backgroundColor || theme.bgCard,
                                border: `1px solid ${theme.borderMedium}`,
                                color: theme.textPrimary,
                                '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                              } as any}
                            />
                            <input
                              type="text"
                              placeholder="Position"
                              value={exp.position}
                              onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                              className="px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all"
                              style={{
                                background: theme.bgInputStyle?.backgroundColor || theme.bgCard,
                                border: `1px solid ${theme.borderMedium}`,
                                color: theme.textPrimary,
                                '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                              } as any}
                            />
                            <input
                              type="text"
                              placeholder="Location"
                              value={exp.location}
                              onChange={(e) => updateExperience(exp.id, 'location', e.target.value)}
                              className="px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all"
                              style={{
                                background: theme.bgInputStyle?.backgroundColor || theme.bgCard,
                                border: `1px solid ${theme.borderMedium}`,
                                color: theme.textPrimary,
                                '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                              } as any}
                            />
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={exp.current}
                                onChange={(e) => updateExperience(exp.id, 'current', e.target.checked)}
                                className="w-4 h-4"
                                style={{ accentColor: theme.textAccent }}
                              />
                              <label style={{ color: theme.textPrimary }}>Currently working here</label>
                            </div>
                            <input
                              type="month"
                              placeholder="Start Date"
                              value={exp.startDate}
                              onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                              className="px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all"
                              style={{
                                background: theme.bgInputStyle?.backgroundColor || theme.bgCard,
                                border: `1px solid ${theme.borderMedium}`,
                                color: theme.textPrimary,
                                '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                              } as any}
                            />
                            <input
                              type="month"
                              placeholder="End Date"
                              value={exp.endDate}
                              onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                              disabled={exp.current}
                              className="px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all disabled:opacity-50"
                              style={{
                                background: theme.bgInputStyle?.backgroundColor || theme.bgCard,
                                border: `1px solid ${theme.borderMedium}`,
                                color: theme.textPrimary,
                                '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                              } as any}
                            />
                            <div className="md:col-span-2">
                              <textarea
                                rows={3}
                                placeholder="Describe your responsibilities and achievements..."
                                value={exp.description}
                                onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all resize-none"
                                style={{
                                  background: theme.bgInputStyle?.backgroundColor || theme.bgCard,
                                  border: `1px solid ${theme.borderMedium}`,
                                  color: theme.textPrimary,
                                  '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                                } as any}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </m.div>
                  )}

                  {/* Education Section */}
                  {activeSection === 'education' && (
                    <m.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold" style={{ color: theme.textPrimary }}>Education</h2>
                        <m.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={addEducation}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold"
                          style={{ background: theme.theme === 'light' ? 'linear-gradient(90deg,#3b82f6,#1d4ed8)' : 'linear-gradient(90deg,#ff6b00,#00d4ff)', color: "#fff" }}
                        >
                          <Plus className="w-4 h-4" />
                          Add Education
                        </m.button>
                      </div>

                      {resumeData.education.map((edu, idx) => (
                        <div
                          key={edu.id}
                          className="p-6 rounded-3xl"
                          style={{ background: theme.bgCard, border: `1px solid ${theme.borderMedium}` }}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold" style={{ color: theme.textPrimary }}>Education {idx + 1}</h3>
                            <button
                              onClick={() => removeEducation(edu.id)}
                              className="p-2 rounded-lg"
                              style={{ background: "rgba(255,68,68,0.12)", border: `1px solid rgba(255,68,68,0.28)`, color: "#ff4444" }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                              type="text"
                              placeholder="Institution"
                              value={edu.institution}
                              onChange={(e) => updateEducation(edu.id, 'institution', e.target.value)}
                              className="px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all"
                              style={{
                                background: theme.bgInputStyle?.backgroundColor || theme.bgCard,
                                border: `1px solid ${theme.borderMedium}`,
                                color: theme.textPrimary,
                                '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                              } as any}
                            />
                            <input
                              type="text"
                              placeholder="Degree"
                              value={edu.degree}
                              onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                              className="px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all"
                              style={{
                                background: theme.bgInputStyle?.backgroundColor || theme.bgCard,
                                border: `1px solid ${theme.borderMedium}`,
                                color: theme.textPrimary,
                                '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                              } as any}
                            />
                            <input
                              type="text"
                              placeholder="Field of Study"
                              value={edu.field}
                              onChange={(e) => updateEducation(edu.id, 'field', e.target.value)}
                              className="px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all"
                              style={{
                                background: theme.bgInputStyle?.backgroundColor || theme.bgCard,
                                border: `1px solid ${theme.borderMedium}`,
                                color: theme.textPrimary,
                                '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                              } as any}
                            />
                            <input
                              type="text"
                              placeholder="GPA (optional)"
                              value={edu.gpa}
                              onChange={(e) => updateEducation(edu.id, 'gpa', e.target.value)}
                              className="px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all"
                              style={{
                                background: theme.bgInputStyle?.backgroundColor || theme.bgCard,
                                border: `1px solid ${theme.borderMedium}`,
                                color: theme.textPrimary,
                                '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                              } as any}
                            />
                            <div className="flex items-center gap-2">
                              <input
                                type="checkbox"
                                checked={edu.current}
                                onChange={(e) => updateEducation(edu.id, 'current', e.target.checked)}
                                className="w-4 h-4"
                                style={{ accentColor: theme.textAccent }}
                              />
                              <label style={{ color: theme.textPrimary }}>Currently studying here</label>
                            </div>
                            <div></div>
                            <input
                              type="month"
                              placeholder="Start Date"
                              value={edu.startDate}
                              onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                              className="px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all"
                              style={{
                                background: theme.bgInputStyle?.backgroundColor || theme.bgCard,
                                border: `1px solid ${theme.borderMedium}`,
                                color: theme.textPrimary,
                                '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                              } as any}
                            />
                            <input
                              type="month"
                              placeholder="End Date"
                              value={edu.endDate}
                              onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                              disabled={edu.current}
                              className="px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all disabled:opacity-50"
                              style={{
                                background: theme.bgInputStyle?.backgroundColor || theme.bgCard,
                                border: `1px solid ${theme.borderMedium}`,
                                color: theme.textPrimary,
                                '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                              } as any}
                            />
                          </div>
                        </div>
                      ))}
                    </m.div>
                  )}

                  {/* Skills Section */}
                  {activeSection === 'skills' && (
                    <m.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold" style={{ color: theme.textPrimary }}>Skills</h2>
                        <m.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={addSkill}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold"
                          style={{ background: theme.theme === 'light' ? 'linear-gradient(90deg,#3b82f6,#1d4ed8)' : 'linear-gradient(90deg,#ff6b00,#00d4ff)', color: "#fff" }}
                        >
                          <Plus className="w-4 h-4" />
                          Add Skill
                        </m.button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {resumeData.skills.map((skill, idx) => (
                          <div
                            key={skill.id}
                            className="p-4 rounded-xl flex items-center gap-4"
                            style={{ background: theme.bgCard, border: `1px solid ${theme.borderMedium}` }}
                          >
                            <div className="flex-1">
                              <input
                                type="text"
                                placeholder="Skill name"
                                value={skill.name}
                                onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                                className="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 transition-all text-sm"
                                style={{
                                  background: theme.bgInputStyle?.backgroundColor || theme.bgCard,
                                  border: `1px solid ${theme.borderMedium}`,
                                  color: theme.textPrimary,
                                  '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                                } as any}
                              />
                            </div>
                            <select
                              value={skill.level}
                              onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
                              className="px-3 py-2 rounded-lg focus:outline-none focus:ring-2 transition-all text-sm"
                              style={{
                                background: theme.bgInputStyle?.backgroundColor || theme.bgCard,
                                border: `1px solid ${theme.borderMedium}`,
                                color: theme.textPrimary,
                                '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                              } as any}
                            >
                              <option value="beginner">Beginner</option>
                              <option value="intermediate">Intermediate</option>
                              <option value="advanced">Advanced</option>
                              <option value="expert">Expert</option>
                            </select>
                            <button
                              onClick={() => removeSkill(skill.id)}
                              className="p-2 rounded-lg"
                              style={{ background: "rgba(255,68,68,0.12)", border: `1px solid rgba(255,68,68,0.28)`, color: "#ff4444" }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    </m.div>
                  )}

                  {/* Projects Section */}
                  {activeSection === 'projects' && (
                    <m.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div className="flex items-center justify-between">
                        <h2 className="text-2xl font-bold" style={{ color: theme.textPrimary }}>Projects</h2>
                        <m.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={addProject}
                          className="flex items-center gap-2 px-4 py-2 rounded-xl font-bold"
                          style={{ background: theme.theme === 'light' ? 'linear-gradient(90deg,#3b82f6,#1d4ed8)' : 'linear-gradient(90deg,#ff6b00,#00d4ff)', color: "#fff" }}
                        >
                          <Plus className="w-4 h-4" />
                          Add Project
                        </m.button>
                      </div>

                      {resumeData.projects.map((project, idx) => (
                        <div
                          key={project.id}
                          className="p-6 rounded-3xl"
                          style={{ background: theme.bgCard, border: `1px solid ${theme.borderMedium}` }}
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold" style={{ color: theme.textPrimary }}>Project {idx + 1}</h3>
                            <button
                              onClick={() => removeProject(project.id)}
                              className="p-2 rounded-lg"
                              style={{ background: "rgba(255,68,68,0.12)", border: `1px solid rgba(255,68,68,0.28)`, color: "#ff4444" }}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                              type="text"
                              placeholder="Project name"
                              value={project.name}
                              onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                              className="px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all"
                              style={{
                                background: theme.bgInputStyle?.backgroundColor || theme.bgCard,
                                border: `1px solid ${theme.borderMedium}`,
                                color: theme.textPrimary,
                                '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                              } as any}
                            />
                            <input
                              type="text"
                              placeholder="Project URL (optional)"
                              value={project.url}
                              onChange={(e) => updateProject(project.id, 'url', e.target.value)}
                              className="px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all"
                              style={{
                                background: theme.bgInputStyle?.backgroundColor || theme.bgCard,
                                border: `1px solid ${theme.borderMedium}`,
                                color: theme.textPrimary,
                                '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                              } as any}
                            />
                            <div className="md:col-span-2">
                              <textarea
                                rows={3}
                                placeholder="Describe your project..."
                                value={project.description}
                                onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                                className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all resize-none"
                                style={{
                                  background: theme.bgInputStyle?.backgroundColor || theme.bgCard,
                                  border: `1px solid ${theme.borderMedium}`,
                                  color: theme.textPrimary,
                                  '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                                } as any}
                              />
                            </div>
                            <div className="md:col-span-2">
                              <label className="block text-sm font-bold mb-2" style={{ color: theme.textTertiary }}>Technologies Used</label>
                              <input
                                type="text"
                                placeholder="e.g., React, Node.js, MongoDB"
                                value={project.technologies.join(', ')}
                                onChange={(e) => updateProject(project.id, 'technologies', e.target.value.split(',').map(tech => tech.trim()))}
                                className="w-full px-4 py-3 rounded-xl focus:outline-none focus:ring-2 transition-all"
                                style={{
                                  background: theme.bgInputStyle?.backgroundColor || theme.bgCard,
                                  border: `1px solid ${theme.borderMedium}`,
                                  color: theme.textPrimary,
                                  '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                                } as any}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </m.div>
                  )}

                  {/* Templates Section */}
                  {activeSection === 'templates' && (
                    <m.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-6"
                    >
                      <div>
                        <h2 className="text-2xl font-bold mb-4" style={{ color: theme.textPrimary }}>Choose Your Template</h2>
                        <p style={{ color: theme.textSecondary }} className="mb-6">Select a template that best represents your professional style</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {templates.map((template) => (
                          <m.div
                            key={template.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedTemplate(template.id)}
                            className={`relative p-6 rounded-2xl cursor-pointer transition-all duration-300 ${
                              selectedTemplate === template.id
                                ? 'ring-2 ring-offset-2'
                                : 'hover:shadow-lg'
                            }`}
                            style={{
                              background: selectedTemplate === template.id
                                ? (theme.theme === 'light'
                                    ? `linear-gradient(135deg, ${template.colors.primary}15, ${template.colors.accent}10)`
                                    : `linear-gradient(135deg, ${template.colors.primary}25, ${template.colors.accent}20)`)
                                : theme.bgCard,
                              border: `1px solid ${selectedTemplate === template.id ? template.colors.primary : theme.borderMedium}`,
                              ringColor: template.colors.primary,
                              boxShadow: selectedTemplate === template.id
                                ? `0 10px 30px rgba(${template.colors.primary.slice(1, 3)}, ${template.colors.primary.slice(3, 5)}, ${template.colors.primary.slice(5, 7)}, 0.3)`
                                : 'none'
                            }}
                          >
                            {/* Template Preview */}
                            <div className="mb-4">
                              <div
                                className="w-full h-32 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center mb-3"
                                style={{
                                  background: `linear-gradient(45deg, ${template.colors.primary}10, ${template.colors.accent}05)`,
                                  borderColor: template.colors.secondary
                                }}
                              >
                                <div className="text-center">
                                  <div
                                    className="w-8 h-8 rounded-full mx-auto mb-2"
                                    style={{ backgroundColor: template.colors.primary }}
                                  ></div>
                                  <div
                                    className="w-16 h-2 rounded mx-auto mb-1"
                                    style={{ backgroundColor: template.colors.secondary }}
                                  ></div>
                                  <div
                                    className="w-12 h-2 rounded mx-auto"
                                    style={{ backgroundColor: template.colors.accent }}
                                  ></div>
                                </div>
                              </div>
                            </div>

                            {/* Template Info */}
                            <div className="text-center">
                              <h3 className="text-lg font-bold mb-2" style={{ color: theme.textPrimary }}>
                                {template.name}
                              </h3>
                              <p className="text-sm mb-3" style={{ color: theme.textSecondary }}>
                                {template.preview}
                              </p>
                              <p className="text-xs" style={{ color: theme.textTertiary }}>
                                {template.description}
                              </p>
                            </div>

                            {/* Selected Indicator */}
                            {selectedTemplate === template.id && (
                              <div className="absolute top-3 right-3">
                                <div
                                  className="w-6 h-6 rounded-full flex items-center justify-center"
                                  style={{ backgroundColor: template.colors.primary }}
                                >
                                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                              </div>
                            )}
                          </m.div>
                        ))}
                      </div>

                      {/* Template Preview Note */}
                      <div className="mt-8 p-4 rounded-xl" style={{ background: theme.bgCard, border: `1px solid ${theme.borderMedium}` }}>
                        <div className="flex items-start gap-3">
                          <div className="flex-shrink-0">
                            <Eye className="w-5 h-5" style={{ color: theme.textAccent }} />
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1" style={{ color: theme.textPrimary }}>Preview Your Template</h4>
                            <p style={{ color: theme.textSecondary }}>
                              Click "Preview Resume" above to see how your selected template will look with your content.
                              The PDF export will use your chosen template design.
                            </p>
                          </div>
                        </div>
                      </div>
                    </m.div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </RouteGuard>
  )
}