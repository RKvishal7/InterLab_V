import React, { useState } from 'react';
import { 
  Clock, 
  Layers, 
  Calendar, 
  Save, 
  Lightbulb, 
  GitPullRequest, 
  CheckCircle, 
  CheckCircle2, 
  Sparkles, 
  UserCheck, 
  AlertCircle, 
  ShieldCheck,
  ChevronRight,
  ExternalLink,
  Code2
} from 'lucide-react';
import { TaskRequirement } from './types';
import { useApp } from '../../context/AppContext';

interface WorkspaceRightPanelProps {
  requirements: TaskRequirement[];
  isCompleted: boolean;
  onToggleComplete: () => void;
  onOpenHintModal: () => void;
  onOpenSubmissionModal: () => void;
  onSaveProgress: () => void;
  lastSavedText: string;
  isSaving: boolean;
}

export const WorkspaceRightPanel: React.FC<WorkspaceRightPanelProps> = ({
  requirements,
  isCompleted,
  onToggleComplete,
  onOpenHintModal,
  onOpenSubmissionModal,
  onSaveProgress,
  lastSavedText,
  isSaving,
}) => {
  const { navigate, openMentor } = useApp();
  const completedCount = requirements.filter(r => r.completed).length;
  const progressPercent = Math.round((completedCount / requirements.length) * 100);

  return (
    <aside className="w-full h-full flex flex-col bg-[#F9F8F6] border-l border-[#E5E3DC] text-[#1A1C1E] select-none overflow-y-auto">
      {/* 1. Header: Task Details */}
      <div className="p-4 border-b border-[#E5E3DC] bg-[#FAF9F7]">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#5A5C60]">
            Task Details
          </span>
          <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase bg-amber-50 text-amber-800 border border-amber-200 rounded-xs">
            In Progress
          </span>
        </div>
        <h3 className="font-extrabold text-sm text-[#1A1C1E]">
          TASK-301 Specification
        </h3>
      </div>

      {/* 2. Key Metadata Cards */}
      <div className="p-4 space-y-4 border-b border-[#E5E3DC]">
        {/* Difficulty & Time */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-3 bg-white border border-[#E5E3DC] rounded-xs">
            <span className="text-[10px] font-mono uppercase text-[#8A8A85] block">
              Difficulty
            </span>
            <div className="mt-1 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-xs font-bold text-[#1A1C1E]">Intermediate</span>
            </div>
          </div>

          <div className="p-3 bg-white border border-[#E5E3DC] rounded-xs">
            <span className="text-[10px] font-mono uppercase text-[#8A8A85] block">
              Estimated Time
            </span>
            <div className="mt-1 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-[#5A5C60]" />
              <span className="text-xs font-bold text-[#1A1C1E]">4 Hours</span>
            </div>
          </div>
        </div>

        {/* Skills Required */}
        <div className="p-3 bg-white border border-[#E5E3DC] rounded-xs space-y-2">
          <div className="text-[10px] font-mono uppercase text-[#8A8A85]">
            Skills
          </div>
          <div className="flex flex-wrap gap-1.5">
            <span className="px-2 py-1 text-xs font-medium bg-[#EEF0FF] text-[#3E51FF] border border-[#C5CAFF] rounded-xs">
              React
            </span>
            <span className="px-2 py-1 text-xs font-medium bg-[#EEF0FF] text-[#3E51FF] border border-[#C5CAFF] rounded-xs">
              CSS
            </span>
            <span className="px-2 py-1 text-xs font-medium bg-[#EEF0FF] text-[#3E51FF] border border-[#C5CAFF] rounded-xs">
              Responsive Design
            </span>
          </div>
        </div>

        {/* Deadline */}
        <div className="p-3 bg-white border border-[#E5E3DC] rounded-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono uppercase text-[#8A8A85] block">
              Deadline
            </span>
            <div className="mt-0.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-[#3E51FF]" />
              <span className="text-xs font-bold text-[#1A1C1E]">
                3 Days Remaining
              </span>
            </div>
          </div>
          <span className="text-[10px] font-mono text-[#8A8A85]">
            Sept 2, 2026
          </span>
        </div>
      </div>

      {/* 3. Progress Indicator */}
      <div className="p-4 border-b border-[#E5E3DC] bg-white space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="font-bold text-[#1A1C1E]">Task Progress</span>
          <span className="font-mono font-bold text-[#3E51FF]">
            {progressPercent}% ({completedCount}/{requirements.length})
          </span>
        </div>

        <div className="w-full h-2 bg-[#E5E3DC] rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#3E51FF] transition-all duration-300 rounded-full" 
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="text-[11px] text-[#5A5C60] flex items-center justify-between">
          <span>{requirements.length - completedCount} criteria remaining</span>
          <span className="text-emerald-700 font-medium">Auto-check ready</span>
        </div>
      </div>

      {/* 4. ACTIONS Section */}
      <div className="p-4 space-y-2.5 border-b border-[#E5E3DC]">
        <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#5A5C60] mb-1">
          Actions
        </div>

        {/* Save Progress Button */}
        <button
          onClick={onSaveProgress}
          disabled={isSaving}
          className="w-full py-2.5 px-3 bg-white hover:bg-[#F2F1EE] border border-[#D5D3CB] text-[#1A1C1E] text-xs font-semibold rounded-xs transition-colors flex items-center justify-between group shadow-2xs"
          id="action-save-progress"
        >
          <div className="flex items-center gap-2">
            <Save className="w-3.5 h-3.5 text-[#5A5C60] group-hover:text-[#1A1C1E]" />
            <span>Save Progress</span>
          </div>
          <span className="text-[10px] font-mono text-[#8A8A85]">
            {isSaving ? 'Saving...' : lastSavedText}
          </span>
        </button>

        {/* Ask for Hint Button */}
        <button
          onClick={onOpenHintModal}
          className="w-full py-2.5 px-3 bg-[#EEF0FF] hover:bg-[#DCE1FF] border border-[#C5CAFF] text-[#3E51FF] text-xs font-bold rounded-xs transition-colors flex items-center justify-between group"
          id="action-ask-hint"
        >
          <div className="flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-[#3E51FF]" />
            <span>Ask for Hint</span>
          </div>
          <span className="text-[10px] font-mono bg-white text-[#3E51FF] px-1.5 py-0.5 rounded-xs border border-[#C5CAFF]">
            4 Available
          </span>
        </button>

        {/* Submit Project Button */}
        <button
          onClick={onOpenSubmissionModal}
          className="w-full py-3 px-3 bg-[#1A1C1E] hover:bg-black text-white text-xs font-bold rounded-xs transition-colors flex items-center justify-center gap-2 shadow-xs group"
          id="action-submit-project"
        >
          <GitPullRequest className="w-4 h-4 text-[#8898FF]" />
          <span>Submit Project</span>
        </button>

        {/* Mark Complete Toggle Button */}
        <button
          onClick={onToggleComplete}
          className={`w-full py-2.5 px-3 border text-xs font-semibold rounded-xs transition-colors flex items-center justify-center gap-2 ${
            isCompleted
              ? 'bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100'
              : 'bg-white border-[#D5D3CB] text-[#5A5C60] hover:text-[#1A1C1E] hover:bg-[#F2F1EE]'
          }`}
          id="action-mark-complete"
        >
          <CheckCircle2 className={`w-4 h-4 ${isCompleted ? 'text-emerald-600' : 'text-[#8A8A85]'}`} />
          <span>{isCompleted ? 'Completed ✓ (Click to Reopen)' : 'Mark Complete'}</span>
        </button>
      </div>

      {/* 5. Assigned Engineering Mentor */}
      <div className="p-4 mt-auto border-t border-[#E5E3DC] bg-[#FAF9F7]">
        <div className="flex items-center justify-between text-[11px] font-mono text-[#5A5C60] mb-2">
          <span>Assigned Mentor</span>
          <span className="text-emerald-600 font-bold">● Online</span>
        </div>
        <div className="flex items-center gap-3 mb-2.5">
          <div className="w-8 h-8 rounded-full bg-[#1A1C1E] text-white flex items-center justify-center font-bold text-xs">
            SC
          </div>
          <div>
            <div className="text-xs font-bold text-[#1A1C1E]">Sarah Chen</div>
            <div className="text-[10px] text-[#5A5C60]">Staff Frontend Mentor @ Nova Labs</div>
          </div>
        </div>

        <div className="space-y-1.5">
          <button
            onClick={() => openMentor({ view: 'workspace', contextTitle: 'Sprint 3: Responsive E-commerce Page' })}
            className="w-full py-2 px-2.5 bg-[#1A1C1E] hover:bg-black text-white text-xs font-bold rounded-xs transition-colors text-center flex items-center justify-center gap-1.5 shadow-2xs"
            id="action-ask-mentor-workspace"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#8898FF]" />
            <span>Ask Mentor Assistant</span>
          </button>

          <div className="grid grid-cols-2 gap-1">
            <button
              onClick={() => openMentor({ 
                view: 'workspace', 
                contextTitle: 'Sprint 3: Responsive E-commerce Page',
                initialPrompt: 'Can you give me a progressive hint on structuring the responsive grid and color variant synchronization?'
              })}
              className="py-1 px-1.5 bg-white hover:bg-[#EEF0FF] text-[#1A1C1E] hover:text-[#3E51FF] border border-[#D5D3CB] hover:border-[#C5CAFF] text-[10px] font-semibold rounded-xs transition-colors text-center truncate"
            >
              💡 Get Hint
            </button>
            <button
              onClick={() => openMentor({ 
                view: 'workspace', 
                contextTitle: 'Sprint 3: Responsive E-commerce Page',
                initialPrompt: 'Can you review my planned architectural approach for handling quantity bounds and sticky mobile CTA?'
              })}
              className="py-1 px-1.5 bg-white hover:bg-[#EEF0FF] text-[#1A1C1E] hover:text-[#3E51FF] border border-[#D5D3CB] hover:border-[#C5CAFF] text-[10px] font-semibold rounded-xs transition-colors text-center truncate"
            >
              🔍 Review Approach
            </button>
          </div>

          <button
            onClick={() => navigate({ view: 'project-feedback' })}
            className="w-full py-1.5 px-2 bg-white hover:bg-[#EEF0FF] text-[#3E51FF] border border-[#C5CAFF] text-[11px] font-bold rounded-xs transition-colors text-center"
            id="action-view-mentor-review"
          >
            View Mentor Review & Rubric
          </button>
        </div>
      </div>
    </aside>
  );
};
