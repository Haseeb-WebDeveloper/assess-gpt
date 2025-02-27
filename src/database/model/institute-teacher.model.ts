import mongoose, { Schema } from 'mongoose';
import { IBaseModel } from "./common/base.model";

export interface InstituteTeacherInterface extends IBaseModel {
  name: string;
  email: string;
  password: string;
  instituteId: mongoose.Types.ObjectId;
  role: string;
  subjects?: mongoose.Types.ObjectId[];
  isActive: boolean;
  lastLogin?: Date;
  profileImage?: string;
  bio?: string;
  department?: string;
  contact?: {
    phone?: string;
    address?: string;
  };
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
    select: false,
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
  instituteId: {
    type: Schema.Types.ObjectId,
    ref: 'Institute',
    required: true,
  },
  role: {
    type: String,
    enum: ["teacher", "head_teacher"],
    default: "teacher",
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
  },
  availability: {
    type: String,
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
  lastLogin: Date,
  department: String,
}, {
  timestamps: true,
});

// Indexes (Ensure these indexes match actual schema fields)
TeacherSchema.index({ email: 1, isVerified: 1 });
TeacherSchema.index({ instituteId: 1 });

export const InstituteTeacher = mongoose.models.InstituteTeacher || mongoose.model<InstituteTeacherInterface>('InstituteTeacher', TeacherSchema);
