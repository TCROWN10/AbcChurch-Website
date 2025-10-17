import { NextRequest, NextResponse } from 'next/server';
import { prayerRequestSchema } from '@/lib/prayer/prayer-schemas';
import { getPrayerRequestDb } from '@/lib/database/database-wrapper';
import { sendEmail, generatePrayerRequestNotificationEmail, generatePrayerRequestConfirmationEmail } from '@/lib/services/email-service';

// Generate unique ID for prayer requests
function generatePrayerRequestId(): string {
  const timestamp = Date.now().toString(36);
  const randomStr = Math.random().toString(36).substring(2, 8);
  return `pr_${timestamp}_${randomStr}`;
}

/**
 * POST /api/prayer-requests - Submit a new prayer request
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate request data
    const validationResult = prayerRequestSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: validationResult.error.flatten().fieldErrors
        },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;

    // Create prayer request record
    const prayerRequestDb = getPrayerRequestDb();
    const prayerRequestId = generatePrayerRequestId();
    
    const newPrayerRequest = prayerRequestDb.create({
      id: prayerRequestId,
      fullName: validatedData.fullName,
      email: validatedData.email,
      subject: validatedData.subject,
      prayerRequest: validatedData.prayerRequest,
    });

    // Send notification email to church staff (if configured)
    const notificationEmail = process.env.PRAYER_REQUEST_NOTIFICATION_EMAIL;
    console.log('🔧 Notification email configured:', notificationEmail ? 'YES' : 'NO');
    console.log('🔧 Notification email address:', notificationEmail);
    
    if (notificationEmail) {
      try {
        console.log('📧 Generating notification email...');
        const notificationEmailData = generatePrayerRequestNotificationEmail(
          {
            id: newPrayerRequest.id,
            fullName: newPrayerRequest.fullName,
            email: newPrayerRequest.email,
            subject: newPrayerRequest.subject,
            prayerRequest: newPrayerRequest.prayerRequest,
            createdAt: newPrayerRequest.createdAt.toISOString(),
          },
          notificationEmail
        );
        
        console.log('📧 Sending notification email...');
        const notificationResult = await sendEmail(notificationEmailData);
        console.log('📧 Notification email result:', notificationResult ? 'SUCCESS' : 'FAILED');
      } catch (emailError) {
        console.error('❌ Failed to send notification email:', emailError);
        // Don't fail the request if email fails
      }
    } else {
      console.log('⚠️ No notification email configured - skipping notification');
    }

    // Send confirmation email to user
    try {
      console.log('📧 Generating confirmation email for:', newPrayerRequest.email);
      const confirmationEmailData = generatePrayerRequestConfirmationEmail(
        {
          fullName: newPrayerRequest.fullName,
          subject: newPrayerRequest.subject,
        },
        newPrayerRequest.email
      );
      
      console.log('📧 Sending confirmation email...');
      const confirmationResult = await sendEmail(confirmationEmailData);
      console.log('📧 Confirmation email result:', confirmationResult ? 'SUCCESS' : 'FAILED');
    } catch (emailError) {
      console.error('❌ Failed to send confirmation email:', emailError);
      // Don't fail the request if email fails
    }

    // Prayer request submitted successfully - notification sent via email

    return NextResponse.json(
      { 
        message: 'Prayer request submitted successfully',
        id: newPrayerRequest.id
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error processing prayer request:', error);
    return NextResponse.json(
      { error: 'Internal server error. Please try again later.' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/prayer-requests - Retrieve prayer requests (for admin use)
 * Note: In a production environment, this should be protected with authentication
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = parseInt(searchParams.get('offset') || '0');
    const status = searchParams.get('status') || undefined;

    const prayerRequestDb = getPrayerRequestDb();
    
    const requests = prayerRequestDb.findAll({
      limit: Math.min(limit, 100), // Cap at 100 for performance
      offset,
      status,
    });

    const totalCount = prayerRequestDb.count(status);

    return NextResponse.json({
      requests,
      pagination: {
        limit,
        offset,
        total: totalCount,
        hasMore: offset + limit < totalCount,
      }
    });

  } catch (error) {
    console.error('Error fetching prayer requests:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
