import mongoose, { Schema } from 'mongoose';


// Institute Request Model  interface
interface InstituteRequestInterface {
  instituteName: string;
  requestedSubdomain: string;
  contactName: string;
  contactEmail: string;
  location: string;
  phone: string;
  additionalInfo: string;
  expectedStudents: number;
  status: string;
  approvedInstituteId?: mongoose.Types.ObjectId;
}



const InstituteRequestSchema = new Schema({
  instituteName: {
    type: String,
    required: [true, 'Institute name is required'],
  },
  requestedSubdomain: {
    type: String,
    required: [true, 'Requested subdomain is required'],
    lowercase: true,
    trim: true,
  },
  contactName: {
    type: String,
    required: [true, 'Contact name is required'],
  },
  contactEmail: {
    type: String,
    required: [true, 'Contact email is required'],
  },
  location: String,
  phone: String,
  additionalInfo: String,
  expectedStudents: Number,
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  approvedInstituteId: {
    type: Schema.Types.ObjectId,
    ref: 'Institute',
  },
}, {
  timestamps: true,
});

export const InstituteRequest = mongoose.models.InstituteRequest || 
  mongoose.model('InstituteRequest', InstituteRequestSchema);

