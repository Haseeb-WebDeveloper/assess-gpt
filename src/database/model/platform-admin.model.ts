import mongoose from "mongoose";

interface PlatformAdminInterface {
  name: string;
  email: string;
  password: string;
  role: string;
  permissions: string[];
}

const platformAdminSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    enum: ["admin"],
  },
  permissions: {
    type: [String],
    enum: [ "all-permissions", "institute-request", "institute-management", "user-management", "content-management", "analytics"],
  },
}, { timestamps: true });

const PlatformAdmin = mongoose.models.PlatformAdmin || mongoose.model("PlatformAdmin", platformAdminSchema);

export default PlatformAdmin;