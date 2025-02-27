import nodemailer from "nodemailer";
import { EmailTemplate as EmailTemplateType, EmailData } from "@/types/email";

// Email templates
const templates: Record<EmailTemplate, (data: any) => string> = {
  INSTITUTE_REQUEST: (data: any) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">New Institute Access Request</h2>
      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <h3 style="margin-top: 0;">Institute Details</h3>
        <p><strong>Institute Name:</strong> ${data.instituteName}</p>
        <p><strong>Contact Person:</strong> ${data.contactName}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Location:</strong> ${data.location}</p>
        <p><strong>Requested Subdomain:</strong> ${data.requestedSubdomain}.assessgpt.com</p>
        <p><strong>Expected Students:</strong> ${data.expectedStudents}</p>
        
        <h3>Additional Information</h3>
        <p>${data.description || "No additional information provided."}</p>
      </div>
      <div style="color: #64748b; font-size: 14px; margin-top: 20px;">
        <p>This is an automated message from AssessGPT.</p>
      </div>
    </div>
  `,
  
  WELCOME_INSTITUTE: (data: any) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">Thank You for Your Interest!</h2>
      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p>Dear ${data.contactName},</p>
        <p>We have received your request for ${data.instituteName}. Our team will review your application and get back to you shortly.</p>
        <p>Here's what happens next:</p>
        <ol>
          <li>Our team will review your request</li>
          <li>We'll set up your institute's subdomain</li>
          <li>You'll receive an email with access details</li>
        </ol>
        <p>If you have any questions in the meantime, feel free to reach out to our support team.</p>
      </div>
      <div style="color: #64748b; font-size: 14px; margin-top: 20px;">
        <p>Best regards,<br>The AssessGPT Team</p>
      </div>
    </div>
  `,

  INSTITUTE_APPROVED: (data: any) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">Welcome to Fluxtile!</h2>
      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p>Your institute account has been approved and is ready to use.</p>
        
        <h3>Institute Details</h3>
        <p><strong>Institute Name:</strong> ${data.instituteName}</p>
        <p><strong>Your Domain:</strong> <a href="https://${data.subdomain}">${data.subdomain}</a></p>
        
        <h3>Admin Account Details</h3>
        <p><strong>Email:</strong> ${data.adminEmail}</p>
        <p><strong>Password:</strong> ${data.adminPassword}</p>
        <p><strong>Login URL:</strong> <a href="https://${data.subdomain}/auth/institute-admin/login">https://${data.subdomain}/auth/institute-admin/login</a></p>
        
        <p style="margin-top: 20px;">
          Please save these credentials and change the password after your first login.
        </p>
      </div>
      <div style="color: #64748b; font-size: 14px; margin-top: 20px;">
        <p>If you have any questions, please contact our support team.</p>
      </div>
    </div>
  `,

  INSTITUTE_ADMIN_CREDENTIALS: (data: any) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">Your Admin Account is Ready</h2>
      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p>Dear ${data.name},</p>
        <p>Your admin account for ${data.instituteName} has been created.</p>
        
        <h3>Login Details</h3>
        <p><strong>Institute URL:</strong> <a href="https://${data.subdomain}">${data.subdomain}</a></p>
        <p><strong>Login URL:</strong> <a href="https://${data.subdomain}/auth/institute-admin/login">https://${data.subdomain}/auth/institute-admin/login</a></p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Password:</strong> ${data.password}</p>
        
        <p style="margin-top: 20px; color: #dc2626;">
          Please change your password after your first login for security.
        </p>
      </div>
      <div style="color: #64748b; font-size: 14px; margin-top: 20px;">
        <p>Welcome to Fluxtile!</p>
      </div>
    </div>
  `,

  INSTITUTE_REJECTED: (data: any) => `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <h2 style="color: #2563eb;">Institute Request Update</h2>
      <div style="background: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
        <p>Dear ${data.contactName},</p>
        <p>Thank you for your interest in AssessGPT. After careful review of your request for ${data.instituteName}, we regret to inform you that we are unable to approve your institute request at this time.</p>
        
        <h3>Reason for Rejection</h3>
        <p>${data.reason}</p>
        
        <p style="margin-top: 20px;">
          If you would like to submit a new request addressing these concerns, please feel free to do so.
        </p>
      </div>
      <div style="color: #64748b; font-size: 14px; margin-top: 20px;">
        <p>Best regards,<br>The AssessGPT Team</p>
      </div>
    </div>
  `,
};

// Email configuration
const createTransporter = () => {
  return nodemailer.createTransport({
    host: "smtp-relay.brevo.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// Send email function
export async function sendEmail({ 
  to, 
  subject, 
  template, 
  data 
}: EmailData) {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: `"AssessGPT" <${process.env.SENDER_EMAIL}>`,
      to,
      subject,
      html: templates[template](data),
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error("Email sending failed:", error);
    throw new Error("Failed to send email");
  }
}

// Update the EmailTemplate type
export type EmailTemplate =
  | "INSTITUTE_REQUEST"
  | "WELCOME_INSTITUTE"
  | "INSTITUTE_APPROVED"
  | "INSTITUTE_ADMIN_CREDENTIALS"
  | "INSTITUTE_REJECTED"; 