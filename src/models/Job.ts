import mongoose from 'mongoose';

export interface IJob extends mongoose.Document {
  _id: string;
  title: string;
  company: string;
  location: string;
  type: 'full-time' | 'part-time' | 'contract' | 'internship';
  salary?: {
    min: number;
    max: number;
    currency: string;
  };
  description: string;
  requirements: string[];
  postedDate: Date;
  applicationDeadline?: Date;
  companyLogo?: string;
  tags: string[];
  remote: boolean;
  experience: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const JobSchema = new mongoose.Schema<IJob>({
  title: {
    type: String,
    required: true,
    index: true,
  },
  company: {
    type: String,
    required: true,
    index: true,
  },
  location: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['full-time', 'part-time', 'contract', 'internship'],
    required: true,
  },
  salary: {
    min: { type: Number },
    max: { type: Number },
    currency: { type: String, default: 'USD' },
  },
  description: {
    type: String,
    required: true,
  },
  requirements: [{
    type: String,
  }],
  postedDate: {
    type: Date,
    default: Date.now,
    index: true,
  },
  applicationDeadline: {
    type: Date,
  },
  companyLogo: {
    type: String,
  },
  tags: [{
    type: String,
    index: true,
  }],
  remote: {
    type: Boolean,
    default: false,
  },
  experience: {
    type: String,
    required: true,
  },
  isActive: {
    type: Boolean,
    default: true,
    index: true,
  },
}, {
  timestamps: true,
});

// Compound indexes for efficient queries
JobSchema.index({ title: 'text', company: 'text', tags: 'text', description: 'text' });
JobSchema.index({ type: 1, experience: 1, remote: 1 });
JobSchema.index({ postedDate: -1, isActive: 1 });

export default mongoose.models.Job || mongoose.model<IJob>('Job', JobSchema);