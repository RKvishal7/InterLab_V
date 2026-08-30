import React from 'react';
import { X, BookOpen, FileText, CheckCircle2, ShieldCheck, Download, ArrowUpRight } from 'lucide-react';
import { Button, SecondaryButton, IconButton } from '../../design-system/Button';

interface ResourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResourcesModal: React.FC<ResourcesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const rubrics = [
    {
      title: 'Workplace Simulation Rubric Framework v3.2',
      category: 'Evaluation Standard',
      desc: 'The official 4-pillar grading rubric assessing Architecture Quality, Concurrency Safety, Test Coverage, and Technical Documentation.',
    },
    {
      title: 'Proof-of-Work Verifiable Credential Specification',
      category: 'Credential Protocol',
      desc: 'Detailed documentation of the SHA-256 cryptographic verification ledger used for student portfolio links and employer verification.',
    },
    {
      title: 'University ABET Capstone Alignment Guide',
      category: 'Curriculum Whitepaper',
      desc: 'Framework mapping InternLab virtual internship deliverables to ABET student outcome criteria (1) through (7).',
    },
    {
      title: 'Hiring Manager Simulation Assessment Guide',
      category: 'Employer Toolkit',
      desc: 'How talent acquisition teams evaluate InternLab completed milestone artifacts during technical interviews.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
      <div className="bg-[#FFFFFF] border border-[#E2E2DE] rounded-sm max-w-2xl w-full p-6 sm:p-8 shadow-xl max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#E2E2DE]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xs bg-[#1A1C1E] text-white flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#1A1C1E]">
                InternLab Resources & Standards
              </h3>
              <p className="text-xs text-[#8A8A85]">
                Methodology, evaluation rubrics, and academic integration specs.
              </p>
            </div>
          </div>

          <IconButton
            icon={<X className="w-4 h-4" />}
            label="Close modal"
            variant="ghost"
            onClick={onClose}
          />
        </div>

        {/* Resources list */}
        <div className="space-y-3 mb-6">
          {rubrics.map((res, i) => (
            <div
              key={i}
              className="p-4 rounded-sm bg-[#F9F8F6] border border-[#E2E2DE] hover:border-[#1A1C1E] transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1 min-w-0">
                <span className="text-[10px] font-mono uppercase px-1.5 py-0.5 rounded-2xs bg-[#FFFFFF] border border-[#E2E2DE] text-[#484B4F]">
                  {res.category}
                </span>
                <h4 className="text-sm font-bold text-[#1A1C1E]">
                  {res.title}
                </h4>
                <p className="text-xs text-[#8A8A85] leading-relaxed">
                  {res.desc}
                </p>
              </div>

              <button
                type="button"
                onClick={() => alert(`Downloaded: ${res.title}`)}
                className="shrink-0 px-3 py-1.5 rounded-xs bg-[#FFFFFF] border border-[#E2E2DE] hover:bg-[#F2F1EE] text-xs font-semibold text-[#1A1C1E] flex items-center gap-1.5 self-start sm:self-center"
              >
                <Download className="w-3.5 h-3.5" />
                <span>PDF Spec</span>
              </button>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-[#E2E2DE] flex items-center justify-between">
          <span className="text-xs text-[#8A8A85] flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-[#115E59]" />
            <span>Open Educational Standards Compliant</span>
          </span>

          <Button variant="primary" onClick={onClose}>
            Close
          </Button>
        </div>

      </div>
    </div>
  );
};
