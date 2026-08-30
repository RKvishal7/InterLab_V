import React from 'react';
import { CheckCircle2, AlertCircle, Clock, Lock, Sparkles, Check, Flame } from 'lucide-react';
import { ExperienceLevel } from '../types';

export type StatusType = 
  | 'not-started' 
  | 'in-progress' 
  | 'submitted' 
  | 'reviewing' 
  | 'needs-revision' 
  | 'passed' 
  | 'completed' 
  | 'locked'
  | 'draft';

interface StatusLabelProps {
  status: StatusType | string;
  label?: string;
  size?: 'sm' | 'md';
  showDot?: boolean;
  className?: string;
}

/**
 * Semantic Status Label with colored dot and crisp borders
 */
export const StatusLabel: React.FC<StatusLabelProps> = ({
  status,
  label,
  size = 'md',
  showDot = true,
  className = '',
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'completed':
      case 'passed':
        return {
          text: label || 'Completed',
          bg: 'bg-[#F0FDFA]',
          border: 'border-[#CCFBF1]',
          textColor: 'text-[#115E59]',
          dotColor: 'bg-[#0D9488]',
          icon: CheckCircle2,
        };
      case 'in-progress':
      case 'in_progress':
        return {
          text: label || 'In Progress',
          bg: 'bg-[#EEF0FF]',
          border: 'border-[#C7D2FE]',
          textColor: 'text-[#3E51FF]',
          dotColor: 'bg-[#3E51FF]',
          icon: Clock,
        };
      case 'submitted':
      case 'reviewing':
        return {
          text: label || 'In Review',
          bg: 'bg-[#FEFCE8]',
          border: 'border-[#FEF08A]',
          textColor: 'text-[#854D0E]',
          dotColor: 'bg-[#CA8A04]',
          icon: Sparkles,
        };
      case 'needs-revision':
        return {
          text: label || 'Action Required',
          bg: 'bg-[#FEF2F2]',
          border: 'border-[#FECACA]',
          textColor: 'text-[#991B1B]',
          dotColor: 'bg-[#DC2626]',
          icon: AlertCircle,
        };
      case 'locked':
        return {
          text: label || 'Locked',
          bg: 'bg-[#F2F1EE]',
          border: 'border-[#E2E2DE]',
          textColor: 'text-[#8A8A85]',
          dotColor: 'bg-[#8A8A85]',
          icon: Lock,
        };
      case 'not-started':
      case 'draft':
      default:
        return {
          text: label || 'Draft',
          bg: 'bg-[#F2F1EE]',
          border: 'border-[#E2E2DE]',
          textColor: 'text-[#484B4F]',
          dotColor: 'bg-[#8A8A85]',
          icon: Clock,
        };
    }
  };

  const config = getStatusConfig();
  const sizeClasses = size === 'sm' 
    ? 'text-[10px] px-1.5 py-0.5 rounded-xs' 
    : 'text-xs px-2 py-0.5 rounded-sm';

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-medium border ${config.bg} ${config.border} ${config.textColor} ${sizeClasses} ${className}`}
    >
      {showDot && (
        <span className={`w-1.5 h-1.5 rounded-full ${config.dotColor} shrink-0`} />
      )}
      <span>{config.text}</span>
    </span>
  );
};

interface DifficultyBadgeProps {
  difficulty: ExperienceLevel | 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' | string;
  className?: string;
  showBars?: boolean;
}

/**
 * Career Simulation Difficulty Badge with visual rank indicators
 */
export const DifficultyBadge: React.FC<DifficultyBadgeProps> = ({
  difficulty,
  className = '',
  showBars = true,
}) => {
  const getDifficultyLevel = () => {
    switch (difficulty) {
      case 'Beginner':
        return { level: 1, text: 'Beginner' };
      case 'Intermediate':
        return { level: 2, text: 'Intermediate' };
      case 'Advanced':
        return { level: 3, text: 'Advanced' };
      case 'Expert':
        return { level: 4, text: 'Expert' };
      default:
        return { level: 1, text: difficulty };
    }
  };

  const { level, text } = getDifficultyLevel();

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-xs bg-[#F2F1EE] border border-[#E2E2DE] text-[#1A1C1E] text-[11px] font-medium tracking-tight ${className}`}
    >
      {showBars && (
        <span className="flex items-end gap-0.5 h-2.5">
          <span className={`w-0.5 h-1 rounded-2xs ${level >= 1 ? 'bg-[#1A1C1E]' : 'bg-[#CBCBC6]'}`} />
          <span className={`w-0.5 h-1.5 rounded-2xs ${level >= 2 ? 'bg-[#1A1C1E]' : 'bg-[#CBCBC6]'}`} />
          <span className={`w-0.5 h-2 rounded-2xs ${level >= 3 ? 'bg-[#1A1C1E]' : 'bg-[#CBCBC6]'}`} />
          <span className={`w-0.5 h-2.5 rounded-2xs ${level >= 4 ? 'bg-[#1A1C1E]' : 'bg-[#CBCBC6]'}`} />
        </span>
      )}
      <span>{text}</span>
    </span>
  );
};

