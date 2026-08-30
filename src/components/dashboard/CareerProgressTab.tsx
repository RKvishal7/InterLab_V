import React, { useState } from 'react';
import { 
  TrendingUp, 
  Target, 
  Award, 
  CheckCircle2, 
  Sparkles, 
  Briefcase,
  ChevronRight,
  GitBranch,
  Code2,
  Cpu,
  Layers,
  ArrowUpRight,
  Calendar,
  ShieldCheck,
  Zap,
  ExternalLink,
  Copy,
  Check,
  Flame,
  Clock,
  Compass,
  FileCheck,
  BarChart3
} from 'lucide-react';
import { SkillsGrowthChart } from './SkillsGrowthChart';
import { useApp } from '../../context/AppContext';

interface SkillItem {
  name: string;
  score: number;
  previousScore: number;
  delta: number;
  category: string;
  status: 'Advanced' | 'Proficient' | 'Developing';
  description: string;
  verifiedEvidence: string;
  icon: React.ElementType;
}

interface CompletedProject {
  id: string;
  name: string;
  internship: string;
  role: string;
  skillsUsed: string[];
  score: number;
  scoreGrade: 'Exemplary' | 'Proficient';
  completionDate: string;
  summary: string;
  rubricBreakdown: {
    problemSolving: number;
    codeStructure: number;
    uiUx: number;
  };
  resumeBullet: string;
}

interface InternshipHistoryItem {
  id: string;
  company: string;
  track: string;
  status: 'Active' | 'Completed';
  period: string;
  duration: string;
  mentor: {
    name: string;
    title: string;
    initials: string;
  };
  scoreAverage: number;
  completedTasks: number;
  totalTasks: number;
  certificateId?: string;
  accomplishments: string[];
}

