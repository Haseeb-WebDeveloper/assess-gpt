import { connectToDatabase } from "../lib/db.js";
import PlatformAdmin from "../database/model/platform-admin.model";
import bcrypt from "bcryptjs";

async function createPlatformAdmin() {
  try {
    await connectToDatabase();

    const adminData = {
      name: "Haseeb Ahmed Raza Khan",
      email: "web.dev.haseeb@gmail.com",
      password: await bcrypt.hash("Haseeb@12", 12),
      role: "admin",
      permissions: ["all-permissions"],
    };

    const existingAdmin = await PlatformAdmin.findOne({ email: adminData.email });
    
    if (existingAdmin) {
      console.log("Admin already exists!");
      return;
    }

    const admin = await PlatformAdmin.create(adminData);
    console.log("Platform Admin created successfully:", admin);
  } catch (error) {
    console.error("Error creating platform admin:", error);
  } finally {
    process.exit();
  }
}

createPlatformAdmin(); 