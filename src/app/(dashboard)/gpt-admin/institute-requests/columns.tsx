"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, Check, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type InstituteRequest = {
  id: string;
  instituteName: string;
  requestedSubdomain: string;
  contactName: string;
  email: string;
  phone: string;
  status: "pending" | "approved" | "rejected";
  createdAt: string;
};

export const columns: ColumnDef<InstituteRequest>[] = [
  {
    accessorKey: "instituteName",
    header: "Institute Name",
  },
  {
    accessorKey: "requestedSubdomain",
    header: "Subdomain",
    cell: ({ row }) => {
      return (
        <span className="font-mono text-sm">
          {row.getValue("requestedSubdomain")}.assessgpt.com
        </span>
      );
    },
  },
  {
    accessorKey: "contactName",
    header: "Contact Person",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status = row.getValue("status") as string;
      return (
        <Badge
          variant={
            status === "approved"
              ? "success"
              : status === "rejected"
              ? "destructive"
              : "secondary"
          }
        >
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </Badge>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: "Requested On",
    cell: ({ row }) => {
      return new Date(row.getValue("createdAt")).toLocaleDateString();
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const request = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                // Handle approve
              }}
            >
              <Check className="mr-2 h-4 w-4" /> Approve
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                // Handle reject
              }}
            >
              <X className="mr-2 h-4 w-4" /> Reject
            </DropdownMenuItem>
            <DropdownMenuItem>View Details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
]; 