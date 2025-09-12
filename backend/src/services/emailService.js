const nodemailer = require('nodemailer');
const config = require('../config/config');
const logger = require('../utils/logger');

class EmailService {
  constructor() {
    this.transporter = null;
    this.init();
  }

  async init() {
    try {
      // Configure email transporter
      if (process.env.EMAIL_HOST) {
        this.transporter = nodemailer.createTransport({
          host: process.env.EMAIL_HOST,
          port: process.env.EMAIL_PORT || 587,
          secure: process.env.EMAIL_PORT == 465,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });

        // Verify connection
        await this.transporter.verify();
        logger.info('Email service initialized successfully');
      } else {
        logger.warn('Email configuration not found. Email features will be disabled.');
      }
    } catch (error) {
      logger.error('Failed to initialize email service:', error);
    }
  }

  async sendEmail({ to, subject, html, text }) {
    if (!this.transporter) {
      logger.warn('Email service not available');
      return false;
    }

    try {
      const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html,
        text
      };

      const info = await this.transporter.sendMail(mailOptions);
      logger.info(`Email sent successfully: ${info.messageId}`);
      return true;
    } catch (error) {
      logger.error('Failed to send email:', error);
      return false;
    }
  }

  async sendInvitationEmail({ email, firstName, tempPassword, organizationName, invitedBy }) {
    const subject = `Invitation to join ${organizationName}`;
    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #4CAF50; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .button { 
            display: inline-block; 
            padding: 10px 20px; 
            background-color: #4CAF50; 
            color: white; 
            text-decoration: none; 
            border-radius: 5px; 
            margin: 10px 0;
          }
          .credentials { 
            background-color: #fff; 
            padding: 15px; 
            border-left: 4px solid #4CAF50; 
            margin: 15px 0; 
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Welcome to ${organizationName}</h1>
          </div>
          <div class="content">
            <h2>Hi ${firstName || 'there'}!</h2>
            <p>You've been invited by <strong>${invitedBy}</strong> to join <strong>${organizationName}</strong> AI Assistant platform.</p>
            
            <div class="credentials">
              <h3>Your Login Credentials:</h3>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Temporary Password:</strong> ${tempPassword}</p>
            </div>
            
            <p>Please log in and change your password immediately after your first login.</p>
            
            <p>Best regards,<br>The ${organizationName} Team</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `
      Welcome to ${organizationName}!
      
      You've been invited by ${invitedBy} to join ${organizationName} AI Assistant platform.
      
      Your login credentials:
      Email: ${email}
      Temporary Password: ${tempPassword}
      
      Please log in and change your password immediately after your first login.
      
      Best regards,
      The ${organizationName} Team
    `;

    return this.sendEmail({ to: email, subject, html, text });
  }

  async sendPasswordResetEmail({ email, firstName, resetToken, organizationName }) {
    const subject = `Password Reset - ${organizationName}`;
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    const html = `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background-color: #2196F3; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background-color: #f9f9f9; }
          .button { 
            display: inline-block; 
            padding: 10px 20px; 
            background-color: #2196F3; 
            color: white; 
            text-decoration: none; 
            border-radius: 5px; 
            margin: 10px 0;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Password Reset Request</h1>
          </div>
          <div class="content">
            <h2>Hi ${firstName || 'there'}!</h2>
            <p>We received a request to reset your password for your ${organizationName} account.</p>
            <p>Click the button below to reset your password:</p>
            <a href="${resetLink}" class="button">Reset Password</a>
            <p>If you didn't request this password reset, please ignore this email.</p>
            <p>This link will expire in 1 hour for security reasons.</p>
            <p>Best regards,<br>The ${organizationName} Team</p>
          </div>
        </div>
      </body>
      </html>
    `;

    const text = `
      Password Reset Request
      
      Hi ${firstName || 'there'}!
      
      We received a request to reset your password for your ${organizationName} account.
      
      Click the link below to reset your password:
      ${resetLink}
      
      If you didn't request this password reset, please ignore this email.
      This link will expire in 1 hour for security reasons.
      
      Best regards,
      The ${organizationName} Team
    `;

    return this.sendEmail({ to: email, subject, html, text });
  }
}

module.exports = new EmailService();
