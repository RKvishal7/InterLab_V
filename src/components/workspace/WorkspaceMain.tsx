import React, { useState } from 'react';
import { 
  Briefcase, 
  CheckCircle2, 
  Circle, 
  Copy, 
  ExternalLink, 
  Eye, 
  FileCode, 
  FileText, 
  FolderGit2, 
  Github, 
  Globe, 
  Layers, 
  Link, 
  MessageSquare, 
  Package, 
  Palette, 
  Share2, 
  Sparkles, 
  Upload, 
  Users,
  Check,
  Code2,
  Terminal,
  Bookmark,
  ShieldCheck,
  FileCheck,
  Laptop
} from 'lucide-react';
import { TaskRequirement, WorkspaceDeliverableState, WorkspaceViewTab, ResourceItem } from './types';
import { ProductPageLivePreview } from './ProductPageLivePreview';

interface WorkspaceMainProps {
  currentTab: WorkspaceViewTab;
  onTabChange: (tab: WorkspaceViewTab) => void;
  requirements: TaskRequirement[];
  onToggleRequirement: (id: string) => void;
  deliverables: WorkspaceDeliverableState;
  onUpdateDeliverables: (updates: Partial<WorkspaceDeliverableState>) => void;
  onOpenSubmissionModal: () => void;
  onOpenHintModal: () => void;
}

const RESOURCES_DATA: ResourceItem[] = [
  {
    id: 'res-1',
    title: 'Nova Labs Design System Tokens & Figma Spec',
    category: 'Design files',
    format: 'Figma (.fig)',
    description: 'Master component library including 40+ atomic components, color swatches, typography scale, and 8px grid tokens.',
    sizeOrLink: 'Figma Community File (v2.4)',
    iconName: 'Palette',
  },
  {
    id: 'res-2',
    title: 'Mobile & Desktop Responsive Breakpoint Specs',
    category: 'Design files',
    format: 'PDF Guide',
    description: 'Wireframes and spacing specs for 375px (Mobile), 768px (Tablet), and 1280px (Desktop) viewports.',
    sizeOrLink: '4.2 MB • Download Spec',
    iconName: 'Layers',
  },
  {
    id: 'res-3',
    title: 'Product Catalog API Specification (OpenAPI)',
    category: 'Documentation',
    format: 'JSON Schema',
    description: 'Contract defining product entity, gallery images array, variant SKU matrix, inventory quantities, and pricing.',
    sizeOrLink: 'GET /api/v1/products/{id}',
    iconName: 'FileCode',
  },
  {
    id: 'res-4',
    title: 'Cart State & Storage Persistence Technical Brief',
    category: 'Documentation',
    format: 'Markdown',
    description: 'Architectural instructions for syncing client-side cart items with local storage and dispatching optimistic UI events.',
    sizeOrLink: 'Internal RFC #118',
    iconName: 'FileText',
  },
  {
    id: 'res-5',
    title: 'WCAG 2.1 AA Accessibility & Touch Target Checklist',
    category: 'Reference materials',
    format: 'A11y Standard',
    description: 'Standards for minimum 44x44px touch targets, keyboard tab order, ARIA attributes for image galleries, and color contrast.',
    sizeOrLink: 'W3C Standard Compliance',
    iconName: 'ShieldCheck',
  },
  {
    id: 'res-6',
    title: 'Production Performance & Image Optimization Guide',
    category: 'Reference materials',
    format: 'Engineering Best Practice',
    description: 'Guidance on responsive srcset, aspect-ratio CSS to eliminate Cumulative Layout Shift (CLS), and Lighthouse 90+ targets.',
    sizeOrLink: 'Nova Labs Eng Handbook',
    iconName: 'Laptop',
  },
];

