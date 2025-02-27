export type EmailTemplate = 
  | "INSTITUTE_REQUEST"
  | "WELCOME_INSTITUTE"
  | "INSTITUTE_APPROVED"
  | "INSTITUTE_ADMIN_CREDENTIALS";

export interface EmailData {
  to: string;
  subject: string;
  template: EmailTemplate;
  data: Record<string, any>;
} 