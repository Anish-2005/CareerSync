import mongoose from 'mongoose';

export interface IProfile extends mongoose.Document {
  userId: string; // Firebase UID
  personalInfo: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    location: string;
    linkedinUrl: string;
    githubUrl: string;
    portfolioUrl: string;
    summary: string;
  };
  experience: Array<{
    id: string;
    company: string;
    position: string;
    startDate: Date;
    endDate?: Date;
    current: boolean;
    description: string;
    location: string;
  }>;
  education: Array<{
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: Date;
    endDate?: Date;
    current: boolean;
    gpa?: string;
    description: string;
  }>;
  skills: Array<{
    id: string;
    name: string;
    level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
    category: string;
  }>;
  certifications: Array<{
    id: string;
    name: string;
    issuer: string;
    issueDate: Date;
    expiryDate?: Date;
    credentialId: string;
    credentialUrl: string;
  }>;
  projects: Array<{
    id: string;
    name: string;
    description: string;
    technologies: string[];
    startDate: Date;
    endDate?: Date;
    current: boolean;
    projectUrl: string;
    githubUrl: string;
  }>;
  documents: Array<{
    id: string;
    filename: string;
    originalName: string;
    mimeType: string;
    size: number;
    uploadedAt: Date;
    gridFsId: string; // Reference to GridFS file
  }>;
}

const ProfileSchema = new mongoose.Schema<IProfile>({
  userId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  personalInfo: {
    firstName: { type: String, default: '' },
    lastName: { type: String, default: '' },
    email: { type: String, default: '' },
    phone: { type: String, default: '' },
    location: { type: String, default: '' },
    linkedinUrl: { type: String, default: '' },
    githubUrl: { type: String, default: '' }, // Remove required since it has default
    portfolioUrl: { type: String, default: '' },
    summary: { type: String, default: '' },
  },
  experience: [{
    id: { type: String, required: true },
    company: { type: String, required: true },
    position: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: Date,
    current: { type: Boolean, default: false },
    description: { type: String, default: '' },
    location: { type: String, default: '' },
  }],
  education: [{
    id: { type: String, required: true },
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    field: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: Date,
    current: { type: Boolean, default: false },
    gpa: String,
    description: { type: String, default: '' },
  }],
  skills: [{
    id: { type: String, required: true },
    name: { type: String, required: true },
    level: {
      type: String,
      enum: ['beginner', 'intermediate', 'advanced', 'expert'],
      default: 'beginner'
    },
    category: { type: String, default: 'Other' },
  }],
  certifications: [{
    id: { type: String, required: true },
    name: { type: String, required: true },
    issuer: { type: String, required: true },
    issueDate: { type: Date, required: true },
    expiryDate: Date,
    credentialId: { type: String, default: '' },
    credentialUrl: { type: String, default: '' },
  }],
  projects: [{
    id: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String, default: '' },
    technologies: [{ type: String }],
    startDate: { type: Date, required: true },
    endDate: Date,
    current: { type: Boolean, default: false },
    projectUrl: { type: String, default: '' },
    githubUrl: { type: String, default: '' },
  }],
  documents: [{
    id: { type: String, required: true },
    filename: { type: String, required: true },
    originalName: { type: String, required: true },
    mimeType: { type: String, required: true },
    size: { type: Number, required: true },
    uploadedAt: { type: Date, default: Date.now },
    gridFsId: { type: String, required: true },
  }],
  preferences: {
    jobTypes: [{ type: String }],
    locations: [{ type: String }],
    salaryRange: {
      min: { type: Number, default: 0 },
      max: { type: Number, default: 0 },
      currency: { type: String, default: 'USD' },
    },
    remoteWork: { type: Boolean, default: false },
    relocation: { type: Boolean, default: false },
  },
}, {
  timestamps: true,
});

export default mongoose.models.Profile || mongoose.model<IProfile>('Profile', ProfileSchema);