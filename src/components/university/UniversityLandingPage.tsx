import React from 'react';
import { 
  Building2, 
  GraduationCap, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  BarChart2, 
  Activity, 
  Briefcase, 
  FolderGit2, 
  Award, 
  Users, 
  Sparkles, 
  BookOpen, 
  Globe, 
  ChevronRight,
  TrendingUp,
  FileCheck2,
  Lock,
  Layers,
  Terminal
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { COLLEGE_FEATURES_LIST, COLLEGE_INSTITUTION_PROFILE, COLLEGE_OVERVIEW_METRICS } from '../../data/collegeData';

export const UniversityLandingPage: React.FC = () => {
  const { navigate } = useApp();

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1A1C1E]" id="university-landing-page">
      
      {/* Institutional Alert Bar */}
      <div className="bg-[#1A1C1E] text-white px-4 py-2 text-xs font-mono border-b border-[#333]">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-[#CCC]">InternLab for Higher Education & Career Centers</span>
            <span className="hidden sm:inline text-[#888]">• ABET & NACE Competency Aligned</span>
          </div>
          <button
            onClick={() => navigate({ view: 'college-dashboard' })}
            className="text-emerald-400 hover:text-emerald-300 font-bold flex items-center gap-1 transition-colors"
            id="btn-nav-to-college-dashboard-top"
          >
            <span>Launch Institutional Dashboard Demo</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 overflow-hidden border-b border-[#E2E2DE]">
        {/* Subtle grid watermark */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(#E2E2DE_1px,transparent_1px)] [background-size:20px_20px] opacity-60 pointer-events-none -mr-20 -mt-20"></div>

        <div className="max-w-5xl mx-auto space-y-8 relative z-10 text-center sm:text-left">
          
          {/* Institutional Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#FAF9F7] border border-[#D5D3CB] rounded-xs text-xs font-mono text-[#5A5C60] shadow-2xs">
            <Building2 className="w-3.5 h-3.5 text-[#1A1C1E]" />
            <span className="font-semibold text-[#1A1C1E]">Higher Education & Experiential Learning</span>
            <span className="text-[#8A8A85]">• Turnkey Virtual Internships</span>
          </div>

          {/* Core User Headline */}
          <div className="space-y-4 max-w-4xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1A1C1E] tracking-tight leading-[1.12]">
              Give Students Experience Before Graduation.
            </h1>
            
            {/* Core Explanation */}
            <p className="text-lg sm:text-xl text-[#5A5C60] leading-relaxed max-w-3xl">
              InternLab helps colleges and universities deliver practical, production-grade virtual work experience. Empower engineering, data, and design students with real-world sprints, automated rubric grading, and recruiter-verified portfolios.
            </p>
          </div>

          {/* Primary Action Row */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
            <button
              onClick={() => navigate({ view: 'college-dashboard' })}
              className="w-full sm:w-auto px-6 py-3.5 bg-[#1A1C1E] hover:bg-black text-white text-sm font-semibold rounded-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
              id="btn-explore-college-dashboard"
            >
              <span>Explore College Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate({ view: 'discover' })}
              className="w-full sm:w-auto px-6 py-3.5 bg-white hover:bg-[#FAF9F7] text-[#1A1C1E] border border-[#D5D3CB] text-sm font-semibold rounded-xs transition-colors flex items-center justify-center gap-2 shadow-2xs"
            >
              <BookOpen className="w-4 h-4 text-[#5A5C60]" />
              <span>Browse Simulation Catalog</span>
            </button>
          </div>

          {/* Key Quick Stats Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8 border-t border-[#E2E2DE]">
            <div className="p-4 bg-white border border-[#E2E2DE] rounded-xs shadow-2xs">
              <div className="text-2xl font-bold font-mono text-[#1A1C1E]">100%</div>
              <div className="text-xs text-[#5A5C60] mt-0.5">Project-Based Learning</div>
            </div>
            <div className="p-4 bg-white border border-[#E2E2DE] rounded-xs shadow-2xs">
              <div className="text-2xl font-bold font-mono text-emerald-700">88.4%</div>
              <div className="text-xs text-[#5A5C60] mt-0.5">Average Completion Rate</div>
            </div>
            <div className="p-4 bg-white border border-[#E2E2DE] rounded-xs shadow-2xs">
              <div className="text-2xl font-bold font-mono text-[#3E51FF]">3.4x</div>
              <div className="text-xs text-[#5A5C60] mt-0.5">Faster Graduate Placement</div>
            </div>
            <div className="p-4 bg-white border border-[#E2E2DE] rounded-xs shadow-2xs">
              <div className="text-2xl font-bold font-mono text-[#1A1C1E]">Zero</div>
              <div className="text-xs text-[#5A5C60] mt-0.5">Faculty Grading Burden</div>
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* FEATURES SECTION (Strict User Requirements)                               */}
      {/* ========================================================================= */}
      <section className="py-20 px-4 sm:px-6 max-w-6xl mx-auto space-y-16" id="university-features-section">
        
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#3E51FF]">
            Institutional Capabilities
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1A1C1E] tracking-tight">
            Engineered for Modern Academic & Career Centers
          </h2>
          <p className="text-sm sm:text-base text-[#5A5C60] leading-relaxed">
            Everything your institution needs to scale authentic industry experience across your entire student body without hiring hundreds of adjunct evaluators.
          </p>
        </div>

        {/* 5 Core Feature Cards (Virtual Internships, Student Progress Tracking, Skill Analytics, Project-Based Learning, Placement Preparation) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Feature 1: Virtual Internships */}
          <div className="bg-white border border-[#E2E2DE] hover:border-[#1A1C1E] p-6 rounded-lg shadow-xs transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xs bg-[#FAF9F7] border border-[#D5D3CB] flex items-center justify-center text-[#1A1C1E]">
                <Briefcase className="w-5 h-5 text-[#3E51FF]" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8A8A85]">Core Simulation</span>
                <h3 className="text-lg font-bold text-[#1A1C1E] mt-0.5">Virtual Internships</h3>
              </div>
              <p className="text-xs sm:text-sm text-[#5A5C60] leading-relaxed">
                Plug-and-play simulations modeled directly after real engineering, data science, and product design sprints at leading global companies.
              </p>
            </div>
            <div className="pt-3 border-t border-[#F2F1EE] flex items-center justify-between text-xs font-mono text-emerald-800 bg-emerald-50/60 p-2 rounded-xs border border-emerald-100 font-bold">
              <span>Ready for Curricular Integration</span>
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Feature 2: Student Progress Tracking */}
          <div className="bg-white border border-[#E2E2DE] hover:border-[#1A1C1E] p-6 rounded-lg shadow-xs transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xs bg-[#FAF9F7] border border-[#D5D3CB] flex items-center justify-center text-[#1A1C1E]">
                <Activity className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8A8A85]">Real-Time Telemetry</span>
                <h3 className="text-lg font-bold text-[#1A1C1E] mt-0.5">Student Progress Tracking</h3>
              </div>
              <p className="text-xs sm:text-sm text-[#5A5C60] leading-relaxed">
                Monitor individual student pace, weekly task completion rates, active work hours, and identify disengaged or at-risk students before they fall behind.
              </p>
            </div>
            <div className="pt-3 border-t border-[#F2F1EE] flex items-center justify-between text-xs font-mono text-[#5A5C60] bg-[#FAF9F7] p-2 rounded-xs border border-[#E2E2DE]">
              <span>Automated Inactivity Flags</span>
              <ShieldCheck className="w-3.5 h-3.5 text-[#1A1C1E]" />
            </div>
          </div>

          {/* Feature 3: Skill Analytics */}
          <div className="bg-white border border-[#E2E2DE] hover:border-[#1A1C1E] p-6 rounded-lg shadow-xs transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xs bg-[#FAF9F7] border border-[#D5D3CB] flex items-center justify-center text-[#1A1C1E]">
                <BarChart2 className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8A8A85]">Objective Assessment</span>
                <h3 className="text-lg font-bold text-[#1A1C1E] mt-0.5">Skill Analytics</h3>
              </div>
              <p className="text-xs sm:text-sm text-[#5A5C60] leading-relaxed">
                Aggregated cohort analytics measuring real technical competencies in JavaScript, Python, Data Analysis, and UI Design against current industry hiring bars.
              </p>
            </div>
            <div className="pt-3 border-t border-[#F2F1EE] flex items-center justify-between text-xs font-mono text-purple-900 bg-purple-50/60 p-2 rounded-xs border border-purple-100 font-bold">
              <span>ABET & NACE Rubric Mapped</span>
              <TrendingUp className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Feature 4: Project-Based Learning */}
          <div className="bg-white border border-[#E2E2DE] hover:border-[#1A1C1E] p-6 rounded-lg shadow-xs transition-all space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xs bg-[#FAF9F7] border border-[#D5D3CB] flex items-center justify-center text-[#1A1C1E]">
                <FolderGit2 className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8A8A85]">Applied Portfolio</span>
                <h3 className="text-lg font-bold text-[#1A1C1E] mt-0.5">Project-Based Learning</h3>
              </div>
              <p className="text-xs sm:text-sm text-[#5A5C60] leading-relaxed">
                Students write real code, debug edge cases, and author structured Problem-Approach-Solution case studies that auto-publish to their shareable public portfolio.
              </p>
            </div>
            <div className="pt-3 border-t border-[#F2F1EE] flex items-center justify-between text-xs font-mono text-[#5A5C60] bg-[#FAF9F7] p-2 rounded-xs border border-[#E2E2DE]">
              <span>4 Verified Deliverables / Track</span>
              <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
            </div>
          </div>

          {/* Feature 5: Placement Preparation */}
          <div className="bg-white border border-[#E2E2DE] hover:border-[#1A1C1E] p-6 rounded-lg shadow-xs transition-all space-y-4 flex flex-col justify-between md:col-span-2 lg:col-span-2">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xs bg-[#FAF9F7] border border-[#D5D3CB] flex items-center justify-center text-[#1A1C1E]">
                <Award className="w-5 h-5 text-emerald-700" />
              </div>
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8A8A85]">Career Center Acceleration</span>
                <h3 className="text-lg font-bold text-[#1A1C1E] mt-0.5">Placement Preparation</h3>
              </div>
              <p className="text-xs sm:text-sm text-[#5A5C60] leading-relaxed">
                Equip career advisors and department heads with one-click exportable talent dossiers, verified credentials, and comprehensive placement readiness reports to share with top campus recruiting partners.
              </p>
            </div>
            <div className="pt-3 border-t border-[#F2F1EE] flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-emerald-900 bg-emerald-50/60 p-2.5 rounded-xs border border-emerald-100 font-bold">
              <span>Ready for Employer Day, Career Fairs & Accreditation Audits</span>
              <button
                onClick={() => navigate({ view: 'college-dashboard', tab: 'reports' })}
                className="text-xs text-[#1A1C1E] underline hover:text-black font-semibold"
              >
                View Report Templates →
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* Institutional Callout Banner */}
      <section className="bg-[#1A1C1E] text-white py-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#2A2C30] border border-[#444] rounded-xs text-xs font-mono text-emerald-400">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Institutional Pilot Program Available</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Empower Your Next Graduating Class Today
          </h2>

          <p className="text-sm sm:text-base text-[#A0A2A8] max-w-2xl mx-auto leading-relaxed">
            Integrate with Canvas, Blackboard, or Handshake in under 15 minutes. See how top departments manage hundreds of active student simulations with zero manual grading friction.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => navigate({ view: 'college-dashboard' })}
              className="w-full sm:w-auto px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black font-bold text-sm rounded-xs transition-colors shadow-sm flex items-center justify-center gap-2"
              id="btn-launch-institutional-dashboard-cta"
            >
              <span>Launch College Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => navigate({ view: 'portfolio' })}
              className="w-full sm:w-auto px-6 py-3 bg-[#2A2C30] hover:bg-[#383A40] text-white font-semibold text-sm rounded-xs border border-[#444] transition-colors"
            >
              <span>View Example Student Portfolio</span>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
