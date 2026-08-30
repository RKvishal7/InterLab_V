import React, { useState } from 'react';
import { 
  Lightbulb, 
  X, 
  ChevronRight, 
  ChevronDown, 
  Code2, 
  Sparkles, 
  CheckCircle2, 
  MessageSquare,
  ArrowRight,
  HelpCircle
} from 'lucide-react';

interface HintModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface HintStep {
  id: number;
  title: string;
  category: string;
  summary: string;
  details: string;
  codeSnippet?: string;
}

const HINTS: HintStep[] = [
  {
    id: 1,
    title: 'Responsive 2-Column to 1-Column Layout Structure',
    category: 'Layout & Breakpoints',
    summary: 'Structuring the parent container with CSS Grid or Flexbox to smoothly adapt from desktop to mobile screens.',
    details: 'On desktop (min-width: 1024px), use a two-column grid with the image gallery occupying column 1 (sticky or scroll-synced) and product details occupying column 2. On tablet/mobile, wrap the grid into a single vertical stack with generous 24px margin between gallery and purchase controls.',
    codeSnippet: `<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
    {/* Left Column: Image Gallery (7 cols) */}
    <div className="lg:col-span-7">
      <ProductGallery images={product.images} />
    </div>
    {/* Right Column: Product Info & Cart (5 cols) */}
    <div className="lg:col-span-5 lg:sticky lg:top-24">
      <ProductInfo product={product} onAddToCart={handleAddToCart} />
    </div>
  </div>
</div>`,
  },
  {
    id: 2,
    title: 'Image Gallery State & Thumbnail Synchronization',
    category: 'State & Interaction',
    summary: 'Managing active thumbnail index with smooth transition and alt text for accessibility.',
    details: 'Store the active image index in local component state. Ensure all thumbnail buttons include aria-label and aria-pressed attributes for screen readers, and provide visual active borders with zero layout shift.',
    codeSnippet: `const [activeImageIdx, setActiveImageIdx] = useState(0);

return (
  <div className="space-y-4">
    {/* Main Preview with aspect ratio constraint */}
    <div className="aspect-square bg-[#F4F3EF] rounded-sm overflow-hidden border border-[#E5E3DC]">
      <img 
        src={images[activeImageIdx].url} 
        alt={images[activeImageIdx].alt} 
        className="w-full h-full object-cover transition-opacity duration-300"
      />
    </div>
    {/* Thumbnail Selector Strip */}
    <div className="flex gap-3 overflow-x-auto pb-2">
      {images.map((img, idx) => (
        <button
          key={img.id}
          onClick={() => setActiveImageIdx(idx)}
          className={\`w-20 h-20 rounded-xs border-2 overflow-hidden \${
            activeImageIdx === idx ? 'border-[#3E51FF] ring-2 ring-[#3E51FF]/20' : 'border-transparent opacity-70 hover:opacity-100'
          }\`}
        >
          <img src={img.thumbnail} alt="" className="w-full h-full object-cover" />
        </button>
      ))}
    </div>
  </div>
);`,
  },
  {
    id: 3,
    title: 'Optimistic Add to Cart & Sticky Mobile CTA',
    category: 'Mobile UX & Cart',
    summary: 'Providing instant visual feedback when the user clicks Add to Cart and ensuring thumb accessibility on mobile.',
    details: 'On viewports below 640px, consider placing a persistent fixed bottom drawer or floating bar for the primary "Add to Cart" button so users do not have to scroll past long product descriptions to buy.',
    codeSnippet: `// Fixed Mobile Bottom Action Bar (hidden on lg screens)
<div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/95 backdrop-blur-md border-t border-[#E5E3DC] z-40 flex items-center justify-between gap-4">
  <div>
    <div className="text-xs text-[#5A5C60]">Total Price</div>
    <div className="text-lg font-bold text-[#1A1C1E]">\${(product.price * quantity).toFixed(2)}</div>
  </div>
  <button 
    onClick={handleAddToCart}
    className="flex-1 bg-[#1A1C1E] hover:bg-black text-white font-semibold py-3 px-6 rounded-xs text-sm"
  >
    Add to Cart • {quantity}
  </button>
</div>`,
  },
  {
    id: 4,
    title: 'Production Verification Checklist (Lighthouse & WCAG)',
    category: 'Code Quality',
    summary: 'Key acceptance criteria to check before final PR submission.',
    details: '1. Verify contrast ratio > 4.5:1 on all text\n2. Touch targets must be at least 44x44px\n3. Add keyboard navigation (Enter/Space on swatches)\n4. Prevent layout shift (CLS) by giving image containers fixed aspect ratios.',
  },
];

