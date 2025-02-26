import { Schema } from 'mongoose';

export interface IBaseModel {
  isDeleted: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export const baseModelFields = {
  isDeleted: { 
    type: Boolean, 
    required: true, 
    default: false,
    index: true 
  },
  isActive: { 
    type: Boolean, 
    required: true, 
    default: true,
    index: true 
  }
};

export const baseModelOptions = {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function(doc: any, ret: any) {
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
}; 