import { NextRequest, NextResponse } from 'next/server';
import { sendEmail, generateNewUserNotificationEmail } from '@/lib/services/email-service';

/**
 * POST /api/notifications/new-user - Send notification email for new user registration
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Get notification email from environment variable
    const notificationEmail = process.env.NEW_USER_NOTIFICATION_EMAIL || process.env.PRAYER_REQUEST_NOTIFICATION_EMAIL;
    
    console.log('🔧 New user notification email configured:', notificationEmail ? 'YES' : 'NO');

    if (!notificationEmail) {
      console.log('⚠️ No notification email configured - skipping notification');
      return NextResponse.json({ message: 'No notification email configured' }, { status: 200 });
    }

    // Send notification email to church staff
    try {
      console.log('📧 Generating new user notification email...');
      const notificationEmailData = generateNewUserNotificationEmail(
        {
          name,
          email,
          createdAt: new Date().toISOString(),
        },
        notificationEmail
      );

      console.log('📧 Sending new user notification email...');
      const result = await sendEmail(notificationEmailData);
      console.log('📧 New user notification email result:', result ? 'SUCCESS' : 'FAILED');

      return NextResponse.json(
        { 
          message: result ? 'Notification sent successfully' : 'Failed to send notification',
          success: result
        },
        { status: result ? 200 : 500 }
      );
    } catch (emailError) {
      console.error('❌ Failed to send new user notification email:', emailError);
      return NextResponse.json(
        { error: 'Failed to send notification email' },
        { status: 500 }
      );
    }

  } catch (error) {
    console.error('Error processing new user notification:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

