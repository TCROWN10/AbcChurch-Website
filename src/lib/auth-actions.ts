'use server';

import { redirect } from 'next/navigation';
import { signInSchema, signUpSchema, guestSignInSchema } from './auth-schemas';
import { hashPassword, verifyPassword, setAuthCookie, removeAuthCookie } from './auth-utils';
import { createUser, findUserByEmail } from './auth-storage';

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
    });

    // Set auth cookie
    await setAuthCookie(user);

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