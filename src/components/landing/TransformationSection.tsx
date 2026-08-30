import React from 'react';
import { XCircle, CheckCircle2, ArrowRight, ShieldCheck, Sparkles, TrendingUp } from 'lucide-react';
import { SectionHeading, CardTitle, BodyText } from '../../design-system/Typography';

export const TransformationSection: React.FC = () => {
  return (
    <section className="w-full bg-[#FFFFFF] py-16 sm:py-20 border-b border-[#E2E2DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-left">
          <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#8A8A85] mb-2">
            The Experience Paradigm Shift
          </div>
          <SectionHeading className="text-2xl sm:text-3xl text-[#1A1C1E]">
            Solving the Entry-Level Paradox
          </SectionHeading>
          <BodyText variant="secondary" className="mt-1 text-sm sm:text-base">
            Every student encounters the same Catch-22: you need experience to get hired, but you need a job to get experience. InternLab breaks that loop.
          </BodyText>
        </div>

        {/* High-Contrast Split Comparison Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          
          {/* Left Column: BEFORE InternLab */}
          <div className="p-6 sm:p-8 rounded-sm bg-[#F9F8F6] border border-[#E2E2DE] flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#E2E2DE]">
                <span className="text-xs font-mono font-bold uppercase text-[#8A8A85]">
                  Conventional Student Path
                </span>
                <span className="px-2 py-0.5 rounded-2xs bg-[#F2F1EE] text-[#484B4F] text-xs font-mono">
                  Before InternLab
                </span>
              </div>

              {/* Big Quote */}
              <div className="mb-6">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#8A8A85] tracking-tight mb-2">
                  "I have no experience."
                </div>
                <p className="text-xs sm:text-sm text-[#484B4F] leading-relaxed">
                  Graduating with classroom theory and YouTube tutorials, but zero exposure to actual enterprise sprint cadences or production bugs.
                </p>
              </div>

              {/* Pain points */}
              <div className="space-y-3 pt-2">
                {[
                  {
                    title: 'Generic Tutorial Clones',
                    desc: 'Resume lists basic Todo apps and unoriginal templates that recruiters immediately filter out.',
                  },
                  {
                    title: 'Zero Supervisor Feedback',
                    desc: 'No objective verification whether code or business analyses meet real production standards.',
                  },
                  {
                    title: 'Interview Paralysis',
                    desc: 'Struggling to answer behavioral and architectural questions without true team experiences.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xs bg-[#FFFFFF] border border-[#E2E2DE]">
                    <XCircle className="w-4 h-4 text-[#8A8A85] shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-[#1A1C1E]">{item.title}</h5>
                      <p className="text-xs text-[#8A8A85] mt-0.5 leading-normal">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#E2E2DE] text-xs font-mono text-[#8A8A85]">
              Outcome: 200+ cold applications with low response rates
            </div>
          </div>

          {/* Right Column: AFTER InternLab */}
          <div className="p-6 sm:p-8 rounded-sm bg-[#FFFFFF] border-2 border-[#1A1C1E] shadow-sm flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 px-3 py-1 bg-[#1A1C1E] text-white text-[10px] font-mono font-bold tracking-wider uppercase">
              Verified Proof of Work
            </div>

            <div>
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-[#E2E2DE]">
                <span className="text-xs font-mono font-bold uppercase text-[#1A1C1E]">
                  InternLab Accelerated Path
                </span>
                <span className="px-2 py-0.5 rounded-2xs bg-[#F0FDFA] text-[#115E59] border border-[#CCFBF1] text-xs font-mono font-bold">
                  After InternLab
                </span>
              </div>

              {/* Big Quote */}
              <div className="mb-6">
                <div className="text-2xl sm:text-3xl font-extrabold text-[#1A1C1E] tracking-tight mb-2">
                  "I have completed real-world projects and can demonstrate my skills."
                </div>
                <p className="text-xs sm:text-sm text-[#484B4F] leading-relaxed">
                  Stepping into interviews with tangible proof of work: rate-limiting benchmarks, SQL cohort models, and supervisor evaluations.
                </p>
              </div>

              {/* Verified Strengths */}
              <div className="space-y-3 pt-2">
                {[
                  {
                    title: 'Verifiable Proof-of-Work Portfolio',
                    desc: 'Share interactive code repositories, architecture diagrams, and benchmark latency logs directly.',
                  },
                  {
                    title: 'Objective Rubric & Staff Feedback',
                    desc: 'Every submission graded on 4 key workplace dimensions with verified 90%+ scores.',
                  },
                  {
                    title: 'High-Conviction Interview Stories',
                    desc: 'Confidently discuss real trade-offs, incident root causes, and production constraints.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xs bg-[#F9F8F6] border border-[#E2E2DE]">
                    <CheckCircle2 className="w-4 h-4 text-[#115E59] shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-[#1A1C1E]">{item.title}</h5>
                      <p className="text-xs text-[#484B4F] mt-0.5 leading-normal">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#E2E2DE] text-xs font-mono text-[#115E59] font-bold flex items-center justify-between">
              <span>Outcome: Practical workplace readiness from Day One</span>
              <ShieldCheck className="w-4 h-4 text-[#115E59]" />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
