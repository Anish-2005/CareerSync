import mongoose from 'mongoose';

export interface IJobApplication extends mongoose.Document {
  userId: string; // Firebase UID
  jobId?: string; // Reference to Job._id (optional for manual applications)
  jobTitle: string;
  company: string;
  location: string;
  appliedDate: Date;
  status: 'pending' | 'reviewing' | 'interview' | 'offer' | 'rejected' | 'withdrawn';
  notes?: string;
  followUpDate?: Date;
  applicationUrl?: string;
  salary?: {
    offered?: number;
    expected?: number;
    currency: string;
  };
  lastUpdated: Date;
  createdAt: Date;
  updatedAt: Date;
}

const JobApplicationSchema = new mongoose.Schema<IJobApplication>({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  jobId: {
    type: String,
    index: true,
  },
  jobTitle: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  appliedDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['pending', 'reviewing', 'interview', 'offer', 'rejected', 'withdrawn'],
    default: 'pending',
  },
  notes: {
    type: String,
    default: '',
  },
  followUpDate: {
    type: Date,
  },
  applicationUrl: {
    type: String,
    default: '',
  },
  salary: new mongoose.Schema({
    offered: { type: Number },
    expected: { type: Number },
    currency: { type: String, default: 'USD' },
  }, { _id: false }),
  lastUpdated: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Index for efficient queries
JobApplicationSchema.index({ userId: 1, status: 1 });
JobApplicationSchema.index({ userId: 1, appliedDate: -1 });
JobApplicationSchema.index({ userId: 1, lastUpdated: -1 });

// Delete existing model to allow recompilation
if (mongoose.models.JobApplication) {
  delete mongoose.models.JobApplication;
}

export default mongoose.model<IJobApplication>('JobApplication', JobApplicationSchema);