interface ProgressIndicatorProps {
  progress: number; // 0 to 100
  totalSteps?: number;
  completedSteps?: number;
  label?: string;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

/**
 * Precision Progress Indicator
 */
export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  progress,
  totalSteps,
  completedSteps,
  label,
  showPercentage = true,
  size = 'md',
  className = '',
}) => {
  const clamped = Math.min(100, Math.max(0, progress));

  const heightClass = {
    sm: 'h-1',
    md: 'h-1.5',
    lg: 'h-2.5',
  }[size];

  return (
    <div className={`flex flex-col gap-1 w-full ${className}`}>
      {(label || showPercentage || totalSteps) && (
        <div className="flex items-center justify-between text-xs font-medium">
          {label && <span className="text-[#1A1C1E]">{label}</span>}
          <div className="flex items-center gap-2 ml-auto text-[#8A8A85] font-mono text-[11px]">
            {totalSteps !== undefined && completedSteps !== undefined && (
              <span>
                {completedSteps}/{totalSteps} tasks
              </span>
            )}
            {showPercentage && <span>{Math.round(clamped)}%</span>}
          </div>
        </div>
      )}
      <div className={`w-full bg-[#E2E2DE] rounded-pill overflow-hidden ${heightClass}`}>
        <div
          className="h-full bg-[#1A1C1E] transition-all duration-300 ease-out rounded-pill"
          style={{ width: `${clamped}%` }}
        />
      </div>
    </div>
  );
};

interface CompletionIndicatorProps {
  completed: boolean;
  score?: number; // 0 to 100
  verified?: boolean;
  className?: string;
}

/**
 * Verified Completion Marker / Rubric Seal
 */
export const CompletionIndicator: React.FC<CompletionIndicatorProps> = ({
  completed,
  score,
  verified = true,
  className = '',
}) => {
  if (!completed) {
    return (
      <span className={`inline-flex items-center gap-1 text-xs text-[#8A8A85] ${className}`}>
        <span className="w-2 h-2 rounded-full border border-[#CBCBC6]" />
        <span>Pending</span>
      </span>
    );
  }

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <div className="w-5 h-5 rounded-full bg-[#F0FDFA] border border-[#CCFBF1] text-[#115E59] flex items-center justify-center">
        <Check className="w-3 h-3 stroke-[3]" />
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-xs font-bold text-[#115E59]">Passed</span>
        {score !== undefined && (
          <span className="text-[11px] font-mono text-[#115E59]/80 font-semibold">
            ({score}/100)
          </span>
        )}
      </div>
    </div>
  );
};

interface ScoreBadgeProps {
  score: number;
  maxScore?: number;
  className?: string;
}

/**
 * Rubric Score Display Chip
 */
export const ScoreBadge: React.FC<ScoreBadgeProps> = ({
  score,
  maxScore = 100,
  className = '',
}) => {
  const percentage = (score / maxScore) * 100;
  let bg = 'bg-[#F2F1EE] text-[#1A1C1E] border-[#E2E2DE]';
  if (percentage >= 85) bg = 'bg-[#F0FDFA] text-[#115E59] border-[#CCFBF1]';
  else if (percentage >= 70) bg = 'bg-[#FEFCE8] text-[#854D0E] border-[#FEF08A]';
  else bg = 'bg-[#FEF2F2] text-[#991B1B] border-[#FECACA]';

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-sm border font-mono text-xs font-bold ${bg} ${className}`}
    >
      <span>{score}</span>
      <span className="text-[10px] opacity-70">/{maxScore}</span>
    </span>
  );
};

export interface BadgeProps {
  variant?: 'neutral' | 'brand' | 'success' | 'warning' | 'error';
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md';
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  children,
  className = '',
  size = 'md',
}) => {
  const variants = {
    neutral: 'bg-[#F2F1EE] text-[#484B4F] border-[#E2E2DE]',
    brand: 'bg-[#EEF0FF] text-[#3E51FF] border-[#C7D2FE]',
    success: 'bg-[#F0FDFA] text-[#115E59] border-[#CCFBF1]',
    warning: 'bg-[#FEFCE8] text-[#854D0E] border-[#FEF08A]',
    error: 'bg-[#FEF2F2] text-[#991B1B] border-[#FECACA]',
  };

  const sizes = {
    sm: 'text-[10px] px-1.5 py-0.5',
    md: 'text-xs px-2 py-0.5',
  };

  return (
    <span
      className={`inline-flex items-center font-mono font-medium rounded-xs border ${variants[variant]} ${sizes[size]} ${className}`}
    >
      {children}
    </span>
  );
};

