import React from 'react';
import { ShieldCheck, Heart, ArrowUpRight, Terminal } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface FooterSectionProps {
  onScrollToSection: (sectionId: string) => void;
  onOpenCollegesModal: () => void;
  onOpenResourcesModal: () => void;
}

export const FooterSection: React.FC<FooterSectionProps> = ({
  onScrollToSection,
  onOpenCollegesModal,
  onOpenResourcesModal,
}) => {
  const { navigate } = useApp();

  return (
    <footer className="w-full bg-[#F9F8F6] border-t border-[#E2E2DE] pt-14 pb-12 text-[#484B4F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          
          {/* Col 1: Brand & Mission (2 cols on mobile) */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded-xs bg-[#1A1C1E] text-white flex items-center justify-center font-bold text-xs tracking-tight font-mono">
                IL
              </div>
              <span className="text-base font-bold tracking-tight text-[#1A1C1E]">
                InternLab
              </span>
            </div>

            <p className="text-xs leading-relaxed text-[#8A8A85] max-w-sm">
              InternLab is the virtual workplace simulation platform where students gain practical experience through authentic projects, supervisor tickets, and objective rubric feedback.
            </p>

            <div className="text-xs font-mono text-[#8A8A85] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>All Systems Operational • 120+ Live Simulations</span>
            </div>
          </div>

          {/* Col 2: Product */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1A1C1E]">
              Platform
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onScrollToSection('featured-internships')}
                  className="hover:text-[#1A1C1E] transition-colors"
                >
                  Featured Internships
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('how-it-works')}
                  className="hover:text-[#1A1C1E] transition-colors"
                >
                  How It Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => onScrollToSection('categories')}
                  className="hover:text-[#1A1C1E] transition-colors"
                >
                  10 Career Tracks
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenResourcesModal}
                  className="hover:text-[#1A1C1E] transition-colors"
                >
                  Rubric Guidelines
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: For Institutions */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1A1C1E]">
              Colleges & Faculty
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={onOpenCollegesModal}
                  className="hover:text-[#1A1C1E] transition-colors text-left"
                >
                  University Partnership
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCollegesModal}
                  className="hover:text-[#1A1C1E] transition-colors text-left"
                >
                  Curriculum Integration
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCollegesModal}
                  className="hover:text-[#1A1C1E] transition-colors text-left"
                >
                  Career Services Portal
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCollegesModal}
                  className="hover:text-[#1A1C1E] transition-colors text-left"
                >
                  Accreditation Specs
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Architecture & Engineering */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-[#1A1C1E]">
              Developer & Design
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => navigate({ view: 'design-system' })}
                  className="hover:text-[#1A1C1E] transition-colors font-mono"
                >
                  [Design System Docs]
                </button>
              </li>
              <li>
                <button
                  onClick={() => navigate({ view: 'architecture' })}
                  className="hover:text-[#1A1C1E] transition-colors font-mono"
                >
                  [Platform Architecture]
                </button>
              </li>
              <li>
                <span className="text-[#8A8A85]">WCAG 2.1 AA Compliant</span>
              </li>
              <li>
                <span className="text-[#8A8A85]">Zero-Slop Standard</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#E2E2DE] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#8A8A85]">
          <div className="flex items-center gap-4">
            <span>© {new Date().getFullYear()} InternLab Inc. All rights reserved.</span>
            <span>•</span>
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
          </div>

          <div className="text-xs font-mono">
            Designed for authentic workplace learning.
          </div>
        </div>

      </div>
    </footer>
  );
};
