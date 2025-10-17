// Email service with SMTP support using nodemailer
import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

// Create transporter instance
function createTransporter() {
  // Validate required environment variables
  const requiredEnvVars = {
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    SMTP_USER: process.env.SMTP_USER,
    SMTP_PASS: process.env.SMTP_PASS,
    FROM_EMAIL: process.env.FROM_EMAIL,
  };

  console.log('🔧 SMTP Configuration:');
  console.log('  Host:', requiredEnvVars.SMTP_HOST);
  console.log('  Port:', requiredEnvVars.SMTP_PORT);
  console.log('  User:', requiredEnvVars.SMTP_USER);
  console.log('  From:', requiredEnvVars.FROM_EMAIL);
  console.log('  Pass:', requiredEnvVars.SMTP_PASS ? '***configured***' : 'NOT SET');

  // Check if all required variables are present
  const missingVars = Object.entries(requiredEnvVars)
    .filter(([_, value]) => !value)
    .map(([key]) => key);

  if (missingVars.length > 0) {
    console.error(`❌ Missing SMTP environment variables: ${missingVars.join(', ')}`);
    return null;
  }

  const port = parseInt(requiredEnvVars.SMTP_PORT || '587');
  const isSecure = port === 465;

  console.log('🔧 Creating transporter with:');
  console.log('  Secure:', isSecure);
  console.log('  Port:', port);

  const transporter = nodemailer.createTransport({
    host: requiredEnvVars.SMTP_HOST,
    port: port,
    secure: isSecure, // true for 465, false for other ports
    auth: {
      user: requiredEnvVars.SMTP_USER,
      pass: requiredEnvVars.SMTP_PASS,
    },
    // Additional options for better compatibility
    tls: {
      rejectUnauthorized: false
    }
  });

  return transporter;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    console.log('🔄 Attempting to send email to:', options.to);
    console.log('📧 Subject:', options.subject);

    // Create SMTP transporter
    const transporter = createTransporter();

    if (!transporter) {
      console.error('❌ SMTP transporter could not be created - missing configuration');
      return false;
    }

    console.log('✅ SMTP transporter created successfully');

    // Verify SMTP connection
    try {
      console.log('🔄 Verifying SMTP connection...');
      await transporter.verify();
      console.log('✅ SMTP server connection verified');
    } catch (verifyError) {
      console.error('❌ SMTP server connection failed:', verifyError);
      return false;
    }

    // Send email
    console.log('🔄 Sending email...');
    const info = await transporter.sendMail({
      from: `"All Believers Christian Church" <${process.env.FROM_EMAIL}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      text: options.text,
    });

    console.log('✅ Email sent successfully!');
    console.log('📧 Message ID:', info.messageId);
    console.log('📧 Response:', info.response);

    return true;
  } catch (error) {
    console.error('❌ Failed to send email:', error);
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

export function generatePrayerRequestNotificationEmail(
  requestData: {
    id: string;
    fullName: string;
    email: string;
    subject: string;
    prayerRequest: string;
    createdAt: string;
  },
  notificationEmail: string
): EmailOptions {
  return {
    to: notificationEmail,
    subject: `New Prayer Request - ${requestData.subject}`,
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <div style="background-color: #FF602E; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">All Believers Christian Church</h1>
          <h2 style="color: white; margin: 10px 0 0 0; font-size: 18px;">New Prayer Request</h2>
        </div>
        <div style="padding: 30px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
            <h3 style="color: #333; margin-top: 0;">Request Details</h3>
            <p style="margin: 10px 0;"><strong>From:</strong> ${requestData.fullName}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${requestData.email}</p>
            <p style="margin: 10px 0;"><strong>Subject:</strong> ${requestData.subject}</p>
            <p style="margin: 10px 0;"><strong>Submitted:</strong> ${new Date(requestData.createdAt).toLocaleString()}</p>
            <p style="margin: 10px 0;"><strong>Request ID:</strong> ${requestData.id}</p>
          </div>
          <div style="background-color: white; padding: 20px; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0;">Prayer Request</h3>
            <div style="background-color: #f8f8f8; padding: 15px; border-radius: 4px; border-left: 4px solid #FF602E; white-space: pre-wrap; line-height: 1.6;">
              ${requestData.prayerRequest}
            </div>
          </div>
        </div>
        <div style="background-color: #333; color: white; padding: 20px; text-align: center; font-size: 12px;">
          <p>© 2024 All Believers Christian Church. All rights reserved.</p>
          <p style="margin: 5px 0 0 0;">This prayer request was submitted through the church website.</p>
        </div>
      </div>
    `,
    text: `
      New Prayer Request - All Believers Christian Church
      
      From: ${requestData.fullName}
      Email: ${requestData.email}
      Subject: ${requestData.subject}
      Submitted: ${new Date(requestData.createdAt).toLocaleString()}
      Request ID: ${requestData.id}
      
      Prayer Request:
      ${requestData.prayerRequest}
      
      This prayer request was submitted through the church website.
    `
  };
}

export function generateNewUserNotificationEmail(
  userData: {
    name: string;
    email: string;
    createdAt: string;
  },
  notificationEmail: string
): EmailOptions {
  return {
    to: notificationEmail,
    subject: `New User Registration - ${userData.name}`,
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <div style="background-color: #FF602E; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">All Believers Christian Church</h1>
          <h2 style="color: white; margin: 10px 0 0 0; font-size: 18px;">New User Registration</h2>
        </div>
        <div style="padding: 30px; background-color: #f9f9f9;">
          <div style="background-color: white; padding: 20px; border-radius: 8px;">
            <h3 style="color: #333; margin-top: 0;">New Member Details</h3>
            <p style="margin: 10px 0;"><strong>Name:</strong> ${userData.name}</p>
            <p style="margin: 10px 0;"><strong>Email:</strong> ${userData.email}</p>
            <p style="margin: 10px 0;"><strong>Registered:</strong> ${new Date(userData.createdAt).toLocaleString()}</p>
          </div>
          <div style="background-color: #e8f5e9; padding: 15px; border-radius: 8px; margin-top: 20px;">
            <p style="margin: 0; color: #2e7d32;"><strong>Action:</strong> You may want to reach out and welcome this new member to the church community!</p>
          </div>
        </div>
        <div style="background-color: #333; color: white; padding: 20px; text-align: center; font-size: 12px;">
          <p>© 2024 All Believers Christian Church. All rights reserved.</p>
          <p style="margin: 5px 0 0 0;">This notification was sent from the church website.</p>
        </div>
      </div>
    `,
    text: `
      New User Registration - All Believers Christian Church
      
      Name: ${userData.name}
      Email: ${userData.email}
      Registered: ${new Date(userData.createdAt).toLocaleString()}
      
      Action: You may want to reach out and welcome this new member to the church community!
      
      This notification was sent from the church website.
    `
  };
}

export function generatePrayerRequestConfirmationEmail(
  requestData: {
    fullName: string;
    subject: string;
  },
  userEmail: string
): EmailOptions {
  return {
    to: userEmail,
    subject: 'Prayer Request Received - All Believers Christian Church',
    html: `
      <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
        <div style="background-color: #FF602E; padding: 20px; text-align: center;">
          <h1 style="color: white; margin: 0;">All Believers Christian Church</h1>
        </div>
        <div style="padding: 30px; background-color: #f9f9f9;">
          <h2 style="color: #333;">Thank You for Your Prayer Request</h2>
          <p style="color: #666; line-height: 1.6;">Dear ${requestData.fullName},</p>
          <p style="color: #666; line-height: 1.6;">
            We have received your prayer request: "<em>${requestData.subject}</em>". 
            Our prayer team will be praying for you and your situation.
          </p>
          <p style="color: #666; line-height: 1.6;">
            Remember that God loves you deeply and hears every prayer. We are honored 
            to join you in prayer and trust that the Lord will work in mighty ways.
          </p>
          <div style="background-color: #FF602E; color: white; padding: 15px; border-radius: 5px; margin: 20px 0; text-align: center;">
            <p style="margin: 0; font-style: italic;">"Therefore I tell you, whatever you ask for in prayer, believe that you have received it, and it will be yours." - Mark 11:24</p>
          </div>
          <p style="color: #666; line-height: 1.6;">
            If you have any questions or need additional support, please don't hesitate to contact us.
          </p>
          <p style="color: #666; line-height: 1.6;">
            Blessings,<br>
            All Believers Christian Church Prayer Team
          </p>
        </div>
        <div style="background-color: #333; color: white; padding: 20px; text-align: center; font-size: 12px;">
          <p>© 2024 All Believers Christian Church. All rights reserved.</p>
        </div>
      </div>
    `,
    text: `
      Prayer Request Received - All Believers Christian Church
      
      Dear ${requestData.fullName},
      
      We have received your prayer request: "${requestData.subject}". 
      Our prayer team will be praying for you and your situation.
      
      Remember that God loves you deeply and hears every prayer. We are honored 
      to join you in prayer and trust that the Lord will work in mighty ways.
      
      "Therefore I tell you, whatever you ask for in prayer, believe that you have received it, and it will be yours." - Mark 11:24
      
      If you have any questions or need additional support, please don't hesitate to contact us.
      
      Blessings,
      All Believers Christian Church Prayer Team
    `
  };
}
