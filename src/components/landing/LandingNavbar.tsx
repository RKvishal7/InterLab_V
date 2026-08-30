import React, { useState } from 'react';
import { 
  Compass, 
  Layers, 
  Palette, 
  Menu, 
  X, 
  ChevronRight, 
  ArrowUpRight, 
  CheckCircle2, 
  GraduationCap, 
  BookOpen, 
  User, 
  Building2,
  Lock,
  Sparkles,
  Briefcase,
  Play
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Button, SecondaryButton, GhostButton, IconButton } from '../../design-system/Button';

interface LandingNavbarProps {
  onOpenCollegesModal: () => void;
  onOpenAuthModal: () => void;
  onOpenResourcesModal: () => void;
  onScrollToSection: (sectionId: string) => void;
}

export const LandingNavbar: React.FC<LandingNavbarProps> = ({
  onOpenCollegesModal,
  onOpenAuthModal,
  onOpenResourcesModal,
  onScrollToSection,
}) => {
  const { navigate, route } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#F9F8F6]/95 backdrop-blur-md border-b border-[#E2E2DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand identity */}
        <div className="flex items-center space-x-6 sm:space-x-8">
          <button
            onClick={() => onScrollToSection('hero')}
            className="flex items-center space-x-2.5 text-left group focus:outline-none"
            id="brand-logo-button"
          >
            <div className="w-8 h-8 rounded-xs bg-[#1A1C1E] text-white flex items-center justify-center font-bold text-xs tracking-tight shadow-xs group-hover:bg-black transition-colors">
              IL
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-[#1A1C1E]">
                InternLab
              </span>
              <span className="hidden sm:inline-block ml-2 px-1.5 py-0.5 text-[10px] uppercase font-semibold tracking-wider bg-[#F2F1EE] text-[#1A1C1E] border border-[#E2E2DE] rounded-xs">
                Simulations
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            <button
              onClick={() => navigate({ view: 'discover' })}
              className="px-3 py-1.5 text-sm font-medium text-[#484B4F] hover:text-[#1A1C1E] hover:bg-[#F2F1EE] rounded-sm transition-colors"
              id="nav-explore-internships"
            >
              Explore Internships
            </button>

            <button
              onClick={() => onScrollToSection('how-it-works')}
              className="px-3 py-1.5 text-sm font-medium text-[#484B4F] hover:text-[#1A1C1E] hover:bg-[#F2F1EE] rounded-sm transition-colors"
              id="nav-how-it-works"
            >
              How It Works
            </button>

            <button
              onClick={() => onScrollToSection('categories')}
              className="px-3 py-1.5 text-sm font-medium text-[#484B4F] hover:text-[#1A1C1E] hover:bg-[#F2F1EE] rounded-sm transition-colors"
              id="nav-categories"
            >
              Career Tracks
            </button>

            <button
              onClick={() => navigate({ view: 'universities' })}
              className="px-3 py-1.5 text-sm font-medium text-[#484B4F] hover:text-[#1A1C1E] hover:bg-[#F2F1EE] rounded-sm transition-colors flex items-center gap-1"
              id="nav-for-colleges"
            >
              <GraduationCap className="w-3.5 h-3.5 text-[#8A8A85]" />
              <span>For Colleges</span>
            </button>

            <button
              onClick={onOpenResourcesModal}
              className="px-3 py-1.5 text-sm font-medium text-[#484B4F] hover:text-[#1A1C1E] hover:bg-[#F2F1EE] rounded-sm transition-colors flex items-center gap-1"
              id="nav-resources"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#8A8A85]" />
              <span>Resources</span>
            </button>
          </nav>
        </div>

        {/* Right CTA Actions */}
        <div className="flex items-center space-x-3">
          {/* Design System & Catalog Quick Switches */}
          <div className="hidden xl:flex items-center space-x-1 pl-2 pr-3 border-r border-[#E2E2DE]">
            <button
              onClick={() => navigate({ view: 'design-system' })}
              className="px-2 py-1 text-xs font-mono font-semibold text-[#8A8A85] hover:text-[#1A1C1E] hover:bg-[#F2F1EE] rounded-xs transition-colors flex items-center gap-1"
              title="Inspect Design System Tokens & Components"
              id="nav-design-tokens-btn"
            >
              <Palette className="w-3.5 h-3.5" />
              <span>Design System</span>
            </button>

            <button
              onClick={() => navigate({ view: 'architecture' })}
              className="px-2 py-1 text-xs font-mono font-semibold text-[#8A8A85] hover:text-[#1A1C1E] hover:bg-[#F2F1EE] rounded-xs transition-colors flex items-center gap-1"
              title="Inspect Platform Architecture"
              id="nav-architecture-btn"
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Architecture</span>
            </button>
          </div>

          <button
            onClick={() => navigate({ view: 'workspace', internshipId: 'frontend-developer' })}
            className="px-3 py-1.5 text-xs sm:text-sm font-semibold text-[#1A1C1E] bg-[#F2F1EE] hover:bg-[#EAE8E1] border border-[#D5D3CB] rounded-sm transition-colors flex items-center gap-1.5"
            id="nav-workspace-btn"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Workspace</span>
          </button>

          <button
            onClick={() => navigate({ view: 'dashboard' })}
            className="px-3 py-1.5 text-xs sm:text-sm font-semibold text-[#3E51FF] bg-[#EEF0FF] hover:bg-[#DCE1FF] border border-[#C5CAFF] rounded-sm transition-colors flex items-center gap-1.5"
            id="nav-student-dashboard-btn"
          >
            <Briefcase className="w-3.5 h-3.5" />
            <span>Student Dashboard</span>
          </button>

          <button
            onClick={() => navigate({ view: 'login' })}
            className="px-3 py-1.5 text-xs sm:text-sm font-medium text-[#1A1C1E] hover:bg-[#F2F1EE] rounded-sm transition-colors"
            id="nav-login-button"
          >
            Login
          </button>

          <Button
            size="sm"
            variant="primary"
            onClick={() => onScrollToSection('featured-internships')}
            rightIcon={<ArrowUpRight className="w-3.5 h-3.5" />}
            id="nav-start-learning-button"
          >
            Start Learning
          </Button>

          {/* Mobile Menu Toggle */}
          <div className="lg:hidden">
            <IconButton
              icon={mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              label="Toggle mobile menu"
              variant="secondary"
              onClick={() => setMobileOpen(!mobileOpen)}
            />
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#FFFFFF] border-b border-[#E2E2DE] px-4 py-4 space-y-2 shadow-lg">
          <button
            onClick={() => {
              onScrollToSection('featured-internships');
              setMobileOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm font-medium text-[#1A1C1E] hover:bg-[#F2F1EE] rounded-sm"
          >
            Explore Internships
          </button>

          <button
            onClick={() => {
              onScrollToSection('how-it-works');
              setMobileOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm font-medium text-[#1A1C1E] hover:bg-[#F2F1EE] rounded-sm"
          >
            How It Works
          </button>

          <button
            onClick={() => {
              onScrollToSection('categories');
              setMobileOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm font-medium text-[#1A1C1E] hover:bg-[#F2F1EE] rounded-sm"
          >
            Career Tracks (10 Categories)
          </button>

          <button
            onClick={() => {
              onOpenCollegesModal();
              setMobileOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm font-medium text-[#1A1C1E] hover:bg-[#F2F1EE] rounded-sm flex items-center justify-between"
          >
            <span>For Colleges & Universities</span>
            <GraduationCap className="w-4 h-4 text-[#8A8A85]" />
          </button>

          <button
            onClick={() => {
              onOpenResourcesModal();
              setMobileOpen(false);
            }}
            className="w-full text-left px-3 py-2 text-sm font-medium text-[#1A1C1E] hover:bg-[#F2F1EE] rounded-sm flex items-center justify-between"
          >
            <span>Resources & Rubrics</span>
            <BookOpen className="w-4 h-4 text-[#8A8A85]" />
          </button>

          <div className="pt-2 border-t border-[#E2E2DE] flex gap-2">
            <button
              onClick={() => {
                navigate({ view: 'login' });
                setMobileOpen(false);
              }}
              className="flex-1 py-2 text-center text-xs font-semibold text-[#1A1C1E] bg-[#F2F1EE] rounded-sm"
              id="mobile-nav-login-btn"
            >
              Sign In
            </button>
            <button
              onClick={() => {
                navigate({ view: 'signup' });
                setMobileOpen(false);
              }}
              className="flex-1 py-2 text-center text-xs font-semibold text-white bg-[#1A1C1E] rounded-sm"
              id="mobile-nav-signup-btn"
            >
              Create Account
            </button>
          </div>

          <div className="pt-2 border-t border-[#E2E2DE] flex items-center justify-between">
            <button
              onClick={() => {
                navigate({ view: 'design-system' });
                setMobileOpen(false);
              }}
              className="text-xs font-mono text-[#8A8A85] hover:text-[#1A1C1E]"
            >
              [Design System]
            </button>
            <button
              onClick={() => {
                navigate({ view: 'architecture' });
                setMobileOpen(false);
              }}
              className="text-xs font-mono text-[#8A8A85] hover:text-[#1A1C1E]"
            >
              [Architecture]
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
