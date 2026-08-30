import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  PanelLeftClose, 
  PanelLeftOpen, 
  PanelRightClose, 
  PanelRightOpen, 
  Sparkles, 
  GitPullRequest, 
  Save, 
  CheckCircle2, 
  ArrowLeft,
  Briefcase,
  Layers,
  ChevronRight,
  Info,
  Clock,
  SlidersHorizontal
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { WorkspaceSidebar } from './WorkspaceSidebar';
import { WorkspaceMain } from './WorkspaceMain';
import { WorkspaceRightPanel } from './WorkspaceRightPanel';
import { HintModal } from './HintModal';
import { SubmissionModal } from './SubmissionModal';
import { TaskRequirement, WorkspaceDeliverableState, WorkspaceViewTab } from './types';

interface WorkspacePageProps {
  internshipId?: string;
  initialTab?: WorkspaceViewTab;
}

const INITIAL_REQUIREMENTS: TaskRequirement[] = [
  {
    id: 'req-responsive',
    title: 'Responsive layout',
    description: 'Ensure clean 2-column desktop layout that collapses smoothly to single column on tablet/mobile screens without horizontal scroll.',
    completed: true,
    tag: 'Responsive',
  },
  {
    id: 'req-gallery',
    title: 'Product image gallery',
    description: 'Interactive thumbnail strip that updates the main product preview with smooth transition and active indicator.',
    completed: true,
    tag: 'UI',
  },
  {
    id: 'req-info',
    title: 'Product information',
    description: 'Display title, pricing, discount calculation, rating stars, color swatches with active selection state, and spec tabs.',
    completed: true,
    tag: 'UI',
  },
  {
    id: 'req-cart',
    title: 'Add to cart interaction',
    description: 'Provide quantity selector (+/-), instant optimistic cart badge update, and success toast notification on button click.',
    completed: true,
    tag: 'Logic',
  },
  {
    id: 'req-mobile',
    title: 'Mobile optimization',
    description: 'Enforce 44x44px touch targets on variant buttons, sticky mobile buy actions, and verify zero layout shift.',
    completed: false,
    tag: 'Accessibility',
  },
];

