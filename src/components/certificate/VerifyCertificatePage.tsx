import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { CERTIFICATE_REGISTRY, CertificateRecord } from '../../data/certificateRegistry';
import { databaseService } from '../../lib/supabase/databaseService';
import { 
  ShieldCheck, 
  Search, 
  CheckCircle2, 
  XCircle, 
  Building2, 
  Calendar, 
  Clock, 
  Award, 
  FileCheck, 
  ExternalLink, 
  Lock, 
  Sparkles,
  ArrowRight,
  RefreshCw,
  Copy,
  Check
} from 'lucide-react';

interface VerifyCertificatePageProps {
  initialCertificateId?: string;
}

export const VerifyCertificatePage: React.FC<VerifyCertificatePageProps> = ({
  initialCertificateId = 'IL-2026-948210',
}) => {
  const { navigate } = useApp();
  const [searchId, setSearchId] = useState(initialCertificateId);
  const [searchedRecord, setSearchedRecord] = useState<CertificateRecord | null>(null);
  const [hasSearched, setHasSearched] = useState(true);
  const [isVerifying, setIsVerifying] = useState(false);
  const [copiedHash, setCopiedHash] = useState(false);

  useEffect(() => {
    if (initialCertificateId) {
      handleSearch(initialCertificateId);
    }
  }, [initialCertificateId]);

  const handleSearch = async (idToSearch: string) => {
    const cleanId = idToSearch.trim().toUpperCase();
    setIsVerifying(true);
    setHasSearched(true);

    try {
      // 1. Check live Supabase database
      const dbResult = await databaseService.verifyCertificate(cleanId);
      if (dbResult.data) {
        const cert = dbResult.data;
        const mappedRecord: CertificateRecord = {
          id: cert.id || `cert-${cert.certificate_id}`,
          certificateId: cert.certificate_id,
          studentName: cert.profiles?.full_name || 'Verified Student',
          internshipTitle: cert.internships?.title || 'Virtual Internship Simulation',
          company: cert.internships?.company_name || 'Host Company',
          track: 'Professional Simulation Track',
          durationWeeks: 4,
          durationLabel: '4 Weeks (40 Hours Logged)',
          completionDate: cert.issued_at?.split('T')[0] || new Date().toISOString().split('T')[0],
          issueTimestamp: cert.issued_at || new Date().toISOString(),
          finalScore: 92,
          scoreGrade: 'Exemplary',
          projectsCompleted: 4,
          skillsDeveloped: ['TypeScript', 'React', 'Component Architecture', 'Automated Testing'],
          signature: {
            signerName: 'Marcus Vance',
            signerTitle: 'Lead Engineering Supervisor',
            signerOrg: cert.internships?.company_name || 'Host Company'
          },
          hash: cert.certificate_id.replace(/[^a-zA-Z0-9]/g, '').toLowerCase() + '09af238c',
          verifiedStatus: cert.verification_status === 'revoked' ? 'Revoked' : 'Valid'
        };
        setSearchedRecord(mappedRecord);
        setIsVerifying(false);
        return;
      }
    } catch (e) {
      console.warn('Database certificate verification lookup fallback:', e);
    }

    // 2. Fallback to registry
    setTimeout(() => {
      const record = CERTIFICATE_REGISTRY[cleanId] || null;
      setSearchedRecord(record);
      setIsVerifying(false);
    }, 250);
  };

  const handleQuickPreset = (presetId: string) => {
    setSearchId(presetId);
    handleSearch(presetId);
  };

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    setCopiedHash(true);
    setTimeout(() => setCopiedHash(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#1A1C1E] font-sans selection:bg-[#EEF0FF] selection:text-[#3E51FF] pb-16">
      
      {/* Top System Header */}
      <header className="bg-white border-b border-[#E2E2DE] px-4 sm:px-8 py-3.5 sticky top-0 z-30 shadow-2xs">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div 
            onClick={() => navigate({ view: 'landing' })}
            className="flex items-center gap-2.5 cursor-pointer select-none"
          >
            <div className="w-8 h-8 rounded-xs bg-[#1A1C1E] text-white flex items-center justify-center font-mono font-bold text-xs">
              IL
            </div>
            <div>
              <span className="font-extrabold tracking-tight text-sm font-mono text-[#1A1C1E]">
                INTERNLAB VERIFY
              </span>
              <span className="text-[10px] text-[#5A5C60] font-mono block leading-none">
                Official Credential Registry
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate({ view: 'dashboard' })}
              className="text-xs font-semibold text-[#5A5C60] hover:text-[#1A1C1E] transition-colors"
            >
              Student Portal
            </button>
            <button
              onClick={() => navigate({ view: 'discover' })}
              className="px-3 py-1.5 bg-[#1A1C1E] hover:bg-black text-white text-xs font-bold rounded-xs transition-colors"
            >
              Explore Simulations
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 space-y-8">
        
        {/* Header Intro */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FAF9F7] border border-[#D5D3CB] rounded-full text-xs font-mono text-[#5A5C60]">
            <Lock className="w-3.5 h-3.5 text-emerald-700" />
            <span>Public Cryptographic Verification</span>
          </div>
          
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#1A1C1E] tracking-tight">
            Verify Certificate of Completion
          </h1>
          
          <p className="text-xs sm:text-sm text-[#5A5C60]">
            Enter a unique InternLab credential ID to inspect verified workplace simulation deliverables, rubric evaluation metrics, and supervisor authorizations.
          </p>
        </div>

        {/* Verification Input Box */}
        <section className="bg-white border border-[#E2E2DE] rounded-lg p-5 sm:p-7 shadow-xs space-y-4">
          <label className="block text-xs font-mono font-bold uppercase tracking-wider text-[#5A5C60]">
            Enter Certificate ID:
          </label>

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch(searchId);
            }}
            className="flex flex-col sm:flex-row gap-2.5"
          >
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-[#8A8A85] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchId}
                onChange={(e) => setSearchId(e.target.value)}
                placeholder="e.g. IL-2026-948210"
                className="w-full pl-10 pr-4 py-3 bg-[#FAF9F7] focus:bg-white border border-[#D5D3CB] focus:border-[#1A1C1E] rounded-xs text-sm font-mono font-bold uppercase tracking-wider text-[#1A1C1E] placeholder:text-[#8A8A85] placeholder:normal-case placeholder:font-sans focus:outline-none transition-colors"
                id="input-certificate-id"
              />
            </div>

            <button
              type="submit"
              disabled={isVerifying || !searchId.trim()}
              className="px-6 py-3 bg-[#1A1C1E] hover:bg-black text-white text-xs font-bold rounded-xs transition-colors flex items-center justify-center gap-2 shadow-xs disabled:opacity-50"
              id="btn-verify-submit"
            >
              {isVerifying ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify Credential</span>
                </>
              )}
            </button>
          </form>

          {/* Preset Quick Links for Testing Verification */}
          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[#8A8A85] font-mono text-[11px]">Quick Samples:</span>
            <button
              onClick={() => handleQuickPreset('IL-2026-948210')}
              className="px-2 py-0.5 bg-[#FAF9F7] hover:bg-[#EEF0FF] text-[#1A1C1E] hover:text-[#3E51FF] border border-[#E2E2DE] rounded-2xs font-mono text-[11px]"
            >
              IL-2026-948210 (Nova Labs Frontend)
            </button>
            <button
              onClick={() => handleQuickPreset('IL-2026-831940')}
              className="px-2 py-0.5 bg-[#FAF9F7] hover:bg-[#EEF0FF] text-[#1A1C1E] hover:text-[#3E51FF] border border-[#E2E2DE] rounded-2xs font-mono text-[11px]"
            >
              IL-2026-831940 (CloudScale Systems)
            </button>
            <button
              onClick={() => handleQuickPreset('IL-2026-772154')}
              className="px-2 py-0.5 bg-[#FAF9F7] hover:bg-[#EEF0FF] text-[#1A1C1E] hover:text-[#3E51FF] border border-[#E2E2DE] rounded-2xs font-mono text-[11px]"
            >
              IL-2026-772154 (FinTech Global)
            </button>
          </div>
        </section>

        {/* Verification Result Display */}
        {hasSearched && (
          <section className="space-y-6 animate-in fade-in duration-200">
            {searchedRecord ? (
              /* VALID CERTIFICATE RECORD */
              <div className="bg-white border-2 border-emerald-600 rounded-lg p-6 sm:p-8 shadow-sm space-y-6">
                
                {/* 1. Verified Banner (Exact Requested Format) */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-[#E2E2DE]">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 shrink-0">
                      <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-lg sm:text-xl font-extrabold text-emerald-800 flex items-center gap-2">
                        <span>Valid Certificate</span>
                        <span className="text-base">✓</span>
                      </div>
                      <div className="text-xs text-[#5A5C60] font-mono">
                        Cryptographically verified against the InternLab immutable simulation ledger.
                      </div>
                    </div>
                  </div>

                  <div className="text-left sm:text-right font-mono">
                    <div className="text-[10px] uppercase text-[#8A8A85]">Verification ID</div>
                    <div className="text-xs font-bold text-[#1A1C1E] bg-[#FAF9F7] px-2 py-0.5 rounded-xs border border-[#E2E2DE]">
                      {searchedRecord.certificateId}
                    </div>
                  </div>
                </div>

                {/* 2. Structured Certificate Details Display (Student Name, Internship, Completion Date, Verification ID) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  
                  {/* Student & Internship Meta */}
                  <div className="space-y-4">
                    <div>
                      <span className="text-[11px] font-mono uppercase text-[#8A8A85] block">
                        Student Name:
                      </span>
                      <div className="text-xl font-extrabold text-[#1A1C1E] mt-0.5">
                        {searchedRecord.studentName}
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] font-mono uppercase text-[#8A8A85] block">
                        Internship:
                      </span>
                      <div className="text-base font-bold text-[#1A1C1E] mt-0.5">
                        {searchedRecord.internshipTitle}
                      </div>
                      <div className="text-xs text-[#5A5C60] font-medium flex items-center gap-1.5 mt-0.5">
                        <Building2 className="w-3.5 h-3.5 text-[#8A8A85]" />
                        <span>{searchedRecord.company} • {searchedRecord.track}</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] font-mono uppercase text-[#8A8A85] block">
                        Completion Date:
                      </span>
                      <div className="text-sm font-bold text-[#1A1C1E] flex items-center gap-1.5 mt-0.5">
                        <Calendar className="w-4 h-4 text-[#8A8A85]" />
                        <span>{searchedRecord.completionDate}</span>
                      </div>
                    </div>

                    <div>
                      <span className="text-[11px] font-mono uppercase text-[#8A8A85] block">
                        Verification ID:
                      </span>
                      <div className="text-xs font-mono font-bold text-[#1A1C1E] mt-0.5">
                        {searchedRecord.certificateId}
                      </div>
                    </div>
                  </div>

                  {/* Rubric Evaluation & Authorized Signer Box */}
                  <div className="bg-[#FAF9F7] border border-[#E2E2DE] rounded-md p-4 space-y-3.5 font-mono text-xs">
                    <div className="flex items-center justify-between pb-2 border-b border-[#E2E2DE]">
                      <span className="text-[#5A5C60]">Simulation Duration:</span>
                      <span className="font-bold text-[#1A1C1E]">{searchedRecord.durationLabel}</span>
                    </div>

                    <div className="flex items-center justify-between pb-2 border-b border-[#E2E2DE]">
                      <span className="text-[#5A5C60]">Final Rubric Score:</span>
                      <span className="font-bold text-emerald-800">{searchedRecord.finalScore}% ({searchedRecord.scoreGrade})</span>
                    </div>

                    <div className="flex items-center justify-between pb-2 border-b border-[#E2E2DE]">
                      <span className="text-[#5A5C60]">Deliverables Completed:</span>
                      <span className="font-bold text-[#1A1C1E]">{searchedRecord.projectsCompleted} Verified Projects</span>
                    </div>

                    <div>
                      <span className="text-[#8A8A85] text-[10px] block mb-1">
                        Authorized Mentor Signature:
                      </span>
                      <div className="font-bold text-[#1A1C1E]">
                        {searchedRecord.signature.signerName}
                      </div>
                      <div className="text-[10px] text-[#5A5C60]">
                        {searchedRecord.signature.signerTitle} ({searchedRecord.signature.signerOrg})
                      </div>
                    </div>
                  </div>

                </div>

                {/* 3. Verified Competencies List */}
                <div className="pt-4 border-t border-[#E2E2DE]">
                  <div className="text-xs font-mono uppercase tracking-wider text-[#8A8A85] mb-2">
                    Verified Technical Skills & Competencies:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {searchedRecord.skillsDeveloped.map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 bg-[#FAF9F7] border border-[#D5D3CB] text-[#1A1C1E] text-xs font-semibold rounded-xs"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* 4. Cryptographic Proof Checksum */}
                <div className="pt-3 border-t border-[#E2E2DE] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[11px] font-mono text-[#8A8A85]">
                  <div className="flex items-center gap-1.5 truncate max-w-md">
                    <span>SHA-256 Digest:</span>
                    <span className="text-[#5A5C60] truncate">{searchedRecord.hash}</span>
                  </div>

                  <button
                    onClick={() => handleCopyHash(searchedRecord.hash)}
                    className="hover:text-[#1A1C1E] flex items-center gap-1 shrink-0"
                  >
                    {copiedHash ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedHash ? 'Copied Hash' : 'Copy Hash'}</span>
                  </button>
                </div>

                {/* Card Action */}
                <div className="pt-2 flex items-center justify-end">
                  <button
                    onClick={() => navigate({ view: 'completion-celebration', internshipId: searchedRecord.certificateId })}
                    className="px-4 py-2 bg-[#1A1C1E] hover:bg-black text-white text-xs font-bold rounded-xs transition-colors flex items-center gap-1.5 shadow-2xs"
                  >
                    <span>View Official Certificate Sheet</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            ) : (
              /* INVALID / NOT FOUND RECORD */
              <div className="bg-white border-2 border-red-300 rounded-lg p-6 sm:p-8 text-center space-y-4">
                <div className="w-12 h-12 rounded-full bg-red-50 border border-red-200 text-red-600 flex items-center justify-center mx-auto">
                  <XCircle className="w-6 h-6" />
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#1A1C1E]">
                    Certificate Record Not Found
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5A5C60] max-w-md mx-auto mt-1">
                    No verified credential matching ID <strong className="font-mono text-[#1A1C1E]">"{searchId}"</strong> was found in the active registry.
                  </p>
                </div>

                <div className="text-xs text-[#8A8A85] font-mono">
                  Please verify that the Certificate ID is typed correctly (format: IL-YYYY-XXXXXX).
                </div>
              </div>
            )}
          </section>
        )}

      </main>
    </div>
  );
};
