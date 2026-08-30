import React from 'react';
import { 
  Award, 
  CheckCircle2, 
  ExternalLink, 
  Share2, 
  Download, 
  QrCode, 
  Building2, 
  Calendar, 
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Eye
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CERTIFICATE_REGISTRY } from '../../data/certificateRegistry';

export const CertificatesTab: React.FC = () => {
  const { userProfile, navigate } = useApp();

  const certificates = [
    {
      id: 'cert-1',
      registryId: 'IL-2026-948210',
      title: 'Frontend Developer Virtual Internship',
      company: 'Nova Labs',
      studentName: userProfile.fullName || 'Alex Morgan',
      issueDate: 'August 28, 2026',
      credentialId: 'IL-2026-948210',
      verificationCode: '8F9A-4E2B-9C01-7D4F',
      skillsCertified: ['React 18', 'TypeScript', 'Git Workflow', 'WCAG AA Accessibility', 'Problem Solving'],
      totalHours: 38.5,
      status: 'Issued & Verified',
      finalScore: 89,
    },
    {
      id: 'cert-2',
      registryId: 'IL-2026-831940',
      title: 'Distributed Systems & Full-Stack Simulation',
      company: 'CloudScale Systems',
      studentName: userProfile.fullName || 'Alex Morgan',
      issueDate: 'August 05, 2026',
      credentialId: 'IL-2026-831940',
      verificationCode: '4F7E-21A8-9C03-B6E8',
      skillsCertified: ['Distributed Systems', 'API Contracts', 'Sliding Window Rate Limiting', 'Post-Mortem Analysis'],
      totalHours: 42,
      status: 'Issued & Verified',
      finalScore: 92,
    },
    {
      id: 'cert-3',
      registryId: 'IL-2026-772154',
      title: 'Enterprise React & State Architecture',
      company: 'FinTech Global',
      studentName: userProfile.fullName || 'Alex Morgan',
      issueDate: 'July 22, 2026',
      credentialId: 'IL-2026-772154',
      verificationCode: 'A1B2-C3D4-E5F6-7890',
      skillsCertified: ['Deterministic Math Engines', 'Unit Testing', 'Input Sanitization', 'Currency Localization'],
      totalHours: 30,
      status: 'Issued & Verified',
      finalScore: 88,
    },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-200" id="certificates-tab-view">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E2E2DE]">
        <div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-[#1A1C1E] tracking-tight">
            Certificates & Verified Credentials
          </h2>
          <p className="text-xs sm:text-sm text-[#5A5C60] mt-0.5">
            Cryptographically verifiable proof of realistic simulated workplace deliverables and rubric scores.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => navigate({ view: 'verify-certificate' })}
            className="px-3 py-1.5 bg-white hover:bg-[#FAF9F7] text-[#1A1C1E] border border-[#D5D3CB] rounded-xs text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-2xs"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Public Verification Portal</span>
          </button>

          <span className="px-3 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-xs text-xs font-mono font-bold">
            3 Verified Credentials
          </span>
        </div>
      </div>

      {/* Certificates List */}
      <div className="space-y-6">
        {certificates.map((cert) => {
          const isIssued = cert.status.includes('Issued');

          return (
            <div
              key={cert.id}
              className={`border rounded-lg p-6 shadow-xs relative ${
                isIssued
                  ? 'bg-white border-[#E2E2DE] hover:border-[#1A1C1E] transition-colors'
                  : 'bg-[#FDFCFB] border-dashed border-[#E2E2DE] opacity-80'
              }`}
            >
              <div className="flex flex-col lg:flex-row items-start justify-between gap-6">
                
                {/* Certificate Meta */}
                <div className="space-y-3 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2 py-0.5 text-[11px] font-bold rounded-xs uppercase tracking-wider ${
                      isIssued
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-blue-50 text-blue-800 border border-blue-200'
                    }`}>
                      {cert.status}
                    </span>

                    <span className="text-xs font-semibold text-[#5A5C60]">
                      Issued by {cert.company} & InternLab
                    </span>

                    <span className="text-xs text-[#8A8A85] font-mono">
                      • {cert.issueDate}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-[#1A1C1E]">
                    Certificate of Workplace Simulation Completion
                  </h3>

                  <p className="text-sm font-semibold text-[#3E51FF]">
                    {cert.title}
                  </p>

                  <div className="text-xs text-[#5A5C60] space-y-1">
                    <div>Awarded to: <strong>{cert.studentName}</strong></div>
                    {isIssued && (
                      <div className="font-mono text-[11px] text-[#8A8A85]">
                        Credential ID: <strong className="text-[#1A1C1E]">{cert.credentialId}</strong> • Verification: {cert.verificationCode}
                      </div>
                    )}
                  </div>

                  {/* Skills Certified */}
                  <div className="pt-2">
                    <span className="text-[11px] font-mono uppercase text-[#8A8A85] block mb-1.5">
                      Verified Competencies:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {cert.skillsCertified.map((sk, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[11px] px-2 py-0.5 bg-[#F9F8F6] border border-[#E2E2DE] text-[#1A1C1E] rounded-xs font-medium"
                        >
                          {sk}
                        </span>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Right Action / Verification Box */}
                {isIssued ? (
                  <div className="bg-[#F9F8F6] border border-[#E2E2DE] p-4 rounded-md lg:w-72 shrink-0 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>Tamper-Proof Verified</span>
                    </div>

                    <div className="text-xs font-mono text-[#5A5C60] space-y-1 bg-white p-2.5 rounded-xs border border-[#E2E2DE]">
                      <div>Duration: {cert.totalHours} hrs logged</div>
                      <div>Final Evaluation: {cert.finalScore}% (A)</div>
                      <div className="text-[10px] text-[#8A8A85] truncate">SHA256: 7f8a92b...</div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <button
                        onClick={() => navigate({ view: 'completion-celebration', internshipId: cert.credentialId })}
                        className="w-full py-2 bg-[#1A1C1E] hover:bg-black text-white text-xs font-semibold rounded-xs transition-colors flex items-center justify-center gap-1.5 shadow-2xs"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>View Completion & Canvas</span>
                      </button>

                      <button
                        onClick={() => navigate({ view: 'verify-certificate', certificateId: cert.credentialId })}
                        className="w-full py-1.5 bg-white hover:bg-[#F2F1EE] border border-[#E2E2DE] text-xs font-semibold text-[#1A1C1E] rounded-xs transition-colors flex items-center justify-center gap-1.5"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                        <span>Public Verification</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#F9F8F6] border border-[#E2E2DE] p-4 rounded-md lg:w-72 shrink-0 text-center space-y-2">
                    <div className="text-xs font-mono text-[#8A8A85] uppercase">Requirements Pending</div>
                    <p className="text-xs text-[#5A5C60]">
                      Complete Week 3 & Week 4 Capstone submission to unlock and verify this credential.
                    </p>
                  </div>
                )}

              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