export const WorkspacePage: React.FC<WorkspacePageProps> = ({
  internshipId = 'frontend-developer',
  initialTab = 'brief',
}) => {
  const { navigate, openMentor } = useApp();
  
  // Navigation & View Tab
  const [currentTab, setCurrentTab] = useState<WorkspaceViewTab>(initialTab);
  const [currentTaskId, setCurrentTaskId] = useState<string>('task-ecommerce-product-page');
  
  // Responsive Drawer Visibility
  const [showLeftSidebar, setShowLeftSidebar] = useState<boolean>(true);
  const [showRightPanel, setShowRightPanel] = useState<boolean>(true);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState<boolean>(false);
  const [isMobileDetailsOpen, setIsMobileDetailsOpen] = useState<boolean>(false);

  // Requirements State
  const [requirements, setRequirements] = useState<TaskRequirement[]>(INITIAL_REQUIREMENTS);
  const [isTaskCompleted, setIsTaskCompleted] = useState<boolean>(false);

  // Deliverables State
  const [deliverables, setDeliverables] = useState<WorkspaceDeliverableState>({
    githubUrl: 'https://github.com/alex-dev/nova-ecommerce-product-page',
    liveUrl: 'https://nova-headphones-demo.vercel.app',
    screenshots: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80',
    ],
    documentation: `## Nova Labs Product Page Architecture\n\n- Built modular React functional components: \`ProductGallery\`, \`VariantPicker\`, \`CartControls\`.\n- Tailwind CSS responsive breakpoints for 390px, 768px, and 1280px viewports.\n- Optimistic UI updates for the cart badge counter.\n- WCAG 2.1 AA compliant color contrast and keyboard accessible swatches.`,
  });

  // Modals & Save State
  const [isHintModalOpen, setIsHintModalOpen] = useState<boolean>(false);
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState<boolean>(
    initialTab === ('submit' as any) || initialTab === ('submission' as any)
  );
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [lastSavedText, setLastSavedText] = useState<string>('Saved 2m ago');

  const handleToggleRequirement = (id: string) => {
    setRequirements(prev =>
      prev.map(r => r.id === id ? { ...r, completed: !r.completed } : r)
    );
  };

  const handleUpdateDeliverables = (updates: Partial<WorkspaceDeliverableState>) => {
    setDeliverables(prev => ({ ...prev, ...updates }));
  };

  const handleSaveProgress = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setLastSavedText('Saved just now');
    }, 600);
  };

  const handleToggleComplete = () => {
    setIsTaskCompleted(prev => !prev);
  };

  const handleConfirmSubmit = () => {
    setIsTaskCompleted(true);
    setRequirements(prev => prev.map(r => ({ ...r, completed: true })));
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-[#FAF9F7] text-[#1A1C1E] overflow-hidden font-sans select-none">
      
      {/* ========================================================================= */}
      {/* 1. TOP GLOBAL WORKSPACE NAVIGATION BAR */}
      {/* ========================================================================= */}
      <header className="h-14 bg-white border-b border-[#E5E3DC] px-4 flex items-center justify-between z-30 shrink-0">
        {/* Left: Brand & Mobile Sidebar Toggle */}
        <div className="flex items-center gap-3">
          {/* Mobile Left Drawer Toggle */}
          <button
            onClick={() => setIsMobileNavOpen(true)}
            className="p-2 lg:hidden text-[#5A5C60] hover:text-[#1A1C1E] hover:bg-[#F2F1EE] rounded-xs transition-colors"
            title="Open Syllabus Navigation"
            id="mobile-nav-toggle-btn"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Desktop Left Sidebar Collapse Toggle */}
          <button
            onClick={() => setShowLeftSidebar(prev => !prev)}
            className="p-2 hidden lg:flex text-[#5A5C60] hover:text-[#1A1C1E] hover:bg-[#F2F1EE] rounded-xs transition-colors"
            title={showLeftSidebar ? "Collapse Sidebar" : "Expand Sidebar"}
            id="desktop-left-sidebar-toggle"
          >
            {showLeftSidebar ? <PanelLeftClose className="w-4 h-4" /> : <PanelLeftOpen className="w-4 h-4" />}
          </button>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => navigate({ view: 'dashboard' })}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-7 h-7 bg-[#1A1C1E] text-white flex items-center justify-center font-bold text-xs rounded-xs">
                IL
              </div>
              <span className="font-extrabold text-sm tracking-tight text-[#1A1C1E] hidden sm:inline">
                InternLab
              </span>
            </button>

            <span className="text-xs text-[#8A8A85] hidden md:inline">•</span>

            <div className="hidden sm:flex items-center gap-1.5 text-xs font-mono">
              <span className="font-bold text-[#1A1C1E]">Nova Labs</span>
              <span className="text-[#8A8A85]">/</span>
              <span className="text-[#3E51FF] font-semibold truncate max-w-[200px]">
                Frontend Developer
              </span>
            </div>
          </div>
        </div>

        {/* Center: Active Task Indicator */}
        <div className="hidden md:flex items-center gap-2 bg-[#F9F8F6] border border-[#E5E3DC] px-3 py-1 rounded-xs text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-bold text-[#1A1C1E]">TASK-301:</span>
          <span className="text-[#5A5C60] truncate max-w-[220px] lg:max-w-[340px]">
            Build a Responsive E-commerce Product Page
          </span>
        </div>

        {/* Right: Quick Action Controls & Mobile Details Toggle */}
        <div className="flex items-center gap-2">
          {/* Ask Mentor Action */}
          <button
            onClick={() => openMentor({ 
              view: 'workspace', 
              contextTitle: 'Sprint 3: Responsive E-commerce Page' 
            })}
            className="px-2.5 py-1.5 text-xs font-bold text-[#1A1C1E] bg-[#EEF0FF] hover:bg-[#DCE1FF] text-[#3E51FF] border border-[#C5CAFF] rounded-xs transition-colors flex items-center gap-1.5 shadow-2xs"
            id="top-ask-mentor-btn"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Ask Mentor</span>
          </button>

          {/* Quick Hint Action */}
          <button
            onClick={() => setIsHintModalOpen(true)}
            className="px-2.5 py-1.5 text-xs font-semibold text-[#5A5C60] bg-white hover:bg-[#F2F1EE] border border-[#D5D3CB] rounded-xs transition-colors hidden sm:flex items-center gap-1.5"
            id="top-hint-btn"
          >
            <span>Hint</span>
          </button>

          {/* Quick Save Action */}
          <button
            onClick={handleSaveProgress}
            disabled={isSaving}
            className="px-2.5 py-1.5 text-xs font-semibold text-[#1A1C1E] bg-white hover:bg-[#F2F1EE] border border-[#D5D3CB] rounded-xs transition-colors hidden sm:flex items-center gap-1.5"
            id="top-save-btn"
          >
            <Save className="w-3.5 h-3.5 text-[#5A5C60]" />
            <span>{isSaving ? 'Saving...' : 'Save'}</span>
          </button>

          {/* Quick Submit PR */}
          <button
            onClick={() => setIsSubmissionModalOpen(true)}
            className="px-3 py-1.5 text-xs font-bold text-white bg-[#1A1C1E] hover:bg-black rounded-xs transition-colors flex items-center gap-1.5 shadow-xs"
            id="top-submit-btn"
          >
            <GitPullRequest className="w-3.5 h-3.5 text-[#8898FF]" />
            <span>Submit</span>
          </button>

          {/* Mobile Right Details Toggle */}
          <button
            onClick={() => setIsMobileDetailsOpen(true)}
            className="p-2 xl:hidden text-[#5A5C60] hover:text-[#1A1C1E] hover:bg-[#F2F1EE] rounded-xs transition-colors"
            title="Open Task Details"
            id="mobile-details-toggle-btn"
          >
            <SlidersHorizontal className="w-4 h-4" />
          </button>

          {/* Desktop Right Sidebar Collapse Toggle */}
          <button
            onClick={() => setShowRightPanel(prev => !prev)}
            className="p-2 hidden xl:flex text-[#5A5C60] hover:text-[#1A1C1E] hover:bg-[#F2F1EE] rounded-xs transition-colors"
            title={showRightPanel ? "Collapse Task Details" : "Expand Task Details"}
            id="desktop-right-sidebar-toggle"
          >
            {showRightPanel ? <PanelRightClose className="w-4 h-4" /> : <PanelRightOpen className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. THREE-COLUMN DESKTOP & RESPONSIVE WORKSPACE CONTAINER */}
      {/* ========================================================================= */}
      <div className="flex-1 flex overflow-hidden relative">
        
        {/* COLUMN 1: LEFT SIDEBAR (DESKTOP) */}
        {showLeftSidebar && (
          <div className="hidden lg:block w-72 xl:w-80 shrink-0 h-full">
            <WorkspaceSidebar
              currentTaskId={currentTaskId}
              onSelectTask={(id) => setCurrentTaskId(id)}
            />
          </div>
        )}

        {/* COLUMN 2: CENTER MAIN WORKSPACE */}
        <main className="flex-1 h-full overflow-hidden flex flex-col min-w-0">
          <WorkspaceMain
            currentTab={currentTab}
            onTabChange={setCurrentTab}
            requirements={requirements}
            onToggleRequirement={handleToggleRequirement}
            deliverables={deliverables}
            onUpdateDeliverables={handleUpdateDeliverables}
            onOpenSubmissionModal={() => setIsSubmissionModalOpen(true)}
            onOpenHintModal={() => setIsHintModalOpen(true)}
          />
        </main>

        {/* COLUMN 3: RIGHT PANEL (DESKTOP) */}
        {showRightPanel && (
          <div className="hidden xl:block w-72 xl:w-80 shrink-0 h-full">
            <WorkspaceRightPanel
              requirements={requirements}
              isCompleted={isTaskCompleted}
              onToggleComplete={handleToggleComplete}
              onOpenHintModal={() => setIsHintModalOpen(true)}
              onOpenSubmissionModal={() => setIsSubmissionModalOpen(true)}
              onSaveProgress={handleSaveProgress}
              lastSavedText={lastSavedText}
              isSaving={isSaving}
            />
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* 3. MOBILE FLOATING / DOCKED ACTION BAR (SM SCREENS) */}
      {/* ========================================================================= */}
      <div className="sm:hidden border-t border-[#E5E3DC] bg-white p-2.5 flex items-center justify-between gap-2 z-20">
        <button
          onClick={() => setIsMobileNavOpen(true)}
          className="p-2 text-xs font-semibold text-[#5A5C60] hover:bg-[#F2F1EE] rounded-xs flex items-center gap-1.5"
        >
          <Menu className="w-4 h-4" />
          <span>Syllabus</span>
        </button>

        <button
          onClick={() => setIsHintModalOpen(true)}
          className="p-2 text-xs font-semibold text-[#3E51FF] bg-[#EEF0FF] rounded-xs flex items-center gap-1.5"
        >
          <Sparkles className="w-4 h-4" />
          <span>Hint</span>
        </button>

        <button
          onClick={() => setIsMobileDetailsOpen(true)}
          className="p-2 text-xs font-semibold text-[#1A1C1E] bg-[#F2F1EE] rounded-xs flex items-center gap-1.5"
        >
          <SlidersHorizontal className="w-4 h-4" />
          <span>Details</span>
        </button>

        <button
          onClick={() => setIsSubmissionModalOpen(true)}
          className="px-3.5 py-2 text-xs font-bold text-white bg-[#1A1C1E] rounded-xs flex items-center gap-1.5 shadow-xs"
        >
          <GitPullRequest className="w-3.5 h-3.5" />
          <span>Submit</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 4. MOBILE / TABLET LEFT SIDEBAR DRAWER */}
      {/* ========================================================================= */}
      {isMobileNavOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden animate-in fade-in duration-200">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs" 
            onClick={() => setIsMobileNavOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm h-full bg-white z-10 flex flex-col shadow-2xl">
            <div className="p-3 bg-[#FAF9F7] border-b border-[#E5E3DC] flex items-center justify-between">
              <span className="font-bold text-xs text-[#1A1C1E]">Internship Syllabus</span>
              <button 
                onClick={() => setIsMobileNavOpen(false)}
                className="p-1.5 text-[#5A5C60] hover:text-[#1A1C1E] rounded-xs"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <WorkspaceSidebar
                currentTaskId={currentTaskId}
                onSelectTask={(id) => {
                  setCurrentTaskId(id);
                  setIsMobileNavOpen(false);
                }}
                onCloseMobileDrawer={() => setIsMobileNavOpen(false)}
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. MOBILE / TABLET RIGHT DETAILS DRAWER */}
      {/* ========================================================================= */}
      {isMobileDetailsOpen && (
        <div className="fixed inset-0 z-50 flex justify-end xl:hidden animate-in fade-in duration-200">
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-xs" 
            onClick={() => setIsMobileDetailsOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm h-full bg-white z-10 flex flex-col shadow-2xl">
            <div className="p-3 bg-[#FAF9F7] border-b border-[#E5E3DC] flex items-center justify-between">
              <span className="font-bold text-xs text-[#1A1C1E]">Task Details & Actions</span>
              <button 
                onClick={() => setIsMobileDetailsOpen(false)}
                className="p-1.5 text-[#5A5C60] hover:text-[#1A1C1E] rounded-xs"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <WorkspaceRightPanel
                requirements={requirements}
                isCompleted={isTaskCompleted}
                onToggleComplete={handleToggleComplete}
                onOpenHintModal={() => {
                  setIsMobileDetailsOpen(false);
                  setIsHintModalOpen(true);
                }}
                onOpenSubmissionModal={() => {
                  setIsMobileDetailsOpen(false);
                  setIsSubmissionModalOpen(true);
                }}
                onSaveProgress={handleSaveProgress}
                lastSavedText={lastSavedText}
                isSaving={isSaving}
              />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. MODALS */}
      {/* ========================================================================= */}
      <HintModal
        isOpen={isHintModalOpen}
        onClose={() => setIsHintModalOpen(false)}
      />

      <SubmissionModal
        isOpen={isSubmissionModalOpen}
        onClose={() => setIsSubmissionModalOpen(false)}
        deliverables={deliverables}
        onConfirmSubmit={handleConfirmSubmit}
      />

    </div>
  );
};
