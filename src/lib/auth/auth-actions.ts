export type ActionResult = {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
};

function toFormBody(formData: FormData | Record<string, any>) {
  if (typeof FormData !== 'undefined' && formData instanceof FormData) {
    return formData;
  }

  const fd = new FormData();
  Object.entries(formData as Record<string, any>).forEach(([k, v]) => {
    if (v !== undefined && v !== null) fd.append(k, String(v));
  });
  return fd;
}


export async function signOutAndRedirect(redirectPath: string = '/signin'): Promise<ActionResult> {
  const result = await signOutAction();
  if (result.success && typeof window !== 'undefined') {
    try {
      window.location.href = redirectPath;
    } catch {}
  }
  return result;
}
export async function signInAction(formData: FormData): Promise<ActionResult> {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const res = await fetch('/api/auth/sign-in/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'include',
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return { success: false, message: data?.message || 'Sign in failed' };
    }
    return { success: true, message: 'Signed in successfully' };
  } catch (e) {
    console.error('Signin error:', e);
    return { success: false, message: 'Network error during sign in' };
  }
}

export async function signUpAction(formData: FormData): Promise<ActionResult> {
  try {
    const name = [formData.get('firstName'), formData.get('lastName')]
      .filter(Boolean)
      .join(' ');
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const res = await fetch('/api/auth/sign-up/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
      credentials: 'include',
    });
    
    const data = await res.json().catch(() => ({}));
    if (!res.ok) {
      return { success: false, message: data?.message || 'Sign up failed', errors: data?.errors };
    }
    return { success: true, message: 'Account created successfully' };
  } catch (e) {
    console.error('Signup error:', e);
    return { success: false, message: 'Network error during sign up' };
  }
}

export async function guestSignInAction(formData: FormData): Promise<ActionResult> {
  try {
    const email = formData.get('email') as string;
    if (!email) return { success: false, message: 'Email is required for guest access.' };

    // Generate a strong random password for the temporary account
    const cryptoObj: Crypto | undefined = (globalThis as any)?.crypto;
    let randomPassword: string;
    if (cryptoObj && typeof cryptoObj.getRandomValues === 'function') {
      randomPassword = cryptoObj.getRandomValues(new Uint8Array(24))
        .reduce((s, b) => s + b.toString(16).padStart(2, '0'), '');
    } else {
      // Fallback (less strong, but avoids hard failure in edge environments)
      randomPassword = Array.from({ length: 48 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
    }

    const name = `Guest ${email.split('@')[0] || ''}`.trim();

    // Try to create the account
    const signUpRes = await fetch('/api/auth/sign-up/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password: randomPassword }),
      credentials: 'include',
    });

    if (!signUpRes.ok) {
      const data = await signUpRes.json().catch(() => ({}));
      const msg = (data?.message || '').toLowerCase();
      // If user exists, instruct to sign in normally
      if (signUpRes.status === 409 || msg.includes('already') || msg.includes('exists')) {
        return { success: false, message: 'An account already exists for this email. Please sign in instead.' };
      }
      return { success: false, message: data?.message || 'Guest account creation failed.' };
    }

    // Immediately sign in with the generated password
    const signInRes = await fetch('/api/auth/sign-in/email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password: randomPassword }),
      credentials: 'include',
    });

    if (!signInRes.ok) {
      const data = await signInRes.json().catch(() => ({}));
      return { success: false, message: data?.message || 'Guest sign-in failed after creation.' };
    }

    try {
      // Mark in client storage for UI flows
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('is_guest', '1');
      }
    } catch {}

    return { success: true, message: 'Signed in as guest.' };
  } catch (e) {
    console.error('Guest sign-in error:', e);
    return { success: false, message: 'Network error during guest sign-in.' };
  }
}

export async function signOutAction(): Promise<ActionResult> {
  try {
    const res = await fetch('/api/auth/sign-out', {
      method: 'POST',
      credentials: 'include',
    });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      return { success: false, message: data?.message || 'Sign out failed' };
    }
    try {
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem('is_guest');
      }
    } catch {}
    return { success: true, message: 'Signed out successfully' };
  } catch (e) {
    console.error('Signout error:', e);
    return { success: false, message: 'Network error during sign out' };
  }
}

export async function requestPasswordResetAction(_formData: FormData): Promise<ActionResult> {
  // TODO: Wire up to better-auth password reset if/when enabled
  return { success: false, message: 'Password reset request is not enabled yet.' };
}

export async function resetPasswordAction(_formData: FormData): Promise<ActionResult> {
  // TODO: Wire up to better-auth password reset if/when enabled
  return { success: false, message: 'Password reset is not enabled yet.' };
}

export async function verifyEmailAction(_token: string): Promise<ActionResult> {
  // TODO: Wire up to better-auth email verification if/when enabled
  return { success: false, message: 'Email verification is not enabled yet.' };
}
