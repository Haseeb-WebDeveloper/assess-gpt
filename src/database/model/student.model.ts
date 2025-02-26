import mongoose, { Schema } from 'mongoose';

export interface StudentInterface {
    name: string;
    email: string;
    rollNumber: string;
    password: string;
    profileImage: string;
    bannerImage: string;
    isVerified: boolean;
    subjects: Array<typeof Schema.Types.ObjectId>;
    organization: string;
    institute: Schema.Types.ObjectId;
    submitedAssignments: Array<typeof Schema.Types.ObjectId>;
    notifications: Array<{
        type: string;
        message: string;
        read: boolean;
        createdAt: Date;
    }>;
    settings: {
        emailNotifications: boolean;
    };
    isDeleted: boolean;
    isActive: boolean;
}


// Student Schema
const StudentSchema = new Schema<StudentInterface>({
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
      rollNumber: {
        type: String,
        required: true,
      },
      profileImage: {
        type: String,
        required: true,
      },
      bannerImage: {    
        type: String,
        required: true,
      },
      isVerified: {
        type: Boolean,
        default: false,
      },
      subjects: {
        type: [Schema.Types.ObjectId],
        ref: 'Subject',
        required: true,
      },
      organization: {
        type: String,
      },
      institute: {
        type: Schema.Types.ObjectId,
        ref: 'Institute',
      },
      submitedAssignments: {
        type: [Schema.Types.ObjectId],
        ref: 'StudentAssignment',
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
      },
      settings: {
        type: {
            emailNotifications: { type: Boolean, required: true },
        },
      },
      isDeleted: {
        type: Boolean,
        default: false,
      },
      isActive: {
        type: Boolean,
        default: true,
      },
},{ timestamps: true })

StudentSchema.index({ email: 1, isVerified: 1 });

export const Student = mongoose.models.Student || mongoose.model<StudentInterface>('Student', StudentSchema);



