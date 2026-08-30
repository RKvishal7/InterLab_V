import React, { useState } from 'react';
import { 
  ArrowUpRight, 
  Play, 
  Terminal, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  Sparkles, 
  TrendingUp, 
  Building2, 
  User, 
  ExternalLink,
  Code2,
  FileCheck2,
  ChevronRight,
  GitBranch,
  Layers,
  Award
} from 'lucide-react';
import { 
  DisplayHeading, 
  PageHeading, 
  BodyText, 
  Caption, 
  Label,
  CodeText
} from '../../design-system/Typography';
import { 
  Button, 
  PrimaryButton, 
  SecondaryButton, 
  GhostButton 
} from '../../design-system/Button';
import { 
  StatusLabel, 
  DifficultyBadge, 
  ProgressIndicator, 
  ScoreBadge,
  CompletionIndicator 
} from '../../design-system/StatusComponents';

interface HeroSectionProps {
  onExploreClick: () => void;
  onHowItWorksClick: () => void;
  onSelectInternship?: (id: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreClick,
  onHowItWorksClick,
  onSelectInternship,
}) => {
  // Interactive tab state for the live simulation preview in the hero
  const [activePreviewTab, setActivePreviewTab] = useState<'tasks' | 'code' | 'review'>('tasks');
  const [activeTaskIndex, setActiveTaskIndex] = useState<number>(1);

  const previewTasks = [
    {
      id: 'task-1',
      number: '2.1',
      title: 'Implement Redis Sliding-Window Rate Limiter',
      type: 'Code Deliverable',
      status: 'passed',
      score: 98,
      time: '45 mins',
      reviewSnippet: 'Atomic Lua script handles 50,000 req/sec benchmark with zero concurrency drift.',
    },
    {
      id: 'task-2',
      number: '2.2',
      title: 'Kafka Consumer Partition Key Rebalance Strategy',
      type: 'Architecture Spec',
      status: 'in-progress',
      score: undefined,
      time: '60 mins',
      reviewSnippet: 'Active deliverable. Supervisor requested edge-case test for rebalancing lag.',
    },
    {
      id: 'task-3',
      number: '2.3',
      title: 'Production Incident Root Cause Analysis (RCA)',
      type: 'Executive Report',
      status: 'not-started',
      score: undefined,
      time: '30 mins',
      reviewSnippet: 'Milestone 2 capstone deliverable. Unlocks upon completion of Task 2.2.',
    },
  ];

  return (
    <section id="hero" className="w-full pt-8 pb-16 lg:pt-14 lg:pb-20 border-b border-[#E2E2DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Editorial Heading & Subtitle */}
        <div className="max-w-3xl mb-12">
          {/* Subtle Category Pill */}
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-xs bg-[#F2F1EE] border border-[#E2E2DE] text-[#1A1C1E] text-xs font-mono mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-[#3E51FF] animate-pulse"></span>
            <span>PRACTICAL WORKPLACE SIMULATIONS PLATFORM</span>
          </div>

          <DisplayHeading className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-tight leading-[1.08] text-[#1A1C1E] mb-6 font-extrabold">
            Experience Work Before Your First Job.
          </DisplayHeading>

          <BodyText variant="secondary" className="text-base sm:text-lg md:text-xl leading-relaxed text-[#484B4F] mb-8 max-w-2xl">
            Build real skills through immersive virtual internships designed around practical projects, workplace challenges, and meaningful feedback.
          </BodyText>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3.5">
            <Button
              size="lg"
              variant="primary"
              onClick={onExploreClick}
              rightIcon={<ArrowUpRight className="w-4 h-4" />}
              id="hero-primary-cta"
            >
              Explore Internships
            </Button>

            <SecondaryButton
              size="lg"
              onClick={onHowItWorksClick}
              leftIcon={<Play className="w-4 h-4 text-[#1A1C1E] fill-[#1A1C1E]" />}
              id="hero-secondary-cta"
            >
              See How It Works
            </SecondaryButton>

            <div className="w-full sm:w-auto mt-2 sm:mt-0 sm:ml-4 text-xs font-mono text-[#8A8A85] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#115E59]" />
              <span>Free for students • Verified proof of work</span>
            </div>
          </div>
        </div>

        {/* SOPHISTICATED PRODUCT PREVIEW: INTERNLAB WORKPLACE SIMULATION DASHBOARD */}
        <div className="w-full bg-[#FFFFFF] border border-[#E2E2DE] rounded-sm shadow-sm overflow-hidden transition-all">
          
          {/* Top Simulation Frame Bar */}
          <div className="px-4 sm:px-6 py-3.5 bg-[#F2F1EE] border-b border-[#E2E2DE] flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E2E2DE] border border-[#CBCBC6]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#E2E2DE] border border-[#CBCBC6]"></span>
                <span className="w-2.5 h-2.5 rounded-full bg-[#E2E2DE] border border-[#CBCBC6]"></span>
              </div>
              <div className="h-4 w-px bg-[#CBCBC6] hidden sm:block" />
              <div className="flex items-center gap-2 text-xs font-mono text-[#1A1C1E] truncate">
                <span className="font-bold">CloudScale Systems</span>
                <span className="text-[#8A8A85]">•</span>
                <span className="text-[#484B4F]">Platform Core Team Simulation</span>
                <span className="hidden md:inline-block px-1.5 py-0.2 rounded-2xs bg-[#EEF0FF] text-[#3E51FF] text-[10px] font-semibold">
                  Sprint #3 Active
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-[#8A8A85]">
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                <span className="text-[#1A1C1E] font-medium">Supervisor Online</span>
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline">Sarah Jenkins, Staff Engineer</span>
            </div>
          </div>

          {/* Dashboard Inner Grid */}
          <div className="p-4 sm:p-6 lg:p-8 bg-[#FFFFFF]">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              
              {/* Left Column: Current Internship Overview & Milestones (7 cols) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Current Internship Card Header */}
                <div className="p-5 rounded-sm bg-[#F9F8F6] border border-[#E2E2DE]">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-xs bg-[#1A1C1E] text-white flex items-center justify-center text-xs font-bold font-mono">
                        CS
                      </div>
                      <div>
                        <div className="text-[10px] font-mono uppercase tracking-wider text-[#8A8A85]">
                          Current Enrolled Simulation
                        </div>
                        <h3 className="text-sm sm:text-base font-bold text-[#1A1C1E] leading-tight">
                          Distributed Backend Engineering Simulation
                        </h3>
                      </div>
                    </div>
                    <DifficultyBadge difficulty="Intermediate" />
                  </div>

                  {/* Progress bar */}
                  <div className="mt-4 pt-3 border-t border-[#E2E2DE]">
                    <ProgressIndicator
                      progress={65}
                      totalSteps={4}
                      completedSteps={2}
                      label="Milestone 2 of 4: Rate Limiting & High-Throughput Pipelines"
                      size="md"
                    />
                  </div>
                </div>

                {/* Interactive Task & Deliverable List */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Terminal className="w-4 h-4 text-[#1A1C1E]" />
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1A1C1E]">
                        Workplace Deliverables & Tickets
                      </h4>
                    </div>
                    <span className="text-xs text-[#8A8A85] font-mono">2/3 Verified</span>
                  </div>

                  <div className="space-y-2.5">
                    {previewTasks.map((task, idx) => (
                      <div
                        key={task.id}
                        onClick={() => setActiveTaskIndex(idx)}
                        className={`p-3.5 rounded-sm border transition-all cursor-pointer ${
                          activeTaskIndex === idx
                            ? 'bg-[#F2F1EE] border-[#1A1C1E] shadow-2xs'
                            : 'bg-[#FFFFFF] border-[#E2E2DE] hover:border-[#CBCBC6] hover:bg-[#F9F8F6]'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span className="w-5 h-5 rounded-xs bg-[#1A1C1E] text-white text-[10px] font-mono font-bold flex items-center justify-center shrink-0">
                              {task.number}
                            </span>
                            <span className="text-xs sm:text-sm font-semibold text-[#1A1C1E] truncate">
                              {task.title}
                            </span>
                          </div>
                          <StatusLabel status={task.status} size="sm" />
                        </div>

                        <div className="flex items-center justify-between text-[11px] text-[#8A8A85] pl-7">
                          <span>{task.type} • {task.time}</span>
                          {task.score && (
                            <span className="font-mono font-bold text-[#115E59]">
                              Rubric Score: {task.score}/100
                            </span>
                          )}
                        </div>

                        {activeTaskIndex === idx && (
                          <div className="mt-2.5 pt-2 border-t border-[#E2E2DE] text-xs text-[#484B4F] flex items-start gap-2 pl-7">
                            <Sparkles className="w-3.5 h-3.5 text-[#3E51FF] shrink-0 mt-0.5" />
                            <span className="italic">{task.reviewSnippet}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column: Project Score, Telemetry & Career Growth (5 cols) */}
              <div className="lg:col-span-5 space-y-4">
                
                {/* Project Rubric Score Panel */}
                <div className="bg-[#F9F8F6] border border-[#E2E2DE] rounded-sm p-5">
                  <div className="flex items-center justify-between mb-3 pb-3 border-b border-[#E2E2DE]">
                    <div className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-[#3E51FF]" />
                      <span className="text-xs font-bold text-[#1A1C1E]">Verified Project Score</span>
                    </div>
                    <span className="px-2 py-0.5 rounded-2xs bg-[#F0FDFA] text-[#115E59] border border-[#CCFBF1] text-xs font-mono font-bold">
                      TOP 5% PEER RANK
                    </span>
                  </div>

                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="text-4xl font-extrabold text-[#1A1C1E] tracking-tight font-mono">
                      96.4
                    </span>
                    <span className="text-sm text-[#8A8A85] font-mono">/ 100 Overall</span>
                  </div>

                  <p className="text-xs text-[#484B4F] leading-relaxed mb-4">
                    Graded across 4 objective engineering dimensions: Architecture correctness, Concurrency safety, Unit test coverage, and Technical documentation.
                  </p>

                  <div className="space-y-2">
                    {[
                      { rubric: 'Code Quality & Algorithmic Efficiency', score: 98 },
                      { rubric: 'Concurrency & Edge-Case Handling', score: 95 },
                      { rubric: 'Automated Benchmark Test Suite', score: 96 },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between text-xs">
                        <span className="text-[#484B4F] truncate pr-2">{item.rubric}</span>
                        <span className="font-mono font-bold text-[#1A1C1E]">{item.score}%</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Career Growth & Verified Proof-of-Work */}
                <div className="bg-[#FFFFFF] border border-[#E2E2DE] rounded-sm p-5 space-y-3.5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-[#115E59]" />
                      <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1A1C1E]">
                        Career Growth & Competencies
                      </h4>
                    </div>
                    <span className="text-[11px] font-mono text-[#8A8A85]">+3 Verified</span>
                  </div>

                  <div className="space-y-2">
                    <div className="p-2.5 rounded-xs bg-[#F2F1EE] border border-[#E2E2DE] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <GitBranch className="w-3.5 h-3.5 text-[#3E51FF]" />
                        <span className="text-xs font-semibold text-[#1A1C1E]">Distributed Rate Limiting</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#115E59] font-bold">L4 Proficient</span>
                    </div>

                    <div className="p-2.5 rounded-xs bg-[#F2F1EE] border border-[#E2E2DE] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Code2 className="w-3.5 h-3.5 text-[#3E51FF]" />
                        <span className="text-xs font-semibold text-[#1A1C1E]">Redis Atomic Pipelines</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#115E59] font-bold">L3 Advanced</span>
                    </div>

                    <div className="p-2.5 rounded-xs bg-[#F2F1EE] border border-[#E2E2DE] flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <FileCheck2 className="w-3.5 h-3.5 text-[#3E51FF]" />
                        <span className="text-xs font-semibold text-[#1A1C1E]">Root Cause Analysis (RCA)</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#115E59] font-bold">L4 Proficient</span>
                    </div>
                  </div>

                  {/* Supervisor Testimonial Snippet */}
                  <div className="pt-3 border-t border-[#F2F1EE] flex items-start gap-2.5 text-xs text-[#484B4F]">
                    <div className="w-6 h-6 rounded-full bg-[#1A1C1E] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                      SJ
                    </div>
                    <div>
                      <span className="font-semibold text-[#1A1C1E]">Sarah Jenkins (Staff Engineer): </span>
                      <span className="text-[#8A8A85]">"Ready to merge pull request #489. Great attention to benchmark memory limits."</span>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Bottom Live Telemetry Footer Bar */}
          <div className="px-4 sm:px-6 py-3 bg-[#F9F8F6] border-t border-[#E2E2DE] flex flex-wrap items-center justify-between text-xs text-[#8A8A85] gap-3">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#115E59]" />
                <span className="text-[#1A1C1E] font-medium">Auto-Graded Test Suite</span>
              </span>
              <span className="hidden sm:inline">•</span>
              <span className="hidden sm:inline text-[#484B4F]">14/14 Integration Tests Passing</span>
            </div>

            <button
              onClick={onExploreClick}
              className="text-xs font-mono font-semibold text-[#3E51FF] hover:text-[#2D3FE6] flex items-center gap-1 group"
            >
              <span>Explore All 120+ Simulated Tracks</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
