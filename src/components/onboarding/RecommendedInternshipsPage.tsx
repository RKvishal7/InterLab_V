import React, { useState } from 'react';
import { 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  GraduationCap, 
  Briefcase, 
  Award, 
  Layers, 
  Star, 
  Compass, 
  Filter, 
  RotateCcw, 
  UserCheck, 
  TrendingUp, 
  Code, 
  Database, 
  Cpu, 
  Layout, 
  ShieldCheck, 
  Check, 
  BookOpen,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { VirtualInternship } from '../../types';
import { Navbar } from '../layout/Navbar';

export const RecommendedInternshipsPage: React.FC = () => {
  const { userProfile, internships, enrollInInternship, navigate } = useApp();
  const [filterTab, setFilterTab] = useState<'all' | 'high-match' | 'beginner' | 'tech' | 'business'>('all');
  const [enrollingId, setEnrollingId] = useState<string | null>(null);
  const [enrolledSuccessId, setEnrolledSuccessId] = useState<string | null>(null);

  const onboarding = userProfile.onboardingData || {
    primaryGoal: 'Gain practical experience',
    university: 'UC Berkeley',
    degree: 'B.S. Computer Science',
    currentYear: '3rd Year / Junior',
    careerInterests: ['Software Development', 'Artificial Intelligence'],
    skills: ['Python', 'SQL', 'JavaScript', 'Git', 'React'],
    experienceLevel: 'Intermediate',
    weeklyAvailability: '5–10 hours',
  };

  // Compute match score and matching tags dynamically
  const calculateMatchDetails = (internship: VirtualInternship) => {
    let score = 75; // baseline

    // Match career track
    const trackMatched = onboarding.careerInterests.some((interest) => {
      const lower = interest.toLowerCase();
      if (lower.includes('software') && internship.trackId === 'software-engineering') return true;
      if (lower.includes('data') && internship.trackId === 'data-science-ai') return true;
      if (lower.includes('ai') || lower.includes('artificial') && internship.trackId === 'artificial-intelligence') return true;
      if (lower.includes('design') || lower.includes('ui/ux') && internship.trackId === 'uiux-design') return true;
      if (lower.includes('finance') && internship.trackId === 'financial-analysis') return true;
      if (lower.includes('cyber') && internship.trackId === 'cybersecurity') return true;
      if (lower.includes('cloud') && (internship.trackId === 'cloud-computing' || internship.trackId === 'cloud-devops')) return true;
      if (lower.includes('product') && internship.trackId === 'product-management') return true;
      if (lower.includes('marketing') && internship.trackId === 'digital-marketing') return true;
      if (lower.includes('business') && internship.trackId === 'business-strategy') return true;
      return false;
    });

    if (trackMatched) score += 15;

    // Match skills overlap
    const matchedSkills = internship.toolsUsed.filter((tool) =>
      onboarding.skills.some((s) => tool.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(tool.toLowerCase()))
    );

    score += Math.min(8, matchedSkills.length * 3);

    // Match experience level
    if (internship.difficulty === onboarding.experienceLevel) {
      score += 2;
    }

    const finalScore = Math.min(99, Math.max(82, score));

    return {
      matchScore: finalScore,
      matchedSkills: matchedSkills.length > 0 ? matchedSkills : internship.toolsUsed.slice(0, 3),
      trackMatched,
    };
  };

  // Enhance internships with calculated scores and sort descending
  const scoredInternships = internships.map((i) => {
    const details = calculateMatchDetails(i);
    return {
      ...i,
      matchScore: details.matchScore,
      matchedSkills: details.matchedSkills,
    };
  }).sort((a, b) => b.matchScore - a.matchScore);

  // Filter based on active tab
  const filteredInternships = scoredInternships.filter((item) => {
    if (filterTab === 'high-match') return item.matchScore >= 90;
    if (filterTab === 'beginner') return item.difficulty === 'Beginner';
    if (filterTab === 'tech') return ['software-engineering', 'artificial-intelligence', 'data-science-ai', 'cloud-computing', 'cybersecurity'].includes(item.trackId);
    if (filterTab === 'business') return ['product-management', 'uiux-design', 'financial-analysis', 'digital-marketing', 'business-strategy'].includes(item.trackId);
    return true;
  });

  const handleStartSimulation = (internshipId: string) => {
    setEnrollingId(internshipId);
    enrollInInternship(internshipId);

    setTimeout(() => {
      setEnrollingId(null);
      setEnrolledSuccessId(internshipId);
      setTimeout(() => {
        // Direct into simulation workspace or discover
        navigate({ view: 'discover' });
      }, 700);
    }, 600);
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#1A1C1E] flex flex-col font-sans selection:bg-[#E2E2DE]">
      <Navbar />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {/* Top Header & Student Diagnostic Banner */}
        <div className="bg-white border border-[#E2E2DE] rounded-sm p-6 sm:p-8 mb-8 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#EEF0FF] border border-[#C7D2FE] rounded-xs text-xs font-mono font-medium text-[#3E51FF]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>ASSESSMENT COMPLETE &bull; PATHWAY GENERATED</span>
                </span>
                <span className="text-xs font-mono text-[#8A8A85]">
                  Updated {new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1C1E] font-serif">
                Recommended Internship Simulations
              </h1>
              <p className="text-sm text-[#484B4F] mt-1.5 max-w-2xl leading-relaxed">
                Based on your background at <strong className="text-[#1A1C1E]">{onboarding.university}</strong> ({onboarding.degree}, {onboarding.currentYear}), we've customized project roadmaps calibrated for <strong className="text-[#1A1C1E]">{onboarding.weeklyAvailability}</strong> of weekly focus.
              </p>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between gap-2 shrink-0 border-t sm:border-t-0 pt-4 sm:pt-0 border-[#E2E2DE]">
              <button
                onClick={() => navigate({ view: 'onboarding' })}
                className="px-3.5 py-1.5 text-xs font-medium text-[#484B4F] hover:text-[#1A1C1E] bg-[#F2F1EE] hover:bg-[#E2E2DE] rounded-sm border border-[#E2E2DE] transition-colors flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Adjust Preferences</span>
              </button>
            </div>
          </div>

          {/* Student Profile Attributes Pill Grid */}
          <div className="mt-6 pt-5 border-t border-[#E2E2DE] grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-[#F9F8F6] rounded-xs border border-[#E2E2DE]/70">
              <span className="text-[10px] font-mono uppercase text-[#8A8A85] block">Primary Goal</span>
              <span className="text-xs font-semibold text-[#1A1C1E] mt-0.5 truncate block">
                {onboarding.primaryGoal}
              </span>
            </div>
            <div className="p-3 bg-[#F9F8F6] rounded-xs border border-[#E2E2DE]/70">
              <span className="text-[10px] font-mono uppercase text-[#8A8A85] block">Experience Level</span>
              <span className="text-xs font-semibold text-[#1A1C1E] mt-0.5 block">
                {onboarding.experienceLevel} Tier
              </span>
            </div>
            <div className="p-3 bg-[#F9F8F6] rounded-xs border border-[#E2E2DE]/70">
              <span className="text-[10px] font-mono uppercase text-[#8A8A85] block">Weekly Availability</span>
              <span className="text-xs font-semibold text-[#1A1C1E] mt-0.5 block">
                {onboarding.weeklyAvailability}
              </span>
            </div>
            <div className="p-3 bg-[#F9F8F6] rounded-xs border border-[#E2E2DE]/70">
              <span className="text-[10px] font-mono uppercase text-[#8A8A85] block">Verified Skills</span>
              <span className="text-xs font-semibold text-[#1A1C1E] mt-0.5 truncate block">
                {onboarding.skills.slice(0, 3).join(', ')}{onboarding.skills.length > 3 ? ` +${onboarding.skills.length - 3}` : ''}
              </span>
            </div>
          </div>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: 'All Recommendations' },
              { id: 'high-match', label: 'Top Matches (90%+)' },
              { id: 'beginner', label: 'Beginner Friendly' },
              { id: 'tech', label: 'Software & AI' },
              { id: 'business', label: 'Product, Quant & Design' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterTab(tab.id as any)}
                className={`px-3.5 py-1.5 rounded-xs text-xs font-medium font-mono transition-all ${
                  filterTab === tab.id
                    ? 'bg-[#1A1C1E] text-white'
                    : 'bg-white text-[#484B4F] border border-[#E2E2DE] hover:bg-[#F2F1EE]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="text-xs font-mono text-[#8A8A85]">
            Showing <strong className="text-[#1A1C1E]">{filteredInternships.length}</strong> matching simulations
          </div>
        </div>

        {/* Internship Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredInternships.map((internship) => {
            const isEnrolling = enrollingId === internship.id;
            const isEnrolledSuccess = enrolledSuccessId === internship.id;
            const isAlreadyEnrolled = Boolean(userProfile.enrolledInternships?.[internship.id]);

            return (
              <div
                key={internship.id}
                className="bg-white border border-[#E2E2DE] rounded-sm p-6 flex flex-col justify-between hover:border-[#8A8A85] transition-all hover:shadow-xs group"
              >
                <div>
                  {/* Top Badges */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-[#F2F1EE] border border-[#E2E2DE] rounded-xs text-[10px] font-mono font-medium text-[#484B4F]">
                        {internship.companyTier}
                      </span>
                      <span className="text-[11px] font-mono text-[#8A8A85]">
                        {internship.durationWeeks} WEEKS &bull; {internship.estimatedTotalHours} HRS
                      </span>
                    </div>

                    {/* Match Score Badge */}
                    <div className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#F0FDFA] border border-[#CCFBF1] rounded-xs text-xs font-mono font-bold text-[#0D9488]">
                      <Sparkles className="w-3 h-3" />
                      <span>{internship.matchScore}% Match</span>
                    </div>
                  </div>

                  {/* Company and Title */}
                  <div className="mb-2">
                    <span className="text-xs font-mono font-semibold uppercase text-[#3E51FF] tracking-wider block">
                      {internship.companyName}
                    </span>
                    <h2 className="text-lg font-bold text-[#1A1C1E] tracking-tight group-hover:text-[#3E51FF] transition-colors mt-0.5">
                      {internship.title}
                    </h2>
                  </div>

                  {/* Summary */}
                  <p className="text-xs text-[#484B4F] leading-relaxed mb-4 line-clamp-3">
                    {internship.summary}
                  </p>

                  {/* Supervisor Persona preview */}
                  <div className="flex items-center gap-3 p-2.5 bg-[#F9F8F6] border border-[#E2E2DE]/70 rounded-xs mb-4">
                    <img
                      src={internship.supervisor.avatarUrl}
                      alt={internship.supervisor.name}
                      referrerPolicy="no-referrer"
                      className="w-8 h-8 rounded-full object-cover border border-[#E2E2DE]"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="text-xs font-semibold text-[#1A1C1E] truncate">
                        Supervisor: {internship.supervisor.name}
                      </div>
                      <div className="text-[10px] text-[#8A8A85] truncate font-mono">
                        {internship.supervisor.title}
                      </div>
                    </div>
                  </div>

                  {/* Matched Skills */}
                  <div className="mb-4">
                    <span className="text-[10px] font-mono uppercase text-[#8A8A85] block mb-1.5">
                      Technologies & Tools Applied
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {internship.toolsUsed.map((tool) => {
                        const isUserSkill = onboarding.skills.some((s) =>
                          tool.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(tool.toLowerCase())
                        );
                        return (
                          <span
                            key={tool}
                            className={`text-[11px] font-mono px-2 py-0.5 rounded-xs border ${
                              isUserSkill
                                ? 'bg-[#EEF0FF] text-[#3E51FF] border-[#C7D2FE] font-medium'
                                : 'bg-[#F2F1EE] text-[#484B4F] border-[#E2E2DE]'
                            }`}
                          >
                            {tool}
                          </span>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 border-t border-[#E2E2DE] flex items-center gap-2.5">
                  <button
                    onClick={() => handleStartSimulation(internship.id)}
                    disabled={isEnrolling || isEnrolledSuccess}
                    className={`flex-1 py-2.5 px-4 rounded-sm text-xs font-semibold font-mono transition-all flex items-center justify-center gap-2 ${
                      isEnrolledSuccess
                        ? 'bg-[#0D9488] text-white'
                        : isAlreadyEnrolled
                        ? 'bg-[#1A1C1E] text-white hover:bg-[#3E51FF]'
                        : 'bg-[#1A1C1E] text-white hover:bg-[#3E51FF]'
                    }`}
                  >
                    {isEnrolling ? (
                      <span>Enrolling in Simulation...</span>
                    ) : isEnrolledSuccess ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Enrolled! Launching...</span>
                      </>
                    ) : isAlreadyEnrolled ? (
                      <>
                        <span>Continue Simulation</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    ) : (
                      <>
                        <span>Start Simulation</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>

                  <button
                    onClick={() => navigate({ view: 'discover' })}
                    className="py-2.5 px-3 bg-white hover:bg-[#F2F1EE] border border-[#E2E2DE] text-xs font-mono text-[#484B4F] rounded-sm transition-colors"
                    title="View syllabus"
                  >
                    Syllabus
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Catalog Discovery Banner */}
        <div className="mt-10 p-6 bg-[#FFFFFF] border border-[#E2E2DE] rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h3 className="text-sm font-bold text-[#1A1C1E]">
              Want to explore our entire catalog of 40+ workplace simulations?
            </h3>
            <p className="text-xs text-[#484B4F] mt-0.5">
              Browse by career tracks, company tiers, and portfolio deliverable types.
            </p>
          </div>
          <button
            onClick={() => navigate({ view: 'discover' })}
            className="px-4 py-2 bg-[#F2F1EE] hover:bg-[#E2E2DE] text-xs font-semibold text-[#1A1C1E] rounded-sm border border-[#E2E2DE] transition-colors shrink-0 flex items-center gap-1.5"
          >
            <span>Explore All Tracks</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </main>
    </div>
  );
};
