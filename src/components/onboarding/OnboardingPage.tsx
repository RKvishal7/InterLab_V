import React, { useState } from 'react';
import { 
  ArrowRight, 
  ArrowLeft, 
  Check, 
  Sparkles, 
  GraduationCap, 
  Layers, 
  Clock, 
  Briefcase, 
  Code, 
  Database, 
  Cpu, 
  Layout, 
  Megaphone, 
  TrendingUp, 
  DollarSign, 
  ShieldCheck, 
  Cloud, 
  Search, 
  Plus, 
  X,
  Target,
  Compass,
  Award,
  BookOpen,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CareerTrackId, ExperienceLevel, OnboardingAnswers } from '../../types';
import { RecommendationLoader } from './RecommendationLoader';

const GOAL_OPTIONS = [
  {
    id: 'Gain practical experience',
    title: 'Gain practical experience',
    description: 'Work on actual production problems and corporate ticket deliverables.',
    icon: Briefcase,
  },
  {
    id: 'Build a portfolio',
    title: 'Build a portfolio',
    description: 'Produce verified code repositories, PRDs, and financial models for employers.',
    icon: Award,
  },
  {
    id: 'Prepare for jobs',
    title: 'Prepare for jobs',
    description: 'Learn real workplace workflows, supervisor feedback cycles, and interview stories.',
    icon: Target,
  },
  {
    id: 'Explore career options',
    title: 'Explore career options',
    description: 'Try different roles (engineering, product, quant, design) risk-free before committing.',
    icon: Compass,
  },
  {
    id: 'Learn new skills',
    title: 'Learn new skills',
    description: 'Master in-demand industry tools like Docker, Redis, Figma tokens, and SQL analytics.',
    icon: BookOpen,
  },
];

const UNIVERSITY_SUGGESTIONS = [
  'UC Berkeley',
  'Stanford University',
  'MIT',
  'Harvard University',
  'Carnegie Mellon University',
  'University of Texas at Austin',
  'University of Washington',
  'Georgia Tech',
  'University of Michigan',
  'New York University (NYU)',
  'University of Toronto',
  'University of Oxford',
  'University of Cambridge',
  'Waterloo University',
  'UCLA',
  'Other / Self-Taught',
];

const DEGREE_SUGGESTIONS = [
  'B.S. Computer Science',
  'B.S. Data Science',
  'B.S. Electrical & Computer Engineering',
  'B.A. Economics',
  'B.B.A. Business Administration & Finance',
  'B.Des. UI/UX & Interaction Design',
  'B.S. Information Systems & Cybersecurity',
  'M.S. Computer Science / AI',
  'MBA / Management',
  'Bootcamp / Self-Taught Track',
];

const YEAR_OPTIONS = [
  { id: '1st Year / Freshman', label: '1st Year (Freshman)', sub: 'Building foundations' },
  { id: '2nd Year / Sophomore', label: '2nd Year (Sophomore)', sub: 'Starting core projects' },
  { id: '3rd Year / Junior', label: '3rd Year (Junior)', sub: 'Preparing for summer internships' },
  { id: '4th Year / Senior', label: '4th Year (Senior)', sub: 'Aiming for full-time offers' },
  { id: "Master's / Postgraduate", label: "Master's / Postgraduate", sub: 'Specialized advanced work' },
  { id: 'Recent Graduate', label: 'Recent Graduate', sub: 'Transitioning to industry' },
  { id: 'Self-Taught / Career Switcher', label: 'Self-Taught / Switcher', sub: 'Practical skill pivot' },
];

