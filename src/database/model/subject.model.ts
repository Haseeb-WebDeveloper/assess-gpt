import mongoose, { Schema } from 'mongoose';
import { IBaseModel, baseModelFields, baseModelOptions } from './common/base.model';

// Subject Interface
export interface SubjectInterface extends IBaseModel {
  name: string;
  teacher: mongoose.Types.ObjectId;
  students: Array<typeof Schema.Types.ObjectId>;
  teacherAssignments: Array<typeof Schema.Types.ObjectId>;
  studentAssignments: Array<typeof Schema.Types.ObjectId>;
  institute: mongoose.Types.ObjectId;
  code: string;
  description?: string;
}

// Subject Schema
const SubjectSchema = new Schema<SubjectInterface>({
    name:{
        type: String,
        required: true
    },
    teacher: {
        type: Schema.Types.ObjectId,
        ref: 'Teacher',
        required: true
    },
    students: {
        type: [Schema.Types.ObjectId],
        ref: 'Student',
    },
    teacherAssignments: {
        type: [Schema.Types.ObjectId],
        ref: 'Assignment',
    },
    studentAssignments: {
        type: [Schema.Types.ObjectId],
        ref: 'Assignment',
    },
    institute: {
        type: Schema.Types.ObjectId,
        ref: 'Institute',
        required: true
    },
    code: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        maxlength: 1000,
    },
    ...baseModelFields
},{ timestamps: true})

SubjectSchema.index({ name: 1, teacher: 1, institute: 1, isDeleted: 1, isActive: 1 });

export const Subject = mongoose.models.Subject || mongoose.model<SubjectInterface>('Subject', SubjectSchema);
