// Email service for authentication-related emails
// This is a basic implementation that logs to console in development
// In production, integrate with services like SendGrid, AWS SES, or SMTP

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    // In development, just log the email
    if (process.env.NODE_ENV === 'development') {
      console.log('📧 Email would be sent:');
      console.log('To:', options.to);
      console.log('Subject:', options.subject);
      console.log('Content:', options.text || options.html);
      return true;
    }

    // TODO: Implement actual email sending for production
    // Example with nodemailer:
    /*
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });
    */

    return true;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
}

export function generateEmailVerificationEmail(email: string, token: string): EmailOptions {
  const verificationUrl = `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;
  
  return {
    to: email,
    subject: 'Verify Your Email - All Believers Christian Church',
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <div style="background-color: #FF602E; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">All Believers Christian Church</h1>
        </div>
        <div style="padding: 30px; background-color: #f9f9f9;">
          <h2 style="color: #333;">Verify Your Email Address</h2>
          <p style="color: #666; line-height: 1.6;">
            Thank you for creating an account with All Believers Christian Church. 
            To complete your registration, please verify your email address by clicking the button below.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationUrl}" 
               style="background-color: #FF602E; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
              Verify Email Address
            </a>
          </div>
          <p style="color: #666; font-size: 14px;">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <a href="${verificationUrl}" style="color: #FF602E;">${verificationUrl}</a>
          </p>
          <p style="color: #666; font-size: 14px;">
            If you didn't create this account, you can safely ignore this email.
          </p>
        </div>
        <div style="background-color: #333; color: white; padding: 20px; text-align: center; font-size: 12px;">
          <p>© 2024 All Believers Christian Church. All rights reserved.</p>
        </div>
      </div>
    `,
    text: `
      Verify Your Email - All Believers Christian Church
      
      Thank you for creating an account with All Believers Christian Church.
      To complete your registration, please verify your email address by visiting:
      
      ${verificationUrl}
      
      If you didn't create this account, you can safely ignore this email.
    `
  };
}

export function generatePasswordResetEmail(email: string, token: string): EmailOptions {
  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;
  
  return {
    to: email,
    subject: 'Reset Your Password - All Believers Christian Church',
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <div style="background-color: #FF602E; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">All Believers Christian Church</h1>
        </div>
        <div style="padding: 30px; background-color: #f9f9f9;">
          <h2 style="color: #333;">Reset Your Password</h2>
          <p style="color: #666; line-height: 1.6;">
            We received a request to reset your password for your All Believers Christian Church account.
            Click the button below to create a new password.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background-color: #FF602E; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
              Reset Password
            </a>
          </div>
          <p style="color: #666; font-size: 14px;">
            If the button doesn't work, copy and paste this link into your browser:<br>
            <a href="${resetUrl}" style="color: #FF602E;">${resetUrl}</a>
          </p>
          <p style="color: #666; font-size: 14px;">
            This link will expire in 1 hour for security reasons.
          </p>
          <p style="color: #666; font-size: 14px;">
            If you didn't request a password reset, you can safely ignore this email.
          </p>
        </div>
        <div style="background-color: #333; color: white; padding: 20px; text-align: center; font-size: 12px;">
          <p>© 2024 All Believers Christian Church. All rights reserved.</p>
        </div>
      </div>
    `,
    text: `
      Reset Your Password - All Believers Christian Church
      
      We received a request to reset your password for your All Believers Christian Church account.
      To reset your password, visit:
      
      ${resetUrl}
      
      This link will expire in 1 hour for security reasons.
      
      If you didn't request a password reset, you can safely ignore this email.
    `
  };
}