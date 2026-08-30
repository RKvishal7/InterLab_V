import React, { useState } from 'react';
import { 
  X, 
  Clock, 
  BarChart2, 
  Award, 
  CheckCircle2, 
  Briefcase, 
  Building2, 
  UserCheck, 
  Calendar, 
  BookOpen, 
  ChevronRight, 
  ArrowRight, 
  Sparkles, 
  Layers, 
  Check, 
  ShieldCheck, 
  Share2, 
  Bookmark, 
  ExternalLink 
} from 'lucide-react';
import { VirtualInternship } from '../../types';
import { useApp } from '../../context/AppContext';

interface InternshipPreviewModalProps {
  internship: VirtualInternship | null;
  onClose: () => void;
  onEnroll: (id: string) => void;
  isEnrolled: boolean;
  isBookmarked: boolean;
  onToggleBookmark: (id: string) => void;
}

export const InternshipPreviewModal: React.FC<InternshipPreviewModalProps> = ({
  internship,
  onClose,
  onEnroll,
  isEnrolled,
  isBookmarked,
  onToggleBookmark,
}) => {
  const { navigate } = useApp();
  const [activeTab, setActiveTab] = useState<'overview' | 'syllabus' | 'supervisor'>('overview');
  const [copied, setCopied] = useState(false);

  if (!internship) return null;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const projectsCount = internship.projectsCount || (internship.milestones.length > 0 ? internship.milestones.length : Math.max(3, internship.durationWeeks));

  return (
    <div 
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative bg-white rounded-lg shadow-2xl border border-[#E2E2DE] w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden text-[#1A1C1E] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
        id="internship-preview-modal"
      >
        {/* Modal Top Bar */}
        <div className="px-6 py-4 border-b border-[#E2E2DE] bg-[#FDFCFB] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <span className="px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider bg-[#F2F1EE] text-[#484B4F] border border-[#E2E2DE] rounded-xs">
              {internship.trackId.replace(/-/g, ' ')}
            </span>
            <span className="text-xs text-[#8A8A85] flex items-center gap-1 font-mono">
              <Building2 className="w-3.5 h-3.5" />
              {internship.companyName}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
              {internship.pricingTier === 'premium' ? 'Verified Pro' : 'Free Simulation'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onToggleBookmark(internship.id)}
              className={`p-2 rounded-xs border transition-colors ${
                isBookmarked 
                  ? 'bg-amber-50 border-amber-200 text-amber-700' 
                  : 'bg-white border-[#E2E2DE] text-[#8A8A85] hover:text-[#1A1C1E] hover:bg-[#F2F1EE]'
              }`}
              title={isBookmarked ? 'Remove bookmark' : 'Bookmark simulation'}
              id="modal-bookmark-button"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-amber-600' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-xs border border-[#E2E2DE] text-[#8A8A85] hover:text-[#1A1C1E] hover:bg-[#F2F1EE] transition-colors"
              title="Copy link"
              id="modal-share-button"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-xs border border-[#E2E2DE] text-[#8A8A85] hover:text-[#1A1C1E] hover:bg-[#F2F1EE] transition-colors"
              id="modal-close-button"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto px-6 py-6 space-y-6">
          {/* Header Title and Meta */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1C1E] mb-2 font-sans">
              {internship.title}
            </h2>
            <p className="text-[#5A5C60] text-sm sm:text-base leading-relaxed">
              {internship.summary}
            </p>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 bg-[#F9F8F6] border border-[#E2E2DE] rounded-md text-xs sm:text-sm">
            <div>
              <span className="text-[#8A8A85] text-xs block mb-0.5">Duration</span>
              <span className="font-semibold text-[#1A1C1E] flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-[#3E51FF]" />
                {internship.durationWeeks} Weeks ({internship.estimatedTotalHours}h total)
              </span>
            </div>
            <div>
              <span className="text-[#8A8A85] text-xs block mb-0.5">Experience Level</span>
              <span className="font-semibold text-[#1A1C1E] flex items-center gap-1.5">
                <BarChart2 className="w-3.5 h-3.5 text-emerald-600" />
                {internship.difficulty}
              </span>
            </div>
            <div>
              <span className="text-[#8A8A85] text-xs block mb-0.5">Projects / Deliverables</span>
              <span className="font-semibold text-[#1A1C1E] flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-purple-600" />
                {projectsCount} Structured Tasks
              </span>
            </div>
            <div>
              <span className="text-[#8A8A85] text-xs block mb-0.5">Graduates & Rating</span>
              <span className="font-semibold text-[#1A1C1E] flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-500" />
                {internship.rating.toFixed(2)} ★ ({internship.graduatesCount.toLocaleString()})
              </span>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-[#E2E2DE] text-sm">
            <button
              onClick={() => setActiveTab('overview')}
              className={`pb-2.5 px-3 font-medium transition-colors border-b-2 -mb-px ${
                activeTab === 'overview'
                  ? 'border-[#1A1C1E] text-[#1A1C1E] font-semibold'
                  : 'border-transparent text-[#8A8A85] hover:text-[#1A1C1E]'
              }`}
              id="modal-tab-overview"
            >
              Overview & Skills
            </button>
            <button
              onClick={() => setActiveTab('syllabus')}
              className={`pb-2.5 px-3 font-medium transition-colors border-b-2 -mb-px ${
                activeTab === 'syllabus'
                  ? 'border-[#1A1C1E] text-[#1A1C1E] font-semibold'
                  : 'border-transparent text-[#8A8A85] hover:text-[#1A1C1E]'
              }`}
              id="modal-tab-syllabus"
            >
              Simulation Syllabus
            </button>
            <button
              onClick={() => setActiveTab('supervisor')}
              className={`pb-2.5 px-3 font-medium transition-colors border-b-2 -mb-px ${
                activeTab === 'supervisor'
                  ? 'border-[#1A1C1E] text-[#1A1C1E] font-semibold'
                  : 'border-transparent text-[#8A8A85] hover:text-[#1A1C1E]'
              }`}
              id="modal-tab-supervisor"
            >
              Engineering Supervisor
            </button>
          </div>

          {/* Tab 1: Overview */}
          {activeTab === 'overview' && (
            <div className="space-y-5 animate-in fade-in duration-150">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8A8A85] mb-2 font-mono">
                  Detailed Simulation Context
                </h4>
                <p className="text-sm text-[#484B4F] leading-relaxed whitespace-pre-line">
                  {internship.detailedOverview || internship.summary}
                </p>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8A8A85] mb-2 font-mono">
                  Skills & Tools Mastered
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {internship.toolsUsed.map((tool, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 text-xs font-medium bg-[#F2F1EE] text-[#1A1C1E] border border-[#E2E2DE] rounded-xs"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#8A8A85] mb-2.5 font-mono">
                  What You Will Deliver & Learn
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {internship.whatYouWillLearn.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#484B4F] bg-[#FDFCFB] p-2.5 rounded-xs border border-[#E2E2DE]">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {internship.prerequisites && internship.prerequisites.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#8A8A85] mb-2 font-mono">
                    Recommended Prerequisites
                  </h4>
                  <ul className="list-disc list-inside text-xs sm:text-sm text-[#5A5C60] space-y-1">
                    {internship.prerequisites.map((p, idx) => (
                      <li key={idx}>{p}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Tab 2: Syllabus */}
          {activeTab === 'syllabus' && (
            <div className="space-y-3 animate-in fade-in duration-150">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#8A8A85] mb-2 font-mono">
                {internship.durationWeeks}-Week Structured Roadmap
              </h4>
              {internship.milestones.length > 0 ? (
                internship.milestones.map((m, idx) => (
                  <div 
                    key={m.id || idx}
                    className="p-3.5 bg-[#F9F8F6] border border-[#E2E2DE] rounded-xs hover:border-[#1A1C1E] transition-colors"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-bold font-mono text-[#3E51FF] uppercase">
                        Week {m.weekNumber}
                      </span>
                      <span className="text-[11px] text-[#8A8A85] font-mono">
                        {m.tasks.length} task{m.tasks.length === 1 ? '' : 's'}
                      </span>
                    </div>
                    <div className="font-semibold text-sm text-[#1A1C1E] mb-1">
                      {m.title}
                    </div>
                    <p className="text-xs text-[#5A5C60] mb-2 leading-relaxed">
                      {m.overview}
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {m.skillsTaught.map((skill, sIdx) => (
                        <span key={sIdx} className="text-[10px] px-1.5 py-0.5 bg-white border border-[#E2E2DE] rounded-xs text-[#484B4F]">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))
              ) : (
                <div className="space-y-3">
                  {Array.from({ length: internship.durationWeeks }).map((_, wIdx) => (
                    <div key={wIdx} className="p-3.5 bg-[#F9F8F6] border border-[#E2E2DE] rounded-xs">
                      <div className="text-xs font-bold font-mono text-[#3E51FF] uppercase mb-1">
                        Week {wIdx + 1}
                      </div>
                      <div className="font-semibold text-sm text-[#1A1C1E] mb-1">
                        {wIdx === 0 ? 'Foundation & Workplace Architecture Briefing' :
                         wIdx === 1 ? 'Core Feature Implementation & Live Testing' :
                         wIdx === 2 ? 'Edge-case Hardening & Code Review' :
                         `Executive Synthesis & Portfolio Presentation`}
                      </div>
                      <p className="text-xs text-[#5A5C60] leading-relaxed">
                        Complete realistic company deliverables, receive automated rubric feedback, and build verified portfolio artifacts.
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Supervisor */}
          {activeTab === 'supervisor' && (
            <div className="space-y-4 animate-in fade-in duration-150">
              <div className="flex items-start gap-4 p-4 bg-[#FDFCFB] border border-[#E2E2DE] rounded-xs">
                <img 
                  src={internship.supervisor.avatarUrl} 
                  alt={internship.supervisor.name}
                  className="w-14 h-14 rounded-xs object-cover border border-[#E2E2DE] shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <div className="font-bold text-base text-[#1A1C1E]">{internship.supervisor.name}</div>
                  <div className="text-xs text-[#5A5C60] mb-2">{internship.supervisor.title} • {internship.supervisor.department}</div>
                  <p className="text-xs text-[#484B4F] leading-relaxed mb-3">
                    {internship.supervisor.bio}
                  </p>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F2F1EE] border border-[#E2E2DE] rounded-xs text-[11px] text-[#1A1C1E]">
                    <Sparkles className="w-3.5 h-3.5 text-[#3E51FF]" />
                    <span>AI Feedback Persona: <strong>{internship.supervisor.communicationStyle.replace('_', ' ')}</strong></span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="px-6 py-4 bg-[#FDFCFB] border-t border-[#E2E2DE] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-3.5 py-2 text-xs sm:text-sm font-medium text-[#5A5C60] hover:text-[#1A1C1E] hover:bg-[#F2F1EE] rounded-xs transition-colors"
            >
              Close Preview
            </button>
            <button
              onClick={() => {
                onClose();
                navigate({ view: 'internship-detail', internshipId: internship.id });
              }}
              className="px-3.5 py-2 text-xs sm:text-sm font-semibold text-[#3E51FF] hover:text-[#1A1C1E] hover:bg-[#EEF0FF] rounded-xs transition-colors flex items-center gap-1.5 border border-[#C5CAFF]"
              id="modal-view-experience-page-button"
            >
              <span>View Full Experience Page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="flex items-center gap-3 justify-end">
            {isEnrolled ? (
              <button
                onClick={() => {
                  onClose();
                  navigate({ view: 'workspace', internshipId: internship.id });
                }}
                className="px-5 py-2.5 text-xs sm:text-sm font-semibold bg-emerald-600 hover:bg-emerald-700 text-white rounded-xs transition-colors flex items-center gap-2 shadow-xs"
                id="modal-continue-button"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Continue In Workspace</span>
              </button>
            ) : (
              <button
                onClick={() => onEnroll(internship.id)}
                className="px-6 py-2.5 text-xs sm:text-sm font-semibold bg-[#1A1C1E] hover:bg-black text-white rounded-xs transition-colors flex items-center gap-2 shadow-xs group"
                id="modal-enroll-button"
              >
                <span>Start Internship (Free)</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