export const WorkspaceMain: React.FC<WorkspaceMainProps> = ({
  currentTab,
  onTabChange,
  requirements,
  onToggleRequirement,
  deliverables,
  onUpdateDeliverables,
  onOpenSubmissionModal,
  onOpenHintModal,
}) => {
  const [copiedToken, setCopiedToken] = useState<string | null>(null);
  const [resourceFilter, setResourceFilter] = useState<'All' | 'Design files' | 'Documentation' | 'Reference materials'>('All');

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedToken(id);
    setTimeout(() => setCopiedToken(null), 2000);
  };

  const filteredResources = resourceFilter === 'All' 
    ? RESOURCES_DATA 
    : RESOURCES_DATA.filter(r => r.category === resourceFilter);

  return (
    <div className="w-full h-full flex flex-col bg-[#FAF9F7] text-[#1A1C1E] overflow-y-auto">
      {/* 1. Top Task Header & Breadcrumbs */}
      <div className="p-4 sm:p-6 border-b border-[#E5E3DC] bg-white">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2 text-xs font-mono text-[#5A5C60]">
            <span className="font-bold text-[#1A1C1E]">Nova Labs</span>
            <span>/</span>
            <span>Sprint 3</span>
            <span>/</span>
            <span className="text-[#3E51FF] font-bold">TASK-301</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-xs font-mono font-bold bg-[#EEF0FF] text-[#3E51FF] border border-[#C5CAFF] rounded-xs">
              Frontend Track
            </span>
            <span className="px-2 py-0.5 text-xs font-mono text-[#5A5C60] bg-[#F5F4F0] border border-[#E5E3DC] rounded-xs">
              Sprint Week 3
            </span>
          </div>
        </div>

        <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#1A1C1E] tracking-tight">
          Build a Responsive E-commerce Product Page
        </h1>

        {/* View Tabs Bar */}
        <div className="mt-5 flex items-center gap-1 border-b border-[#E5E3DC] overflow-x-auto no-scrollbar">
          <button
            onClick={() => onTabChange('brief')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              currentTab === 'brief'
                ? 'border-[#1A1C1E] text-[#1A1C1E]'
                : 'border-transparent text-[#5A5C60] hover:text-[#1A1C1E]'
            }`}
            id="tab-task-brief"
          >
            <FileText className="w-4 h-4" />
            <span>Task Brief & Requirements</span>
          </button>

          <button
            onClick={() => onTabChange('preview')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              currentTab === 'preview'
                ? 'border-[#1A1C1E] text-[#1A1C1E]'
                : 'border-transparent text-[#5A5C60] hover:text-[#1A1C1E]'
            }`}
            id="tab-live-preview"
          >
            <Eye className="w-4 h-4" />
            <span>Interactive Live Preview</span>
            <span className="px-1.5 py-0.2 text-[10px] font-mono bg-emerald-100 text-emerald-800 rounded-xs">
              Live
            </span>
          </button>

          <button
            onClick={() => onTabChange('submission')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              currentTab === 'submission'
                ? 'border-[#1A1C1E] text-[#1A1C1E]'
                : 'border-transparent text-[#5A5C60] hover:text-[#1A1C1E]'
            }`}
            id="tab-deliverables"
          >
            <FolderGit2 className="w-4 h-4" />
            <span>Deliverables & Submission</span>
          </button>

          <button
            onClick={() => onTabChange('resources')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              currentTab === 'resources'
                ? 'border-[#1A1C1E] text-[#1A1C1E]'
                : 'border-transparent text-[#5A5C60] hover:text-[#1A1C1E]'
            }`}
            id="tab-resources"
          >
            <Package className="w-4 h-4" />
            <span>Resources ({RESOURCES_DATA.length})</span>
          </button>

          <button
            onClick={() => onTabChange('discussion')}
            className={`pb-3 px-3 text-xs sm:text-sm font-bold border-b-2 whitespace-nowrap transition-colors flex items-center gap-1.5 ${
              currentTab === 'discussion'
                ? 'border-[#1A1C1E] text-[#1A1C1E]'
                : 'border-transparent text-[#5A5C60] hover:text-[#1A1C1E]'
            }`}
            id="tab-team-discussion"
          >
            <MessageSquare className="w-4 h-4" />
            <span>PR Review & Team Thread</span>
          </button>
        </div>
      </div>

      {/* 2. TAB CONTENT AREA */}
      <div className="p-4 sm:p-6 space-y-6 flex-1">
        
        {/* ========================================================================= */}
        {/* TAB 1: TASK BRIEF & REQUIREMENTS */}
        {/* ========================================================================= */}
        {currentTab === 'brief' && (
          <div className="space-y-6 max-w-4xl">
            
            {/* WORKPLACE SCENARIO CARD */}
            <div className="bg-white border border-[#D5D3CB] rounded-sm p-5 sm:p-6 shadow-2xs space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 text-[11px] font-mono font-bold uppercase tracking-wider bg-[#1A1C1E] text-white rounded-xs">
                  Workplace Scenario
                </span>
                <span className="text-xs text-[#8A8A85] font-mono">
                  Nova Labs Engineering Team
                </span>
              </div>

              <blockquote className="border-l-3 border-[#3E51FF] pl-4 py-1 text-sm sm:text-base text-[#1A1C1E] font-medium italic leading-relaxed">
                "You are a Junior Frontend Developer at Nova Labs. The product team is preparing to launch a new e-commerce experience. Your task is to develop a responsive product page based on the provided requirements."
              </blockquote>
            </div>

            {/* TASK OBJECTIVE */}
            <div className="bg-[#FAF9F7] border border-[#D5D3CB] rounded-sm p-5 sm:p-6 space-y-2">
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#5A5C60]">
                Task Objective
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-[#1A1C1E]">
                Build a production-quality product page.
              </h2>
              <p className="text-xs sm:text-sm text-[#5A5C60] leading-relaxed">
                Your implementation must cleanly showcase the product hardware, handle client-side interaction state (image thumbnail swapping, color swatches, dynamic quantity counters), and ensure an effortless purchasing flow on mobile, tablet, and ultra-wide desktop monitors.
              </p>
            </div>

            {/* REQUIREMENTS CHECKLIST */}
            <div className="bg-white border border-[#D5D3CB] rounded-sm p-5 sm:p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#E5E3DC] pb-3">
                <div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#5A5C60]">
                    Engineering Specifications
                  </div>
                  <h3 className="text-base font-bold text-[#1A1C1E]">
                    Requirements & Acceptance Criteria
                  </h3>
                </div>
                <span className="text-xs font-mono font-bold text-[#3E51FF] bg-[#EEF0FF] px-2.5 py-1 rounded-xs">
                  {requirements.filter(r => r.completed).length} / {requirements.length} Completed
                </span>
              </div>

              <div className="space-y-3">
                {requirements.map((req) => (
                  <div 
                    key={req.id}
                    onClick={() => onToggleRequirement(req.id)}
                    className={`p-3.5 border rounded-xs transition-all cursor-pointer select-none flex items-start justify-between gap-3 ${
                      req.completed
                        ? 'bg-emerald-50/40 border-emerald-300'
                        : 'bg-[#FAF9F7] border-[#E5E3DC] hover:border-[#8A8A85]'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5 shrink-0">
                        {req.completed ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                        ) : (
                          <Circle className="w-5 h-5 text-[#8A8A85]" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm font-bold ${req.completed ? 'text-emerald-900 line-through' : 'text-[#1A1C1E]'}`}>
                            {req.title}
                          </span>
                          <span className="px-2 py-0.5 text-[10px] font-mono uppercase bg-[#F2F1EE] text-[#5A5C60] border border-[#E5E3DC] rounded-xs">
                            {req.tag}
                          </span>
                        </div>
                        <p className="text-xs text-[#5A5C60] mt-1 leading-relaxed">
                          {req.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* DELIVERABLES OVERVIEW */}
            <div className="bg-white border border-[#D5D3CB] rounded-sm p-5 sm:p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-[#E5E3DC] pb-3">
                <div>
                  <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#5A5C60]">
                    Project Artifacts
                  </div>
                  <h3 className="text-base font-bold text-[#1A1C1E]">
                    Deliverables
                  </h3>
                </div>
                <button
                  onClick={() => onTabChange('submission')}
                  className="text-xs font-semibold text-[#3E51FF] hover:underline flex items-center gap-1"
                >
                  <span>Edit in Submission Tab</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="p-3 bg-[#FAF9F7] border border-[#E5E3DC] rounded-xs flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xs bg-[#1A1C1E] text-white flex items-center justify-center">
                    <Github className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#1A1C1E]">GitHub Repository</div>
                    <div className="text-[11px] text-[#5A5C60]">Clean git commit history with README</div>
                  </div>
                </div>

                <div className="p-3 bg-[#FAF9F7] border border-[#E5E3DC] rounded-xs flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xs bg-[#3E51FF] text-white flex items-center justify-center">
                    <Globe className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#1A1C1E]">Live Project URL</div>
                    <div className="text-[11px] text-[#5A5C60]">Vercel / Netlify / Cloud deployment</div>
                  </div>
                </div>

                <div className="p-3 bg-[#FAF9F7] border border-[#E5E3DC] rounded-xs flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xs bg-emerald-600 text-white flex items-center justify-center">
                    <Layers className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#1A1C1E]">Screenshots</div>
                    <div className="text-[11px] text-[#5A5C60]">Desktop & mobile responsive captures</div>
                  </div>
                </div>

                <div className="p-3 bg-[#FAF9F7] border border-[#E5E3DC] rounded-xs flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xs bg-amber-600 text-white flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#1A1C1E]">Brief Project Documentation</div>
                    <div className="text-[11px] text-[#5A5C60]">Architecture & trade-offs summary</div>
                  </div>
                </div>
              </div>
            </div>

            {/* QUICK ACTIONS ROW */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                onClick={onOpenHintModal}
                className="px-4 py-2 text-xs font-bold bg-[#EEF0FF] hover:bg-[#DCE1FF] text-[#3E51FF] border border-[#C5CAFF] rounded-xs transition-colors flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Ask Engineering Mentor for Hint</span>
              </button>

              <button
                onClick={() => onTabChange('preview')}
                className="px-5 py-2.5 text-xs font-bold bg-[#1A1C1E] hover:bg-black text-white rounded-xs transition-colors flex items-center gap-2 shadow-xs"
              >
                <Eye className="w-4 h-4" />
                <span>Open Live Component Sandbox</span>
              </button>
            </div>

          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: INTERACTIVE LIVE PREVIEW / SANDBOX */}
        {/* ========================================================================= */}
        {currentTab === 'preview' && (
          <div className="space-y-6">
            <ProductPageLivePreview />
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: DELIVERABLES & SUBMISSION */}
        {/* ========================================================================= */}
        {currentTab === 'submission' && (
          <div className="space-y-6 max-w-3xl">
            <div className="bg-white border border-[#D5D3CB] rounded-sm p-6 shadow-2xs space-y-6">
              <div>
                <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#3E51FF] mb-1">
                  Deliverables Submission Form
                </div>
                <h2 className="text-xl font-bold text-[#1A1C1E]">
                  Submit Your Sprint Task Deliverables
                </h2>
                <p className="text-xs sm:text-sm text-[#5A5C60] mt-1">
                  Please provide your source code link, hosted demo URL, screenshots, and architecture write-up.
                </p>
              </div>

              {/* Input 1: GitHub Repository URL */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#1A1C1E] flex items-center gap-2">
                  <Github className="w-4 h-4" />
                  <span>GitHub Repository URL <span className="text-red-500">*</span></span>
                </label>
                <input
                  type="url"
                  value={deliverables.githubUrl}
                  onChange={(e) => onUpdateDeliverables({ githubUrl: e.target.value })}
                  placeholder="https://github.com/your-username/nova-ecommerce-product-page"
                  className="w-full px-3.5 py-2.5 text-xs font-mono bg-[#FAF9F7] border border-[#D5D3CB] focus:border-[#3E51FF] focus:bg-white rounded-xs transition-colors outline-none"
                  id="input-deliverable-github"
                />
                <span className="text-[11px] text-[#8A8A85]">
                  Ensure repository is public or contains a detailed README with setup steps.
                </span>
              </div>

              {/* Input 2: Live Project URL */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#1A1C1E] flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  <span>Live Project URL <span className="text-red-500">*</span></span>
                </label>
                <input
                  type="url"
                  value={deliverables.liveUrl}
                  onChange={(e) => onUpdateDeliverables({ liveUrl: e.target.value })}
                  placeholder="https://nova-headphones-demo.vercel.app"
                  className="w-full px-3.5 py-2.5 text-xs font-mono bg-[#FAF9F7] border border-[#D5D3CB] focus:border-[#3E51FF] focus:bg-white rounded-xs transition-colors outline-none"
                  id="input-deliverable-live-url"
                />
                <span className="text-[11px] text-[#8A8A85]">
                  Must be accessible without authentication or IP restrictions.
                </span>
              </div>

              {/* Input 3: UI Screenshots */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#1A1C1E] flex items-center gap-2">
                  <Layers className="w-4 h-4" />
                  <span>Screenshots & Responsive Captures</span>
                </label>
                <div className="border-2 border-dashed border-[#D5D3CB] hover:border-[#8A8A85] bg-[#FAF9F7] p-6 rounded-xs text-center space-y-2 transition-colors">
                  <Upload className="w-6 h-6 text-[#8A8A85] mx-auto" />
                  <div className="text-xs font-semibold text-[#1A1C1E]">
                    Drag & Drop UI Screenshots or Click to Browse
                  </div>
                  <div className="text-[11px] text-[#8A8A85]">
                    PNG, JPG, or WebP up to 10MB each (Desktop and Mobile views)
                  </div>
                </div>

                {deliverables.screenshots.length > 0 && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                    {deliverables.screenshots.map((src, idx) => (
                      <div key={idx} className="aspect-video bg-[#F5F4F0] border border-[#E5E3DC] rounded-xs overflow-hidden relative group">
                        <img src={src} alt="Uploaded deliverable" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-xs font-mono transition-opacity">
                          Screenshot #{idx + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Input 4: Project Documentation */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#1A1C1E] flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span>Brief Project Documentation <span className="text-red-500">*</span></span>
                </label>
                <textarea
                  rows={5}
                  value={deliverables.documentation}
                  onChange={(e) => onUpdateDeliverables({ documentation: e.target.value })}
                  placeholder="Summarize your component architecture, state management decisions, accessibility considerations, and how you ensured responsive layout optimization across breakpoints..."
                  className="w-full p-3.5 text-xs font-mono bg-[#FAF9F7] border border-[#D5D3CB] focus:border-[#3E51FF] focus:bg-white rounded-xs transition-colors outline-none resize-y"
                  id="input-deliverable-docs"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-4 border-t border-[#E5E3DC] flex items-center justify-between">
                <span className="text-xs text-[#5A5C60]">
                  Sprint 3 Rubric: Code Structure (35%), UI Quality (35%), Accessibility (30%)
                </span>
                <button
                  onClick={onOpenSubmissionModal}
                  className="px-6 py-2.5 bg-[#1A1C1E] hover:bg-black text-white text-xs font-bold rounded-xs transition-colors flex items-center gap-2 shadow-xs"
                  id="btn-open-submit-modal"
                >
                  <FileCheck className="w-4 h-4 text-[#8898FF]" />
                  <span>Submit Project</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 4: RESOURCES & ASSETS */}
        {/* ========================================================================= */}
        {currentTab === 'resources' && (
          <div className="space-y-6 max-w-4xl">
            {/* Category Filter */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {(['All', 'Design files', 'Documentation', 'Reference materials'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setResourceFilter(cat)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xs transition-colors whitespace-nowrap ${
                    resourceFilter === cat
                      ? 'bg-[#1A1C1E] text-white shadow-xs'
                      : 'bg-white text-[#5A5C60] hover:bg-[#EAE8E1] border border-[#D5D3CB]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Resources Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredResources.map((res) => (
                <div 
                  key={res.id}
                  className="bg-white border border-[#D5D3CB] rounded-sm p-5 shadow-2xs space-y-3 flex flex-col justify-between hover:border-[#8A8A85] transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider bg-[#EEF0FF] text-[#3E51FF] rounded-xs">
                        {res.category}
                      </span>
                      <span className="text-[10px] font-mono text-[#8A8A85]">
                        {res.format}
                      </span>
                    </div>

                    <h4 className="font-bold text-sm text-[#1A1C1E]">
                      {res.title}
                    </h4>
                    <p className="text-xs text-[#5A5C60] mt-1.5 leading-relaxed">
                      {res.description}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-[#E5E3DC] flex items-center justify-between text-xs">
                    <span className="font-mono text-[11px] text-[#5A5C60]">
                      {res.sizeOrLink}
                    </span>
                    <button
                      onClick={() => handleCopy(res.sizeOrLink, res.id)}
                      className="text-xs font-bold text-[#3E51FF] hover:underline flex items-center gap-1"
                    >
                      {copiedToken === res.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Access Spec</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 5: TEAM DISCUSSION / PR REVIEW */}
        {/* ========================================================================= */}
        {currentTab === 'discussion' && (
          <div className="space-y-6 max-w-3xl">
            <div className="bg-white border border-[#D5D3CB] rounded-sm p-6 shadow-2xs space-y-5">
              <div className="flex items-center justify-between border-b border-[#E5E3DC] pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <h3 className="font-bold text-sm text-[#1A1C1E]">
                    Nova Labs Frontend Team Channel (#sprint-3-product-page)
                  </h3>
                </div>
                <span className="text-xs font-mono text-[#8A8A85]">3 members active</span>
              </div>

              {/* Message 1: Sarah Chen */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#EEF0FF] border border-[#C5CAFF] flex items-center justify-center font-bold text-xs text-[#3E51FF] shrink-0">
                  SC
                </div>
                <div className="bg-[#FAF9F7] border border-[#E5E3DC] p-3.5 rounded-xs text-xs space-y-1.5 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#1A1C1E]">Sarah Chen (Senior Frontend Engineer)</span>
                    <span className="text-[10px] font-mono text-[#8A8A85]">Today at 9:15 AM</span>
                  </div>
                  <p className="text-[#3A3C40] leading-relaxed">
                    Hey! When working on the thumbnail gallery, remember to add <code className="bg-[#EAE8E1] px-1 py-0.5 font-mono text-[#1A1C1E]">aria-label</code> and <code className="bg-[#EAE8E1] px-1 py-0.5 font-mono text-[#1A1C1E]">aria-pressed</code> to the thumbnail buttons. We need this accessible for screen readers before merging into staging. Let me know if you want a pair review!
                  </p>
                </div>
              </div>

              {/* Message 2: Marcus Vance */}
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1A1C1E] text-white flex items-center justify-center font-bold text-xs shrink-0">
                  MV
                </div>
                <div className="bg-[#FAF9F7] border border-[#E5E3DC] p-3.5 rounded-xs text-xs space-y-1.5 flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-[#1A1C1E]">Marcus Vance (Staff Architect)</span>
                    <span className="text-[10px] font-mono text-[#8A8A85]">Today at 10:42 AM</span>
                  </div>
                  <p className="text-[#3A3C40] leading-relaxed">
                    Also verify that on viewports under 640px, the "Add to Cart" CTA remains prominent and doesn't get pushed 3 screens down below the tech specs. Good luck!
                  </p>
                </div>
              </div>

              {/* Reply Box */}
              <div className="pt-3 border-t border-[#E5E3DC] space-y-2">
                <textarea
                  rows={2}
                  placeholder="Post an engineering update or ask for a pull request review..."
                  className="w-full p-3 text-xs bg-[#FAF9F7] border border-[#D5D3CB] focus:border-[#3E51FF] focus:bg-white rounded-xs transition-colors outline-none"
                  id="input-team-message"
                />
                <div className="flex justify-end">
                  <button className="px-4 py-1.5 bg-[#1A1C1E] hover:bg-black text-white text-xs font-semibold rounded-xs transition-colors">
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
