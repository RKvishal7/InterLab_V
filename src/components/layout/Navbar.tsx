import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Briefcase, 
  Compass, 
  Layers, 
  Award, 
  Play, 
  Sparkles, 
  FolderGit2,
  Building2,
  Menu,
  X,
  User,
  Settings,
  LogOut,
  Palette,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { route, navigate, userProfile, openMentor, authUser, signOut } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = [
    { id: 'discover', label: 'Catalog', icon: Compass, view: 'discover' as const },
    { id: 'workspace', label: 'Workspace', icon: Play, view: 'workspace' as const, param: { internshipId: 'frontend-developer' } },
    { id: 'dashboard', label: 'Dashboard', icon: Briefcase, view: 'dashboard' as const },
    { id: 'portfolio', label: 'Portfolio', icon: FolderGit2, view: 'portfolio' as const },
    { id: 'universities', label: 'Universities', icon: Building2, view: 'universities' as const },
    { id: 'design-system', label: 'Design System', icon: Palette, view: 'design-system' as const },
    { id: 'architecture', label: 'Architecture', icon: Layers, view: 'architecture' as const },
  ];

  const handleNavClick = (view: any, param?: any) => {
    navigate({ view, ...param });
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F9F8F6]/95 backdrop-blur-md border-b border-[#E2E2DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Identity */}
        <div className="flex items-center space-x-6">
          <button 
            onClick={() => handleNavClick('landing')}
            className="flex items-center space-x-2.5 text-left group focus:outline-none focus:ring-2 focus:ring-[#1A1C1E] rounded-xs"
            id="brand-home-button"
            aria-label="InternLab Home"
          >
            <div className="w-8 h-8 rounded-sm bg-[#1A1C1E] text-white flex items-center justify-center font-bold text-xs tracking-tight shadow-xs group-hover:bg-black transition-colors">
              IL
            </div>
            <div className="flex items-baseline">
              <span className="text-base font-bold tracking-tight text-[#1A1C1E]">
                InternLab
              </span>
              <span className="hidden xl:inline-block ml-2 px-1.5 py-0.5 text-[10px] uppercase font-semibold tracking-wider bg-[#F2F1EE] text-[#484B4F] border border-[#E2E2DE] rounded-xs">
                Simulations
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = route.view === link.view;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.view, link.param)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-sm transition-colors flex items-center gap-1.5 focus:outline-none focus:ring-1 focus:ring-[#1A1C1E] ${
                    isActive
                      ? 'bg-[#1A1C1E] text-white font-semibold'
                      : 'text-[#5A5C60] hover:text-[#1A1C1E] hover:bg-[#F2F1EE]'
                  }`}
                  id={`nav-${link.id}`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Right Actions & User Area */}
        <div className="flex items-center space-x-3">
          
          {/* Ask Mentor Navbar Button */}
          <button
            onClick={() => openMentor()}
            className="px-2.5 py-1.5 rounded-sm bg-[#EEF0FF] hover:bg-[#DCE1FF] text-[#3E51FF] border border-[#C5CAFF] text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs focus:outline-none focus:ring-1 focus:ring-[#3E51FF]"
            id="nav-ask-mentor-button"
            title="Open Mentor Assistant"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Ask Mentor</span>
            <span className="sm:hidden">Mentor</span>
          </button>

          {/* User Profile Popover */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-2 pl-2 border-l border-[#E2E2DE] hover:opacity-80 transition-opacity focus:outline-none focus:ring-1 focus:ring-[#1A1C1E] rounded-xs p-1"
              id="user-profile-menu-button"
              aria-expanded={userDropdownOpen}
              aria-haspopup="true"
            >
              <div className="w-8 h-8 rounded-sm bg-[#1A1C1E] text-white flex items-center justify-center text-xs font-medium shrink-0">
                {userProfile.fullName ? userProfile.fullName.split(' ').map(n => n[0]).join('') : 'U'}
              </div>
              <div className="hidden xl:block text-left">
                <div className="text-xs font-semibold text-[#1A1C1E] truncate max-w-[110px]">{userProfile.fullName || 'Student'}</div>
                <div className="text-[10px] text-[#8A8A85] truncate max-w-[110px]">
                  {authUser ? 'Verified Pro' : 'Free Account'}
                </div>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-[#8A8A85] hidden sm:block" />
            </button>

            {/* Dropdown Menu */}
            {userDropdownOpen && (
              <div className="absolute right-0 mt-2 w-56 bg-white border border-[#E2E2DE] rounded-sm shadow-lg py-1.5 z-50 text-xs animate-in fade-in duration-100">
                <div className="px-3.5 py-2 border-b border-[#F2F1EE]">
                  <p className="font-bold text-[#1A1C1E] truncate">{userProfile.fullName}</p>
                  <p className="text-[11px] text-[#8A8A85] truncate">{userProfile.email || 'student@internlab.dev'}</p>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      handleNavClick('dashboard', { tab: 'overview' });
                    }}
                    className="w-full px-3.5 py-2 text-left text-[#484B4F] hover:bg-[#F2F1EE] hover:text-[#1A1C1E] flex items-center gap-2"
                  >
                    <Briefcase className="w-3.5 h-3.5 text-[#8A8A85]" />
                    <span>Dashboard Overview</span>
                  </button>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      handleNavClick('portfolio');
                    }}
                    className="w-full px-3.5 py-2 text-left text-[#484B4F] hover:bg-[#F2F1EE] hover:text-[#1A1C1E] flex items-center gap-2"
                  >
                    <FolderGit2 className="w-3.5 h-3.5 text-[#8A8A85]" />
                    <span>Verified Portfolio</span>
                  </button>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      handleNavClick('dashboard', { tab: 'certificates' });
                    }}
                    className="w-full px-3.5 py-2 text-left text-[#484B4F] hover:bg-[#F2F1EE] hover:text-[#1A1C1E] flex items-center gap-2"
                  >
                    <Award className="w-3.5 h-3.5 text-[#8A8A85]" />
                    <span>Certificates</span>
                  </button>

                  <button
                    onClick={() => {
                      setUserDropdownOpen(false);
                      handleNavClick('dashboard', { tab: 'settings' });
                    }}
                    className="w-full px-3.5 py-2 text-left text-[#484B4F] hover:bg-[#F2F1EE] hover:text-[#1A1C1E] flex items-center gap-2"
                  >
                    <Settings className="w-3.5 h-3.5 text-[#8A8A85]" />
                    <span>Account Settings</span>
                  </button>
                </div>

                <div className="border-t border-[#F2F1EE] pt-1">
                  {authUser ? (
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        signOut();
                      }}
                      className="w-full px-3.5 py-2 text-left text-red-600 hover:bg-red-50 flex items-center gap-2"
                    >
                      <LogOut className="w-3.5 h-3.5 text-red-500" />
                      <span>Sign Out</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        handleNavClick('landing');
                      }}
                      className="w-full px-3.5 py-2 text-left text-[#1A1C1E] hover:bg-[#F2F1EE] flex items-center gap-2"
                    >
                      <User className="w-3.5 h-3.5 text-[#8A8A85]" />
                      <span>Switch Account</span>
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Mobile Navigation Toggle Button */}
          <div className="lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-sm text-[#484B4F] hover:text-[#1A1C1E] hover:bg-[#F2F1EE] border border-[#E2E2DE] transition-colors focus:outline-none focus:ring-1 focus:ring-[#1A1C1E]"
              aria-label="Toggle mobile menu"
              id="mobile-navbar-hamburger"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

      </div>

      {/* Mobile Drawer Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-[#E2E2DE] bg-white px-4 py-3 space-y-1 shadow-md animate-in slide-in-from-top duration-150">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = route.view === link.view;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.view, link.param)}
                className={`w-full px-3 py-2.5 text-left text-sm font-medium rounded-sm flex items-center gap-3 transition-colors ${
                  isActive
                    ? 'bg-[#1A1C1E] text-white font-semibold'
                    : 'text-[#484B4F] hover:bg-[#F2F1EE] hover:text-[#1A1C1E]'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{link.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
