import React from 'react';
import { 
  Building2, 
  Clock, 
  Calendar, 
  ArrowRight, 
  CheckCircle2, 
  Play, 
  Compass, 
  Star, 
  Layers,
  Award,
  ExternalLink
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const MyInternshipsTab: React.FC = () => {
  const { internships, navigate } = useApp();

  const activeInternship = internships.find(i => i.id === 'intern-nova-frontend') || internships[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-200" id="my-internships-tab-view">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E2DE]">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#1A1C1E] tracking-tight">
            My Internships
          </h2>
          <p className="text-xs sm:text-sm text-[#5A5C60] mt-0.5">
            Manage your active simulated work experiences and review completed credentials.
          </p>
        </div>

        <button
          onClick={() => navigate({ view: 'discover' })}
          className="px-4 py-2 text-xs sm:text-sm font-semibold bg-[#1A1C1E] hover:bg-black text-white rounded-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto"
          id="explore-catalog-from-internships"
        >
          <Compass className="w-4 h-4" />
          <span>Explore Catalog</span>
        </button>
      </div>

      {/* Active Simulations */}
      <div>
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#8A8A85] mb-3">
          Active Simulations (1)
        </h3>

        <div className="bg-white border border-[#E2E2DE] rounded-lg p-5 shadow-xs hover:border-[#1A1C1E] transition-all">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 text-[11px] font-bold bg-blue-50 text-blue-800 border border-blue-200 rounded-xs uppercase">
                  Active
                </span>
                <span className="text-xs font-semibold text-[#5A5C60] flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-[#3E51FF]" />
                  <span>{activeInternship.companyName || 'Nova Labs'}</span>
                </span>
                <span className="text-xs text-[#8A8A85] font-mono">• 4 Weeks Duration</span>
              </div>

              <h4 className="text-lg font-bold text-[#1A1C1E]">
                {activeInternship.title}
              </h4>

              <p className="text-xs text-[#5A5C60] line-clamp-2 max-w-2xl">
                {activeInternship.description}
              </p>

              {/* Progress bar */}
              <div className="space-y-1.5 pt-2 max-w-md">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="font-semibold text-[#1A1C1E]">Week 3 of 4: Real Product Development</span>
                  <span className="font-bold text-[#3E51FF]">68% Completed</span>
                </div>
                <div className="w-full h-2 bg-[#F2F1EE] rounded-full overflow-hidden border border-[#E2E2DE]">
                  <div className="h-full bg-[#1A1C1E] rounded-full" style={{ width: '68%' }} />
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-2 shrink-0 justify-center">
              <button
                onClick={() => navigate({ view: 'workspace', internshipId: activeInternship.id })}
                className="px-5 py-2.5 bg-[#1A1C1E] hover:bg-black text-white text-xs sm:text-sm font-semibold rounded-xs transition-colors flex items-center justify-center gap-2 shadow-xs"
                id="resume-active-simulation-btn"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>Resume Simulation</span>
              </button>

              <button
                onClick={() => navigate({ view: 'internship-detail', internshipId: activeInternship.id })}
                className="px-4 py-2 bg-[#F9F8F6] hover:bg-[#F2F1EE] text-[#1A1C1E] text-xs font-semibold rounded-xs border border-[#E2E2DE] transition-colors flex items-center justify-center gap-1.5"
                id="view-experience-overview-btn"
              >
                <span>View Program Specs</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>
        </div>
      </div>

      {/* Completed Simulations */}
      <div>
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#8A8A85] mb-3">
          Completed Simulations (1)
        </h3>

        <div className="bg-[#FDFCFB] border border-[#E2E2DE] rounded-lg p-5 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 text-[11px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xs uppercase">
                  Completed ✓
                </span>
                <span className="text-xs font-semibold text-[#5A5C60]">
                  CloudScale Systems
                </span>
                <span className="text-xs text-[#8A8A85] font-mono">• Completed Aug 2026</span>
              </div>

              <h4 className="text-base font-bold text-[#1A1C1E]">
                Distributed Backend Engineering Simulation
              </h4>
              <p className="text-xs text-[#5A5C60] mt-0.5">
                Engineered high-throughput TypeScript ingestion validation & sliding-window rate limiters.
              </p>

              <div className="mt-2 flex items-center gap-3 text-xs">
                <span className="font-mono font-bold text-emerald-700">Final Score: 94% (Grade A)</span>
                <span className="text-[#8A8A85]">•</span>
                <span className="text-[#5A5C60]">18 Hours Logged</span>
              </div>
            </div>

            <button
              onClick={() => navigate({ view: 'dashboard', tab: 'certificates' })}
              className="px-4 py-2 bg-white hover:bg-[#F2F1EE] border border-[#E2E2DE] text-xs font-semibold text-[#1A1C1E] rounded-xs transition-colors flex items-center gap-1.5 self-start sm:self-auto shrink-0"
              id="view-completed-cert-btn"
            >
              <Award className="w-3.5 h-3.5 text-purple-600" />
              <span>View Certificate</span>
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
