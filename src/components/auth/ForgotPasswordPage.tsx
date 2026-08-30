import React, { useState } from 'react';
import { Mail, ArrowLeft, ArrowRight, CheckCircle2, AlertCircle, RefreshCw, KeyRound, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AuthLayout } from './AuthLayout';
import { Button, FormField, Input } from '../../design-system';

export const ForgotPasswordPage: React.FC = () => {
  const { resetPassword, navigate } = useApp();

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resendCountdown, setResendCountdown] = useState(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid academic or personal email address.');
      return;
    }

    setIsLoading(true);

    try {
      const res = await resetPassword({ email: email.trim() });
      if (res.error) {
        setError(res.error.message);
        setIsLoading(false);
        return;
      }

      setIsSuccess(true);
      setIsLoading(false);
      setResendCountdown(60);

      // Countdown timer for resend
      const interval = setInterval(() => {
        setResendCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } catch (err: any) {
      setError(err?.message || 'Unable to process reset request. Please retry.');
      setIsLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Reset your password"
      subtitle="Enter the verified email linked with your account. We'll send instructions to recover access."
      badgeText="Access Recovery"
      alternateAction={{
        text: 'Remembered your password?',
        actionLabel: 'Back to Sign In',
        onAction: () => navigate({ view: 'login' }),
      }}
    >
      <div className="space-y-6">
        {isSuccess ? (
          /* Confirmation Success State */
          <div className="space-y-6 animate-fadeIn">
            <div className="p-5 bg-[#F0FDF4] border border-[#BBF7D0] rounded-sm space-y-3 text-xs text-[#14532D]">
              <div className="flex items-center gap-2 font-semibold text-sm text-[#15803D]">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span>Recovery Instructions Dispatched</span>
              </div>
              <p className="leading-relaxed">
                We've transmitted a cryptographic one-time reset link to:
              </p>
              <div className="p-2.5 bg-[#FFFFFF] border border-[#BBF7D0] rounded-xs font-mono font-medium text-[#15803D] break-all">
                {email}
              </div>
              <p className="text-[11px] text-[#166534] leading-relaxed">
                The link expires in <strong>30 minutes</strong>. If you don't find it in your inbox within a couple minutes, please verify your spam or institutional promotions filter.
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <Button
                variant="primary"
                size="lg"
                className="w-full justify-center"
                onClick={() => navigate({ view: 'login' })}
                id="reset-back-to-login-btn"
              >
                <ArrowLeft className="w-4 h-4 mr-1.5" />
                <span>Return to Sign In</span>
              </Button>

              <div className="flex items-center justify-center pt-2 text-xs text-[#8A8A85]">
                {resendCountdown > 0 ? (
                  <span>Resend available in {resendCountdown}s</span>
                ) : (
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="flex items-center gap-1.5 font-medium text-[#1A1C1E] hover:text-[#3E51FF] underline underline-offset-2 decoration-[#E2E2DE] hover:decoration-[#3E51FF] transition-colors"
                    id="reset-resend-btn"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Did not receive email? Resend link</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          /* Input Form State */
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {error && (
              <div className="p-3 bg-[#FEF2F2] border border-[#FCA5A5] rounded-sm text-xs text-[#991B1B] flex items-start gap-2 animate-fadeIn">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <FormField
              label="Registered Email Address"
              required
              helperText="Enter the university or personal address you used during enrollment."
              error={error ? ' ' : undefined}
              id="reset-email"
            >
              <Input
                id="reset-email-input"
                type="email"
                placeholder="name@university.edu"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError(null);
                }}
                leftElement={<Mail className="w-4 h-4" />}
                autoComplete="email"
                disabled={isLoading}
                autoFocus
              />
            </FormField>

            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full justify-center text-sm font-semibold"
                isLoading={isLoading}
                id="reset-submit-btn"
              >
                <span>Send Secure Password Reset Link</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </div>

            <div className="p-3 bg-[#F2F1EE]/60 border border-[#E2E2DE] rounded-sm text-xs text-[#484B4F] flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-[#15803D] flex-shrink-0 mt-0.5" />
              <span className="leading-relaxed">
                Password reset requests are monitored and token-authenticated for student privacy and FERPA safety.
              </span>
            </div>
          </form>
        )}
      </div>
    </AuthLayout>
  );
};
