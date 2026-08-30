import React from 'react';
import { Check, X, ShieldCheck } from 'lucide-react';

interface PasswordStrengthMeterProps {
  password: string;
}

export const getPasswordStrength = (password: string) => {
  let score = 0;
  const checks = {
    length: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasNumber: /[0-9]/.test(password),
    hasSpecial: /[^A-Za-z0-9]/.test(password),
  };

  if (checks.length) score++;
  if (checks.hasUppercase) score++;
  if (checks.hasNumber) score++;
  if (checks.hasSpecial) score++;

  let label = 'Too short';
  let color = 'bg-[#E2E2DE]';
  let textColor = 'text-[#8A8A85]';

  if (password.length === 0) {
    label = 'Enter password';
    color = 'bg-[#E2E2DE]';
  } else if (score <= 1) {
    label = 'Weak';
    color = 'bg-[#DC2626]';
    textColor = 'text-[#DC2626]';
  } else if (score === 2) {
    label = 'Fair';
    color = 'bg-[#D97706]';
    textColor = 'text-[#D97706]';
  } else if (score === 3) {
    label = 'Good';
    color = 'bg-[#2563EB]';
    textColor = 'text-[#2563EB]';
  } else if (score === 4) {
    label = 'Strong';
    color = 'bg-[#15803D]';
    textColor = 'text-[#15803D]';
  }

  return { score, checks, label, color, textColor };
};

export const PasswordStrengthMeter: React.FC<PasswordStrengthMeterProps> = ({ password }) => {
  if (!password) return null;

  const { score, checks, label, color, textColor } = getPasswordStrength(password);

  return (
    <div className="mt-2.5 p-3 bg-[#F2F1EE]/60 border border-[#E2E2DE] rounded-sm space-y-2.5 text-xs transition-all">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 font-medium text-[#484B4F]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#8A8A85]" />
          <span>Security Strength</span>
        </div>
        <span className={`font-mono font-semibold text-[11px] uppercase tracking-wider ${textColor}`}>
          {label}
        </span>
      </div>

      {/* Progress Bars */}
      <div className="grid grid-cols-4 gap-1.5">
        {[1, 2, 3, 4].map((step) => (
          <div
            key={step}
            className={`h-1.5 rounded-xs transition-all duration-300 ${
              score >= step ? color : 'bg-[#E2E2DE]'
            }`}
          />
        ))}
      </div>

      {/* Criteria Checklist */}
      <div className="grid grid-cols-2 gap-x-2 gap-y-1.5 pt-1 text-[11px] text-[#484B4F]">
        <div className="flex items-center gap-1.5">
          {checks.length ? (
            <Check className="w-3 h-3 text-[#15803D] flex-shrink-0" />
          ) : (
            <div className="w-1.5 h-1.5 rounded-full bg-[#8A8A85] flex-shrink-0 ml-0.5 mr-1" />
          )}
          <span className={checks.length ? 'text-[#1A1C1E] font-medium' : 'text-[#8A8A85]'}>
            8+ characters
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {checks.hasUppercase ? (
            <Check className="w-3 h-3 text-[#15803D] flex-shrink-0" />
          ) : (
            <div className="w-1.5 h-1.5 rounded-full bg-[#8A8A85] flex-shrink-0 ml-0.5 mr-1" />
          )}
          <span className={checks.hasUppercase ? 'text-[#1A1C1E] font-medium' : 'text-[#8A8A85]'}>
            Uppercase letter
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {checks.hasNumber ? (
            <Check className="w-3 h-3 text-[#15803D] flex-shrink-0" />
          ) : (
            <div className="w-1.5 h-1.5 rounded-full bg-[#8A8A85] flex-shrink-0 ml-0.5 mr-1" />
          )}
          <span className={checks.hasNumber ? 'text-[#1A1C1E] font-medium' : 'text-[#8A8A85]'}>
            At least 1 number
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          {checks.hasSpecial ? (
            <Check className="w-3 h-3 text-[#15803D] flex-shrink-0" />
          ) : (
            <div className="w-1.5 h-1.5 rounded-full bg-[#8A8A85] flex-shrink-0 ml-0.5 mr-1" />
          )}
          <span className={checks.hasSpecial ? 'text-[#1A1C1E] font-medium' : 'text-[#8A8A85]'}>
            Special character
          </span>
        </div>
      </div>
    </div>
  );
};
