import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Layers, 
  Database, 
  Compass, 
  Cpu, 
  CheckCircle2, 
  Workflow, 
  FileCode2, 
  Sparkles, 
  ShieldCheck, 
  Briefcase, 
  MessageSquareCode, 
  Award,
  ChevronRight,
  Terminal,
  Server
} from 'lucide-react';

export const ArchitectureOverview: React.FC = () => {
  const { tracks, internships, userProfile, navigate } = useApp();
  const [activeTab, setActiveTab] = useState<'architecture' | 'data-schema' | 'design-system' | 'roadmap'>('architecture');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* Top Header Badge */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-sm bg-[#1A1C1E] text-white text-xs font-mono mb-3">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>SYSTEM ARCHITECTURE FOUNDATION</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A1C1E] tracking-tight mb-2">
          InternLab Platform Architecture
        </h1>
        <p className="text-base text-[#8A8A85] max-w-3xl leading-relaxed">
          Established the technical foundation, full-stack Express + Vite architecture, domain data models, sleek design system tokens, and simulation engines for virtual workplace internships.
        </p>
      </div>

      {/* Architecture Tabs */}
      <div className="flex border-b border-[#E2E2DE] mb-8 space-x-6 overflow-x-auto pb-px">
        {[
          { id: 'architecture', label: '1. Full-Stack & Component Strategy', icon: Layers },
          { id: 'data-schema', label: '2. Database & Domain Models', icon: Database },
          { id: 'design-system', label: '3. Sleek Design System & Principles', icon: FileCode2 },
          { id: 'roadmap', label: '4. Core User Journey Flow', icon: Workflow },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 pb-3 text-sm font-semibold whitespace-nowrap transition-colors border-b-2 ${
                isActive
                  ? 'border-[#1A1C1E] text-[#1A1C1E]'
                  : 'border-transparent text-[#8A8A85] hover:text-[#1A1C1E]'
              }`}
              id={`arch-tab-${tab.id}`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab 1: Full-Stack & Component Strategy */}
      {activeTab === 'architecture' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Column 1: Client Framework */}
            <div className="workspace-card p-6 rounded-sm">
              <div className="w-10 h-10 rounded-sm bg-[#F2F1EE] text-[#1A1C1E] flex items-center justify-center mb-4 border border-[#E2E2DE]">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#1A1C1E] mb-2">Frontend & Client Layer</h3>
              <ul className="text-sm text-[#484B4F] space-y-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>React 19 + TypeScript</strong> with strict type contracts</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Tailwind CSS v4</strong> with Sleek Interface tokens and precision styling</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>AppContext State Provider</strong> with reactive localStorage persistence</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Accessible Lucide Icons</strong> and keyboard-navigable components</span>
                </li>
              </ul>
            </div>

            {/* Column 2: Backend & Middleware */}
            <div className="workspace-card p-6 rounded-sm">
              <div className="w-10 h-10 rounded-sm bg-[#F2F1EE] text-[#1A1C1E] flex items-center justify-center mb-4 border border-[#E2E2DE]">
                <Server className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#1A1C1E] mb-2">Express & Vite Backend</h3>
              <ul className="text-sm text-[#484B4F] space-y-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Custom Server (server.ts)</strong> serving Vite dev middleware and bundled CommonJS in production</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>/api/health</strong> diagnostic endpoint</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>/api/mentor/chat</strong> for authentic workplace supervisor simulation with thinking mode</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>/api/submissions/review</strong> for rubric-based grading and actionable feedback</span>
                </li>
              </ul>
            </div>

            {/* Column 3: AI Simulation Engine */}
            <div className="workspace-card p-6 rounded-sm">
              <div className="w-10 h-10 rounded-sm bg-[#F2F1EE] text-[#1A1C1E] flex items-center justify-center mb-4 border border-[#E2E2DE]">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-[#1A1C1E] mb-2">Workplace Simulation Engine</h3>
              <ul className="text-sm text-[#484B4F] space-y-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Google GenAI SDK (@google/genai)</strong> with Gemini 3.1 Pro & 3.7 Flash models</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Supervisor Role-Play System</strong> mimicking staff engineers, PM leads, and CFA quant directors</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Rubric Evaluation Protocol</strong> calculating criterion weights, strengths, and next steps</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Component Hierarchy Map */}
          <div className="workspace-card p-6 rounded-sm">
            <h3 className="text-lg font-bold text-[#1A1C1E] mb-4 flex items-center gap-2">
              <Terminal className="w-5 h-5" />
              Component Structure & Page Modularization Plan
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="p-4 bg-[#F2F1EE] rounded-sm border border-[#E2E2DE]">
                <div className="font-bold text-[#1A1C1E] mb-1">1. Discovery & Catalog</div>
                <div className="text-xs text-[#8A8A85] mb-2"><code>/src/components/discover/</code></div>
                <p className="text-xs text-[#484B4F]">
                  Industry filtering, career tracks grid, company tier badges, difficulty levels, duration estimates.
                </p>
              </div>

              <div className="p-4 bg-[#F2F1EE] rounded-sm border border-[#E2E2DE]">
                <div className="font-bold text-[#1A1C1E] mb-1">2. Simulation Workspace</div>
                <div className="text-xs text-[#8A8A85] mb-2"><code>/src/components/workspace/</code></div>
                <p className="text-xs text-[#484B4F]">
                  Executive Briefing, Simulated Email Inbox, Slack-like Supervisor Channel, Task Kanban, Deliverable Submitter.
                </p>
              </div>

              <div className="p-4 bg-[#F2F1EE] rounded-sm border border-[#E2E2DE]">
                <div className="font-bold text-[#1A1C1E] mb-1">3. Review & Rubrics</div>
                <div className="text-xs text-[#8A8A85] mb-2"><code>/src/components/review/</code></div>
                <p className="text-xs text-[#484B4F]">
                  Detailed scoring breakdown, strength highlights, improvement action items, re-submission diffs.
                </p>
              </div>

              <div className="p-4 bg-[#F2F1EE] rounded-sm border border-[#E2E2DE]">
                <div className="font-bold text-[#1A1C1E] mb-1">4. Credential & Portfolio</div>
                <div className="text-xs text-[#8A8A85] mb-2"><code>/src/components/portfolio/</code></div>
                <p className="text-xs text-[#484B4F]">
                  Verified proof-of-work project showcase, shareable credential URLs, skills masteries, completion certificates.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Data Schema & Database Requirements */}
      {activeTab === 'data-schema' && (
        <div className="space-y-6">
          <div className="workspace-card p-6 rounded-sm">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-bold text-[#1A1C1E]">Production Supabase Database Schema</h3>
                <p className="text-sm text-[#8A8A85]">
                  PostgreSQL relational schema with Row Level Security (RLS) policies configured in <code>/supabase/schema.sql</code> and type-safe bindings in <code>/src/lib/supabase/types.ts</code>.
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xs text-xs font-mono font-bold">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>13 Entities Configured</span>
              </div>
            </div>

            {/* Supabase Schema Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {[
                { table: 'PROFILES', desc: 'id, full_name, email, avatar_url, college, degree, education_year, experience_level, weekly_availability, created_at' },
                { table: 'CAREER_INTERESTS', desc: 'id, user_id, category' },
                { table: 'SKILLS', desc: 'id, name, category' },
                { table: 'USER_SKILLS', desc: 'id, user_id, skill_id, proficiency' },
                { table: 'INTERNSHIP_CATEGORIES', desc: 'id, name, description' },
                { table: 'INTERNSHIPS', desc: 'id, title, description, category_id, duration, difficulty, company_name, thumbnail, is_active' },
                { table: 'INTERNSHIP_MODULES', desc: 'id, internship_id, week_number, title, description' },
                { table: 'TASKS', desc: 'id, module_id, title, description, difficulty, estimated_time, deadline_days, requirements, deliverables' },
                { table: 'USER_INTERNSHIPS', desc: 'id, user_id, internship_id, status, progress, started_at, completed_at' },
                { table: 'TASK_PROGRESS', desc: 'id, user_id, task_id, status, started_at, completed_at' },
                { table: 'PROJECT_SUBMISSIONS', desc: 'id, user_id, task_id, github_url, live_url, description, submitted_at' },
                { table: 'PROJECT_FEEDBACK', desc: 'id, submission_id, overall_score, code_quality, problem_solving, ui_ux, documentation, strengths, improvements, feedback, created_at' },
                { table: 'CERTIFICATES', desc: 'id, user_id, internship_id, certificate_id, issued_at, verification_status, metadata' }
              ].map((ent) => (
                <div key={ent.table} className="p-3 bg-[#F9F8F6] border border-[#E2E2DE] rounded-xs">
                  <div className="font-mono text-xs font-bold text-[#1A1C1E] mb-1 flex items-center gap-1.5">
                    <Database className="w-3.5 h-3.5 text-[#3E51FF]" />
                    <span>{ent.table}</span>
                  </div>
                  <p className="text-[11px] font-mono text-[#5A5C60] leading-relaxed">
                    {ent.desc}
                  </p>
                </div>
              ))}
            </div>

            <h4 className="text-sm font-bold text-[#1A1C1E] mb-3">Domain Type Mappings</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Entity 1: VirtualInternship */}
              <div className="p-4 rounded-sm border border-[#E2E2DE] bg-[#F2F1EE]">
                <div className="font-mono text-xs font-bold text-[#3E51FF] mb-2">VirtualInternship & Milestones</div>
                <pre className="text-xs text-[#1A1C1E] overflow-x-auto leading-relaxed font-mono">
{`interface VirtualInternship {
  id: string;
  slug: string;
  title: string;
  companyName: string;
  companyTier: 'Fortune 500' | 'High-Growth Tech' | ...;
  trackId: CareerTrackId;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  durationWeeks: number;
  estimatedTotalHours: number;
  supervisor: SupervisorPersona;
  milestones: WeeklyMilestone[]; // Contains tasks & simulated emails
}`}
                </pre>
              </div>

              {/* Entity 2: Task & Rubric */}
              <div className="p-4 rounded-sm border border-[#E2E2DE] bg-[#F2F1EE]">
                <div className="font-mono text-xs font-bold text-[#3E51FF] mb-2">SimulationTask & RubricCriterion</div>
                <pre className="text-xs text-[#1A1C1E] overflow-x-auto leading-relaxed font-mono">
{`interface SimulationTask {
  id: string;
  milestoneId: string;
  title: string;
  deliverableType: 'code' | 'document' | 'design-spec' | ...;
  estimatedMinutes: number;
  objective: string;
  instructionsMarkdown: string;
  starterTemplate?: string;
  rubricCriteria: RubricCriterion[];
}`}
                </pre>
              </div>

              {/* Entity 3: TaskSubmission & Review */}
              <div className="p-4 rounded-sm border border-[#E2E2DE] bg-[#F2F1EE]">
                <div className="font-mono text-xs font-bold text-[#3E51FF] mb-2">TaskSubmission & ReviewResult</div>
                <pre className="text-xs text-[#1A1C1E] overflow-x-auto leading-relaxed font-mono">
{`interface ReviewResult {
  reviewId: string;
  reviewedAt: string;
  reviewerName: string;
  reviewerTitle: string;
  overallScore: number; // 0-100
  passed: boolean;
  summaryFeedback: string;
  strengths: string[];
  areasForImprovement: string[];
  criteriaScores: CriterionScore[];
  actionableNextSteps: string[];
}`}
                </pre>
              </div>

              {/* Entity 4: Portfolio & Certificate */}
              <div className="p-4 rounded-sm border border-[#E2E2DE] bg-[#F2F1EE]">
                <div className="font-mono text-xs font-bold text-[#3E51FF] mb-2">Certificate & PortfolioArtifact</div>
                <pre className="text-xs text-[#1A1C1E] overflow-x-auto leading-relaxed font-mono">
{`interface Certificate {
  id: string;
  internshipId: string;
  internshipTitle: string;
  companyName: string;
  studentName: string;
  credentialId: string; // e.g. IL-CS-2026-94821
  verificationCode: string;
  skillsCertified: string[];
  totalHoursCompleted: number;
}`}
                </pre>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Design System */}
      {activeTab === 'design-system' && (
        <div className="space-y-6">
          <div className="workspace-card p-6 rounded-sm">
            <h3 className="text-lg font-bold text-[#1A1C1E] mb-2">Sleek Interface Tokens & Design Principles</h3>
            <p className="text-sm text-[#8A8A85] mb-6">
              Defined in <code>/src/design-system/tokens.ts</code>. Built with high precision, warm stone canvas (#F9F8F6), crisp borders (#E2E2DE), sharp dark ink (#1A1C1E), and subtle cobalt accents (#3E51FF).
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Colors */}
              <div className="p-4 border border-[#E2E2DE] rounded-sm bg-[#FFFFFF]">
                <div className="font-bold text-sm text-[#1A1C1E] mb-3">Color Palette</div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between p-2 rounded-sm bg-[#1A1C1E] text-white font-mono">
                    <span>Primary Ink</span>
                    <span>#1A1C1E</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-sm bg-[#F9F8F6] text-[#1A1C1E] border border-[#E2E2DE] font-mono">
                    <span>Stone Canvas</span>
                    <span>#F9F8F6</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-sm bg-[#F2F1EE] text-[#1A1C1E] border border-[#E2E2DE] font-mono">
                    <span>Neutral Surface</span>
                    <span>#F2F1EE</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded-sm bg-[#3E51FF] text-white font-mono">
                    <span>Cobalt Accent</span>
                    <span>#3E51FF</span>
                  </div>
                </div>
              </div>

              {/* Typography */}
              <div className="p-4 border border-[#E2E2DE] rounded-sm bg-[#FFFFFF]">
                <div className="font-bold text-sm text-[#1A1C1E] mb-3">Typography Pairing</div>
                <div className="space-y-3 text-xs">
                  <div>
                    <div className="text-[#8A8A85] mb-1">Display & Body Font</div>
                    <div className="text-sm font-bold text-[#1A1C1E]">Plus Jakarta Sans</div>
                    <div className="text-[#484B4F]">High-contrast, geometric precision with optical weights 400-800.</div>
                  </div>
                  <div className="pt-2 border-t border-[#E2E2DE]">
                    <div className="text-[#8A8A85] mb-1">Code & Telemetry Font</div>
                    <div className="text-sm font-mono font-medium text-[#1A1C1E]">JetBrains Mono</div>
                    <div className="text-[#484B4F]">Monospace clarity for schemas, formulas, and code diffs.</div>
                  </div>
                </div>
              </div>

              {/* Anti-Slop Guarantees */}
              <div className="p-4 border border-[#E2E2DE] rounded-sm bg-[#FFFFFF]">
                <div className="font-bold text-sm text-[#1A1C1E] mb-3">Sleek Interface Rules</div>
                <ul className="text-xs text-[#484B4F] space-y-1.5 leading-relaxed">
                  <li className="flex items-center gap-1.5 text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Zero purple/blue gradient backgrounds</span>
                  </li>
                  <li className="flex items-center gap-1.5 text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Crisp 1px borders & zero heavy glow shadows</span>
                  </li>
                  <li className="flex items-center gap-1.5 text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Realistic corporate workplace simulations</span>
                  </li>
                  <li className="flex items-center gap-1.5 text-emerald-700">
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                    <span>Precise, subtle border-radii (2-6px)</span>
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Roadmap & Journey Flow */}
      {activeTab === 'roadmap' && (
        <div className="space-y-6">
          <div className="workspace-card p-6 rounded-sm">
            <h3 className="text-lg font-bold text-[#1A1C1E] mb-4">Core User Journey Pipeline</h3>
            
            <div className="relative border-l-2 border-[#E2E2DE] ml-4 pl-6 space-y-6 text-sm">
              
              {[
                {
                  step: '01',
                  title: 'Discover Internship',
                  desc: 'Filter 20+ realistic simulations across Software Engineering, Quant Finance, Product Management, Security, and Design.',
                },
                {
                  step: '02',
                  title: 'Career Track Calibration & Onboarding',
                  desc: 'Calibrate experience level, target starting roles, weekly hour commitments, and foundational skills.',
                },
                {
                  step: '03',
                  title: 'Workplace Simulation Hub (Office Environment)',
                  desc: 'Access simulated email inboxes, executive briefings, senior supervisor Slack channel, and weekly task deliverables.',
                },
                {
                  step: '04',
                  title: 'Project Submission & Rubric Review',
                  desc: 'Submit deliverables to the Review Committee with Gemini 3.1 Pro evaluation, scoring, and feedback.',
                },
                {
                  step: '05',
                  title: 'Verified Credential & Portfolio Artifacts',
                  desc: 'Earn verifiable completion certificates with unique hash codes and recruiter-ready project case studies.',
                },
              ].map((item, idx) => (
                <div key={idx} className="relative">
                  <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-[#1A1C1E] border-2 border-white"></div>
                  <div className="text-xs font-mono font-bold text-[#3E51FF] uppercase tracking-wider mb-0.5">
                    Step {item.step}
                  </div>
                  <div className="font-bold text-[#1A1C1E] text-base mb-1">{item.title}</div>
                  <div className="text-xs text-[#8A8A85] leading-relaxed">{item.desc}</div>
                </div>
              ))}

            </div>
          </div>
        </div>
      )}

      {/* Pre-Loaded Simulations Preview Matrix */}
      <div className="mt-8 pt-8 border-t border-[#E2E2DE]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-bold text-[#1A1C1E]">Initialized Simulation Catalog ({internships.length} Scenarios)</h2>
            <p className="text-xs text-[#8A8A85]">Ready for interactive simulations across engineering, quantitative finance, and product management.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {internships.map((internship) => (
            <div key={internship.id} className="p-4 rounded-sm bg-white border border-[#E2E2DE] shadow-xs flex flex-col justify-between hover:border-[#1A1C1E] transition-colors">
              <div>
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="font-semibold text-[#1A1C1E]">{internship.companyName}</span>
                  <span className="px-1.5 py-0.5 rounded-sm bg-[#F2F1EE] border border-[#E2E2DE] text-[#1A1C1E] font-medium text-[10px]">
                    {internship.difficulty}
                  </span>
                </div>
                <h3 className="font-bold text-sm text-[#1A1C1E] mb-1.5 leading-snug">
                  {internship.title}
                </h3>
                <p className="text-xs text-[#8A8A85] line-clamp-2 leading-relaxed mb-3">
                  {internship.summary}
                </p>
              </div>

              <div className="pt-3 border-t border-[#F2F1EE] flex items-center justify-between text-xs text-[#8A8A85]">
                <span>{internship.durationWeeks} Weeks ({internship.estimatedTotalHours} hrs)</span>
                <span className="font-semibold text-[#3E51FF]">★ {internship.rating}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