const CAREER_INTEREST_OPTIONS = [
  {
    id: 'Software Development',
    trackId: 'software-engineering' as CareerTrackId,
    name: 'Software Development',
    subtitle: 'Distributed backends, APIs, web systems',
    icon: Code,
  },
  {
    id: 'Data Science',
    trackId: 'data-science-ai' as CareerTrackId,
    name: 'Data Science',
    subtitle: 'SQL analytics, predictive modeling, EDA',
    icon: Database,
  },
  {
    id: 'Artificial Intelligence',
    trackId: 'artificial-intelligence' as CareerTrackId,
    name: 'Artificial Intelligence',
    subtitle: 'LLM agents, vector RAG, prompt engineering',
    icon: Cpu,
  },
  {
    id: 'UI/UX Design',
    trackId: 'uiux-design' as CareerTrackId,
    name: 'UI/UX Design',
    subtitle: 'Figma design tokens, wireframes, WCAG',
    icon: Layout,
  },
  {
    id: 'Digital Marketing',
    trackId: 'digital-marketing' as CareerTrackId,
    name: 'Digital Marketing',
    subtitle: 'Growth funnels, CAC/LTV, A/B experiments',
    icon: Megaphone,
  },
  {
    id: 'Business',
    trackId: 'business-strategy' as CareerTrackId,
    name: 'Business',
    subtitle: 'Market entry, unit economics, strategy',
    icon: TrendingUp,
  },
  {
    id: 'Finance',
    trackId: 'financial-analysis' as CareerTrackId,
    name: 'Finance',
    subtitle: 'Quant VaR models, DCF valuation, Excel',
    icon: DollarSign,
  },
  {
    id: 'Cybersecurity',
    trackId: 'cybersecurity' as CareerTrackId,
    name: 'Cybersecurity',
    subtitle: 'SOC triage, MITRE ATT&CK, threat hunting',
    icon: ShieldCheck,
  },
  {
    id: 'Cloud Computing',
    trackId: 'cloud-computing' as CareerTrackId,
    name: 'Cloud Computing',
    subtitle: 'Kubernetes, Terraform IaC, DevOps CI/CD',
    icon: Cloud,
  },
  {
    id: 'Product Management',
    trackId: 'product-management' as CareerTrackId,
    name: 'Product Management',
    subtitle: 'PRDs, user stories, RICE prioritization',
    icon: Briefcase,
  },
];

const PRESET_SKILLS = [
  'HTML',
  'CSS',
  'JavaScript',
  'TypeScript',
  'React',
  'Python',
  'SQL',
  'Git',
  'Figma',
  'Excel',
  'Docker',
  'Node.js',
  'Pandas & NumPy',
  'Machine Learning',
  'AWS / Cloud',
  'C++',
  'Java',
  'PostgreSQL',
  'User Research',
  'Financial Modeling',
  'A/B Testing',
  'Cyber Triage',
];

const EXPERIENCE_LEVEL_OPTIONS: {
  level: ExperienceLevel;
  quote: string;
  detail: string;
  badge: string;
}[] = [
  {
    level: 'Beginner',
    quote: 'I am just starting.',
    detail: 'Looking for guided scaffolding, clear milestone breakdowns, and foundational supervisor mentoring.',
    badge: 'Scaffolded Guidance',
  },
  {
    level: 'Intermediate',
    quote: 'I have completed some projects.',
    detail: 'Comfortable with core fundamentals and eager to tackle realistic engineering and business sprint tickets.',
    badge: 'Standard Sprint',
  },
  {
    level: 'Advanced',
    quote: 'I already have practical experience.',
    detail: 'Ready for rigorous architectural challenges, high-complexity systems, and senior staff engineer feedback.',
    badge: 'Autonomous Deep Dive',
  },
];

const AVAILABILITY_OPTIONS = [
  {
    id: '3–5 hours' as const,
    title: '3–5 hours',
    subtitle: 'Flexible Pace',
    description: 'Best for busy semesters or midterms. 1 milestone completed every 10–14 days.',
    commitmentBadge: 'Part-Time',
  },
  {
    id: '5–10 hours' as const,
    title: '5–10 hours',
    subtitle: 'Standard Sprint (Recommended)',
    description: 'Optimal balance. Complete 1 sprint milestone per week and finish simulations in 3 weeks.',
    commitmentBadge: 'Recommended',
    recommended: true,
  },
  {
    id: '10+ hours' as const,
    title: '10+ hours',
    subtitle: 'Accelerated Track',
    description: 'Intensive immersion. Complete multi-week corporate simulations in under 10 days.',
    commitmentBadge: 'Fast-Track',
  },
];

