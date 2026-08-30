import React from 'react';
import { Award, Users, BookCheck, ShieldCheck } from 'lucide-react';
import { SectionHeading, BodyText, Caption } from '../../design-system/Typography';

export const StatsSection: React.FC = () => {
  return (
    <section className="w-full bg-[#FFFFFF] border-b border-[#E2E2DE] py-10 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Horizontal Statistics Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-[#E2E2DE]">
          
          {/* Stat 1: 50,000+ Students Learning */}
          <div className="py-6 md:py-2 md:px-8 first:pl-0 flex flex-col justify-center">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1C1E] tracking-tight font-mono">
                50,000+
              </span>
            </div>
            <div className="text-sm font-bold text-[#1A1C1E] mb-1">
              Students Learning
            </div>
            <p className="text-xs text-[#8A8A85] leading-relaxed">
              From over 450+ colleges, universities, and coding academies worldwide building practical competency.
            </p>
          </div>

          {/* Stat 2: 120+ Virtual Internships */}
          <div className="py-6 md:py-2 md:px-8 flex flex-col justify-center">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1C1E] tracking-tight font-mono">
                120+
              </span>
            </div>
            <div className="text-sm font-bold text-[#1A1C1E] mb-1">
              Virtual Internships
            </div>
            <p className="text-xs text-[#8A8A85] leading-relaxed">
              Spanning 10 core career disciplines modeled directly on production company workflows.
            </p>
          </div>

          {/* Stat 3: 25,000+ Projects Completed */}
          <div className="py-6 md:py-2 md:px-8 last:pr-0 flex flex-col justify-center">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1C1E] tracking-tight font-mono">
                25,000+
              </span>
            </div>
            <div className="text-sm font-bold text-[#1A1C1E] mb-1">
              Projects Completed
            </div>
            <p className="text-xs text-[#8A8A85] leading-relaxed">
              Verified proof-of-work codebases, analytical models, and PRDs certified by automated rubrics.
            </p>
          </div>

        </div>

        {/* Footnote Bar */}
        <div className="mt-8 pt-6 border-t border-[#F2F1EE] flex flex-wrap items-center justify-between gap-4 text-xs text-[#8A8A85]">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#115E59]" />
            <span className="text-[#1A1C1E] font-medium">Standardized Evaluation Rubrics:</span>
            <span>Objective scoring criteria verified against hiring manager expectations</span>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono">
            <span>Zero Simulators • Pure Practical Artifacts</span>
          </div>
        </div>

      </div>
    </section>
  );
};
