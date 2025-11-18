import mongoose, { Schema, Document } from 'mongoose'

export interface IResume extends Document {
  userId: string
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
  selectedTemplate: string
  updatedAt: Date
  createdAt: Date
}

const ResumeSchema: Schema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  personalInfo: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    location: { type: String, required: true },
    linkedin: { type: String },
    github: { type: String },
    portfolio: { type: String },
    summary: { type: String, required: true }
  },
  experience: [{
    id: { type: String, required: true },
    company: { type: String, required: true },
    position: { type: String, required: true },
    location: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String },
    current: { type: Boolean, default: false },
    description: { type: String, required: true }
  }],
  education: [{
    id: { type: String, required: true },
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    field: { type: String, required: true },
    startDate: { type: String, required: true },
    endDate: { type: String },
    current: { type: Boolean, default: false },
    gpa: { type: String }
  }],
  skills: [{
    id: { type: String, required: true },
    name: { type: String, required: true },
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'expert'],
      required: true
    }
  }],
  projects: [{
    id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    technologies: [{ type: String }],
    url: { type: String }
  }],
  selectedTemplate: {
    type: String,
    default: 'modern'
  }
}, {
  timestamps: true
})

// Prevent duplicate userId
ResumeSchema.index({ userId: 1 }, { unique: true })

export default mongoose.models.Resume || mongoose.model<IResume>('Resume', ResumeSchema)