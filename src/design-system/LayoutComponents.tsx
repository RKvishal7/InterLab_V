import React, { useState } from 'react';
import { 
  Menu, 
  X, 
  Layers, 
  Briefcase, 
  Award, 
  BookOpen, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  User, 
  Compass, 
  BarChart3,
  FileCode2,
  FolderGit2
} from 'lucide-react';
import { PageHeading, SectionHeading, Caption, BodyText } from './Typography';
import { Button, IconButton } from './Button';

/**
 * Page Container: Max-w-7xl with disciplined responsive padding
 */
export const PageContainer: React.FC<{
  children: React.ReactNode;
  className?: string;
  size?: 'default' | 'narrow' | 'wide' | 'full';
}> = ({ children, className = '', size = 'default' }) => {
  const sizeClasses = {
    narrow: 'max-w-4xl',
    default: 'max-w-7xl',
    wide: 'max-w-[1440px]',
    full: 'max-w-full',
  }[size];

  return (
    <div className={`w-full ${sizeClasses} mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 ${className}`}>
      {children}
    </div>
  );
};

/**
 * Section Container: Structured section with header, caption, and actions slot
 */
export const SectionContainer: React.FC<{
  title?: React.ReactNode;
  caption?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bordered?: boolean;
}> = ({ title, caption, action, children, className = '', bordered = false }) => {
  return (
    <section className={`w-full ${bordered ? 'pt-8 border-t border-[#E2E2DE]' : ''} ${className}`}>
      {(title || caption || action) && (
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 gap-3">
          <div>
            {typeof title === 'string' ? (
              <SectionHeading>{title}</SectionHeading>
            ) : (
              title
            )}
            {caption && (
              typeof caption === 'string' ? (
                <Caption className="block mt-1">{caption}</Caption>
              ) : (
                caption
              )
            )}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      {children}
    </section>
  );
};

export interface NavigationItem {
  id: string;
  label: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  active?: boolean;
  onClick?: () => void;
}

/**
 * Reusable Main Navigation Bar
 */
export const MainNavigation: React.FC<{
  items: NavigationItem[];
  activeId: string;
  onSelect: (id: string) => void;
  brandName?: string;
  brandSubtitle?: string;
  rightSlot?: React.ReactNode;
  className?: string;
}> = ({
  items,
  activeId,
  onSelect,
  brandName = 'InternLab',
  brandSubtitle = 'Simulations',
  rightSlot,
  className = '',
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className={`sticky top-0 z-40 bg-[#F9F8F6]/95 backdrop-blur-md border-b border-[#E2E2DE] ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand identity */}
        <div className="flex items-center space-x-6">
          <button
            onClick={() => onSelect('discover')}
            className="flex items-center space-x-2.5 text-left group focus:outline-none"
            id="main-nav-brand"
          >
            <div className="w-8 h-8 rounded-sm bg-[#1A1C1E] text-white flex items-center justify-center font-bold text-xs tracking-tight shadow-xs group-hover:bg-black transition-colors">
              IL
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-[#1A1C1E]">
                {brandName}
              </span>
              <span className="hidden sm:inline-block ml-2 px-1.5 py-0.5 text-[10px] uppercase font-semibold tracking-wider bg-[#F2F1EE] text-[#1A1C1E] border border-[#E2E2DE] rounded-xs">
                {brandSubtitle}
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-1">
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = activeId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    item.onClick ? item.onClick() : onSelect(item.id);
                  }}
                  className={`px-3 py-1.5 text-sm font-medium rounded-sm transition-colors flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#1A1C1E] text-white'
                      : 'text-[#8A8A85] hover:text-[#1A1C1E] hover:bg-[#F2F1EE]'
                  }`}
                  id={`nav-item-${item.id}`}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] font-mono font-semibold ${
                      isActive ? 'bg-white text-[#1A1C1E]' : 'bg-[#3E51FF] text-white'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right slot & Mobile Hamburger */}
        <div className="flex items-center space-x-3">
          {rightSlot}
          <div className="md:hidden">
            <IconButton
              icon={mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              label="Toggle navigation menu"
              variant="secondary"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            />
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E2E2DE] bg-[#FFFFFF] px-4 py-3 space-y-1 shadow-md">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = activeId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  item.onClick ? item.onClick() : onSelect(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full px-3 py-2.5 text-left text-sm font-medium rounded-sm flex items-center justify-between transition-colors ${
                  isActive
                    ? 'bg-[#1A1C1E] text-white'
                    : 'text-[#484B4F] hover:bg-[#F2F1EE]'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  {Icon && <Icon className="w-4 h-4" />}
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] font-mono bg-[#3E51FF] text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};

export interface SidebarMilestoneItem {
  id: string;
  title: string;
  status: 'completed' | 'in-progress' | 'locked';
  tasksCount: number;
  completedTasksCount: number;
}

/**
 * Dashboard / Simulation Sidebar: Structured navigation for workplace tracks
 */
export const DashboardSidebar: React.FC<{
  title: string;
  subtitle?: string;
  milestones: SidebarMilestoneItem[];
  activeMilestoneId: string;
  onSelectMilestone: (id: string) => void;
  className?: string;
}> = ({
  title,
  subtitle,
  milestones,
  activeMilestoneId,
  onSelectMilestone,
  className = '',
}) => {
  return (
    <aside className={`w-full md:w-72 shrink-0 bg-[#FFFFFF] border border-[#E2E2DE] rounded-sm p-4 ${className}`}>
      <div className="mb-4 pb-3 border-b border-[#E2E2DE]">
        <div className="text-xs font-mono font-semibold uppercase tracking-wider text-[#8A8A85] mb-1">
          {subtitle || 'Simulation Workflow'}
        </div>
        <h3 className="font-bold text-sm text-[#1A1C1E] truncate">
          {title}
        </h3>
      </div>

      <nav className="space-y-1.5">
        {milestones.map((ms, index) => {
          const isActive = activeMilestoneId === ms.id;
          const isCompleted = ms.status === 'completed';
          const isLocked = ms.status === 'locked';

          return (
            <button
              key={ms.id}
              onClick={() => !isLocked && onSelectMilestone(ms.id)}
              disabled={isLocked}
              className={`w-full p-2.5 rounded-xs text-left transition-colors border flex items-start justify-between gap-2 ${
                isActive
                  ? 'bg-[#F2F1EE] border-[#1A1C1E] text-[#1A1C1E]'
                  : isLocked
                  ? 'bg-[#F9F8F6] border-transparent text-[#8A8A85] cursor-not-allowed opacity-60'
                  : 'bg-white border-transparent text-[#484B4F] hover:bg-[#F2F1EE] hover:border-[#E2E2DE]'
              }`}
            >
              <div className="flex items-start gap-2 min-w-0">
                <div className="mt-0.5 shrink-0">
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  ) : (
                    <span className="w-3.5 h-3.5 rounded-full border border-current flex items-center justify-center text-[9px] font-mono font-bold">
                      {index + 1}
                    </span>
                  )}
                </div>
                <div className="min-w-0">
                  <div className="text-xs font-semibold truncate leading-tight">{ms.title}</div>
                  <div className="text-[10px] text-[#8A8A85] mt-0.5 font-mono">
                    {ms.completedTasksCount}/{ms.tasksCount} deliverables
                  </div>
                </div>
              </div>
              <ChevronRight className={`w-3.5 h-3.5 shrink-0 transition-transform ${isActive ? 'text-[#1A1C1E] translate-x-0.5' : 'text-[#8A8A85]'}`} />
            </button>
          );
        })}
      </nav>
    </aside>
  );
};
