'use client'

import { motion } from 'framer-motion'
import { Plus, Trash2 } from 'lucide-react'
// import the ResumeData type
import type { ResumeData } from './page'

const m = motion as any

interface EditModeProps {
  resumeData: ResumeData
  activeSection: string
  updatePersonalInfo: (field: string, value: string) => void
  addExperience: () => void
  updateExperience: (id: string, field: string, value: string | boolean) => void
  removeExperience: (id: string) => void
  addEducation: () => void
  updateEducation: (id: string, field: string, value: string | boolean) => void
  removeEducation: (id: string) => void
  addSkill: () => void
  updateSkill: (id: string, field: string, value: string) => void
  removeSkill: (id: string) => void
  addProject: () => void
  updateProject: (id: string, field: string, value: string | string[]) => void
  removeProject: (id: string) => void
  templates: Array<{
    id: string
    name: string
    preview: string
    description: string
    colors: { primary: string; secondary: string; accent: string }
  }>
  selectedTemplate: string
  setSelectedTemplate: (template: string) => void
  theme: any
}

export default function EditMode({
  resumeData,
  activeSection,
  updatePersonalInfo,
  addExperience,
  updateExperience,
  removeExperience,
  addEducation,
  updateEducation,
  removeEducation,
  addSkill,
  updateSkill,
  removeSkill,
  addProject,
  updateProject,
  removeProject,
  templates,
  selectedTemplate,
  setSelectedTemplate,
  theme
}: EditModeProps) {
  return (
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
                className="p-4 rounded-xl"
                style={{ background: theme.bgCard, border: `1px solid ${theme.borderMedium}` }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-bold" style={{ color: theme.textPrimary }}>Skill {idx + 1}</span>
                  <button
                    onClick={() => removeSkill(skill.id)}
                    className="p-1 rounded"
                    style={{ background: "rgba(255,68,68,0.12)", border: `1px solid rgba(255,68,68,0.28)`, color: "#ff4444" }}
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Skill name"
                  value={skill.name}
                  onChange={(e) => updateSkill(skill.id, 'name', e.target.value)}
                  className="w-full px-3 py-2 mb-3 rounded-lg focus:outline-none focus:ring-2 transition-all"
                  style={{
                    background: theme.bgInputStyle?.backgroundColor || theme.bgCard,
                    border: `1px solid ${theme.borderMedium}`,
                    color: theme.textPrimary,
                    '--tw-ring-color': theme.theme === 'light' ? 'rgba(59, 130, 246, 0.5)' : 'rgba(0, 212, 255, 0.5)'
                  } as any}
                />
                <select
                  value={skill.level}
                  onChange={(e) => updateSkill(skill.id, 'level', e.target.value)}
                  className="w-full px-3 py-2 rounded-lg focus:outline-none focus:ring-2 transition-all"
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
                  placeholder="Project Name"
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
                  type="url"
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
                    placeholder="Project description..."
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
                    placeholder="React, Node.js, MongoDB..."
                    value={project.technologies.join(', ')}
                    onChange={(e) => updateProject(project.id, 'technologies', e.target.value.split(',').map(t => t.trim()))}
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
            <h2 className="text-2xl font-bold mb-2" style={{ color: theme.textPrimary }}>Resume Templates</h2>
            <p className="text-sm" style={{ color: theme.textSecondary }}>Choose a template that best represents your professional style</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <div
                key={template.id}
                onClick={() => setSelectedTemplate(template.id)}
                className={`p-6 rounded-3xl cursor-pointer transition-all hover:scale-105 ${
                  selectedTemplate === template.id ? 'ring-2 ring-offset-2' : ''
                }`}
                style={{
                  background: theme.bgCard,
                  border: `1px solid ${theme.borderMedium}`,
                  '--tw-ring-color': theme.theme === 'light' ? '#3b82f6' : '#00d4ff',
                  '--tw-ring-offset-color': theme.bgPrimary
                } as any}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold" style={{ color: theme.textPrimary }}>{template.name}</h3>
                  {selectedTemplate === template.id && (
                    <div className="w-3 h-3 rounded-full" style={{ background: theme.theme === 'light' ? '#3b82f6' : '#00d4ff' }}></div>
                  )}
                </div>
                <p className="text-sm mb-4" style={{ color: theme.textSecondary }}>{template.preview}</p>
                <p className="text-xs" style={{ color: theme.textTertiary }}>{template.description}</p>
              </div>
            ))}
          </div>

          {/* Template Preview Note */}
          <div className="mt-8 p-4 rounded-xl" style={{ background: theme.bgCard, border: `1px solid ${theme.borderMedium}` }}>
            <h3 className="font-bold mb-2" style={{ color: theme.textPrimary }}>Template Preview</h3>
            <p className="text-sm" style={{ color: theme.textSecondary }}>
              Switch to Preview mode to see how your resume will look with the selected template. You can export your resume as a PDF once you're satisfied with the content and design.
            </p>
          </div>
        </m.div>
      )}
    </div>
  )
}