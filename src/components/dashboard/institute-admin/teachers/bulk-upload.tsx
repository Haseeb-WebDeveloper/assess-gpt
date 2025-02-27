"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, FileSpreadsheet, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { parseCSV, validateCSVHeaders, generatePassword } from "@/lib/utils/csv-parser";

interface TeacherData {
  name: string;
  email: string;
  password: string;
}

export function BulkTeacherUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [teachers, setTeachers] = useState<TeacherData[]>([]);
  const router = useRouter();

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setIsUploading(true);
      const file = e.target.files?.[0];
      if (!file) return;

      const data = await parseCSV(file);
      validateCSVHeaders(Object.keys(data[0]), ['name', 'email']);

      const teachersWithPasswords = data.map(teacher => ({
        name: teacher.name,
        email: teacher.email,
        password: generatePassword(),
      }));

      setTeachers(teachersWithPasswords);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCreateAccounts = async () => {
    try {
      setIsProcessing(true);
      const response = await fetch('/api/institute/teachers/bulk-create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teachers }),
      });

      if (!response.ok) {
        throw new Error('Failed to create teacher accounts');
      }

      toast.success('Teacher accounts created successfully');
      router.refresh();
      setTeachers([]);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Bulk Upload Teachers</h2>
          <p className="text-sm text-muted-foreground">
            Upload a CSV file with teacher details to create multiple accounts.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            onClick={() => {
              const a = document.createElement('a');
              a.href = '/templates/teachers-template.csv';
              a.download = 'teachers-template.csv';
              a.click();
            }}
          >
            Download Template
          </Button>

          <div className="relative">
            <input
              type="file"
              accept=".csv"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={handleFileUpload}
              disabled={isUploading || isProcessing}
            />
            <Button variant="outline">
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  Upload CSV
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {teachers.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="rounded-lg border bg-card"
          >
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5 text-primary" />
                  <span className="font-medium">
                    {teachers.length} Teachers Found
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTeachers([])}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="max-h-[400px] overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Generated Password</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {teachers.map((teacher, index) => (
                    <TableRow key={index}>
                      <TableCell>{teacher.name}</TableCell>
                      <TableCell>{teacher.email}</TableCell>
                      <TableCell>
                        <code className="px-2 py-1 rounded bg-muted">
                          {teacher.password}
                        </code>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="p-4 border-t">
              <Button
                className="w-full"
                onClick={handleCreateAccounts}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Creating Accounts...
                  </>
                ) : (
                  'Create Teacher Accounts'
                )}
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 