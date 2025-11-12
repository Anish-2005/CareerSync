import mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
  firebaseUid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new mongoose.Schema<IUser>({
  firebaseUid: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  displayName: {
    type: String,
    default: '',
  },
  photoURL: {
    type: String,
    default: '',
  },
}, {
  timestamps: true,
});

// Prevent duplicate key errors by dropping the index if it exists
UserSchema.pre('save', async function(next) {
  try {
    if (mongoose.connection.db) {
      await mongoose.connection.db.collection('users').dropIndex('firebaseUid_1');
    }
  } catch (error) {
    // Index doesn't exist, continue
  }
  next();
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);