import React, { useState } from 'react';
import { 
  X, 
  FileText, 
  Download, 
  CheckCircle2, 
  Calendar, 
  Building2, 
  GraduationCap, 
  FileSpreadsheet, 
  Layers, 
  Sparkles,
  Printer
} from 'lucide-react';
import { COLLEGE_INSTITUTION_PROFILE, COLLEGE_OVERVIEW_METRICS, COLLEGE_STUDENTS, COLLEGE_TOP_SKILLS } from '../../data/collegeData';

interface ReportModalProps {
  type: 'progress' | 'placement' | 'accreditation' | 'at-risk';
  isOpen: boolean;
  onClose: () => void;
}

export const ReportModal: React.FC<ReportModalProps> = ({ type, isOpen, onClose }) => {
  const [selectedFormat, setSelectedFormat] = useState<'pdf' | 'csv' | 'json'>('pdf');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDownloaded, setIsDownloaded] = useState(false);

  if (!isOpen) return null;

  const isProgress = type === 'progress';
  const isPlacement = type === 'placement';
  const isAccreditation = type === 'accreditation';

  const title = isProgress 
    ? 'Institutional Student Progress Report' 
    : isPlacement 
    ? 'Employer Placement Readiness Dossier' 
    : isAccreditation
    ? 'ABET & NACE Experiential Learning Audit'
    : 'At-Risk Student Intervention Audit';

  const subtitle = isProgress
    ? 'Comprehensive milestone tracking, completion rates, and rubric scores across all active cohorts.'
    : isPlacement
    ? 'Curated talent dossier of job-ready students with verified project artifacts and competency ratings.'
    : 'Formal evidence packet documenting student competency benchmarks for accreditation review.';

  const handleDownload = () => {
    setIsGenerating(true);
    setIsDownloaded(false);

    setTimeout(() => {
      setIsGenerating(false);
      setIsDownloaded(true);

      // Create downloadable file artifact in memory for browser
      const reportContent = isPlacement
        ? `INTERNLAB PLACEMENT READINESS REPORT\nInstitution: ${COLLEGE_INSTITUTION_PROFILE.institutionName}\nGenerated: ${new Date().toLocaleDateString()}\nTotal Graduating Talent: ${COLLEGE_OVERVIEW_METRICS.totalStudents}\nPlacement Benchmark Match: 94.2%\n\nTOP CANDIDATES:\n` +
          COLLEGE_STUDENTS.map(s => `- ${s.name} (${s.department}, ${s.year}) | Track: ${s.track} | Score: ${s.averageScore}% | Deliverables: ${s.completedDeliverables}/${s.totalDeliverables}`).join('\n')
        : `INTERNLAB INSTITUTIONAL PROGRESS REPORT\nInstitution: ${COLLEGE_INSTITUTION_PROFILE.institutionName}\nTerm: ${COLLEGE_INSTITUTION_PROFILE.academicYear}\nTotal Students: ${COLLEGE_OVERVIEW_METRICS.totalStudents}\nActive Internships: ${COLLEGE_OVERVIEW_METRICS.activeInternships}\nCompletion Rate: ${COLLEGE_OVERVIEW_METRICS.completionRate}%\nAverage Performance: ${COLLEGE_OVERVIEW_METRICS.averagePerformance}/100\n\nCOHORT SUMMARY:\n` +
          COLLEGE_STUDENTS.map(s => `${s.studentId}, ${s.name}, ${s.department}, ${s.currentInternship}, ${s.progressPercent}%, ${s.averageScore}%, ${s.status}`).join('\n');

      const mimeType = selectedFormat === 'csv' ? 'text/csv' : 'text/plain';
      const filename = `${type}-report-${new Date().toISOString().slice(0, 10)}.${selectedFormat === 'csv' ? 'csv' : 'txt'}`;
      
      const blob = new Blob([reportContent], { type: mimeType });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FDFCFB] border border-[#D5D3CB] rounded-md shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden text-[#1A1C1E] animate-in fade-in zoom-in-95 duration-150">
        
        {/* Header */}
        <div className="px-6 py-4 bg-[#FAF9F7] border-b border-[#E2E2DE] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xs bg-[#1A1C1E] text-white flex items-center justify-center">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#1A1C1E] leading-tight">{title}</h3>
              <p className="text-xs text-[#5A5C60]">{COLLEGE_INSTITUTION_PROFILE.institutionName}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#8A8A85] hover:text-[#1A1C1E] hover:bg-[#E2E2DE] rounded-xs transition-colors"
            id="close-report-modal-btn"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          
          <p className="text-xs sm:text-sm text-[#5A5C60] leading-relaxed">
            {subtitle}
          </p>

          {/* Quick Metrics Preview */}
          <div className="grid grid-cols-3 gap-3 p-3 bg-[#FAF9F7] border border-[#E2E2DE] rounded-xs text-xs">
            <div>
              <div className="text-[10px] text-[#8A8A85] font-mono">TOTAL COHORT</div>
              <div className="text-base font-bold text-[#1A1C1E]">{COLLEGE_OVERVIEW_METRICS.totalStudents} Students</div>
            </div>
            <div>
              <div className="text-[10px] text-[#8A8A85] font-mono">AVG RUBRIC SCORE</div>
              <div className="text-base font-bold text-emerald-700">{COLLEGE_OVERVIEW_METRICS.averagePerformance}/100</div>
            </div>
            <div>
              <div className="text-[10px] text-[#8A8A85] font-mono">COMPLETION RATE</div>
              <div className="text-base font-bold text-[#3E51FF]">{COLLEGE_OVERVIEW_METRICS.completionRate}%</div>
            </div>
          </div>

          {/* Report Sections Included */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[#8A8A85] font-mono">
              Sections Included in Export
            </div>
            <div className="space-y-1.5 text-xs text-[#5A5C60]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Executive Dean Summary & Cohort Engagement Distribution</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Student-by-Student Milestone Completion & Rubric Scores</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Aggregated Competency Matrix (JavaScript, Python, Data, UI/UX)</span>
              </div>
              {isPlacement && (
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Public Portfolio URLs & Employer Direct Verification Links</span>
                </div>
              )}
            </div>
          </div>

          {/* Format Selector */}
          <div className="space-y-2">
            <div className="text-xs font-bold uppercase tracking-wider text-[#8A8A85] font-mono">
              Export Format
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSelectedFormat('pdf')}
                className={`p-3 border rounded-xs text-xs font-semibold flex flex-col items-center gap-1.5 transition-colors ${
                  selectedFormat === 'pdf'
                    ? 'border-[#1A1C1E] bg-[#FAF9F7] text-[#1A1C1E] ring-1 ring-[#1A1C1E]'
                    : 'border-[#E2E2DE] hover:bg-[#F2F1EE] text-[#5A5C60]'
                }`}
              >
                <FileText className="w-4 h-4 text-[#1A1C1E]" />
                <span>PDF Document</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedFormat('csv')}
                className={`p-3 border rounded-xs text-xs font-semibold flex flex-col items-center gap-1.5 transition-colors ${
                  selectedFormat === 'csv'
                    ? 'border-[#1A1C1E] bg-[#FAF9F7] text-[#1A1C1E] ring-1 ring-[#1A1C1E]'
                    : 'border-[#E2E2DE] hover:bg-[#F2F1EE] text-[#5A5C60]'
                }`}
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-700" />
                <span>CSV Spreadsheet</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedFormat('json')}
                className={`p-3 border rounded-xs text-xs font-semibold flex flex-col items-center gap-1.5 transition-colors ${
                  selectedFormat === 'json'
                    ? 'border-[#1A1C1E] bg-[#FAF9F7] text-[#1A1C1E] ring-1 ring-[#1A1C1E]'
                    : 'border-[#E2E2DE] hover:bg-[#F2F1EE] text-[#5A5C60]'
                }`}
              >
                <Layers className="w-4 h-4 text-purple-700" />
                <span>JSON / API Payload</span>
              </button>
            </div>
          </div>

          {/* Success Banner if Downloaded */}
          {isDownloaded && (
            <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-900 rounded-xs text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Report successfully exported and saved to your device.</span>
            </div>
          )}

        </div>

        {/* Footer Actions */}
        <div className="px-6 py-4 bg-[#FAF9F7] border-t border-[#E2E2DE] flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-[#5A5C60] hover:text-[#1A1C1E] transition-colors"
          >
            Cancel
          </button>

          <button
            onClick={handleDownload}
            disabled={isGenerating}
            className="px-5 py-2.5 bg-[#1A1C1E] hover:bg-black text-white text-xs font-semibold rounded-xs transition-colors flex items-center gap-2 shadow-xs disabled:opacity-50"
            id="btn-confirm-download-report"
          >
            {isGenerating ? (
              <>
                <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Compiling {selectedFormat.toUpperCase()}...</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" />
                <span>Download {selectedFormat.toUpperCase()} Report</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
