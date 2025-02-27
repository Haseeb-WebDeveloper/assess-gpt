"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { CustomButton } from "@/components/ui/custom-button";
import { Loader2 } from "lucide-react";
import { InstituteRequest } from "@/app/(dashboard)/gpt-admin/institute-requests/columns";

interface ApproveModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: InstituteRequest;
  onApprove: (data: InstituteApprovalData) => Promise<void>;
}

export interface InstituteApprovalData {
  instituteName: string;
  subdomain: string;
  instituteEmail: string;
  adminName: string;
  adminEmail: string;
  adminPassword: string;
}

export function ApproveModal({
  isOpen,
  onClose,
  request,
  onApprove,
}: ApproveModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data: InstituteApprovalData = {
      instituteName: formData.get("instituteName") as string,
      subdomain: formData.get("subdomain") as string,
      instituteEmail: formData.get("instituteEmail") as string,
      adminName: formData.get("adminName") as string,
      adminEmail: formData.get("adminEmail") as string,
      adminPassword: formData.get("adminPassword") as string,
    };

    try {
      await onApprove(data);
      onClose();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Approve Institute Request</DialogTitle>
        </DialogHeader>

        {error && (
          <div className="bg-destructive/10 text-destructive p-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Institute Name</label>
            <Input
              name="instituteName"
              defaultValue={request.instituteName}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Subdomain</label>
            <div className="flex items-center">
              <Input
                name="subdomain"
                defaultValue={request.requestedSubdomain}
                required
                className="rounded-r-none"
              />
              <span className="px-3 py-2 bg-muted border border-l-0 border-input rounded-r-md">
                .fluxtile.com
              </span>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Institute Email</label>
            <Input
              name="instituteEmail"
              type="email"
              defaultValue={request.email}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Admin Name</label>
            <Input
              name="adminName"
              defaultValue={request.contactName}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Admin Email</label>
            <Input
              name="adminEmail"
              type="email"
              defaultValue={request.email}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Admin Password</label>
            <Input
              name="adminPassword"
              type="text"
              required
              placeholder="Enter secure password"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <CustomButton
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </CustomButton>
            <CustomButton type="submit" variant="gradient" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Approving...
                </>
              ) : (
                "Approve Institute"
              )}
            </CustomButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
