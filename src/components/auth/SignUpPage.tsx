import React, { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, User, CheckCircle2, AlertCircle, ArrowRight, Shield } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AuthLayout } from './AuthLayout';
import { PasswordStrengthMeter, getPasswordStrength } from './PasswordStrengthMeter';
import { GoogleSignInButton } from './GoogleSignInButton';
import { Button, Checkbox, FormField, Input } from '../../design-system';

export const SignUpPage: React.FC = () => {
  const { signUp, signInWithGoogle, navigate } = useApp();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [generalError, setGeneralError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!fullName.trim()) {
      errors.fullName = 'Please enter your full name.';
    }

    if (!email.trim()) {
      errors.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = 'Please enter a valid email format (e.g. name@university.edu).';
    }

    if (!password) {
      errors.password = 'Password is required.';
    } else if (password.length < 8) {
      errors.password = 'Password must be at least 8 characters long.';
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
    }

    if (!agreedToTerms) {
      errors.terms = 'You must agree to the Terms of Service & Privacy Policy to continue.';
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
      const res = await signUp({
        fullName: fullName.trim(),
        email: email.trim(),
        password,
        confirmPassword,
        agreedToTerms,
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

      // Success! Redirect to Onboarding
      navigate({ view: 'onboarding', step: 1 });
    } catch (err: any) {
      setGeneralError(err?.message || 'An unexpected error occurred during signup.');
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

      // Redirect to onboarding for new Google signups
      navigate({ view: 'onboarding', step: 1 });
    } catch (err: any) {
      setGeneralError('Google sign-in could not be completed.');
      setIsGoogleLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Create your student account"
      subtitle="Join over 50,000 students building verified workplace simulation portfolios."
      badgeText="Student Registration"
      alternateAction={{
        text: 'Already have an InternLab account?',
        actionLabel: 'Sign In',
        onAction: () => navigate({ view: 'login' }),
      }}
    >
      <div className="space-y-6">
        {/* Google Authentication */}
        <div>
          <GoogleSignInButton
            onClick={handleGoogleAuth}
            isLoading={isGoogleLoading}
            label="Sign up with Google"
            id="signup-google-btn"
          />

          <div className="relative flex items-center justify-center my-6">
            <div className="border-t border-[#E2E2DE] w-full" />
            <span className="bg-[#F9F8F6] px-3 text-[11px] font-mono uppercase tracking-wider text-[#8A8A85] relative">
              Or register with email
            </span>
          </div>
        </div>

        {/* Global Error Banner */}
        {generalError && (
          <div className="p-3 bg-[#FEF2F2] border border-[#FCA5A5] rounded-sm text-xs text-[#991B1B] flex items-start gap-2 animate-fadeIn">
            <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
            <span>{generalError}</span>
          </div>
        )}

        {/* Signup Form */}
        <form onSubmit={handleFormSubmit} className="space-y-4" noValidate>
          {/* Full Name */}
          <FormField
            label="Full Name"
            required
            error={fieldErrors.fullName}
            id="signup-fullname"
          >
            <Input
              id="signup-fullname-input"
              type="text"
              placeholder="e.g. Alex Chen"
              value={fullName}
              onChange={(e) => {
                setFullName(e.target.value);
                if (fieldErrors.fullName) {
                  setFieldErrors((prev) => ({ ...prev, fullName: '' }));
                }
              }}
              leftElement={<User className="w-4 h-4" />}
              error={Boolean(fieldErrors.fullName)}
              autoComplete="name"
              disabled={isLoading}
            />
          </FormField>

          {/* Email Address */}
          <FormField
            label="University or Personal Email"
            required
            helperText="University emails (.edu) receive instant academic verification."
            error={fieldErrors.email}
            id="signup-email"
          >
            <Input
              id="signup-email-input"
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
            label="Create Password"
            required
            error={fieldErrors.password}
            id="signup-password"
          >
            <Input
              id="signup-password-input"
              type={showPassword ? 'text' : 'password'}
              placeholder="Minimum 8 characters"
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
              autoComplete="new-password"
              disabled={isLoading}
            />
            {/* Password Strength Rubric */}
            <PasswordStrengthMeter password={password} />
          </FormField>

          {/* Confirm Password */}
          <FormField
            label="Confirm Password"
            required
            error={fieldErrors.confirmPassword}
            id="signup-confirm-password"
          >
            <Input
              id="signup-confirm-password-input"
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Re-enter your password"
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (fieldErrors.confirmPassword) {
                  setFieldErrors((prev) => ({ ...prev, confirmPassword: '' }));
                }
              }}
              leftElement={<Lock className="w-4 h-4" />}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="text-[#8A8A85] hover:text-[#1A1C1E] transition-colors focus:outline-none p-1"
                  tabIndex={-1}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
              error={Boolean(fieldErrors.confirmPassword)}
              autoComplete="new-password"
              disabled={isLoading}
            />
          </FormField>

          {/* Terms & Conditions Checkbox */}
          <div className="pt-2">
            <Checkbox
              id="signup-terms"
              checked={agreedToTerms}
              onChange={(e) => {
                setAgreedToTerms(e.target.checked);
                if (fieldErrors.terms) {
                  setFieldErrors((prev) => ({ ...prev, terms: '' }));
                }
              }}
              label={
                <span className="text-xs text-[#484B4F] leading-snug">
                  I agree to the{' '}
                  <span className="font-semibold text-[#1A1C1E] underline decoration-[#E2E2DE]">
                    Terms of Service
                  </span>{' '}
                  and acknowledge the{' '}
                  <span className="font-semibold text-[#1A1C1E] underline decoration-[#E2E2DE]">
                    Academic Integrity Code
                  </span>.
                </span>
              }
            />
            {fieldErrors.terms && (
              <p className="text-[11px] text-[#991B1B] font-medium mt-1 ml-6 flex items-center gap-1">
                <span className="w-1 h-1 rounded-full bg-[#991B1B]"></span>
                {fieldErrors.terms}
              </p>
            )}
          </div>

          {/* Submit CTA */}
          <div className="pt-4">
            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full justify-center text-sm font-semibold"
              isLoading={isLoading}
              id="signup-submit-btn"
            >
              <span>Create Account & Continue to Onboarding</span>
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};
