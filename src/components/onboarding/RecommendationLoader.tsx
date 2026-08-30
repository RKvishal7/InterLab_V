import React, { useEffect, useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Database, 
  GraduationCap, 
  TrendingUp, 
  Cpu, 
  ShieldCheck, 
  ArrowRight,
  Loader2
} from 'lucide-react';
import { OnboardingAnswers } from '../../types';

interface RecommendationLoaderProps {
  answers: OnboardingAnswers;
  studentName?: string;
  onComplete: () => void;
}

interface MatchingStage {
  id: string;
  title: string;
  detail: string;
  icon: React.ElementType;
  durationMs: number;
}

export const RecommendationLoader: React.FC<RecommendationLoaderProps> = ({
  answers,
  studentName = 'Student',
  onComplete,
}) => {
  const [currentStageIndex, setCurrentStageIndex] = useState<number>(0);
  const [completedStages, setCompletedStages] = useState<string[]>([]);
  const [progressPercent, setProgressPercent] = useState<number>(10);

  const stages: MatchingStage[] = [
    {
      id: 'profile_diagnostic',
      title: 'Synthesizing Academic & Career Intent',
      detail: `Mapping ${answers.degree || 'Degree'} at ${answers.university || 'University'} with goal: "${answers.primaryGoal}"`,
      icon: GraduationCap,
      durationMs: 900,
    },
    {
      id: 'skill_vectoring',
      title: 'Benchmarking Technical & Domain Skills',
      detail: `Evaluating proficiency across ${answers.skills.length} verified competencies (${answers.skills.slice(0, 3).join(', ')}${answers.skills.length > 3 ? '...' : ''})`,
      icon: Cpu,
      durationMs: 1000,
    },
    {
      id: 'simulation_matching',
      title: 'Cross-Referencing Enterprise Simulation Catalog',
      detail: `Filtering corporate project tracks for ${answers.careerInterests.join(', ')} (${answers.experienceLevel} Tier)`,
      icon: Database,
      durationMs: 1100,
    },
    {
      id: 'pathway_generation',
      title: 'Assembling Tailored Internship Pathway',
      detail: `Calibrating milestone velocity for ${answers.weeklyAvailability} commitment`,
      icon: TrendingUp,
      durationMs: 800,
    },
  ];

  useEffect(() => {
    let currentIdx = 0;
    let timer: NodeJS.Timeout;

    const runStage = () => {
      if (currentIdx < stages.length) {
        const stage = stages[currentIdx];
        setCurrentStageIndex(currentIdx);
        setProgressPercent(Math.min(95, Math.round(((currentIdx + 1) / stages.length) * 100)));

        timer = setTimeout(() => {
          setCompletedStages((prev) => [...prev, stage.id]);
          currentIdx += 1;
          if (currentIdx < stages.length) {
            runStage();
          } else {
            setProgressPercent(100);
            setTimeout(() => {
              onComplete();
            }, 600);
          }
        }, stage.durationMs);
      }
    };

    runStage();

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#1A1C1E] flex flex-col justify-center items-center px-6 py-12 selection:bg-[#E2E2DE]">
      <div className="max-w-xl w-full">
        {/* Header Badge & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#EEF0FF] border border-[#C7D2FE] rounded-xs text-xs font-mono font-medium text-[#3E51FF] mb-4">
            <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '3s' }} />
            <span>AI MATCHING ENGINE ACTIVE</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1C1E] mb-2 font-serif">
            We're building your internship path.
          </h1>
          <p className="text-sm text-[#484B4F] max-w-md mx-auto">
            Personalizing enterprise project tracks, supervisor personas, and portfolio milestones for {studentName}.
          </p>
        </div>

        {/* Diagnostic Assessment Card */}
        <div className="bg-[#FFFFFF] border border-[#E2E2DE] p-6 sm:p-8 rounded-sm shadow-xs mb-6">
          {/* Main Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center text-xs font-mono text-[#8A8A85] mb-2">
              <span>Diagnostic Pipeline Progress</span>
              <span className="font-bold text-[#1A1C1E]">{progressPercent}%</span>
            </div>
            <div className="w-full bg-[#F2F1EE] h-2 rounded-full overflow-hidden border border-[#E2E2DE]/50">
              <div
                className="bg-[#1A1C1E] h-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Sequential Stages */}
          <div className="space-y-4">
            {stages.map((stage, idx) => {
              const isCompleted = completedStages.includes(stage.id);
              const isCurrent = currentStageIndex === idx && !isCompleted;
              const isPending = !isCompleted && !isCurrent;
              const Icon = stage.icon;

              return (
                <div
                  key={stage.id}
                  className={`flex items-start gap-3.5 p-3.5 rounded-sm border transition-all duration-300 ${
                    isCurrent
                      ? 'bg-[#F9F8F6] border-[#1A1C1E] shadow-2xs'
                      : isCompleted
                      ? 'bg-[#FFFFFF] border-[#E2E2DE] opacity-90'
                      : 'bg-[#FAF9F7] border-transparent opacity-40'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-xs flex items-center justify-center shrink-0 mt-0.5 ${
                      isCompleted
                        ? 'bg-[#F0FDFA] text-[#0D9488] border border-[#CCFBF1]'
                        : isCurrent
                        ? 'bg-[#1A1C1E] text-white'
                        : 'bg-[#F2F1EE] text-[#8A8A85]'
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : isCurrent ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                    ) : (
                      <Icon className="w-3.5 h-3.5" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3
                        className={`text-xs font-semibold ${
                          isCurrent
                            ? 'text-[#1A1C1E]'
                            : isCompleted
                            ? 'text-[#1A1C1E]'
                            : 'text-[#8A8A85]'
                        }`}
                      >
                        {stage.title}
                      </h3>
                      {isCompleted && (
                        <span className="text-[10px] font-mono text-[#0D9488] font-medium">
                          MATCHED
                        </span>
                      )}
                      {isCurrent && (
                        <span className="text-[10px] font-mono text-[#3E51FF] animate-pulse font-medium">
                          PROCESSING...
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#484B4F] mt-0.5 leading-relaxed truncate">
                      {stage.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Active Configuration Summary */}
          <div className="mt-6 pt-5 border-t border-[#E2E2DE] grid grid-cols-3 gap-2 text-center text-[11px] font-mono">
            <div className="p-2 bg-[#F9F8F6] rounded-xs border border-[#E2E2DE]/60">
              <span className="text-[#8A8A85] block text-[10px]">Tier</span>
              <span className="font-semibold text-[#1A1C1E]">{answers.experienceLevel}</span>
            </div>
            <div className="p-2 bg-[#F9F8F6] rounded-xs border border-[#E2E2DE]/60">
              <span className="text-[#8A8A85] block text-[10px]">Pace</span>
              <span className="font-semibold text-[#1A1C1E]">{answers.weeklyAvailability}</span>
            </div>
            <div className="p-2 bg-[#F9F8F6] rounded-xs border border-[#E2E2DE]/60">
              <span className="text-[#8A8A85] block text-[10px]">Interests</span>
              <span className="font-semibold text-[#1A1C1E] truncate block">
                {answers.careerInterests.length} Selected
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Notice */}
        <div className="text-center">
          <p className="text-xs text-[#8A8A85] flex items-center justify-center gap-1.5 font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-[#0D9488]" />
            FERPA & Academic Integrity Protected • Zero Simulation Cost
          </p>
        </div>
      </div>
    </div>
  );
};
