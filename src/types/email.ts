export type EmailTemplate = 
  | "INSTITUTE_REQUEST"
  | "WELCOME_INSTITUTE";

export interface EmailData {
  to: string;
  subject: string;
  template: EmailTemplate;
  data: Record<string, any>;
} 