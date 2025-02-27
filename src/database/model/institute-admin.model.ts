import mongoose, { Schema, Document } from 'mongoose';
import { IBaseModel } from './common/base.model';

// Institute Admin Model Interface  
export interface InstituteAdminInterface extends IBaseModel {
  email: string;
  password: string;
  instituteId: mongoose.Types.ObjectId;
  role: string;
  permissions: string[];
}

const InstituteAdminSchema: Schema<InstituteAdminInterface> = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  instituteId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Institute',
    required: true,
  },
  role: {
    type: String,
    enum: ['institute_admin', 'institute_sub_admin'],
    default: 'institute_admin',
    required: true,
  },
  permissions: {
    type: [String],
    enum: ['all', 'add_teacher', ],
    default: ['all'],
    required: true,
  },
});


export default mongoose.models.InstituteAdmin || mongoose.model<InstituteAdminInterface>('InstituteAdmin', InstituteAdminSchema);





