import mongoose, { Schema } from 'mongoose';
import { IBaseModel } from './common/base.model';
import { baseModelFields, baseModelOptions } from './common/base.model';


export interface ITeacherAssignment extends IBaseModel {
  title: string;
  subject: mongoose.Schema.Types.ObjectId;
  questions: {
    question: string;
    answer: string;
    marks: number;
  }[];
  dueDate: Date;
  status: 'Draft' | 'Published' | 'Completed' | 'Cancelled';
  totalMarks: number;
  submissionCount: number;
  submitedBy: {
    studentId: mongoose.Schema.Types.ObjectId;
    submittedAt: Date;
  }[];
  allowLateSubmissions: boolean;
  allowSendToStudents: boolean;
  gradingWith: {
    aiGrading: boolean;
  };
  description?: string;
  instructions?: string;
  attachments?: string[]; // For assignment files/resources
}

const TeacherAssignmentSchema = new Schema({
  title: { type: String, required: true },
  subject: { type: Schema.Types.ObjectId, ref: 'Subject', required: true },
  questions: [{
    question: { type: String, required: true },
    answer: { type: String, required: true },
    marks: { type: Number, required: true }
  }],
  dueDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ['Draft', 'Published', 'Completed', 'Cancelled'],
    default: 'Published'
  },
  submissionCount: { type: Number, default: 0 },
  submitedBy: [{
    studentId: { type: Schema.Types.ObjectId, ref: 'Student' },
    submittedAt: { type: Date, default: Date.now }
  }],
  totalMarks: { type: Number, required: true },
  allowLateSubmissions: { type: Boolean, default: false },
  allowSendToStudents: { type: Boolean, default: true },
  gradingWith: {
    aiGrading: { type: Boolean, default: true },
  },
  description: { 
    type: String,
    maxlength: 2000 
  },
  instructions: { 
    type: String,
    maxlength: 1000 
  },
  attachments: [{ 
    type: String 
  }],
  ...baseModelFields
}, baseModelOptions);


// Indexes for better query performance
TeacherAssignmentSchema.index({ subject: 1 });

// Create the model
export const TeacherAssignment = mongoose.models.TeacherAssignment || 
  mongoose.model<ITeacherAssignment>('TeacherAssignment', TeacherAssignmentSchema); 