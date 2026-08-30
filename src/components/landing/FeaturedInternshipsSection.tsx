import React, { useState } from 'react';
import { 
  Clock, 
  Layers, 
  Star, 
  ArrowUpRight, 
  CheckCircle2, 
  Building2, 
  Sparkles, 
  ChevronRight,
  ExternalLink,
  BookOpen,
  Award,
  ShieldCheck
} from 'lucide-react';
import { SectionHeading, CardTitle, BodyText, Label, Caption } from '../../design-system/Typography';
import { Button, SecondaryButton } from '../../design-system/Button';
import { DifficultyBadge, StatusLabel, ScoreBadge } from '../../design-system/StatusComponents';

interface FeaturedInternship {
  id: string;
  title: string;
  role: string;
  companyName: string;
  companyTier: 'Tier 1 Tech' | 'Top Tier Quant' | 'Global Enterprise' | 'High-Growth Startup' | 'Design Agency';
  durationWeeks: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  projectsCount: number;
  estimatedHours: number;
  rating: number;
  graduates: number;
  summary: string;
  skills: string[];
  projects: {
    number: number;
    title: string;
    deliverable: string;
  }[];
  supervisorQuote: string;
}

interface FeaturedInternshipsProps {
  onSelectInternship: (id: string) => void;
}

