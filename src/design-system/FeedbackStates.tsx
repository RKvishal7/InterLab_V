import React from 'react';
import { 
  AlertCircle, 
  CheckCircle2, 
  Info, 
  AlertTriangle, 
  X, 
  Search, 
  FolderOpen, 
  Inbox, 
  Compass, 
  ArrowRight,
  RefreshCw,
  FileCode2
} from 'lucide-react';
import { Button } from './Button';

/* ========================================================================= */
/* 1. EMPTY STATES                                                           */
/* ========================================================================= */

export interface EmptyStateProps {
  icon?: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
  secondaryActionLabel?: string;
  onSecondaryAction?: () => void;
  className?: string;
  compact?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  icon: Icon = Inbox,
  title,
  description,
  actionLabel,
  onAction,
  secondaryActionLabel,
  onSecondaryAction,
  className = '',
  compact = false,
}) => {
  return (
    <div
      className={`bg-white border border-[#E2E2DE] rounded-sm text-center flex flex-col items-center justify-center transition-all ${
        compact ? 'p-6 sm:p-8' : 'p-8 sm:p-12'
      } ${className}`}
      role="status"
    >
      <div className="w-12 h-12 rounded-sm bg-[#F2F1EE] border border-[#E2E2DE] text-[#8A8A85] flex items-center justify-center mb-4 shrink-0">
        <Icon className="w-6 h-6 stroke-[1.5]" />
      </div>

      <h3 className="text-base sm:text-lg font-bold text-[#1A1C1E] tracking-tight mb-1.5 max-w-md">
        {title}
      </h3>

      <p className="text-xs sm:text-sm text-[#5A5C60] leading-relaxed max-w-md mb-6">
        {description}
      </p>

      {(actionLabel || secondaryActionLabel) && (
        <div className="flex flex-wrap items-center justify-center gap-3">
          {secondaryActionLabel && onSecondaryAction && (
            <Button
              variant="secondary"
              size="sm"
              onClick={onSecondaryAction}
            >
              {secondaryActionLabel}
            </Button>
          )}
          {actionLabel && onAction && (
            <Button
              variant="primary"
              size="sm"
              onClick={onAction}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              {actionLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

/* ========================================================================= */
/* 2. SKELETON LOADERS                                                       */
/* ========================================================================= */

export const SkeletonText: React.FC<{
  lines?: number;
  className?: string;
  widths?: string[];
}> = ({ lines = 3, className = '', widths = ['100%', '85%', '60%'] }) => {
  return (
    <div className={`space-y-2 animate-pulse ${className}`} aria-hidden="true">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-3.5 bg-[#EAE8E1] rounded-xs"
          style={{ width: widths[i % widths.length] || '100%' }}
        />
      ))}
    </div>
  );
};

export const SkeletonCard: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`bg-white border border-[#E2E2DE] rounded-sm p-5 space-y-4 animate-pulse ${className}`} aria-hidden="true">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-xs bg-[#EAE8E1]" />
          <div className="w-24 h-3.5 bg-[#EAE8E1] rounded-xs" />
        </div>
        <div className="w-16 h-4 bg-[#EAE8E1] rounded-xs" />
      </div>

      <div className="space-y-2">
        <div className="w-3/4 h-5 bg-[#EAE8E1] rounded-xs" />
        <div className="w-full h-3.5 bg-[#EAE8E1] rounded-xs" />
        <div className="w-5/6 h-3.5 bg-[#EAE8E1] rounded-xs" />
      </div>

      <div className="flex gap-2 pt-1">
        <div className="w-12 h-4 bg-[#EAE8E1] rounded-xs" />
        <div className="w-16 h-4 bg-[#EAE8E1] rounded-xs" />
        <div className="w-14 h-4 bg-[#EAE8E1] rounded-xs" />
      </div>

      <div className="pt-4 border-t border-[#F2F1EE] flex items-center justify-between">
        <div className="w-20 h-4 bg-[#EAE8E1] rounded-xs" />
        <div className="w-24 h-8 bg-[#EAE8E1] rounded-xs" />
      </div>
    </div>
  );
};

export const SkeletonTable: React.FC<{ rows?: number; cols?: number; className?: string }> = ({
  rows = 5,
  cols = 4,
  className = '',
}) => {
  return (
    <div className={`bg-white border border-[#E2E2DE] rounded-sm overflow-hidden animate-pulse ${className}`} aria-hidden="true">
      <div className="bg-[#FAF9F7] border-b border-[#E2E2DE] p-4 flex gap-4">
        {Array.from({ length: cols }).map((_, c) => (
          <div key={c} className="h-4 bg-[#EAE8E1] rounded-xs flex-1" />
        ))}
      </div>
      <div className="divide-y divide-[#F2F1EE]">
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="p-4 flex gap-4 items-center">
            {Array.from({ length: cols }).map((_, c) => (
              <div
                key={c}
                className="h-3.5 bg-[#EAE8E1] rounded-xs flex-1"
                style={{ opacity: 1 - (c * 0.15) }}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

/* ========================================================================= */
/* 3. INLINE BANNER / ALERT NOTIFICATIONS                                    */
/* ========================================================================= */

export interface InlineBannerProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  title?: string;
  message: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  onDismiss?: () => void;
  className?: string;
}

export const InlineBanner: React.FC<InlineBannerProps> = ({
  variant = 'info',
  title,
  message,
  actionLabel,
  onAction,
  onDismiss,
  className = '',
}) => {
  const configs = {
    info: {
      bg: 'bg-[#EEF0FF]',
      border: 'border-[#C7D2FE]',
      textColor: 'text-[#1A1C1E]',
      iconColor: 'text-[#3E51FF]',
      icon: Info,
    },
    success: {
      bg: 'bg-[#F0FDFA]',
      border: 'border-[#CCFBF1]',
      textColor: 'text-[#115E59]',
      iconColor: 'text-[#0D9488]',
      icon: CheckCircle2,
    },
    warning: {
      bg: 'bg-[#FEFCE8]',
      border: 'border-[#FEF08A]',
      textColor: 'text-[#854D0E]',
      iconColor: 'text-[#CA8A04]',
      icon: AlertTriangle,
    },
    error: {
      bg: 'bg-[#FEF2F2]',
      border: 'border-[#FECACA]',
      textColor: 'text-[#991B1B]',
      iconColor: 'text-[#DC2626]',
      icon: AlertCircle,
    },
  };

  const config = configs[variant];
  const Icon = config.icon;

  return (
    <div
      role="alert"
      className={`border rounded-sm p-4 flex items-start gap-3 transition-all ${config.bg} ${config.border} ${className}`}
    >
      <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${config.iconColor}`} />
      
      <div className="flex-1 text-xs leading-relaxed min-w-0">
        {title && (
          <div className={`font-bold mb-0.5 ${config.textColor}`}>
            {title}
          </div>
        )}
        <div className={config.textColor}>
          {message}
        </div>
      </div>

      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="text-xs font-bold underline hover:opacity-80 transition-opacity shrink-0 self-center"
        >
          {actionLabel}
        </button>
      )}

      {onDismiss && (
        <button
          onClick={onDismiss}
          className="p-1 text-[#8A8A85] hover:text-[#1A1C1E] transition-colors shrink-0 -mr-1 -mt-1"
          aria-label="Dismiss notification"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      )}
    </div>
  );
};
