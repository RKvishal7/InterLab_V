import React from 'react';
import { 
  ArrowLeft, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  Lock, 
  Award, 
  Layers, 
  ExternalLink,
  ChevronRight,
  TrendingUp,
  Terminal,
  FileCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../../design-system';

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  badgeText?: string;
  children: React.ReactNode;
  alternateAction?: {
    text: string;
    actionLabel: string;
    onAction: () => void;
  };
}

export const AuthLayout: React.FC<AuthLayoutProps> = ({
  title,
  subtitle,
  badgeText = 'Student Career Gateway',
  children,
  alternateAction,
}) => {
  const { navigate } = useApp();

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#1A1C1E] flex flex-col selection:bg-[#E2E2DE] selection:text-[#1A1C1E]">
      {/* Top Header */}
      <header className="border-b border-[#E2E2DE] bg-[#F9F8F6]/95 backdrop-blur-sm sticky top-0 z-30 px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <button
            onClick={() => navigate({ view: 'landing' })}
            className="flex items-center space-x-2.5 group text-left focus:outline-none"
            id="auth-header-brand"
          >
            <div className="w-7 h-7 bg-[#1A1C1E] text-[#F9F8F6] flex items-center justify-center font-bold text-xs rounded-xs font-mono tracking-tighter shadow-xs group-hover:bg-[#3E51FF] transition-colors">
              IL
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-base tracking-tight text-[#1A1C1E] leading-none">
                InternLab
              </span>
              <span className="text-[9px] font-mono uppercase tracking-widest text-[#8A8A85] mt-0.5">
                Workplace Simulations
              </span>
            </div>
          </button>

          <div className="hidden md:flex items-center text-xs text-[#8A8A85] space-x-2 font-mono">
            <span className="text-[#E2E2DE]">/</span>
            <span>Identity & Access</span>
          </div>
        </div>

        <div className="flex items-center space-x-3 text-xs">
          <button
            onClick={() => navigate({ view: 'landing' })}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#484B4F] hover:text-[#1A1C1E] hover:bg-[#F2F1EE] rounded-sm transition-colors"
            id="auth-back-to-home"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Back to Platform</span>
            <span className="sm:hidden">Home</span>
          </button>

          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 bg-[#F2F1EE] border border-[#E2E2DE] rounded-xs text-[11px] font-mono text-[#484B4F]">
            <ShieldCheck className="w-3.5 h-3.5 text-[#15803D]" />
            <span>FERPA & SOC-2 Compliant</span>
          </div>
        </div>
      </header>

      {/* Main Content Area: Editorial Split Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 min-h-[calc(100vh-61px)]">
        {/* Left Side: Auth Interaction Column */}
        <section className="lg:col-span-6 xl:col-span-5 px-6 sm:px-12 lg:px-14 py-10 lg:py-16 flex flex-col justify-between border-r border-[#E2E2DE]/70">
          <div className="max-w-md w-full mx-auto lg:mx-0">
            {/* Header / Title */}
            <div className="mb-8">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F2F1EE] border border-[#E2E2DE] rounded-xs text-[11px] font-mono font-medium text-[#484B4F] mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1A1C1E]"></span>
                <span>{badgeText}</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1C1E] mb-2 leading-tight">
                {title}
              </h1>
              <p className="text-sm text-[#484B4F] leading-relaxed">
                {subtitle}
              </p>
            </div>

            {/* Auth Form & Specific Component */}
            <div>
              {children}
            </div>

            {/* Alternate Action Footer (e.g. Switch between Login and Register) */}
            {alternateAction && (
              <div className="mt-8 pt-6 border-t border-[#E2E2DE] text-center sm:text-left text-xs text-[#484B4F]">
                <span>{alternateAction.text} </span>
                <button
                  onClick={alternateAction.onAction}
                  className="font-semibold text-[#1A1C1E] hover:text-[#3E51FF] underline underline-offset-4 decoration-[#E2E2DE] hover:decoration-[#3E51FF] transition-colors"
                  id="auth-alternate-action"
                >
                  {alternateAction.actionLabel}
                </button>
              </div>
            )}
          </div>

          {/* Minimal security caption */}
          <div className="mt-12 pt-6 border-t border-[#E2E2DE]/50 flex items-center justify-between text-[11px] font-mono text-[#8A8A85]">
            <div className="flex items-center gap-1.5">
              <Lock className="w-3 h-3 text-[#8A8A85]" />
              <span>TLS 1.3 End-to-End Encrypted</span>
            </div>
            <span>v2.4.0-stable</span>
          </div>
        </section>

        {/* Right Side: Editorial Product Simulation Preview & Trust Anchor */}
        <section className="hidden lg:flex lg:col-span-6 xl:col-span-7 bg-[#F2F1EE]/60 p-10 xl:p-16 flex-col justify-between relative overflow-hidden">
          {/* Subtle Grid Accent */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#E2E2DE_1px,transparent_1px),linear-gradient(to_bottom,#E2E2DE_1px,transparent_1px)] bg-[size:32px_32px] opacity-40 pointer-events-none" />

          {/* Top Trust Banner */}
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 bg-[#1A1C1E] text-[#F9F8F6] text-[10px] font-mono font-semibold uppercase tracking-wider rounded-xs">
                  Workplace Simulation
                </span>
                <span className="text-xs font-mono text-[#8A8A85]">
                  Deliverable Artifact Preview
                </span>
              </div>
              <span className="text-xs font-mono font-medium text-[#15803D] flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-[#15803D] animate-pulse"></span>
                Live Cohort Active
              </span>
            </div>

            {/* Live Simulation Card Preview */}
            <div className="bg-[#FFFFFF] border border-[#E2E2DE] rounded-sm p-6 shadow-xs relative">
              <div className="flex items-start justify-between border-b border-[#E2E2DE] pb-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-xs font-mono font-semibold text-[#8A8A85]">
                      TICKET-4091
                    </span>
                    <span className="px-2 py-0.5 bg-[#FEF3C7] text-[#92400E] border border-[#FDE68A] text-[10px] font-mono font-semibold rounded-xs">
                      WEEK 2 MILESTONE
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-[#1A1C1E]">
                    Distributed Event Stream Aggregator & Fallback Queue
                  </h3>
                  <p className="text-xs text-[#484B4F] mt-1">
                    Apex Digital Systems &middot; Cloud Architecture Division
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono text-[#8A8A85]">Rubric Score</div>
                  <div className="text-lg font-bold font-mono text-[#1A1C1E]">96.4/100</div>
                  <span className="text-[10px] font-mono text-[#15803D] font-medium">Top 4% of cohort</span>
                </div>
              </div>

              {/* Task Simulation Deliverable Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4 text-xs">
                <div className="p-3 bg-[#F9F8F6] border border-[#E2E2DE] rounded-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-medium text-[#1A1C1E]">
                    <FileCheck className="w-3.5 h-3.5 text-[#3E51FF]" />
                    <span>Deliverable Submitted</span>
                  </div>
                  <p className="text-[11px] text-[#484B4F] font-mono truncate">
                    producer_consumer_stream.ts
                  </p>
                  <div className="text-[10px] text-[#8A8A85] flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-[#15803D]" />
                    <span>Unit & integration tests passing (14/14)</span>
                  </div>
                </div>

                <div className="p-3 bg-[#F9F8F6] border border-[#E2E2DE] rounded-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-medium text-[#1A1C1E]">
                    <Award className="w-3.5 h-3.5 text-[#D97706]" />
                    <span>Verified Skill Endorsement</span>
                  </div>
                  <p className="text-[11px] text-[#484B4F]">
                    Idempotent Kafka Consumers, Fault Tolerance
                  </p>
                  <div className="text-[10px] text-[#8A8A85]">
                    Signed by Staff Eng Supervisor
                  </div>
                </div>
              </div>

              {/* Supervisor Feedback Quote */}
              <div className="p-3.5 bg-[#FAF9F5] border border-[#E2E2DE] rounded-xs text-xs">
                <div className="flex items-center gap-2 mb-1.5">
                  <div className="w-5 h-5 rounded-full bg-[#1A1C1E] text-white flex items-center justify-center text-[9px] font-bold">
                    MK
                  </div>
                  <span className="font-semibold text-[#1A1C1E]">Marcus Krause</span>
                  <span className="text-[11px] text-[#8A8A85]">Staff Infrastructure Engineer &middot; Apex Digital</span>
                </div>
                <p className="text-xs text-[#484B4F] italic leading-relaxed">
                  &ldquo;Exceptional error recovery handling on network partition. The retry backoff strategy matches production service standards cleanly.&rdquo;
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Editorial Pillars */}
          <div className="relative z-10 pt-8 border-t border-[#E2E2DE]">
            <div className="grid grid-cols-3 gap-6">
              <div>
                <div className="text-xl font-bold font-mono text-[#1A1C1E]">50,000+</div>
                <div className="text-xs text-[#484B4F] mt-0.5 font-medium">Students Learning</div>
                <div className="text-[11px] text-[#8A8A85] mt-0.5">Across 450+ universities</div>
              </div>

              <div>
                <div className="text-xl font-bold font-mono text-[#1A1C1E]">120+</div>
                <div className="text-xs text-[#484B4F] mt-0.5 font-medium">Virtual Simulations</div>
                <div className="text-[11px] text-[#8A8A85] mt-0.5">Built on real company stacks</div>
              </div>

              <div>
                <div className="text-xl font-bold font-mono text-[#1A1C1E]">94.2%</div>
                <div className="text-xs text-[#484B4F] mt-0.5 font-medium">Interview Readiness</div>
                <div className="text-[11px] text-[#8A8A85] mt-0.5">Based on post-program polls</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};
