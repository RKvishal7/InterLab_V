import React, { useState } from 'react';
import { 
  Filter, 
  X, 
  Check, 
  RotateCcw, 
  ChevronDown, 
  ChevronUp, 
  SlidersHorizontal,
  Sparkles,
  Search,
  Layers,
  Clock,
  BarChart2,
  Award,
  DollarSign
} from 'lucide-react';
import { CareerTrackId, ExperienceLevel } from '../../types';

export interface FilterState {
  category: string; // 'all' | CareerTrackId | string
  difficulty: string; // 'all' | ExperienceLevel
  duration: string; // 'all' | 'short' | 'standard' | 'long'
  skills: string[];
  pricing: string; // 'all' | 'free' | 'premium'
  onlyBookmarked?: boolean;
}

interface DiscoveryFiltersProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onReset: () => void;
  availableSkills: string[];
  totalResultsCount: number;
  isMobile?: boolean;
  onCloseMobile?: () => void;
}

export const CAREER_CATEGORIES = [
  { id: 'all', name: 'All Tracks' },
  { id: 'software-engineering', name: 'Software Development' },
  { id: 'data-science-ai', name: 'Data Science & Analytics' },
  { id: 'artificial-intelligence', name: 'Artificial Intelligence' },
  { id: 'uiux-design', name: 'UI/UX Design' },
  { id: 'product-management', name: 'Product Management' },
  { id: 'cloud-computing', name: 'Cloud & DevOps' },
  { id: 'financial-analysis', name: 'Finance & Quant' },
  { id: 'cybersecurity', name: 'Cybersecurity' },
  { id: 'digital-marketing', name: 'Digital Marketing' },
  { id: 'business-strategy', name: 'Business Strategy' },
];

export const DIFFICULTY_LEVELS: { id: string; label: string }[] = [
  { id: 'all', label: 'All Levels' },
  { id: 'Beginner', label: 'Beginner (0-1 yrs exp)' },
  { id: 'Intermediate', label: 'Intermediate (1-2 yrs)' },
  { id: 'Advanced', label: 'Advanced (Project Ready)' },
];

export const DURATION_OPTIONS = [
  { id: 'all', label: 'Any Duration' },
  { id: 'short', label: '2–3 Weeks (Fast-track)' },
  { id: 'standard', label: '4–5 Weeks (Standard)' },
  { id: 'long', label: '6+ Weeks (Deep Dive)' },
];

export const PRICING_OPTIONS = [
  { id: 'all', label: 'All Access Types' },
  { id: 'free', label: 'Free Simulation' },
  { id: 'premium', label: 'Verified Certificate Pro' },
];

