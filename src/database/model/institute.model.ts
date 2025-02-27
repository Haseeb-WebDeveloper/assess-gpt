import mongoose, { Schema } from 'mongoose';
import { IBaseModel } from '../model/common/base.model';

export interface IInstitute extends IBaseModel {
  name: string;
  email: string;
  subdomain: string;
  logo?: string;
  banner?: string;
  address: {
    city?: string;
    state?: string;
    country?: string;
  };
  phone?: string;
  website?: string;
  about?: string;
  teachers: Array<typeof Schema.Types.ObjectId>;
  students: Array<typeof Schema.Types.ObjectId>;
  subjects: Array<typeof Schema.Types.ObjectId>;
  settings: {
    emailNotifications: boolean;
  };
  isVerified: boolean;
  isActive: boolean;
  isDeleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// Institute Schema
const InstituteSchema = new Schema<IInstitute>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      validate: {
        validator: (v: string) => /^[a-zA-Z\s]+$/.test(v),
        message: 'Name must contain only letters and spaces',
      },
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
        message: 'Invalid email address',
      },
    },
    subdomain: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (v: string) => /^[a-z0-9]+$/.test(v),
        message: 'Subdomain must contain only lowercase letters and numbers',
      },
    },
    logo: {
      type: String,
      default: 'https://via.placeholder.com/150',
    },
    banner: {
      type: String,
      default: 'https://via.placeholder.com/150',
    },
    address: {
      city: { type: String, trim: true },
      state: { type: String, trim: true },
      country: { type: String, trim: true },
    },
    phone: {
      type: String,
      trim: true,
    },
    website: {
      type: String,
      trim: true,
      validate: {
        validator: (v: string) => /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(v),
        message: 'Invalid website URL',
      },
    },
    about: {
      type: String,
      trim: true,
      maxlength: [2000, 'About must be less than 2000 characters'],
    },
    teachers: [
      { type: Schema.Types.ObjectId, ref: 'InstituteTeacher', required: true },
    ],
    students: [
      { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    ],
    subjects: [
      { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
    ],
    settings: {
      emailNotifications: { type: Boolean, default: true },
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes to improve performance
InstituteSchema.index({ email: 1, subdomain: 1 });


export const Institute =
  mongoose.models.Institute ||
  mongoose.model<IInstitute>('Institute', InstituteSchema);