export const CareerProgressTab: React.FC = () => {
  const { navigate, openMentor } = useApp();
  const [copiedResumeId, setCopiedResumeId] = useState<string | null>(null);
  const [selectedSkillFilter, setSelectedSkillFilter] = useState<'all' | 'languages' | 'practices'>('all');
  const [activeProjectDetail, setActiveProjectDetail] = useState<CompletedProject | null>(null);

  // 1. Skill Development Data with Exact Requested Percentages
  const skillsData: SkillItem[] = [
    {
      name: 'Git',
      score: 81,
      previousScore: 75,
      delta: 6,
      category: 'practices',
      status: 'Advanced',
      description: 'Feature branching hygiene, conventional commit formatting, pull request decomposition, and clean merge conflict resolution.',
      verifiedEvidence: 'PR #14 & PR #8 peer reviewed with zero merge regressions across 12 branch commits.',
      icon: GitBranch
    },
    {
      name: 'Problem Solving',
      score: 76,
      previousScore: 64,
      delta: 12,
      category: 'practices',
      status: 'Proficient',
      description: 'Algorithmic state handling, edge case mitigation, quantity bound constraints, and defensive input parsing.',
      verifiedEvidence: 'Scored 90/100 on Sprint 3 problem solving rubric for inventory math & edge case handling.',
      icon: Cpu
    },
    {
      name: 'JavaScript',
      score: 72,
      previousScore: 64,
      delta: 8,
      category: 'languages',
      status: 'Proficient',
      description: 'Modern ES6+ syntax, asynchronous control flow (async/await, Promise chains), closures, array reductions, and event delegation.',
      verifiedEvidence: 'Authored pure business logic functions with zero runtime exceptions in automated test suites.',
      icon: Code2
    },
    {
      name: 'UI Development',
      score: 69,
      previousScore: 58,
      delta: 11,
      category: 'languages',
      status: 'Developing',
      description: 'Responsive CSS Grid & Flexbox layouts, fluid clamp() typography, semantic HTML5, and WCAG 2.1 AA color contrast compliance.',
      verifiedEvidence: 'Built 5 breakpoint adaptive layout with 98+ Lighthouse desktop accessibility score.',
      icon: Layers
    },
    {
      name: 'React',
      score: 64,
      previousScore: 46,
      delta: 18,
      category: 'languages',
      status: 'Developing',
      description: 'Functional component architecture, unidirectional data flow, custom hooks, memoization, and controlled interactive forms.',
      verifiedEvidence: '18% improvement observed after refactoring interactive catalog state and custom swatches in Sprint 2.',
      icon: Zap
    }
  ];

  // 2. Completed Project Portfolio
  const completedProjects: CompletedProject[] = [
    {
      id: 'proj-ecom',
      name: 'Responsive E-commerce Product Page',
      internship: 'Nova Labs • Frontend Engineering Track',
      role: 'Frontend Developer Simulation',
      skillsUsed: ['React 18', 'TypeScript', 'Tailwind CSS', 'WCAG AA Accessibility', 'State Management'],
      score: 84,
      scoreGrade: 'Proficient',
      completionDate: 'August 28, 2026',
      summary: 'Crafted a production-ready responsive product detail view featuring dynamic color swatch synchronization, inventory stock bounds, accessible tab groups, and sticky mobile purchase CTAs.',
      rubricBreakdown: {
        problemSolving: 90,
        codeStructure: 85,
        uiUx: 78
      },
      resumeBullet: 'Architected responsive e-commerce product engine with dynamic state synchronization across multi-tiered color swatches and inventory constraints, verified against WCAG AA standards.'
    },
    {
      id: 'proj-grid',
      name: 'Administrative Inventory Data Grid',
      internship: 'Nova Labs • Frontend Engineering Track',
      role: 'Frontend Developer Simulation',
      skillsUsed: ['React 18', 'TypeScript', 'Data Tables', 'Debounce Search', 'Git PR Workflow'],
      score: 94,
      scoreGrade: 'Exemplary',
      completionDate: 'August 18, 2026',
      summary: 'Built high-throughput administrative inventory table managing 500+ SKU records with client-side sorting, debounce search, status filtering, and slide-over edit sheets.',
      rubricBreakdown: {
        problemSolving: 96,
        codeStructure: 94,
        uiUx: 92
      },
      resumeBullet: 'Engineered high-performance React data grid supporting client-side filtering across 500+ items with sub-16ms debounce queries and accessible keyboard navigation.'
    },
    {
      id: 'proj-telemetry',
      name: 'REST API Weather & Telemetry Widget',
      internship: 'CloudScale Systems • Full-Stack Simulation',
      role: 'Full-Stack Engineering Simulation',
      skillsUsed: ['JavaScript (ES6+)', 'REST API', 'Async/Await', 'Error Boundaries', 'CSS Grid'],
      score: 92,
      scoreGrade: 'Exemplary',
      completionDate: 'August 05, 2026',
      summary: 'Developed real-time telemetry card fetching multi-source weather data with optimistic caching, retry backoff algorithms, and graceful network failure states.',
      rubricBreakdown: {
        problemSolving: 94,
        codeStructure: 90,
        uiUx: 92
      },
      resumeBullet: 'Created resilient REST API client with exponential backoff retries and optimistic local caching, reducing redundant network requests by 40% during peak simulation workloads.'
    },
    {
      id: 'proj-checkout',
      name: 'Interactive Checkout & Promo Calculator',
      internship: 'FinTech Global • Enterprise Web Track',
      role: 'Enterprise Web Simulation',
      skillsUsed: ['JavaScript', 'Problem Solving', 'Unit Testing', 'Input Sanitization', 'Git'],
      score: 88,
      scoreGrade: 'Proficient',
      completionDate: 'July 22, 2026',
      summary: 'Engineered robust pricing and tiered discount calculation module with strict floating-point decimal rounding rules, promo code validation, and regression unit tests.',
      rubricBreakdown: {
        problemSolving: 92,
        codeStructure: 86,
        uiUx: 86
      },
      resumeBullet: 'Authored deterministic discount and tax calculation engine with 100% unit test coverage across 24 edge-case promotional scenarios in enterprise checkout flow.'
    }
  ];

  // 3. Internship History Timeline
  const internshipHistory: InternshipHistoryItem[] = [
    {
      id: 'intern-nova',
      company: 'Nova Labs',
      track: 'Frontend Engineering Track',
      status: 'Active',
      period: 'Aug 2026 – Present',
      duration: '3 weeks in progress',
      mentor: {
        name: 'Sarah Chen',
        title: 'Staff Frontend Mentor',
        initials: 'SC'
      },
      scoreAverage: 89,
      completedTasks: 3,
      totalTasks: 4,
      accomplishments: [
        'Implemented responsive product customization engine with dynamic stock boundaries.',
        'Refactored data table with accessible keyboard shortcuts and debounce filtering.',
        'Resolved 3 critical mentor rubric observations regarding ARIA tags and color contrast.'
      ]
    },
    {
      id: 'intern-cloudscale',
      company: 'CloudScale Systems',
      track: 'Full-Stack Engineering Simulation',
      status: 'Completed',
      period: 'July 2026 – Aug 2026',
      duration: '4 weeks',
      mentor: {
        name: 'David Vance',
        title: 'Principal Systems Architect',
        initials: 'DV'
      },
      scoreAverage: 92,
      completedTasks: 4,
      totalTasks: 4,
      certificateId: 'CS-FE-2026-904',
      accomplishments: [
        'Built real-time telemetry REST API client with exponential backoff handling.',
        'Authored system architecture decision record (ADR) for caching layer.',
        'Awarded Exemplary Rating (92/100) on final mentor graduation evaluation.'
      ]
    },
    {
      id: 'intern-fintech',
      company: 'FinTech Global',
      track: 'Enterprise React & State Architecture',
      status: 'Completed',
      period: 'June 2026 – July 2026',
      duration: '3 weeks',
      mentor: {
        name: 'Elena Rostova',
        title: 'VP Engineering',
        initials: 'ER'
      },
      scoreAverage: 88,
      completedTasks: 3,
      totalTasks: 3,
      certificateId: 'FG-ER-2026-112',
      accomplishments: [
        'Engineered enterprise currency formatting and promo calculation engine.',
        'Established regression test suite validating 24 financial edge cases.',
        'Completed all deliverables within sprint turnaround timeline.'
      ]
    }
  ];

  const handleCopyBullet = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedResumeId(id);
    setTimeout(() => setCopiedResumeId(null), 2000);
  };

  const filteredSkills = skillsData.filter(s => {
    if (selectedSkillFilter === 'languages') return s.category === 'languages';
    if (selectedSkillFilter === 'practices') return s.category === 'practices';
    return true;
  });

  return (
    <div className="space-y-8 animate-in fade-in duration-200 pb-12" id="career-progress-page-root">
      
      {/* =========================================================================
          1. PAGE HEADER (Matches Required Title & Subtext)
          ========================================================================= */}
      <div className="pb-5 border-b border-[#E2E2DE] flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 text-[11px] font-mono font-bold uppercase tracking-wider bg-[#1A1C1E] text-white rounded-xs">
              Career Trajectory
            </span>
            <span className="text-xs font-mono text-[#5A5C60]">
              Verified by Industry Rubrics
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A1C1E] tracking-tight">
            Your Career Progress
          </h1>
          <p className="text-sm sm:text-base text-[#5A5C60] mt-1 max-w-2xl">
            Track the skills and experience you're building.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => openMentor({
              view: 'dashboard',
              contextTitle: 'Career Progress & Level Advancement',
              initialPrompt: 'Can you analyze my current skill growth (Git: 81%, React: 64%, JS: 72%) and provide guidance on what to focus on to reach the Intermediate level?'
            })}
            className="px-3.5 py-2 bg-white hover:bg-[#EEF0FF] text-[#1A1C1E] hover:text-[#3E51FF] text-xs font-bold rounded-xs border border-[#D5D3CB] hover:border-[#C5CAFF] transition-colors flex items-center gap-2 shadow-2xs"
            id="btn-ask-mentor-trajectory"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#3E51FF]" />
            <span>Ask Mentor About Trajectory</span>
          </button>

          <button
            onClick={() => navigate({ view: 'workspace', internshipId: 'intern-nova-frontend' })}
            className="px-4 py-2 bg-[#1A1C1E] hover:bg-black text-white text-xs font-bold rounded-xs transition-colors flex items-center gap-1.5 shadow-xs"
            id="btn-resume-simulation-progress"
          >
            <span>Resume Current Sprint</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* =========================================================================
          2. CAREER LEVEL PROGRESSION (Beginner → Intermediate → Advanced)
          ========================================================================= */}
      <section className="bg-white border border-[#E2E2DE] rounded-lg p-6 shadow-xs space-y-6" id="career-level-section">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#E2E2DE]">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#5A5C60]">
              Career Level Pathway
            </div>
            <h2 className="text-lg font-bold text-[#1A1C1E] mt-0.5">
              Engineering Competency Tier
            </h2>
          </div>
          
          <div className="flex items-center gap-2 bg-[#FAF9F7] px-3 py-1.5 rounded-xs border border-[#E2E2DE]">
            <span className="text-xs text-[#5A5C60]">Current Position:</span>
            <span className="text-xs font-bold font-mono text-[#1A1C1E] bg-[#EEF0FF] text-[#3E51FF] px-2 py-0.5 rounded-xs border border-[#C5CAFF]">
              Beginner (Level 1)
            </span>
          </div>
        </div>

        {/* Level Progression Track: Beginner → Intermediate → Advanced */}
        <div className="relative">
          {/* Connecting Line */}
          <div className="hidden md:block absolute top-7 left-12 right-12 h-1 bg-[#E2E2DE] -z-0">
            <div className="h-full bg-[#1A1C1E] transition-all duration-500" style={{ width: '45%' }}></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
            
            {/* 1. Beginner Level (Current Active & Verified) */}
            <div className="bg-[#FAF9F7] border-2 border-[#1A1C1E] rounded-md p-4 relative shadow-xs">
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-full bg-[#1A1C1E] text-white flex items-center justify-center font-bold text-xs font-mono">
                  1
                </span>
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-emerald-100 text-emerald-900 border border-emerald-300 rounded-xs flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-700" />
                  Active / Foundation Met
                </span>
              </div>

              <h3 className="text-sm font-bold text-[#1A1C1E]">
                Beginner Level
              </h3>
              <p className="text-xs text-[#5A5C60] mt-1 leading-relaxed">
                Foundational DOM manipulation, semantic HTML5, Git branch/PR etiquette, and component architecture.
              </p>

              <div className="mt-3 pt-3 border-t border-[#E2E2DE] text-[11px] font-mono text-[#1A1C1E] flex items-center justify-between">
                <span>Core Competencies:</span>
                <span className="font-bold text-emerald-700">100% Mastered</span>
              </div>
            </div>

            {/* 2. Intermediate Level (Target Milestone - In Progress) */}
            <div className="bg-white border-2 border-[#3E51FF] rounded-md p-4 relative shadow-sm">
              <div className="absolute -top-2.5 right-4 bg-[#3E51FF] text-white text-[10px] font-bold font-mono px-2 py-0.5 rounded-xs tracking-wider uppercase">
                Next Target Milestone
              </div>

              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-full bg-[#EEF0FF] text-[#3E51FF] border border-[#C5CAFF] flex items-center justify-center font-bold text-xs font-mono">
                  2
                </span>
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-[#EEF0FF] text-[#3E51FF] border border-[#C5CAFF] rounded-xs">
                  68% Progress
                </span>
              </div>

              <h3 className="text-sm font-bold text-[#1A1C1E]">
                Intermediate Level
              </h3>
              <p className="text-xs text-[#5A5C60] mt-1 leading-relaxed">
                Complex React state isolation, REST API error boundaries, WCAG 2.1 AA accessibility, and unit testing.
              </p>

              {/* Progress Toward Intermediate */}
              <div className="mt-3 space-y-1.5">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-[#5A5C60]">Requirements Completed:</span>
                  <span className="font-bold text-[#3E51FF]">2 of 4 Projects</span>
                </div>
                <div className="w-full h-1.5 bg-[#EEF0FF] rounded-full overflow-hidden border border-[#C5CAFF]">
                  <div className="h-full bg-[#3E51FF] rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>
            </div>

            {/* 3. Advanced Level (Future Horizon) */}
            <div className="bg-[#FAF9F7] border border-[#E2E2DE] rounded-md p-4 relative opacity-85">
              <div className="flex items-center justify-between mb-3">
                <span className="w-8 h-8 rounded-full bg-[#E2E2DE] text-[#5A5C60] flex items-center justify-center font-bold text-xs font-mono">
                  3
                </span>
                <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-[#F2F1EE] text-[#5A5C60] border border-[#D5D3CB] rounded-xs">
                  Upcoming Tier
                </span>
              </div>

              <h3 className="text-sm font-bold text-[#1A1C1E]">
                Advanced Level
              </h3>
              <p className="text-xs text-[#5A5C60] mt-1 leading-relaxed">
                System architecture design (RFCs), performance profiling (Core Web Vitals), state machines, and microfrontends.
              </p>

              <div className="mt-3 pt-3 border-t border-[#E2E2DE] text-[11px] font-mono text-[#5A5C60] flex items-center justify-between">
                <span>Prerequisites:</span>
                <span>Unlocks at Intermediate</span>
              </div>
            </div>

          </div>
        </div>

        {/* Milestone Requirement Summary */}
        <div className="bg-[#FAF9F7] border border-[#E2E2DE] rounded-md p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-[#1A1C1E]">
            <Target className="w-4 h-4 text-[#3E51FF] shrink-0" />
            <span>
              <strong>Advancement Path:</strong> Complete <strong>two more simulation projects</strong> with a rubric score ≥ 80% to achieve the Intermediate engineering credential.
            </span>
          </div>
          <button
            onClick={() => navigate({ view: 'workspace', internshipId: 'intern-nova-frontend' })}
            className="text-xs font-bold text-[#3E51FF] hover:underline flex items-center gap-1 shrink-0"
          >
            <span>Continue Nova Labs Sprint</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </section>

      {/* =========================================================================
          3. CAREER INSIGHTS (Exact Required Quotes & Mentorship Notes)
          ========================================================================= */}
      <section className="space-y-4" id="career-insights-section">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#5A5C60]">
              Continuous Assessment
            </div>
            <h2 className="text-lg font-bold text-[#1A1C1E]">
              Career Insights & Mentor Observations
            </h2>
          </div>
          <span className="text-xs font-mono text-[#5A5C60]">
            Updated after Sprint 3 submission
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Insight 1: Strongest skill is Git */}
          <div className="bg-white border border-[#E2E2DE] rounded-lg p-4 shadow-xs flex flex-col justify-between hover:border-[#1A1C1E] transition-colors">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="p-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xs">
                  <GitBranch className="w-4 h-4" />
                </span>
                <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-xs border border-emerald-200">
                  81% (Advanced)
                </span>
              </div>
              <h3 className="text-sm font-bold text-[#1A1C1E] leading-snug">
                "Your strongest skill is currently Git."
              </h3>
              <p className="text-xs text-[#5A5C60] mt-1.5 leading-relaxed">
                Your branch discipline, descriptive pull request notes, and clean squash commits reflect professional engineering hygiene expected on collaborative teams.
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-[#E2E2DE] text-[11px] font-mono text-[#5A5C60] flex items-center justify-between">
              <span>Benchmark:</span>
              <span className="text-emerald-700 font-bold">Top 15% of Cohort</span>
            </div>
          </div>

          {/* Insight 2: React improved by 18% */}
          <div className="bg-white border border-[#E2E2DE] rounded-lg p-4 shadow-xs flex flex-col justify-between hover:border-[#1A1C1E] transition-colors">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="p-1.5 bg-[#EEF0FF] text-[#3E51FF] border border-[#C5CAFF] rounded-xs">
                  <TrendingUp className="w-4 h-4" />
                </span>
                <span className="text-xs font-mono font-bold text-[#3E51FF] bg-[#EEF0FF] px-2 py-0.5 rounded-xs border border-[#C5CAFF]">
                  +18% Growth
                </span>
              </div>
              <h3 className="text-sm font-bold text-[#1A1C1E] leading-snug">
                "You have improved your React skills by 18%."
              </h3>
              <p className="text-xs text-[#5A5C60] mt-1.5 leading-relaxed">
                Refactoring state management and separating presentation from business logic in Nova Labs Sprint 2 & 3 significantly accelerated your React mastery (46% → 64%).
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-[#E2E2DE] text-[11px] font-mono text-[#5A5C60] flex items-center justify-between">
              <span>30-Day Velocity:</span>
              <span className="text-[#3E51FF] font-bold">Fastest Growth Area</span>
            </div>
          </div>

          {/* Insight 3: Complete two more projects */}
          <div className="bg-white border border-[#E2E2DE] rounded-lg p-4 shadow-xs flex flex-col justify-between hover:border-[#1A1C1E] transition-colors">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="p-1.5 bg-amber-50 text-amber-900 border border-amber-200 rounded-xs">
                  <Target className="w-4 h-4" />
                </span>
                <span className="text-xs font-mono font-bold text-amber-900 bg-amber-50 px-2 py-0.5 rounded-xs border border-amber-200">
                  2 Projects Left
                </span>
              </div>
              <h3 className="text-sm font-bold text-[#1A1C1E] leading-snug">
                "Complete two more projects to reach the Intermediate level."
              </h3>
              <p className="text-xs text-[#5A5C60] mt-1.5 leading-relaxed">
                With 2 verified deliverables completed at an 88% average score, completing your active Sprint and the next API integration capstone will unlock the Intermediate milestone.
              </p>
            </div>
            <div className="mt-3 pt-2.5 border-t border-[#E2E2DE] text-[11px] font-mono text-[#5A5C60] flex items-center justify-between">
              <span>Next Milestone:</span>
              <span className="text-amber-900 font-bold">Sprint 4 Capstone</span>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          4. SKILL DEVELOPMENT (Meaningful Visualizations for Requested Skills)
          ========================================================================= */}
      <section className="space-y-4" id="skill-development-section">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#5A5C60]">
              Competency Breakdown
            </div>
            <h2 className="text-lg font-bold text-[#1A1C1E]">
              Skill Development
            </h2>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-[#FAF9F7] p-1 border border-[#E2E2DE] rounded-xs text-xs">
            <button
              onClick={() => setSelectedSkillFilter('all')}
              className={`px-2.5 py-1 rounded-xs font-medium transition-colors ${
                selectedSkillFilter === 'all'
                  ? 'bg-[#1A1C1E] text-white font-bold'
                  : 'text-[#5A5C60] hover:text-[#1A1C1E]'
              }`}
            >
              All 5 Skills
            </button>
            <button
              onClick={() => setSelectedSkillFilter('languages')}
              className={`px-2.5 py-1 rounded-xs font-medium transition-colors ${
                selectedSkillFilter === 'languages'
                  ? 'bg-[#1A1C1E] text-white font-bold'
                  : 'text-[#5A5C60] hover:text-[#1A1C1E]'
              }`}
            >
              Languages & UI
            </button>
            <button
              onClick={() => setSelectedSkillFilter('practices')}
              className={`px-2.5 py-1 rounded-xs font-medium transition-colors ${
                selectedSkillFilter === 'practices'
                  ? 'bg-[#1A1C1E] text-white font-bold'
                  : 'text-[#5A5C60] hover:text-[#1A1C1E]'
              }`}
            >
              Practices & Workflow
            </button>
          </div>
        </div>

        {/* Interactive Skills Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Radar Overview (Visualizer) */}
          <div className="lg:col-span-5">
            <SkillsGrowthChart />
          </div>

          {/* Detailed Skill Cards with Exact Percentages */}
          <div className="lg:col-span-7 space-y-3">
            {filteredSkills.map((skill) => {
              const Icon = skill.icon;
              return (
                <div 
                  key={skill.name}
                  className="bg-white border border-[#E2E2DE] rounded-lg p-4 shadow-xs hover:border-[#1A1C1E] transition-all"
                  id={`skill-card-${skill.name.toLowerCase().replace(/\s+/g, '-')}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xs bg-[#F2F1EE] border border-[#E2E2DE] flex items-center justify-center text-[#1A1C1E]">
                        <Icon className="w-4 h-4" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-[#1A1C1E] flex items-center gap-2">
                          <span>{skill.name}</span>
                          <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-xs border ${
                            skill.status === 'Advanced'
                              ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                              : skill.status === 'Proficient'
                              ? 'bg-blue-50 text-blue-800 border-blue-200'
                              : 'bg-amber-50 text-amber-900 border-amber-200'
                          }`}>
                            {skill.status}
                          </span>
                        </h3>
                        <div className="text-[11px] text-[#5A5C60]">
                          Baseline: {skill.previousScore}% • 30-day change: <span className="text-emerald-700 font-bold">+{skill.delta}%</span>
                        </div>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-xl font-extrabold font-mono text-[#1A1C1E]">
                        {skill.score}%
                      </div>
                      <div className="text-[10px] font-mono text-[#8A8A85]">
                        Junior Bar: 65%
                      </div>
                    </div>
                  </div>

                  {/* Clean Visual Progress Bar with Threshold Mark */}
                  <div className="relative my-2.5">
                    <div className="w-full h-2.5 bg-[#F2F1EE] rounded-full overflow-hidden border border-[#E2E2DE]">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          skill.score >= 80 ? 'bg-emerald-600' : skill.score >= 70 ? 'bg-[#1A1C1E]' : 'bg-[#3E51FF]'
                        }`}
                        style={{ width: `${skill.score}%` }}
                      />
                    </div>
                    {/* 65% Benchmark Indicator */}
                    <div 
                      className="absolute -top-1 bottom-0 w-0.5 bg-dashed border-r border-[#8A8A85]" 
                      style={{ left: '65%' }}
                      title="Junior Engineer Hiring Benchmark (65%)"
                    />
                  </div>

                  {/* Description & Verified Evidence */}
                  <p className="text-xs text-[#5A5C60] leading-relaxed">
                    {skill.description}
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-[#F2F1EE] flex items-center justify-between text-[11px] font-mono text-[#484B4F]">
                    <span className="truncate max-w-[85%] text-[#5A5C60]">
                      <strong>Verified Evidence:</strong> {skill.verifiedEvidence}
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* =========================================================================
          5. PROJECT PORTFOLIO (Completed Projects with All Required Fields)
          ========================================================================= */}
      <section className="space-y-4" id="project-portfolio-section">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#5A5C60]">
              Verified Work Artifacts
            </div>
            <h2 className="text-lg font-bold text-[#1A1C1E]">
              Project Portfolio
            </h2>
          </div>
          <span className="text-xs font-mono text-[#5A5C60]">
            4 Completed Simulation Projects
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {completedProjects.map((project) => (
            <div 
              key={project.id}
              className="bg-white border border-[#E2E2DE] rounded-lg p-5 shadow-xs flex flex-col justify-between hover:border-[#1A1C1E] transition-all"
              id={`portfolio-card-${project.id}`}
            >
              <div>
                {/* Header: Project Name & Score */}
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span className="text-[10px] font-mono text-[#5A5C60] block mb-0.5">
                      {project.internship}
                    </span>
                    <h3 className="text-base font-bold text-[#1A1C1E] leading-snug">
                      {project.name}
                    </h3>
                  </div>

                  <div className="text-right shrink-0">
                    <div className="px-2.5 py-1 bg-[#FAF9F7] border border-[#E2E2DE] rounded-xs font-mono text-center">
                      <div className="text-sm font-black text-[#1A1C1E]">
                        {project.score} <span className="text-[10px] text-[#8A8A85]">/ 100</span>
                      </div>
                      <div className="text-[9px] font-bold uppercase text-emerald-700">
                        {project.scoreGrade}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Completion Date */}
                <div className="flex items-center gap-1.5 text-xs text-[#5A5C60] font-mono mb-3">
                  <Calendar className="w-3.5 h-3.5 text-[#8A8A85]" />
                  <span>Completed on {project.completionDate}</span>
                </div>

                {/* Summary */}
                <p className="text-xs text-[#5A5C60] leading-relaxed mb-3">
                  {project.summary}
                </p>

                {/* Skills Used Tags */}
                <div className="mb-4">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-[#8A8A85] mb-1.5">
                    Skills Used:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.skillsUsed.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-2 py-0.5 bg-[#FAF9F7] border border-[#E2E2DE] text-[#1A1C1E] text-[11px] rounded-xs font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Rubric Breakdown Mini-Pills */}
                <div className="grid grid-cols-3 gap-1.5 p-2 bg-[#FAF9F7] rounded-xs border border-[#E2E2DE] text-center font-mono text-[10px] mb-4">
                  <div>
                    <div className="text-[#8A8A85]">Problem Solving</div>
                    <div className="font-bold text-[#1A1C1E]">{project.rubricBreakdown.problemSolving}%</div>
                  </div>
                  <div>
                    <div className="text-[#8A8A85]">Code Architecture</div>
                    <div className="font-bold text-[#1A1C1E]">{project.rubricBreakdown.codeStructure}%</div>
                  </div>
                  <div>
                    <div className="text-[#8A8A85]">UI / Accessibility</div>
                    <div className="font-bold text-[#1A1C1E]">{project.rubricBreakdown.uiUx}%</div>
                  </div>
                </div>
              </div>

              {/* Card Actions */}
              <div className="pt-3 border-t border-[#E2E2DE] flex items-center justify-between gap-2 flex-wrap">
                <button
                  onClick={() => handleCopyBullet(project.id, project.resumeBullet)}
                  className="px-2.5 py-1.5 bg-[#FAF9F7] hover:bg-[#F2F1EE] text-[#1A1C1E] border border-[#D5D3CB] text-xs font-semibold rounded-xs transition-colors flex items-center gap-1.5"
                  title="Copy verified resume bullet point"
                >
                  {copiedResumeId === project.id ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700 font-bold">Copied Bullet!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#5A5C60]" />
                      <span>Copy Resume Bullet</span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => navigate({ view: 'project-feedback' })}
                  className="px-3 py-1.5 bg-[#1A1C1E] hover:bg-black text-white text-xs font-bold rounded-xs transition-colors flex items-center gap-1"
                >
                  <span>View Review</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          6. INTERNSHIP HISTORY (Chronological Timeline of Internships)
          ========================================================================= */}
      <section className="space-y-4" id="internship-history-section">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#5A5C60]">
              Experience Records
            </div>
            <h2 className="text-lg font-bold text-[#1A1C1E]">
              Internship History
            </h2>
          </div>
          <span className="text-xs font-mono text-[#5A5C60]">
            3 Verified Company Simulations
          </span>
        </div>

        {/* Timeline Container */}
        <div className="relative pl-6 sm:pl-8 space-y-6 before:content-[''] before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-[#E2E2DE]">
          {internshipHistory.map((internship, idx) => (
            <div key={internship.id} className="relative">
              {/* Timeline Bullet */}
              <div className={`absolute -left-6 sm:-left-8 top-1.5 w-6 h-6 rounded-full border-2 bg-white flex items-center justify-center ${
                internship.status === 'Active'
                  ? 'border-[#3E51FF] text-[#3E51FF]'
                  : 'border-[#1A1C1E] text-[#1A1C1E]'
              }`}>
                {internship.status === 'Active' ? (
                  <span className="w-2 h-2 rounded-full bg-[#3E51FF] animate-pulse"></span>
                ) : (
                  <Check className="w-3 h-3 text-emerald-600" />
                )}
              </div>

              {/* Timeline Card */}
              <div className="bg-white border border-[#E2E2DE] rounded-lg p-5 shadow-xs hover:border-[#1A1C1E] transition-all">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E2E2DE]">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-[#1A1C1E]">
                        {internship.company}
                      </h3>
                      <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-xs border ${
                        internship.status === 'Active'
                          ? 'bg-[#EEF0FF] text-[#3E51FF] border-[#C5CAFF]'
                          : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                      }`}>
                        {internship.status === 'Active' ? 'Active Enrollment' : 'Completed & Verified'}
                      </span>
                    </div>
                    <div className="text-xs text-[#5A5C60] font-medium mt-0.5">
                      {internship.track} • {internship.period} ({internship.duration})
                    </div>
                  </div>

                  <div className="flex items-center gap-3 text-right">
                    <div>
                      <div className="text-xs font-mono font-bold text-[#1A1C1E]">
                        {internship.scoreAverage}% Average
                      </div>
                      <div className="text-[10px] font-mono text-[#8A8A85]">
                        {internship.completedTasks}/{internship.totalTasks} Tasks Delivered
                      </div>
                    </div>
                  </div>
                </div>

                {/* Supervisor & Accomplishments */}
                <div className="mt-3 grid grid-cols-1 md:grid-cols-12 gap-4">
                  {/* Supervisor Details */}
                  <div className="md:col-span-4 flex items-center gap-2.5 p-2.5 bg-[#FAF9F7] rounded-xs border border-[#E2E2DE]">
                    <div className="w-8 h-8 rounded-full bg-[#1A1C1E] text-white flex items-center justify-center font-bold text-xs font-mono shrink-0">
                      {internship.mentor.initials}
                    </div>
                    <div className="text-left truncate">
                      <div className="text-xs font-bold text-[#1A1C1E] truncate">
                        {internship.mentor.name}
                      </div>
                      <div className="text-[10px] text-[#5A5C60] truncate">
                        {internship.mentor.title}
                      </div>
                    </div>
                  </div>

                  {/* Key Accomplishments */}
                  <div className="md:col-span-8">
                    <div className="text-[11px] font-mono uppercase tracking-wider text-[#8A8A85] mb-1">
                      Key Sprint Deliverables:
                    </div>
                    <ul className="space-y-1 text-xs text-[#5A5C60]">
                      {internship.accomplishments.map((acc, aIdx) => (
                        <li key={aIdx} className="flex items-start gap-1.5">
                          <span className="text-[#3E51FF] font-bold mt-0.5">•</span>
                          <span>{acc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Row */}
                <div className="mt-4 pt-3 border-t border-[#E2E2DE] flex items-center justify-between flex-wrap gap-2 text-xs">
                  {internship.certificateId ? (
                    <span className="font-mono text-[11px] text-[#5A5C60] flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Verified Certificate ID: <strong>{internship.certificateId}</strong></span>
                    </span>
                  ) : (
                    <span className="font-mono text-[11px] text-[#3E51FF] flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      <span>Sprint 3 Review in Progress</span>
                    </span>
                  )}

                  <div className="flex items-center gap-2">
                    {internship.status === 'Active' ? (
                      <button
                        onClick={() => navigate({ view: 'workspace', internshipId: 'intern-nova-frontend' })}
                        className="px-3 py-1 bg-[#1A1C1E] hover:bg-black text-white text-xs font-bold rounded-xs transition-colors flex items-center gap-1"
                      >
                        <span>Open Workspace</span>
                        <ChevronRight className="w-3 h-3" />
                      </button>
                    ) : (
                      <button
                        onClick={() => navigate({ view: 'project-feedback' })}
                        className="px-3 py-1 bg-white hover:bg-[#EEF0FF] text-[#1A1C1E] hover:text-[#3E51FF] border border-[#D5D3CB] text-xs font-semibold rounded-xs transition-colors"
                      >
                        View Transcript
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          7. MENTOR TRAJECTORY CONSULTATION FOOTER
          ========================================================================= */}
      <div className="bg-[#1A1C1E] text-white rounded-lg p-6 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 border border-[#3A3C40]">
        <div className="space-y-1.5 text-center md:text-left">
          <div className="flex items-center justify-center md:justify-start gap-2">
            <span className="px-2 py-0.5 text-[10px] font-mono uppercase tracking-wider bg-[#3E51FF] text-white rounded-xs font-bold">
              Engineering Mentorship
            </span>
            <span className="text-xs text-emerald-400 font-mono">
              ● Sarah Chen Online
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold">
            Need tailored advice to reach your next milestone?
          </h3>
          <p className="text-xs sm:text-sm text-[#B0B2B8] max-w-xl">
            Discuss your rubric score history, get targeted code review hints, or plan your path to the Intermediate Developer milestone with your assigned Staff Mentor.
          </p>
        </div>

        <button
          onClick={() => openMentor({
            view: 'dashboard',
            contextTitle: 'Career Trajectory Strategy',
            initialPrompt: 'Sarah, based on my 84/100 score on Sprint 3 and my 64% React / 81% Git competency, what is the fastest way for me to achieve the Intermediate engineering rating?'
          })}
          className="px-5 py-2.5 bg-white hover:bg-[#EEF0FF] text-[#1A1C1E] hover:text-[#3E51FF] font-bold text-xs sm:text-sm rounded-xs transition-colors flex items-center gap-2 shadow-xs shrink-0"
          id="btn-footer-consult-mentor"
        >
          <Sparkles className="w-4 h-4 text-[#3E51FF]" />
          <span>Consult Staff Mentor</span>
        </button>
      </div>

    </div>
  );
};
