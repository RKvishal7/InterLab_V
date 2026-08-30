import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp, 
  ArrowRight, 
  ExternalLink, 
  Github, 
  Award, 
  ShieldCheck, 
  Code2, 
  Layout, 
  FileText, 
  Zap, 
  Sliders, 
  Check, 
  Copy, 
  Sparkles, 
  ArrowUpRight, 
  Layers, 
  Play, 
  RotateCcw, 
  Eye, 
  Terminal, 
  BookOpen, 
  TrendingUp, 
  Briefcase, 
  Lock, 
  Share2, 
  Clock, 
  FolderGit2, 
  Palette, 
  Cpu, 
  Info,
  CheckCircle,
  HelpCircle,
  BarChart3,
  ChevronRight,
  Image as ImageIcon
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Navbar } from '../layout/Navbar';
import { ProjectSubmissionExperience } from '../workspace/ProjectSubmissionExperience';
import { ProductPageLivePreview } from '../workspace/ProductPageLivePreview';

interface FeedbackItem {
  id: string;
  category: 'Accessibility' | 'Performance' | 'UI/UX';
  priority: 'High' | 'Medium' | 'Low';
  issue: string;
  whyItMatters: string;
  howToImprove: string;
  codeRecommendation: {
    language: string;
    before?: string;
    after: string;
    explanation: string;
  };
}

