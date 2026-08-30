import React, { useState } from 'react';
import { 
  Clock, 
  BarChart2, 
  Layers, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  Eye, 
  Bookmark, 
  Sparkles, 
  ChevronRight, 
  UserCheck,
  Zap,
  FolderGit2
} from 'lucide-react';
import { VirtualInternship } from '../../types';
import { useApp } from '../../context/AppContext';

interface DiscoveryItemRowProps {
  internship: VirtualInternship;
  isEnrolled: boolean;
  isBookmarked: boolean;
  matchScore?: number;
  onPreview: (internship: VirtualInternship) => void;
  onEnroll: (internshipId: string) => void;
  onToggleBookmark: (internshipId: string) => void;
}

export const DiscoveryItemRow: React.FC<DiscoveryItemRowProps> = ({
  internship,
  isEnrolled,
  isBookmarked,
  matchScore,
  onPreview,
  onEnroll,
  onToggleBookmark,
}) => {
  const { navigate } = useApp();
  const [isHovered, setIsHovered] = useState(false);

  const projectsCount = internship.projectsCount || (internship.milestones.length > 0 ? internship.milestones.length : Math.max(3, internship.durationWeeks));

  // Determine track badge color accent
  const getTrackBadgeStyle = () => {
    switch (internship.trackId) {
      case 'software-engineering':
        return 'bg-blue-50 text-blue-800 border-blue-200';
      case 'data-science-ai':
      case 'artificial-intelligence':
        return 'bg-purple-50 text-purple-800 border-purple-200';
      case 'uiux-design':
        return 'bg-rose-50 text-rose-800 border-rose-200';
      case 'product-management':
        return 'bg-amber-50 text-amber-800 border-amber-200';
      case 'cloud-computing':
      case 'cloud-devops':
        return 'bg-cyan-50 text-cyan-800 border-cyan-200';
      case 'financial-analysis':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200';
      default:
        return 'bg-[#F2F1EE] text-[#484B4F] border-[#E2E2DE]';
    }
  };

  const getDifficultyBadge = () => {
    switch (internship.difficulty) {
      case 'Beginner':
        return 'text-emerald-700 bg-emerald-50 border-emerald-200';
      case 'Intermediate':
        return 'text-blue-700 bg-blue-50 border-blue-200';
      case 'Advanced':
        return 'text-purple-700 bg-purple-50 border-purple-200';
      default:
        return 'text-[#484B4F] bg-[#F2F1EE] border-[#E2E2DE]';
    }
  };

  return (
    <article
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative bg-white border rounded-lg transition-all duration-200 overflow-hidden ${
        isHovered
          ? 'border-[#1A1C1E] shadow-md -translate-y-0.5'
          : 'border-[#E2E2DE] hover:border-[#8A8A85] shadow-xs'
      }`}
      id={`internship-card-${internship.id}`}
    >
      {/* Top Meta Bar */}
      <div className="p-5 sm:p-6 pb-4">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          
          {/* Company & Track Tags */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Simulation Brand / Company */}
            <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#F9F8F6] border border-[#E2E2DE] rounded-xs text-xs font-semibold text-[#1A1C1E]">
              <Building2 className="w-3.5 h-3.5 text-[#8A8A85]" />
              <span>{internship.companyName}</span>
            </div>

            {/* Track Tag */}
            <span className={`px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider rounded-xs border ${getTrackBadgeStyle()}`}>
              {internship.trackId.replace(/-/g, ' ')}
            </span>

            {/* Pricing Tier */}
            <span className="text-[11px] px-2 py-0.5 rounded-xs font-medium bg-[#F9F8F6] text-[#5A5C60] border border-[#E2E2DE]">
              {internship.pricingTier === 'premium' ? 'Verified Pro' : 'Free Simulation'}
            </span>

            {/* Optional AI Match Score */}
            {matchScore && matchScore > 80 && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[11px] font-bold text-[#3E51FF] bg-[#EEF0FF] border border-[#C5CAFF] rounded-xs font-mono">
                <Sparkles className="w-3 h-3" />
                <span>{matchScore}% Match</span>
              </span>
            )}
          </div>

          {/* Bookmark & Enrolled status */}
          <div className="flex items-center gap-2">
            {isEnrolled && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-xs">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Enrolled</span>
              </span>
            )}
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(internship.id);
              }}
              className={`p-1.5 rounded-xs border transition-colors ${
                isBookmarked 
                  ? 'bg-amber-50 border-amber-200 text-amber-600' 
                  : 'bg-[#F9F8F6] border-[#E2E2DE] text-[#8A8A85] hover:text-[#1A1C1E] hover:bg-[#F2F1EE]'
              }`}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark simulation'}
              id={`bookmark-${internship.id}`}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-500' : ''}`} />
            </button>
          </div>
        </div>

        {/* Primary Title & Description */}
        <div className="mb-4">
          <h3 
            onClick={() => navigate({ view: 'internship-detail', internshipId: internship.id })}
            className="text-lg sm:text-xl font-bold tracking-tight text-[#1A1C1E] hover:text-[#3E51FF] cursor-pointer transition-colors leading-snug mb-2 flex items-center justify-between"
          >
            <span>{internship.title}</span>
            <ArrowRight className="w-4 h-4 text-[#8A8A85] group-hover:text-[#1A1C1E] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
          </h3>
          <p className="text-sm text-[#5A5C60] leading-relaxed line-clamp-2">
            {internship.summary}
          </p>
        </div>

        {/* Structured Spec Chips: Duration, Difficulty, Projects, Skills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 py-3 px-3.5 bg-[#F9F8F6] border border-[#E2E2DE] rounded-xs text-xs mb-4">
          <div className="flex items-center gap-1.5 text-[#484B4F]">
            <Clock className="w-3.5 h-3.5 text-[#3E51FF] shrink-0" />
            <span><strong>{internship.durationWeeks} Weeks</strong> ({internship.estimatedTotalHours}h)</span>
          </div>

          <div className="flex items-center gap-1.5 text-[#484B4F]">
            <BarChart2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span className={`px-1.5 py-0.5 rounded-xs border text-[11px] font-semibold ${getDifficultyBadge()}`}>
              {internship.difficulty}
            </span>
          </div>

          <div className="flex items-center gap-1.5 text-[#484B4F]">
            <Layers className="w-3.5 h-3.5 text-purple-600 shrink-0" />
            <span><strong>{projectsCount}</strong> Projects</span>
          </div>

          <div className="flex items-center gap-1.5 text-[#484B4F]">
            <Award className="w-3.5 h-3.5 text-amber-500 shrink-0" />
            <span>{internship.rating.toFixed(1)} ★ ({internship.graduatesCount.toLocaleString()})</span>
          </div>
        </div>

        {/* Skills Tag Row */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-[11px] font-mono text-[#8A8A85] uppercase mr-1">Skills:</span>
          {internship.toolsUsed.map((tool, idx) => (
            <span
              key={idx}
              className="text-xs px-2 py-0.5 bg-white border border-[#E2E2DE] text-[#1A1C1E] rounded-xs font-medium group-hover:border-[#C5CAFF] transition-colors"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* Interactive Hover Disclosure Banner */}
      <div 
        className={`px-5 sm:px-6 py-3 bg-[#FDFCFB] border-t border-[#E2E2DE] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 transition-all duration-200 ${
          isHovered ? 'bg-[#F9F8F6] border-[#1A1C1E]' : ''
        }`}
      >
        {/* Supervisor preview badge */}
        <div className="flex items-center gap-2 text-xs text-[#5A5C60]">
          <img 
            src={internship.supervisor.avatarUrl} 
            alt={internship.supervisor.name} 
            className="w-5 h-5 rounded-full object-cover border border-[#E2E2DE]"
            referrerPolicy="no-referrer"
          />
          <span>Led by <strong>{internship.supervisor.name}</strong> ({internship.supervisor.title})</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={() => onPreview(internship)}
            className="px-3 py-1.5 text-xs font-semibold text-[#484B4F] hover:text-[#1A1C1E] bg-white hover:bg-[#F2F1EE] border border-[#E2E2DE] rounded-xs transition-colors flex items-center gap-1.5"
            id={`quick-view-${internship.id}`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>

          {isEnrolled ? (
            <button
              onClick={() => navigate({ view: 'workspace', internshipId: internship.id })}
              className="px-3.5 py-1.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xs transition-colors flex items-center gap-1.5 shadow-xs"
              id={`continue-${internship.id}`}
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Continue</span>
            </button>
          ) : (
            <button
              onClick={() => onEnroll(internship.id)}
              className="px-4 py-1.5 text-xs font-semibold text-white bg-[#1A1C1E] hover:bg-black rounded-xs transition-colors flex items-center gap-1.5 shadow-xs group/btn"
              id={`start-simulation-${internship.id}`}
            >
              <span>Start Simulation</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
            </button>
          )}
        </div>
      </div>
    </article>
  );
};
