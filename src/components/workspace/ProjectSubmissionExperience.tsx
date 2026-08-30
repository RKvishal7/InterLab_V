import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  CheckCircle2, 
  GitPullRequest, 
  ExternalLink, 
  Github, 
  Globe, 
  FileText, 
  Image as ImageIcon, 
  AlertCircle, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  Award, 
  Upload, 
  Trash2, 
  FileCode, 
  FileArchive, 
  Check, 
  Clock, 
  ChevronRight, 
  Maximize2, 
  Download, 
  Share2, 
  Layers, 
  RotateCcw, 
  Eye, 
  Info,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export interface UploadedFileItem {
  id: string;
  name: string;
  size: string;
  type: string;
  uploadedAt: string;
}

export interface ScreenshotItem {
  id: string;
  title: string;
  url: string;
  tag: string;
}

interface ProjectSubmissionExperienceProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirmSubmit?: () => void;
  initialDeliverables?: {
    githubUrl?: string;
    liveUrl?: string;
    screenshots?: string[];
    documentation?: string;
  };
}

export const ProjectSubmissionExperience: React.FC<ProjectSubmissionExperienceProps> = ({
  isOpen,
  onClose,
  onConfirmSubmit,
  initialDeliverables,
}) => {
  const { navigate } = useApp();

  // Form Fields State
  const [projectTitle, setProjectTitle] = useState<string>(
    'Nova Labs: Responsive E-commerce Product Page'
  );
  const [projectDescription, setProjectDescription] = useState<string>(
    'A high-performance, accessible e-commerce product detail page built with React and Tailwind CSS, featuring interactive gallery viewports, color swatches, and optimistic cart updates.'
  );
  const [whatBuilt, setWhatBuilt] = useState<string>(
    `1. Responsive dual-column desktop layout that collapses smoothly to a single column on mobile devices.
2. Interactive product image gallery with smooth thumbnail transitions, active indicator styling, and full-resolution zoom.
3. Complete product metadata display including title, dynamically discounted pricing, customer rating stars, and specs.
4. Dynamic color swatches with active selection indicators and live price recalculations.
5. Interactive quantity selector with optimistic cart badge counter updates and visual toast alerts.
6. Enforced mobile touch targets (44x44px minimum) and zero cumulative layout shift (CLS).`
  );
  const [challengesFaced, setChallengesFaced] = useState<string>(
    `The primary engineering challenge was preventing Cumulative Layout Shift (CLS) when switching between high-resolution product variant images on mobile viewports, as well as managing accessible keyboard focus across color swatch radio groups without breaking standard form submissions.`
  );
  const [howSolved, setHowSolved] = useState<string>(
    `I solved the CLS issue by configuring fixed aspect-ratio containers using Tailwind's \`aspect-square\` along with image preloading and skeleton shimmer placeholders. For accessibility, I implemented proper WAI-ARIA \`role="radiogroup"\` and \`aria-checked\` attributes with roving tabindex for full keyboard arrow navigation.`
  );
  const [githubUrl, setGithubUrl] = useState<string>(
    initialDeliverables?.githubUrl || 'https://github.com/alex-dev/nova-ecommerce-product-page'
  );
  const [liveUrl, setLiveUrl] = useState<string>(
    initialDeliverables?.liveUrl || 'https://nova-headphones-demo.vercel.app'
  );

  // Uploaded Files State
  const [files, setFiles] = useState<UploadedFileItem[]>([
    {
      id: 'file-1',
      name: 'nova-ecommerce-source-v1.4.zip',
      size: '4.2 MB',
      type: 'ZIP Archive',
      uploadedAt: 'Just now',
    },
    {
      id: 'file-2',
      name: 'architecture-and-state-rfc.pdf',
      size: '1.1 MB',
      type: 'PDF Document',
      uploadedAt: '5m ago',
    },
    {
      id: 'file-3',
      name: 'lighthouse-performance-audit.json',
      size: '184 KB',
      type: 'JSON Report',
      uploadedAt: '12m ago',
    },
  ]);

  // Uploaded Screenshots State
  const [screenshots, setScreenshots] = useState<ScreenshotItem[]>([
    {
      id: 'screen-1',
      title: 'Desktop Viewport (1440px)',
      url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80',
      tag: 'Desktop Layout',
    },
    {
      id: 'screen-2',
      title: 'Mobile Viewport (390px)',
      url: 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80',
      tag: 'Mobile 390px',
    },
    {
      id: 'screen-3',
      title: 'Interactive Variant Swatches',
      url: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80',
      tag: 'UI States',
    },
  ]);

  // Checklist Completion
  const [isProjectCompletedChecked, setIsProjectCompletedChecked] = useState<boolean>(true);

  // Derived Checklist States
  const isRepoAdded = githubUrl.trim().length > 0 && githubUrl.includes('github.com');
  const isLiveDemoAdded = liveUrl.trim().length > 0 && (liveUrl.startsWith('http://') || liveUrl.startsWith('https://'));
  const isDocumentationIncluded = whatBuilt.trim().length > 30 && projectDescription.trim().length > 10;
  const isProjectCompleted = isProjectCompletedChecked;

  const isAllChecklistSatisfied = isProjectCompleted && isRepoAdded && isLiveDemoAdded && isDocumentationIncluded;

  // Post-Submission Process State
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [timelineStep, setTimelineStep] = useState<number>(0); // 0: not submitted, 1: Received, 2: Requirements, 3: Reviewing, 4: Feedback Ready
  const [activeAnalysisLog, setActiveAnalysisLog] = useState<string>('Initializing evaluation engine...');
  const [selectedPreviewImage, setSelectedPreviewImage] = useState<string | null>(null);

  // File Upload Handling
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const screenshotInputRef = useRef<HTMLInputElement | null>(null);
  const [isDraggingFiles, setIsDraggingFiles] = useState(false);
  const [isDraggingScreenshots, setIsDraggingScreenshots] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const newFiles: UploadedFileItem[] = Array.from(e.target.files).map((f: File, i: number) => ({
        id: `custom-file-${Date.now()}-${i}`,
        name: f.name,
        size: `${(f.size / (1024 * 1024)).toFixed(2)} MB`,
        type: f.type || 'Document/Archive',
        uploadedAt: 'Just now',
      }));
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const handleScreenshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const newScreen: ScreenshotItem = {
            id: `screen-${Date.now()}`,
            title: file.name.replace(/\.[^/.]+$/, ''),
            url: event.target.result as string,
            tag: 'Uploaded Image',
          };
          setScreenshots(prev => [...prev, newScreen]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const handleRemoveScreenshot = (id: string) => {
    setScreenshots(prev => prev.filter(s => s.id !== id));
  };

  // Submit Handler with Motivating, Meaningful Timeline Transitions
  const handleSubmitForReview = () => {
    setIsSubmitted(true);
    setTimelineStep(1); // Submission Received ✓
    setActiveAnalysisLog('Cryptographic hash generated. Payload securely registered at Nova Labs Registry.');

    // Step 2: Analyzing Requirements ✓
    setTimeout(() => {
      setTimelineStep(2);
      setActiveAnalysisLog('Auditing 5/5 task requirements: Responsive Layout, Image Gallery, Product Info, Cart State, Mobile Optimization.');
    }, 1200);

    // Step 3: Reviewing Implementation
    setTimeout(() => {
      setTimelineStep(3);
      setActiveAnalysisLog('Running AST static analysis, TypeScript strict checks, Lighthouse perf audit (98/100), and WCAG 2.1 AA contrast validation.');
    }, 2500);

    // Step 4: Preparing Feedback & Rubric
    setTimeout(() => {
      setTimelineStep(4);
      setActiveAnalysisLog('Synthesizing review rubric from Senior Frontend Engineer Sarah Chen. Unlocking Sprint 3 Task 2.');
      if (onConfirmSubmit) {
        onConfirmSubmit();
      }
    }, 4200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="bg-white border border-[#D5D3CB] rounded-sm shadow-2xl w-full max-w-4xl max-h-[94vh] flex flex-col overflow-hidden text-[#1A1C1E] my-auto"
        onClick={(e) => e.stopPropagation()}
        id="project-submission-modal-container"
      >
        
        {/* ========================================================================= */}
        {/* TOP BAR / HEADER */}
        {/* ========================================================================= */}
        <div className="px-5 sm:px-8 py-4 border-b border-[#E5E3DC] bg-[#FAF9F7] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xs bg-[#1A1C1E] text-white flex items-center justify-center font-bold text-xs">
              <GitPullRequest className="w-4 h-4 text-[#8898FF]" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[11px] font-mono uppercase tracking-wider bg-[#EEF0FF] text-[#3E51FF] font-bold px-2 py-0.5 rounded-xs">
                  Sprint 3 • Task 1
                </span>
                <span className="text-xs text-[#8A8A85] hidden sm:inline">•</span>
                <span className="text-xs text-[#5A5C60] font-mono hidden sm:inline">
                  Nova Labs Frontend Developer
                </span>
              </div>
              <h1 className="text-lg sm:text-xl font-extrabold text-[#1A1C1E] tracking-tight">
                Submit Your Work
              </h1>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="p-2 text-[#8A8A85] hover:text-[#1A1C1E] hover:bg-[#EAE8E1] rounded-xs transition-colors"
            title="Close Submission Form"
            id="btn-close-submission-experience"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* ========================================================================= */}
        {/* MAIN BODY: FORM VIEW OR POST-SUBMISSION CONFIRMATION TIMELINE */}
        {/* ========================================================================= */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-8 space-y-8">
          
          {!isSubmitted ? (
            /* ===================================================================== */
            /* 1. EDITABLE SUBMISSION FORM */
            /* ===================================================================== */
            <div className="space-y-8 max-w-3xl mx-auto">
              
              {/* Introduction Notice */}
              <div className="p-4 bg-[#F4F3EF] border border-[#E5E3DC] rounded-xs flex items-start gap-3">
                <Info className="w-4 h-4 text-[#3E51FF] shrink-0 mt-0.5" />
                <div className="text-xs text-[#5A5C60] leading-relaxed">
                  Provide your completed project repository link, live demo deployment, reflections, and deliverables below. Once submitted, your code and architecture write-up will undergo simulated evaluation and senior peer review.
                </div>
              </div>

              {/* FIELD 1: Project Title */}
              <div className="space-y-1.5" id="field-project-title">
                <label className="text-xs font-bold text-[#1A1C1E] uppercase tracking-wider font-mono flex items-center justify-between">
                  <span>Project Title <span className="text-red-500">*</span></span>
                  <span className="text-[10px] text-[#8A8A85] lowercase font-normal">required</span>
                </label>
                <input
                  type="text"
                  value={projectTitle}
                  onChange={(e) => setProjectTitle(e.target.value)}
                  placeholder="e.g. Nova Labs: Responsive E-commerce Product Page"
                  className="w-full px-3.5 py-2.5 text-xs sm:text-sm font-medium bg-[#FAF9F7] border border-[#D5D3CB] focus:border-[#3E51FF] focus:bg-white rounded-xs transition-colors outline-none"
                  id="input-project-title"
                />
              </div>

              {/* FIELD 2: Project Description */}
              <div className="space-y-1.5" id="field-project-description">
                <label className="text-xs font-bold text-[#1A1C1E] uppercase tracking-wider font-mono flex items-center justify-between">
                  <span>Project Description <span className="text-red-500">*</span></span>
                  <span className="text-[10px] text-[#8A8A85] lowercase font-normal">high-level summary</span>
                </label>
                <textarea
                  rows={2}
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                  placeholder="Summarize the core functionality and scope of what was accomplished..."
                  className="w-full p-3 text-xs sm:text-sm bg-[#FAF9F7] border border-[#D5D3CB] focus:border-[#3E51FF] focus:bg-white rounded-xs transition-colors outline-none resize-y"
                  id="input-project-description"
                />
              </div>

              {/* FIELD 3: What did you build? */}
              <div className="space-y-1.5" id="field-what-did-you-build">
                <label className="text-xs font-bold text-[#1A1C1E] uppercase tracking-wider font-mono flex items-center justify-between">
                  <span>What did you build? <span className="text-red-500">*</span></span>
                  <span className="text-[10px] text-[#8A8A85] lowercase font-normal">key features, components & layout</span>
                </label>
                <textarea
                  rows={4}
                  value={whatBuilt}
                  onChange={(e) => setWhatBuilt(e.target.value)}
                  placeholder="List the specific components, interactive mechanisms, responsive behavior, and technical features you developed..."
                  className="w-full p-3 font-mono text-xs bg-[#FAF9F7] border border-[#D5D3CB] focus:border-[#3E51FF] focus:bg-white rounded-xs transition-colors outline-none resize-y leading-relaxed"
                  id="input-what-did-you-build"
                />
              </div>

              {/* FIELD 4 & 5: Challenges Faced & How did you solve them? (Grid) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* FIELD 4: Challenges Faced */}
                <div className="space-y-1.5" id="field-challenges-faced">
                  <label className="text-xs font-bold text-[#1A1C1E] uppercase tracking-wider font-mono flex items-center justify-between">
                    <span>Challenges Faced</span>
                    <span className="text-[10px] text-[#8A8A85] lowercase font-normal">technical hurdles</span>
                  </label>
                  <textarea
                    rows={4}
                    value={challengesFaced}
                    onChange={(e) => setChallengesFaced(e.target.value)}
                    placeholder="Describe any edge cases, layout shifts, or performance hurdles encountered during development..."
                    className="w-full p-3 text-xs bg-[#FAF9F7] border border-[#D5D3CB] focus:border-[#3E51FF] focus:bg-white rounded-xs transition-colors outline-none resize-y leading-relaxed"
                    id="input-challenges-faced"
                  />
                </div>

                {/* FIELD 5: How did you solve them? */}
                <div className="space-y-1.5" id="field-how-did-you-solve">
                  <label className="text-xs font-bold text-[#1A1C1E] uppercase tracking-wider font-mono flex items-center justify-between">
                    <span>How did you solve them?</span>
                    <span className="text-[10px] text-[#8A8A85] lowercase font-normal">architectural solutions</span>
                  </label>
                  <textarea
                    rows={4}
                    value={howSolved}
                    onChange={(e) => setHowSolved(e.target.value)}
                    placeholder="Detail the technical decisions, algorithms, CSS techniques, or refactorings you applied..."
                    className="w-full p-3 text-xs bg-[#FAF9F7] border border-[#D5D3CB] focus:border-[#3E51FF] focus:bg-white rounded-xs transition-colors outline-none resize-y leading-relaxed"
                    id="input-how-did-you-solve"
                  />
                </div>
              </div>

              {/* FIELD 6 & 7: GitHub Repository URL & Live Project URL */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* FIELD 6: GitHub Repository URL */}
                <div className="space-y-1.5" id="field-github-url">
                  <label className="text-xs font-bold text-[#1A1C1E] uppercase tracking-wider font-mono flex items-center gap-2">
                    <Github className="w-3.5 h-3.5 text-[#1A1C1E]" />
                    <span>GitHub Repository URL <span className="text-red-500">*</span></span>
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      placeholder="https://github.com/username/project-repo"
                      className="w-full pl-3.5 pr-8 py-2.5 text-xs font-mono bg-[#FAF9F7] border border-[#D5D3CB] focus:border-[#3E51FF] focus:bg-white rounded-xs transition-colors outline-none"
                      id="input-github-repo-url"
                    />
                    {isRepoAdded && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 absolute right-2.5 top-1/2 -translate-y-1/2" />
                    )}
                  </div>
                  <p className="text-[11px] text-[#8A8A85]">
                    Must be a publicly accessible repository with commit history.
                  </p>
                </div>

                {/* FIELD 7: Live Project URL */}
                <div className="space-y-1.5" id="field-live-url">
                  <label className="text-xs font-bold text-[#1A1C1E] uppercase tracking-wider font-mono flex items-center gap-2">
                    <Globe className="w-3.5 h-3.5 text-[#3E51FF]" />
                    <span>Live Project URL <span className="text-red-500">*</span></span>
                  </label>
                  <div className="relative">
                    <input
                      type="url"
                      value={liveUrl}
                      onChange={(e) => setLiveUrl(e.target.value)}
                      placeholder="https://your-project.vercel.app"
                      className="w-full pl-3.5 pr-8 py-2.5 text-xs font-mono bg-[#FAF9F7] border border-[#D5D3CB] focus:border-[#3E51FF] focus:bg-white rounded-xs transition-colors outline-none"
                      id="input-live-project-url"
                    />
                    {isLiveDemoAdded && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 absolute right-2.5 top-1/2 -translate-y-1/2" />
                    )}
                  </div>
                  <p className="text-[11px] text-[#8A8A85]">
                    Hosted demo on Vercel, Netlify, Cloud Run, or GitHub Pages.
                  </p>
                </div>
              </div>

              {/* FIELD 8: Upload Files */}
              <div className="space-y-3" id="field-upload-files">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#1A1C1E] uppercase tracking-wider font-mono flex items-center gap-2">
                    <FileArchive className="w-3.5 h-3.5 text-[#1A1C1E]" />
                    <span>Upload Files</span>
                  </label>
                  <span className="text-[11px] font-mono text-[#8A8A85]">
                    {files.length} file(s) attached
                  </span>
                </div>

                {/* Dropzone for Files */}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  multiple
                  className="hidden"
                  id="hidden-file-input"
                />
                
                <div
                  onClick={() => fileInputRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); setIsDraggingFiles(true); }}
                  onDragLeave={() => setIsDraggingFiles(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDraggingFiles(false);
                    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                      const newFiles: UploadedFileItem[] = Array.from(e.dataTransfer.files).map((f: File, i: number) => ({
                        id: `drag-file-${Date.now()}-${i}`,
                        name: f.name,
                        size: `${(f.size / (1024 * 1024)).toFixed(2)} MB`,
                        type: f.type || 'Document/Archive',
                        uploadedAt: 'Just now',
                      }));
                      setFiles(prev => [...prev, ...newFiles]);
                    }
                  }}
                  className={`border-2 border-dashed ${
                    isDraggingFiles ? 'border-[#3E51FF] bg-[#EEF0FF]' : 'border-[#D5D3CB] hover:border-[#8A8A85] bg-[#FAF9F7]'
                  } p-5 rounded-xs text-center cursor-pointer transition-colors space-y-1.5`}
                  id="dropzone-upload-files"
                >
                  <Upload className="w-5 h-5 text-[#8A8A85] mx-auto" />
                  <div className="text-xs font-bold text-[#1A1C1E]">
                    Drag and drop source packages or click to browse
                  </div>
                  <div className="text-[11px] text-[#8A8A85]">
                    Supports .zip, .tar.gz, .pdf, .json, .md files (up to 25MB each)
                  </div>
                </div>

                {/* Uploaded Files List */}
                {files.length > 0 && (
                  <div className="space-y-2 pt-1">
                    {files.map((file) => (
                      <div 
                        key={file.id} 
                        className="p-2.5 bg-[#FAF9F7] border border-[#E5E3DC] rounded-xs flex items-center justify-between text-xs"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <FileCode className="w-4 h-4 text-[#3E51FF] shrink-0" />
                          <div className="min-w-0">
                            <div className="font-mono font-medium text-[#1A1C1E] truncate max-w-xs sm:max-w-md">
                              {file.name}
                            </div>
                            <div className="text-[10px] text-[#8A8A85]">
                              {file.size} • {file.type} • {file.uploadedAt}
                            </div>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveFile(file.id)}
                          className="p-1 text-[#8A8A85] hover:text-red-600 hover:bg-red-50 rounded-xs transition-colors shrink-0"
                          title="Remove file"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* FIELD 9: Upload Screenshots */}
              <div className="space-y-3" id="field-upload-screenshots">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-[#1A1C1E] uppercase tracking-wider font-mono flex items-center gap-2">
                    <ImageIcon className="w-3.5 h-3.5 text-[#1A1C1E]" />
                    <span>Upload Screenshots</span>
                  </label>
                  <span className="text-[11px] font-mono text-[#8A8A85]">
                    {screenshots.length} screenshot(s) attached
                  </span>
                </div>

                {/* Dropzone for Screenshots */}
                <input
                  type="file"
                  ref={screenshotInputRef}
                  onChange={handleScreenshotUpload}
                  accept="image/*"
                  className="hidden"
                  id="hidden-screenshot-input"
                />

                <div
                  onClick={() => screenshotInputRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault(); setIsDraggingScreenshots(true); }}
                  onDragLeave={() => setIsDraggingScreenshots(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDraggingScreenshots(false);
                    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
                      const file = e.dataTransfer.files[0];
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        if (event.target?.result) {
                          setScreenshots(prev => [
                            ...prev,
                            {
                              id: `drag-screen-${Date.now()}`,
                              title: file.name.replace(/\.[^/.]+$/, ''),
                              url: event.target.result as string,
                              tag: 'Dropped Screenshot',
                            }
                          ]);
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className={`border-2 border-dashed ${
                    isDraggingScreenshots ? 'border-[#3E51FF] bg-[#EEF0FF]' : 'border-[#D5D3CB] hover:border-[#8A8A85] bg-[#FAF9F7]'
                  } p-5 rounded-xs text-center cursor-pointer transition-colors space-y-1.5`}
                  id="dropzone-upload-screenshots"
                >
                  <Upload className="w-5 h-5 text-[#8A8A85] mx-auto" />
                  <div className="text-xs font-bold text-[#1A1C1E]">
                    Drag and drop UI screenshots or click to browse
                  </div>
                  <div className="text-[11px] text-[#8A8A85]">
                    PNG, JPG, or WebP captures of desktop, tablet, and mobile views
                  </div>
                </div>

                {/* Screenshots Gallery Grid */}
                {screenshots.length > 0 && (
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                    {screenshots.map((screen) => (
                      <div 
                        key={screen.id} 
                        className="bg-[#FAF9F7] border border-[#E5E3DC] rounded-xs overflow-hidden group relative"
                      >
                        <div className="aspect-video bg-[#EAE8E1] overflow-hidden relative">
                          <img 
                            src={screen.url} 
                            alt={screen.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 transition-opacity">
                            <button
                              type="button"
                              onClick={() => setSelectedPreviewImage(screen.url)}
                              className="p-1.5 bg-white/90 text-[#1A1C1E] rounded-xs hover:bg-white transition-colors"
                              title="Preview full image"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleRemoveScreenshot(screen.id)}
                              className="p-1.5 bg-white/90 text-red-600 rounded-xs hover:bg-white transition-colors"
                              title="Remove screenshot"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                        <div className="p-2 flex items-center justify-between text-[11px]">
                          <span className="font-semibold text-[#1A1C1E] truncate max-w-[140px]">
                            {screen.title}
                          </span>
                          <span className="font-mono text-[9px] uppercase px-1 py-0.2 bg-[#EAE8E1] text-[#5A5C60] rounded-xs">
                            {screen.tag}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* =================================================================== */}
              {/* CHECKLIST BEFORE SUBMISSION */}
              {/* =================================================================== */}
              <div className="bg-[#FAF9F7] border-2 border-[#D5D3CB] rounded-sm p-5 space-y-4" id="pre-submission-checklist-card">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1A1C1E] flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-[#3E51FF]" />
                      <span>Pre-Submission Checklist</span>
                    </h3>
                    <p className="text-[11px] text-[#5A5C60] mt-0.5">
                      Verify all deliverable criteria before submitting your task for evaluation.
                    </p>
                  </div>
                  <span className="text-xs font-mono font-bold text-[#3E51FF] bg-[#EEF0FF] px-2 py-0.5 rounded-xs border border-[#C5CAFF]">
                    {[isProjectCompleted, isRepoAdded, isLiveDemoAdded, isDocumentationIncluded].filter(Boolean).length}/4 Complete
                  </span>
                </div>

                <div className="space-y-2.5 pt-1">
                  
                  {/* Checklist 1: Project completed */}
                  <div 
                    onClick={() => setIsProjectCompletedChecked(prev => !prev)}
                    className="p-3 bg-white border border-[#E5E3DC] rounded-xs flex items-center justify-between cursor-pointer hover:border-[#3E51FF] transition-colors"
                    id="checklist-item-project-completed"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-xs flex items-center justify-center border transition-colors ${
                        isProjectCompleted ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-[#D5D3CB] bg-[#FAF9F7]'
                      }`}>
                        {isProjectCompleted && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#1A1C1E]">
                          ✓ Project completed
                        </div>
                        <div className="text-[11px] text-[#5A5C60]">
                          All 5 sprint requirements implemented and tested locally
                        </div>
                      </div>
                    </div>
                    <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-xs ${
                      isProjectCompleted ? 'bg-emerald-50 text-emerald-700' : 'bg-[#F2F1EE] text-[#8A8A85]'
                    }`}>
                      {isProjectCompleted ? 'Verified' : 'Click to Check'}
                    </span>
                  </div>

                  {/* Checklist 2: Repository added */}
                  <div 
                    className="p-3 bg-white border border-[#E5E3DC] rounded-xs flex items-center justify-between"
                    id="checklist-item-repo-added"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-xs flex items-center justify-center border transition-colors ${
                        isRepoAdded ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-[#D5D3CB] bg-[#FAF9F7]'
                      }`}>
                        {isRepoAdded && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#1A1C1E]">
                          ✓ Repository added
                        </div>
                        <div className="text-[11px] text-[#5A5C60] font-mono truncate max-w-xs sm:max-w-md">
                          {isRepoAdded ? githubUrl : 'Please enter a valid GitHub repository URL above'}
                        </div>
                      </div>
                    </div>
                    <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-xs ${
                      isRepoAdded ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {isRepoAdded ? 'Ready' : 'Missing'}
                    </span>
                  </div>

                  {/* Checklist 3: Live demo added */}
                  <div 
                    className="p-3 bg-white border border-[#E5E3DC] rounded-xs flex items-center justify-between"
                    id="checklist-item-live-demo-added"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-xs flex items-center justify-center border transition-colors ${
                        isLiveDemoAdded ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-[#D5D3CB] bg-[#FAF9F7]'
                      }`}>
                        {isLiveDemoAdded && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#1A1C1E]">
                          ✓ Live demo added
                        </div>
                        <div className="text-[11px] text-[#5A5C60] font-mono truncate max-w-xs sm:max-w-md">
                          {isLiveDemoAdded ? liveUrl : 'Please enter a valid live deployment URL above'}
                        </div>
                      </div>
                    </div>
                    <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-xs ${
                      isLiveDemoAdded ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {isLiveDemoAdded ? 'Ready' : 'Missing'}
                    </span>
                  </div>

                  {/* Checklist 4: Documentation included */}
                  <div 
                    className="p-3 bg-white border border-[#E5E3DC] rounded-xs flex items-center justify-between"
                    id="checklist-item-docs-included"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-xs flex items-center justify-center border transition-colors ${
                        isDocumentationIncluded ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-[#D5D3CB] bg-[#FAF9F7]'
                      }`}>
                        {isDocumentationIncluded && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#1A1C1E]">
                          ✓ Documentation included
                        </div>
                        <div className="text-[11px] text-[#5A5C60]">
                          {isDocumentationIncluded ? `${whatBuilt.length + projectDescription.length} characters written` : 'Please complete the description & build details'}
                        </div>
                      </div>
                    </div>
                    <span className={`text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded-xs ${
                      isDocumentationIncluded ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                    }`}>
                      {isDocumentationIncluded ? 'Ready' : 'Incomplete'}
                    </span>
                  </div>

                </div>
              </div>

            </div>
          ) : (
            /* ===================================================================== */
            /* 2. MEANINGFUL, MOTIVATING PROCESSING TIMELINE & CONFIRMATION STATE */
            /* ===================================================================== */
            <div className="space-y-8 max-w-2xl mx-auto py-2 animate-in fade-in duration-300">
              
              {/* Top Confirmation Header */}
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-xs">
                  <CheckCircle2 className="w-6 h-6 stroke-[2.5]" />
                </div>
                <h2 className="text-2xl font-extrabold text-[#1A1C1E] tracking-tight">
                  Your project has been submitted.
                </h2>
                <p className="text-sm text-[#5A5C60] font-medium">
                  Our evaluation system is reviewing your work.
                </p>
              </div>

              {/* MOTIVATING PROCESSING TIMELINE */}
              <div className="bg-[#FAF9F7] border border-[#D5D3CB] rounded-sm p-6 space-y-6 shadow-xs">
                <div className="flex items-center justify-between border-b border-[#E5E3DC] pb-3">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#1A1C1E]">
                    Evaluation Timeline & Verification
                  </span>
                  <span className="text-xs font-mono text-[#3E51FF] font-bold">
                    {timelineStep >= 4 ? 'Status: Complete (100%)' : `Stage ${timelineStep} of 4`}
                  </span>
                </div>

                {/* Timeline Step Items */}
                <div className="space-y-5">
                  
                  {/* Step 1: Submission Received ✓ */}
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                        timelineStep >= 1 ? 'bg-emerald-600 text-white' : 'bg-[#EAE8E1] text-[#8A8A85]'
                      }`}>
                        {timelineStep >= 1 ? <Check className="w-4 h-4 stroke-[3]" /> : '1'}
                      </div>
                      <div className={`w-0.5 h-8 my-1 transition-colors ${
                        timelineStep > 1 ? 'bg-emerald-600' : 'bg-[#E5E3DC]'
                      }`} />
                    </div>
                    <div className="pt-1 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs sm:text-sm font-bold text-[#1A1C1E]">
                          Submission Received ✓
                        </span>
                        <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-xs">
                          Validated
                        </span>
                      </div>
                      <p className="text-[11px] text-[#5A5C60] mt-0.5">
                        GitHub repo and build payload registered under timestamp {new Date().toLocaleTimeString()}.
                      </p>
                    </div>
                  </div>

                  {/* Step 2: Analyzing Requirements ✓ */}
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                        timelineStep >= 2 ? 'bg-emerald-600 text-white' : 'bg-[#EAE8E1] text-[#8A8A85]'
                      }`}>
                        {timelineStep >= 2 ? <Check className="w-4 h-4 stroke-[3]" /> : '2'}
                      </div>
                      <div className={`w-0.5 h-8 my-1 transition-colors ${
                        timelineStep > 2 ? 'bg-emerald-600' : 'bg-[#E5E3DC]'
                      }`} />
                    </div>
                    <div className="pt-1 flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs sm:text-sm font-bold ${
                          timelineStep >= 2 ? 'text-[#1A1C1E]' : 'text-[#8A8A85]'
                        }`}>
                          Analyzing Requirements {timelineStep >= 2 ? '✓' : ''}
                        </span>
                        {timelineStep >= 2 ? (
                          <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-xs">
                            5/5 Checked
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono text-[#8A8A85]">
                            Pending
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#5A5C60] mt-0.5">
                        Auditing responsive layout, image gallery swatches, cart state logic, and mobile touch targets.
                      </p>
                    </div>
                  </div>

                  {/* Step 3: Reviewing Implementation */}
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                        timelineStep >= 3 
                          ? timelineStep > 3 
                            ? 'bg-emerald-600 text-white' 
                            : 'bg-[#3E51FF] text-white ring-4 ring-[#EEF0FF]'
                          : 'bg-[#EAE8E1] text-[#8A8A85]'
                      }`}>
                        {timelineStep > 3 ? (
                          <Check className="w-4 h-4 stroke-[3]" />
                        ) : timelineStep === 3 ? (
                          <div className="w-2.5 h-2.5 bg-white rounded-full animate-ping" />
                        ) : (
                          '3'
                        )}
                      </div>
                      <div className={`w-0.5 h-8 my-1 transition-colors ${
                        timelineStep > 3 ? 'bg-emerald-600' : 'bg-[#E5E3DC]'
                      }`} />
                    </div>
                    <div className="pt-1 flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs sm:text-sm font-bold ${
                          timelineStep >= 3 ? 'text-[#1A1C1E]' : 'text-[#8A8A85]'
                        }`}>
                          Reviewing Implementation {timelineStep > 3 ? '✓' : ''}
                        </span>
                        {timelineStep === 3 ? (
                          <span className="text-[10px] font-mono text-[#3E51FF] bg-[#EEF0FF] px-2 py-0.5 rounded-xs font-bold animate-pulse">
                            In Progress...
                          </span>
                        ) : timelineStep > 3 ? (
                          <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-xs">
                            Score 96/100
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono text-[#8A8A85]">
                            Waiting
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#5A5C60] mt-0.5">
                        Performing static analysis, Core Web Vitals audit, and WCAG AA accessibility compliance scan.
                      </p>
                    </div>
                  </div>

                  {/* Step 4: Preparing Feedback */}
                  <div className="flex items-start gap-4">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shrink-0 transition-colors ${
                        timelineStep >= 4 
                          ? 'bg-emerald-600 text-white' 
                          : timelineStep === 3 
                            ? 'bg-[#EEF0FF] text-[#3E51FF] border border-[#C5CAFF]' 
                            : 'bg-[#EAE8E1] text-[#8A8A85]'
                      }`}>
                        {timelineStep >= 4 ? <Check className="w-4 h-4 stroke-[3]" /> : '4'}
                      </div>
                    </div>
                    <div className="pt-1 flex-1">
                      <div className="flex items-center justify-between">
                        <span className={`text-xs sm:text-sm font-bold ${
                          timelineStep >= 4 ? 'text-[#1A1C1E]' : 'text-[#8A8A85]'
                        }`}>
                          Preparing Feedback {timelineStep >= 4 ? '✓' : ''}
                        </span>
                        {timelineStep >= 4 ? (
                          <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-xs font-bold">
                            Feedback Ready
                          </span>
                        ) : (
                          <span className="text-[10px] font-mono text-[#8A8A85]">
                            Queued
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-[#5A5C60] mt-0.5">
                        Compiling comprehensive code review notes from Senior Frontend Engineer Sarah Chen.
                      </p>
                    </div>
                  </div>

                </div>

                {/* Real-time Telemetry Log Strip */}
                <div className="p-3 bg-[#1A1C1E] text-white rounded-xs font-mono text-[11px] flex items-center gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
                  <div className="truncate text-emerald-200">
                    <span className="text-[#8898FF] font-bold">NovaEngine:</span> {activeAnalysisLog}
                  </div>
                </div>
              </div>

              {/* WHEN EVALUATION IS COMPLETE (Step 4) */}
              {timelineStep >= 4 && (
                <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  
                  {/* Senior Reviewer Card */}
                  <div className="p-5 bg-white border border-[#D5D3CB] rounded-sm space-y-3 shadow-2xs">
                    <div className="flex items-center justify-between border-b border-[#E5E3DC] pb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-[#EEF0FF] border border-[#C5CAFF] flex items-center justify-center font-bold text-xs text-[#3E51FF]">
                          SC
                        </div>
                        <div>
                          <div className="text-xs font-bold text-[#1A1C1E]">Sarah Chen</div>
                          <div className="text-[10px] text-[#5A5C60]">Senior Frontend Engineer • Nova Labs</div>
                        </div>
                      </div>
                      <span className="text-xs font-mono font-bold bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-xs border border-emerald-200">
                        Score: 96 / 100 (Exemplary)
                      </span>
                    </div>

                    <blockquote className="text-xs sm:text-sm text-[#1A1C1E] leading-relaxed italic border-l-2 border-[#3E51FF] pl-3 py-0.5">
                      "Terrific implementation! The component decomposition between gallery states and color swatches is clean and maintainable. Your attention to zero cumulative layout shift and strict 44px mobile touch targets directly matches production quality standards."
                    </blockquote>

                    {/* Rubric Breakdown Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-[11px] font-mono">
                      <div className="p-2 bg-[#FAF9F7] border border-[#E5E3DC] rounded-xs">
                        <div className="text-[#8A8A85]">Responsive UI</div>
                        <div className="text-xs font-bold text-emerald-700 mt-0.5">100 / 100</div>
                      </div>
                      <div className="p-2 bg-[#FAF9F7] border border-[#E5E3DC] rounded-xs">
                        <div className="text-[#8A8A85]">Code Quality</div>
                        <div className="text-xs font-bold text-emerald-700 mt-0.5">96 / 100</div>
                      </div>
                      <div className="p-2 bg-[#FAF9F7] border border-[#E5E3DC] rounded-xs">
                        <div className="text-[#8A8A85]">Architecture</div>
                        <div className="text-xs font-bold text-emerald-700 mt-0.5">94 / 100</div>
                      </div>
                      <div className="p-2 bg-[#FAF9F7] border border-[#E5E3DC] rounded-xs">
                        <div className="text-[#8A8A85]">Accessibility</div>
                        <div className="text-xs font-bold text-emerald-700 mt-0.5">95 / 100</div>
                      </div>
                    </div>
                  </div>

                  {/* Career Progress & Unlocks */}
                  <div className="p-4 bg-[#EEF0FF] border border-[#C5CAFF] rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xs bg-[#3E51FF] text-white flex items-center justify-center shrink-0">
                        <Award className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#1A1C1E]">
                          Sprint 3 Milestone Unlocked: Task 2 Available
                        </div>
                        <div className="text-[11px] text-[#3E51FF] font-medium">
                          +250 XP earned • Score: 84/100 • Evaluated by Senior Engineer
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <button
                        onClick={() => {
                          onClose();
                          navigate({ view: 'project-feedback' });
                        }}
                        className="flex-1 sm:flex-initial px-3.5 py-1.5 text-xs font-bold bg-[#1A1C1E] hover:bg-black text-white rounded-xs transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                      >
                        <span>View Project Review</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          onClose();
                          navigate({ view: 'dashboard', tab: 'projects' });
                        }}
                        className="px-3 py-1.5 text-xs font-semibold text-[#5A5C60] hover:text-[#1A1C1E] hover:bg-[#EAE8E1] rounded-xs transition-colors"
                      >
                        <span>Portfolio</span>
                      </button>
                    </div>
                  </div>

                </div>
              )}

            </div>
          )}

        </div>

        {/* ========================================================================= */}
        {/* FOOTER ACTIONS */}
        {/* ========================================================================= */}
        <div className="px-5 sm:px-8 py-4 border-t border-[#E5E3DC] bg-[#FAF9F7] flex items-center justify-between shrink-0">
          {!isSubmitted ? (
            <>
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-semibold text-[#5A5C60] hover:text-[#1A1C1E] hover:bg-[#EAE8E1] rounded-xs transition-colors"
                id="btn-submission-cancel"
              >
                Back to Workspace
              </button>

              <div className="flex items-center gap-3">
                {!isAllChecklistSatisfied && (
                  <span className="text-[11px] text-amber-700 hidden sm:inline">
                    Please fulfill the checklist requirements above
                  </span>
                )}
                <button
                  type="button"
                  disabled={!isAllChecklistSatisfied}
                  onClick={handleSubmitForReview}
                  className="px-6 py-2.5 text-xs font-bold bg-[#1A1C1E] hover:bg-black disabled:bg-[#D5D3CB] disabled:text-[#8A8A85] disabled:cursor-not-allowed text-white rounded-xs transition-all flex items-center gap-2 shadow-xs"
                  id="btn-submit-for-review"
                >
                  <span>Submit for Review</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </>
          ) : (
            <div className="w-full flex items-center justify-between">
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setTimelineStep(0);
                }}
                className="px-3 py-2 text-xs font-medium text-[#5A5C60] hover:text-[#1A1C1E] flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Edit Submission</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-6 py-2.5 text-xs font-bold bg-[#1A1C1E] hover:bg-black text-white rounded-xs transition-colors flex items-center gap-2 shadow-xs"
                id="btn-return-workspace-after-submission"
              >
                <span>Return to Workspace</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

      </div>

      {/* Screenshot Lightbox Modal */}
      {selectedPreviewImage && (
        <div 
          className="fixed inset-0 z-60 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setSelectedPreviewImage(null)}
        >
          <div className="relative max-w-4xl max-h-[85vh] bg-white rounded-xs overflow-hidden p-2">
            <img 
              src={selectedPreviewImage} 
              alt="Screenshot Preview" 
              className="max-h-[80vh] w-auto object-contain mx-auto" 
            />
            <button
              onClick={() => setSelectedPreviewImage(null)}
              className="absolute top-4 right-4 p-2 bg-black/70 text-white rounded-full hover:bg-black transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
