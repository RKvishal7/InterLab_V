import React from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Clock, 
  BarChart2, 
  Layers, 
  Building2, 
  Award,
  ChevronRight
} from 'lucide-react';
import { VirtualInternship } from '../../types';
import { useApp } from '../../context/AppContext';

interface DiscoveryRecommendedSectionProps {
  recommendedInternships: (VirtualInternship & { matchScore?: number })[];
  onPreview: (internship: VirtualInternship) => void;
  onEnroll: (id: string) => void;
}

export const DiscoveryRecommendedSection: React.FC<DiscoveryRecommendedSectionProps> = ({
  recommendedInternships,
  onPreview,
  onEnroll,
}) => {
  const { userProfile, navigate } = useApp();

  if (recommendedInternships.length === 0) return null;

  return (
    <section className="mb-8 p-5 sm:p-6 bg-gradient-to-br from-[#FDFCFB] via-[#F6F5F2] to-[#EEF0FF] border border-[#C5CAFF] rounded-lg shadow-xs relative overflow-hidden">
      {/* Background Decorative Accent */}
      <div className="absolute top-0 right-0 -mt-8 -mr-8 w-48 h-48 bg-[#3E51FF]/5 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-xs bg-[#1A1C1E] text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          </div>
          <div>
            <h2 className="text-base sm:text-lg font-bold text-[#1A1C1E] tracking-tight">
              Recommended for You
            </h2>
            <p className="text-xs text-[#5A5C60]">
              Personalized based on your target skills, career interests, and current academic profile.
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate({ view: 'recommended-internships' })}
          className="text-xs font-semibold text-[#3E51FF] hover:text-[#1A1C1E] flex items-center gap-1 self-start sm:self-auto transition-colors"
          id="view-all-recommendations-button"
        >
          <span>Deep Match Breakdown</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Recommended Spotlight Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {recommendedInternships.slice(0, 3).map((internship, index) => {
          const isEnrolled = !!userProfile.enrolledInternships[internship.id];
          const projectsCount = internship.projectsCount || (internship.milestones.length > 0 ? internship.milestones.length : internship.durationWeeks);

          return (
            <div
              key={internship.id}
              onClick={() => onPreview(internship)}
              className="group bg-white border border-[#E2E2DE] hover:border-[#3E51FF] p-4 rounded-md shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
              id={`recommended-card-${internship.id}`}
            >
              <div>
                {/* Match percentage badge + company */}
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <span className="text-xs font-semibold text-[#1A1C1E] flex items-center gap-1 truncate">
                    <Building2 className="w-3.5 h-3.5 text-[#8A8A85] shrink-0" />
                    <span className="truncate">{internship.companyName}</span>
                  </span>

                  <span className="px-2 py-0.5 text-[11px] font-bold text-[#3E51FF] bg-[#EEF0FF] border border-[#C5CAFF] rounded-xs font-mono shrink-0">
                    {internship.matchScore || (96 - index * 3)}% Match
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-[#1A1C1E] group-hover:text-[#3E51FF] transition-colors line-clamp-1 mb-1.5">
                  {internship.title}
                </h3>

                <p className="text-xs text-[#5A5C60] line-clamp-2 mb-3 leading-relaxed">
                  {internship.summary}
                </p>

                {/* Specs */}
                <div className="flex items-center gap-3 text-[11px] text-[#484B4F] mb-3 bg-[#F9F8F6] p-2 rounded-xs border border-[#E2E2DE]">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-[#3E51FF]" />
                    {internship.durationWeeks}W
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <BarChart2 className="w-3 h-3 text-emerald-600" />
                    {internship.difficulty}
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Layers className="w-3 h-3 text-purple-600" />
                    {projectsCount} Projects
                  </span>
                </div>
              </div>

              {/* Action */}
              <div className="pt-2 border-t border-[#E2E2DE] flex items-center justify-between text-xs">
                <span className="text-[11px] font-medium text-[#8A8A85]">
                  {internship.toolsUsed.slice(0, 2).join(', ')}
                </span>

                <span className="font-semibold text-[#1A1C1E] group-hover:text-[#3E51FF] flex items-center gap-1">
                  <span>{isEnrolled ? 'Open' : 'View'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
