import React, { useState } from 'react';
import { 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Flame, 
  Award, 
  TrendingUp, 
  Building2, 
  Calendar, 
  Play, 
  AlertCircle, 
  Check, 
  Layers, 
  FileText, 
  Sparkles, 
  ChevronRight, 
  Code2, 
  Terminal, 
  ExternalLink,
  Star,
  CheckCircle,
  Circle,
  HelpCircle,
  Eye
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { SkillsGrowthChart } from './SkillsGrowthChart';

interface DashboardOverviewProps {
  onNavigateTab: (tab: 'my-internships' | 'tasks' | 'projects' | 'career-progress' | 'certificates' | 'profile' | 'settings') => void;
}

export const DashboardOverview: React.FC<DashboardOverviewProps> = ({ onNavigateTab }) => {
  const { userProfile, navigate, internships, openMentor } = useApp();

  // Determine greeting based on time of day
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const firstName = userProfile.fullName ? userProfile.fullName.split(' ')[0] : 'Alex';

  // Current Active Internship
  const currentInternship = internships.find(i => i.id === 'intern-nova-frontend') || internships[0];

  // Interactive completed tasks state for overview demo
  const [completedTaskIds, setCompletedTaskIds] = useState<string[]>([]);

  const toggleTask = (taskId: string) => {
    setCompletedTaskIds(prev => 
      prev.includes(taskId) ? prev.filter(id => id !== taskId) : [...prev, taskId]
    );
  };

  // Structured Upcoming Tasks
  const upcomingTasks = [
    {
      id: 'task-build-product-page',
      title: 'Build Product Page',
      dueLabel: 'Due Tomorrow',
      dueUrgency: 'urgent', // urgent, upcoming, standard
      estimatedTime: '2.5 hrs',
      module: 'Week 3 • Core Feature',
      skills: ['React 18', 'Tailwind CSS', 'TypeScript'],
      actionLabel: 'Resume Task',
      description: 'Implement the responsive product catalog grid with live category tags and cart drawer hook.',
    },
    {
      id: 'task-implement-auth',
      title: 'Implement Authentication',
      dueLabel: 'Due in 3 Days',
      dueUrgency: 'upcoming',
      estimatedTime: '3.0 hrs',
      module: 'Week 3 • API & State',
      skills: ['JWT', 'React Context', 'Form Validation'],
      actionLabel: 'Open Brief',
      description: 'Connect login and session persistence tokens with client-side route guard middleware.',
    },
    {
      id: 'task-optimize-mobile',
      title: 'Optimize Mobile Experience',
      dueLabel: 'Due in 5 Days',
      dueUrgency: 'standard',
      estimatedTime: '1.5 hrs',
      module: 'Week 3 • Quality & Audit',
      skills: ['WCAG AA', 'Lighthouse', 'Touch Targets'],
      actionLabel: 'View Criteria',
      description: 'Audit touch targets (min 44px) and verify zero horizontal layout overflow on 375px screens.',
    },
  ];

  // Recent Activity Feed
  const recentActivities = [
    {
      id: 'act-1',
      icon: CheckCircle2,
      iconColor: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      title: 'Submitted "E-commerce Dashboard"',
      subtext: 'Delivered dynamic data grid with search filters and pagination.',
      time: '2 hours ago',
      type: 'submission',
      score: 94,
    },
    {
      id: 'act-2',
      icon: Star,
      iconColor: 'text-amber-600 bg-amber-50 border-amber-200',
      title: 'Received feedback',
      subtext: 'Elena Rostova (Engineering Lead): "Exceptional clean component decomposition!"',
      time: 'Yesterday',
      type: 'feedback',
      badge: 'Score: 94/100',
    },
    {
      id: 'act-3',
      icon: CheckCircle,
      iconColor: 'text-blue-600 bg-blue-50 border-blue-200',
      title: 'Completed Week 2',
      subtext: 'Unlocked Week 3: Real Product Development & API Sync.',
      time: '2 days ago',
      type: 'milestone',
    },
    {
      id: 'act-4',
      icon: Award,
      iconColor: 'text-purple-600 bg-purple-50 border-purple-200',
      title: 'Earned Skill Badge: Component Architecture',
      subtext: 'Passed automated test evaluation with 100% test branch coverage.',
      time: '3 days ago',
      type: 'badge',
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200" id="student-dashboard-overview">
      
      {/* ========================================================================= */}
      {/* 1. WELCOME BANNER & DATE */}
      {/* ========================================================================= */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-[#E2E2DE]">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2 py-0.5 text-[11px] font-mono font-bold uppercase tracking-wider bg-[#1A1C1E] text-white rounded-xs">
              Student Workspace
            </span>
            <span className="text-xs text-[#8A8A85] font-mono">
              • Active Simulation Session
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#1A1C1E] tracking-tight">
            {getGreeting()}, {firstName}.
          </h1>
          <p className="text-sm sm:text-base text-[#5A5C60] mt-1">
            You're making great progress this week.
          </p>
        </div>

        {/* Quick Simulation Resume & Mentor Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={() => openMentor({ 
              view: 'dashboard', 
              contextTitle: 'Dashboard Trajectory & Sprint Priorities',
              initialPrompt: 'Can you review my current internship progress and advise on which task or skill improvement I should prioritize today?'
            })}
            className="px-4 py-2.5 bg-white hover:bg-[#EEF0FF] text-[#1A1C1E] hover:text-[#3E51FF] text-xs sm:text-sm font-semibold rounded-xs border border-[#D5D3CB] hover:border-[#C5CAFF] transition-colors flex items-center gap-2 shadow-2xs"
            id="dashboard-top-ask-mentor-btn"
          >
            <Sparkles className="w-4 h-4 text-[#3E51FF]" />
            <span>Ask Mentor</span>
          </button>

          <button
            onClick={() => navigate({ view: 'workspace', internshipId: currentInternship.id })}
            className="px-5 py-2.5 bg-[#1A1C1E] hover:bg-black text-white text-xs sm:text-sm font-semibold rounded-xs transition-colors flex items-center gap-2 shadow-xs group"
            id="dashboard-top-resume-button"
          >
            <Play className="w-3.5 h-3.5 fill-white" />
            <span>Resume Workspace</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. THREE CORE ORIENTATION PANELS (WHAT AM I DOING? WHAT NEXT? PROGRESS?) */}
      {/* ========================================================================= */}
      
      {/* SECTION: WHAT AM I DOING? (CURRENT INTERNSHIP & VISUAL ROADMAP) */}
      <section className="bg-white border border-[#E2E2DE] rounded-lg p-5 sm:p-6 shadow-xs relative overflow-hidden" id="current-internship-module">
        
        {/* Top Header of Current Internship */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <div className="flex items-center gap-1 px-2 py-0.5 bg-[#F9F8F6] border border-[#E2E2DE] rounded-xs text-[11px] font-semibold text-[#1A1C1E]">
                <Building2 className="w-3 h-3 text-[#3E51FF]" />
                <span>Simulated Company: <strong>{currentInternship.companyName || 'Nova Labs'}</strong></span>
              </div>

              <span className="px-2 py-0.5 text-[11px] font-bold bg-blue-50 text-blue-800 border border-blue-200 rounded-xs uppercase tracking-wider">
                Active Program
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl font-extrabold text-[#1A1C1E] tracking-tight flex items-center gap-2">
              <span>{currentInternship.title}</span>
            </h2>
            <p className="text-xs sm:text-sm text-[#5A5C60] mt-1 max-w-2xl">
              "Join a fast-growing digital product company and work on realistic frontend development challenges."
            </p>
          </div>

          {/* Progress Percentage Badge & Graduation Trigger */}
          <div className="flex flex-col sm:items-end gap-2 shrink-0">
            <div className="flex items-center sm:flex-col sm:items-end gap-3 sm:gap-1 bg-[#F9F8F6] p-3 rounded-md border border-[#E2E2DE]">
              <span className="text-xs font-mono text-[#8A8A85] uppercase">Simulation Progress</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-mono font-black text-[#1A1C1E]">100%</span>
                <span className="text-xs text-emerald-700 font-bold">Requirements Met</span>
              </div>
              <span className="text-[11px] text-emerald-600 font-semibold">4 of 4 Weeks Done</span>
            </div>

            <button
              onClick={() => navigate({ view: 'completion-celebration', internshipId: 'IL-2026-948210' })}
              className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xs text-xs font-bold font-mono transition-colors flex items-center gap-1.5 shadow-2xs"
              id="btn-view-graduation-celebration"
            >
              <Award className="w-3.5 h-3.5" />
              <span>Claim & View Certificate</span>
            </button>
          </div>
        </div>

        {/* Global Progress Bar */}
        <div className="mb-6">
          <div className="w-full h-2.5 bg-[#F2F1EE] rounded-full overflow-hidden border border-[#E2E2DE]">
            <div 
              className="h-full bg-[#1A1C1E] rounded-full transition-all duration-500 relative"
              style={{ width: '68%' }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse" />
            </div>
          </div>
        </div>

        {/* Visual Roadmap (Week 1 ✓, Week 2 ✓, Week 3 In Progress, Week 4 Upcoming) */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#8A8A85]">
              Visual Roadmap (4-Week Schedule)
            </span>
            <span className="text-xs font-semibold text-[#3E51FF] flex items-center gap-1 cursor-pointer hover:underline" onClick={() => navigate({ view: 'workspace', internshipId: currentInternship.id })}>
              <span>Open Week 3 Tasks</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            
            {/* Week 1: Completed */}
            <div className="bg-[#F9F8F6] border border-[#E2E2DE] p-3.5 rounded-md relative group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-[#5A5C60]">WEEK 1</span>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xs">
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span>Completed</span>
                </span>
              </div>
              <h4 className="text-xs font-bold text-[#1A1C1E] mb-1">
                Frontend Fundamentals
              </h4>
              <p className="text-[11px] text-[#5A5C60] line-clamp-1">
                Responsive layout & WCAG AA contrast specs.
              </p>
              <div className="mt-2 text-[11px] font-mono text-emerald-700 font-semibold">
                Score: 92/100 ✓
              </div>
            </div>

            {/* Week 2: Completed */}
            <div className="bg-[#F9F8F6] border border-[#E2E2DE] p-3.5 rounded-md relative group">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-[#5A5C60]">WEEK 2</span>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-xs">
                  <Check className="w-3 h-3 text-emerald-600" />
                  <span>Completed</span>
                </span>
              </div>
              <h4 className="text-xs font-bold text-[#1A1C1E] mb-1">
                Building Components
              </h4>
              <p className="text-[11px] text-[#5A5C60] line-clamp-1">
                Modular React atom design tokens.
              </p>
              <div className="mt-2 text-[11px] font-mono text-emerald-700 font-semibold">
                Score: 94/100 ✓
              </div>
            </div>

            {/* Week 3: In Progress (Highlighted Active) */}
            <div className="bg-gradient-to-br from-[#EEF0FF] to-white border-2 border-[#3E51FF] p-3.5 rounded-md relative shadow-xs">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-[#3E51FF]">WEEK 3</span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-bold text-[#3E51FF] bg-white border border-[#C5CAFF] rounded-xs animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3E51FF]" />
                  <span>In Progress</span>
                </span>
              </div>
              <h4 className="text-xs font-bold text-[#1A1C1E] mb-1">
                Real Product Development
              </h4>
              <p className="text-[11px] text-[#5A5C60] line-clamp-1">
                API integration & optimistic data feeds.
              </p>
              <div className="mt-2 flex items-center justify-between text-[11px]">
                <span className="font-mono text-[#3E51FF] font-bold">2 of 3 tasks done</span>
                <button 
                  onClick={() => navigate({ view: 'workspace', internshipId: currentInternship.id })}
                  className="font-bold text-[#3E51FF] hover:underline flex items-center"
                >
                  Continue →
                </button>
              </div>
            </div>

            {/* Week 4: Upcoming */}
            <div className="bg-[#FDFCFB] border border-[#E2E2DE] p-3.5 rounded-md relative opacity-85">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono font-bold text-[#8A8A85]">WEEK 4</span>
                <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-medium text-[#8A8A85] bg-[#F2F1EE] border border-[#E2E2DE] rounded-xs">
                  <span>Upcoming</span>
                </span>
              </div>
              <h4 className="text-xs font-bold text-[#484B4F] mb-1">
                Final Project & Capstone
              </h4>
              <p className="text-[11px] text-[#8A8A85] line-clamp-1">
                Lighthouse audit & engineering PR review.
              </p>
              <div className="mt-2 text-[11px] font-mono text-[#8A8A85]">
                Locks until Week 3 completion
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* ========================================================================= */}
      {/* 3. PERFORMANCE OVERVIEW METRICS (Tasks 18, Streak 7, Score 84%) */}
      {/* ========================================================================= */}
      <section id="performance-overview-section">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          
          {/* Metric 1: Tasks Completed */}
          <div className="bg-white border border-[#E2E2DE] rounded-lg p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#8A8A85] block mb-1">
                Tasks Completed
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#1A1C1E] tracking-tight font-mono">
                18
              </div>
              <span className="text-xs text-emerald-600 font-medium flex items-center gap-1 mt-1">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+4 tasks completed this week</span>
              </span>
            </div>
            <div className="w-12 h-12 rounded-xs bg-[#F9F8F6] border border-[#E2E2DE] flex items-center justify-center text-[#1A1C1E]">
              <CheckCircle2 className="w-6 h-6 text-[#3E51FF]" />
            </div>
          </div>

          {/* Metric 2: Current Streak */}
          <div className="bg-white border border-[#E2E2DE] rounded-lg p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#8A8A85] block mb-1">
                Current Streak
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#1A1C1E] tracking-tight font-mono flex items-center gap-2">
                <span>7 Days</span>
                <Flame className="w-6 h-6 text-amber-500 fill-amber-500" />
              </div>
              <div className="flex items-center gap-1 mt-1.5">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => (
                  <span 
                    key={idx} 
                    className="w-4 h-4 rounded-full bg-amber-100 text-amber-800 text-[9px] font-bold flex items-center justify-center font-mono"
                    title={`Active on ${day}`}
                  >
                    ✓
                  </span>
                ))}
              </div>
            </div>
            <div className="w-12 h-12 rounded-xs bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600">
              <Flame className="w-6 h-6" />
            </div>
          </div>

          {/* Metric 3: Average Score */}
          <div className="bg-white border border-[#E2E2DE] rounded-lg p-5 shadow-xs flex items-center justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-[#8A8A85] block mb-1">
                Average Score
              </span>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#1A1C1E] tracking-tight font-mono">
                84%
              </div>
              <span className="text-xs text-purple-700 font-medium flex items-center gap-1 mt-1">
                <Award className="w-3.5 h-3.5 text-purple-600" />
                <span>Top tier rubric evaluations</span>
              </span>
            </div>
            <div className="w-12 h-12 rounded-xs bg-purple-50 border border-purple-200 flex items-center justify-center text-purple-600">
              <Award className="w-6 h-6" />
            </div>
          </div>

        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. TWO-COLUMN WORKSPACE: UPCOMING TASKS & SKILLS GROWTH */}
      {/* ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* LEFT COLUMN: UPCOMING STRUCTURED TASKS (WHAT SHOULD I DO NEXT?) */}
        <section className="lg:col-span-7 space-y-4" id="upcoming-tasks-container">
          
          <div className="bg-white border border-[#E2E2DE] rounded-lg p-5 shadow-xs">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E2E2DE]">
              <div>
                <h3 className="text-base font-bold text-[#1A1C1E] flex items-center gap-2">
                  <span>Upcoming Tasks</span>
                  <span className="px-2 py-0.5 text-xs font-mono font-bold bg-[#1A1C1E] text-white rounded-xs">
                    {upcomingTasks.length} Pending
                  </span>
                </h3>
                <p className="text-xs text-[#5A5C60] mt-0.5">
                  Priority deliverables requiring code, architecture, or audit submissions.
                </p>
              </div>

              <button
                onClick={() => onNavigateTab('tasks')}
                className="text-xs font-semibold text-[#3E51FF] hover:text-[#1A1C1E] flex items-center gap-1 transition-colors"
                id="view-all-tasks-link"
              >
                <span>Full Task Board</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Structured Task List (Tailored visual hierarchy, not identical cards) */}
            <div className="space-y-3">
              {upcomingTasks.map((task, index) => {
                const isChecked = completedTaskIds.includes(task.id);

                return (
                  <div
                    key={task.id}
                    className={`p-4 rounded-md border transition-all ${
                      isChecked
                        ? 'bg-[#F9F8F6] border-[#E2E2DE] opacity-60'
                        : task.dueUrgency === 'urgent'
                        ? 'bg-amber-50/40 border-amber-300 hover:border-amber-500 shadow-2xs'
                        : 'bg-white border-[#E2E2DE] hover:border-[#1A1C1E] shadow-2xs'
                    }`}
                    id={`task-item-${task.id}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      
                      {/* Checkbox & Details */}
                      <div className="flex items-start gap-3 flex-1">
                        <button
                          onClick={() => toggleTask(task.id)}
                          className={`mt-0.5 w-5 h-5 rounded-xs border flex items-center justify-center transition-colors shrink-0 ${
                            isChecked
                              ? 'bg-[#1A1C1E] border-[#1A1C1E] text-white'
                              : 'bg-white border-[#8A8A85] hover:border-[#1A1C1E]'
                          }`}
                          title={isChecked ? 'Mark pending' : 'Mark completed'}
                          id={`toggle-task-${task.id}`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </button>

                        <div className="space-y-1 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4 className={`text-sm font-bold text-[#1A1C1E] ${isChecked ? 'line-through text-[#8A8A85]' : ''}`}>
                              {task.title}
                            </h4>

                            {/* Due Date Badge */}
                            <span 
                              className={`px-2 py-0.5 rounded-xs text-[11px] font-semibold font-mono border ${
                                task.dueUrgency === 'urgent'
                                  ? 'bg-amber-100 text-amber-900 border-amber-300'
                                  : task.dueUrgency === 'upcoming'
                                  ? 'bg-blue-50 text-blue-800 border-blue-200'
                                  : 'bg-[#F2F1EE] text-[#484B4F] border-[#E2E2DE]'
                              }`}
                            >
                              {task.dueLabel}
                            </span>

                            <span className="text-[11px] font-mono text-[#8A8A85]">
                              • {task.estimatedTime}
                            </span>
                          </div>

                          <p className="text-xs text-[#5A5C60] leading-relaxed">
                            {task.description}
                          </p>

                          {/* Skill Tags */}
                          <div className="flex flex-wrap items-center gap-1.5 pt-1.5">
                            <span className="text-[10px] font-mono uppercase text-[#8A8A85]">Tech:</span>
                            {task.skills.map((skill, sIdx) => (
                              <span
                                key={sIdx}
                                className="text-[10px] px-1.5 py-0.5 bg-[#F9F8F6] border border-[#E2E2DE] text-[#1A1C1E] rounded-xs font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Action Button */}
                      <button
                        onClick={() => navigate({ view: 'workspace', internshipId: currentInternship.id })}
                        className="px-3 py-1.5 text-xs font-semibold text-[#1A1C1E] hover:text-white bg-[#F9F8F6] hover:bg-[#1A1C1E] border border-[#E2E2DE] rounded-xs transition-colors shrink-0 flex items-center gap-1"
                        id={`action-task-${task.id}`}
                      >
                        <span>{task.actionLabel}</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>

                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Quick Mentor Help Prompt Bar */}
          <div className="p-4 bg-[#FDFCFB] border border-[#E2E2DE] rounded-lg flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xs bg-[#1A1C1E] text-white flex items-center justify-center font-mono text-xs font-bold shrink-0">
                IM
              </div>
              <div>
                <h4 className="text-xs font-bold text-[#1A1C1E]">
                  Need task hints or architecture review?
                </h4>
                <p className="text-[11px] text-[#5A5C60]">
                  InternLab Career Mentor is standing by in your workspace.
                </p>
              </div>
            </div>

            <button
              onClick={() => navigate({ view: 'workspace', internshipId: currentInternship.id, activeTab: 'team-chat' })}
              className="px-3 py-1.5 bg-white hover:bg-[#F2F1EE] border border-[#E2E2DE] text-xs font-semibold text-[#1A1C1E] rounded-xs transition-colors shrink-0"
              id="ask-mentor-quick-button"
            >
              Ask Mentor
            </button>
          </div>

        </section>

        {/* RIGHT COLUMN: SKILLS GROWTH CHART (HOW AM I PROGRESSING?) */}
        <section className="lg:col-span-5 space-y-4" id="skills-growth-container">
          <SkillsGrowthChart />
        </section>

      </div>

      {/* ========================================================================= */}
      {/* 5. RECENT ACTIVITY TIMELINE FEED */}
      {/* ========================================================================= */}
      <section className="bg-white border border-[#E2E2DE] rounded-lg p-5 sm:p-6 shadow-xs" id="recent-activity-section">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#E2E2DE]">
          <div>
            <h3 className="text-base font-bold text-[#1A1C1E]">
              Recent Activity & Milestones
            </h3>
            <p className="text-xs text-[#5A5C60] mt-0.5">
              Chronological log of code commits, reviews, and unlocked competencies.
            </p>
          </div>

          <span className="text-xs font-mono text-[#8A8A85]">
            Auto-synced with workspace
          </span>
        </div>

        {/* Structured Timeline Feed */}
        <div className="relative border-l border-[#E2E2DE] ml-3 sm:ml-4 pl-4 sm:pl-6 space-y-6">
          {recentActivities.map((act) => {
            const IconComp = act.icon;

            return (
              <div key={act.id} className="relative group" id={`activity-item-${act.id}`}>
                {/* Timeline Pin */}
                <div className={`absolute -left-[25px] sm:-left-[33px] top-0 w-6 h-6 rounded-full border flex items-center justify-center text-xs ${act.iconColor} bg-white`}>
                  <IconComp className="w-3.5 h-3.5" />
                </div>

                {/* Content */}
                <div className="bg-[#FDFCFB] border border-[#E2E2DE] group-hover:border-[#1A1C1E] p-3.5 rounded-md transition-all">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                    <h4 className="text-xs sm:text-sm font-bold text-[#1A1C1E]">
                      {act.title}
                    </h4>
                    <span className="text-[11px] font-mono text-[#8A8A85]">
                      {act.time}
                    </span>
                  </div>

                  <p className="text-xs text-[#5A5C60] leading-relaxed">
                    {act.subtext}
                  </p>

                  {act.score && (
                    <div className="mt-2 flex items-center gap-2">
                      <span className="px-2 py-0.5 text-[10px] font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xs">
                        Rubric Grade: {act.score}% (A)
                      </span>
                      <span className="text-[11px] text-[#3E51FF] font-medium hover:underline cursor-pointer" onClick={() => onNavigateTab('projects')}>
                        View project artifact →
                      </span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

      </section>

    </div>
  );
};
