'use server';

import { redirect } from 'next/navigation';
import { signInSchema, signUpSchema, guestSignInSchema } from './auth-schemas';
import { hashPassword, verifyPassword, setAuthCookie, removeAuthCookie } from './auth-utils';
import { createUser, findUserByEmail, requestPasswordReset, resetPassword, verifyEmail } from './auth-storage';

export interface ActionResult {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

export async function signInAction(formData: FormData): Promise<ActionResult> {
  try {
    // Extract and validate form data
    const rawData = {
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    const validatedData = signInSchema.parse(rawData);
    
    // Find user by email
    const user = await findUserByEmail(validatedData.email);
    if (!user || !user.hashedPassword) {
      return {
        success: false,
        message: 'Invalid email or password',
      };
    }

    // Verify password
    const isValidPassword = await verifyPassword(validatedData.password, user.hashedPassword);
    if (!isValidPassword) {
      return {
        success: false,
        message: 'Invalid email or password',
      };
    }

    // Set auth cookie
    await setAuthCookie({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isGuest: user.isGuest,
      createdAt: user.createdAt,
    });

    return { success: true };
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return {
        success: false,
        errors: error.flatten().fieldErrors,
      };
    }
    
    return {
      success: false,
      message: 'An unexpected error occurred',
    };
  }
}

export async function signUpAction(formData: FormData): Promise<ActionResult> {
  try {
    // Extract and validate form data
    const rawData = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      password: formData.get('password') as string,
    };

    const validatedData = signUpSchema.parse(rawData);
    
    // Check if user already exists
    const existingUser = await findUserByEmail(validatedData.email);
    if (existingUser) {
      return {
        success: false,
        message: 'An account with this email already exists',
      };
    }

    // Hash password and create user
    const hashedPassword = await hashPassword(validatedData.password);
    const user = await createUser({
      email: validatedData.email,
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      hashedPassword,
      isGuest: false,
      requireEmailVerification: process.env.REQUIRE_EMAIL_VERIFICATION === 'true',
    });

    // Set auth cookie (even if email verification is required)
    await setAuthCookie(user);

    return { 
      success: true,
      message: process.env.REQUIRE_EMAIL_VERIFICATION === 'true' 
        ? 'Account created! Please check your email to verify your account.'
        : undefined
    };
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return {
        success: false,
        errors: error.flatten().fieldErrors,
      };
    }
    
    return {
      success: false,
      message: 'An unexpected error occurred',
    };
  }
}

export async function guestSignInAction(formData: FormData): Promise<ActionResult> {
  try {
    // Extract and validate form data
    const rawData = {
      email: formData.get('email') as string,
    };

    const validatedData = guestSignInSchema.parse(rawData);
    
    // Create or find guest user
    let user = await findUserByEmail(validatedData.email);
    if (!user) {
      user = await createUser({
        email: validatedData.email,
        isGuest: true,
      });
    }

    // Set auth cookie
    await setAuthCookie({
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isGuest: user.isGuest,
      createdAt: user.createdAt,
    });

    return { success: true };
  } catch (error: any) {
    if (error.name === 'ZodError') {
      return {
        success: false,
        errors: error.flatten().fieldErrors,
      };
    }
    
    return {
      success: false,
      message: 'An unexpected error occurred',
    };
  }
}

export async function signOutAction(): Promise<void> {
  await removeAuthCookie();
  redirect('/signin');
}

// Password reset request
export async function requestPasswordResetAction(formData: FormData): Promise<ActionResult> {
  try {
    const email = formData.get('email') as string;
    
    if (!email || !email.includes('@')) {
      return {
        success: false,
        message: 'Please enter a valid email address',
      };
    }

    // Always return success to prevent email enumeration
    await requestPasswordReset(email);
    
    return {
      success: true,
      message: 'If an account with that email exists, we\'ve sent a password reset link.',
    };
  } catch (error) {
    return {
      success: false,
      message: 'An unexpected error occurred',
    };
  }
}

// Password reset completion
export async function resetPasswordAction(formData: FormData): Promise<ActionResult> {
  try {
    const token = formData.get('token') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    
    if (!token) {
      return {
        success: false,
        message: 'Invalid reset token',
      };
    }
    
    if (password !== confirmPassword) {
      return {
        success: false,
        message: 'Passwords do not match',
      };
    }
    
    // Validate password strength
    const passwordValidation = signUpSchema.shape.password.safeParse(password);
    if (!passwordValidation.success) {
      return {
        success: false,
        errors: { password: passwordValidation.error.errors.map(e => e.message) },
      };
    }
    
    const hashedPassword = await hashPassword(password);
    const success = await resetPassword(token, hashedPassword);
    
    if (!success) {
      return {
        success: false,
        message: 'Invalid or expired reset token',
      };
    }
    
    return {
      success: true,
      message: 'Password reset successfully. You can now sign in with your new password.',
    };
  } catch (error) {
    return {
      success: false,
      message: 'An unexpected error occurred',
    };
  }
}

// Email verification
export async function verifyEmailAction(token: string): Promise<ActionResult> {
  try {
    const success = await verifyEmail(token);
    
    if (!success) {
      return {
        success: false,
        message: 'Invalid or expired verification token',
      };
    }
    
    return {
      success: true,
      message: 'Email verified successfully!',
    };
  } catch (error) {
    return {
      success: false,
      message: 'An unexpected error occurred',
    };
  }
}