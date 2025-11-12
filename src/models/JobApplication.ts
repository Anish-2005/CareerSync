import mongoose from 'mongoose';

export interface IJobApplication extends mongoose.Document {
  userId: string; // Firebase UID
  company: string;
  position: string;
  status: 'applied' | 'interview' | 'offer' | 'rejected' | 'withdrawn';
  applicationDate: Date;
  lastUpdated: Date;
  notes?: string;
  salary?: string;
  location?: string;
  jobUrl?: string;
  contactInfo?: string;
  priority: 'low' | 'medium' | 'high';
  progress: number; // 0-100
  createdAt: Date;
  updatedAt: Date;
}

const JobApplicationSchema = new mongoose.Schema<IJobApplication>({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  company: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['applied', 'interview', 'offer', 'rejected', 'withdrawn'],
    default: 'applied',
  },
  applicationDate: {
    type: Date,
    default: Date.now,
  },
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
  notes: {
    type: String,
    default: '',
  },
  salary: {
    type: String,
    default: '',
  },
  location: {
    type: String,
    default: '',
  },
  jobUrl: {
    type: String,
    default: '',
  },
  contactInfo: {
    type: String,
    default: '',
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium',
  },
  progress: {
    type: Number,
    min: 0,
    max: 100,
    default: 0,
  },
}, {
  timestamps: true,
});

// Index for efficient queries
JobApplicationSchema.index({ userId: 1, status: 1 });
JobApplicationSchema.index({ userId: 1, applicationDate: -1 });

export default mongoose.models.JobApplication || mongoose.model<IJobApplication>('JobApplication', JobApplicationSchema);