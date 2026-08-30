import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, MessageSquare, HelpCircle } from 'lucide-react';
import { MENTOR_PROFILE } from './mentorKnowledgeBase';

export const MentorFloatingTrigger: React.FC = () => {
  const { isMentorOpen, openMentor, route } = useApp();

  // Show only on primary interactive pages
  const allowedViews = ['workspace', 'project-feedback', 'dashboard', 'design-system'];
  if (!allowedViews.includes(route.view) || isMentorOpen) {
    return null;
  }

  const getContextLabel = () => {
    if (route.view === 'workspace') return 'Sprint 3 Task Guidance';
    if (route.view === 'project-feedback') return 'Review & Score Guidance';
    if (route.view === 'dashboard') return 'Sprint Trajectory Advice';
    return 'Ask Staff Mentor';
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
      <button
        onClick={() => openMentor()}
        className="group px-3.5 py-2.5 bg-[#1A1C1E] hover:bg-black text-white rounded-xs shadow-lg hover:shadow-xl border border-[#3A3C40] transition-all flex items-center gap-2.5 focus:outline-none focus:ring-2 focus:ring-[#3E51FF] focus:ring-offset-2"
        id="global-mentor-trigger-button"
        title="Open InternLab Mentor Assistant"
      >
        <div className="relative">
          <div className="w-6 h-6 rounded-xs bg-[#3E51FF] text-white flex items-center justify-center font-bold text-[10px]">
            SC
          </div>
          <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-emerald-400 border border-[#1A1C1E] rounded-full"></span>
        </div>

        <div className="text-left">
          <div className="text-xs font-bold flex items-center gap-1.5 leading-none">
            <span>Ask Mentor</span>
            <span className="hidden sm:inline-block text-[10px] font-normal text-[#B0B2B8]">
              ({MENTOR_PROFILE.name})
            </span>
          </div>
          <div className="hidden sm:block text-[10px] text-[#8E9094] leading-tight mt-0.5 font-mono">
            {getContextLabel()}
          </div>
        </div>

        <div className="pl-1 border-l border-[#3A3C40] text-[#A0A2A8] group-hover:text-white transition-colors">
          <MessageSquare className="w-3.5 h-3.5" />
        </div>
      </button>
    </div>
  );
};
