import React, { useState } from 'react';
import { 
  Compass, 
  Briefcase, 
  Terminal, 
  Sparkles, 
  FolderCheck, 
  CheckCircle2, 
  ChevronRight, 
  Shield, 
  Award,
  ArrowRight
} from 'lucide-react';
import { SectionHeading, CardTitle, BodyText, Label } from '../../design-system/Typography';
import { Button } from '../../design-system/Button';

export const HowItWorksSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const steps = [
    {
      step: '01',
      title: 'Choose Your Path',
      icon: Compass,
      subtitle: 'Select from 10 high-impact career specializations',
      description: 'Explore curated simulations across software engineering, data science, product design, quant finance, and cybersecurity aligned with entry-level job market requirements.',
      deliverablePreview: {
        header: 'Career Pathway Selection',
        line1: 'Matched to role: Distributed Backend Engineer',
        line2: 'Recommended duration: 3-4 Weeks (Self-paced)',
        badge: 'Track Selected',
      },
    },
    {
      step: '02',
      title: 'Join an Internship',
      icon: Briefcase,
      subtitle: 'Onboard to your simulated company and team',
      description: 'Receive your company briefing, setup simulated developer tools, meet your virtual engineering manager or team lead, and review your first sprint milestone.',
      deliverablePreview: {
        header: 'Simulated Team Onboarding',
        line1: 'Assigned to: CloudScale Systems Platform Core',
        line2: 'Engineering Manager: Sarah Jenkins (Staff L6)',
        badge: 'Sprint Initialized',
      },
    },
    {
      step: '03',
      title: 'Complete Real Tasks',
      icon: Terminal,
      subtitle: 'Solve workplace tickets and build production artifacts',
      description: 'Work on actual challenges: implement Redis rate limiters, optimize SQL queries, design Figma design systems, or triage SOC security incidents—no passive video watching.',
      deliverablePreview: {
        header: 'Active Deliverable #ENG-489',
        line1: 'Feature: Sliding-Window Rate Limiter Algorithm',
        line2: 'Benchmark target: <15ms response under 50k req/s',
        badge: 'In Development',
      },
    },
    {
      step: '04',
      title: 'Get Feedback',
      icon: Sparkles,
      subtitle: 'Receive automated rubric analysis & manager reviews',
      description: 'Submit your code repositories or documents for rigorous evaluation against industry rubrics: architecture design, concurrency safety, edge-case coverage, and clarity.',
      deliverablePreview: {
        header: 'Automated Rubric Evaluation',
        line1: 'Score: 96.4/100 (Pass with Distinction)',
        line2: 'Supervisor: "Pull request approved with minor lint note."',
        badge: 'Rubric Passed',
      },
    },
    {
      step: '05',
      title: 'Build Your Portfolio',
      icon: FolderCheck,
      subtitle: 'Showcase verified Proof of Work to hiring managers',
      description: 'Every completed simulation produces a public, verified proof-of-work artifact and shareable credential with rubric breakdowns you can link directly on your resume and LinkedIn.',
      deliverablePreview: {
        header: 'Verified Proof-of-Work Credential',
        line1: 'Artifact: Distributed S3 Object Store Engine',
        line2: 'Ledger Hash: 0x8f4c...39b2 (Publicly Verifiable)',
        badge: 'Verified Credential',
      },
    },
  ];

  const currentStep = steps[activeStepIndex];

  return (
    <section id="how-it-works" className="w-full bg-[#F9F8F6] py-16 sm:py-20 border-b border-[#E2E2DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#8A8A85] mb-2">
            Structured Workplace Methodology
          </div>
          <SectionHeading className="text-2xl sm:text-3xl text-[#1A1C1E]">
            How InternLab Works
          </SectionHeading>
          <BodyText variant="secondary" className="mt-1 text-sm sm:text-base">
            A 5-step experiential journey that transforms theoretical classroom knowledge into demonstrable workplace competence.
          </BodyText>
        </div>

        {/* 5-Step Visual Timeline Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-8">
          {steps.map((item, index) => {
            const Icon = item.icon;
            const isActive = activeStepIndex === index;

            return (
              <button
                key={item.step}
                onClick={() => setActiveStepIndex(index)}
                className={`p-4 rounded-sm border text-left transition-all relative ${
                  isActive
                    ? 'bg-[#FFFFFF] border-[#1A1C1E] shadow-sm ring-1 ring-[#1A1C1E]'
                    : 'bg-[#F2F1EE] border-[#E2E2DE] hover:bg-[#FFFFFF] hover:border-[#CBCBC6]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-mono font-extrabold ${
                    isActive ? 'text-[#3E51FF]' : 'text-[#8A8A85]'
                  }`}>
                    {item.step}
                  </span>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-[#1A1C1E]' : 'text-[#8A8A85]'}`} />
                </div>

                <div className="text-xs sm:text-sm font-bold text-[#1A1C1E] leading-tight">
                  {item.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Interactive Step Detail Card */}
        <div className="bg-[#FFFFFF] border border-[#E2E2DE] rounded-sm p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Step Narrative (7 cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-xs bg-[#F2F1EE] text-[#1A1C1E] text-xs font-mono border border-[#E2E2DE]">
                <span>STEP {currentStep.step} OF 05</span>
                <span>•</span>
                <span className="text-[#3E51FF] font-bold">{currentStep.title}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-[#1A1C1E]">
                {currentStep.subtitle}
              </h3>

              <p className="text-sm text-[#484B4F] leading-relaxed">
                {currentStep.description}
              </p>

              <div className="pt-3 flex items-center gap-3">
                <button
                  onClick={() => setActiveStepIndex((prev) => (prev > 0 ? prev - 1 : 0))}
                  disabled={activeStepIndex === 0}
                  className="px-3 py-1.5 rounded-sm border border-[#E2E2DE] text-xs font-semibold text-[#1A1C1E] hover:bg-[#F2F1EE] disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Previous Step
                </button>

                <button
                  onClick={() => setActiveStepIndex((prev) => (prev < steps.length - 1 ? prev + 1 : prev))}
                  disabled={activeStepIndex === steps.length - 1}
                  className="px-3 py-1.5 rounded-sm bg-[#1A1C1E] text-white text-xs font-semibold hover:bg-black disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right: Live Step Artifact Preview (5 cols) */}
            <div className="lg:col-span-5 bg-[#F9F8F6] border border-[#E2E2DE] rounded-sm p-5 space-y-3">
              <div className="flex items-center justify-between pb-3 border-b border-[#E2E2DE]">
                <div className="text-[10px] font-mono uppercase tracking-wider text-[#8A8A85]">
                  Live System Deliverable
                </div>
                <span className="px-2 py-0.5 rounded-2xs bg-[#EEF0FF] text-[#3E51FF] text-[10px] font-mono font-bold">
                  {currentStep.deliverablePreview.badge}
                </span>
              </div>

              <h4 className="text-sm font-bold text-[#1A1C1E]">
                {currentStep.deliverablePreview.header}
              </h4>

              <div className="space-y-1.5 text-xs text-[#484B4F] font-mono">
                <div className="p-2 rounded-2xs bg-[#FFFFFF] border border-[#E2E2DE]">
                  {currentStep.deliverablePreview.line1}
                </div>
                <div className="p-2 rounded-2xs bg-[#FFFFFF] border border-[#E2E2DE]">
                  {currentStep.deliverablePreview.line2}
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2 text-[11px] text-[#8A8A85]">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#115E59]" />
                <span>Standardized workplace rubric verification</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
