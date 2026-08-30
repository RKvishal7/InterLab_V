import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  Github, 
  Linkedin, 
  Mail, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  Copy, 
  Check, 
  Eye, 
  Sparkles, 
  Layers, 
  FileCode2, 
  ArrowUpRight, 
  Share2, 
  Printer, 
  Code2, 
  Globe, 
  Terminal, 
  Calendar, 
  Building2,
  SlidersHorizontal,
  Briefcase
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { 
  STUDENT_PORTFOLIO_PROFILE, 
  PORTFOLIO_PROJECTS, 
  VERIFIED_PORTFOLIO_SKILLS,
  PortfolioProject 
} from '../../data/portfolioData';
import { CERTIFICATE_REGISTRY } from '../../data/certificateRegistry';
import { ProjectMockupCanvas } from './ProjectMockupCanvas';
import { ProjectDetailModal } from './ProjectDetailModal';

export const StudentPortfolioPage: React.FC = () => {
  const { userProfile, navigate } = useApp();
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [copiedPublicUrl, setCopiedPublicUrl] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'React' | 'JavaScript' | 'TypeScript'>('all');
  const [isEmployerView, setIsEmployerView] = useState(false);

  const studentName = userProfile.fullName || STUDENT_PORTFOLIO_PROFILE.name;
  const publicUrl = `https://internlab.com/u/${STUDENT_PORTFOLIO_PROFILE.username}`;

  const handleCopyPublicUrl = () => {
    navigator.clipboard.writeText(publicUrl);
    setCopiedPublicUrl(true);
    setTimeout(() => setCopiedPublicUrl(false), 2500);
  };

  const filteredProjects = PORTFOLIO_PROJECTS.filter((proj) => {
    if (activeFilter === 'all') return true;
    return proj.skillsUsed.includes(activeFilter);
  });

  return (
    <div className="min-h-screen bg-[#F7F6F2] text-[#1A1C1E] pb-24" id="student-portfolio-page">
      
      {/* Public URL Bar & Portfolio Control Bar */}
      <div className="bg-[#1A1C1E] text-white border-b border-[#333] sticky top-16 z-30 shadow-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          
          {/* Simulated Browser URL Pill */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-[#2A2C30] border border-[#444] rounded-xs font-mono text-[11px] text-[#CCC]">
              <Globe className="w-3.5 h-3.5 text-emerald-400" />
              <span>internlab.com/u/<strong className="text-white">{STUDENT_PORTFOLIO_PROFILE.username}</strong></span>
            </div>

            <button
              onClick={handleCopyPublicUrl}
              className="px-2.5 py-1 bg-[#33353A] hover:bg-[#444] text-[#E0E0E0] hover:text-white rounded-xs font-mono font-semibold flex items-center gap-1.5 transition-colors"
              title="Copy shareable link"
              id="btn-copy-public-portfolio-url"
            >
              {copiedPublicUrl ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedPublicUrl ? 'Copied Public Link!' : 'Copy Link'}</span>
            </button>
          </div>

          {/* Actions & Employer Mode Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => setIsEmployerView(!isEmployerView)}
              className={`px-3 py-1 rounded-xs font-mono font-semibold transition-colors flex items-center gap-1.5 ${
                isEmployerView
                  ? 'bg-emerald-500 text-black'
                  : 'bg-[#2A2C30] hover:bg-[#383A40] text-[#CCC]'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>{isEmployerView ? 'Employer Mode (Active)' : 'Employer Preview'}</span>
            </button>

            <button
              onClick={() => window.print()}
              className="px-2.5 py-1 bg-[#2A2C30] hover:bg-[#383A40] text-[#CCC] hover:text-white rounded-xs font-mono flex items-center gap-1.5 transition-colors"
              title="Print to PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Export CV</span>
            </button>

            <button
              onClick={() => navigate({ view: 'verify-certificate' })}
              className="px-3 py-1 bg-[#3E51FF] hover:bg-[#3242D6] text-white rounded-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verify Credentials</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 space-y-12">
        
        {/* ========================================================================= */}
        {/* 1. PORTFOLIO PAGE HEADER (Strict User Specification)                     */}
        {/* ========================================================================= */}
        <header className="bg-white border border-[#E2E2DE] rounded-lg p-6 sm:p-8 shadow-xs relative overflow-hidden" id="portfolio-header">
          {/* Subtle Guilloche / Grid Pattern */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[radial-gradient(#E2E2DE_1px,transparent_1px)] [background-size:16px_16px] opacity-40 pointer-events-none -mr-16 -mt-16"></div>

          <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-8">
            <div className="space-y-4 max-w-2xl">
              
              {/* Verified Student Tag */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xs text-xs font-mono font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>{STUDENT_PORTFOLIO_PROFILE.verifiedBadge}</span>
                </span>
                <span className="text-xs font-mono text-[#8A8A85]">
                  • 4 Verified Deliverables • 3 Completed Simulations
                </span>
              </div>

              {/* Header Title: Alex's Portfolio */}
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A1C1E] tracking-tight">
                  Alex's Portfolio
                </h1>
                <div className="text-lg sm:text-xl font-semibold text-[#3E51FF] mt-1 font-mono">
                  {STUDENT_PORTFOLIO_PROFILE.role}
                </div>
              </div>

              {/* Bio: "Building practical digital experiences through real-world projects." */}
              <p className="text-base sm:text-lg text-[#3A3C40] leading-relaxed italic font-serif border-l-2 border-[#1A1C1E] pl-4 py-1">
                "{STUDENT_PORTFOLIO_PROFILE.bio}"
              </p>

              {/* Meta & Location */}
              <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-[#5A5C60] font-mono">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span><strong>Available For:</strong> {STUDENT_PORTFOLIO_PROFILE.availableFor}</span>
                </div>
                <div>
                  <strong>Location:</strong> {STUDENT_PORTFOLIO_PROFILE.location}
                </div>
              </div>
            </div>

            {/* Social / Direct Action Links */}
            <div className="flex flex-col sm:flex-row md:flex-col gap-2.5 shrink-0">
              <a
                href={STUDENT_PORTFOLIO_PROFILE.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-[#FAF9F7] hover:bg-[#F2F1EE] border border-[#D5D3CB] text-[#1A1C1E] text-xs font-semibold rounded-xs flex items-center justify-between gap-3 transition-colors shadow-2xs"
              >
                <div className="flex items-center gap-2">
                  <Github className="w-4 h-4" />
                  <span>GitHub Profile</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#8A8A85]" />
              </a>

              <a
                href={STUDENT_PORTFOLIO_PROFILE.linkedinUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-[#FAF9F7] hover:bg-[#F2F1EE] border border-[#D5D3CB] text-[#1A1C1E] text-xs font-semibold rounded-xs flex items-center justify-between gap-3 transition-colors shadow-2xs"
              >
                <div className="flex items-center gap-2">
                  <Linkedin className="w-4 h-4 text-[#0077B5]" />
                  <span>LinkedIn Profile</span>
                </div>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#8A8A85]" />
              </a>

              <a
                href={`mailto:${STUDENT_PORTFOLIO_PROFILE.email}`}
                className="px-4 py-2 bg-[#1A1C1E] hover:bg-black text-white text-xs font-semibold rounded-xs flex items-center justify-center gap-2 transition-colors shadow-2xs"
              >
                <Mail className="w-4 h-4" />
                <span>Contact Alex</span>
              </a>
            </div>
          </div>

          {/* Employer Quick Metrics Bar */}
          {isEmployerView && (
            <div className="mt-6 pt-6 border-t border-[#E2E2DE] grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#FAF9F7] p-4 rounded-xs border border-[#D5D3CB]">
              <div>
                <div className="text-[10px] font-mono uppercase text-[#8A8A85]">Simulation Average</div>
                <div className="text-xl font-bold font-mono text-[#1A1C1E]">89.5% (Proficient)</div>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase text-[#8A8A85]">Total Code Deliverables</div>
                <div className="text-xl font-bold font-mono text-emerald-700">4 Reviewed PRs</div>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase text-[#8A8A85]">Audit Hours Logged</div>
                <div className="text-xl font-bold font-mono text-[#1A1C1E]">110.5 Hours</div>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase text-[#8A8A85]">Work Verification</div>
                <div className="text-xl font-bold font-mono text-[#3E51FF]">100% Cryptographic</div>
              </div>
            </div>
          )}
        </header>

        {/* ========================================================================= */}
        {/* 2. PROJECT SHOWCASE (Strict User Specification)                          */}
        {/* ========================================================================= */}
        <section className="space-y-6" id="project-showcase-section">
          
          {/* Section Header with Skill Filters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E2DE]">
            <div>
              <div className="flex items-center gap-2">
                <Code2 className="w-5 h-5 text-[#1A1C1E]" />
                <h2 className="text-2xl font-bold text-[#1A1C1E] tracking-tight">
                  Project Showcase
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#5A5C60] mt-0.5">
                Engineered simulation deliverables with automated rubric scoring, verified code repositories, and in-depth case studies.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-xs font-mono text-[#8A8A85] mr-1">Filter:</span>
              {(['all', 'React', 'JavaScript', 'TypeScript'] as const).map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3 py-1 text-xs font-mono rounded-xs transition-colors ${
                    activeFilter === filter
                      ? 'bg-[#1A1C1E] text-white font-bold'
                      : 'bg-white text-[#5A5C60] hover:bg-[#FAF9F7] border border-[#D5D3CB]'
                  }`}
                >
                  {filter === 'all' ? 'All (4)' : filter}
                </button>
              ))}
            </div>
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-white border border-[#E2E2DE] hover:border-[#1A1C1E] rounded-lg overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
                id={`portfolio-project-card-${project.id}`}
              >
                {/* 1. Project Visual Mockup */}
                <div 
                  className="cursor-pointer" 
                  onClick={() => setSelectedProject(project)}
                >
                  <ProjectMockupCanvas 
                    type={project.imagePlaceholder.type} 
                    name={project.name} 
                  />
                </div>

                {/* 2. Project Card Content */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-3">
                    
                    {/* Header info: Internship & Score */}
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-xs font-mono text-[#5A5C60] truncate">
                        <strong>Internship:</strong> {project.company}
                      </div>

                      {/* Project Score (e.g. 84/100) */}
                      <div className="flex items-center gap-1 font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-xs border border-emerald-200 shrink-0">
                        <Award className="w-3.5 h-3.5" />
                        <span>Score: {project.score}/100</span>
                      </div>
                    </div>

                    {/* Project Name */}
                    <h3 
                      onClick={() => setSelectedProject(project)}
                      className="text-lg font-bold text-[#1A1C1E] group-hover:text-[#3E51FF] cursor-pointer transition-colors leading-snug"
                    >
                      {project.name}
                    </h3>

                    {/* Short description */}
                    <p className="text-xs sm:text-sm text-[#5A5C60] leading-relaxed line-clamp-2">
                      {project.shortDescription}
                    </p>

                    {/* Skills Used Badges (React, JavaScript, CSS, etc.) */}
                    <div className="space-y-1.5 pt-1">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-[#8A8A85] font-semibold">
                        Skills Used:
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {project.skillsUsed.map((skill, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 bg-[#FAF9F7] border border-[#E2E2DE] text-[#1A1C1E] text-[11px] font-medium font-mono rounded-xs"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions: View Case Study, GitHub, Live Demo */}
                  <div className="pt-4 border-t border-[#F2F1EE] flex items-center justify-between gap-2">
                    <button
                      onClick={() => setSelectedProject(project)}
                      className="px-3 py-1.5 bg-[#1A1C1E] hover:bg-black text-white rounded-xs text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Case Study</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <a
                        href={project.links.githubRepo}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 bg-[#FAF9F7] hover:bg-[#F2F1EE] border border-[#D5D3CB] rounded-xs text-[#1A1C1E] transition-colors"
                        title="GitHub Repository"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                      <a
                        href={project.links.liveDemo}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 bg-[#EEF0FF] hover:bg-[#E0E4FF] border border-[#C5CAFF] rounded-xs text-[#3E51FF] transition-colors"
                        title="Live Demo"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>

                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. VERIFIED SKILLS SECTION (Strict User Specification)                   */}
        {/* ========================================================================= */}
        <section className="bg-white border border-[#E2E2DE] rounded-lg p-6 sm:p-8 shadow-xs space-y-6" id="skills-section">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E2DE]">
            <div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-600" />
                <h2 className="text-xl font-bold text-[#1A1C1E] tracking-tight">
                  Verified Skills
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#5A5C60] mt-0.5">
                Skill competencies evaluated and calculated automatically based on completed simulation deliverables.
              </p>
            </div>

            <div className="flex items-center gap-2 font-mono text-xs text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-xs border border-emerald-200 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Calibrated via 4 Simulations</span>
            </div>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {VERIFIED_PORTFOLIO_SKILLS.map((skill) => (
              <div
                key={skill.name}
                className="p-4 rounded-md border border-[#E2E2DE] bg-[#FAF9F7] space-y-2 hover:border-[#1A1C1E] transition-colors"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-[#1A1C1E]">{skill.name}</span>
                  <span className={`px-2 py-0.5 rounded-2xs text-[10px] font-mono font-bold ${
                    skill.status === 'Advanced'
                      ? 'bg-purple-100 text-purple-900 border border-purple-200'
                      : 'bg-emerald-100 text-emerald-900 border border-emerald-200'
                  }`}>
                    {skill.score}% • {skill.badge}
                  </span>
                </div>

                {/* Progress Meter */}
                <div className="w-full bg-[#E2E2DE] h-1.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${
                      skill.score >= 80 ? 'bg-purple-600' : 'bg-emerald-600'
                    }`} 
                    style={{ width: `${skill.score}%` }}
                  ></div>
                </div>

                <p className="text-[11px] text-[#5A5C60] leading-snug">
                  {skill.evidence}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 4. COMPLETED CERTIFICATES (Strict User Specification)                    */}
        {/* ========================================================================= */}
        <section className="space-y-6" id="certificates-section">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E2DE]">
            <div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-[#1A1C1E]" />
                <h2 className="text-xl font-bold text-[#1A1C1E] tracking-tight">
                  Completed Internship Certificates
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#5A5C60] mt-0.5">
                Official certificates issued upon meeting all simulation milestone criteria and rubric evaluations.
              </p>
            </div>

            <button
              onClick={() => navigate({ view: 'verify-certificate' })}
              className="px-3 py-1.5 bg-white hover:bg-[#FAF9F7] text-[#1A1C1E] border border-[#D5D3CB] rounded-xs text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Public Verification Directory</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.values(CERTIFICATE_REGISTRY).map((cert) => (
              <div
                key={cert.certificateId}
                className="bg-white border border-[#E2E2DE] hover:border-[#1A1C1E] rounded-lg p-5 shadow-xs flex flex-col justify-between space-y-4 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-2xs text-[10px] font-mono font-bold">
                      Verified Credential
                    </span>
                    <span className="text-[11px] font-mono text-[#8A8A85]">
                      {cert.completionDate}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-bold text-sm text-[#1A1C1E] leading-snug">
                      {cert.internshipTitle}
                    </h3>
                    <div className="text-xs text-[#5A5C60] mt-0.5">
                      {cert.company} • {cert.durationWeeks} Weeks
                    </div>
                  </div>

                  <div className="bg-[#FAF9F7] p-2.5 rounded-xs border border-[#E2E2DE] text-[11px] font-mono text-[#5A5C60] space-y-1">
                    <div>ID: <strong className="text-[#1A1C1E]">{cert.certificateId}</strong></div>
                    <div>Score: <strong className="text-emerald-700">{cert.finalScore}%</strong> ({cert.scoreGrade})</div>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#F2F1EE] flex flex-col gap-2">
                  <button
                    onClick={() => navigate({ view: 'completion-celebration', internshipId: cert.certificateId })}
                    className="w-full py-1.5 bg-[#1A1C1E] hover:bg-black text-white text-xs font-semibold rounded-xs transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>View Certificate Canvas</span>
                  </button>

                  <button
                    onClick={() => navigate({ view: 'verify-certificate', certificateId: cert.certificateId })}
                    className="w-full py-1.5 bg-white hover:bg-[#F2F1EE] border border-[#D5D3CB] text-xs font-semibold text-[#1A1C1E] rounded-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Verify Legitimacy</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <ProjectDetailModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}

    </div>
  );
};
