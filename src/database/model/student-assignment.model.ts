import mongoose, { Schema } from 'mongoose';
import { IBaseModel } from '../model/common/base.model';

export enum AssignmentStatus {
  Pending = 'Pending',
  Submitted = 'Submitted',
  Late = 'Late',
  InReview = 'In Review',
  Graded = 'Graded',
  Failed = 'Failed',
}

export enum Grader {
  AI = 'AI',
  Teacher = 'Teacher',
}

export interface IStudentAssignment extends IBaseModel {
  title: string;
  fileUrls: string[];
  subject: typeof Schema.Types.ObjectId;
  status: AssignmentStatus;
  individualTeacherId: typeof Schema.Types.ObjectId;
  instituteTeacherId: typeof Schema.Types.ObjectId;
  grade: {
    type: {
      marks: number;
      feedback: string;
      gradedBy: Grader;
    },
    default: null
  };
  submissionHistory: Array<{
    submittedAt: Date;
    fileUrls: string[];
    status: string; 
  }>;
  student: typeof Schema.Types.ObjectId;
  teacherAssignment: typeof Schema.Types.ObjectId;
  submittedAt: Date;
}

const StudentAssignmentSchema = new Schema<IStudentAssignment>({
  title: { type: String, required: true },
  fileUrls: [{ type: String, required: true }],
  status: {
    type: String,
    enum: Object.values(AssignmentStatus),
    default: AssignmentStatus.Pending,
  },
  individualTeacherId: { type: Schema.Types.ObjectId, ref: 'IndividualTeacher', required: true },
  instituteTeacherId: { type: Schema.Types.ObjectId, ref: 'InstituteTeacher', required: true },
  grade: {
    type: {
      marks: { type: Number,  default: 0 },
      feedback: { type: String, default: '' },
      gradedBy: { type: String, enum: Object.values(Grader), default: Grader.AI },
    },
  },
  submissionHistory: [{
    submittedAt: { type: Date, required: true },
    fileUrls: [{ type: String, required: true }],
    status: { type: String, required: true }
  }],
  student: {
    type: Schema.Types.ObjectId,
    ref: 'Student',
    required: true,
  },
  teacherAssignment: {
    type: Schema.Types.ObjectId,
    ref: 'TeacherAssignment',
    required: true,
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

// Indexes for better query performance
StudentAssignmentSchema.index({ individualTeacherId: 1, status: 1 });
StudentAssignmentSchema.index({ instituteTeacherId: 1, status: 1 });

export const StudentAssignment = mongoose.models.StudentAssignment || mongoose.model<IStudentAssignment>('StudentAssignment', StudentAssignmentSchema);
