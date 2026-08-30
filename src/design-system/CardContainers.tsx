import React from 'react';
import { 
  Building2, 
  Clock, 
  Star, 
  ArrowUpRight, 
  FileText, 
  CheckCircle2, 
  TrendingUp, 
  Award, 
  ExternalLink,
  ChevronRight,
  Sparkles,
  GitPullRequest
} from 'lucide-react';
import { CardTitle, BodyText, Label, Caption, CodeText } from './Typography';
import { Button, SecondaryButton, GhostButton } from './Button';
import { DifficultyBadge, StatusLabel, ProgressIndicator, ScoreBadge } from './StatusComponents';

export interface InternshipPreviewProps {
  id: string;
  title: string;
  companyName: string;
  companyTier?: 'Tier 1 Tech' | 'Top Tier Quant' | 'Global Enterprise' | 'High-Growth Startup';
  track: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  summary: string;
  durationWeeks: number;
  estimatedHours: number;
  rating: number;
  skills: string[];
  enrolled?: boolean;
  progress?: number;
  onSelect?: () => void;
  className?: string;
}

/**
 * Internship Preview Card
 * Structured, high-authority workplace simulation container
 */
export const InternshipPreviewCard: React.FC<InternshipPreviewProps> = ({
  title,
  companyName,
  companyTier = 'Tier 1 Tech',
  track,
  difficulty,
  summary,
  durationWeeks,
  estimatedHours,
  rating,
  skills,
  enrolled,
  progress = 0,
  onSelect,
  className = '',
}) => {
  return (
    <div className={`bg-[#FFFFFF] border border-[#E2E2DE] rounded-sm p-5 flex flex-col justify-between transition-all duration-150 hover:border-[#1A1C1E] group ${className}`}>
      <div>
        {/* Company & Tier Tag */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-6 h-6 rounded-xs bg-[#F2F1EE] border border-[#E2E2DE] flex items-center justify-center text-[#1A1C1E] text-xs font-bold shrink-0">
              {companyName.substring(0, 2).toUpperCase()}
            </div>
            <span className="text-xs font-bold text-[#1A1C1E] truncate">{companyName}</span>
            <span className="text-[10px] text-[#8A8A85] hidden sm:inline">• {companyTier}</span>
          </div>
          <DifficultyBadge difficulty={difficulty} />
        </div>

        {/* Title & Track */}
        <CardTitle className="mb-2 group-hover:text-[#3E51FF] transition-colors leading-snug">
          {title}
        </CardTitle>

        <p className="text-xs text-[#484B4F] line-clamp-2 leading-relaxed mb-4">
          {summary}
        </p>

        {/* Skills Tag Matrix */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {skills.slice(0, 3).map((skill, idx) => (
            <span
              key={idx}
              className="text-[11px] font-mono px-2 py-0.5 rounded-xs bg-[#F9F8F6] text-[#484B4F] border border-[#E2E2DE]"
            >
              {skill}
            </span>
          ))}
          {skills.length > 3 && (
            <span className="text-[11px] font-mono px-1.5 py-0.5 rounded-xs bg-[#F9F8F6] text-[#8A8A85] border border-[#E2E2DE]">
              +{skills.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Footer Details & Action */}
      <div className="pt-4 border-t border-[#F2F1EE] flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 text-xs text-[#8A8A85]">
          <span className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            {durationWeeks}w ({estimatedHours}h)
          </span>
          <span className="flex items-center gap-1 font-semibold text-[#1A1C1E]">
            <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
            {rating.toFixed(1)}
          </span>
        </div>

        <Button
          size="sm"
          variant={enrolled ? 'secondary' : 'primary'}
          onClick={onSelect}
          rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
        >
          {enrolled ? 'Resume' : 'View Brief'}
        </Button>
      </div>

      {enrolled && (
        <div className="mt-3 pt-2 border-t border-[#F2F1EE]">
          <ProgressIndicator progress={progress} size="sm" label="Simulation Progress" />
        </div>
      )}
    </div>
  );
};

export interface TaskItemRowProps {
  id: string;
  orderNumber: number;
  title: string;
  deliverableType: 'code' | 'document' | 'analysis' | 'presentation';
  estimatedMinutes: number;
  status: 'not-started' | 'in-progress' | 'submitted' | 'passed' | 'needs-revision';
  score?: number;
  onSelect?: () => void;
  active?: boolean;
  className?: string;
}

/**
 * Task Item Row: Dense, horizontal tabular workplace unit
 * Avoids nested floating cards for tasks
 */
export const TaskItemRow: React.FC<TaskItemRowProps> = ({
  orderNumber,
  title,
  deliverableType,
  estimatedMinutes,
  status,
  score,
  onSelect,
  active = false,
  className = '',
}) => {
  return (
    <div
      onClick={onSelect}
      className={`p-3.5 rounded-sm border transition-colors flex items-center justify-between gap-3 cursor-pointer ${
        active
          ? 'bg-[#F2F1EE] border-[#1A1C1E]'
          : 'bg-[#FFFFFF] border-[#E2E2DE] hover:border-[#CBCBC6] hover:bg-[#F9F8F6]'
      } ${className}`}
    >
      <div className="flex items-center gap-3 min-w-0">
        {/* Task index / state ring */}
        <div className="w-6 h-6 rounded-xs bg-[#F2F1EE] border border-[#E2E2DE] flex items-center justify-center text-xs font-mono font-bold text-[#1A1C1E] shrink-0">
          {orderNumber}
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h4 className="text-xs sm:text-sm font-semibold text-[#1A1C1E] truncate">
              {title}
            </h4>
            <span className="hidden sm:inline-block text-[10px] font-mono uppercase px-1.5 py-0.2 rounded-2xs bg-[#F2F1EE] text-[#484B4F] border border-[#E2E2DE]">
              {deliverableType}
            </span>
          </div>
          <div className="text-[11px] text-[#8A8A85] flex items-center gap-2 mt-0.5">
            <span>{estimatedMinutes} mins estimated</span>
            {score !== undefined && (
              <>
                <span>•</span>
                <span className="font-mono font-semibold text-[#115E59]">Score: {score}/100</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2.5 shrink-0">
        <StatusLabel status={status} size="sm" />
        <ChevronRight className="w-4 h-4 text-[#8A8A85]" />
      </div>
    </div>
  );
};

export interface AnalyticsPanelProps {
  label: string;
  value: string | number;
  delta?: { value: string; positive: boolean };
  caption?: string;
  icon?: React.ComponentType<{ className?: string }>;
  sparklineData?: number[];
  className?: string;
}

/**
 * Analytics Panel: Crisp, flat telemetry container with 1px borders
 */
export const AnalyticsPanel: React.FC<AnalyticsPanelProps> = ({
  label,
  value,
  delta,
  caption,
  icon: Icon,
  className = '',
}) => {
  return (
    <div className={`bg-[#FFFFFF] border border-[#E2E2DE] rounded-sm p-4 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-[#8A8A85]">
          {label}
        </span>
        {Icon && (
          <div className="p-1.5 rounded-xs bg-[#F2F1EE] text-[#1A1C1E] border border-[#E2E2DE]">
            <Icon className="w-3.5 h-3.5" />
          </div>
        )}
      </div>

      <div className="text-2xl font-bold text-[#1A1C1E] tracking-tight mb-1">
        {value}
      </div>

      <div className="flex items-center gap-2 text-xs">
        {delta && (
          <span className={`font-mono font-semibold flex items-center gap-0.5 ${
            delta.positive ? 'text-[#115E59]' : 'text-[#991B1B]'
          }`}>
            <TrendingUp className={`w-3 h-3 ${!delta.positive ? 'rotate-180' : ''}`} />
            {delta.value}
          </span>
        )}
        {caption && (
          <span className="text-[#8A8A85]">{caption}</span>
        )}
      </div>
    </div>
  );
};

export interface ProjectPreviewProps {
  title: string;
  internshipTitle: string;
  companyName: string;
  completedAt: string;
  score: number;
  summary: string;
  skills: string[];
  artifactUrl?: string;
  onViewArtifact?: () => void;
  className?: string;
}

/**
 * Project / Portfolio Deliverable Preview
 */
export const ProjectPreviewCard: React.FC<ProjectPreviewProps> = ({
  title,
  internshipTitle,
  companyName,
  completedAt,
  score,
  summary,
  skills,
  onViewArtifact,
  className = '',
}) => {
  return (
    <div className={`bg-[#FFFFFF] border border-[#E2E2DE] rounded-sm p-5 flex flex-col justify-between ${className}`}>
      <div>
        {/* Verification badge & Score */}
        <div className="flex items-center justify-between mb-3 pb-3 border-b border-[#F2F1EE]">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#3E51FF]" />
            <span className="text-xs font-bold text-[#1A1C1E]">Verified Proof of Work</span>
          </div>
          <ScoreBadge score={score} />
        </div>

        <div className="text-xs font-mono text-[#8A8A85] mb-1">
          {companyName} • {internshipTitle}
        </div>

        <CardTitle className="mb-2">
          {title}
        </CardTitle>

        <p className="text-xs text-[#484B4F] leading-relaxed mb-4">
          {summary}
        </p>

        <div className="flex flex-wrap gap-1 mb-4">
          {skills.map((skill, idx) => (
            <span
              key={idx}
              className="text-[10px] font-mono px-1.5 py-0.5 rounded-2xs bg-[#F9F8F6] text-[#1A1C1E] border border-[#E2E2DE]"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      <div className="pt-3 border-t border-[#F2F1EE] flex items-center justify-between text-xs text-[#8A8A85]">
        <span>Completed {new Date(completedAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}</span>
        <Button
          size="sm"
          variant="secondary"
          onClick={onViewArtifact}
          rightIcon={<ExternalLink className="w-3.5 h-3.5" />}
        >
          View Artifact
        </Button>
      </div>
    </div>
  );
};
