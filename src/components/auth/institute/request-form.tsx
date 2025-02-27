"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CustomButton } from "@/components/ui/custom-button";
import { Input } from "@/components/ui/input";
import { Loader2, Building2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

export default function InstituteRequestForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);

    const formData = new FormData(e.currentTarget);
    const data = {
      instituteName: formData.get("instituteName"),
      contactName: formData.get("contactName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      location: formData.get("location"),
      requestedSubdomain: formData.get("requestedSubdomain"),
      description: formData.get("description"),
      expectedStudents: formData.get("expectedStudents"),
    };

    try {
      const response = await fetch("/api/institute/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to submit request");
      }

      setSuccess(true);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-2xl p-8 bg-card rounded-xl shadow-lg border border-border"
      >
        <div className="text-center mb-8">
          <Building2 className="w-12 h-12 mx-auto mb-4 text-primary" />
          <h1 className="text-2xl font-bold mb-2">Request Institute Access</h1>
          <p className="text-muted-foreground">
            Fill out this form to request an institute-wide account for your
            organization
          </p>
        </div>

        {success ? (
          <div className="bg-green-500/10 text-green-500 p-6 rounded-lg text-center">
            <h3 className="font-semibold mb-2">
              Request Submitted Successfully!
            </h3>
            <p>
              Thank you for your interest. Our team will review your request and
              contact you via email with further instructions.
            </p>
          </div>
        ) : (
          <>
            {error && (
              <div className="bg-destructive/10 text-destructive p-3 rounded-lg mb-6">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="instituteName"
                    className="block text-sm font-medium mb-2"
                  >
                    Institute Name
                  </label>
                  <Input
                    id="instituteName"
                    name="instituteName"
                    required
                    placeholder="e.g., Harvard University"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contactName"
                    className="block text-sm font-medium mb-2"
                  >
                    Contact Person Name
                  </label>
                  <Input
                    id="contactName"
                    name="contactName"
                    required
                    placeholder="e.g., John Doe"
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-2"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="e.g., contact@institute.edu"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium mb-2"
                  >
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="e.g., +1234567890"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="location"
                  className="block text-sm font-medium mb-2"
                >
                  Location
                </label>
                <Input
                  id="location"
                  name="location"
                  required
                  placeholder="e.g., New York, USA"
                />
              </div>

              <div>
                <label
                  htmlFor="requestedSubdomain"
                  className="block text-sm font-medium mb-2"
                >
                  Requested Subdomain
                </label>
                <div className="flex items-center">
                  <Input
                    id="requestedSubdomain"
                    name="requestedSubdomain"
                    required
                    placeholder="e.g., harvard"
                    className="rounded-r-none"
                  />
                  <span className="px-3 py-2 bg-muted border border-l-0 border-input rounded-r-md">
                    .fluxtile.com
                  </span>
                </div>
              </div>

              <div>
                <label
                  htmlFor="expectedStudents"
                  className="block text-sm font-medium mb-2"
                >
                  Expected Number of Students
                </label>
                <Input
                  id="expectedStudents"
                  name="expectedStudents"
                  type="number"
                  required
                  placeholder="e.g., 1000"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium mb-2"
                >
                  Additional Information
                </label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Tell us more about your institution and how you plan to use Fluxtile..."
                  className="h-32"
                />
              </div>

              <CustomButton
                type="submit"
                variant="gradient"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Submitting Request...
                  </>
                ) : (
                  "Submit Request"
                )}
              </CustomButton>
            </form>
          </>
        )}
      </motion.div>
    </div>
  );
}