export const FeaturedInternshipsSection: React.FC<FeaturedInternshipsProps> = ({ onSelectInternship }) => {
  const [selectedProgramId, setSelectedProgramId] = useState<string>('frontend-developer');

  const featuredInternships: FeaturedInternship[] = [
    {
      id: 'frontend-developer',
      title: 'Modern Frontend & Component Systems Simulation',
      role: 'Frontend Developer',
      companyName: 'Apex Digital Systems',
      companyTier: 'Tier 1 Tech',
      durationWeeks: 4,
      difficulty: 'Beginner',
      projectsCount: 3,
      estimatedHours: 24,
      rating: 4.9,
      graduates: 3240,
      summary: 'Build high-performance web applications, architect accessible UI component libraries, and manage complex state transitions using modern TypeScript and React.',
      skills: ['TypeScript', 'React 19', 'Tailwind CSS', 'WCAG AA Accessibility', 'State Machines'],
      projects: [
        { number: 1, title: 'Accessible Design Token Library', deliverable: 'Reusable UI component primitives conforming to WCAG AA color and keyboard standards.' },
        { number: 2, title: 'Real-Time Financial Order Dashboard', deliverable: 'High-density analytics interface with WebSocket simulated price streams.' },
        { number: 3, title: 'Performance Optimization & Lighthouse Audit', deliverable: 'Bundle splitting and sub-100ms First Contentful Paint optimization audit.' },
      ],
      supervisorQuote: '"You will build and refactor the actual component library our engineering teams use in production."',
    },
    {
      id: 'data-analyst',
      title: 'Business Intelligence & Cohort Analytics Simulation',
      role: 'Data Analyst',
      companyName: 'Meridian Metrics',
      companyTier: 'Global Enterprise',
      durationWeeks: 6,
      difficulty: 'Intermediate',
      projectsCount: 4,
      estimatedHours: 36,
      rating: 4.95,
      graduates: 2890,
      summary: 'Extract insights from multi-million row enterprise databases, write advanced SQL analytical queries, model user retention cohorts, and author executive presentations.',
      skills: ['SQL Analytics', 'Python', 'Pandas & NumPy', 'Tableau / BI', 'Cohort Modeling', 'A/B Testing'],
      projects: [
        { number: 1, title: 'Enterprise Revenue Leakage Audit', deliverable: 'Multi-table SQL aggregation queries identifying recurring billing drop-offs.' },
        { number: 2, title: 'Cohort Retention & Churn Analysis', deliverable: 'Python data pipeline modeling monthly subscription retention curves.' },
        { number: 3, title: 'Interactive Executive Tableau Dashboard', deliverable: 'C-suite KPI dashboard monitoring MRR, CAC, and Net Expansion Rate.' },
        { number: 4, title: 'A/B Test Statistical Significance Report', deliverable: 'Two-tailed hypothesis testing report with actionable product recommendations.' },
      ],
      supervisorQuote: '"Learn how to translate raw query results into strategic business decisions that executives actually act on."',
    },
    {
      id: 'uiux-designer',
      title: 'Product Design & High-Density UX Systems Simulation',
      role: 'UI/UX Designer',
      companyName: 'Canvas Studio',
      companyTier: 'Design Agency',
      durationWeeks: 4,
      difficulty: 'Beginner',
      projectsCount: 3,
      estimatedHours: 22,
      rating: 4.88,
      graduates: 2150,
      summary: 'Design intuitive workflows for complex software, build scalable Figma auto-layout design systems, and run structured usability testing syntheses.',
      skills: ['Figma Systems', 'Information Architecture', 'User Journey Mapping', 'Design Tokens', 'Wireframing'],
      projects: [
        { number: 1, title: 'Information Architecture & Workflow Redesign', deliverable: 'User flow diagrams and low-fidelity wireframes resolving onboarding friction.' },
        { number: 2, title: 'Scalable Multi-Theme Figma Design System', deliverable: 'Auto-layout components, color/typography tokens, and interactive variants.' },
        { number: 3, title: 'Usability Test Plan & Synthesis Deck', deliverable: 'Moderated user testing script and video timestamped insight report.' },
      ],
      supervisorQuote: '"Design is not just visual aesthetics—it is solving structural software complexity for real humans."',
    },
    {
      id: 'digital-marketing',
      title: 'Growth Marketing & Multi-Channel Acquisition Simulation',
      role: 'Digital Marketing Specialist',
      companyName: 'Nexus Growth Labs',
      companyTier: 'High-Growth Startup',
      durationWeeks: 5,
      difficulty: 'Intermediate',
      projectsCount: 4,
      estimatedHours: 28,
      rating: 4.92,
      graduates: 1840,
      summary: 'Engineer paid and organic growth funnels, conduct technical SEO audits, run conversion rate optimization tests, and calculate unit economics.',
      skills: ['Growth Funnels', 'Technical SEO', 'Google Analytics 4', 'A/B Testing', 'CAC/LTV Modeling'],
      projects: [
        { number: 1, title: 'Comprehensive Technical SEO Audit', deliverable: 'Site architecture crawl analysis, Core Web Vitals audit, and content gap roadmap.' },
        { number: 2, title: 'Paid Search & Meta Ads Strategy', deliverable: '$50k mock budget allocation model and ad creative copy matrix.' },
        { number: 3, title: 'Landing Page Conversion Rate Optimization', deliverable: 'Split-test experiment design and heat-map behavior hypothesis deck.' },
        { number: 4, title: 'Unit Economics & Attribution Model', deliverable: 'Multi-touch attribution spreadsheet calculating blended CAC and payback period.' },
      ],
      supervisorQuote: '"Master the quantitative side of marketing: experimentation velocity and true unit economics."',
    },
  ];

  const activeProgram = featuredInternships.find((p) => p.id === selectedProgramId) || featuredInternships[0];

  return (
    <section id="featured-internships" className="w-full bg-[#FFFFFF] py-16 sm:py-20 border-b border-[#E2E2DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div>
            <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#8A8A85] mb-2">
              Structured Practical Programs
            </div>
            <SectionHeading className="text-2xl sm:text-3xl text-[#1A1C1E]">
              Featured Virtual Internships
            </SectionHeading>
            <BodyText variant="secondary" className="mt-1 max-w-2xl text-sm sm:text-base">
              Hands-on simulation programs designed around actual sprint deliverables, supervisor tickets, and automated rubric grading.
            </BodyText>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono text-[#8A8A85]">
              Select a program to inspect detailed project milestones:
            </span>
          </div>
        </div>

        {/* 4 Program Horizontal Selection Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
          {featuredInternships.map((program) => {
            const isSelected = selectedProgramId === program.id;
            return (
              <button
                key={program.id}
                onClick={() => setSelectedProgramId(program.id)}
                className={`p-4 rounded-sm border text-left transition-all flex flex-col justify-between ${
                  isSelected
                    ? 'bg-[#F2F1EE] border-[#1A1C1E] shadow-xs'
                    : 'bg-[#FFFFFF] border-[#E2E2DE] hover:border-[#CBCBC6] hover:bg-[#F9F8F6]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-[#1A1C1E]">{program.role}</span>
                    <DifficultyBadge difficulty={program.difficulty} showBars={false} />
                  </div>
                  <div className="text-xs text-[#8A8A85] font-mono mb-3">
                    {program.companyName}
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E2E2DE] flex items-center justify-between text-xs text-[#8A8A85]">
                  <span>{program.durationWeeks} Weeks</span>
                  <span className="font-semibold text-[#1A1C1E]">{program.projectsCount} Projects</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Deep Detailed Program Breakdown Container */}
        <div className="bg-[#F9F8F6] border border-[#E2E2DE] rounded-sm p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Column: Metadata & Overview (5 cols) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-bold text-[#1A1C1E]">{activeProgram.companyName}</span>
                  <span className="text-xs text-[#8A8A85]">• {activeProgram.companyTier}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[#1A1C1E] mb-3 leading-snug">
                  {activeProgram.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#484B4F] leading-relaxed mb-4">
                  {activeProgram.summary}
                </p>

                {/* Supervisor quote */}
                <div className="p-3.5 rounded-xs bg-[#FFFFFF] border border-[#E2E2DE] text-xs text-[#484B4F] italic border-l-2 border-l-[#1A1C1E]">
                  {activeProgram.supervisorQuote}
                </div>
              </div>

              {/* Program Metadata Stats */}
              <div className="grid grid-cols-3 gap-2 pt-2">
                <div className="p-3 rounded-xs bg-[#FFFFFF] border border-[#E2E2DE]">
                  <div className="text-[10px] font-mono text-[#8A8A85] uppercase">Duration</div>
                  <div className="text-sm font-bold text-[#1A1C1E] mt-0.5">{activeProgram.durationWeeks} Weeks</div>
                  <div className="text-[10px] text-[#8A8A85] font-mono">{activeProgram.estimatedHours} hrs total</div>
                </div>

                <div className="p-3 rounded-xs bg-[#FFFFFF] border border-[#E2E2DE]">
                  <div className="text-[10px] font-mono text-[#8A8A85] uppercase">Difficulty</div>
                  <div className="text-sm font-bold text-[#1A1C1E] mt-0.5">{activeProgram.difficulty}</div>
                  <div className="text-[10px] text-[#8A8A85] font-mono">Prerequisites 0</div>
                </div>

                <div className="p-3 rounded-xs bg-[#FFFFFF] border border-[#E2E2DE]">
                  <div className="text-[10px] font-mono text-[#8A8A85] uppercase">Projects</div>
                  <div className="text-sm font-bold text-[#1A1C1E] mt-0.5">{activeProgram.projectsCount} Projects</div>
                  <div className="text-[10px] text-[#8A8A85] font-mono">Portfolio Ready</div>
                </div>
              </div>

              {/* Skills Tags */}
              <div>
                <Label className="mb-2">Skills & Technologies Covered</Label>
                <div className="flex flex-wrap gap-1.5">
                  {activeProgram.skills.map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded-xs bg-[#FFFFFF] border border-[#E2E2DE] text-[#1A1C1E] text-xs font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Realistic Milestone Project Deliverables (7 cols) */}
            <div className="lg:col-span-7 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-[#1A1C1E]" />
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1A1C1E]">
                      {activeProgram.projectsCount} Realistic Milestone Deliverables
                    </h4>
                  </div>
                  <span className="text-xs font-mono text-[#115E59] font-bold">Rubric Verified</span>
                </div>

                <div className="space-y-3">
                  {activeProgram.projects.map((proj) => (
                    <div
                      key={proj.number}
                      className="p-4 rounded-sm bg-[#FFFFFF] border border-[#E2E2DE] transition-all hover:border-[#1A1C1E]"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-xs bg-[#1A1C1E] text-white text-xs font-mono font-bold flex items-center justify-center shrink-0">
                            P{proj.number}
                          </span>
                          <h5 className="text-sm font-bold text-[#1A1C1E]">
                            {proj.title}
                          </h5>
                        </div>
                        <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded-2xs bg-[#F2F1EE] text-[#484B4F] border border-[#E2E2DE]">
                          Deliverable
                        </span>
                      </div>

                      <p className="text-xs text-[#484B4F] leading-relaxed pl-8">
                        {proj.deliverable}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Bar */}
              <div className="mt-6 pt-5 border-t border-[#E2E2DE] flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-[#8A8A85]">
                  <ShieldCheck className="w-4 h-4 text-[#115E59]" />
                  <span>Free access • Includes automated supervisor feedback</span>
                </div>

                <Button
                  variant="primary"
                  onClick={() => onSelectInternship(activeProgram.id)}
                  rightIcon={<ArrowUpRight className="w-4 h-4" />}
                >
                  Start {activeProgram.role} Simulation
                </Button>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
