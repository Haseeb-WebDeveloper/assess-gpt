import mongoose, { Schema } from 'mongoose';

export interface InstituteTeacherInterface {
  name: string;
  email: string;
  password: string;
  bio?: string;
  profileImage?: string;
  bannerImage?: string;
  institute: typeof Schema.Types.ObjectId;
  isVerified: boolean;
  credits: number;
  subjects: Array<typeof Schema.Types.ObjectId>; 
  availability: 'Available' | 'Busy' | 'On Leave' | 'Offline';
  notifications: Array<{
    type: string;
    message: string;
    read: boolean;
    createdAt: Date;
  }>;
  settings: {
    emailNotifications: boolean;
    autoGrading: boolean;
  };
  contact: {
    country?: string;
    phone?: string;
    address?: string;
  };
  isDeleted: boolean;
  isActive: boolean;
}

// Teacher Schema
const TeacherSchema = new Schema<InstituteTeacherInterface>({
  name: {
    type: String,
    required: true,
    validate: {
      validator: function (v: string) {
        return /^[a-zA-Z\s]+$/.test(v);
      },
      message: 'Name must contain only letters and spaces',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v: string) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: 'Invalid email address',
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (v: string) {
        return v.length >= 6;
      },
      message: 'Password must be at least 6 characters long',
    },
  },
  bio: {
    type: String,
    validate: {
      validator: function (v: string) {
        return v.length <= 1000;
      },
      message: 'Bio must be less than 1000 characters',
    },
  },
  profileImage: {
    type: String,
    default: 'https://via.placeholder.com/150',
  },
  bannerImage: {
    type: String,
    default: 'https://via.placeholder.com/150',
  },
  institute: {
    type: Schema.Types.ObjectId,
    ref: 'Institute',
    required: true,
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  credits: {
    type: Number,
    default: 100,
  },
  subjects: {
    type: [Schema.Types.ObjectId],
    ref: 'Subject',
    required: true,
  },
  availability: {
    type: String,
    required: true,
    enum: ['Available', 'Busy', 'On Leave', 'Offline'],
    default: 'Available',
  },
  notifications: {
    type: [
      {
        type: { type: String, required: true },
        message: { type: String, required: true },
        read: { type: Boolean, required: true },
        createdAt: { type: Date, required: true },
      },
    ],
    default: [],
  },
  settings: {
    type: {
      emailNotifications: { type: Boolean, required: true },
      autoGrading: { type: Boolean, required: true },
    },
    default: {
      emailNotifications: true,
      autoGrading: true,
    },
  },
  contact: {
    type: {
      country: { type: String },
      phone: { type: String },
      address: { type: String },
    },
    default: {},
  },
  isDeleted: { type: Boolean, required: true, default: false },
  isActive: { type: Boolean, required: true, default: true },
});

// Indexes (Ensure these indexes match actual schema fields)
TeacherSchema.index({ email: 1, isVerified: 1 });

export const InstituteTeacher = mongoose.models.InstituteTeacher || mongoose.model<InstituteTeacherInterface>('InstituteTeacher', TeacherSchema);
