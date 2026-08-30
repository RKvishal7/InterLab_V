import React from 'react';
import { CertificateRecord } from '../../data/certificateRegistry';
import { ShieldCheck, Award, QrCode, CheckCircle2 } from 'lucide-react';

interface CertificateCanvasProps {
  certificate: CertificateRecord;
  id?: string;
  isInteractive?: boolean;
}

export const CertificateCanvas: React.FC<CertificateCanvasProps> = ({
  certificate,
  id = 'internlab-official-certificate-canvas',
  isInteractive = true,
}) => {
  return (
    <div 
      id={id}
      className="relative w-full max-w-4xl mx-auto bg-[#FDFCF9] text-[#1A1C1E] border-[10px] border-[#1A1C1E] p-8 sm:p-12 md:p-16 rounded-sm shadow-xl font-sans overflow-hidden select-none"
    >
      {/* Decorative Security Border Inset */}
      <div className="absolute inset-3 sm:inset-4 border border-[#D5D3CB] pointer-events-none rounded-2xs" />
      <div className="absolute inset-4 sm:inset-5 border border-dashed border-[#E5E3DC] pointer-events-none rounded-2xs" />

      {/* Subtle Guilloché Background Watermark Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full border-[36px] border-[#F2EFE9]/40 pointer-events-none flex items-center justify-center -z-0">
        <div className="w-64 h-64 rounded-full border-[18px] border-[#E8E4DA]/50 flex items-center justify-center">
          <Award className="w-32 h-32 text-[#DED9CE]/35" />
        </div>
      </div>

      <div className="relative z-10 flex flex-col justify-between min-h-[500px]">
        
        {/* 1. Header: INTERNLAB & Credential Type */}
        <div className="flex items-start justify-between border-b border-[#E2E2DE] pb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1A1C1E] text-white flex items-center justify-center font-mono font-black text-sm tracking-tighter rounded-xs shadow-xs">
              IL
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-black tracking-widest text-[#1A1C1E] font-mono">
                INTERNLAB
              </div>
              <div className="text-[10px] font-mono tracking-wider text-[#5A5C60] uppercase">
                Workplace Simulation Verification Authority
              </div>
            </div>
          </div>

          <div className="text-right font-mono">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#FAF9F7] border border-[#D5D3CB] rounded-xs text-[11px] font-bold text-[#1A1C1E]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>OFFICIAL CREDENTIAL</span>
            </div>
            <div className="text-[10px] text-[#8A8A85] mt-1">
              ID: <strong className="text-[#1A1C1E]">{certificate.certificateId}</strong>
            </div>
          </div>
        </div>

        {/* 2. Certificate Body Content */}
        <div className="my-8 text-center space-y-4">
          
          <div className="text-xs sm:text-sm font-mono uppercase tracking-widest text-[#5A5C60]">
            Certificate of Completion
          </div>

          <div className="text-xs sm:text-sm text-[#8A8A85] italic font-serif">
            This certifies that
          </div>

          {/* Student Name */}
          <div className="py-2">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-[#1A1C1E] tracking-tight font-serif decoration-1 underline-offset-8">
              {certificate.studentName}
            </h1>
            <div className="w-48 h-0.5 bg-[#1A1C1E] mx-auto mt-2 opacity-80" />
          </div>

          <div className="text-xs sm:text-sm text-[#5A5C60] max-w-lg mx-auto">
            has successfully completed all rigorous technical milestones, peer reviews, and deliverables for the industry-standard simulation:
          </div>

          {/* Internship Title */}
          <div className="py-1">
            <div className="inline-block px-4 py-1.5 bg-[#FAF9F7] border border-[#E2E2DE] rounded-xs">
              <h2 className="text-base sm:text-xl md:text-2xl font-black text-[#1A1C1E] tracking-tight">
                {certificate.internshipTitle}
              </h2>
            </div>
            <div className="text-xs font-mono text-[#5A5C60] mt-1">
              Simulated under supervision with {certificate.company} Engineering Standards
            </div>
          </div>

          {/* Key Metrics Row */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-3 text-xs font-mono">
            <div className="flex items-center gap-1.5 text-[#5A5C60]">
              <span>Duration:</span>
              <strong className="text-[#1A1C1E]">{certificate.durationWeeks} Weeks</strong>
            </div>
            <span className="text-[#D5D3CB]">•</span>
            <div className="flex items-center gap-1.5 text-[#5A5C60]">
              <span>Completion Date:</span>
              <strong className="text-[#1A1C1E]">{certificate.completionDate}</strong>
            </div>
            <span className="text-[#D5D3CB]">•</span>
            <div className="flex items-center gap-1.5 text-[#5A5C60]">
              <span>Final Score:</span>
              <strong className="text-emerald-700">{certificate.finalScore}% ({certificate.scoreGrade})</strong>
            </div>
          </div>

          {/* Verified Skills Compact Tags */}
          <div className="pt-2">
            <div className="flex flex-wrap justify-center gap-1.5 max-w-xl mx-auto">
              {certificate.skillsDeveloped.map((sk, idx) => (
                <span 
                  key={idx}
                  className="px-2 py-0.5 bg-white border border-[#E5E3DC] text-[#1A1C1E] text-[10px] font-mono rounded-2xs"
                >
                  {sk}
                </span>
              ))}
            </div>
          </div>

        </div>

        {/* 3. Footer: QR Placeholder & Authorized Signature */}
        <div className="pt-6 border-t border-[#E2E2DE] grid grid-cols-1 sm:grid-cols-3 gap-6 items-end text-left">
          
          {/* Left: Security Verification & QR */}
          <div className="flex items-center gap-3">
            {/* Real SVG QR code placeholder */}
            <div className="w-16 h-16 bg-white border border-[#1A1C1E] p-1 rounded-2xs shrink-0 flex items-center justify-center shadow-2xs">
              <svg viewBox="0 0 100 100" className="w-full h-full text-[#1A1C1E] fill-current">
                {/* QR Pattern Representation */}
                <rect x="0" y="0" width="30" height="30" />
                <rect x="5" y="5" width="20" height="20" fill="#FFF" />
                <rect x="10" y="10" width="10" height="10" />

                <rect x="70" y="0" width="30" height="30" />
                <rect x="75" y="5" width="20" height="20" fill="#FFF" />
                <rect x="80" y="10" width="10" height="10" />

                <rect x="0" y="70" width="30" height="30" />
                <rect x="5" y="75" width="20" height="20" fill="#FFF" />
                <rect x="10" y="80" width="10" height="10" />

                <rect x="35" y="10" width="10" height="10" />
                <rect x="50" y="10" width="10" height="10" />
                <rect x="35" y="35" width="15" height="15" />
                <rect x="55" y="35" width="10" height="10" />
                <rect x="70" y="45" width="20" height="10" />
                <rect x="35" y="60" width="10" height="20" />
                <rect x="55" y="65" width="15" height="10" />
                <rect x="75" y="75" width="15" height="15" />
              </svg>
            </div>

            <div className="text-[10px] font-mono text-[#5A5C60]">
              <div className="font-bold text-[#1A1C1E]">Scan to Verify</div>
              <div className="text-[#8A8A85] text-[9px] mt-0.5 truncate max-w-[130px]">
                internlab.dev/verify
              </div>
              <div className="text-[9px] text-emerald-700 font-bold flex items-center gap-1 mt-0.5">
                <CheckCircle2 className="w-2.5 h-2.5" />
                <span>SHA-256 Valid</span>
              </div>
            </div>
          </div>

          {/* Center: Tamper Seal */}
          <div className="text-center hidden sm:flex flex-col items-center justify-center">
            <div className="w-12 h-12 rounded-full border-2 border-dashed border-[#B0B2B8] flex items-center justify-center bg-[#FAF9F7]">
              <ShieldCheck className="w-6 h-6 text-[#1A1C1E]" />
            </div>
            <span className="text-[9px] font-mono uppercase tracking-wider text-[#8A8A85] mt-1">
              Verified Issuer
            </span>
          </div>

          {/* Right: Authorized Signature */}
          <div className="text-right sm:text-right">
            {/* Stylized Realistic Signature Graphic */}
            <div className="h-10 flex items-center justify-end font-serif italic text-lg sm:text-xl text-[#1A1C1E] tracking-tight pr-1 select-none">
              <span style={{ fontFamily: 'Brush Script MT, cursive, Georgia, serif', transform: 'rotate(-2deg)' }}>
                {certificate.signature.signerName}
              </span>
            </div>
            <div className="border-t border-[#1A1C1E] pt-1">
              <div className="text-xs font-bold text-[#1A1C1E]">
                {certificate.signature.signerName}
              </div>
              <div className="text-[10px] text-[#5A5C60] font-mono">
                {certificate.signature.signerTitle}
              </div>
              <div className="text-[9px] text-[#8A8A85] font-mono">
                {certificate.signature.signerOrg}
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
