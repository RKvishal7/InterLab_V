import React, { useState } from 'react';
import { 
  Building2, 
  Users, 
  BookOpen, 
  BarChart2, 
  FileText, 
  Settings, 
  GraduationCap, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Download, 
  Search, 
  Filter, 
  ExternalLink, 
  Mail, 
  Clock, 
  Calendar, 
  Award, 
  ArrowUpRight, 
  Sparkles, 
  ChevronRight, 
  Check, 
  Info,
  Layers,
  Activity,
  Briefcase,
  FolderGit2,
  Bell,
  RefreshCw,
  Sliders,
  ShieldCheck,
  Zap,
  MoreVertical,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { 
  COLLEGE_INSTITUTION_PROFILE, 
  COLLEGE_OVERVIEW_METRICS, 
  COLLEGE_STUDENTS, 
  COLLEGE_TOP_SKILLS, 
  COLLEGE_PROGRAMS, 
  CollegeStudent, 
  CollegeProgram 
} from '../../data/collegeData';
import { ReportModal } from './ReportModal';

type DashboardTab = 'overview' | 'students' | 'programs' | 'analytics' | 'reports' | 'settings';

interface CollegeDashboardPageProps {
  initialTab?: DashboardTab;
}

export const CollegeDashboardPage: React.FC<CollegeDashboardPageProps> = ({ initialTab = 'overview' }) => {
  const { navigate } = useApp();
  const [activeTab, setActiveTab] = useState<DashboardTab>(initialTab);
  
  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'On Track' | 'Active' | 'Completed' | 'At-Risk'>('All');
  const [departmentFilter, setDepartmentFilter] = useState<string>('All');
  
  // Selected student for detail inspection
  const [selectedStudent, setSelectedStudent] = useState<CollegeStudent | null>(null);

  // Intervention action feedback toasts
  const [interventionNotice, setInterventionNotice] = useState<string | null>(null);

  // Report Modal state
  const [reportModalType, setReportModalType] = useState<'progress' | 'placement' | 'accreditation' | 'at-risk' | null>(null);

  // Action handlers
  const handleTriggerNudge = (student: CollegeStudent, reason?: string) => {
    setInterventionNotice(`Academic advisory nudge email sent to ${student.name} (${student.email}). Follow-up logged.`);
    setTimeout(() => setInterventionNotice(null), 4500);
  };

  const handleScheduleAdvising = (student: CollegeStudent) => {
    setInterventionNotice(`1-on-1 Advising session scheduled with ${student.name} for tomorrow at 2:00 PM.`);
    setTimeout(() => setInterventionNotice(null), 4500);
  };

  const handleGrantExtension = (student: CollegeStudent) => {
    setInterventionNotice(`3-day milestone deadline extension granted for ${student.name}. Supervisor notified.`);
    setTimeout(() => setInterventionNotice(null), 4500);
  };

  // Filtered students
  const filteredStudents = COLLEGE_STUDENTS.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.currentInternship.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'All' || student.status === statusFilter;
    const matchesDept = departmentFilter === 'All' || student.department === departmentFilter;

    return matchesSearch && matchesStatus && matchesDept;
  });

  const atRiskStudents = COLLEGE_STUDENTS.filter(s => s.status === 'At-Risk');

  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1A1C1E] flex flex-col" id="college-dashboard-root">
      
      {/* Top Institutional Header */}
      <header className="bg-white border-b border-[#E2E2DE] px-4 sm:px-6 py-3 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xs bg-[#1A1C1E] text-white flex items-center justify-center font-serif font-bold text-lg shadow-2xs">
              🏛️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-extrabold text-base sm:text-lg text-[#1A1C1E] leading-tight">
                  {COLLEGE_INSTITUTION_PROFILE.institutionName}
                </h1>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] font-mono font-bold rounded-2xs">
                  ABET Verified
                </span>
              </div>
              <p className="text-xs text-[#5A5C60]">
                {COLLEGE_INSTITUTION_PROFILE.subDepartment} • {COLLEGE_INSTITUTION_PROFILE.academicYear}
              </p>
            </div>
          </div>

          {/* Quick Header Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setReportModalType('progress')}
              className="px-3 py-1.5 bg-white hover:bg-[#FAF9F7] text-[#1A1C1E] border border-[#D5D3CB] text-xs font-semibold rounded-xs transition-colors flex items-center gap-1.5 shadow-2xs"
              id="btn-header-download-progress"
            >
              <Download className="w-3.5 h-3.5 text-[#5A5C60]" />
              <span>Download Progress Report</span>
            </button>

            <button
              onClick={() => setReportModalType('placement')}
              className="px-3 py-1.5 bg-[#1A1C1E] hover:bg-black text-white text-xs font-semibold rounded-xs transition-colors flex items-center gap-1.5 shadow-2xs"
              id="btn-header-generate-placement"
            >
              <Award className="w-3.5 h-3.5 text-emerald-400" />
              <span>Generate Placement Readiness Report</span>
            </button>

            <button
              onClick={() => navigate({ view: 'universities' })}
              className="px-2.5 py-1.5 text-xs text-[#5A5C60] hover:text-[#1A1C1E] hover:bg-[#F2F1EE] rounded-xs font-medium transition-colors"
              title="View Public University Page"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </header>

      {/* Main Layout (Sidebar + Content Body) */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        
        {/* ========================================================================= */}
        {/* SIDEBAR NAVIGATION (Strict User Requirements)                            */}
        {/* Overview | Students | Programs | Analytics | Reports | Settings          */}
        {/* ========================================================================= */}
        <aside className="w-56 sm:w-60 bg-[#FAF9F7] border-r border-[#E2E2DE] p-4 flex flex-col justify-between shrink-0">
          
          <div className="space-y-6">
            
            <div className="px-2 py-1">
              <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8A8A85]">
                Institutional Console
              </div>
            </div>

            <nav className="space-y-1">
              {/* Tab 1: Overview */}
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-xs transition-colors ${
                  activeTab === 'overview'
                    ? 'bg-[#1A1C1E] text-white'
                    : 'text-[#5A5C60] hover:text-[#1A1C1E] hover:bg-[#F2F1EE]'
                }`}
                id="sidebar-tab-overview"
              >
                <Activity className="w-4 h-4" />
                <span>Overview</span>
              </button>

              {/* Tab 2: Students */}
              <button
                onClick={() => setActiveTab('students')}
                className={`w-full flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xs transition-colors ${
                  activeTab === 'students'
                    ? 'bg-[#1A1C1E] text-white'
                    : 'text-[#5A5C60] hover:text-[#1A1C1E] hover:bg-[#F2F1EE]'
                }`}
                id="sidebar-tab-students"
              >
                <div className="flex items-center gap-3">
                  <Users className="w-4 h-4" />
                  <span>Students</span>
                </div>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-2xs ${
                  activeTab === 'students' ? 'bg-white/20 text-white' : 'bg-[#E2E2DE] text-[#5A5C60]'
                }`}>
                  {COLLEGE_OVERVIEW_METRICS.totalStudents}
                </span>
              </button>

              {/* Tab 3: Programs */}
              <button
                onClick={() => setActiveTab('programs')}
                className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-xs transition-colors ${
                  activeTab === 'programs'
                    ? 'bg-[#1A1C1E] text-white'
                    : 'text-[#5A5C60] hover:text-[#1A1C1E] hover:bg-[#F2F1EE]'
                }`}
                id="sidebar-tab-programs"
              >
                <BookOpen className="w-4 h-4" />
                <span>Programs</span>
              </button>

              {/* Tab 4: Analytics */}
              <button
                onClick={() => setActiveTab('analytics')}
                className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-xs transition-colors ${
                  activeTab === 'analytics'
                    ? 'bg-[#1A1C1E] text-white'
                    : 'text-[#5A5C60] hover:text-[#1A1C1E] hover:bg-[#F2F1EE]'
                }`}
                id="sidebar-tab-analytics"
              >
                <BarChart2 className="w-4 h-4" />
                <span>Analytics</span>
              </button>

              {/* Tab 5: Reports */}
              <button
                onClick={() => setActiveTab('reports')}
                className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-xs transition-colors ${
                  activeTab === 'reports'
                    ? 'bg-[#1A1C1E] text-white'
                    : 'text-[#5A5C60] hover:text-[#1A1C1E] hover:bg-[#F2F1EE]'
                }`}
                id="sidebar-tab-reports"
              >
                <FileText className="w-4 h-4" />
                <span>Reports</span>
              </button>

              {/* Tab 6: Settings */}
              <button
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-xs transition-colors ${
                  activeTab === 'settings'
                    ? 'bg-[#1A1C1E] text-white'
                    : 'text-[#5A5C60] hover:text-[#1A1C1E] hover:bg-[#F2F1EE]'
                }`}
                id="sidebar-tab-settings"
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </button>
            </nav>

          </div>

          {/* Sidebar Footer Advisor Profile */}
          <div className="pt-4 border-t border-[#E2E2DE] space-y-2">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-[#1A1C1E] text-white flex items-center justify-center text-xs font-bold font-mono">
                EV
              </div>
              <div className="truncate">
                <div className="text-xs font-bold text-[#1A1C1E] truncate">{COLLEGE_INSTITUTION_PROFILE.directorName}</div>
                <div className="text-[10px] text-[#8A8A85] truncate">Associate Dean</div>
              </div>
            </div>
            <div className="text-[10px] font-mono text-[#8A8A85] bg-[#F2F1EE] p-1.5 rounded-2xs border border-[#E2E2DE]">
              LMS Sync: <span className="text-emerald-700 font-bold">Online (Canvas)</span>
            </div>
          </div>

        </aside>

        {/* ========================================================================= */}
        {/* MAIN VIEW CONTENT AREA                                                    */}
        {/* ========================================================================= */}
        <main className="flex-1 p-6 space-y-8 overflow-x-hidden">
          
          {/* Action Notification Banner */}
          {interventionNotice && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xs text-xs flex items-center justify-between animate-in fade-in slide-in-from-top-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>{interventionNotice}</span>
              </div>
              <button 
                onClick={() => setInterventionNotice(null)} 
                className="text-emerald-700 hover:text-emerald-900"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* ======================================================================= */}
          {/* TAB 1: OVERVIEW (Strict User Specifications)                            */}
          {/* ======================================================================= */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-150" id="tab-content-overview">
              
              {/* 1. Top Summary KPI Row: Total Students, Active Internships, Completion Rate, Average Performance */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                
                {/* Metric 1: Total Students */}
                <div className="bg-white border border-[#E2E2DE] p-5 rounded-xs shadow-2xs space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#8A8A85] font-mono">
                    <span>TOTAL STUDENTS</span>
                    <Users className="w-4 h-4 text-[#1A1C1E]" />
                  </div>
                  <div className="text-3xl font-extrabold font-mono text-[#1A1C1E]">
                    {COLLEGE_OVERVIEW_METRICS.totalStudents.toLocaleString()}
                  </div>
                  <div className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>{COLLEGE_OVERVIEW_METRICS.totalStudentsChange}</span>
                  </div>
                </div>

                {/* Metric 2: Active Internships */}
                <div className="bg-white border border-[#E2E2DE] p-5 rounded-xs shadow-2xs space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#8A8A85] font-mono">
                    <span>ACTIVE INTERNSHIPS</span>
                    <Briefcase className="w-4 h-4 text-[#3E51FF]" />
                  </div>
                  <div className="text-3xl font-extrabold font-mono text-[#1A1C1E]">
                    {COLLEGE_OVERVIEW_METRICS.activeInternships.toLocaleString()}
                  </div>
                  <div className="text-xs text-[#5A5C60] font-medium">
                    {COLLEGE_OVERVIEW_METRICS.activeInternshipsChange}
                  </div>
                </div>

                {/* Metric 3: Completion Rate */}
                <div className="bg-white border border-[#E2E2DE] p-5 rounded-xs shadow-2xs space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#8A8A85] font-mono">
                    <span>COMPLETION RATE</span>
                    <Award className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-3xl font-extrabold font-mono text-emerald-700">
                    {COLLEGE_OVERVIEW_METRICS.completionRate}%
                  </div>
                  <div className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" />
                    <span>{COLLEGE_OVERVIEW_METRICS.completionRateChange}</span>
                  </div>
                </div>

                {/* Metric 4: Average Performance */}
                <div className="bg-white border border-[#E2E2DE] p-5 rounded-xs shadow-2xs space-y-2">
                  <div className="flex items-center justify-between text-xs text-[#8A8A85] font-mono">
                    <span>AVERAGE PERFORMANCE</span>
                    <BarChart2 className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="text-3xl font-extrabold font-mono text-[#1A1C1E]">
                    {COLLEGE_OVERVIEW_METRICS.averagePerformance}<span className="text-lg font-normal text-[#8A8A85]">/100</span>
                  </div>
                  <div className="text-xs text-purple-800 font-medium">
                    {COLLEGE_OVERVIEW_METRICS.averagePerformanceGrade}
                  </div>
                </div>

              </div>

              {/* 2. AT-RISK STUDENTS SECTION (Highlighted & Flagged) */}
              <div className="bg-white border border-amber-200 rounded-lg p-5 shadow-2xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-amber-100 pb-3">
                  <div className="flex items-center gap-2">
                    <div className="p-1.5 bg-amber-100 text-amber-900 rounded-xs">
                      <AlertTriangle className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-[#1A1C1E]">
                        At-Risk Students Requiring Intervention ({atRiskStudents.length} Flagged)
                      </h3>
                      <p className="text-xs text-[#5A5C60]">
                        Students who have not logged in recently, are behind schedule, or have incomplete deliverables.
                      </p>
                    </div>
                  </div>

                  <div className="text-xs font-mono text-amber-800 bg-amber-50 px-2 py-1 rounded-2xs border border-amber-200">
                    Automated Early-Warning Engine
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {atRiskStudents.map((student) => (
                    <div 
                      key={student.id} 
                      className="bg-[#FAF9F7] border border-amber-200/80 rounded-xs p-3.5 space-y-3 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="font-bold text-xs text-[#1A1C1E]">{student.name}</div>
                            <div className="text-[10px] text-[#5A5C60] font-mono">{student.studentId} • {student.department}</div>
                          </div>
                          <span className="px-1.5 py-0.5 bg-amber-100 text-amber-900 border border-amber-300 rounded-2xs text-[10px] font-mono font-bold">
                            At-Risk
                          </span>
                        </div>

                        <div className="text-[11px] text-[#5A5C60]">
                          Internship: <strong className="text-[#1A1C1E]">{student.currentInternship}</strong>
                        </div>

                        {/* Specific Risk Reasons */}
                        <div className="space-y-1 bg-amber-50/70 p-2 rounded-2xs border border-amber-200/60">
                          {student.riskReasons?.map((reason, idx) => (
                            <div key={idx} className="text-[10px] text-amber-900 flex items-start gap-1.5 leading-tight">
                              <span className="text-amber-600 font-bold">•</span>
                              <span>{reason}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Intervention Actions */}
                      <div className="pt-2 border-t border-[#E2E2DE] flex items-center gap-1.5">
                        <button
                          onClick={() => handleTriggerNudge(student)}
                          className="flex-1 py-1 px-2 bg-white hover:bg-[#F2F1EE] border border-[#D5D3CB] text-[10px] font-semibold text-[#1A1C1E] rounded-2xs transition-colors flex items-center justify-center gap-1"
                        >
                          <Mail className="w-3 h-3 text-[#5A5C60]" />
                          <span>Send Nudge</span>
                        </button>
                        <button
                          onClick={() => handleScheduleAdvising(student)}
                          className="flex-1 py-1 px-2 bg-[#1A1C1E] hover:bg-black text-white text-[10px] font-semibold rounded-2xs transition-colors flex items-center justify-center gap-1"
                        >
                          <Calendar className="w-3 h-3" />
                          <span>1-on-1 Advising</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. STUDENT PERFORMANCE TABLE (Strict User Specifications) */}
              {/* Columns: Student | Current Internship | Progress | Average Score | Status */}
              <div className="bg-white border border-[#E2E2DE] rounded-lg shadow-2xs overflow-hidden space-y-0">
                
                <div className="p-4 border-b border-[#E2E2DE] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#FAF9F7]">
                  <div>
                    <h3 className="font-bold text-sm text-[#1A1C1E]">Student Performance Directory</h3>
                    <p className="text-xs text-[#5A5C60]">Active enrollment cohort status and deliverable progress.</p>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#8A8A85]" />
                      <input
                        type="text"
                        placeholder="Search student or ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-8 pr-3 py-1.5 bg-white border border-[#D5D3CB] rounded-xs text-xs text-[#1A1C1E] placeholder:text-[#8A8A85] focus:outline-none focus:ring-1 focus:ring-[#1A1C1E] w-48 sm:w-56"
                      />
                    </div>

                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value as any)}
                      className="px-2.5 py-1.5 bg-white border border-[#D5D3CB] rounded-xs text-xs font-semibold text-[#1A1C1E] focus:outline-none"
                    >
                      <option value="All">All Statuses</option>
                      <option value="On Track">On Track</option>
                      <option value="Active">Active</option>
                      <option value="Completed">Completed</option>
                      <option value="At-Risk">At-Risk</option>
                    </select>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-[#E2E2DE] bg-[#F2F1EE] text-[#5A5C60] font-mono text-[11px]">
                        <th className="py-3 px-4 font-semibold">Student</th>
                        <th className="py-3 px-4 font-semibold">Current Internship</th>
                        <th className="py-3 px-4 font-semibold">Progress</th>
                        <th className="py-3 px-4 font-semibold">Average Score</th>
                        <th className="py-3 px-4 font-semibold">Status</th>
                        <th className="py-3 px-4 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E2DE]">
                      {filteredStudents.map((student) => {
                        const isAtRisk = student.status === 'At-Risk';
                        const isCompleted = student.status === 'Completed';

                        return (
                          <tr 
                            key={student.id} 
                            className="hover:bg-[#FAF9F7] transition-colors"
                          >
                            {/* 1. Student Column */}
                            <td className="py-3.5 px-4">
                              <div className="flex items-center gap-2.5">
                                <div className="w-8 h-8 rounded-full bg-[#E2E2DE] text-[#1A1C1E] font-bold text-xs flex items-center justify-center shrink-0">
                                  {student.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                  <div className="font-bold text-[#1A1C1E]">{student.name}</div>
                                  <div className="text-[10px] text-[#5A5C60] font-mono">{student.studentId} • {student.department}</div>
                                </div>
                              </div>
                            </td>

                            {/* 2. Current Internship Column */}
                            <td className="py-3.5 px-4">
                              <div className="font-medium text-[#1A1C1E]">{student.currentInternship}</div>
                              <div className="text-[10px] text-[#8A8A85] font-mono">{student.company} • {student.track}</div>
                            </td>

                            {/* 3. Progress Column */}
                            <td className="py-3.5 px-4 w-40">
                              <div className="space-y-1">
                                <div className="flex items-center justify-between text-[10px] font-mono">
                                  <span className="font-bold text-[#1A1C1E]">{student.progressPercent}%</span>
                                  <span className="text-[#8A8A85]">{student.completedDeliverables}/{student.totalDeliverables} tasks</span>
                                </div>
                                <div className="w-full h-1.5 bg-[#E2E2DE] rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full rounded-full ${
                                      isAtRisk ? 'bg-amber-500' : isCompleted ? 'bg-emerald-600' : 'bg-[#1A1C1E]'
                                    }`}
                                    style={{ width: `${student.progressPercent}%` }}
                                  ></div>
                                </div>
                              </div>
                            </td>

                            {/* 4. Average Score Column */}
                            <td className="py-3.5 px-4">
                              <div className="font-mono font-bold text-sm">
                                <span className={student.averageScore >= 85 ? 'text-emerald-700' : student.averageScore >= 75 ? 'text-[#1A1C1E]' : 'text-amber-800'}>
                                  {student.averageScore}%
                                </span>
                              </div>
                              <div className="text-[10px] text-[#8A8A85]">Rubric Avg</div>
                            </td>

                            {/* 5. Status Column */}
                            <td className="py-3.5 px-4">
                              <span className={`inline-flex items-center px-2 py-0.5 rounded-2xs text-[10px] font-mono font-bold border ${
                                isCompleted
                                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                  : isAtRisk
                                  ? 'bg-amber-50 text-amber-900 border-amber-300'
                                  : student.status === 'On Track'
                                  ? 'bg-blue-50 text-blue-800 border-blue-200'
                                  : 'bg-neutral-100 text-neutral-800 border-neutral-200'
                              }`}>
                                {student.status}
                              </span>
                            </td>

                            {/* Actions */}
                            <td className="py-3.5 px-4 text-right">
                              <button
                                onClick={() => setSelectedStudent(student)}
                                className="px-2.5 py-1 text-xs font-semibold text-[#1A1C1E] hover:bg-[#E2E2DE] rounded-xs border border-[#D5D3CB] transition-colors"
                              >
                                View Dossier
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                <div className="p-3 bg-[#FAF9F7] border-t border-[#E2E2DE] flex items-center justify-between text-xs text-[#5A5C60] font-mono">
                  <span>Showing {filteredStudents.length} of {COLLEGE_STUDENTS.length} students</span>
                  <button 
                    onClick={() => setActiveTab('students')}
                    className="text-[#1A1C1E] font-semibold hover:underline flex items-center gap-1"
                  >
                    <span>Open Full Student Directory</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* 4. SKILL ANALYTICS SECTION (Aggregated Skills) */}
              {/* Top Skills: JavaScript, Data Analysis, UI Design, Python */}
              <div className="bg-white border border-[#E2E2DE] rounded-lg p-5 shadow-2xs space-y-4" id="skill-analytics-summary-block">
                
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E2E2DE] pb-3">
                  <div>
                    <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#3E51FF]">
                      Aggregated Cohort Competency
                    </div>
                    <h3 className="text-base font-bold text-[#1A1C1E] mt-0.5">
                      Top Verified Skills
                    </h3>
                    <p className="text-xs text-[#5A5C60]">
                      Objective deliverable grading measured across all student submissions.
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveTab('analytics')}
                    className="text-xs font-semibold text-[#1A1C1E] hover:underline flex items-center gap-1 self-start sm:self-auto"
                  >
                    <span>View Deep-Dive Skill Matrices</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {COLLEGE_TOP_SKILLS.slice(0, 4).map((skill) => (
                    <div 
                      key={skill.name} 
                      className="bg-[#FAF9F7] border border-[#E2E2DE] p-4 rounded-xs space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-mono text-[#8A8A85]">{skill.category}</span>
                        <span className="text-[10px] font-mono font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-2xs border border-emerald-200">
                          +{skill.quarterlyGrowth}% QoQ
                        </span>
                      </div>

                      <div>
                        <div className="text-base font-extrabold text-[#1A1C1E]">{skill.name}</div>
                        <div className="text-xs text-[#5A5C60]">{skill.proficientStudentsCount} Proficient Students</div>
                      </div>

                      <div className="space-y-1.5 pt-1">
                        <div className="flex items-center justify-between text-[10px] font-mono">
                          <span className="text-[#5A5C60]">Avg Proficiency</span>
                          <span className="font-bold text-[#1A1C1E]">{skill.averageProficiency}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-[#E2E2DE] rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#1A1C1E] rounded-full"
                            style={{ width: `${skill.averageProficiency}%` }}
                          ></div>
                        </div>
                        <div className="text-[10px] text-[#8A8A85] flex items-center justify-between">
                          <span>Industry Bar: {skill.industryHiringBar}%</span>
                          <span className="text-emerald-700 font-bold">Above Target</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>

              {/* 5. REPORTS GENERATOR SECTION (Strict User Requirement) */}
              <div className="bg-[#FAF9F7] border border-[#D5D3CB] rounded-lg p-6 space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#1A1C1E]">
                      Accreditation & Employer Deliverables
                    </span>
                    <h3 className="text-base font-bold text-[#1A1C1E] mt-0.5">
                      Institutional Report Center
                    </h3>
                    <p className="text-xs text-[#5A5C60]">
                      Generate audit-ready progress logs and recruiter placement dossiers in one click.
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      onClick={() => setReportModalType('progress')}
                      className="px-4 py-2 bg-white hover:bg-[#F2F1EE] text-[#1A1C1E] border border-[#D5D3CB] text-xs font-semibold rounded-xs transition-colors flex items-center gap-1.5 shadow-2xs"
                      id="btn-overview-download-progress-report"
                    >
                      <Download className="w-3.5 h-3.5 text-[#5A5C60]" />
                      <span>Download Progress Report</span>
                    </button>

                    <button
                      onClick={() => setReportModalType('placement')}
                      className="px-4 py-2 bg-[#1A1C1E] hover:bg-black text-white text-xs font-semibold rounded-xs transition-colors flex items-center gap-1.5 shadow-2xs"
                      id="btn-overview-generate-placement-readiness"
                    >
                      <Award className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Generate Placement Readiness Report</span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* ======================================================================= */}
          {/* TAB 2: STUDENTS DIRECTORY                                                */}
          {/* ======================================================================= */}
          {activeTab === 'students' && (
            <div className="space-y-6 animate-in fade-in duration-150" id="tab-content-students">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-[#1A1C1E]">Enrolled Student Directory</h2>
                  <p className="text-xs text-[#5A5C60]">Comprehensive roster with individual project submissions and skill credentials.</p>
                </div>

                <button
                  onClick={() => setReportModalType('progress')}
                  className="px-3 py-1.5 bg-[#1A1C1E] text-white text-xs font-semibold rounded-xs flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export Roster (CSV)</span>
                </button>
              </div>

              {/* Filter controls */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 bg-white p-3 border border-[#E2E2DE] rounded-xs">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#8A8A85]" />
                  <input
                    type="text"
                    placeholder="Search by name, student ID, track..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 bg-[#FAF9F7] border border-[#D5D3CB] rounded-xs text-xs text-[#1A1C1E] focus:outline-none"
                  />
                </div>

                <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="px-3 py-1.5 bg-[#FAF9F7] border border-[#D5D3CB] rounded-xs text-xs text-[#1A1C1E]"
                >
                  <option value="All">All Departments</option>
                  <option value="Computer Science">Computer Science</option>
                  <option value="Data Science & Analytics">Data Science & Analytics</option>
                  <option value="Human-Computer Interaction">Human-Computer Interaction</option>
                  <option value="Software Engineering">Software Engineering</option>
                  <option value="Information Systems">Information Systems</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="px-3 py-1.5 bg-[#FAF9F7] border border-[#D5D3CB] rounded-xs text-xs text-[#1A1C1E]"
                >
                  <option value="All">All Statuses</option>
                  <option value="On Track">On Track</option>
                  <option value="Active">Active</option>
                  <option value="Completed">Completed</option>
                  <option value="At-Risk">At-Risk</option>
                </select>
              </div>

              {/* Student Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredStudents.map((student) => (
                  <div 
                    key={student.id}
                    className="bg-white border border-[#E2E2DE] hover:border-[#1A1C1E] p-4 rounded-xs shadow-2xs space-y-3 transition-colors"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-full bg-[#FAF9F7] border border-[#D5D3CB] flex items-center justify-center font-bold text-xs text-[#1A1C1E]">
                          {student.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div>
                          <div className="font-bold text-sm text-[#1A1C1E]">{student.name}</div>
                          <div className="text-[11px] text-[#5A5C60]">{student.department} • {student.year}</div>
                        </div>
                      </div>

                      <span className={`px-2 py-0.5 rounded-2xs text-[10px] font-mono font-bold border ${
                        student.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : student.status === 'At-Risk'
                          ? 'bg-amber-50 text-amber-900 border-amber-300'
                          : 'bg-blue-50 text-blue-800 border-blue-200'
                      }`}>
                        {student.status}
                      </span>
                    </div>

                    <div className="p-2.5 bg-[#FAF9F7] rounded-xs border border-[#E2E2DE] space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-[#5A5C60]">Current Simulation:</span>
                        <span className="font-semibold text-[#1A1C1E] truncate max-w-[200px]">{student.currentInternship}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#5A5C60]">Rubric Score:</span>
                        <span className="font-mono font-bold text-emerald-700">{student.averageScore}%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#5A5C60]">Last Active:</span>
                        <span className="font-mono text-[#8A8A85]">{student.lastActive}</span>
                      </div>
                    </div>

                    {/* Mastered Skills */}
                    <div className="flex flex-wrap gap-1">
                      {student.skillsMastered.map(sk => (
                        <span key={sk} className="text-[10px] font-mono px-1.5 py-0.5 bg-[#F2F1EE] text-[#5A5C60] rounded-2xs">
                          {sk}
                        </span>
                      ))}
                    </div>

                    <div className="pt-2 border-t border-[#E2E2DE] flex items-center justify-between">
                      <button
                        onClick={() => handleTriggerNudge(student)}
                        className="text-xs text-[#5A5C60] hover:text-[#1A1C1E] font-medium flex items-center gap-1"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Send Message</span>
                      </button>

                      <button
                        onClick={() => setSelectedStudent(student)}
                        className="px-3 py-1 bg-[#1A1C1E] hover:bg-black text-white text-xs font-semibold rounded-xs transition-colors"
                      >
                        View Full Dossier
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ======================================================================= */}
          {/* TAB 3: PROGRAMS                                                         */}
          {/* ======================================================================= */}
          {activeTab === 'programs' && (
            <div className="space-y-6 animate-in fade-in duration-150" id="tab-content-programs">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-[#1A1C1E]">Academic Programs & Cohorts</h2>
                  <p className="text-xs text-[#5A5C60]">Course-integrated virtual internships mapped directly to departmental curricula.</p>
                </div>

                <button
                  onClick={() => navigate({ view: 'discover' })}
                  className="px-3 py-1.5 bg-[#1A1C1E] text-white text-xs font-semibold rounded-xs flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Assign New Simulation Track</span>
                </button>
              </div>

              <div className="space-y-4">
                {COLLEGE_PROGRAMS.map((prog) => (
                  <div 
                    key={prog.id}
                    className="bg-white border border-[#E2E2DE] p-5 rounded-xs shadow-2xs space-y-4"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#E2E2DE] pb-3">
                      <div>
                        <div className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#3E51FF]">
                          {prog.department} • {prog.term}
                        </div>
                        <h3 className="text-base font-bold text-[#1A1C1E] mt-0.5">{prog.name}</h3>
                        <p className="text-xs text-[#5A5C60]">Lead Faculty: {prog.leadFaculty}</p>
                      </div>

                      <span className={`px-2 py-0.5 rounded-2xs text-[10px] font-mono font-bold border self-start sm:self-auto ${
                        prog.status === 'Completed'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-200'
                          : 'bg-blue-50 text-blue-800 border-blue-200'
                      }`}>
                        {prog.status}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs bg-[#FAF9F7] p-3 rounded-xs border border-[#E2E2DE]">
                      <div>
                        <div className="text-[10px] text-[#8A8A85] font-mono">ENROLLED</div>
                        <div className="text-base font-bold text-[#1A1C1E]">{prog.enrolledStudents} Students</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[#8A8A85] font-mono">ACTIVE RUNS</div>
                        <div className="text-base font-bold text-[#3E51FF]">{prog.activeInternships}</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[#8A8A85] font-mono">COMPLETION RATE</div>
                        <div className="text-base font-bold text-emerald-700">{prog.completionRate}%</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[#8A8A85] font-mono">AVG RUBRIC SCORE</div>
                        <div className="text-base font-bold text-[#1A1C1E]">{prog.averageScore}/100</div>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="text-[#5A5C60]">Tracks:</span>
                        {prog.recommendedTracks.map(tr => (
                          <span key={tr} className="px-2 py-0.5 bg-[#F2F1EE] text-[#1A1C1E] font-mono text-[10px] rounded-2xs">
                            {tr}
                          </span>
                        ))}
                      </div>

                      <button
                        onClick={() => {
                          setActiveTab('students');
                          setDepartmentFilter(prog.department.includes('Computer Science') ? 'Computer Science' : 'Data Science & Analytics');
                        }}
                        className="text-xs font-semibold text-[#1A1C1E] hover:underline flex items-center gap-1"
                      >
                        <span>View Cohort Students</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ======================================================================= */}
          {/* TAB 4: ANALYTICS                                                        */}
          {/* ======================================================================= */}
          {activeTab === 'analytics' && (
            <div className="space-y-6 animate-in fade-in duration-150" id="tab-content-analytics">
              
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-extrabold text-[#1A1C1E]">Institutional Skill Analytics</h2>
                  <p className="text-xs text-[#5A5C60]">Aggregated competency distributions mapped to ABET, NACE, and corporate hiring standards.</p>
                </div>

                <button
                  onClick={() => setReportModalType('accreditation')}
                  className="px-3 py-1.5 bg-[#1A1C1E] text-white text-xs font-semibold rounded-xs flex items-center gap-1.5 self-start sm:self-auto"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Accreditation Evidence Audit</span>
                </button>
              </div>

              {/* All Skills Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {COLLEGE_TOP_SKILLS.map((skill) => (
                  <div 
                    key={skill.name} 
                    className="bg-white border border-[#E2E2DE] p-5 rounded-xs shadow-2xs space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-[#8A8A85] uppercase tracking-wider">{skill.category}</span>
                        <h3 className="text-lg font-bold text-[#1A1C1E]">{skill.name}</h3>
                      </div>
                      <span className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-2xs border border-emerald-200">
                        +{skill.quarterlyGrowth}% QoQ
                      </span>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-[#5A5C60]">Cohort Average Proficiency:</span>
                        <span className="font-bold text-[#1A1C1E]">{skill.averageProficiency}%</span>
                      </div>
                      <div className="w-full h-2 bg-[#E2E2DE] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[#1A1C1E] rounded-full" 
                          style={{ width: `${skill.averageProficiency}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs bg-[#FAF9F7] p-2.5 rounded-xs border border-[#E2E2DE] font-mono">
                      <div>
                        <div className="text-[10px] text-[#8A8A85]">PROFICIENT STUDENTS</div>
                        <div className="font-bold text-[#1A1C1E]">{skill.proficientStudentsCount} Students</div>
                      </div>
                      <div>
                        <div className="text-[10px] text-[#8A8A85]">INDUSTRY HIRING BAR</div>
                        <div className="font-bold text-emerald-700">{skill.industryHiringBar}% (Exceeded)</div>
                      </div>
                    </div>

                    <div className="text-xs text-[#5A5C60] flex items-center justify-between pt-1">
                      <span>Primary Simulation:</span>
                      <span className="font-semibold text-[#1A1C1E]">{skill.topSimulation}</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          )}

          {/* ======================================================================= */}
          {/* TAB 5: REPORTS (Strict User Specification)                               */}
          {/* ======================================================================= */}
          {activeTab === 'reports' && (
            <div className="space-y-6 animate-in fade-in duration-150" id="tab-content-reports">
              
              <div>
                <h2 className="text-xl font-extrabold text-[#1A1C1E]">Institutional Reports & Audits</h2>
                <p className="text-xs text-[#5A5C60]">Download official progress audits, employer placement dossiers, and accreditation evidence packages.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                
                {/* Report 1: Download Progress Report */}
                <div className="bg-white border border-[#E2E2DE] hover:border-[#1A1C1E] p-6 rounded-xs shadow-2xs space-y-4 flex flex-col justify-between transition-colors">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xs bg-[#FAF9F7] border border-[#D5D3CB] flex items-center justify-center text-[#1A1C1E]">
                      <FileText className="w-5 h-5 text-[#3E51FF]" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8A8A85]">Curricular Audit</span>
                      <h3 className="text-base font-bold text-[#1A1C1E] mt-0.5">Student Progress Report</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-[#5A5C60] leading-relaxed">
                      Detailed report covering student completion metrics, weekly milestone progression, time-on-task, and code evaluation rubric breakdowns.
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-[#F2F1EE]">
                    <div className="text-[11px] text-[#5A5C60] font-mono">
                      Includes: 1,420 Students • 4 Active Departments • Fall 2026 Term
                    </div>
                    <button
                      onClick={() => setReportModalType('progress')}
                      className="w-full py-2.5 bg-white hover:bg-[#FAF9F7] text-[#1A1C1E] border border-[#D5D3CB] text-xs font-semibold rounded-xs transition-colors flex items-center justify-center gap-2 shadow-2xs"
                      id="btn-reports-tab-download-progress"
                    >
                      <Download className="w-3.5 h-3.5 text-[#5A5C60]" />
                      <span>Download Progress Report</span>
                    </button>
                  </div>
                </div>

                {/* Report 2: Generate Placement Readiness Report */}
                <div className="bg-white border border-[#E2E2DE] hover:border-[#1A1C1E] p-6 rounded-xs shadow-2xs space-y-4 flex flex-col justify-between transition-colors">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xs bg-[#FAF9F7] border border-[#D5D3CB] flex items-center justify-center text-[#1A1C1E]">
                      <Award className="w-5 h-5 text-emerald-700" />
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8A8A85]">Corporate Recruiting</span>
                      <h3 className="text-base font-bold text-[#1A1C1E] mt-0.5">Placement Readiness Report</h3>
                    </div>
                    <p className="text-xs sm:text-sm text-[#5A5C60] leading-relaxed">
                      Curated talent showcase designed for corporate career fairs, employer advisory boards, and campus hiring partners with verified public portfolio links.
                    </p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-[#F2F1EE]">
                    <div className="text-[11px] text-[#5A5C60] font-mono">
                      Includes: Top Quartile Candidates • Verified Code Deliverables
                    </div>
                    <button
                      onClick={() => setReportModalType('placement')}
                      className="w-full py-2.5 bg-[#1A1C1E] hover:bg-black text-white text-xs font-semibold rounded-xs transition-colors flex items-center justify-center gap-2 shadow-2xs"
                      id="btn-reports-tab-generate-placement"
                    >
                      <Award className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Generate Placement Readiness Report</span>
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ======================================================================= */}
          {/* TAB 6: SETTINGS                                                         */}
          {/* ======================================================================= */}
          {activeTab === 'settings' && (
            <div className="space-y-6 animate-in fade-in duration-150" id="tab-content-settings">
              
              <div>
                <h2 className="text-xl font-extrabold text-[#1A1C1E]">Institutional Settings</h2>
                <p className="text-xs text-[#5A5C60]">Configure LMS synchronization, faculty permissions, and automated early warning thresholds.</p>
              </div>

              <div className="bg-white border border-[#E2E2DE] p-6 rounded-xs shadow-2xs space-y-6">
                
                {/* LMS Sync */}
                <div className="space-y-3 pb-6 border-b border-[#E2E2DE]">
                  <h3 className="text-sm font-bold text-[#1A1C1E] flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[#3E51FF]" />
                    <span>LMS & SSO Integrations</span>
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xs flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-emerald-950">Canvas LMS</div>
                        <div className="text-[10px] text-emerald-800">LTI 1.3 Active</div>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </div>

                    <div className="p-3 bg-[#FAF9F7] border border-[#E2E2DE] rounded-xs flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-[#1A1C1E]">Handshake SSO</div>
                        <div className="text-[10px] text-[#8A8A85]">OAuth Connected</div>
                      </div>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    </div>

                    <div className="p-3 bg-[#FAF9F7] border border-[#E2E2DE] rounded-xs flex items-center justify-between">
                      <div>
                        <div className="text-xs font-bold text-[#1A1C1E]">Blackboard Learn</div>
                        <div className="text-[10px] text-[#8A8A85]">Available</div>
                      </div>
                      <span className="text-[10px] font-mono text-[#8A8A85]">Optional</span>
                    </div>
                  </div>
                </div>

                {/* At-Risk Thresholds */}
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-[#1A1C1E] flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    <span>Early-Warning & At-Risk Alert Triggers</span>
                  </h3>
                  <div className="space-y-2 text-xs text-[#5A5C60]">
                    <div className="flex items-center justify-between p-2.5 bg-[#FAF9F7] border border-[#E2E2DE] rounded-xs">
                      <span>Flag student if inactive for:</span>
                      <strong className="text-[#1A1C1E]">7 consecutive days</strong>
                    </div>
                    <div className="flex items-center justify-between p-2.5 bg-[#FAF9F7] border border-[#E2E2DE] rounded-xs">
                      <span>Flag student if rubric score falls below:</span>
                      <strong className="text-[#1A1C1E]">70% (C grade threshold)</strong>
                    </div>
                    <div className="flex items-center justify-between p-2.5 bg-[#FAF9F7] border border-[#E2E2DE] rounded-xs">
                      <span>Milestone deliverable overdue buffer:</span>
                      <strong className="text-[#1A1C1E]">3 calendar days</strong>
                    </div>
                  </div>
                </div>

              </div>

            </div>
          )}

        </main>
      </div>

      {/* ========================================================================= */}
      {/* STUDENT DETAIL DRAWER / MODAL                                             */}
      {/* ========================================================================= */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-[#FDFCFB] border border-[#D5D3CB] rounded-md shadow-2xl max-w-xl w-full max-h-[90vh] flex flex-col overflow-hidden text-[#1A1C1E] animate-in fade-in zoom-in-95">
            
            {/* Header */}
            <div className="px-6 py-4 bg-[#FAF9F7] border-b border-[#E2E2DE] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#1A1C1E] text-white font-bold flex items-center justify-center text-sm">
                  {selectedStudent.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="font-bold text-base text-[#1A1C1E]">{selectedStudent.name}</h3>
                  <p className="text-xs text-[#5A5C60] font-mono">{selectedStudent.studentId} • {selectedStudent.email}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedStudent(null)}
                className="p-1 text-[#8A8A85] hover:text-[#1A1C1E] hover:bg-[#E2E2DE] rounded-xs transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-5 overflow-y-auto">
              
              <div className="grid grid-cols-2 gap-3 text-xs bg-[#FAF9F7] p-3 rounded-xs border border-[#E2E2DE]">
                <div>
                  <div className="text-[10px] text-[#8A8A85] font-mono">DEPARTMENT</div>
                  <div className="font-semibold text-[#1A1C1E]">{selectedStudent.department}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#8A8A85] font-mono">ACADEMIC YEAR</div>
                  <div className="font-semibold text-[#1A1C1E]">{selectedStudent.year}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#8A8A85] font-mono">CURRENT SIMULATION</div>
                  <div className="font-semibold text-[#1A1C1E]">{selectedStudent.currentInternship}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#8A8A85] font-mono">RUBRIC SCORE</div>
                  <div className="font-bold font-mono text-emerald-700">{selectedStudent.averageScore}%</div>
                </div>
              </div>

              {/* Deliverable Progress */}
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-[#8A8A85] font-mono">
                  Milestone Deliverables ({selectedStudent.completedDeliverables}/{selectedStudent.totalDeliverables} Completed)
                </div>
                <div className="w-full h-2 bg-[#E2E2DE] rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-[#1A1C1E] rounded-full"
                    style={{ width: `${selectedStudent.progressPercent}%` }}
                  ></div>
                </div>
              </div>

              {/* Skills Mastered */}
              <div className="space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-[#8A8A85] font-mono">
                  Verified Skills
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {selectedStudent.skillsMastered.map(sk => (
                    <span key={sk} className="px-2 py-0.5 bg-[#FAF9F7] text-[#1A1C1E] border border-[#D5D3CB] font-mono text-xs rounded-2xs font-medium">
                      {sk}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-[#E2E2DE] flex flex-wrap items-center gap-2">
                <button
                  onClick={() => {
                    handleTriggerNudge(selectedStudent);
                    setSelectedStudent(null);
                  }}
                  className="flex-1 py-2 px-3 bg-white hover:bg-[#FAF9F7] text-[#1A1C1E] border border-[#D5D3CB] text-xs font-semibold rounded-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Mail className="w-3.5 h-3.5 text-[#5A5C60]" />
                  <span>Send Advisory Nudge</span>
                </button>

                <button
                  onClick={() => {
                    handleScheduleAdvising(selectedStudent);
                    setSelectedStudent(null);
                  }}
                  className="flex-1 py-2 px-3 bg-[#1A1C1E] hover:bg-black text-white text-xs font-semibold rounded-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Schedule 1-on-1</span>
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

      {/* Report Modal */}
      {reportModalType && (
        <ReportModal
          type={reportModalType}
          isOpen={true}
          onClose={() => setReportModalType(null)}
        />
      )}

    </div>
  );
};
