"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { CustomButton } from "@/components/ui/custom-button";
import { Loader2 } from "lucide-react";
import { InstituteRequest } from "@/app/(dashboard)/gpt-admin/institute-requests/columns";

interface RejectModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: InstituteRequest;
  onReject: (reason: string) => Promise<void>;
}

export function RejectModal({ isOpen, onClose, request, onReject }: RejectModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const reason = formData.get("reason") as string;

    try {
      await onReject(reason);
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
          <DialogTitle>Reject Institute Request</DialogTitle>
        </DialogHeader>

        {error && (
          <div className="bg-destructive/10 text-destructive p-3 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Rejection Reason <span className="text-destructive">*</span>
            </label>
            <Textarea
              name="reason"
              required
              placeholder="Please provide a reason for rejection..."
              className="h-32"
            />
            <p className="text-xs text-muted-foreground">
              This message will be sent to the institute.
            </p>
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
            <CustomButton
              type="submit"
              variant="destructive"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="animate-spin" />
                  Rejecting...
                </>
              ) : (
                "Reject Request"
              )}
            </CustomButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 