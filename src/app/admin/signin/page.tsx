"use client";
import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/lib/auth/auth-context';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ActionResult {
  success: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

function AdminSignInPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { refreshUser } = useAuth();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [result, setResult] = useState<ActionResult | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [googleEnabled, setGoogleEnabled] = useState(false);
  const [providerChecked, setProviderChecked] = useState(false);

  // Handle OAuth errors from URL params
  useEffect(() => {
    const error = searchParams.get('error');
    if (error) {
      const errorMessages: Record<string, string> = {
        'oauth_setup_failed': 'OAuth setup failed. Please check your configuration.',
        'oauth_cancelled': 'Google sign-in was cancelled.',
        'invalid_oauth_response': 'Invalid OAuth response received.',
        'invalid_oauth_state': 'Invalid OAuth state. Please try again.',
        'oauth_failed': 'Google sign-in failed. Please try again.',
      };
      
      setResult({
        success: false,
        message: errorMessages[error] || 'An error occurred during sign-in.',
      });
      
      // Clean up URL by removing error param
      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete('error');
      window.history.replaceState({}, '', newUrl.toString());
    }
  }, [searchParams]);

  // Discover provider availability from server
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch('/api/auth/config', { cache: 'no-store' });
        const data = await res.json().catch(() => ({}));
        if (!cancelled) setGoogleEnabled(Boolean(data?.googleEnabled));
      } catch (_) {
        if (!cancelled) setGoogleEnabled(false);
      } finally {
        if (!cancelled) setProviderChecked(true);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      setResult({
        success: false,
        message: 'Please provide both email and password.',
      });
      return;
    }

    setIsLoggingIn(true);
    setResult({
      success: false,
      message: 'Signing in...',
    });

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      // Check for network/proxy errors (503, 504, etc.)
      if (response.status === 503 || response.status === 504) {
        const errorData = await response.json().catch(() => ({}));
        setResult({
          success: false,
          message: errorData.message || 'Unable to connect to the server. Please check your internet connection and try again.',
        });
        setIsLoggingIn(false);
        return;
      }

      const data = await response.json();
      console.log('Admin login response:', { 
        httpStatus: response.status, 
        responseOk: response.ok,
        responseStatus: data.statusCode,
        success: data.success,
        data: data 
      });

      // Check if the backend returned an error
      // The proxy might return 200 even when backend returns 401, so we MUST check data.success and data.statusCode
      // Check both HTTP status and response body status
      const hasErrorStatus = response.status === 401 || data.statusCode === 401 || (data.data && data.data.statusCode === 401);
      const hasErrorSuccess = data.success === false || data.success === 'false' || !data.success;
      const isError = !response.ok || hasErrorStatus || hasErrorSuccess;
      
      console.log('Error check details:', {
        responseOk: response.ok,
        responseStatus: response.status,
        dataSuccess: data.success,
        dataStatusCode: data.statusCode,
        hasErrorStatus,
        hasErrorSuccess,
        isError
      });
      
      if (isError) {
        // Handle API errors (401, etc.)
        let errorMessage = 'Invalid email or password. Please try again.';
        
        // Extract message from nested response structure - check multiple possible locations
        if (data?.message) {
          errorMessage = data.message;
        } else if (data?.data?.message) {
          errorMessage = data.data.message;
        } else if (data?.error) {
          errorMessage = data.error;
        } else if (data?.data?.error) {
          errorMessage = data.data.error;
        }

        console.log('Admin login error detected:', {
          isError,
          httpStatus: response.status,
          responseOk: response.ok,
          dataSuccess: data.success,
          dataStatusCode: data.statusCode,
          errorMessage,
          fullData: data // Log full response for debugging
        });

        // Check if it's an email verification error
        const isEmailVerificationError = 
          (response.status === 401 || data.statusCode === 401) && 
          (errorMessage.toLowerCase().includes('verify') || 
           errorMessage.toLowerCase().includes('otp') ||
           errorMessage.toLowerCase().includes('email verification'));

        setResult({
          success: false,
          message: errorMessage,
        });
        setIsLoggingIn(false);
        return;
      }

      // Login successful - store token
      if (data.success && data.data?.accessToken) {
        if (typeof window !== 'undefined') {
          localStorage.setItem('accessToken', data.data.accessToken);
        }

        // Check if user is admin by fetching profile
        try {
          const profileResponse = await fetch('/api/auth/profile', {
            headers: {
              'Authorization': `Bearer ${data.data.accessToken}`,
              'Content-Type': 'application/json',
              'accept': 'application/json',
            },
          });

          const profileData = await profileResponse.json();
          console.log('Admin profile check:', profileData);
          
          const userProfile = profileData?.data || profileData;
          const isAdmin = userProfile?.role === 'ADMIN' || userProfile?.role === 'SUPER_ADMIN';

          if (isAdmin) {
            // Refresh user session
            await refreshUser();
            
            setResult({
              success: true,
              message: 'Login successful! Redirecting to admin dashboard...',
            });
            
            // Redirect to admin dashboard
            setTimeout(() => {
              router.push('/admin');
            }, 1000);
          } else {
            setResult({
              success: false,
              message: 'Access denied. This account does not have admin privileges. Please use a regular sign-in page.',
            });
            setIsLoggingIn(false);
            // Clear token if not admin
            if (typeof window !== 'undefined') {
              localStorage.removeItem('accessToken');
            }
          }
        } catch (error) {
          console.error('Error checking admin status:', error);
          setResult({
            success: false,
            message: 'Error verifying admin access. Please try again.',
          });
          setIsLoggingIn(false);
        }
      } else {
        setResult({
          success: false,
          message: data.message || 'Login failed. Please try again.',
        });
        setIsLoggingIn(false);
      }
    } catch (error: any) {
      console.error('Admin login error:', error);
      
      // Handle different types of errors
      let errorMessage = 'Network error. Please check your connection and try again.';
      
      if (error.message && error.message.includes('fetch')) {
        errorMessage = 'Unable to connect to the server. Please check your internet connection and try again.';
      } else if (error.message && error.message.includes('timeout')) {
        errorMessage = 'Request timeout. The server is taking too long to respond. Please try again.';
      }
      
      setResult({
        success: false,
        message: errorMessage,
      });
      setIsLoggingIn(false);
    }
  };

  // Google Sign-In handler for Admin
  const handleGoogleSignIn = (isSuperAdmin: boolean = false) => {
    if (!providerChecked || !googleEnabled) {
      setResult({ success: false, message: 'Google sign-in is not available. Please use email sign-in.' });
      return;
    }

    const oauthEndpoint = isSuperAdmin 
      ? '/api/auth/google/super-admin'
      : '/api/auth/google/admin';
    
    // Redirect to OAuth endpoint
    window.location.href = oauthEndpoint;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}></div>
      </div>

      {/* Header */}
      <header className="w-full bg-gray-900/80 backdrop-blur-sm border-b border-gray-700 h-16 md:h-20 flex items-center px-4 md:px-8 z-20 relative">
        <Link href="/" className="flex items-center gap-2 md:gap-3">
          <Image
            src="/images/church-logo.png"
            alt="All Believers Christian Church Logo"
            width={40}
            height={40}
            className="rounded-full md:w-12 md:h-12"
          />
          <span className="text-white font-bold text-sm md:text-lg hidden sm:block tracking-wide leading-tight">
            ALL BELIEVERS<br />CHRISTIAN CHURCH
          </span>
        </Link>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center relative z-20 px-4 md:px-0 py-8">
        <motion.div
          className="w-full max-w-md bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl px-6 py-8 flex flex-col items-center relative border border-gray-200"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* Admin Badge */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
            <span className="px-4 py-1 bg-[#FF602E] text-white text-xs font-bold rounded-full shadow-lg">
              ADMIN ACCESS
            </span>
          </div>

          {/* Title */}
          <h2 className="text-center text-2xl md:text-3xl font-bold text-gray-800 mb-2 mt-4">
            Admin Sign In
          </h2>
          <p className="text-center text-sm text-gray-600 mb-6">
            Sign in to access the admin dashboard
          </p>

          {/* Error/Success Messages */}
          {result && (
            <div className={`w-full mb-6 p-4 rounded-lg text-sm ${
              result.success
                ? 'bg-green-100 text-green-700 border border-green-200'
                : 'bg-red-100 text-red-700 border border-red-200'
            }`}>
              <p className="text-center font-medium">{result.message}</p>
              {!result.success && result.message && 
               (result.message.toLowerCase().includes('verify') || 
                result.message.toLowerCase().includes('otp')) && (
                <div className="mt-2 pt-2 border-t border-red-300 text-center">
                  <Link 
                    href={`/verify-otp${email ? `?email=${encodeURIComponent(email)}` : ''}`}
                    className="text-[#FF602E] hover:underline text-xs font-semibold"
                  >
                    Enter OTP Code to Verify Email →
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSignIn} className="w-full space-y-5">
            {/* Email Input */}
            <div>
              <label htmlFor="admin-email" className="block text-sm font-medium text-black mb-2">
                Email Address
              </label>
              <input
                id="admin-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoggingIn}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF602E] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="admin@example.com"
              />
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="admin-password" className="block text-sm font-medium text-black mb-2">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={isLoggingIn}
                className="w-full px-4 py-3 border text-black border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF602E] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                placeholder="Enter your password"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
                disabled={isLoggingIn || !email || !password}
              className="w-full bg-[#FF602E] text-white py-3 rounded-lg font-semibold hover:opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
            >
              {isLoggingIn ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  <span>Signing in...</span>
                </>
              ) : (
                'Sign In to Admin Dashboard'
              )}
            </button>
          </form>

          {/* Google OAuth Buttons */}
          {providerChecked && googleEnabled && (
            <>
              {/* OR Separator */}
              <div className="flex items-center justify-center my-4">
                <div className="flex-1 border-t border-gray-300"></div>
                <span className="px-4 text-gray-500 text-sm font-medium">OR</span>
                <div className="flex-1 border-t border-gray-300"></div>
              </div>

              {/* Admin Google Sign-In Button */}
              <button
                type="button"
                onClick={() => handleGoogleSignIn(false)}
                disabled={isLoggingIn || !providerChecked || !googleEnabled}
                className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-lg font-medium text-sm transition hover:bg-gray-50 hover:border-gray-400 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span>Sign in with Google (Admin)</span>
              </button>

              {/* Super Admin Google Sign-In Button */}
              <button
                type="button"
                onClick={() => handleGoogleSignIn(true)}
                disabled={isLoggingIn || !providerChecked || !googleEnabled}
                className="w-full flex items-center justify-center gap-3 bg-white border-2 border-[#FF602E] text-[#FF602E] py-3 px-4 rounded-lg font-medium text-sm transition hover:bg-[#FFF3ED] disabled:opacity-50 disabled:cursor-not-allowed shadow-sm mt-2"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                <span>Sign in with Google (Super Admin)</span>
              </button>
            </>
          )}

          {/* Links */}
          <div className="mt-6 pt-6 border-t border-gray-200 w-full text-center space-y-2">
            <Link
              href="/signin"
              className="text-gray-600 hover:text-[#FF602E] text-sm font-medium block"
            >
              Regular User Sign In →
            </Link>
            <Link
              href="/forgot-password"
              className="text-gray-600 hover:text-[#FF602E] text-sm font-medium block"
            >
              Forgot Password?
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function AdminSignInPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    }>
      <AdminSignInPageContent />
    </Suspense>
  );
}

