import { NextRequest, NextResponse } from 'next/server';
import { getUserDb } from '@/lib/database/database-wrapper';
import { requireAdmin } from '@/lib/auth/admin-utils';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * API endpoint to set a user as admin
 * Only accessible by existing admins
 * 
 * POST /api/admin/set-admin
 * Body: { userId: string } or { email: string }
 */
export async function POST(request: NextRequest) {
  try {
    // Require admin access
    await requireAdmin();
  } catch (error) {
    return NextResponse.json(
      { error: 'Unauthorized: Admin access required' },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    const { userId, email } = body;

    if (!userId && !email) {
      return NextResponse.json(
        { error: 'Either userId or email is required' },
        { status: 400 }
      );
    }

    const userDb = getUserDb();
    let user;

    if (userId) {
      user = userDb.findById(userId);
    } else if (email) {
      user = userDb.findByEmail(email);
    }

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Update admin status
    userDb.updateAdminStatus(user.id, true);

    return NextResponse.json({
      success: true,
      message: `User ${user.email} has been granted admin access`,
      user: {
        id: user.id,
        email: user.email,
        isAdmin: true,
      },
    });
  } catch (error) {
    console.error('Error setting admin status:', error);
    return NextResponse.json(
      { error: 'Failed to set admin status' },
      { status: 500 }
    );
  }
}

