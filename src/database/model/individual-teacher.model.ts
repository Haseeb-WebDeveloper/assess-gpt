import mongoose, { Schema, models, model } from 'mongoose';

export interface IndividualTeacherInterface {
  name: string;
  email: string;
  password: string;
  bio?: string;
  profileImage?: string;
  bannerImage?: string;
  organization: string;
  isVerified: boolean;
  creditsUsed: number;
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
const TeacherSchema = new Schema<IndividualTeacherInterface>({
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
  organization: {
    type: String,
    required: true,
    validate: {
      validator: function (v: string) {
        return /^[a-zA-Z\s]+$/.test(v);
      },
      message: 'Organization must contain only letters and spaces',
    },
  },
  isVerified: {
    type: Boolean,
    required: true,
    default: false,
  },
  creditsUsed: {
    type: Number,
    required: true,
    default: 0,
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
}, { 
  timestamps: true,
  toJSON: {
    transform: function(doc, ret) {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
      delete ret.password;
      return ret;
    }
  }
});

// Ensure indexes are created
// TeacherSchema.index({ email: 1 }, { unique: true });
TeacherSchema.index({ isVerified: 1, isDeleted: 1 });

// Export the model
export const IndividualTeacher = 
  models.IndividualTeacher || 
  model<IndividualTeacherInterface>('IndividualTeacher', TeacherSchema);