export const ProjectFeedbackPage: React.FC = () => {
  const { navigate, openMentor } = useApp();

  // Active accordion tabs
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'issue-accessibility': true,
    'issue-loading-states': true,
    'issue-image-optimization': false,
  });

  // Filter for detailed feedback
  const [feedbackFilter, setFeedbackFilter] = useState<'all' | 'Accessibility' | 'Performance' | 'UI/UX'>('all');

  // Interactive student action checklist
  const [addressedIssues, setAddressedIssues] = useState<Record<string, boolean>>({});

  // Modals state
  const [isSubmissionModalOpen, setIsSubmissionModalOpen] = useState<boolean>(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState<boolean>(false);
  const [copiedCodeId, setCopiedCodeId] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const toggleIssueAddressed = (id: string) => {
    setAddressedIssues(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleCopyCode = (id: string, code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeId(id);
    setTimeout(() => setCopiedCodeId(null), 2000);
  };

  // Structured Feedback Items matching prompt specifications
  const feedbackItems: FeedbackItem[] = [
    {
      id: 'issue-accessibility',
      category: 'Accessibility',
      priority: 'High',
      issue: 'Improve accessibility: Color swatches lack ARIA radio group semantics and roving keyboard focus',
      whyItMatters: 'Screen reader users encounter these visual swatches as generic unlabelled buttons with no indication of active selection or variant grouping. Furthermore, keyboard users cannot navigate between colors using standard arrow keys (W3C APG Radio Group Pattern), creating a high barrier for assistive tech navigation.',
      howToImprove: 'Wrap the variant swatch container in a semantic `<div role="radiogroup" aria-label="Color options">`. Each swatch button should declare `role="radio"`, `aria-checked={isSelected}`, and use an `aria-label` that names both the color and its availability status. Implement roving `tabIndex` so Tab enters the group and Left/Right arrows cycle through swatches.',
      codeRecommendation: {
        language: 'tsx',
        before: `// ❌ Current Implementation: Generic buttons without ARIA group semantics
<div className="flex gap-2">
  {colors.map(color => (
    <button 
      key={color.id} 
      onClick={() => setSelectedColor(color)}
      className={\`w-8 h-8 rounded-full \${selectedColor.id === color.id ? 'ring-2' : ''}\`}
      style={{ backgroundColor: color.hex }}
    />
  ))}
</div>`,
        after: `// ✅ Recommended Solution: W3C APG Accessible Radio Group with roving tabindex
<div 
  role="radiogroup" 
  aria-label="Color options" 
  className="flex items-center gap-2.5"
>
  {colors.map((color, index) => {
    const isSelected = selectedColor.id === color.id;
    return (
      <button
        key={color.id}
        role="radio"
        aria-checked={isSelected}
        aria-label={\`Select \${color.name} variant\${color.inStock ? '' : ' (Out of stock)'}\`}
        tabIndex={isSelected ? 0 : -1}
        onClick={() => setSelectedColor(color)}
        onKeyDown={(e) => handleSwatchKeyDown(e, index)}
        className={\`w-9 h-9 rounded-full relative transition-all focus:outline-none focus:ring-2 focus:ring-[#3E51FF] \${
          isSelected ? 'ring-2 ring-offset-2 ring-[#1A1C1E] scale-105' : 'hover:scale-105'
        }\`}
        style={{ backgroundColor: color.hex }}
      >
        {isSelected && (
          <Check className="w-4 h-4 text-white absolute inset-0 m-auto stroke-[2.5]" />
        )}
      </button>
    );
  })}
</div>`,
        explanation: 'Adding role="radio" and aria-checked guarantees immediate screen reader feedback whenever a user switches color variants.'
      }
    },
    {
      id: 'issue-loading-states',
      category: 'UI/UX',
      priority: 'Medium',
      issue: 'Add loading states: Variant gallery transitions lack skeleton shimmer placeholders',
      whyItMatters: 'When a user switches between product variant galleries or selects a high-resolution color photo, network latency on real-world mobile 3G/4G connections causes the image viewport to temporarily display blank whitespace before abruptly popping into view. This produces noticeable layout jank and degrades perceived responsiveness.',
      howToImprove: 'Introduce an `isImageLoading` boolean state on the active image container. Render an animated pulse skeleton placeholder (`animate-pulse bg-[#EAE8E1]`) in the exact aspect ratio (`aspect-square`) while the new variant image loads in the background via `onLoad={() => setIsImageLoading(false)}`.',
      codeRecommendation: {
        language: 'tsx',
        before: `// ❌ Current Implementation: Immediate src swap without loading state
<div className="aspect-square rounded-xs overflow-hidden">
  <img src={activeImage} alt={product.title} className="w-full h-full object-cover" />
</div>`,
        after: `// ✅ Recommended Solution: Smooth skeleton placeholder with fade-in transition
const [isLoading, setIsLoading] = useState(true);

<div className="aspect-square bg-[#F4F3EF] rounded-xs overflow-hidden relative">
  {isLoading && (
    <div className="absolute inset-0 bg-gradient-to-r from-[#F2F1EE] via-[#E5E3DC] to-[#F2F1EE] animate-pulse flex items-center justify-center">
      <ImageIcon className="w-8 h-8 text-[#8A8A85] animate-spin-slow opacity-40" />
    </div>
  )}
  <img
    src={activeImage}
    alt={product.title}
    onLoad={() => setIsLoading(false)}
    className={\`w-full h-full object-cover transition-opacity duration-300 \${
      isLoading ? 'opacity-0' : 'opacity-100'
    }\`}
  />
</div>`,
        explanation: 'Ensures the container preserves exact aspect ratios without layout shift while smoothly animating the loaded high-resolution asset.'
      }
    },
    {
      id: 'issue-image-optimization',
      category: 'Performance',
      priority: 'Medium',
      issue: 'Optimize image performance: Uncompressed 2000px source assets served on mobile viewports',
      whyItMatters: 'Mobile users download the same 2.8 MB desktop-sized hero images, adding ~900ms to Largest Contentful Paint (LCP) and exhausting cellular bandwidth. Serving responsive image dimensions is essential for production e-commerce performance budgets.',
      howToImprove: 'Implement responsive image sizing with the HTML `<picture>` element or `srcset` and `sizes` attributes. Serve next-gen formats (WebP or AVIF) with fallback to JPG/PNG, and declare explicit `width` and `height` dimensions to eliminate Cumulative Layout Shift (CLS).',
      codeRecommendation: {
        language: 'tsx',
        before: `// ❌ Current Implementation: Single unoptimized full-size image URL
<img src="/images/headphone-2000px.png" alt="Wireless Headphone" />`,
        after: `// ✅ Recommended Solution: Responsive picture element with modern WebP sources
<picture>
  <source
    type="image/webp"
    srcSet="
      /images/headphone-400.webp 400w,
      /images/headphone-800.webp 800w,
      /images/headphone-1200.webp 1200w
    "
    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 600px"
  />
  <img
    src="/images/headphone-800.jpg"
    alt="Nova Pro ANC Wireless Headphones in Matte Charcoal"
    width="600"
    height="600"
    loading="eager"
    fetchPriority="high"
    className="w-full h-full object-cover"
  />
</picture>`,
        explanation: 'Browser automatically fetches the lightweight 400w WebP image on mobile screens (~85% byte savings) while serving 1200w to Retina displays.'
      }
    }
  ];

  const filteredFeedback = feedbackFilter === 'all' 
    ? feedbackItems 
    : feedbackItems.filter(item => item.category === feedbackFilter);

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#1A1C1E] flex flex-col font-sans selection:bg-[#EEF0FF] selection:text-[#3E51FF]">
      <Navbar />

      {/* Breadcrumb / Top Context Header */}
      <div className="border-b border-[#E5E3DC] bg-white sticky top-0 z-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-[#5A5C60] font-mono">
            <button 
              onClick={() => navigate({ view: 'dashboard', tab: 'projects' })}
              className="hover:text-[#1A1C1E] transition-colors"
            >
              Dashboard
            </button>
            <span>/</span>
            <button 
              onClick={() => navigate({ view: 'workspace', internshipId: 'frontend-developer' })}
              className="hover:text-[#1A1C1E] transition-colors"
            >
              Frontend Simulation
            </button>
            <span>/</span>
            <span className="text-[#1A1C1E] font-semibold">Sprint 3 Review</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-xs font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xs flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Official Review Verified</span>
            </span>
            <span className="text-xs text-[#8A8A85] font-mono hidden sm:inline">
              Reviewed by Sarah Chen (Sr. Engineer)
            </span>
          </div>
        </div>
      </div>

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* ========================================================================= */}
        {/* 1. PAGE HEADER & SOPHISTICATED SCORE VISUALIZATION */}
        {/* ========================================================================= */}
        <section className="bg-white border border-[#D5D3CB] rounded-sm p-6 sm:p-8 shadow-xs" id="review-page-header">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Project Title & Context */}
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2.5 flex-wrap">
                <span className="text-xs font-mono font-bold uppercase tracking-wider bg-[#EEF0FF] text-[#3E51FF] px-2.5 py-1 rounded-xs border border-[#C5CAFF]">
                  Project Review
                </span>
                <span className="text-xs text-[#8A8A85]">•</span>
                <span className="text-xs font-mono text-[#5A5C60]">Nova Labs • Sprint 3: Task 1</span>
                <span className="text-xs text-[#8A8A85]">•</span>
                <span className="text-xs font-mono text-[#5A5C60]">Revision v1.0</span>
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1A1C1E] tracking-tight">
                  Responsive E-commerce Product Page
                </h1>
                <p className="text-xs sm:text-sm text-[#5A5C60] mt-2 leading-relaxed">
                  Comprehensive performance review of your component architecture, responsive grid execution, mobile touch ergonomics, and WCAG accessibility standards.
                </p>
              </div>

              {/* Reviewer Credentials */}
              <div className="pt-2 flex items-center justify-between gap-3 border-t border-[#E5E3DC] flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#1A1C1E] text-white flex items-center justify-center font-bold text-xs font-mono shrink-0">
                    SC
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#1A1C1E] flex items-center gap-1.5">
                      <span>Sarah Chen</span>
                      <span className="text-[10px] font-mono font-normal bg-[#F2F1EE] text-[#5A5C60] px-1.5 py-0.5 rounded-xs">
                        Staff Frontend Mentor
                      </span>
                    </div>
                    <div className="text-[11px] text-[#5A5C60]">
                      Evaluated against Nova Labs Engineering Rubric v2.4 • Completed Today
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => openMentor({ 
                    view: 'project-feedback', 
                    contextTitle: 'Review: Responsive Product Page (84/100)',
                    initialPrompt: 'Can you explain how my overall score of 84/100 was calculated and what differentiated my Problem Solving (90) from UI/UX (78)?'
                  })}
                  className="px-3 py-1.5 bg-[#EEF0FF] hover:bg-[#DCE1FF] text-[#3E51FF] border border-[#C5CAFF] text-xs font-bold rounded-xs transition-colors flex items-center gap-1.5 shadow-2xs"
                  id="action-ask-mentor-feedback"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Discuss with Mentor</span>
                </button>
              </div>
            </div>

            {/* Right: Sophisticated Score Meter */}
            <div className="lg:col-span-5 bg-[#FAF9F7] border border-[#E5E3DC] rounded-sm p-6 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xs">
              
              {/* Radial Gauge / Score Visualization */}
              <div className="relative w-36 h-36 flex items-center justify-center shrink-0">
                <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 120 120">
                  {/* Background Track Circle */}
                  <circle
                    cx="60"
                    cy="60"
                    r="48"
                    className="stroke-[#E5E3DC]"
                    strokeWidth="9"
                    fill="transparent"
                  />
                  {/* Category Accent Track 1 (Problem Solving - 90) */}
                  <circle
                    cx="60"
                    cy="60"
                    r="48"
                    className="stroke-[#3E51FF]"
                    strokeWidth="9"
                    strokeDasharray={2 * Math.PI * 48}
                    strokeDashoffset={2 * Math.PI * 48 * (1 - 0.84)}
                    strokeLinecap="round"
                    fill="transparent"
                    style={{ transition: 'stroke-dashoffset 1s ease-in-out' }}
                  />
                </svg>

                {/* Score Number Display */}
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                  <span className="text-[10px] font-mono uppercase tracking-wider text-[#8A8A85] font-bold">
                    Overall Score
                  </span>
                  <span className="text-3xl font-black text-[#1A1C1E] font-mono tracking-tight">
                    84
                  </span>
                  <span className="text-[11px] font-mono text-[#5A5C60] font-semibold">
                    / 100
                  </span>
                </div>
              </div>

              {/* Benchmarking & Status Breakdown */}
              <div className="space-y-2.5 text-center sm:text-left flex-1">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-xs font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xs">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Proficient Performance</span>
                  </div>
                  <div className="text-xs text-[#1A1C1E] font-semibold mt-1.5">
                    Top 18% of Cohort Submissions
                  </div>
                </div>

                <p className="text-[11px] text-[#5A5C60] leading-normal">
                  Meets production deployment criteria. Addressing the 3 highlighted items will elevate code to Exemplary (95+).
                </p>

                <div className="pt-1 flex items-center gap-3 text-[11px] font-mono text-[#8A8A85]">
                  <span>+220 XP Earned</span>
                  <span>•</span>
                  <span>Sprint Verified</span>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. EVALUATION CATEGORIES BREAKDOWN (4 CATEGORIES) */}
        {/* ========================================================================= */}
        <section className="space-y-4" id="evaluation-categories-section">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-mono font-bold uppercase tracking-wider text-[#5A5C60] flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-[#3E51FF]" />
              <span>Evaluation Categories</span>
            </h2>
            <span className="text-xs font-mono text-[#8A8A85]">
              Weighted Average: 84 / 100
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Category 1: Problem Solving (90) */}
            <div className="bg-white border border-[#D5D3CB] rounded-sm p-5 space-y-3 shadow-2xs hover:border-[#3E51FF] transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1A1C1E]">
                  Problem Solving
                </span>
                <span className="text-sm font-mono font-black text-emerald-600">
                  90 <span className="text-[10px] text-[#8A8A85] font-normal">/ 100</span>
                </span>
              </div>
              <div className="w-full h-2 bg-[#F2F1EE] rounded-full overflow-hidden">
                <div className="h-full bg-emerald-600 rounded-full transition-all duration-700" style={{ width: '90%' }} />
              </div>
              <p className="text-[11px] text-[#5A5C60] leading-relaxed">
                Demonstrated excellent edge-case handling in quantity limits and live discount math calculations.
              </p>
              <div className="pt-1 text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-xs inline-block">
                Tier: Exemplary
              </div>
            </div>

            {/* Category 2: Code Quality (85) */}
            <div className="bg-white border border-[#D5D3CB] rounded-sm p-5 space-y-3 shadow-2xs hover:border-[#3E51FF] transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1A1C1E]">
                  Code Quality
                </span>
                <span className="text-sm font-mono font-black text-[#3E51FF]">
                  85 <span className="text-[10px] text-[#8A8A85] font-normal">/ 100</span>
                </span>
              </div>
              <div className="w-full h-2 bg-[#F2F1EE] rounded-full overflow-hidden">
                <div className="h-full bg-[#3E51FF] rounded-full transition-all duration-700" style={{ width: '85%' }} />
              </div>
              <p className="text-[11px] text-[#5A5C60] leading-relaxed">
                Strong TypeScript interfaces, clean helper extractions, and zero unused dependencies in bundle.
              </p>
              <div className="pt-1 text-[10px] font-mono text-[#3E51FF] bg-[#EEF0FF] px-2 py-0.5 rounded-xs inline-block">
                Tier: Proficient
              </div>
            </div>

            {/* Category 3: UI/UX (78) */}
            <div className="bg-white border border-[#D5D3CB] rounded-sm p-5 space-y-3 shadow-2xs hover:border-[#3E51FF] transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1A1C1E]">
                  UI/UX
                </span>
                <span className="text-sm font-mono font-black text-amber-600">
                  78 <span className="text-[10px] text-[#8A8A85] font-normal">/ 100</span>
                </span>
              </div>
              <div className="w-full h-2 bg-[#F2F1EE] rounded-full overflow-hidden">
                <div className="h-full bg-amber-500 rounded-full transition-all duration-700" style={{ width: '78%' }} />
              </div>
              <p className="text-[11px] text-[#5A5C60] leading-relaxed">
                Great layout and color harmony, but needs skeleton loading states and smoother image transitions.
              </p>
              <div className="pt-1 text-[10px] font-mono text-amber-700 bg-amber-50 px-2 py-0.5 rounded-xs inline-block">
                Tier: Developing
              </div>
            </div>

            {/* Category 4: Documentation (82) */}
            <div className="bg-white border border-[#D5D3CB] rounded-sm p-5 space-y-3 shadow-2xs hover:border-[#3E51FF] transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1A1C1E]">
                  Documentation
                </span>
                <span className="text-sm font-mono font-black text-[#1A1C1E]">
                  82 <span className="text-[10px] text-[#8A8A85] font-normal">/ 100</span>
                </span>
              </div>
              <div className="w-full h-2 bg-[#F2F1EE] rounded-full overflow-hidden">
                <div className="h-full bg-[#1A1C1E] rounded-full transition-all duration-700" style={{ width: '82%' }} />
              </div>
              <p className="text-[11px] text-[#5A5C60] leading-relaxed">
                Clear pull request write-up covering setup instructions and technical architectural tradeoffs.
              </p>
              <div className="pt-1 text-[10px] font-mono text-[#5A5C60] bg-[#F2F1EE] px-2 py-0.5 rounded-xs inline-block">
                Tier: Proficient
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. PROJECT STRENGTHS & AREAS FOR IMPROVEMENT (TWO-COLUMN GRID) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* PROJECT STRENGTHS */}
          <div className="bg-white border border-[#D5D3CB] rounded-sm p-6 space-y-4 shadow-2xs" id="project-strengths-card">
            <div className="flex items-center gap-2 pb-2 border-b border-[#E5E3DC]">
              <div className="w-6 h-6 rounded-xs bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <CheckCircle className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1A1C1E]">
                Project Strengths
              </h3>
            </div>

            <ul className="space-y-3.5">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-2" />
                <div>
                  <div className="text-xs font-bold text-[#1A1C1E]">
                    Strong responsive implementation
                  </div>
                  <div className="text-[11px] text-[#5A5C60] mt-0.5 leading-relaxed">
                    The dual-column desktop structure breaks cleanly into a single vertical stack on mobile viewports with mathematically balanced spacing and no horizontal overflow.
                  </div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-2" />
                <div>
                  <div className="text-xs font-bold text-[#1A1C1E]">
                    Clean component structure
                  </div>
                  <div className="text-[11px] text-[#5A5C60] mt-0.5 leading-relaxed">
                    High modularity across Gallery, Specs, Swatches, and Quantity Selector components with clear props interfaces and no prop drilling.
                  </div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 shrink-0 mt-2" />
                <div>
                  <div className="text-xs font-bold text-[#1A1C1E]">
                    Good mobile optimization
                  </div>
                  <div className="text-[11px] text-[#5A5C60] mt-0.5 leading-relaxed">
                    Maintained compliant touch targets (44x44px minimum) across thumbnail selectors, quantity stepper buttons, and the sticky add-to-cart action bar.
                  </div>
                </div>
              </li>
            </ul>
          </div>

          {/* AREAS FOR IMPROVEMENT */}
          <div className="bg-white border border-[#D5D3CB] rounded-sm p-6 space-y-4 shadow-2xs" id="areas-for-improvement-card">
            <div className="flex items-center gap-2 pb-2 border-b border-[#E5E3DC]">
              <div className="w-6 h-6 rounded-xs bg-amber-50 text-amber-600 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1A1C1E]">
                Areas for Improvement
              </h3>
            </div>

            <ul className="space-y-3.5">
              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-2" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#1A1C1E]">
                      Improve accessibility
                    </span>
                    <span className="text-[9px] font-mono uppercase bg-red-50 text-red-700 px-1.5 py-0.2 rounded-xs">
                      Priority: High
                    </span>
                  </div>
                  <div className="text-[11px] text-[#5A5C60] mt-0.5 leading-relaxed">
                    Color swatches and thumbnail carousels need standard WAI-ARIA roles (`role="radiogroup"`, `aria-selected`) for assistive technology users.
                  </div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-2" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#1A1C1E]">
                      Add loading states
                    </span>
                    <span className="text-[9px] font-mono uppercase bg-amber-50 text-amber-700 px-1.5 py-0.2 rounded-xs">
                      Priority: Medium
                    </span>
                  </div>
                  <div className="text-[11px] text-[#5A5C60] mt-0.5 leading-relaxed">
                    Variant image switching produces momentary empty flashes before asset resolution. Skeleton shimmer placeholders will smooth the perceived transition.
                  </div>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-2" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#1A1C1E]">
                      Optimize image performance
                    </span>
                    <span className="text-[9px] font-mono uppercase bg-amber-50 text-amber-700 px-1.5 py-0.2 rounded-xs">
                      Priority: Medium
                    </span>
                  </div>
                  <div className="text-[11px] text-[#5A5C60] mt-0.5 leading-relaxed">
                    Source assets exceed 2.5 MB. Implementing responsive picture elements with WebP/AVIF srcset will improve Core Web Vitals and LCP scores.
                  </div>
                </div>
              </li>
            </ul>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* 4. DETAILED FEEDBACK (EXPANDABLE SECTIONS) */}
        {/* ========================================================================= */}
        <section className="space-y-4" id="detailed-feedback-section">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-1 border-b border-[#E5E3DC]">
            <div>
              <h2 className="text-sm font-mono font-bold uppercase tracking-wider text-[#1A1C1E] flex items-center gap-2">
                <Code2 className="w-4 h-4 text-[#3E51FF]" />
                <span>Detailed Engineering Feedback</span>
              </h2>
              <p className="text-xs text-[#5A5C60] mt-0.5">
                Structured mentor recommendations with issue root causes and implementation examples.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 bg-[#FAF9F7] p-1 border border-[#E5E3DC] rounded-xs text-xs">
              {(['all', 'Accessibility', 'UI/UX', 'Performance'] as const).map(cat => (
                <button
                  key={cat}
                  onClick={() => setFeedbackFilter(cat)}
                  className={`px-2.5 py-1 rounded-xs font-medium transition-colors capitalize ${
                    feedbackFilter === cat
                      ? 'bg-[#1A1C1E] text-white font-semibold'
                      : 'text-[#5A5C60] hover:text-[#1A1C1E]'
                  }`}
                >
                  {cat === 'all' ? 'All (3)' : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Expandable Feedback Items */}
          <div className="space-y-4">
            {filteredFeedback.map((item) => {
              const isExpanded = !!expandedSections[item.id];
              const isAddressed = !!addressedIssues[item.id];

              return (
                <div 
                  key={item.id}
                  className={`bg-white border rounded-sm transition-all shadow-2xs overflow-hidden ${
                    isExpanded ? 'border-[#3E51FF]/60 ring-1 ring-[#3E51FF]/20' : 'border-[#D5D3CB]'
                  }`}
                  id={`feedback-card-${item.id}`}
                >
                  {/* Collapsible Card Header */}
                  <div 
                    onClick={() => toggleSection(item.id)}
                    className="p-5 flex items-start justify-between gap-4 cursor-pointer hover:bg-[#FAF9F7] transition-colors"
                  >
                    <div className="flex items-start gap-3.5">
                      <div className={`w-6 h-6 rounded-xs flex items-center justify-center shrink-0 mt-0.5 ${
                        item.category === 'Accessibility' 
                          ? 'bg-red-50 text-red-600' 
                          : item.category === 'UI/UX'
                            ? 'bg-amber-50 text-amber-600'
                            : 'bg-[#EEF0FF] text-[#3E51FF]'
                      }`}>
                        <Sliders className="w-3.5 h-3.5" />
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs bg-[#F2F1EE] text-[#5A5C60]">
                            {item.category}
                          </span>
                          <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-xs ${
                            item.priority === 'High' 
                              ? 'bg-red-50 text-red-700' 
                              : 'bg-amber-50 text-amber-700'
                          }`}>
                            Priority: {item.priority}
                          </span>
                          {isAddressed && (
                            <span className="text-[10px] font-mono font-bold uppercase bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-xs flex items-center gap-1">
                              <Check className="w-3 h-3" /> Marked Addressed
                            </span>
                          )}
                        </div>
                        <h3 className="text-xs sm:text-sm font-bold text-[#1A1C1E]">
                          {item.issue}
                        </h3>
                      </div>
                    </div>

                    <button 
                      type="button"
                      className="p-1 text-[#8A8A85] hover:text-[#1A1C1E] transition-colors shrink-0"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Expanded Body: Structured Mentor Breakdown */}
                  {isExpanded && (
                    <div className="px-5 pb-6 pt-2 border-t border-[#E5E3DC] space-y-5 bg-[#FAF9F7]/50">
                      
                      {/* Structured Details Grid */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-2">
                        
                        {/* 1. WHY IT MATTERS */}
                        <div className="p-4 bg-white border border-[#E5E3DC] rounded-xs space-y-1.5">
                          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#1A1C1E] flex items-center gap-1.5">
                            <Info className="w-3.5 h-3.5 text-[#3E51FF]" />
                            <span>Why it matters</span>
                          </div>
                          <p className="text-xs text-[#5A5C60] leading-relaxed">
                            {item.whyItMatters}
                          </p>
                        </div>

                        {/* 2. HOW TO IMPROVE */}
                        <div className="p-4 bg-white border border-[#E5E3DC] rounded-xs space-y-1.5">
                          <div className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#1A1C1E] flex items-center gap-1.5">
                            <Zap className="w-3.5 h-3.5 text-emerald-600" />
                            <span>How to improve</span>
                          </div>
                          <p className="text-xs text-[#5A5C60] leading-relaxed">
                            {item.howToImprove}
                          </p>
                        </div>

                      </div>

                      {/* 3. EXAMPLE RECOMMENDATION (Code Snippet) */}
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-[#1A1C1E] flex items-center gap-1.5">
                            <Terminal className="w-3.5 h-3.5 text-[#1A1C1E]" />
                            <span>Example recommendation</span>
                          </span>
                          <button
                            onClick={() => handleCopyCode(item.id, item.codeRecommendation.after)}
                            className="px-2 py-1 text-[10px] font-mono bg-white border border-[#D5D3CB] hover:bg-[#FAF9F7] text-[#1A1C1E] rounded-xs flex items-center gap-1 transition-colors"
                          >
                            {copiedCodeId === item.id ? (
                              <>
                                <Check className="w-3 h-3 text-emerald-600" />
                                <span>Copied!</span>
                              </>
                            ) : (
                              <>
                                <Copy className="w-3 h-3 text-[#8A8A85]" />
                                <span>Copy Solution</span>
                              </>
                            )}
                          </button>
                        </div>

                        {/* Code Container */}
                        <div className="bg-[#1A1C1E] text-white rounded-xs p-4 font-mono text-xs overflow-x-auto space-y-3 shadow-inner">
                          {item.codeRecommendation.before && (
                            <div className="text-red-300 opacity-80 border-b border-white/10 pb-3">
                              <pre className="whitespace-pre-wrap">{item.codeRecommendation.before}</pre>
                            </div>
                          )}
                          <div className="text-emerald-300">
                            <pre className="whitespace-pre-wrap">{item.codeRecommendation.after}</pre>
                          </div>
                        </div>

                        <p className="text-[11px] text-[#5A5C60] italic">
                          💡 Note: {item.codeRecommendation.explanation}
                        </p>
                      </div>

                      {/* Interactive Student Action Toggle & Mentor Assist */}
                      <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-t border-[#E5E3DC]">
                        <div 
                          onClick={() => toggleIssueAddressed(item.id)}
                          className="flex items-center gap-2 cursor-pointer select-none text-xs font-semibold text-[#1A1C1E]"
                        >
                          <div className={`w-4 h-4 rounded-xs border flex items-center justify-center transition-colors ${
                            isAddressed ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-[#D5D3CB] bg-white'
                          }`}>
                            {isAddressed && <Check className="w-3 h-3 stroke-[3]" />}
                          </div>
                          <span>Mark this issue as addressed in local codebase</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openMentor({
                              view: 'project-feedback',
                              contextTitle: `Feedback: ${item.issue}`,
                              initialPrompt: `Can you walk me through the step-by-step implementation for fixing: "${item.issue}" and explain why this matters in production?`
                            })}
                            className="px-2.5 py-1 text-[11px] font-semibold text-[#3E51FF] hover:bg-[#EEF0FF] border border-[#C5CAFF] rounded-xs transition-colors flex items-center gap-1.5"
                          >
                            <Sparkles className="w-3 h-3" />
                            <span>Ask Mentor for Breakdown</span>
                          </button>
                        </div>
                      </div>

                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 5. CAREER IMPACT & VERIFIED SKILLS */}
        {/* ========================================================================= */}
        <section className="bg-white border border-[#D5D3CB] rounded-sm p-6 space-y-4 shadow-2xs" id="career-impact-section">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-[#E5E3DC]">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#3E51FF] font-bold">
                Professional Competency Growth
              </span>
              <h3 className="text-sm font-extrabold text-[#1A1C1E]">
                Skills demonstrated in this project
              </h3>
            </div>
            <span className="text-xs font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-xs border border-emerald-200">
              ✓ Added to Verified Student Transcript
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-1">
            
            {/* Skill 1: React */}
            <div className="p-4 bg-[#FAF9F7] border border-[#E5E3DC] rounded-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1A1C1E]">React</span>
                <span className="text-[10px] font-mono text-[#3E51FF] font-bold">Level 3</span>
              </div>
              <div className="w-full h-1.5 bg-[#E5E3DC] rounded-full overflow-hidden">
                <div className="h-full bg-[#3E51FF] rounded-full" style={{ width: '85%' }} />
              </div>
              <div className="text-[10px] text-[#5A5C60] font-mono">
                Component lifecycle, hooks & state isolation
              </div>
            </div>

            {/* Skill 2: Responsive Design */}
            <div className="p-4 bg-[#FAF9F7] border border-[#E5E3DC] rounded-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1A1C1E]">Responsive Design</span>
                <span className="text-[10px] font-mono text-emerald-700 font-bold">Level 4</span>
              </div>
              <div className="w-full h-1.5 bg-[#E5E3DC] rounded-full overflow-hidden">
                <div className="h-full bg-emerald-600 rounded-full" style={{ width: '92%' }} />
              </div>
              <div className="text-[10px] text-[#5A5C60] font-mono">
                CSS Grid, Flexbox, touch target compliance
              </div>
            </div>

            {/* Skill 3: Problem Solving */}
            <div className="p-4 bg-[#FAF9F7] border border-[#E5E3DC] rounded-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1A1C1E]">Problem Solving</span>
                <span className="text-[10px] font-mono text-emerald-700 font-bold">Level 4</span>
              </div>
              <div className="w-full h-1.5 bg-[#E5E3DC] rounded-full overflow-hidden">
                <div className="h-full bg-emerald-600 rounded-full" style={{ width: '90%' }} />
              </div>
              <div className="text-[10px] text-[#5A5C60] font-mono">
                CLS mitigation, boundary edge-cases
              </div>
            </div>

            {/* Skill 4: Git */}
            <div className="p-4 bg-[#FAF9F7] border border-[#E5E3DC] rounded-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#1A1C1E]">Git</span>
                <span className="text-[10px] font-mono text-[#1A1C1E] font-bold">Level 3</span>
              </div>
              <div className="w-full h-1.5 bg-[#E5E3DC] rounded-full overflow-hidden">
                <div className="h-full bg-[#1A1C1E] rounded-full" style={{ width: '80%' }} />
              </div>
              <div className="text-[10px] text-[#5A5C60] font-mono">
                PR workflow, branch discipline & commit notes
              </div>
            </div>

          </div>
        </section>

        {/* ========================================================================= */}
        {/* 6. NEXT RECOMMENDED TASK CARD */}
        {/* ========================================================================= */}
        <section className="bg-gradient-to-r from-[#1A1C1E] to-[#2C2E33] text-white rounded-sm p-6 sm:p-8 space-y-5 shadow-md" id="next-recommended-task-section">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-[#8898FF] font-bold px-2 py-0.5 bg-white/10 rounded-xs">
              Next Recommended Task • Sprint 3 (Task 2)
            </span>
            <span className="text-xs text-white/70 font-mono">
              Estimated Effort: 5 Hours
            </span>
          </div>

          <div className="space-y-2 max-w-3xl">
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight text-white">
              Build an authenticated dashboard with API integration.
            </h3>
            <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
              Advance from static UI components to real-time client-server architecture. In this task, you will implement JWT token management, asynchronous REST API data fetching with optimistic updates, and role-based route guards.
            </p>
          </div>

          <div className="pt-2 flex flex-wrap items-center gap-3">
            <button
              onClick={() => navigate({ view: 'workspace', internshipId: 'frontend-developer' })}
              className="px-6 py-2.5 text-xs font-bold bg-[#3E51FF] hover:bg-[#3242D6] text-white rounded-xs transition-colors flex items-center gap-2 shadow-xs"
              id="btn-start-next-task"
            >
              <span>Launch Next Task Workspace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigate({ view: 'dashboard', tab: 'tasks' })}
              className="px-4 py-2.5 text-xs font-semibold text-white/90 hover:text-white hover:bg-white/10 rounded-xs transition-colors"
            >
              View Full Sprint Backlog
            </button>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 7. ACTION BUTTONS FOOTER */}
        {/* ========================================================================= */}
        <section className="bg-white border border-[#D5D3CB] rounded-sm p-5 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs" id="feedback-footer-actions">
          <div className="text-xs text-[#5A5C60] text-center sm:text-left">
            Ready to apply recommendations or move to your next milestone?
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            
            {/* BUTTON 1: View Project */}
            <button
              type="button"
              onClick={() => setIsPreviewModalOpen(true)}
              className="px-4 py-2.5 text-xs font-bold text-[#1A1C1E] bg-[#FAF9F7] hover:bg-[#EAE8E1] border border-[#D5D3CB] rounded-xs transition-colors flex items-center gap-2"
              id="btn-view-project-modal"
            >
              <Eye className="w-4 h-4 text-[#5A5C60]" />
              <span>View Project</span>
            </button>

            {/* BUTTON 2: Improve Submission */}
            <button
              type="button"
              onClick={() => setIsSubmissionModalOpen(true)}
              className="px-4 py-2.5 text-xs font-bold text-[#3E51FF] bg-[#EEF0FF] hover:bg-[#DCE1FF] border border-[#C5CAFF] rounded-xs transition-colors flex items-center gap-2"
              id="btn-improve-submission-modal"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Improve Submission</span>
            </button>

            {/* BUTTON 3: Continue Internship */}
            <button
              type="button"
              onClick={() => navigate({ view: 'workspace', internshipId: 'frontend-developer' })}
              className="px-6 py-2.5 text-xs font-bold text-white bg-[#1A1C1E] hover:bg-black rounded-xs transition-colors flex items-center gap-2 shadow-xs"
              id="btn-continue-internship"
            >
              <span>Continue Internship</span>
              <ChevronRight className="w-4 h-4" />
            </button>

          </div>
        </section>

      </main>

      {/* ========================================================================= */}
      {/* MODAL: LIVE PREVIEW SANDBOX MODAL */}
      {/* ========================================================================= */}
      {isPreviewModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6"
          onClick={() => setIsPreviewModalOpen(false)}
        >
          <div 
            className="bg-white border border-[#D5D3CB] rounded-sm shadow-2xl w-full max-w-4xl max-h-[92vh] flex flex-col overflow-hidden text-[#1A1C1E]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="px-6 py-3.5 border-b border-[#E5E3DC] bg-[#FAF9F7] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2.5">
                <Play className="w-4 h-4 text-[#3E51FF]" />
                <span className="text-xs font-bold text-[#1A1C1E]">
                  Live Project Sandbox: Responsive Product Page
                </span>
              </div>
              <button 
                onClick={() => setIsPreviewModalOpen(false)}
                className="p-1.5 text-[#8A8A85] hover:text-[#1A1C1E] hover:bg-[#EAE8E1] rounded-xs"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              <ProductPageLivePreview />
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: IMPROVE SUBMISSION EXPERIENCE MODAL */}
      {/* ========================================================================= */}
      {isSubmissionModalOpen && (
        <ProjectSubmissionExperience
          isOpen={isSubmissionModalOpen}
          onClose={() => setIsSubmissionModalOpen(false)}
          onConfirmSubmit={() => {
            setIsSubmissionModalOpen(false);
          }}
        />
      )}

    </div>
  );
};
