export type EmailTemplate = 
  | "INSTITUTE_REQUEST"
  | "WELCOME_INSTITUTE"
  | "INSTITUTE_APPROVED"
  | "INSTITUTE_REJECTED"
  | "INSTITUTE_ADMIN_CREDENTIALS"
  | "INSTITUTE_TEACHER_WELCOME";

export interface EmailData {
  to: string;
  subject: string;
  template: EmailTemplate;
  data: Record<string, any>;
} 