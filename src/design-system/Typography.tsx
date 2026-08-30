import React from 'react';

interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

/**
 * Editorial Display Heading (H1 / Hero)
 * High contrast, tight optical tracking, editorial authority.
 */
export const DisplayHeading: React.FC<TypographyProps> = ({
  children,
  className = '',
  as: Component = 'h1',
  ...props
}) => {
  return (
    <Component
      className={`text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-[-0.03em] text-[#1A1C1E] leading-[1.12] ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

/**
 * Page Heading (H2 / View Header)
 */
export const PageHeading: React.FC<TypographyProps> = ({
  children,
  className = '',
  as: Component = 'h2',
  ...props
}) => {
  return (
    <Component
      className={`text-2xl sm:text-3xl font-bold tracking-[-0.025em] text-[#1A1C1E] leading-[1.2] ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

/**
 * Section Heading (H3 / Group Title)
 */
export const SectionHeading: React.FC<TypographyProps> = ({
  children,
  className = '',
  as: Component = 'h3',
  ...props
}) => {
  return (
    <Component
      className={`text-lg sm:text-xl font-bold tracking-[-0.02em] text-[#1A1C1E] leading-[1.3] ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

/**
 * Card / Container Title (H4)
 */
export const CardTitle: React.FC<TypographyProps> = ({
  children,
  className = '',
  as: Component = 'h4',
  ...props
}) => {
  return (
    <Component
      className={`text-base font-semibold tracking-[-0.015em] text-[#1A1C1E] leading-[1.35] ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

interface BodyTextProps extends TypographyProps {
  size?: 'default' | 'small' | 'large';
  variant?: 'primary' | 'secondary' | 'muted' | 'inverse';
}

/**
 * Editorial Body Text
 * Constrained line-height, optical tracking, readability first.
 */
export const BodyText: React.FC<BodyTextProps> = ({
  children,
  className = '',
  size = 'default',
  variant = 'secondary',
  as: Component = 'p',
  ...props
}) => {
  const sizeClasses = {
    large: 'text-base sm:text-lg leading-[1.65]',
    default: 'text-sm sm:text-[15px] leading-[1.6]',
    small: 'text-xs sm:text-[13px] leading-[1.5]',
  }[size];

  const variantClasses = {
    primary: 'text-[#1A1C1E]',
    secondary: 'text-[#484B4F]',
    muted: 'text-[#8A8A85]',
    inverse: 'text-[#FFFFFF]',
  }[variant];

  return (
    <Component
      className={`${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

/**
 * Crisp Uppercase Label / Form Label
 */
export const Label: React.FC<TypographyProps & { required?: boolean }> = ({
  children,
  className = '',
  required = false,
  as: Component = 'label',
  ...props
}) => {
  return (
    <Component
      className={`text-[11px] sm:text-xs font-semibold uppercase tracking-[0.05em] text-[#1A1C1E] flex items-center gap-1 ${className}`}
      {...props}
    >
      {children}
      {required && <span className="text-[#991B1B] font-bold ml-0.5">*</span>}
    </Component>
  );
};

/**
 * Metadata Caption / Footnote
 */
export const Caption: React.FC<TypographyProps & { variant?: 'muted' | 'primary' | 'accent' }> = ({
  children,
  className = '',
  variant = 'muted',
  as: Component = 'span',
  ...props
}) => {
  const variantClass = {
    muted: 'text-[#8A8A85]',
    primary: 'text-[#484B4F]',
    accent: 'text-[#3E51FF]',
  }[variant];

  return (
    <Component
      className={`text-[11px] leading-[1.4] font-medium tracking-[0.01em] ${variantClass} ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};

/**
 * Monospace Code & Telemetry
 */
export const CodeText: React.FC<TypographyProps> = ({
  children,
  className = '',
  as: Component = 'code',
  ...props
}) => {
  return (
    <Component
      className={`font-mono text-xs px-1.5 py-0.5 rounded-sm bg-[#F2F1EE] text-[#1A1C1E] border border-[#E2E2DE] ${className}`}
      {...props}
    >
      {children}
    </Component>
  );
};