export const DiscoveryFilters: React.FC<DiscoveryFiltersProps> = ({
  filters,
  onFilterChange,
  onReset,
  availableSkills,
  totalResultsCount,
  isMobile = false,
  onCloseMobile,
}) => {
  const [skillSearch, setSkillSearch] = useState('');
  const [expandedSection, setExpandedSection] = useState<{ [key: string]: boolean }>({
    category: true,
    difficulty: true,
    duration: true,
    skills: true,
    pricing: true,
  });

  const toggleSection = (section: string) => {
    setExpandedSection(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleCategoryChange = (category: string) => {
    onFilterChange({ ...filters, category });
  };

  const handleDifficultyChange = (difficulty: string) => {
    onFilterChange({ ...filters, difficulty });
  };

  const handleDurationChange = (duration: string) => {
    onFilterChange({ ...filters, duration });
  };

  const handlePricingChange = (pricing: string) => {
    onFilterChange({ ...filters, pricing });
  };

  const handleSkillToggle = (skill: string) => {
    const exists = filters.skills.includes(skill);
    const newSkills = exists 
      ? filters.skills.filter(s => s !== skill)
      : [...filters.skills, skill];
    onFilterChange({ ...filters, skills: newSkills });
  };

  const activeFiltersCount = 
    (filters.category !== 'all' ? 1 : 0) +
    (filters.difficulty !== 'all' ? 1 : 0) +
    (filters.duration !== 'all' ? 1 : 0) +
    (filters.pricing !== 'all' ? 1 : 0) +
    (filters.onlyBookmarked ? 1 : 0) +
    filters.skills.length;

  const filteredSkills = availableSkills.filter(s => 
    s.toLowerCase().includes(skillSearch.toLowerCase())
  );

  return (
    <aside className={`flex flex-col bg-white border border-[#E2E2DE] rounded-lg text-[#1A1C1E] ${isMobile ? 'h-full' : 'sticky top-20'}`}>
      {/* Filters Header */}
      <div className="p-4 border-b border-[#E2E2DE] flex items-center justify-between bg-[#FDFCFB]">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="w-4 h-4 text-[#1A1C1E]" />
          <span className="font-bold text-sm text-[#1A1C1E]">Filters</span>
          {activeFiltersCount > 0 && (
            <span className="px-2 py-0.5 text-[11px] font-bold bg-[#1A1C1E] text-white rounded-full">
              {activeFiltersCount}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {activeFiltersCount > 0 && (
            <button
              onClick={onReset}
              className="text-xs font-semibold text-[#8A8A85] hover:text-[#1A1C1E] flex items-center gap-1 transition-colors"
              title="Reset all filters"
              id="filters-reset-button"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}

          {isMobile && onCloseMobile && (
            <button
              onClick={onCloseMobile}
              className="p-1 rounded-xs hover:bg-[#F2F1EE] text-[#8A8A85] hover:text-[#1A1C1E]"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Filter Groups Container */}
      <div className="p-4 space-y-6 overflow-y-auto max-h-[calc(100vh-200px)]">
        
        {/* 1. Career Category */}
        <div className="border-b border-[#E2E2DE] pb-5">
          <button
            onClick={() => toggleSection('category')}
            className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#484B4F] mb-2.5 font-mono"
            id="filter-toggle-category"
          >
            <span className="flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-[#3E51FF]" />
              <span>Career Category</span>
            </span>
            {expandedSection.category ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {expandedSection.category && (
            <div className="space-y-1 mt-2">
              {CAREER_CATEGORIES.map((cat) => {
                const isSelected = filters.category === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryChange(cat.id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-xs text-xs font-medium transition-all flex items-center justify-between ${
                      isSelected 
                        ? 'bg-[#1A1C1E] text-white font-semibold shadow-xs' 
                        : 'text-[#5A5C60] hover:bg-[#F2F1EE] hover:text-[#1A1C1E]'
                    }`}
                    id={`filter-category-${cat.id}`}
                  >
                    <span>{cat.name}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 2. Difficulty / Experience Level */}
        <div className="border-b border-[#E2E2DE] pb-5">
          <button
            onClick={() => toggleSection('difficulty')}
            className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#484B4F] mb-2.5 font-mono"
            id="filter-toggle-difficulty"
          >
            <span className="flex items-center gap-1.5">
              <BarChart2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>Difficulty & Level</span>
            </span>
            {expandedSection.difficulty ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {expandedSection.difficulty && (
            <div className="space-y-1 mt-2">
              {DIFFICULTY_LEVELS.map((level) => {
                const isSelected = filters.difficulty === level.id;
                return (
                  <button
                    key={level.id}
                    onClick={() => handleDifficultyChange(level.id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-xs text-xs font-medium transition-all flex items-center justify-between ${
                      isSelected 
                        ? 'bg-[#1A1C1E] text-white font-semibold' 
                        : 'text-[#5A5C60] hover:bg-[#F2F1EE] hover:text-[#1A1C1E]'
                    }`}
                    id={`filter-difficulty-${level.id}`}
                  >
                    <span>{level.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 3. Duration */}
        <div className="border-b border-[#E2E2DE] pb-5">
          <button
            onClick={() => toggleSection('duration')}
            className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#484B4F] mb-2.5 font-mono"
            id="filter-toggle-duration"
          >
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-purple-600" />
              <span>Duration</span>
            </span>
            {expandedSection.duration ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {expandedSection.duration && (
            <div className="space-y-1 mt-2">
              {DURATION_OPTIONS.map((opt) => {
                const isSelected = filters.duration === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleDurationChange(opt.id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-xs text-xs font-medium transition-all flex items-center justify-between ${
                      isSelected 
                        ? 'bg-[#1A1C1E] text-white font-semibold' 
                        : 'text-[#5A5C60] hover:bg-[#F2F1EE] hover:text-[#1A1C1E]'
                    }`}
                    id={`filter-duration-${opt.id}`}
                  >
                    <span>{opt.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* 4. Skills Multi-Select */}
        <div className="border-b border-[#E2E2DE] pb-5">
          <button
            onClick={() => toggleSection('skills')}
            className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#484B4F] mb-2.5 font-mono"
            id="filter-toggle-skills"
          >
            <span className="flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Skills & Tools {filters.skills.length > 0 && `(${filters.skills.length})`}</span>
            </span>
            {expandedSection.skills ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {expandedSection.skills && (
            <div className="space-y-2.5 mt-2">
              {/* Skill search input */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-[#8A8A85]" />
                <input
                  type="text"
                  placeholder="Filter skills..."
                  value={skillSearch}
                  onChange={(e) => setSkillSearch(e.target.value)}
                  className="w-full pl-8 pr-3 py-1 text-xs bg-[#F9F8F6] border border-[#E2E2DE] rounded-xs focus:outline-none focus:border-[#1A1C1E]"
                />
              </div>

              {/* Skills Tag Cloud */}
              <div className="flex flex-wrap gap-1.5 max-h-40 overflow-y-auto pr-1">
                {filteredSkills.slice(0, 18).map((skill) => {
                  const isSelected = filters.skills.includes(skill);
                  return (
                    <button
                      key={skill}
                      onClick={() => handleSkillToggle(skill)}
                      className={`text-[11px] px-2 py-1 rounded-xs border transition-all flex items-center gap-1 ${
                        isSelected
                          ? 'bg-[#1A1C1E] border-[#1A1C1E] text-white font-medium shadow-xs'
                          : 'bg-[#FDFCFB] border-[#E2E2DE] text-[#484B4F] hover:border-[#1A1C1E] hover:text-[#1A1C1E]'
                      }`}
                      id={`filter-skill-${skill.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                    >
                      <span>{skill}</span>
                      {isSelected && <X className="w-2.5 h-2.5 ml-0.5 text-white/80" />}
                    </button>
                  );
                })}
              </div>

              {filters.skills.length > 0 && (
                <button
                  onClick={() => onFilterChange({ ...filters, skills: [] })}
                  className="text-[11px] text-[#8A8A85] hover:text-[#1A1C1E] underline font-medium"
                >
                  Clear all selected skills
                </button>
              )}
            </div>
          )}
        </div>

        {/* 5. Free / Premium Tier */}
        <div>
          <button
            onClick={() => toggleSection('pricing')}
            className="w-full flex items-center justify-between text-xs font-bold uppercase tracking-wider text-[#484B4F] mb-2.5 font-mono"
            id="filter-toggle-pricing"
          >
            <span className="flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-blue-600" />
              <span>Access & Certification</span>
            </span>
            {expandedSection.pricing ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {expandedSection.pricing && (
            <div className="space-y-1 mt-2">
              {PRICING_OPTIONS.map((tier) => {
                const isSelected = filters.pricing === tier.id;
                return (
                  <button
                    key={tier.id}
                    onClick={() => handlePricingChange(tier.id)}
                    className={`w-full text-left px-2.5 py-1.5 rounded-xs text-xs font-medium transition-all flex items-center justify-between ${
                      isSelected 
                        ? 'bg-[#1A1C1E] text-white font-semibold' 
                        : 'text-[#5A5C60] hover:bg-[#F2F1EE] hover:text-[#1A1C1E]'
                    }`}
                    id={`filter-pricing-${tier.id}`}
                  >
                    <span>{tier.label}</span>
                    {isSelected && <Check className="w-3.5 h-3.5 text-white" />}
                  </button>
                );
              })}
            </div>
          )}
        </div>

      </div>

      {/* Mobile Footer Apply Button */}
      {isMobile && (
        <div className="p-4 border-t border-[#E2E2DE] bg-[#FDFCFB]">
          <button
            onClick={onCloseMobile}
            className="w-full py-2.5 bg-[#1A1C1E] hover:bg-black text-white font-semibold text-xs uppercase tracking-wider rounded-xs transition-colors shadow-xs"
            id="mobile-apply-filters-button"
          >
            View {totalResultsCount} Results
          </button>
        </div>
      )}
    </aside>
  );
};
