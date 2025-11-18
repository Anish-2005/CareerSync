import mongoose from 'mongoose';

export interface ISavedJob extends mongoose.Document {
  userId: string; // Firebase UID
  jobId: string; // Reference to Job._id
  savedAt: Date;
  notes?: string;
}

const SavedJobSchema = new mongoose.Schema<ISavedJob>({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  jobId: {
    type: String,
    required: true,
    index: true,
  },
  savedAt: {
    type: Date,
    default: Date.now,
  },
  notes: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

// Compound index to ensure a user can't save the same job twice
SavedJobSchema.index({ userId: 1, jobId: 1 }, { unique: true });

export default mongoose.models.SavedJob || mongoose.model<ISavedJob>('SavedJob', SavedJobSchema);