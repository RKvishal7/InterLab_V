import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  BarChart2, 
  Layers, 
  Award, 
  ArrowRight, 
  CheckCircle2, 
  Building2, 
  Sparkles, 
  Bookmark, 
  Share2, 
  Check, 
  ChevronRight, 
  ChevronDown, 
  ChevronUp, 
  FileText, 
  Code2, 
  Terminal, 
  Send, 
  HelpCircle, 
  Lightbulb, 
  Compass, 
  Briefcase, 
  Star, 
  ShieldCheck, 
  Play, 
  ArrowLeft,
  Calendar,
  Users,
  CheckCircle,
  ExternalLink,
  MessageSquareCode,
  Laptop
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { VirtualInternship } from '../../types';
import { Navbar } from '../layout/Navbar';

interface InternshipExperiencePageProps {
  internshipId?: string;
}

export const InternshipExperiencePage: React.FC<InternshipExperiencePageProps> = ({ 
  internshipId = 'intern-nova-frontend' 
}) => {
  const { internships, userProfile, enrollInInternship, navigate, getInternshipById } = useApp();

  // Find target internship, fallback to Nova Labs Frontend Developer
  const targetInternship = getInternshipById(internshipId) || 
    internships.find(i => i.id === 'intern-nova-frontend') || 
    internships[0];

  const isEnrolled = !!userProfile.enrolledInternships[targetInternship?.id || ''];
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [expandedWeek, setExpandedWeek] = useState<number | null>(1);
  const [selectedMentorPrompt, setSelectedMentorPrompt] = useState<number>(0);
  const [mentorChatDemoInput, setMentorChatDemoInput] = useState('');
  const [simulatedResponse, setSimulatedResponse] = useState<string | null>(null);
  const [isMentorTyping, setIsMentorTyping] = useState(false);

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [internshipId]);

  const handleEnroll = () => {
    if (!targetInternship) return;
    enrollInInternship(targetInternship.id);
    navigate({ view: 'workspace', internshipId: targetInternship.id });
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  // Structured default roadmap details for Frontend Developer Internship
  const roadmapWeeks = [
    {
      weekNumber: 1,
      title: 'Frontend Fundamentals & Workplace Briefing',
      objective: 'Master modern semantic HTML5, fluid layout systems, and JavaScript DOM manipulation by building responsive marketing interfaces.',
      tasks: [
        { id: 't1', title: 'Review Nova Labs product requirements & Figma design specs' },
        { id: 't2', title: 'Implement accessible navigation header with mobile drawer' },
        { id: 't3', title: 'Audit color contrast ratios and keyboard focus states (WCAG AA)' }
      ],
      estimatedHours: '4 Hours',
      deliverable: 'Responsive Marketing Page Skeleton + Accessibility Audit Sheet'
    },
    {
      weekNumber: 2,
      title: 'Building Components & Design Systems',
      objective: 'Transform static interface mockups into a strictly typed React component library using modern Tailwind CSS tokens.',
      tasks: [
        { id: 't4', title: 'Build polymorphic Button, Modal, Card, and Input atom components' },
        { id: 't5', title: 'Implement interactive component state with TypeScript interfaces' },
        { id: 't6', title: 'Construct dynamic product catalog grid with live tag filters' }
      ],
      estimatedHours: '4 Hours',
      deliverable: 'Reusable Component Library & Interactive Filter Matrix'
    },
    {
      weekNumber: 3,
      title: 'Real Product Development & API Sync',
      objective: 'Connect user interface views to asynchronous REST endpoints, manage optimistic UI states, and implement resilient error boundaries.',
      tasks: [
        { id: 't7', title: 'Integrate real-time analytics data feeds with caching logic' },
        { id: 't8', title: 'Implement shopping cart drawer with optimistic local state updates' },
        { id: 't9', title: 'Handle network latency, empty state views, and retry fallbacks' }
      ],
      estimatedHours: '4 Hours',
      deliverable: 'E-commerce Admin Dashboard with Live Filtering'
    },
    {
      weekNumber: 4,
      title: 'Final Project & Performance Optimization',
      objective: 'Engineer a production-ready application feature, conduct Lighthouse performance profiling, and submit a formal Pull Request.',
      tasks: [
        { id: 't10', title: 'Build full-featured interactive analytics workspace' },
        { id: 't11', title: 'Optimize Core Web Vitals (LCP < 2.2s, zero layout thrashing)' },
        { id: 't12', title: 'Author engineering PR notes and present final deliverable' }
      ],
      estimatedHours: '4 Hours',
      deliverable: 'Verified Capstone Project & Executive Pull Request'
    }
  ];

  // 3 Realistic Projects
  const realisticProjects = [
    {
      number: '01',
      title: 'Responsive Product Landing Page',
      badge: 'Component System',
      description: 'Build an accessible, high-conversion product landing page for Nova Labs\' creative software suite with fluid typography, responsive breakpoints, and WCAG AA contrast compliance.',
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Vite'],
      deliverables: ['Live responsive interface', 'Lighthouse 95+ audit score', 'Cross-browser compatibility verification'],
      resumeBullet: 'Architected responsive marketing interface with React and Tailwind CSS, achieving 98/100 Lighthouse performance and zero WCAG AA accessibility defects.'
    },
    {
      number: '02',
      title: 'E-commerce Dashboard',
      badge: 'State & API Sync',
      description: 'Develop an administrative inventory and revenue metrics dashboard featuring dynamic multi-column data tables, search filters, pagination, and slide-over modal drawers.',
      techStack: ['React 18', 'Async Data Fetching', 'Custom Hooks', 'Lucide Icons'],
      deliverables: ['Interactive data grid', 'Optimistic state updates', 'Asynchronous loading & error boundary fallbacks'],
      resumeBullet: 'Engineered multi-column data management dashboard supporting real-time search queries and optimistic cache updates across 1,000+ items.'
    },
    {
      number: '03',
      title: 'Final Product Experience',
      badge: 'Production Capstone',
      description: 'Construct a complete, production-grade web canvas workspace with custom user configuration panels, undo/redo state history, and automated component unit test suites.',
      techStack: ['React', 'TypeScript', 'Jest / RTL', 'CI/CD Pipeline'],
      deliverables: ['End-to-end interactive workspace', 'GitHub Pull Request documentation', 'Verified rubric portfolio artifact'],
      resumeBullet: 'Delivered production-ready web application capstone with 90%+ branch test coverage and comprehensive technical documentation reviewed by engineering leadership.'
    }
  ];

  // Mentor sample prompts
  const mentorDemoPrompts = [
    {
      title: 'Task Guidance',
      question: 'How should I break down the button matrix requirements in Week 1?',
      response: 'Focus on defining clear TypeScript prop contracts for variant (primary, outline, ghost) and size (sm, md, lg). Ensure you handle disabled states, aria-busy for loading spinners, and forwardRef so consumers can attach DOM refs seamlessly.'
    },
    {
      title: 'Socratic Hints',
      question: 'My component re-renders every time the filter input changes. What should I check?',
      response: 'Check if you are creating new inline object or array references inside your render body or passing unmemoized callbacks to child rows. You can isolate state to the search input component or debounce the query handler.'
    },
    {
      title: 'Submission Feedback',
      question: 'What rubric criteria does engineering look for on the Final Project?',
      response: 'We evaluate 4 dimensions: Code Architecture & Modularity (30%), Accessibility & Semantic Markup (25%), Visual Polish & Responsive Fidelity (25%), and Error Handling & Web Vitals Performance (20%).'
    },
    {
      title: 'Career Suggestions',
      question: 'How do I explain this Nova Labs simulation on my resume and in interviews?',
      response: 'Frame it under your Projects or Practical Experience section: "Frontend Systems Engineer (Virtual Simulation) — Nova Labs". Highlight that you architected reusable React component tokens and optimized client-side bundle performance.'
    }
  ];

  const handleSelectMentorDemo = (index: number) => {
    setSelectedMentorPrompt(index);
    setIsMentorTyping(true);
    setSimulatedResponse(null);
    setTimeout(() => {
      setSimulatedResponse(mentorDemoPrompts[index].response);
      setIsMentorTyping(false);
    }, 300);
  };

  const handleSendCustomMentorQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mentorChatDemoInput.trim()) return;
    setIsMentorTyping(true);
    setSimulatedResponse(null);
    setTimeout(() => {
      setSimulatedResponse(
        `Great question regarding "${mentorChatDemoInput}". As your InternLab Career Mentor, I'm here to provide task hints, code architecture reviews, and resume phrasing advice. In the live workspace, I will analyze your specific task code and give instant feedback!`
      );
      setIsMentorTyping(false);
      setMentorChatDemoInput('');
    }, 450);
  };

  if (!targetInternship) {
    return (
      <div className="min-h-screen bg-[#F9F8F6] text-[#1A1C1E] flex flex-col">
        <Navbar />
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center space-y-4">
            <h2 className="text-2xl font-bold">Internship not found</h2>
            <button 
              onClick={() => navigate({ view: 'discover' })}
              className="px-4 py-2 bg-[#1A1C1E] text-white rounded-xs text-sm font-semibold"
            >
              Browse Catalog
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#1A1C1E] flex flex-col font-sans selection:bg-[#EEF0FF] selection:text-[#3E51FF]">
      <Navbar />

      {/* Top Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="border-b border-[#E2E2DE] bg-[#FDFCFB]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between text-xs text-[#5A5C60]">
          <div className="flex items-center gap-2">
            <button
              onClick={() => navigate({ view: 'discover' })}
              className="hover:text-[#1A1C1E] flex items-center gap-1 font-medium transition-colors"
              id="breadcrumb-back-to-catalog"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Simulation Catalog</span>
            </button>
            <span>/</span>
            <span className="capitalize">{targetInternship.trackId.replace(/-/g, ' ')}</span>
            <span>/</span>
            <span className="font-semibold text-[#1A1C1E] truncate max-w-[200px] sm:max-w-none">
              {targetInternship.title}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-xs border transition-colors ${
                isBookmarked 
                  ? 'bg-amber-50 border-amber-200 text-amber-700 font-medium' 
                  : 'bg-white border-[#E2E2DE] text-[#5A5C60] hover:text-[#1A1C1E]'
              }`}
              id="top-bookmark-button"
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-amber-500' : ''}`} />
              <span>{isBookmarked ? 'Saved' : 'Save'}</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded-xs border border-[#E2E2DE] bg-white text-[#5A5C60] hover:text-[#1A1C1E] transition-colors"
              id="top-share-button"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Copied' : 'Share'}</span>
            </button>
          </div>
        </div>
      </nav>

      {/* ========================================================================= */}
      {/* 1. INTERNSHIP HERO SECTION */}
      {/* ========================================================================= */}
      <header className="border-b border-[#E2E2DE] bg-[#FFFFFF] relative overflow-hidden" id="internship-hero-section">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Hero Details & Direct Action */}
            <div className="lg:col-span-8 space-y-6">
              
              {/* Company & Track Tags */}
              <div className="flex flex-wrap items-center gap-2.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#F9F8F6] border border-[#E2E2DE] rounded-xs text-xs font-semibold text-[#1A1C1E]">
                  <Building2 className="w-3.5 h-3.5 text-[#3E51FF]" />
                  <span>Simulated Company: <strong>{targetInternship.companyName || 'Nova Labs'}</strong></span>
                </div>

                <span className="px-2.5 py-1 text-xs font-semibold uppercase tracking-wider bg-blue-50 text-blue-800 border border-blue-200 rounded-xs">
                  {targetInternship.trackId.replace(/-/g, ' ')}
                </span>

                <span className="px-2.5 py-1 text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xs flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>100% Free Virtual Program</span>
                </span>
              </div>

              {/* Title & Description */}
              <div>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1C1E] tracking-tight leading-tight mb-4">
                  {targetInternship.title}
                </h1>
                <p className="text-base sm:text-lg text-[#5A5C60] leading-relaxed max-w-2xl">
                  {targetInternship.id === 'intern-nova-frontend' 
                    ? '"Join a fast-growing digital product company and work on realistic frontend development challenges."'
                    : targetInternship.summary}
                </p>
              </div>

              {/* 4 Primary Hero Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 bg-[#F9F8F6] border border-[#E2E2DE] rounded-md">
                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#8A8A85] block mb-1">
                    Duration
                  </span>
                  <div className="text-base sm:text-lg font-bold text-[#1A1C1E] flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#3E51FF]" />
                    <span>{targetInternship.durationWeeks || 4} Weeks</span>
                  </div>
                  <span className="text-[11px] text-[#8A8A85]">~4 hrs / week</span>
                </div>

                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#8A8A85] block mb-1">
                    Difficulty
                  </span>
                  <div className="text-base sm:text-lg font-bold text-[#1A1C1E] flex items-center gap-1.5">
                    <BarChart2 className="w-4 h-4 text-emerald-600" />
                    <span>{targetInternship.difficulty || 'Beginner'}</span>
                  </div>
                  <span className="text-[11px] text-[#8A8A85]">Self-Paced</span>
                </div>

                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#8A8A85] block mb-1">
                    Projects
                  </span>
                  <div className="text-base sm:text-lg font-bold text-[#1A1C1E] flex items-center gap-1.5">
                    <Layers className="w-4 h-4 text-purple-600" />
                    <span>3 Realistic</span>
                  </div>
                  <span className="text-[11px] text-[#8A8A85]">Portfolio Ready</span>
                </div>

                <div>
                  <span className="text-[11px] font-mono uppercase tracking-wider text-[#8A8A85] block mb-1">
                    Skills
                  </span>
                  <div className="text-xs font-semibold text-[#1A1C1E] line-clamp-1">
                    HTML, CSS, JavaScript, React, Git
                  </div>
                  <span className="text-[11px] text-[#8A8A85]">Industry Standard</span>
                </div>
              </div>

              {/* Skills Tags List */}
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-xs font-mono uppercase text-[#8A8A85]">Tools & Skills:</span>
                {['HTML', 'CSS', 'JavaScript', 'React', 'Git', 'Tailwind CSS', 'TypeScript'].map((skill, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-medium px-2.5 py-1 bg-[#F2F1EE] border border-[#E2E2DE] rounded-xs text-[#1A1C1E]"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              {/* Hero Call to Action Row */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                {isEnrolled ? (
                  <button
                    onClick={() => navigate({ view: 'workspace', internshipId: targetInternship.id })}
                    className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base rounded-xs transition-colors flex items-center justify-center gap-2 shadow-sm"
                    id="hero-continue-internship-button"
                  >
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Continue In Workspace</span>
                  </button>
                ) : (
                  <button
                    onClick={handleEnroll}
                    className="px-8 py-3.5 bg-[#1A1C1E] hover:bg-black text-white font-bold text-sm sm:text-base rounded-xs transition-colors flex items-center justify-center gap-2 shadow-sm group"
                    id="hero-start-internship-button"
                  >
                    <span>Start Internship</span>
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                )}

                <div className="flex items-center gap-2 text-xs text-[#5A5C60] justify-center sm:justify-start">
                  <div className="flex -space-x-1">
                    {[
                      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
                      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
                      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&auto=format&fit=crop&q=80',
                    ].map((src, idx) => (
                      <img 
                        key={idx} 
                        src={src} 
                        alt="Graduate" 
                        className="w-6 h-6 rounded-full border-2 border-white object-cover" 
                        referrerPolicy="no-referrer"
                      />
                    ))}
                  </div>
                  <span><strong>{targetInternship.graduatesCount.toLocaleString()}</strong> students enrolled • <strong>{targetInternship.rating.toFixed(2)} ★</strong></span>
                </div>
              </div>

            </div>

            {/* Right Column: Program Highlights Snapshot Card */}
            <div className="lg:col-span-4">
              <div className="bg-[#FDFCFB] border border-[#E2E2DE] rounded-lg p-6 shadow-sm space-y-5">
                <div className="flex items-center justify-between border-b border-[#E2E2DE] pb-4">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[#8A8A85] block">
                      Program Format
                    </span>
                    <h3 className="font-bold text-sm text-[#1A1C1E]">
                      Professional Simulation
                    </h3>
                  </div>
                  <span className="px-2 py-0.5 text-xs font-bold bg-purple-50 text-purple-700 border border-purple-200 rounded-xs">
                    Self-Paced
                  </span>
                </div>

                <div className="space-y-3 text-xs text-[#484B4F]">
                  <div className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Realistic tickets & Figma briefs from <strong>{targetInternship.companyName}</strong></span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Direct feedback from <strong>InternLab Career Mentor</strong></span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>3 verified portfolio projects with resume-ready bullet points</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Verifiable Certificate of Completion for LinkedIn & CV</span>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#E2E2DE]">
                  <button
                    onClick={handleEnroll}
                    className="w-full py-2.5 bg-[#1A1C1E] hover:bg-black text-white text-xs font-semibold uppercase tracking-wider rounded-xs transition-colors shadow-xs"
                    id="sidebar-enroll-cta"
                  >
                    {isEnrolled ? 'Open Workspace' : 'Enroll Now (Free)'}
                  </button>
                  <p className="text-[11px] text-center text-[#8A8A85] mt-2">
                    No credit card required • Instant access
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </header>

      {/* Main Content Sections */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 sm:space-y-24">
        
        {/* ========================================================================= */}
        {/* 2. WHAT YOU WILL LEARN */}
        {/* ========================================================================= */}
        <section id="what-you-will-learn-section">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-[#3E51FF] font-bold block mb-1">
              Curriculum Core
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1C1E] tracking-tight mb-2">
              What You Will Learn
            </h2>
            <p className="text-sm sm:text-base text-[#5A5C60]">
              Gain practical engineering habits and production standards that align directly with junior frontend role expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[
              {
                title: 'Responsive development',
                desc: 'Build fluid layouts with modern CSS Grid, Flexbox, and mobile-first breakpoints that render flawlessly across phone, tablet, and widescreen viewports.',
                icon: Laptop,
                color: 'text-blue-600 bg-blue-50 border-blue-200'
              },
              {
                title: 'Component architecture',
                desc: 'Deconstruct complex UIs into clean, modular React 18 component trees with strict TypeScript props contracts, custom hooks, and predictable state flow.',
                icon: Layers,
                color: 'text-purple-600 bg-purple-50 border-purple-200'
              },
              {
                title: 'API integration',
                desc: 'Fetch asynchronous server data, manage client-side caching, and build resilient user interfaces with loading skeletons and error boundaries.',
                icon: Terminal,
                color: 'text-emerald-600 bg-emerald-50 border-emerald-200'
              },
              {
                title: 'Performance optimization',
                desc: 'Measure and improve Core Web Vitals (LCP, FID, CLS), eliminate unnecessary re-renders, and optimize asset delivery for sub-second page loads.',
                icon: BarChart2,
                color: 'text-amber-600 bg-amber-50 border-amber-200'
              },
              {
                title: 'Version control',
                desc: 'Operate standard Git branching workflows, write conventional commit messages, and author thorough Pull Request documentation for engineering reviews.',
                icon: Code2,
                color: 'text-cyan-600 bg-cyan-50 border-cyan-200'
              },
              {
                title: 'Accessibility & Semantics',
                desc: 'Implement WCAG 2.1 AA compliant color contrast, ARIA landmarks, keyboard focus management, and screen reader announcements.',
                icon: ShieldCheck,
                color: 'text-rose-600 bg-rose-50 border-rose-200'
              }
            ].map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white border border-[#E2E2DE] rounded-lg p-5 shadow-xs hover:border-[#1A1C1E] transition-all space-y-3"
                  id={`learn-card-${idx}`}
                >
                  <div className={`w-9 h-9 rounded-xs flex items-center justify-center border ${item.color}`}>
                    <IconComp className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-base text-[#1A1C1E]">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5A5C60] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. INTERNSHIP ROADMAP */}
        {/* ========================================================================= */}
        <section id="internship-roadmap-section">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-[#3E51FF] font-bold block mb-1">
              Structured Timeline
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1C1E] tracking-tight mb-2">
              Internship Roadmap
            </h2>
            <p className="text-sm sm:text-base text-[#5A5C60]">
              A progressive 4-week simulation taking you from workplace briefing to a reviewed capstone deliverable.
            </p>
          </div>

          <div className="space-y-4">
            {roadmapWeeks.map((week) => {
              const isExpanded = expandedWeek === week.weekNumber;
              return (
                <div
                  key={week.weekNumber}
                  className={`bg-white border rounded-lg transition-all overflow-hidden ${
                    isExpanded ? 'border-[#1A1C1E] shadow-sm' : 'border-[#E2E2DE] hover:border-[#8A8A85]'
                  }`}
                  id={`roadmap-week-${week.weekNumber}`}
                >
                  {/* Header Row */}
                  <button
                    onClick={() => setExpandedWeek(isExpanded ? null : week.weekNumber)}
                    className="w-full p-5 sm:p-6 text-left flex items-start sm:items-center justify-between gap-4 bg-[#FDFCFB]"
                  >
                    <div className="flex items-start sm:items-center gap-4">
                      <div className="w-10 h-10 rounded-xs bg-[#1A1C1E] text-white flex items-center justify-center font-mono font-bold text-sm shrink-0">
                        W{week.weekNumber}
                      </div>

                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-mono font-bold text-[#3E51FF] uppercase">
                            Week {week.weekNumber}
                          </span>
                          <span className="text-xs text-[#8A8A85]">•</span>
                          <span className="text-xs font-medium text-[#5A5C60] flex items-center gap-1">
                            <Clock className="w-3 h-3 text-[#8A8A85]" />
                            {week.estimatedHours}
                          </span>
                        </div>
                        <h3 className="text-base sm:text-lg font-bold text-[#1A1C1E]">
                          {week.title}
                        </h3>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="hidden sm:inline-block text-xs font-medium text-[#5A5C60]">
                        {isExpanded ? 'Hide Details' : 'View Tasks'}
                      </span>
                      <div className="p-1 rounded-xs bg-[#F2F1EE] text-[#1A1C1E]">
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </div>
                    </div>
                  </button>

                  {/* Expanded Content Body */}
                  {isExpanded && (
                    <div className="p-5 sm:p-6 pt-0 border-t border-[#E2E2DE] bg-white space-y-5 animate-in fade-in duration-150">
                      
                      {/* Objective */}
                      <div className="pt-4">
                        <h4 className="text-xs font-mono uppercase font-bold text-[#8A8A85] mb-1.5">
                          Weekly Objective
                        </h4>
                        <p className="text-sm text-[#484B4F] leading-relaxed bg-[#F9F8F6] p-3.5 rounded-xs border border-[#E2E2DE]">
                          {week.objective}
                        </p>
                      </div>

                      {/* Tasks List */}
                      <div>
                        <h4 className="text-xs font-mono uppercase font-bold text-[#8A8A85] mb-2.5">
                          Simulated Engineering Tasks
                        </h4>
                        <div className="space-y-2">
                          {week.tasks.map((task) => (
                            <div 
                              key={task.id}
                              className="flex items-start gap-3 p-3 bg-[#FDFCFB] border border-[#E2E2DE] rounded-xs text-xs sm:text-sm text-[#1A1C1E]"
                            >
                              <CheckCircle2 className="w-4 h-4 text-[#3E51FF] shrink-0 mt-0.5" />
                              <span>{task.title}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Weekly Deliverable */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-[#EEF0FF] border border-[#C5CAFF] rounded-xs text-xs">
                        <div className="flex items-center gap-2 text-[#3E51FF]">
                          <FileText className="w-4 h-4 shrink-0" />
                          <span><strong>Key Deliverable:</strong> {week.deliverable}</span>
                        </div>
                        <span className="font-mono text-[11px] text-[#3E51FF]">
                          Estimated Time: {week.estimatedHours}
                        </span>
                      </div>

                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. REALISTIC PROJECTS */}
        {/* ========================================================================= */}
        <section id="internship-projects-section">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-mono uppercase tracking-wider text-[#3E51FF] font-bold block mb-1">
              Verified Deliverables
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1C1E] tracking-tight mb-2">
              Projects You Will Build
            </h2>
            <p className="text-sm sm:text-base text-[#5A5C60]">
              Complete 3 production-grade deliverables that you can showcase on GitHub, your portfolio, and in technical interviews.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {realisticProjects.map((proj, idx) => (
              <div 
                key={idx}
                className="bg-white border border-[#E2E2DE] hover:border-[#1A1C1E] rounded-lg p-6 shadow-xs flex flex-col justify-between transition-all"
                id={`project-card-${idx + 1}`}
              >
                <div className="space-y-4">
                  
                  {/* Top Number & Badge */}
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xl font-black text-[#8A8A85]">
                      {proj.number}
                    </span>
                    <span className="px-2.5 py-0.5 text-xs font-semibold bg-[#F2F1EE] text-[#1A1C1E] border border-[#E2E2DE] rounded-xs">
                      {proj.badge}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-lg font-bold text-[#1A1C1E] mb-2">
                      {proj.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5A5C60] leading-relaxed">
                      {proj.description}
                    </p>
                  </div>

                  {/* Tech Stack Chips */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.techStack.map((tech, tIdx) => (
                      <span 
                        key={tIdx}
                        className="text-[11px] font-mono px-2 py-0.5 bg-[#F9F8F6] border border-[#E2E2DE] text-[#484B4F] rounded-xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Deliverables List */}
                  <div className="border-t border-[#E2E2DE] pt-3">
                    <span className="text-[11px] font-mono uppercase text-[#8A8A85] block mb-2 font-bold">
                      Deliverable Highlights
                    </span>
                    <ul className="space-y-1.5 text-xs text-[#484B4F]">
                      {proj.deliverables.map((del, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{del}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Resume Bullet Callout */}
                <div className="mt-5 pt-4 border-t border-[#E2E2DE] bg-[#FDFCFB] -mx-6 -mb-6 p-4 rounded-b-lg">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#3E51FF] font-bold block mb-1">
                    Resume Talking Point
                  </span>
                  <p className="text-xs text-[#5A5C60] italic leading-relaxed">
                    "{proj.resumeBullet}"
                  </p>
                </div>

              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. WHAT YOU WILL EXPERIENCE (Realistic Workplace Scenarios) */}
        {/* ========================================================================= */}
        <section className="bg-gradient-to-b from-[#FFFFFF] to-[#FDFCFB] border border-[#E2E2DE] rounded-xl p-6 sm:p-10 shadow-xs" id="workplace-experience-section">
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-mono uppercase tracking-wider text-[#3E51FF] font-bold block mb-1">
              Authentic Simulation
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1C1E] tracking-tight mb-2">
              What You Will Experience
            </h2>
            <p className="text-sm sm:text-base text-[#5A5C60]">
              Experience real day-to-day software engineering rhythms through 5 authentic workplace stages.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
            {[
              {
                step: '01',
                title: 'Receive a product brief',
                desc: 'Open simulated emails and engineering tickets from Nova Labs leads detailing feature goals and Figma mockups.',
                icon: FileText
              },
              {
                step: '02',
                title: 'Understand requirements',
                desc: 'Deconstruct user stories, technical acceptance criteria, and edge cases before writing code.',
                icon: Lightbulb
              },
              {
                step: '03',
                title: 'Complete development tasks',
                desc: 'Build functional React components, write clean CSS tokens, and test locally in the interactive workspace.',
                icon: Code2
              },
              {
                step: '04',
                title: 'Submit your work',
                desc: 'Push code, link repositories, or upload build artifacts to the formal engineering review portal.',
                icon: Send
              },
              {
                step: '05',
                title: 'Receive professional feedback',
                desc: 'Get instant multi-criteria rubric scoring, actionable code comments, and career resume advice.',
                icon: Award
              }
            ].map((stage, idx) => {
              const StageIcon = stage.icon;
              return (
                <div 
                  key={idx}
                  className="bg-white border border-[#E2E2DE] p-4 rounded-md shadow-2xs flex flex-col justify-between relative group hover:border-[#1A1C1E] transition-all"
                  id={`experience-step-${idx + 1}`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-mono text-xs font-bold text-[#3E51FF]">
                        Step {stage.step}
                      </span>
                      <div className="w-7 h-7 rounded-xs bg-[#F9F8F6] border border-[#E2E2DE] flex items-center justify-center text-[#1A1C1E]">
                        <StageIcon className="w-3.5 h-3.5" />
                      </div>
                    </div>
                    <h3 className="font-bold text-sm text-[#1A1C1E] mb-2 leading-snug">
                      {stage.title}
                    </h3>
                    <p className="text-xs text-[#5A5C60] leading-relaxed">
                      {stage.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. INSTRUCTOR / MENTOR: InternLab Career Mentor */}
        {/* ========================================================================= */}
        <section className="bg-white border border-[#E2E2DE] rounded-xl p-6 sm:p-10 shadow-xs" id="mentor-section">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Mentor Identity & Core Capabilities */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-[#3E51FF] font-bold block mb-1">
                  Professional Guidance
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1A1C1E] tracking-tight mb-2">
                  InternLab Career Mentor
                </h2>
                <p className="text-sm text-[#5A5C60] leading-relaxed">
                  You are never alone during the simulation. The InternLab Career Mentor acts as your dedicated staff engineer and career advisor, providing real-time coaching without spoon-feeding answers.
                </p>
              </div>

              {/* 4 Core Mentor Capabilities */}
              <div className="space-y-3">
                {[
                  {
                    title: 'Task guidance',
                    desc: 'Context-aware explanations for engineering briefs, design tokens, and technical architecture.',
                    icon: Compass
                  },
                  {
                    title: 'Hints',
                    desc: 'Socratic troubleshooting prompts that unblock you without spoiling the core problem-solving exercise.',
                    icon: Lightbulb
                  },
                  {
                    title: 'Submission feedback',
                    desc: 'Detailed rubric evaluations grading code modularity, accessibility, semantics, and performance.',
                    icon: Award
                  },
                  {
                    title: 'Career suggestions',
                    desc: 'Translates completed simulation milestones into high-impact bullet points for your resume and portfolio.',
                    icon: Briefcase
                  }
                ].map((cap, idx) => {
                  const CapIcon = cap.icon;
                  return (
                    <div 
                      key={idx}
                      className="flex items-start gap-3 p-3 bg-[#F9F8F6] border border-[#E2E2DE] rounded-xs"
                    >
                      <div className="w-6 h-6 rounded-xs bg-white border border-[#E2E2DE] flex items-center justify-center text-[#3E51FF] shrink-0 mt-0.5">
                        <CapIcon className="w-3.5 h-3.5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-xs text-[#1A1C1E]">
                          {cap.title}
                        </h3>
                        <p className="text-xs text-[#5A5C60] leading-relaxed">
                          {cap.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right: Interactive Mentor Interaction Demo */}
            <div className="lg:col-span-7 bg-[#FDFCFB] border border-[#E2E2DE] rounded-lg p-5 sm:p-6 shadow-xs">
              <div className="flex items-center justify-between border-b border-[#E2E2DE] pb-3 mb-4">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#1A1C1E] text-white flex items-center justify-center text-xs font-bold font-mono">
                    IM
                  </div>
                  <div>
                    <h3 className="font-bold text-xs text-[#1A1C1E]">InternLab Career Mentor</h3>
                    <span className="text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                      Active In Simulation Workspace
                    </span>
                  </div>
                </div>

                <span className="text-[11px] font-mono text-[#8A8A85]">
                  Interactive Preview
                </span>
              </div>

              {/* Sample Prompt Selector Tabs */}
              <div className="mb-4">
                <span className="text-[11px] font-mono uppercase text-[#8A8A85] block mb-2">
                  Sample Inquiries:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  {mentorDemoPrompts.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleSelectMentorDemo(idx)}
                      className={`text-left p-2.5 rounded-xs border text-xs transition-all ${
                        selectedMentorPrompt === idx
                          ? 'bg-[#1A1C1E] text-white border-[#1A1C1E] font-medium shadow-2xs'
                          : 'bg-white border-[#E2E2DE] text-[#484B4F] hover:bg-[#F2F1EE]'
                      }`}
                      id={`mentor-sample-tab-${idx}`}
                    >
                      <span className="font-bold block text-[11px] opacity-80">{p.title}</span>
                      <span className="truncate block">{p.question}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Chat Dialogue Container */}
              <div className="bg-white border border-[#E2E2DE] rounded-md p-4 min-h-[160px] flex flex-col justify-between mb-4">
                {/* User Prompt */}
                <div className="flex justify-end mb-3">
                  <div className="bg-[#EEF0FF] text-[#1A1C1E] text-xs p-3 rounded-xs border border-[#C5CAFF] max-w-[85%]">
                    {mentorDemoPrompts[selectedMentorPrompt]?.question}
                  </div>
                </div>

                {/* Mentor Response */}
                <div className="flex items-start gap-2.5">
                  <div className="w-6 h-6 rounded-full bg-[#1A1C1E] text-white flex items-center justify-center text-[10px] font-bold shrink-0 mt-1">
                    IM
                  </div>
                  <div className="bg-[#F9F8F6] border border-[#E2E2DE] p-3 rounded-xs text-xs text-[#1A1C1E] leading-relaxed max-w-[90%]">
                    {isMentorTyping ? (
                      <div className="flex items-center gap-1 py-1 text-[#8A8A85]">
                        <span className="animate-bounce">●</span>
                        <span className="animate-bounce [animation-delay:0.2s]">●</span>
                        <span className="animate-bounce [animation-delay:0.4s]">●</span>
                      </div>
                    ) : (
                      simulatedResponse || mentorDemoPrompts[selectedMentorPrompt]?.response
                    )}
                  </div>
                </div>
              </div>

              {/* Interactive Try-it Input */}
              <form onSubmit={handleSendCustomMentorQuestion} className="flex gap-2">
                <input
                  type="text"
                  value={mentorChatDemoInput}
                  onChange={(e) => setMentorChatDemoInput(e.target.value)}
                  placeholder="Ask a technical or career question..."
                  className="flex-1 px-3 py-2 text-xs bg-white border border-[#E2E2DE] rounded-xs focus:outline-none focus:border-[#1A1C1E]"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1A1C1E] text-white text-xs font-semibold rounded-xs hover:bg-black transition-colors"
                >
                  Send
                </button>
              </form>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. CONVINCING ENROLLMENT CTA BAR */}
        {/* ========================================================================= */}
        <section className="bg-[#1A1C1E] text-white rounded-xl p-8 sm:p-12 text-center relative overflow-hidden shadow-lg" id="final-enrollment-banner">
          <div className="max-w-2xl mx-auto space-y-6">
            <span className="px-3 py-1 bg-white/10 text-white border border-white/20 rounded-xs text-xs font-mono uppercase tracking-wider">
              {targetInternship.companyName} • Simulated Internship
            </span>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Ready to build real frontend experience?
            </h2>

            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              Join {targetInternship.graduatesCount.toLocaleString()}+ students who have completed practical simulations, built verified portfolios, and gained workplace confidence.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
              {isEnrolled ? (
                <button
                  onClick={() => navigate({ view: 'workspace', internshipId: targetInternship.id })}
                  className="w-full sm:w-auto px-8 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm sm:text-base rounded-xs transition-colors shadow-sm flex items-center justify-center gap-2"
                  id="final-continue-button"
                >
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Continue In Workspace</span>
                </button>
              ) : (
                <button
                  onClick={handleEnroll}
                  className="w-full sm:w-auto px-8 py-3.5 bg-white text-[#1A1C1E] hover:bg-gray-100 font-bold text-sm sm:text-base rounded-xs transition-colors shadow-sm flex items-center justify-center gap-2 group"
                  id="final-start-button"
                >
                  <span>Start Internship (Free)</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              )}

              <button
                onClick={() => navigate({ view: 'discover' })}
                className="w-full sm:w-auto px-6 py-3.5 bg-transparent hover:bg-white/10 text-white border border-white/30 text-xs font-semibold rounded-xs transition-colors"
              >
                Browse Other Tracks
              </button>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-gray-400 pt-2">
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                100% Free & Self-Paced
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                Verified Certificate Included
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-400" />
                Mentorship & Instant Rubrics
              </span>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};
