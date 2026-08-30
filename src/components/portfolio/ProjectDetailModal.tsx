import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  Github, 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  Lightbulb, 
  Target, 
  Layers, 
  ShieldCheck, 
  Copy, 
  Check, 
  Sparkles,
  Terminal,
  Play,
  Monitor
} from 'lucide-react';
import { PortfolioProject } from '../../data/portfolioData';
import { ProjectMockupCanvas } from './ProjectMockupCanvas';

interface ProjectDetailModalProps {
  project: PortfolioProject;
  onClose: () => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({ project, onClose }) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [activeInteractiveTab, setActiveInteractiveTab] = useState<'case-study' | 'interactive-preview'>('case-study');

  // Interactive state for preview simulation
  const [selectedColor, setSelectedColor] = useState('Cosmic Black');
  const [quantity, setQuantity] = useState(1);
  const [inBag, setInBag] = useState(false);
  const [tableSearch, setTableSearch] = useState('');
  const [sortField, setSortField] = useState<'sku' | 'qty' | 'name'>('sku');

  const handleCopyLink = () => {
    navigator.clipboard.writeText(project.links.githubRepo);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white border border-[#1A1C1E] rounded-lg w-full max-w-4xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden relative text-[#1A1C1E]"
        onClick={(e) => e.stopPropagation()}
        id={`project-detail-modal-${project.id}`}
      >
        {/* Modal Topbar */}
        <div className="bg-[#1A1C1E] text-white px-6 py-4 flex items-center justify-between shrink-0 border-b border-[#333]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xs bg-[#2A2C30] border border-[#444] flex items-center justify-center text-white font-mono text-xs font-bold">
              IL
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#A0A2A8]">
                  Verified Simulation Project
                </span>
                <span className="text-[10px] bg-emerald-950 text-emerald-300 border border-emerald-800/80 px-1.5 py-0.2 rounded-2xs font-mono font-bold">
                  Score: {project.score}/100 ({project.scoreGrade})
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-bold text-white tracking-tight">
                {project.name}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="p-1.5 text-[#A0A2A8] hover:text-white hover:bg-[#2A2C30] rounded-xs transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Subheader bar with tab navigation */}
        <div className="bg-[#FAF9F7] px-6 py-2.5 border-b border-[#E2E2DE] flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveInteractiveTab('case-study')}
              className={`px-3 py-1.5 rounded-xs font-semibold flex items-center gap-1.5 transition-colors ${
                activeInteractiveTab === 'case-study'
                  ? 'bg-[#1A1C1E] text-white'
                  : 'bg-white text-[#5A5C60] hover:bg-[#F2F1EE] border border-[#D5D3CB]'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Full Case Study</span>
            </button>

            <button
              onClick={() => setActiveInteractiveTab('interactive-preview')}
              className={`px-3 py-1.5 rounded-xs font-semibold flex items-center gap-1.5 transition-colors ${
                activeInteractiveTab === 'interactive-preview'
                  ? 'bg-[#1A1C1E] text-white'
                  : 'bg-white text-[#5A5C60] hover:bg-[#F2F1EE] border border-[#D5D3CB]'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Interactive In-Browser Demo</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={project.links.githubRepo}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 bg-white hover:bg-[#F2F1EE] border border-[#D5D3CB] rounded-xs font-semibold text-[#1A1C1E] flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <Github className="w-3.5 h-3.5" />
              <span>GitHub Repository</span>
              <ExternalLink className="w-3 h-3 text-[#8A8A85]" />
            </a>

            <a
              href={project.links.liveDemo}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-1.5 bg-[#3E51FF] hover:bg-[#3242D6] text-white rounded-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Live Demo</span>
              <ExternalLink className="w-3 h-3 text-blue-200" />
            </a>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 bg-white">
          
          {activeInteractiveTab === 'case-study' ? (
            <>
              {/* Visual Banner Preview */}
              <div className="border border-[#E2E2DE] rounded-lg overflow-hidden shadow-xs">
                <ProjectMockupCanvas type={project.imagePlaceholder.type} name={project.name} />
                <div className="p-4 bg-[#FAF9F7] flex flex-wrap items-center justify-between gap-3 text-xs border-t border-[#E2E2DE]">
                  <div className="flex items-center gap-4 text-[#5A5C60]">
                    <span><strong>Internship:</strong> {project.internship}</span>
                    <span><strong>Company:</strong> {project.company}</span>
                    <span><strong>Completed:</strong> {project.completionDate}</span>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-xs border border-emerald-200 font-bold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>InternLab Verified Deliverable</span>
                  </div>
                </div>
              </div>

              {/* Skills Used Badges */}
              <div className="space-y-2">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#5A5C60]">
                  Skills Used
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.skillsUsed.map((skill, i) => (
                    <span 
                      key={i}
                      className="px-2.5 py-1 bg-[#FAF9F7] border border-[#D5D3CB] text-[#1A1C1E] text-xs font-semibold rounded-xs font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Structured 5-Part Case Study Breakdown (User explicitly requested Problem, Approach, Solution, Challenges, Key Learnings) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* 1. Problem */}
                <div className="bg-[#FAF9F7] border border-[#E2E2DE] rounded-lg p-5 space-y-2">
                  <div className="flex items-center gap-2 text-red-700">
                    <AlertCircle className="w-4 h-4" />
                    <h3 className="font-mono text-xs uppercase tracking-wider font-bold">
                      1. Problem
                    </h3>
                  </div>
                  <p className="text-sm text-[#1A1C1E] leading-relaxed">
                    {project.details.problem}
                  </p>
                </div>

                {/* 2. Approach */}
                <div className="bg-[#FAF9F7] border border-[#E2E2DE] rounded-lg p-5 space-y-2">
                  <div className="flex items-center gap-2 text-blue-700">
                    <Target className="w-4 h-4" />
                    <h3 className="font-mono text-xs uppercase tracking-wider font-bold">
                      2. Approach
                    </h3>
                  </div>
                  <p className="text-sm text-[#1A1C1E] leading-relaxed">
                    {project.details.approach}
                  </p>
                </div>

                {/* 3. Solution */}
                <div className="bg-[#FAF9F7] border border-[#E2E2DE] rounded-lg p-5 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-700">
                    <CheckCircle2 className="w-4 h-4" />
                    <h3 className="font-mono text-xs uppercase tracking-wider font-bold">
                      3. Solution
                    </h3>
                  </div>
                  <p className="text-sm text-[#1A1C1E] leading-relaxed">
                    {project.details.solution}
                  </p>
                </div>

                {/* 4. Challenges */}
                <div className="bg-[#FAF9F7] border border-[#E2E2DE] rounded-lg p-5 space-y-2">
                  <div className="flex items-center gap-2 text-amber-700">
                    <Layers className="w-4 h-4" />
                    <h3 className="font-mono text-xs uppercase tracking-wider font-bold">
                      4. Challenges
                    </h3>
                  </div>
                  <p className="text-sm text-[#1A1C1E] leading-relaxed">
                    {project.details.challenges}
                  </p>
                </div>
              </div>

              {/* 5. Key Learnings (Full Width) */}
              <div className="bg-purple-50/60 border border-purple-200 rounded-lg p-5 space-y-2">
                <div className="flex items-center gap-2 text-purple-900">
                  <Lightbulb className="w-4 h-4" />
                  <h3 className="font-mono text-xs uppercase tracking-wider font-bold">
                    5. Key Learnings
                  </h3>
                </div>
                <p className="text-sm text-purple-950 font-medium leading-relaxed">
                  {project.details.keyLearnings}
                </p>
              </div>

              {/* Rubric Score Breakdown Matrix */}
              <div className="border border-[#E2E2DE] rounded-lg p-5 bg-[#FDFCFB] space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-[#1A1C1E]" />
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1A1C1E]">
                      Official Simulation Evaluation Rubric
                    </h4>
                  </div>
                  <span className="font-mono text-xs font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-xs border border-emerald-200">
                    Overall: {project.score}/100 ({project.scoreGrade})
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-white p-3 rounded-xs border border-[#E2E2DE] space-y-1">
                    <div className="text-[11px] font-mono text-[#5A5C60]">Problem Solving</div>
                    <div className="text-lg font-bold font-mono text-[#1A1C1E]">{project.rubricBreakdown.problemSolving}/100</div>
                    <div className="w-full bg-[#E2E2DE] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-emerald-600 h-full" style={{ width: `${project.rubricBreakdown.problemSolving}%` }}></div>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-xs border border-[#E2E2DE] space-y-1">
                    <div className="text-[11px] font-mono text-[#5A5C60]">Code Structure</div>
                    <div className="text-lg font-bold font-mono text-[#1A1C1E]">{project.rubricBreakdown.codeStructure}/100</div>
                    <div className="w-full bg-[#E2E2DE] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-blue-600 h-full" style={{ width: `${project.rubricBreakdown.codeStructure}%` }}></div>
                    </div>
                  </div>

                  <div className="bg-white p-3 rounded-xs border border-[#E2E2DE] space-y-1">
                    <div className="text-[11px] font-mono text-[#5A5C60]">UI/UX & Accessibility</div>
                    <div className="text-lg font-bold font-mono text-[#1A1C1E]">{project.rubricBreakdown.uiUx}/100</div>
                    <div className="w-full bg-[#E2E2DE] h-1.5 rounded-full overflow-hidden">
                      <div className="bg-purple-600 h-full" style={{ width: `${project.rubricBreakdown.uiUx}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Interactive In-Browser Sandbox Playground */
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="p-4 bg-[#FAF9F7] border border-[#D5D3CB] rounded-lg flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-[#1A1C1E]">
                    Interactive Sandbox Component
                  </h4>
                  <p className="text-xs text-[#5A5C60]">
                    Direct execution test for {project.name}. Test interactive state flows in real-time.
                  </p>
                </div>
                <span className="text-xs font-mono text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-xs border border-emerald-200 font-bold">
                  Live Runtime Active
                </span>
              </div>

              {/* Simulation Sandbox UI based on project type */}
              {project.imagePlaceholder.type === 'ecommerce' ? (
                <div className="bg-white border-2 border-[#1A1C1E] rounded-lg p-6 max-w-xl mx-auto shadow-md space-y-6">
                  <div className="flex items-center justify-between border-b border-[#E2E2DE] pb-4">
                    <div>
                      <h3 className="text-lg font-bold text-[#1A1C1E]">Aurora Studio Wireless Headset</h3>
                      <p className="text-xs text-[#5A5C60]">SKU: NOVA-AU-9021 • High-Res Audio</p>
                    </div>
                    <div className="text-xl font-bold font-mono text-[#1A1C1E]">$249.00</div>
                  </div>

                  {/* Swatch Switcher */}
                  <div className="space-y-2">
                    <label className="text-xs font-mono text-[#5A5C60] uppercase">Select Finish: <span className="font-bold text-[#1A1C1E]">{selectedColor}</span></label>
                    <div className="flex gap-2">
                      {['Cosmic Black', 'Arctic Silver', 'Emerald Moss'].map((color) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-xs border transition-colors ${
                            selectedColor === color
                              ? 'border-[#1A1C1E] bg-[#1A1C1E] text-white'
                              : 'border-[#D5D3CB] bg-white text-[#1A1C1E] hover:bg-[#FAF9F7]'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Quantity and CTA */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-[#D5D3CB] rounded-xs bg-[#FAF9F7]">
                      <button 
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-3 py-1 text-sm font-bold hover:bg-[#E2E2DE]"
                      >-</button>
                      <span className="px-3 py-1 text-xs font-mono font-bold">{quantity}</span>
                      <button 
                        onClick={() => setQuantity(Math.min(5, quantity + 1))}
                        className="px-3 py-1 text-sm font-bold hover:bg-[#E2E2DE]"
                      >+</button>
                    </div>

                    <button
                      onClick={() => {
                        setInBag(true);
                        setTimeout(() => setInBag(false), 3000);
                      }}
                      className="flex-1 py-2.5 bg-[#3E51FF] hover:bg-[#3242D6] text-white font-bold text-xs rounded-xs flex items-center justify-center gap-2 transition-colors shadow-2xs"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>{inBag ? 'Added to Bag (Success!)' : `Add ${quantity} to Bag • $${249 * quantity}.00`}</span>
                    </button>
                  </div>

                  {inBag && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-xs font-mono animate-in slide-in-from-top-1">
                      ✓ Optimistic UI state dispatched. Sticky checkout badge updated to {quantity} items.
                    </div>
                  )}
                </div>
              ) : (
                /* Data table / generic sandbox preview */
                <div className="bg-white border-2 border-[#1A1C1E] rounded-lg p-5 max-w-2xl mx-auto shadow-md space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <input
                      type="text"
                      placeholder="Search inventory items..."
                      value={tableSearch}
                      onChange={(e) => setTableSearch(e.target.value)}
                      className="flex-1 px-3 py-1.5 border border-[#D5D3CB] rounded-xs text-xs font-mono focus:outline-none focus:border-[#1A1C1E]"
                    />
                    <div className="text-xs font-mono text-[#5A5C60]">
                      Filter Latency: <strong className="text-emerald-700">~2.4ms</strong>
                    </div>
                  </div>

                  <table className="w-full text-xs text-left border border-[#E2E2DE] rounded-xs overflow-hidden">
                    <thead className="bg-[#FAF9F7] text-[#5A5C60] font-mono border-b border-[#E2E2DE]">
                      <tr>
                        <th className="p-2">SKU</th>
                        <th className="p-2">Product Name</th>
                        <th className="p-2">Stock Level</th>
                        <th className="p-2">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E2E2DE] font-mono">
                      {[
                        { sku: 'NOVA-001', name: 'Aurora Studio Headset', qty: 142, status: 'In Stock' },
                        { sku: 'NOVA-002', name: 'Apex Mechanical Keyboard', qty: 18, status: 'Low Stock' },
                        { sku: 'NOVA-003', name: 'HyperFlow USB-C Hub', qty: 89, status: 'In Stock' },
                      ]
                        .filter(item => item.name.toLowerCase().includes(tableSearch.toLowerCase()) || item.sku.toLowerCase().includes(tableSearch.toLowerCase()))
                        .map((row) => (
                          <tr key={row.sku} className="hover:bg-[#FAF9F7]">
                            <td className="p-2 font-bold">{row.sku}</td>
                            <td className="p-2">{row.name}</td>
                            <td className="p-2">{row.qty} units</td>
                            <td className="p-2">
                              <span className={`px-1.5 py-0.5 rounded-2xs text-[10px] font-bold ${
                                row.status === 'In Stock' ? 'bg-emerald-100 text-emerald-900' : 'bg-amber-100 text-amber-900'
                              }`}>
                                {row.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="bg-[#FAF9F7] px-6 py-4 border-t border-[#E2E2DE] flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="px-3 py-2 bg-white hover:bg-[#F2F1EE] border border-[#D5D3CB] rounded-xs text-xs font-semibold text-[#1A1C1E] flex items-center gap-1.5 transition-colors shadow-2xs"
            >
              {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedLink ? 'Link Copied!' : 'Copy Repo Link'}</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#1A1C1E] hover:bg-black text-white rounded-xs text-xs font-semibold transition-colors shadow-2xs"
            >
              Close Breakdown
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
