import React from 'react';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'destructive' | 'accent';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

/**
 * High-Precision Geometric Button Component
 * Avoids default pill-shapes, uses crisp 3px-4px radii with clean optical contrast.
 */
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  ...props
}, ref) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-150 select-none focus:outline-none focus:ring-2 focus:ring-[#1A1C1E]/20 active:scale-[0.99] disabled:opacity-50 disabled:pointer-events-none disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-1.5 rounded-xs gap-1.5 min-h-[30px]',
    md: 'text-xs sm:text-sm px-3.5 py-2 rounded-sm gap-2 min-h-[36px]',
    lg: 'text-sm sm:text-base px-5 py-2.5 rounded-sm gap-2.5 min-h-[44px]',
  }[size];

  const variantStyles = {
    primary: 'bg-[#1A1C1E] text-white hover:bg-[#000000] border border-[#1A1C1E] shadow-xs active:bg-[#0F1011]',
    accent: 'bg-[#3E51FF] text-white hover:bg-[#2D3FE6] border border-[#3E51FF] shadow-xs active:bg-[#1E2FC7]',
    secondary: 'bg-white text-[#1A1C1E] hover:bg-[#F2F1EE] border border-[#E2E2DE] shadow-xs active:bg-[#EAEAE6]',
    ghost: 'bg-transparent text-[#484B4F] hover:text-[#1A1C1E] hover:bg-[#F2F1EE] border border-transparent active:bg-[#EAEAE6]',
    destructive: 'bg-[#FEF2F2] text-[#991B1B] hover:bg-[#FEE2E2] border border-[#FECACA] shadow-xs active:bg-[#FCA5A5]/30',
  }[variant];

  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      ref={ref}
      className={`${baseStyles} ${sizeStyles} ${variantStyles} ${widthStyle} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 animate-spin text-current" />
      ) : (
        leftIcon && <span className="shrink-0">{leftIcon}</span>
      )}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
    </button>
  );
});

Button.displayName = 'Button';

export const PrimaryButton: React.FC<ButtonProps> = (props) => <Button variant="primary" {...props} />;
export const SecondaryButton: React.FC<ButtonProps> = (props) => <Button variant="secondary" {...props} />;
export const GhostButton: React.FC<ButtonProps> = (props) => <Button variant="ghost" {...props} />;
export const DestructiveButton: React.FC<ButtonProps> = (props) => <Button variant="destructive" {...props} />;
export const AccentButton: React.FC<ButtonProps> = (props) => <Button variant="accent" {...props} />;

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: ButtonVariant;
  label: string;
}

/**
 * Geometric Icon Button (Square 1:1 Aspect Ratio)
 */
export const IconButton = React.forwardRef<HTMLButtonElement, IconButtonProps>(({
  icon,
  size = 'md',
  variant = 'secondary',
  label,
  className = '',
  disabled,
  ...props
}, ref) => {
  const sizeStyles = {
    sm: 'w-7 h-7 text-xs rounded-xs',
    md: 'w-9 h-9 text-sm rounded-sm',
    lg: 'w-11 h-11 text-base rounded-sm',
  }[size];

  const variantStyles = {
    primary: 'bg-[#1A1C1E] text-white hover:bg-black border border-[#1A1C1E]',
    accent: 'bg-[#3E51FF] text-white hover:bg-[#2D3FE6] border border-[#3E51FF]',
    secondary: 'bg-white text-[#1A1C1E] hover:bg-[#F2F1EE] border border-[#E2E2DE]',
    ghost: 'bg-transparent text-[#484B4F] hover:text-[#1A1C1E] hover:bg-[#F2F1EE] border border-transparent',
    destructive: 'bg-[#FEF2F2] text-[#991B1B] hover:bg-[#FEE2E2] border border-[#FECACA]',
  }[variant];

  return (
    <button
      ref={ref}
      aria-label={label}
      title={label}
      className={`inline-flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-[#1A1C1E]/20 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed ${sizeStyles} ${variantStyles} ${className}`}
      disabled={disabled}
      {...props}
    >
      {icon}
    </button>
  );
});

IconButton.displayName = 'IconButton';
