import React from 'react';
import { 
  Building2, 
  CheckCircle2, 
  Lock, 
  Play, 
  ChevronRight, 
  LayoutDashboard, 
  Layers, 
  FileCode, 
  FolderKanban, 
  Clock, 
  CheckCheck,
  Search,
  Sparkles,
  ArrowLeft
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface WorkspaceSidebarProps {
  currentTaskId: string;
  onSelectTask: (taskId: string) => void;
  onCloseMobileDrawer?: () => void;
}

interface WeekSection {
  weekNumber: number;
  title: string;
  isLocked: boolean;
  tasks: {
    id: string;
    title: string;
    status: 'completed' | 'active' | 'locked';
    timeEst: string;
    type?: 'intro' | 'task';
  }[];
}

const SYLLABUS: WeekSection[] = [
  {
    weekNumber: 1,
    title: 'WEEK 1 • Foundation & Architecture',
    isLocked: false,
    tasks: [
      {
        id: 'w1-intro',
        title: 'Introduction',
        status: 'completed',
        timeEst: '45m',
        type: 'intro',
      },
      {
        id: 'w1-t1',
        title: 'Task 1: Design System & Tokens',
        status: 'completed',
        timeEst: '2.5h',
      },
      {
        id: 'w1-t2',
        title: 'Task 2: Responsive Navigation Bar',
        status: 'completed',
        timeEst: '3.0h',
      },
    ],
  },
  {
    weekNumber: 2,
    title: 'WEEK 2 • Dynamic Catalogs & State',
    isLocked: false,
    tasks: [
      {
        id: 'w2-t1',
        title: 'Task 1: Product Grid & Filters',
        status: 'completed',
        timeEst: '3.5h',
      },
      {
        id: 'w2-t2',
        title: 'Task 2: Client-side Cart Hook',
        status: 'completed',
        timeEst: '3.0h',
      },
    ],
  },
  {
    weekNumber: 3,
    title: 'WEEK 3 • Interactive Product Experience',
    isLocked: false,
    tasks: [
      {
        id: 'task-ecommerce-product-page',
        title: 'Task 1: Build a Responsive E-commerce Product Page',
        status: 'active',
        timeEst: '4.0h',
      },
      {
        id: 'w3-t2',
        title: 'Task 2: Checkout & Payment Flow',
        status: 'locked',
        timeEst: '3.5h',
      },
    ],
  },
  {
    weekNumber: 4,
    title: 'WEEK 4 • Performance & Production Launch',
    isLocked: true,
    tasks: [
      {
        id: 'w4-t1',
        title: 'Task 1: Lighthouse Audit & A11y',
        status: 'locked',
        timeEst: '3.0h',
      },
      {
        id: 'w4-t2',
        title: 'Task 2: CI/CD Pipeline & Final Demo',
        status: 'locked',
        timeEst: '4.0h',
      },
    ],
  },
];

export const WorkspaceSidebar: React.FC<WorkspaceSidebarProps> = ({
  currentTaskId,
  onSelectTask,
  onCloseMobileDrawer,
}) => {
  const { navigate } = useApp();

  return (
    <aside className="w-full h-full flex flex-col bg-[#F9F8F6] border-r border-[#E5E3DC] text-[#1A1C1E] select-none">
      {/* 1. Header: Internship & Company Info */}
      <div className="p-4 border-b border-[#E5E3DC] bg-[#FAF9F7]">
        {/* Back Link to Dashboard */}
        <button
          onClick={() => navigate({ view: 'dashboard' })}
          className="text-xs text-[#5A5C60] hover:text-[#1A1C1E] flex items-center gap-1.5 font-semibold mb-3 group"
          id="sidebar-back-to-dashboard"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          <span>Student Dashboard</span>
        </button>

        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xs bg-[#1A1C1E] text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-xs">
            NL
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#3E51FF]">
                Nova Labs
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            </div>
            <h2 className="font-extrabold text-sm text-[#1A1C1E] truncate">
              Frontend Developer
            </h2>
            <div className="text-[11px] text-[#5A5C60] mt-0.5 flex items-center gap-1.5 font-mono">
              <span>Week 3 of 4</span>
              <span>•</span>
              <span className="text-emerald-700 font-bold">68% Complete</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Quick Navigation Item: Overview */}
      <div className="p-3 border-b border-[#E5E3DC]">
        <button
          onClick={() => {
            navigate({ view: 'dashboard', tab: 'my-internships' });
            if (onCloseMobileDrawer) onCloseMobileDrawer();
          }}
          className="w-full px-3 py-2 text-xs font-semibold rounded-xs flex items-center justify-between text-[#5A5C60] hover:text-[#1A1C1E] hover:bg-[#EAE8E1] transition-colors"
          id="workspace-nav-overview"
        >
          <div className="flex items-center gap-2">
            <FolderKanban className="w-4 h-4 text-[#8A8A85]" />
            <span>Overview & Milestones</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 text-[#8A8A85]" />
        </button>
      </div>

      {/* 3. Syllabus Week Tree */}
      <div className="flex-1 overflow-y-auto p-3 space-y-4">
        {SYLLABUS.map((week) => (
          <div key={week.weekNumber} className="space-y-1.5">
            {/* Week Header */}
            <div className="flex items-center justify-between px-2 py-1">
              <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#5A5C60]">
                {week.title}
              </span>
              {week.isLocked && (
                <Lock className="w-3 h-3 text-[#8A8A85]" />
              )}
            </div>

            {/* Tasks in Week */}
            <div className="space-y-1">
              {week.tasks.map((task) => {
                const isActive = task.id === currentTaskId;
                const isCompleted = task.status === 'completed';
                const isLocked = task.status === 'locked' || week.isLocked;

                return (
                  <button
                    key={task.id}
                    disabled={isLocked}
                    onClick={() => {
                      if (!isLocked) {
                        onSelectTask(task.id);
                        if (onCloseMobileDrawer) onCloseMobileDrawer();
                      }
                    }}
                    className={`w-full text-left px-2.5 py-2 rounded-xs text-xs transition-all flex items-center justify-between gap-2 ${
                      isActive
                        ? 'bg-[#1A1C1E] text-white shadow-xs font-bold'
                        : isCompleted
                        ? 'text-[#1A1C1E] hover:bg-[#EAE8E1] font-medium'
                        : isLocked
                        ? 'text-[#8A8A85] opacity-50 cursor-not-allowed'
                        : 'text-[#5A5C60] hover:bg-[#EAE8E1]'
                    }`}
                    id={`task-nav-item-${task.id}`}
                  >
                    <div className="flex items-center gap-2 min-w-0 truncate">
                      {isCompleted ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      ) : isActive ? (
                        <span className="w-2 h-2 rounded-full bg-[#3E51FF] animate-ping shrink-0" />
                      ) : isLocked ? (
                        <Lock className="w-3.5 h-3.5 text-[#8A8A85] shrink-0" />
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-[#8A8A85] shrink-0" />
                      )}
                      
                      <span className="truncate">
                        {task.type === 'intro' ? '• Introduction' : task.title}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {isCompleted && (
                        <span className={`text-[10px] font-mono ${isActive ? 'text-white/80' : 'text-emerald-700 font-bold'}`}>
                          ✓
                        </span>
                      )}
                      {isActive && (
                        <span className="px-1.5 py-0.2 bg-[#3E51FF] text-white text-[9px] font-mono font-bold uppercase rounded-xs">
                          Active
                        </span>
                      )}
                      {isLocked && (
                        <span className="text-[10px] font-mono text-[#8A8A85]">
                          Locked
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* 4. Bottom Workspace Status Card */}
      <div className="p-3 border-t border-[#E5E3DC] bg-[#FAF9F7] text-xs">
        <div className="flex items-center justify-between text-[11px] font-mono text-[#5A5C60] mb-1.5">
          <span>Sprint Velocity</span>
          <span className="font-bold text-[#1A1C1E]">4.8 / 5.0</span>
        </div>
        <div className="w-full h-1.5 bg-[#E5E3DC] rounded-full overflow-hidden">
          <div className="h-full bg-[#3E51FF] rounded-full" style={{ width: '68%' }} />
        </div>
        <div className="mt-2 text-[10px] text-[#8A8A85] flex items-center justify-between font-mono">
          <span>Git Branch: feat/product-page</span>
          <span className="text-emerald-600 font-bold">● Clean</span>
        </div>
      </div>
    </aside>
  );
};
