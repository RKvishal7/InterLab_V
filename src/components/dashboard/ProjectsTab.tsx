import React, { useState } from 'react';
import { 
  FolderGit2, 
  ExternalLink, 
  FileCode2, 
  CheckCircle2, 
  Star, 
  Copy, 
  Award,
  Sparkles,
  GitPullRequest,
  Globe,
  Eye,
  Github,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PORTFOLIO_PROJECTS, STUDENT_PORTFOLIO_PROFILE, PortfolioProject } from '../../data/portfolioData';
import { ProjectMockupCanvas } from '../portfolio/ProjectMockupCanvas';
import { ProjectDetailModal } from '../portfolio/ProjectDetailModal';

export const ProjectsTab: React.FC = () => {
  const { navigate } = useApp();
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://internlab.com/u/${STUDENT_PORTFOLIO_PROFILE.username}`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200" id="projects-tab-view">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E2DE]">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#1A1C1E] tracking-tight">
            Portfolio Projects & Deliverables
          </h2>
          <p className="text-xs sm:text-sm text-[#5A5C60] mt-0.5">
            Every completed internship project automatically joins your verified public portfolio.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => navigate({ view: 'portfolio' })}
            className="px-3 py-1.5 bg-[#1A1C1E] hover:bg-black text-white rounded-xs text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
            id="btn-open-full-portfolio"
          >
            <Globe className="w-3.5 h-3.5 text-emerald-400" />
            <span>Open Public Portfolio (internlab.com/u/alex-morgan)</span>
          </button>

          <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xs text-xs font-mono font-bold">
            4 Verified Deliverables
          </span>
        </div>
      </div>

      {/* Public Share Banner */}
      <div className="bg-[#FAF9F7] border border-[#D5D3CB] rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xs bg-[#1A1C1E] text-white flex items-center justify-center font-mono text-xs font-bold shrink-0">
            /u
          </div>
          <div>
            <div className="text-xs font-bold text-[#1A1C1E] flex items-center gap-2">
              <span>Public Shareable Developer Link</span>
              <span className="text-[10px] text-emerald-800 bg-emerald-100 px-1.5 py-0.2 rounded-2xs font-mono font-bold">Live & Verified</span>
            </div>
            <div className="text-xs font-mono text-[#5A5C60] mt-0.5">
              internlab.com/u/{STUDENT_PORTFOLIO_PROFILE.username}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handleCopyLink}
            className="flex-1 sm:flex-none px-3 py-1.5 bg-white hover:bg-[#F2F1EE] border border-[#D5D3CB] text-xs font-semibold text-[#1A1C1E] rounded-xs transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedLink ? 'Copied Link!' : 'Copy Share Link'}</span>
          </button>

          <button
            onClick={() => navigate({ view: 'portfolio' })}
            className="flex-1 sm:flex-none px-3 py-1.5 bg-[#3E51FF] hover:bg-[#3242D6] text-white text-xs font-bold rounded-xs transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Live Portfolio</span>
          </button>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="space-y-6">
        {PORTFOLIO_PROJECTS.map((project) => (
          <div
            key={project.id}
            className="bg-white border border-[#E2E2DE] hover:border-[#1A1C1E] rounded-lg overflow-hidden shadow-xs transition-all flex flex-col lg:flex-row"
            id={`dashboard-project-card-${project.id}`}
          >
            {/* Visual Canvas Column */}
            <div className="lg:w-80 shrink-0 border-b lg:border-b-0 lg:border-r border-[#E2E2DE]">
              <ProjectMockupCanvas type={project.imagePlaceholder.type} name={project.name} />
            </div>

            {/* Content Column */}
            <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 text-[11px] font-bold rounded-xs uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200">
                      Verified Completed
                    </span>
                    <span className="text-xs font-bold text-[#1A1C1E]">
                      {project.company}
                    </span>
                    <span className="text-xs text-[#8A8A85] font-mono hidden sm:inline">
                      • {project.role}
                    </span>
                  </div>

                  <div className="flex items-center gap-1 font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-xs border border-emerald-200">
                    <Award className="w-3.5 h-3.5" />
                    <span>Score: {project.score}/100</span>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-[#1A1C1E]">
                  {project.name}
                </h3>

                <p className="text-xs sm:text-sm text-[#5A5C60] leading-relaxed">
                  {project.shortDescription}
                </p>

                {/* Skills Used */}
                <div className="space-y-1 pt-1">
                  <div className="text-[10px] font-mono uppercase text-[#8A8A85] font-semibold">Skills Used:</div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.skillsUsed.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[11px] px-2 py-0.5 bg-[#FAF9F7] border border-[#E2E2DE] text-[#1A1C1E] rounded-xs font-mono font-medium"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 border-t border-[#F2F1EE] flex flex-wrap items-center justify-between gap-3">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="px-3.5 py-1.5 bg-[#1A1C1E] hover:bg-black text-white rounded-xs text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View Full Case Study (Problem, Approach, Solution)</span>
                </button>

                <div className="flex items-center gap-2">
                  <a
                    href={project.links.githubRepo}
                    target="_blank"
                    rel="noreferrer"
                    className="px-2.5 py-1.5 bg-[#FAF9F7] hover:bg-[#F2F1EE] border border-[#D5D3CB] rounded-xs text-xs font-semibold text-[#1A1C1E] flex items-center gap-1.5 transition-colors"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>Repository</span>
                  </a>

                  <a
                    href={project.links.liveDemo}
                    target="_blank"
                    rel="noreferrer"
                    className="px-2.5 py-1.5 bg-[#EEF0FF] hover:bg-[#E0E4FF] border border-[#C5CAFF] rounded-xs text-xs font-semibold text-[#3E51FF] flex items-center gap-1.5 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectDetailModal 
          project={selectedProject} 
          onClose={() => setSelectedProject(null)} 
        />
      )}

    </div>
  );
};