export const HintModal: React.FC<HintModalProps> = ({ isOpen, onClose }) => {
  const [unlockedStep, setUnlockedStep] = useState<number>(1);
  const [expandedHint, setExpandedHint] = useState<number | null>(1);

  if (!isOpen) return null;

  const handleUnlockNext = () => {
    if (unlockedStep < HINTS.length) {
      const next = unlockedStep + 1;
      setUnlockedStep(next);
      setExpandedHint(next);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        className="bg-white border border-[#D5D3CB] rounded-sm shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col overflow-hidden text-[#1A1C1E]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#E5E3DC] bg-[#F9F8F6] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xs bg-[#EEF0FF] border border-[#C5CAFF] flex items-center justify-center text-[#3E51FF]">
              <Lightbulb className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm text-[#1A1C1E]">Engineering Guidance & Hints</h3>
                <span className="px-2 py-0.5 text-[10px] font-mono uppercase bg-[#1A1C1E] text-white rounded-xs">
                  Nova Labs Mentor
                </span>
              </div>
              <p className="text-xs text-[#5A5C60] mt-0.5">
                Progressive clues to help unblock your frontend implementation without spoiling the solution.
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-[#8A8A85] hover:text-[#1A1C1E] hover:bg-[#EAE8E1] rounded-xs transition-colors"
            id="hint-modal-close-btn"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Hints List */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {HINTS.map((hint) => {
            const isUnlocked = hint.id <= unlockedStep;
            const isExpanded = expandedHint === hint.id && isUnlocked;

            return (
              <div 
                key={hint.id}
                className={`border rounded-xs transition-all ${
                  isUnlocked 
                    ? 'border-[#D5D3CB] bg-[#FDFCFB]' 
                    : 'border-dashed border-[#D5D3CB] bg-[#F5F4F0]/60 opacity-60'
                }`}
              >
                <div 
                  onClick={() => isUnlocked && setExpandedHint(isExpanded ? null : hint.id)}
                  className={`p-4 flex items-center justify-between gap-4 cursor-pointer select-none ${
                    !isUnlocked ? 'cursor-not-allowed' : 'hover:bg-[#F9F8F6]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-mono font-bold ${
                      isUnlocked 
                        ? 'bg-[#1A1C1E] text-white' 
                        : 'bg-[#D5D3CB] text-[#5A5C60]'
                    }`}>
                      {hint.id}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-[#3E51FF] uppercase font-bold tracking-wider">
                          {hint.category}
                        </span>
                      </div>
                      <h4 className="text-sm font-bold text-[#1A1C1E] mt-0.5">
                        {isUnlocked ? hint.title : `Hint ${hint.id}: Locked`}
                      </h4>
                      {isUnlocked && !isExpanded && (
                        <p className="text-xs text-[#5A5C60] line-clamp-1 mt-0.5">
                          {hint.summary}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {isUnlocked ? (
                      isExpanded ? (
                        <ChevronDown className="w-4 h-4 text-[#5A5C60]" />
                      ) : (
                        <ChevronRight className="w-4 h-4 text-[#5A5C60]" />
                      )
                    ) : (
                      <span className="text-xs font-mono text-[#8A8A85]">Locked</span>
                    )}
                  </div>
                </div>

                {isExpanded && isUnlocked && (
                  <div className="px-4 pb-4 pt-1 border-t border-[#E5E3DC] text-xs text-[#3A3C40] space-y-3">
                    <p className="leading-relaxed whitespace-pre-line text-[#1A1C1E]">
                      {hint.details}
                    </p>

                    {hint.codeSnippet && (
                      <div className="mt-2">
                        <div className="flex items-center justify-between text-[11px] font-mono px-3 py-1 bg-[#1A1C1E] text-[#B5B8BE] rounded-t-xs border-b border-white/10">
                          <span className="flex items-center gap-1.5">
                            <Code2 className="w-3.5 h-3.5 text-[#8898FF]" />
                            Example Architecture Pattern
                          </span>
                          <span className="text-[10px] text-[#8A8A85]">React + Tailwind</span>
                        </div>
                        <pre className="p-3 bg-[#111214] text-[#E0E2E6] font-mono text-[11px] rounded-b-xs overflow-x-auto leading-relaxed border border-[#1A1C1E]">
                          <code>{hint.codeSnippet}</code>
                        </pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 border-t border-[#E5E3DC] bg-[#F9F8F6] flex items-center justify-between gap-4">
          <div className="text-xs text-[#5A5C60] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#3E51FF]" />
            <span>
              {unlockedStep} of {HINTS.length} hints unlocked
            </span>
          </div>

          <div className="flex items-center gap-2">
            {unlockedStep < HINTS.length && (
              <button
                onClick={handleUnlockNext}
                className="px-3.5 py-1.5 text-xs font-semibold bg-[#EEF0FF] hover:bg-[#DCE1FF] text-[#3E51FF] border border-[#C5CAFF] rounded-xs transition-colors flex items-center gap-1.5"
                id="hint-unlock-next-btn"
              >
                <span>Unlock Next Hint</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
            <button
              onClick={onClose}
              className="px-4 py-1.5 text-xs font-bold bg-[#1A1C1E] hover:bg-black text-white rounded-xs transition-colors"
              id="hint-done-btn"
            >
              Back to Workspace
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
