"use client";

import { motion } from "framer-motion";
import { School, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { CustomButton } from "@/components/ui/custom-button";

const RoleSelection = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-2xl p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-3xl font-bold mb-4">Choose Your Role</h1>
          <p className="text-muted-foreground">
            Select how you would like to use Fluxtile
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          <motion.div whileHover={{ scale: 1.02 }} className="relative group">
            <CustomButton
              variant="outline"
              className="w-full h-auto p-6 flex flex-col items-center gap-4 border-2"
              onClick={() => router.push("/auth/teacher/signup")}
            >
              <User size={32} className="text-primary" />
              <div>
                <h3 className="font-semibold mb-2">Individual Teacher</h3>
                <p className="text-sm text-muted-foreground">
                  Create your personal account and start grading assignments
                </p>
              </div>
            </CustomButton>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02 }} className="relative group">
            <CustomButton
              variant="outline"
              className="w-full h-auto p-6 flex flex-col items-center gap-4 border-2"
              onClick={() => router.push("/auth/institute/request")}
            >
              <School size={32} className="text-primary" />
              <div>
                <h3 className="font-semibold mb-2">Institute</h3>
                <p className="text-sm text-muted-foreground">
                  Request an institute-wide account for your organization
                </p>
              </div>
            </CustomButton>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default RoleSelection;
