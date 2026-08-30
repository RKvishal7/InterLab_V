import React from 'react';
import { ArrowUpRight, ShieldCheck, CheckCircle2, Sparkles, Terminal } from 'lucide-react';
import { DisplayHeading, SectionHeading, BodyText } from '../../design-system/Typography';
import { Button, SecondaryButton } from '../../design-system/Button';

interface FinalCtaSectionProps {
  onStartLearning: () => void;
  onExploreTracks: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({
  onStartLearning,
  onExploreTracks,
}) => {
  return (
    <section className="w-full bg-[#1A1C1E] text-white py-16 sm:py-20 border-b border-[#2C2E33]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Subtle pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xs bg-white/10 text-white/90 text-xs font-mono mb-6 border border-white/15">
          <Sparkles className="w-3.5 h-3.5 text-[#3E51FF]" />
          <span>JOIN 50,000+ STUDENTS GLOBALLY</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6 max-w-3xl mx-auto leading-tight text-[#F9F8F6]">
          Your Career Shouldn't Start After Graduation.
        </h2>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-[#E2E2DE]/80 max-w-2xl mx-auto mb-10 leading-relaxed">
          Step into simulated engineering, analytics, and design workflows today. Solve real tickets, earn rubric-verified ratings, and build proof of work before your next interview.
        </p>

        {/* CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
          <button
            onClick={onStartLearning}
            className="px-6 py-3.5 rounded-sm bg-[#FFFFFF] text-[#1A1C1E] font-bold text-sm hover:bg-[#F2F1EE] transition-colors flex items-center gap-2 shadow-sm"
            id="final-cta-start-button"
          >
            <span>Start Your First Internship</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>

          <button
            onClick={onExploreTracks}
            className="px-6 py-3.5 rounded-sm bg-white/10 text-white font-semibold text-sm hover:bg-white/15 transition-colors border border-white/20"
            id="final-cta-explore-button"
          >
            Explore 10 Career Tracks
          </button>
        </div>

        {/* Value props badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-[#CBCBC6] font-mono">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>100% Free for Students</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>No Credit Card Required</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Verifiable Portfolio Artifacts</span>
          </div>
        </div>

      </div>
    </section>
  );
};