export const OnboardingPage: React.FC = () => {
  const { userProfile, updateUserProfile, setUserCareerTrack, navigate } = useApp();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [isMatchingLoading, setIsMatchingLoading] = useState<boolean>(false);

  // Form State
  const [primaryGoal, setPrimaryGoal] = useState<string>(
    userProfile.onboardingData?.primaryGoal || 'Gain practical experience'
  );
  const [university, setUniversity] = useState<string>(
    userProfile.onboardingData?.university || 'UC Berkeley'
  );
  const [degree, setDegree] = useState<string>(
    userProfile.onboardingData?.degree || 'B.S. Computer Science'
  );
  const [currentYear, setCurrentYear] = useState<string>(
    userProfile.onboardingData?.currentYear || '3rd Year / Junior'
  );
  const [careerInterests, setCareerInterests] = useState<string[]>(
    userProfile.onboardingData?.careerInterests?.length
      ? userProfile.onboardingData.careerInterests
      : ['Software Development', 'Artificial Intelligence']
  );
  const [skills, setSkills] = useState<string[]>(
    userProfile.onboardingData?.skills?.length
      ? userProfile.onboardingData.skills
      : ['Python', 'SQL', 'JavaScript', 'Git', 'React']
  );
  const [customSkillInput, setCustomSkillInput] = useState<string>('');
  const [skillSearchQuery, setSkillSearchQuery] = useState<string>('');
  const [experienceLevel, setExperienceLevel] = useState<ExperienceLevel>(
    userProfile.experienceLevel || 'Intermediate'
  );
  const [weeklyAvailability, setWeeklyAvailability] = useState<'3–5 hours' | '5–10 hours' | '10+ hours'>(
    userProfile.onboardingData?.weeklyAvailability || '5–10 hours'
  );

  // Validation
  const canProceedStep1 = Boolean(primaryGoal);
  const canProceedStep2 = Boolean(university.trim() && degree.trim() && currentYear);
  const canProceedStep3 = careerInterests.length > 0;
  const canProceedStep4 = skills.length > 0;
  const canProceedStep5 = Boolean(experienceLevel);
  const canProceedStep6 = Boolean(weeklyAvailability);

  const canProceedCurrentStep = () => {
    switch (currentStep) {
      case 1: return canProceedStep1;
      case 2: return canProceedStep2;
      case 3: return canProceedStep3;
      case 4: return canProceedStep4;
      case 5: return canProceedStep5;
      case 6: return canProceedStep6;
      default: return true;
    }
  };

  const toggleCareerInterest = (interestName: string) => {
    setCareerInterests((prev) =>
      prev.includes(interestName)
        ? prev.length > 1
          ? prev.filter((i) => i !== interestName)
          : prev
        : [...prev, interestName]
    );
  };

  const toggleSkill = (skill: string) => {
    setSkills((prev) =>
      prev.includes(skill)
        ? prev.filter((s) => s !== skill)
        : [...prev, skill]
    );
  };

  const handleAddCustomSkill = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = customSkillInput.trim();
    if (trimmed && !skills.includes(trimmed)) {
      setSkills((prev) => [...prev, trimmed]);
      setCustomSkillInput('');
    }
  };

  const handleNext = () => {
    if (currentStep < 6) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      handleFinalSubmission();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate({ view: 'landing' });
    }
  };

  const handleFinalSubmission = () => {
    const selectedQuote = EXPERIENCE_LEVEL_OPTIONS.find((o) => o.level === experienceLevel)?.quote || '';
    
    // Map primary career interest to trackId
    const primaryInterestObj = CAREER_INTEREST_OPTIONS.find((c) => careerInterests.includes(c.name));
    const targetTrackId: CareerTrackId = primaryInterestObj?.trackId || 'software-engineering';

    const hourCommitmentMap: Record<string, number> = {
      '3–5 hours': 4,
      '5–10 hours': 8,
      '10+ hours': 14,
    };

    const answersPayload: OnboardingAnswers = {
      primaryGoal,
      university,
      degree,
      currentYear,
      careerInterests,
      skills,
      experienceLevel,
      experienceQuote: selectedQuote,
      weeklyAvailability,
      completedAt: new Date().toISOString(),
    };

    // Save profile state
    setUserCareerTrack(targetTrackId);
    updateUserProfile({
      headline: `${degree} Student @ ${university}`,
      bio: `Targeting ${careerInterests.join(' & ')}. Skills: ${skills.slice(0, 4).join(', ')}. Goal: ${primaryGoal}.`,
      experienceLevel,
      weeklyHourCommitment: hourCommitmentMap[weeklyAvailability] || 8,
      interests: careerInterests,
      onboardingData: answersPayload,
    });

    // Launch recommendation loading transition
    setIsMatchingLoading(true);
  };

  const handleRecommendationComplete = () => {
    navigate({ view: 'recommended-internships' });
  };

  if (isMatchingLoading) {
    const answersPayload: OnboardingAnswers = {
      primaryGoal,
      university,
      degree,
      currentYear,
      careerInterests,
      skills,
      experienceLevel,
      weeklyAvailability,
    };

    return (
      <RecommendationLoader
        answers={answersPayload}
        studentName={userProfile.fullName || 'Alex Morgan'}
        onComplete={handleRecommendationComplete}
      />
    );
  }

  const stepLabels = [
    'Welcome & Goals',
    'Education',
    'Career Interests',
    'Current Skills',
    'Experience Level',
    'Weekly Availability',
  ];

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#1A1C1E] flex flex-col font-sans selection:bg-[#E2E2DE]">
      {/* Top Navbar Header */}
      <header className="sticky top-0 z-30 border-b border-[#E2E2DE] bg-[#F9F8F6]/95 backdrop-blur-xs px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <button
            onClick={() => navigate({ view: 'landing' })}
            className="flex items-center space-x-2.5 group"
          >
            <div className="w-8 h-8 bg-[#1A1C1E] text-[#F9F8F6] flex items-center justify-center font-bold text-xs rounded-xs font-mono group-hover:bg-[#3E51FF] transition-colors">
              IL
            </div>
            <div className="text-left">
              <span className="font-bold text-base tracking-tight text-[#1A1C1E] block leading-none">
                InternLab
              </span>
              <span className="text-[10px] font-mono text-[#8A8A85] block mt-0.5">
                Career Assessment & Simulation Path
              </span>
            </div>
          </button>
        </div>

        {/* Dynamic Progress Indicator */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[11px] font-semibold text-[#1A1C1E]">
              {stepLabels[currentStep - 1]}
            </span>
            <span className="text-[10px] font-mono text-[#8A8A85]">
              Step {currentStep} of 6
            </span>
          </div>

          <div className="w-24 sm:w-32 bg-[#E2E2DE] h-2 rounded-full overflow-hidden border border-[#E2E2DE]">
            <div
              className="bg-[#1A1C1E] h-full transition-all duration-300 ease-out"
              style={{ width: `${(currentStep / 6) * 100}%` }}
            />
          </div>

          <button
            onClick={() => navigate({ view: 'landing' })}
            className="p-1.5 text-[#8A8A85] hover:text-[#1A1C1E] rounded-xs text-xs font-mono hover:bg-[#F2F1EE] transition-colors"
            title="Exit assessment"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col justify-between">
        <div>
          {/* Breadcrumb Tracker */}
          <div className="mb-6 flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#F2F1EE] border border-[#E2E2DE] rounded-xs text-[11px] font-mono font-medium text-[#484B4F]">
              <span>ASSESSMENT STEP 0{currentStep} / 06</span>
            </div>
            <span className="text-xs font-mono text-[#8A8A85]">
              {Math.round((currentStep / 6) * 100)}% Completed
            </span>
          </div>

          {/* ================= STEP 1: WELCOME & GOALS ================= */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1C1E] font-serif">
                  Let's build your career path.
                </h1>
                <p className="text-sm text-[#484B4F] mt-2 leading-relaxed max-w-xl">
                  What brings you to InternLab? We will curate corporate simulations, supervisor rubrics, and project deliverables tailored to your exact goal.
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {GOAL_OPTIONS.map((option) => {
                  const isSelected = primaryGoal === option.id;
                  const Icon = option.icon;

                  return (
                    <button
                      key={option.id}
                      onClick={() => setPrimaryGoal(option.id)}
                      className={`w-full p-4 text-left rounded-sm border transition-all flex items-start gap-4 ${
                        isSelected
                          ? 'bg-[#FFFFFF] border-[#1A1C1E] shadow-xs'
                          : 'bg-[#FFFFFF] border-[#E2E2DE] hover:border-[#8A8A85] hover:bg-[#FAF9F7]'
                      }`}
                    >
                      <div
                        className={`w-9 h-9 rounded-xs flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected
                            ? 'bg-[#1A1C1E] text-white'
                            : 'bg-[#F2F1EE] text-[#484B4F]'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-semibold text-[#1A1C1E]">
                            {option.title}
                          </span>
                          {isSelected && (
                            <span className="w-5 h-5 rounded-full bg-[#1A1C1E] text-white flex items-center justify-center">
                              <Check className="w-3 h-3" />
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-[#484B4F] mt-1 leading-normal">
                          {option.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================= STEP 2: EDUCATION ================= */}
          {currentStep === 2 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1C1E] font-serif">
                  Tell us about your education.
                </h1>
                <p className="text-sm text-[#484B4F] mt-2 leading-relaxed">
                  This calibrates the expected technical depth and company simulation tier for your profile.
                </p>
              </div>

              <div className="space-y-5 pt-2">
                {/* University Input */}
                <div>
                  <label className="block text-xs font-mono font-medium text-[#1A1C1E] uppercase tracking-wider mb-2">
                    College / University
                  </label>
                  <input
                    type="text"
                    value={university}
                    onChange={(e) => setUniversity(e.target.value)}
                    placeholder="e.g. UC Berkeley, Stanford, University of Michigan..."
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E2E2DE] rounded-sm text-sm text-[#1A1C1E] focus:outline-none focus:border-[#1A1C1E] transition-colors"
                  />
                  {/* Suggestions Pill Bar */}
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {UNIVERSITY_SUGGESTIONS.slice(0, 6).map((uni) => (
                      <button
                        key={uni}
                        type="button"
                        onClick={() => setUniversity(uni)}
                        className={`text-[11px] px-2 py-0.5 rounded-xs border font-mono transition-colors ${
                          university === uni
                            ? 'bg-[#1A1C1E] text-white border-[#1A1C1E]'
                            : 'bg-white text-[#484B4F] border-[#E2E2DE] hover:bg-[#F2F1EE]'
                        }`}
                      >
                        {uni}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Degree Input */}
                <div>
                  <label className="block text-xs font-mono font-medium text-[#1A1C1E] uppercase tracking-wider mb-2">
                    Degree / Major
                  </label>
                  <input
                    type="text"
                    value={degree}
                    onChange={(e) => setDegree(e.target.value)}
                    placeholder="e.g. B.S. Computer Science, B.A. Economics..."
                    className="w-full px-3.5 py-2.5 bg-white border border-[#E2E2DE] rounded-sm text-sm text-[#1A1C1E] focus:outline-none focus:border-[#1A1C1E] transition-colors"
                  />
                  {/* Suggestions */}
                  <div className="flex flex-wrap gap-1.5 mt-2.5">
                    {DEGREE_SUGGESTIONS.slice(0, 5).map((deg) => (
                      <button
                        key={deg}
                        type="button"
                        onClick={() => setDegree(deg)}
                        className={`text-[11px] px-2 py-0.5 rounded-xs border font-mono transition-colors ${
                          degree === deg
                            ? 'bg-[#1A1C1E] text-white border-[#1A1C1E]'
                            : 'bg-white text-[#484B4F] border-[#E2E2DE] hover:bg-[#F2F1EE]'
                        }`}
                      >
                        {deg}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Current Year Selection */}
                <div>
                  <label className="block text-xs font-mono font-medium text-[#1A1C1E] uppercase tracking-wider mb-2">
                    Current Year
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {YEAR_OPTIONS.map((yr) => {
                      const isSelected = currentYear === yr.id;
                      return (
                        <button
                          key={yr.id}
                          type="button"
                          onClick={() => setCurrentYear(yr.id)}
                          className={`p-3 text-left rounded-sm border transition-all flex items-center justify-between ${
                            isSelected
                              ? 'bg-[#FFFFFF] border-[#1A1C1E] shadow-2xs'
                              : 'bg-white border-[#E2E2DE] hover:bg-[#FAF9F7]'
                          }`}
                        >
                          <div>
                            <div className="text-xs font-semibold text-[#1A1C1E]">
                              {yr.label}
                            </div>
                            <div className="text-[11px] text-[#8A8A85] mt-0.5">
                              {yr.sub}
                            </div>
                          </div>
                          {isSelected && (
                            <Check className="w-4 h-4 text-[#1A1C1E]" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 3: CAREER INTERESTS ================= */}
          {currentStep === 3 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1C1E] font-serif">
                    Select your career interests.
                  </h1>
                  <p className="text-sm text-[#484B4F] mt-1.5 leading-relaxed">
                    Select all areas you want to explore or specialize in.
                  </p>
                </div>
                <div className="text-xs font-mono text-[#8A8A85]">
                  <span className="font-bold text-[#1A1C1E]">{careerInterests.length}</span> of 10 selected
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                {CAREER_INTEREST_OPTIONS.map((interest) => {
                  const isSelected = careerInterests.includes(interest.name);
                  const Icon = interest.icon;

                  return (
                    <button
                      key={interest.id}
                      type="button"
                      onClick={() => toggleCareerInterest(interest.name)}
                      className={`p-3.5 text-left rounded-sm border transition-all flex items-start gap-3 ${
                        isSelected
                          ? 'bg-[#FFFFFF] border-[#1A1C1E] ring-1 ring-[#1A1C1E] shadow-2xs'
                          : 'bg-white border-[#E2E2DE] hover:border-[#8A8A85] hover:bg-[#FAF9F7]'
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-xs flex items-center justify-center shrink-0 mt-0.5 ${
                          isSelected
                            ? 'bg-[#1A1C1E] text-white'
                            : 'bg-[#F2F1EE] text-[#484B4F]'
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <span className="text-xs sm:text-sm font-semibold text-[#1A1C1E] truncate">
                            {interest.name}
                          </span>
                          {isSelected && (
                            <Check className="w-3.5 h-3.5 text-[#1A1C1E] shrink-0" />
                          )}
                        </div>
                        <p className="text-[11px] text-[#484B4F] mt-0.5 line-clamp-1">
                          {interest.subtitle}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================= STEP 4: CURRENT SKILLS ================= */}
          {currentStep === 4 && (
            <div className="space-y-6 animate-fadeIn">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1C1E] font-serif">
                    What skills do you currently know?
                  </h1>
                  <p className="text-sm text-[#484B4F] mt-1.5 leading-relaxed">
                    Select technologies, languages, or tools you are familiar with. You can also add custom skills.
                  </p>
                </div>
                <div className="text-xs font-mono text-[#8A8A85]">
                  <span className="font-bold text-[#1A1C1E]">{skills.length}</span> skills added
                </div>
              </div>

              {/* Add Custom Skill Form */}
              <form onSubmit={handleAddCustomSkill} className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={customSkillInput}
                    onChange={(e) => setCustomSkillInput(e.target.value)}
                    placeholder="Type a skill and press Enter (e.g. Next.js, TensorFlow, Notion, Tableau)..."
                    className="w-full pl-3.5 pr-10 py-2 bg-white border border-[#E2E2DE] rounded-sm text-sm text-[#1A1C1E] focus:outline-none focus:border-[#1A1C1E]"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!customSkillInput.trim()}
                  className="px-4 py-2 bg-[#1A1C1E] text-white text-xs font-medium rounded-sm hover:bg-[#3E51FF] transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </form>

              {/* Selected Skills Chips */}
              {skills.length > 0 && (
                <div className="p-4 bg-white border border-[#E2E2DE] rounded-sm">
                  <div className="text-[11px] font-mono text-[#8A8A85] mb-2.5">
                    YOUR VERIFIED SKILLS MATRIX ({skills.length})
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#1A1C1E] text-white text-xs font-mono rounded-xs"
                      >
                        <span>{skill}</span>
                        <button
                          type="button"
                          onClick={() => toggleSkill(skill)}
                          className="text-[#8A8A85] hover:text-white ml-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Popular Skill Library Pills */}
              <div>
                <div className="text-xs font-mono font-medium text-[#484B4F] uppercase tracking-wider mb-2.5">
                  Popular Skill Tags (Click to toggle)
                </div>
                <div className="flex flex-wrap gap-2">
                  {PRESET_SKILLS.map((skill) => {
                    const isSelected = skills.includes(skill);
                    return (
                      <button
                        key={skill}
                        type="button"
                        onClick={() => toggleSkill(skill)}
                        className={`text-xs px-3 py-1.5 rounded-xs border font-mono transition-all flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-[#EEF0FF] text-[#3E51FF] border-[#C7D2FE] font-semibold'
                            : 'bg-white text-[#484B4F] border-[#E2E2DE] hover:border-[#8A8A85] hover:bg-[#FAF9F7]'
                        }`}
                      >
                        {isSelected ? (
                          <Check className="w-3 h-3 text-[#3E51FF]" />
                        ) : (
                          <Plus className="w-3 h-3 text-[#8A8A85]" />
                        )}
                        <span>{skill}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* ================= STEP 5: EXPERIENCE LEVEL ================= */}
          {currentStep === 5 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1C1E] font-serif">
                  What is your experience level?
                </h1>
                <p className="text-sm text-[#484B4F] mt-2 leading-relaxed">
                  We will adjust the starter boilerplate, task instructions, and supervisor evaluation strictness accordingly.
                </p>
              </div>

              <div className="space-y-3.5 pt-2">
                {EXPERIENCE_LEVEL_OPTIONS.map((opt) => {
                  const isSelected = experienceLevel === opt.level;

                  return (
                    <button
                      key={opt.level}
                      type="button"
                      onClick={() => setExperienceLevel(opt.level)}
                      className={`w-full p-4 text-left rounded-sm border transition-all ${
                        isSelected
                          ? 'bg-[#FFFFFF] border-[#1A1C1E] shadow-xs'
                          : 'bg-white border-[#E2E2DE] hover:border-[#8A8A85] hover:bg-[#FAF9F7]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-base font-bold text-[#1A1C1E]">
                            {opt.level}
                          </span>
                          <span className="text-xs font-mono italic text-[#3E51FF] bg-[#EEF0FF] px-2 py-0.5 rounded-xs border border-[#C7D2FE]/60">
                            "{opt.quote}"
                          </span>
                        </div>
                        <span
                          className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-xs border ${
                            isSelected
                              ? 'bg-[#1A1C1E] text-white border-[#1A1C1E]'
                              : 'bg-[#F2F1EE] text-[#484B4F] border-[#E2E2DE]'
                          }`}
                        >
                          {opt.badge}
                        </span>
                      </div>
                      <p className="text-xs text-[#484B4F] leading-relaxed">
                        {opt.detail}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ================= STEP 6: WEEKLY AVAILABILITY ================= */}
          {currentStep === 6 && (
            <div className="space-y-6 animate-fadeIn">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#1A1C1E] font-serif">
                  What is your weekly availability?
                </h1>
                <p className="text-sm text-[#484B4F] mt-2 leading-relaxed">
                  How many hours per week can you dedicate to your simulation sprints? You can adjust this anytime.
                </p>
              </div>

              <div className="space-y-3.5 pt-2">
                {AVAILABILITY_OPTIONS.map((avail) => {
                  const isSelected = weeklyAvailability === avail.id;

                  return (
                    <button
                      key={avail.id}
                      type="button"
                      onClick={() => setWeeklyAvailability(avail.id)}
                      className={`w-full p-4 text-left rounded-sm border transition-all ${
                        isSelected
                          ? 'bg-[#FFFFFF] border-[#1A1C1E] shadow-xs'
                          : 'bg-white border-[#E2E2DE] hover:border-[#8A8A85] hover:bg-[#FAF9F7]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#1A1C1E]" />
                          <span className="text-base font-bold text-[#1A1C1E]">
                            {avail.title}
                          </span>
                          <span className="text-xs text-[#484B4F] font-medium">
                            • {avail.subtitle}
                          </span>
                        </div>
                        <span
                          className={`text-[10px] font-mono uppercase px-2 py-0.5 rounded-xs border ${
                            isSelected
                              ? 'bg-[#1A1C1E] text-white border-[#1A1C1E]'
                              : 'bg-[#F2F1EE] text-[#484B4F] border-[#E2E2DE]'
                          }`}
                        >
                          {avail.commitmentBadge}
                        </span>
                      </div>
                      <p className="text-xs text-[#484B4F] leading-relaxed pl-6">
                        {avail.description}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Bottom Navigation Control Bar */}
        <div className="pt-8 mt-8 border-t border-[#E2E2DE] flex items-center justify-between">
          <button
            type="button"
            onClick={handleBack}
            className="px-4 py-2.5 text-xs sm:text-sm font-medium text-[#484B4F] hover:text-[#1A1C1E] rounded-sm hover:bg-[#F2F1EE] transition-colors flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{currentStep === 1 ? 'Cancel' : 'Back'}</span>
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={!canProceedCurrentStep()}
            className={`px-6 py-2.5 rounded-sm text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 ${
              canProceedCurrentStep()
                ? 'bg-[#1A1C1E] text-white hover:bg-[#3E51FF] shadow-xs cursor-pointer'
                : 'bg-[#E2E2DE] text-[#8A8A85] cursor-not-allowed'
            }`}
          >
            <span>
              {currentStep === 6 ? 'Build My Internship Path' : 'Continue'}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </main>
    </div>
  );
};
