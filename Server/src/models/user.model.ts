import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  auth0Id?: string; // Auth0 user ID (e.g., google-oauth2|117280074765279489118)
  firstName: string;
  lastName?: string;
  email: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  roleRequest?: {
    status: 'pending' | 'approved' | 'rejected' | null;
    reason: string;
    requestedAt?: Date;
    reviewedAt?: Date | null;
    reviewedBy?: string | null;
    rejectionReason?: string;
  } | null;
}

const userSchema = new Schema<IUser>({
  auth0Id: {
    type: String,
    trim: true,
    unique: true,
    sparse: true // Only enforce uniqueness when the field is not null/undefined
  },
  firstName: {
    type: String,
    required: true,
    trim: true,
    default: ''
  },
  lastName: {
    type: String,
    required: false,
    trim: true,
    default: ''
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true,
    default: ''
  },
  address: {
    type: String,
    trim: true,
    default: ''
  },
  city: {
    type: String,
    trim: true,
    default: ''
  },
  state: {
    type: String,
    trim: true,
    default: ''
  },
  zip: {
    type: String,
    trim: true,
    default: ''
  },
  role: {
    type: String,
    enum: ['admin', 'editor', 'user'],
    default: 'user'
  },
  roleRequest: {
    type: {
      status: { type: String, enum: ['pending', 'approved', 'rejected'], default: null },
      reason: { type: String, default: '' },
      requestedAt: { type: Date },
      reviewedAt: { type: [Date, null], required: false, default: null },
      reviewedBy: { type: [String, null], required: false, default: null },
      rejectionReason: { type: String, default: '' }
    },
    default: null
  }
}, {
  timestamps: true
});

const User = model<IUser>('User', userSchema);

export default User; 