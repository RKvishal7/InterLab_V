import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Briefcase, 
  CheckSquare, 
  FolderGit2, 
  TrendingUp, 
  Award, 
  User, 
  Settings, 
  LogOut, 
  ChevronRight, 
  Menu, 
  X, 
  Bell, 
  Search, 
  Play, 
  Compass,
  Sparkles,
  ExternalLink,
  ChevronDown,
  Building2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export type DashboardTab = 
  | 'overview' 
  | 'my-internships' 
  | 'tasks' 
  | 'projects' 
  | 'career-progress' 
  | 'certificates' 
  | 'profile' 
  | 'settings';

interface DashboardLayoutProps {
  activeTab: DashboardTab;
  onSelectTab: (tab: DashboardTab) => void;
  children: React.ReactNode;
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  activeTab,
  onSelectTab,
  children,
}) => {
  const { userProfile, navigate, signOut } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const sidebarNavItems = [
    { id: 'overview' as DashboardTab, label: 'Overview', icon: LayoutDashboard },
    { id: 'my-internships' as DashboardTab, label: 'My Internships', icon: Briefcase, badge: '1' },
    { id: 'tasks' as DashboardTab, label: 'Tasks', icon: CheckSquare, badge: '3', badgeColor: 'bg-amber-100 text-amber-900 border-amber-300' },
    { id: 'projects' as DashboardTab, label: 'Projects', icon: FolderGit2, badge: '2' },
    { id: 'career-progress' as DashboardTab, label: 'Career Progress', icon: TrendingUp },
    { id: 'certificates' as DashboardTab, label: 'Certificates', icon: Award, badge: '1', badgeColor: 'bg-purple-100 text-purple-900 border-purple-300' },
    { id: 'profile' as DashboardTab, label: 'Profile', icon: User },
  ];

  const handleLogout = () => {
    signOut();
    navigate({ view: 'landing' });
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#1A1C1E] flex flex-col font-sans selection:bg-[#EEF0FF] selection:text-[#3E51FF]">
      
      {/* Top Mobile Header (shown only on small screens) */}
      <header className="lg:hidden sticky top-0 z-30 bg-[#F9F8F6]/95 backdrop-blur-md border-b border-[#E2E2DE] px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => onSelectTab('overview')}
            className="flex items-center gap-2 text-left"
          >
            <div className="w-7 h-7 rounded-sm bg-[#1A1C1E] text-white flex items-center justify-center font-bold text-xs">
              IL
            </div>
            <span className="font-bold text-sm tracking-tight text-[#1A1C1E]">
              InternLab
            </span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate({ view: 'workspace', internshipId: 'intern-nova-frontend' })}
            className="px-2.5 py-1 bg-[#1A1C1E] text-white text-xs font-semibold rounded-xs flex items-center gap-1"
          >
            <Play className="w-3 h-3 fill-white" />
            <span>Workspace</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-xs border border-[#E2E2DE] text-[#1A1C1E] hover:bg-[#F2F1EE]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Fullscreen Slide-out Menu (when open) */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-14 z-40 bg-black/40 backdrop-blur-xs">
          <div className="bg-white w-4/5 max-w-xs h-full border-r border-[#E2E2DE] p-4 flex flex-col justify-between shadow-xl">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5 p-2 bg-[#F9F8F6] rounded-md border border-[#E2E2DE]">
                <div className="w-8 h-8 rounded-xs bg-[#1A1C1E] text-white flex items-center justify-center font-bold text-xs">
                  {userProfile.fullName ? userProfile.fullName.split(' ').map(n => n[0]).join('') : 'AM'}
                </div>
                <div className="truncate">
                  <div className="text-xs font-bold text-[#1A1C1E] truncate">{userProfile.fullName || 'Alex Morgan'}</div>
                  <div className="text-[10px] text-[#8A8A85] truncate">Computer Science Junior</div>
                </div>
              </div>

              <nav className="space-y-1">
                {sidebarNavItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        onSelectTab(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xs transition-colors ${
                        isActive
                          ? 'bg-[#1A1C1E] text-white'
                          : 'text-[#5A5C60] hover:text-[#1A1C1E] hover:bg-[#F9F8F6]'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span className={`px-1.5 py-0.2 text-[10px] font-mono font-bold rounded-xs ${item.badgeColor || 'bg-[#F2F1EE] text-[#1A1C1E]'}`}>
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </nav>
            </div>

            <div className="space-y-1 pt-4 border-t border-[#E2E2DE]">
              <button
                onClick={() => {
                  onSelectTab('settings');
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xs ${
                  activeTab === 'settings' ? 'bg-[#1A1C1E] text-white' : 'text-[#5A5C60] hover:bg-[#F9F8F6]'
                }`}
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold text-rose-600 hover:bg-rose-50 rounded-xs"
              >
                <LogOut className="w-4 h-4" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Body Container: Desktop Sidebar + Central Workspace */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        
        {/* ========================================================================= */}
        {/* DESKTOP PERSISTENT SIDEBAR */}
        {/* ========================================================================= */}
        <aside 
          className="hidden lg:flex flex-col w-64 shrink-0 border-r border-[#E2E2DE] bg-white sticky top-0 h-screen justify-between p-4"
          id="student-dashboard-persistent-sidebar"
        >
          {/* Top: Brand & Navigation Items */}
          <div className="space-y-6">
            
            {/* Brand identity header */}
            <div className="flex items-center justify-between pb-3 border-b border-[#E2E2DE]">
              <button 
                onClick={() => onSelectTab('overview')}
                className="flex items-center gap-2.5 text-left group focus:outline-none"
                id="sidebar-brand-button"
              >
                <div className="w-8 h-8 rounded-sm bg-[#1A1C1E] text-white flex items-center justify-center font-bold text-xs tracking-tight shadow-xs">
                  IL
                </div>
                <div>
                  <span className="text-base font-extrabold tracking-tight text-[#1A1C1E]">
                    InternLab
                  </span>
                  <span className="block text-[10px] uppercase font-mono font-bold tracking-wider text-[#8A8A85]">
                    Student Portal
                  </span>
                </div>
              </button>
            </div>

            {/* Main Navigation Items */}
            <nav className="space-y-1" id="sidebar-main-nav">
              {sidebarNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;

                return (
                  <button
                    key={item.id}
                    onClick={() => onSelectTab(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 text-xs font-semibold rounded-xs transition-colors ${
                      isActive
                        ? 'bg-[#1A1C1E] text-white shadow-xs'
                        : 'text-[#5A5C60] hover:text-[#1A1C1E] hover:bg-[#F9F8F6]'
                    }`}
                    id={`sidebar-nav-${item.id}`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#8A8A85]'}`} />
                      <span>{item.label}</span>
                    </div>

                    {item.badge && (
                      <span className={`px-1.5 py-0.5 text-[10px] font-mono font-bold rounded-xs border ${
                        isActive
                          ? 'bg-white/20 text-white border-white/30'
                          : item.badgeColor || 'bg-[#F2F1EE] text-[#1A1C1E] border-[#E2E2DE]'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Quick Catalog & Public Portfolio Links */}
            <div className="pt-2 space-y-1.5">
              <button
                onClick={() => navigate({ view: 'portfolio' })}
                className="w-full flex items-center justify-between p-2.5 bg-[#FAF9F7] hover:bg-[#F2F1EE] border border-[#D5D3CB] rounded-md text-xs font-semibold text-[#1A1C1E] transition-colors"
                id="sidebar-view-public-portfolio-link"
              >
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>Public Portfolio (/u)</span>
                </div>
                <span className="text-[10px] font-mono text-emerald-800 bg-emerald-100 px-1 rounded-2xs font-bold">Live</span>
              </button>

              <button
                onClick={() => navigate({ view: 'discover' })}
                className="w-full flex items-center justify-between p-2.5 bg-[#F9F8F6] hover:bg-[#F2F1EE] border border-[#E2E2DE] rounded-md text-xs font-semibold text-[#1A1C1E] transition-colors"
                id="sidebar-browse-catalog-link"
              >
                <div className="flex items-center gap-2">
                  <Compass className="w-3.5 h-3.5 text-[#3E51FF]" />
                  <span>Browse Catalog</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 text-[#8A8A85]" />
              </button>

              <button
                onClick={() => navigate({ view: 'college-dashboard' })}
                className="w-full flex items-center justify-between p-2.5 bg-[#FAF9F7] hover:bg-[#F2F1EE] border border-[#D5D3CB] rounded-md text-xs font-semibold text-[#1A1C1E] transition-colors"
                id="sidebar-college-portal-link"
              >
                <div className="flex items-center gap-2">
                  <Building2 className="w-3.5 h-3.5 text-[#1A1C1E]" />
                  <span>College Portal</span>
                </div>
                <span className="text-[10px] font-mono text-[#5A5C60] bg-[#E2E2DE] px-1 rounded-2xs">Admin</span>
              </button>
            </div>

          </div>

          {/* Bottom Sidebar: User Profile, Settings, Logout */}
          <div className="space-y-3 pt-4 border-t border-[#E2E2DE]" id="sidebar-bottom-section">
            
            {/* Student Mini Identity Card */}
            <div 
              onClick={() => onSelectTab('profile')}
              className="flex items-center gap-2.5 p-2.5 rounded-md bg-[#F9F8F6] border border-[#E2E2DE] hover:border-[#1A1C1E] cursor-pointer transition-colors"
              id="sidebar-user-card"
            >
              <div className="w-8 h-8 rounded-xs bg-[#1A1C1E] text-white flex items-center justify-center font-bold text-xs shrink-0">
                {userProfile.fullName ? userProfile.fullName.split(' ').map(n => n[0]).join('') : 'AM'}
              </div>
              <div className="overflow-hidden flex-1 text-left">
                <div className="text-xs font-bold text-[#1A1C1E] truncate">
                  {userProfile.fullName || 'Alex Morgan'}
                </div>
                <div className="text-[10px] text-[#8A8A85] truncate font-mono">
                  CS Junior • 68% Progress
                </div>
              </div>
            </div>

            {/* Bottom Actions: Settings & Logout */}
            <div className="space-y-0.5">
              <button
                onClick={() => onSelectTab('settings')}
                className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-xs transition-colors ${
                  activeTab === 'settings'
                    ? 'bg-[#1A1C1E] text-white'
                    : 'text-[#5A5C60] hover:text-[#1A1C1E] hover:bg-[#F9F8F6]'
                }`}
                id="sidebar-settings-button"
              >
                <Settings className="w-4 h-4 text-[#8A8A85]" />
                <span>Settings</span>
              </button>

              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xs transition-colors"
                id="sidebar-logout-button"
              >
                <LogOut className="w-4 h-4 text-rose-500" />
                <span>Logout</span>
              </button>
            </div>

          </div>
        </aside>

        {/* ========================================================================= */}
        {/* MAIN WORKSPACE CANVAS */}
        {/* ========================================================================= */}
        <main className="flex-1 flex flex-col min-w-0 pb-20 lg:pb-12">
          
          {/* Top Bar for Desktop Workspace */}
          <div className="hidden lg:flex items-center justify-between px-8 py-4 border-b border-[#E2E2DE] bg-[#F9F8F6]/80 backdrop-blur-xs">
            <div className="flex items-center gap-2 text-xs font-mono text-[#8A8A85]">
              <span>InternLab</span>
              <span>/</span>
              <span className="text-[#1A1C1E] font-bold capitalize">{activeTab.replace('-', ' ')}</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-2.5 py-1 rounded-xs bg-white border border-[#E2E2DE] text-xs font-mono text-[#1A1C1E]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>Simulation Active: Nova Labs</span>
              </div>

              <button
                onClick={() => navigate({ view: 'workspace', internshipId: 'intern-nova-frontend' })}
                className="px-3.5 py-1.5 bg-[#1A1C1E] hover:bg-black text-white text-xs font-semibold rounded-xs transition-colors flex items-center gap-1.5 shadow-2xs"
                id="topbar-open-workspace-btn"
              >
                <Play className="w-3 h-3 fill-white" />
                <span>Open Workspace</span>
              </button>
            </div>
          </div>

          {/* Tab Content Container */}
          <div className="p-4 sm:p-6 lg:p-8 flex-1">
            {children}
          </div>
        </main>

      </div>

      {/* ========================================================================= */}
      {/* MOBILE BOTTOM NAVIGATION BAR */}
      {/* ========================================================================= */}
      <nav 
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#E2E2DE] px-2 py-1.5 flex items-center justify-around shadow-lg"
        id="mobile-bottom-navigation"
      >
        {[
          { id: 'overview' as DashboardTab, label: 'Overview', icon: LayoutDashboard },
          { id: 'my-internships' as DashboardTab, label: 'Internships', icon: Briefcase },
          { id: 'tasks' as DashboardTab, label: 'Tasks', icon: CheckSquare, badge: '3' },
          { id: 'projects' as DashboardTab, label: 'Projects', icon: FolderGit2 },
          { id: 'profile' as DashboardTab, label: 'Profile', icon: User },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => onSelectTab(tab.id)}
              className={`flex flex-col items-center justify-center py-1 px-2 rounded-xs relative transition-colors ${
                isActive ? 'text-[#1A1C1E] font-bold' : 'text-[#8A8A85] hover:text-[#5A5C60]'
              }`}
              id={`mobile-tab-${tab.id}`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-[1.75]'}`} />
                {tab.badge && (
                  <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 rounded-full bg-amber-500 text-white font-mono text-[9px] font-bold flex items-center justify-center">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className="text-[10px] mt-0.5 tracking-tight">
                {tab.label}
              </span>
              {isActive && (
                <div className="w-1 h-1 rounded-full bg-[#1A1C1E] mt-0.5" />
              )}
            </button>
          );
        })}
      </nav>

    </div>
  );
};
