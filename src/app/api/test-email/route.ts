import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/services/email-service';

/**
 * POST /api/test-email - Test email configuration
 * Body: { "to": "test@example.com" }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { to } = body;

    if (!to) {
      return NextResponse.json(
        { error: 'Email address is required' },
        { status: 400 }
      );
    }

    console.log('🧪 Testing email configuration...');
    console.log('🧪 Sending test email to:', to);

    const testEmailData = {
      to: to,
      subject: 'Test Email - All Believers Christian Church',
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Arial, sans-serif;">
          <div style="background-color: #FF602E; padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">All Believers Christian Church</h1>
          </div>
          <div style="padding: 30px; background-color: #f9f9f9;">
            <h2 style="color: #333;">Email Configuration Test</h2>
            <p style="color: #666; line-height: 1.6;">
              This is a test email to verify that your SMTP configuration is working correctly.
            </p>
            <p style="color: #666; line-height: 1.6;">
              If you received this email, your email service is configured properly!
            </p>
            <p style="color: #666; line-height: 1.6;">
              <strong>Test sent at:</strong> ${new Date().toLocaleString()}
            </p>
          </div>
          <div style="background-color: #333; color: white; padding: 20px; text-align: center; font-size: 12px;">
            <p>© 2024 All Believers Christian Church. All rights reserved.</p>
          </div>
        </div>
      `,
      text: `
        Email Configuration Test - All Believers Christian Church
        
        This is a test email to verify that your SMTP configuration is working correctly.
        
        If you received this email, your email service is configured properly!
        
        Test sent at: ${new Date().toLocaleString()}
      `
    };

    const result = await sendEmail(testEmailData);

    if (result) {
      console.log('✅ Test email sent successfully!');
      return NextResponse.json(
        { 
          message: 'Test email sent successfully!',
          to: to
        },
        { status: 200 }
      );
    } else {
      console.log('❌ Test email failed to send');
      return NextResponse.json(
        { error: 'Failed to send test email. Check server logs for details.' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('❌ Error testing email:', error);
    return NextResponse.json(
      { error: 'Internal server error while testing email' },
      { status: 500 }
    );
  }
}