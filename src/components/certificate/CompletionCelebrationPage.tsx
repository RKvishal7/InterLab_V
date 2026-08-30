import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { CERTIFICATE_REGISTRY } from '../../data/certificateRegistry';
import { CertificateCanvas } from './CertificateCanvas';
import { 
  CheckCircle2, 
  Award, 
  Download, 
  Share2, 
  Linkedin, 
  Clock, 
  FolderCheck, 
  TrendingUp, 
  Sparkles, 
  ChevronRight, 
  Copy, 
  Check, 
  ExternalLink,
  ShieldCheck,
  Compass,
  ArrowRight
} from 'lucide-react';

interface CompletionCelebrationPageProps {
  internshipId?: string;
}

export const CompletionCelebrationPage: React.FC<CompletionCelebrationPageProps> = ({
  internshipId = 'IL-2026-948210',
}) => {
  const { navigate, userProfile, openMentor } = useApp();
  const [copiedLink, setCopiedLink] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [linkedInAdded, setLinkedInAdded] = useState(false);

  // Retrieve current certificate or fallback to Nova Labs Frontend
  const certificate = CERTIFICATE_REGISTRY[internshipId] || CERTIFICATE_REGISTRY['IL-2026-948210'];

  const handleCopyLink = () => {
    const url = `${window.location.origin}/?view=verify-certificate&id=${certificate.certificateId}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      // Trigger a clean browser print or PDF dialog
      window.print();
    }, 600);
  };

  const handleLinkedInShare = () => {
    setLinkedInAdded(true);
    const orgName = encodeURIComponent('InternLab & Nova Labs');
    const certName = encodeURIComponent(certificate.internshipTitle);
    const certUrl = encodeURIComponent(`https://internlab.dev/verify/${certificate.certificateId}`);
    const linkedInUrl = `https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${certName}&organizationName=${orgName}&issueYear=2026&issueMonth=8&certUrl=${certUrl}&certId=${certificate.certificateId}`;
    
    // In iframe or sandboxed tab, copy text and open or alert
    navigator.clipboard.writeText(
      `Excited to share that I've completed the ${certificate.internshipTitle} at ${certificate.company} via InternLab! 🚀\n\nFinal Score: ${certificate.finalScore}%\nDuration: 4 Weeks (38.5 Hours Logged)\nCredential ID: ${certificate.certificateId}\nVerified at: https://internlab.dev/verify/${certificate.certificateId}`
    );
    window.open(linkedInUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#1A1C1E] font-sans selection:bg-[#EEF0FF] selection:text-[#3E51FF] pb-16">
      
      {/* Top Banner Accent */}
      <div className="bg-[#1A1C1E] text-white py-3 px-4 border-b border-[#3A3C40] print:hidden">
        <div className="max-w-6xl mx-auto flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-bold">ALL REQUIREMENTS VERIFIED</span>
            <span className="text-[#8E9094] hidden sm:inline">• Rubric Evaluation Signed by {certificate.signature.signerName}</span>
          </div>
          <button
            onClick={() => navigate({ view: 'verify-certificate', certificateId: certificate.certificateId })}
            className="hover:underline flex items-center gap-1 text-[#8898FF]"
          >
            <span>Public Verification Page</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-8 sm:pt-12 space-y-10">
        
        {/* =========================================================================
            1. COMPLETION HEADER & HEADLINES (Exact wording requested)
            ========================================================================= */}
        <section className="text-center space-y-4 print:hidden" id="completion-header">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-mono font-bold shadow-2xs">
            <CheckCircle2 className="w-4 h-4 text-emerald-700" />
            <span>Internship Graduation Complete</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#1A1C1E] tracking-tight">
            You completed your internship.
          </h1>

          <p className="text-base sm:text-lg text-[#5A5C60] max-w-2xl mx-auto font-medium">
            You successfully completed the <span className="text-[#1A1C1E] font-bold">Frontend Developer Virtual Internship</span>.
          </p>
        </section>

        {/* =========================================================================
            2. KEY MILESTONES SUMMARY BAR (Display: Duration, Projects, Final Score, Skills)
            ========================================================================= */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-3.5 print:hidden" id="completion-metrics-bar">
          
          {/* Duration Completed */}
          <div className="bg-white border border-[#E2E2DE] rounded-md p-4 shadow-xs">
            <div className="flex items-center gap-2 text-xs text-[#5A5C60] font-mono mb-1">
              <Clock className="w-3.5 h-3.5 text-[#3E51FF]" />
              <span>Duration Completed</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-[#1A1C1E] font-mono">
              {certificate.durationWeeks} Weeks
            </div>
            <div className="text-[11px] text-[#8A8A85] font-mono mt-0.5">
              38.5 Hours Logged
            </div>
          </div>

          {/* Projects Completed */}
          <div className="bg-white border border-[#E2E2DE] rounded-md p-4 shadow-xs">
            <div className="flex items-center gap-2 text-xs text-[#5A5C60] font-mono mb-1">
              <FolderCheck className="w-3.5 h-3.5 text-[#3E51FF]" />
              <span>Projects Completed</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-[#1A1C1E] font-mono">
              {certificate.projectsCompleted} Deliverables
            </div>
            <div className="text-[11px] text-emerald-700 font-bold font-mono mt-0.5">
              100% Milestone Completion
            </div>
          </div>

          {/* Final Score */}
          <div className="bg-white border border-[#E2E2DE] rounded-md p-4 shadow-xs">
            <div className="flex items-center gap-2 text-xs text-[#5A5C60] font-mono mb-1">
              <Award className="w-3.5 h-3.5 text-emerald-600" />
              <span>Final Score</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-emerald-700 font-mono">
              {certificate.finalScore}%
            </div>
            <div className="text-[11px] text-[#5A5C60] font-mono mt-0.5">
              Grade: <strong>{certificate.scoreGrade}</strong> (Top 12%)
            </div>
          </div>

          {/* Skills Developed */}
          <div className="bg-white border border-[#E2E2DE] rounded-md p-4 shadow-xs">
            <div className="flex items-center gap-2 text-xs text-[#5A5C60] font-mono mb-1">
              <TrendingUp className="w-3.5 h-3.5 text-[#3E51FF]" />
              <span>Skills Developed</span>
            </div>
            <div className="text-xl sm:text-2xl font-black text-[#1A1C1E] font-mono">
              5 Key Areas
            </div>
            <div className="text-[11px] text-[#3E51FF] font-semibold font-mono mt-0.5 truncate">
              Git (81%), React (64%), JS (72%)
            </div>
          </div>

        </section>

        {/* =========================================================================
            3. CERTIFICATE PREVIEW (Professional, Premium, Minimal & Credible)
            ========================================================================= */}
        <section className="space-y-4" id="certificate-preview-section">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 print:hidden">
            <div>
              <div className="text-xs font-mono font-bold uppercase tracking-wider text-[#5A5C60]">
                Official Credential Preview
              </div>
              <h2 className="text-xl font-bold text-[#1A1C1E]">
                Tamper-Proof Certificate of Completion
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#5A5C60] bg-[#FAF9F7] px-2.5 py-1 rounded-xs border border-[#E2E2DE]">
                Credential ID: <strong className="text-[#1A1C1E]">{certificate.certificateId}</strong>
              </span>
            </div>
          </div>

          {/* Certificate Canvas Render */}
          <div className="shadow-lg hover:shadow-xl transition-shadow rounded-sm">
            <CertificateCanvas certificate={certificate} />
          </div>

          {/* =========================================================================
              4. ACTION BUTTONS: Download Certificate, Share Achievement, Add to LinkedIn
              ========================================================================= */}
          <div className="bg-white border border-[#E2E2DE] rounded-lg p-5 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
            <div className="text-left">
              <h3 className="text-sm font-bold text-[#1A1C1E]">
                Publish & Export Your Verification
              </h3>
              <p className="text-xs text-[#5A5C60] mt-0.5">
                Add this verified credential to your resume, portfolio, and professional networks.
              </p>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap w-full sm:w-auto">
              
              {/* 1. Download Certificate */}
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="flex-1 sm:flex-none px-4 py-2.5 bg-[#1A1C1E] hover:bg-black text-white text-xs font-bold rounded-xs transition-colors flex items-center justify-center gap-2 shadow-2xs disabled:opacity-75"
                id="btn-download-certificate"
              >
                <Download className="w-4 h-4" />
                <span>{downloading ? 'Preparing PDF...' : 'Download Certificate'}</span>
              </button>

              {/* 2. Add to LinkedIn */}
              <button
                onClick={handleLinkedInShare}
                className="flex-1 sm:flex-none px-4 py-2.5 bg-[#0077B5] hover:bg-[#005E93] text-white text-xs font-bold rounded-xs transition-colors flex items-center justify-center gap-2 shadow-2xs"
                id="btn-add-linkedin"
              >
                <Linkedin className="w-4 h-4 fill-current" />
                <span>{linkedInAdded ? 'Opened LinkedIn' : 'Add to LinkedIn'}</span>
              </button>

              {/* 3. Share Achievement (Copy Link) */}
              <button
                onClick={handleCopyLink}
                className="flex-1 sm:flex-none px-4 py-2.5 bg-white hover:bg-[#FAF9F7] text-[#1A1C1E] border border-[#D5D3CB] text-xs font-bold rounded-xs transition-colors flex items-center justify-center gap-2"
                id="btn-share-achievement"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700">Link Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-[#5A5C60]" />
                    <span>Share Achievement</span>
                  </>
                )}
              </button>

            </div>
          </div>
        </section>

        {/* =========================================================================
            5. NEXT STEPS & NAVIGATION
            ========================================================================= */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-4 print:hidden" id="completion-next-steps">
          
          {/* Public Verification Route Direct Card */}
          <div className="bg-[#FAF9F7] border border-[#E2E2DE] rounded-lg p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#5A5C60] mb-1">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Recruiter & Employer Verification</span>
              </div>
              <h4 className="text-base font-bold text-[#1A1C1E]">
                Test the Public Verification Portal
              </h4>
              <p className="text-xs text-[#5A5C60] mt-1.5 leading-relaxed">
                Experience how hiring managers and engineering leads verify your credentials, rubric scores, and authentic code artifacts using your Certificate ID.
              </p>
            </div>

            <button
              onClick={() => navigate({ view: 'verify-certificate', certificateId: certificate.certificateId })}
              className="mt-4 w-full py-2 bg-white hover:bg-[#EEF0FF] text-[#3E51FF] border border-[#C5CAFF] text-xs font-bold rounded-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Open Public Verification Page</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Next Sprint / Career Progress Tab */}
          <div className="bg-[#FAF9F7] border border-[#E2E2DE] rounded-lg p-5 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#5A5C60] mb-1">
                <Compass className="w-4 h-4 text-[#3E51FF]" />
                <span>Next Career Milestone</span>
              </div>
              <h4 className="text-base font-bold text-[#1A1C1E]">
                Explore Your Career Progress
              </h4>
              <p className="text-xs text-[#5A5C60] mt-1.5 leading-relaxed">
                You've mastered Beginner competencies. Review your progress towards the Intermediate Developer level and explore backend distributed systems simulations.
              </p>
            </div>

            <button
              onClick={() => navigate({ view: 'career-progress' })}
              className="mt-4 w-full py-2 bg-[#1A1C1E] hover:bg-black text-white text-xs font-bold rounded-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <span>View Career Progress Dashboard</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </section>

      </main>
    </div>
  );
};
