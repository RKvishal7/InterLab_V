import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, ArrowRight, AlertCircle, Sparkles, CheckCircle2, UserCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AuthLayout } from './AuthLayout';
import { GoogleSignInButton } from './GoogleSignInButton';
import { Button, Checkbox, FormField, Input } from '../../design-system';

export const LoginPage: React.FC = () => {
  const { signIn, signInWithGoogle, navigate } = useApp();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!email.trim()) {
      errors.email = 'Please enter your account email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = 'Please enter a valid email address.';
    }

    if (!password) {
      errors.password = 'Please enter your password.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setGeneralError(null);

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const res = await signIn({
        email: email.trim(),
        password,
        rememberMe,
      });

      if (res.error) {
        if (res.error.field) {
          setFieldErrors((prev) => ({ ...prev, [res.error!.field!]: res.error!.message }));
        } else {
          setGeneralError(res.error.message);
        }
        setIsLoading(false);
        return;
      }

      // Success -> Route to Discover or Workspace
      navigate({ view: 'discover' });
    } catch (err: any) {
      setGeneralError(err?.message || 'Invalid credentials or server timeout.');
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsGoogleLoading(true);
    setGeneralError(null);

    try {
      const res = await signInWithGoogle();
      if (res.error) {
        setGeneralError(res.error.message);
        setIsGoogleLoading(false);
        return;
      }

      navigate({ view: 'discover' });
    } catch (err: any) {
      setGeneralError('Google authentication failed.');
      setIsGoogleLoading(false);
    }
  };

  // Demo Quick-Fill helper for instant evaluator testing
  const handleQuickDemoStudent = () => {
    setEmail('alex.chen@berkeley.edu');
    setPassword('DemoPassword123!');
    setFieldErrors({});
    setGeneralError(null);
  };

  return (
    <AuthLayout
      title="Sign in to InternLab"
      subtitle="Access your active simulation milestones, supervisor reviews, and verified artifacts."
      badgeText="Secure Identity Gateway"
      alternateAction={{
        text: "Don't have an InternLab account?",
        actionLabel: 'Create Account',
        onAction: () => navigate({ view: 'signup' }),
      }}
    >
      <div className="space-y-6">
        {/* Google Authentication */}
        <div>
          <GoogleSignInButton
            onClick={handleGoogleAuth}
            isLoading={isGoogleLoading}
            label="Sign in with Google"
            id="login-google-btn"
          />

          <div className="relative flex items-center justify-center my-6">
            <div className="border-t border-[#E2E2DE] w-full" />
            <span className="bg-[#F9F8F6] px-3 text-[11px] font-mono uppercase tracking-wider text-[#8A8A85] relative">
              Or continue with email
            </span>
          </div>
        </div>

        {/* Global Error Notice */}
        {generalError && (
          <div className="p-3 bg-[#FEF2F2] border border-[#FCA5A5] rounded-sm text-xs text-[#991B1B] flex items-start gap-2 animate-fadeIn">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{generalError}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleFormSubmit} className="space-y-4" noValidate>
          {/* Email Address */}
          <FormField
            label="Email Address"
            required
            error={fieldErrors.email}
            id="login-email"
          >
            <Input
              id="login-email-input"
              type="email"
              placeholder="name@university.edu"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (fieldErrors.email) {
                  setFieldErrors((prev) => ({ ...prev, email: '' }));
                }
              }}
              leftElement={<Mail className="w-4 h-4" />}
              error={Boolean(fieldErrors.email)}
              autoComplete="email"
              disabled={isLoading}
            />
          </FormField>

          {/* Password */}
          <FormField
            label="Password"
            required
            error={fieldErrors.password}
            id="login-password"
          >
            <Input
              id="login-password-input"
              type={showPassword ? 'text' : 'password'}
              placeholder="Your secure password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (fieldErrors.password) {
                  setFieldErrors((prev) => ({ ...prev, password: '' }));
                }
              }}
              leftElement={<Lock className="w-4 h-4" />}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-[#8A8A85] hover:text-[#1A1C1E] transition-colors focus:outline-none p-1"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
              error={Boolean(fieldErrors.password)}
              autoComplete="current-password"
              disabled={isLoading}
            />
          </FormField>

          {/* Remember Me & Forgot Password Row */}
          <div className="flex items-center justify-between pt-1">
            <Checkbox
              id="login-remember-me"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              label={<span className="text-xs text-[#484B4F]">Remember this device</span>}
            />

            <button
              type="button"
              onClick={() => navigate({ view: 'forgot-password' })}
              className="text-xs font-semibold text-[#1A1C1E] hover:text-[#3E51FF] underline underline-offset-4 decoration-[#E2E2DE] hover:decoration-[#3E51FF] transition-colors"
              id="login-forgot-password-link"
            >
              Forgot password?
            </button>
          </div>

          {/* Submit CTA */}
          <div className="pt-3">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full justify-center text-sm font-semibold"
              isLoading={isLoading}
              id="login-submit-btn"
            >
              <span>Sign In to Workplace</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </form>

        {/* Demo Fast-Fill Box */}
        <div className="mt-6 p-3.5 bg-[#F2F1EE]/80 border border-[#E2E2DE] rounded-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1A1C1E]">
              <Sparkles className="w-3.5 h-3.5 text-[#3E51FF]" />
              <span>Instant Evaluator Demo Login</span>
            </div>
            <span className="text-[10px] font-mono text-[#8A8A85]">Sample Account</span>
          </div>
          <p className="text-[11px] text-[#484B4F] mb-2.5">
            Click below to auto-fill verified student credentials (UC Berkeley CS Cohort):
          </p>
          <button
            type="button"
            onClick={handleQuickDemoStudent}
            className="w-full flex items-center justify-between px-3 py-2 bg-[#FFFFFF] hover:bg-[#FAF9F5] border border-[#E2E2DE] rounded-xs text-xs font-medium text-[#1A1C1E] transition-colors group"
            id="demo-student-autofill-btn"
          >
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full bg-[#1A1C1E] text-white flex items-center justify-center text-[10px] font-bold">
                AC
              </div>
              <span className="font-semibold">Alex Chen (Berkeley CS)</span>
            </div>
            <span className="text-[11px] font-mono text-[#3E51FF] group-hover:underline">
              Auto-fill &rarr;
            </span>
          </button>
        </div>
      </div>
    </AuthLayout>
  );
};
