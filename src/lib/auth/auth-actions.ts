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

export async function signInAction(formData: FormData): Promise<ActionResult> {
  try {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    
    const formDataToSend = new FormData();
    formDataToSend.append('email', email);
    formDataToSend.append('password', password);

    const res = await fetch('/api/auth/sign-in/email', {
      method: 'POST',
      body: formDataToSend,
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
    
    const formDataToSend = new FormData();
    formDataToSend.append('name', name);
    formDataToSend.append('email', email);
    formDataToSend.append('password', password);

    const res = await fetch('/api/auth/sign-up/email', {
      method: 'POST',
      body: formDataToSend,
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

export async function guestSignInAction(_formData: FormData): Promise<ActionResult> {
  // Not supported yet with better-auth default setup
  return { success: false, message: 'Guest sign-in is temporarily unavailable.' };
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
