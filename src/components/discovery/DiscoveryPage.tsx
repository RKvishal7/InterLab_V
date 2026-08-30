import React, { useState, useMemo } from 'react';
import { 
  Search, 
  SlidersHorizontal, 
  Sparkles, 
  ArrowUpDown, 
  X, 
  Bookmark, 
  CheckCircle2, 
  Compass, 
  Layers, 
  Filter, 
  RotateCcw, 
  Grid, 
  List, 
  Building2, 
  Clock, 
  BarChart2, 
  Award,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { VirtualInternship, CareerTrackId, ExperienceLevel } from '../../types';
import { Navbar } from '../layout/Navbar';
import { DiscoveryFilters, FilterState, CAREER_CATEGORIES } from './DiscoveryFilters';
import { DiscoveryItemRow } from './DiscoveryItemRow';
import { DiscoveryRecommendedSection } from './DiscoveryRecommendedSection';
import { InternshipPreviewModal } from './InternshipPreviewModal';

type SortOption = 'relevant' | 'newest' | 'duration' | 'popular';

export const DiscoveryPage: React.FC = () => {
  const { internships, userProfile, enrollInInternship, navigate } = useApp();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState<SortOption>('relevant');
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>(['intern-cloudscale-backend', 'intern-nova-frontend']);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [previewInternship, setPreviewInternship] = useState<VirtualInternship | null>(null);

  const [filters, setFilters] = useState<FilterState>({
    category: 'all',
    difficulty: 'all',
    duration: 'all',
    skills: [],
    pricing: 'all',
    onlyBookmarked: false,
  });

  // Extract all unique skills across all simulations
  const allAvailableSkills = useMemo(() => {
    const skillSet = new Set<string>();
    internships.forEach(i => {
      i.toolsUsed.forEach(t => skillSet.add(t));
      i.whatYouWillLearn.forEach(w => {
        // also extract key terms
        if (w.includes('React')) skillSet.add('React');
        if (w.includes('TypeScript')) skillSet.add('TypeScript');
        if (w.includes('Python')) skillSet.add('Python');
        if (w.includes('SQL')) skillSet.add('SQL');
        if (w.includes('Figma')) skillSet.add('Figma');
      });
    });
    return Array.from(skillSet).sort();
  }, [internships]);

  // Compute recommendation match score for student
  const getMatchScore = (internship: VirtualInternship): number => {
    const onboarding = userProfile.onboardingData;
    let score = 75;

    if (onboarding) {
      // Check career interest match
      const trackMatched = onboarding.careerInterests?.some((ci) => {
        const lower = ci.toLowerCase();
        if (lower.includes('software') && internship.trackId === 'software-engineering') return true;
        if (lower.includes('data') && internship.trackId === 'data-science-ai') return true;
        if ((lower.includes('ai') || lower.includes('artificial')) && internship.trackId === 'artificial-intelligence') return true;
        if (lower.includes('design') && internship.trackId === 'uiux-design') return true;
        if (lower.includes('product') && internship.trackId === 'product-management') return true;
        if (lower.includes('finance') && internship.trackId === 'financial-analysis') return true;
        if (lower.includes('cloud') && internship.trackId.includes('cloud')) return true;
        return false;
      });
      if (trackMatched) score += 15;

      // Check skill overlap
      const skillOverlap = internship.toolsUsed.filter(t => 
        onboarding.skills?.some(s => t.toLowerCase().includes(s.toLowerCase()) || s.toLowerCase().includes(t.toLowerCase()))
      );
      score += Math.min(8, skillOverlap.length * 3);

      // Check experience level
      if (onboarding.experienceLevel === internship.difficulty) score += 2;
    } else {
      // Fallback base logic if onboarding not filled
      if (internship.difficulty === userProfile.experienceLevel) score += 10;
      if (internship.trackId === userProfile.targetCareerTrack) score += 12;
    }

    return Math.min(99, Math.max(82, score));
  };

  // Toggle bookmark handler
  const handleToggleBookmark = (id: string) => {
    setBookmarkedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Reset filters
  const handleResetFilters = () => {
    setFilters({
      category: 'all',
      difficulty: 'all',
      duration: 'all',
      skills: [],
      pricing: 'all',
      onlyBookmarked: false,
    });
    setSearchQuery('');
  };

  // Handle enrollment
  const handleEnroll = (internshipId: string) => {
    enrollInInternship(internshipId);
    navigate({ view: 'workspace', internshipId });
  };

  // Filter & Search Logic
  const filteredInternships = useMemo(() => {
    return internships.filter((internship) => {
      // Search query filter
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const titleMatch = internship.title.toLowerCase().includes(q);
        const companyMatch = internship.companyName.toLowerCase().includes(q);
        const summaryMatch = internship.summary.toLowerCase().includes(q);
        const trackMatch = internship.trackId.toLowerCase().includes(q);
        const skillsMatch = internship.toolsUsed.some(t => t.toLowerCase().includes(q));
        const badgeMatch = internship.badgeTitle.toLowerCase().includes(q);

        if (!titleMatch && !companyMatch && !summaryMatch && !trackMatch && !skillsMatch && !badgeMatch) {
          return false;
        }
      }

      // Category filter
      if (filters.category !== 'all') {
        if (internship.trackId !== filters.category) return false;
      }

      // Difficulty / Experience level filter
      if (filters.difficulty !== 'all') {
        if (internship.difficulty !== filters.difficulty) return false;
      }

      // Duration filter
      if (filters.duration !== 'all') {
        if (filters.duration === 'short' && internship.durationWeeks > 3) return false;
        if (filters.duration === 'standard' && (internship.durationWeeks < 4 || internship.durationWeeks > 5)) return false;
        if (filters.duration === 'long' && internship.durationWeeks < 6) return false;
      }

      // Pricing / certification filter
      if (filters.pricing !== 'all') {
        const tier = internship.pricingTier || 'free';
        if (tier !== filters.pricing) return false;
      }

      // Skills multi-filter (must match at least one selected skill if selected)
      if (filters.skills.length > 0) {
        const hasMatchingSkill = filters.skills.some(selectedSkill =>
          internship.toolsUsed.some(tool => tool.toLowerCase().includes(selectedSkill.toLowerCase()))
        );
        if (!hasMatchingSkill) return false;
      }

      // Bookmarked filter
      if (filters.onlyBookmarked) {
        if (!bookmarkedIds.includes(internship.id)) return false;
      }

      return true;
    });
  }, [internships, searchQuery, filters, bookmarkedIds]);

  // Sorting Logic
  const sortedInternships = useMemo(() => {
    const list = [...filteredInternships];

    switch (sortOption) {
      case 'relevant':
        return list.sort((a, b) => getMatchScore(b) - getMatchScore(a));
      case 'newest':
        // sort by graduates/recency index
        return list.sort((a, b) => b.graduatesCount - a.graduatesCount);
      case 'duration':
        return list.sort((a, b) => a.durationWeeks - b.durationWeeks);
      case 'popular':
        return list.sort((a, b) => b.rating - a.rating || b.graduatesCount - a.graduatesCount);
      default:
        return list;
    }
  }, [filteredInternships, sortOption]);

  // Top recommendations for the spotlight banner
  const recommendedForYou = useMemo(() => {
    return internships
      .map(i => ({ ...i, matchScore: getMatchScore(i) }))
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 3);
  }, [internships]);

  const activeFiltersCount = 
    (filters.category !== 'all' ? 1 : 0) +
    (filters.difficulty !== 'all' ? 1 : 0) +
    (filters.duration !== 'all' ? 1 : 0) +
    (filters.pricing !== 'all' ? 1 : 0) +
    (filters.onlyBookmarked ? 1 : 0) +
    filters.skills.length;

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#1A1C1E] flex flex-col font-sans selection:bg-[#EEF0FF] selection:text-[#3E51FF]">
      <Navbar />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        
        {/* ================= PAGE HEADER ================= */}
        <div className="mb-8">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="px-2.5 py-1 text-xs font-bold uppercase tracking-wider bg-[#1A1C1E] text-white rounded-xs font-mono">
              Simulation Discovery
            </span>
            <span className="text-xs text-[#8A8A85] font-mono">
              • {internships.length} Verified Virtual Internships
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#1A1C1E] tracking-tight mb-3">
            Find Your Next Experience
          </h1>
          <p className="text-base sm:text-lg text-[#5A5C60] max-w-3xl leading-relaxed">
            Explore practical internships designed to help you build real skills.
          </p>
        </div>

        {/* ================= SEARCH INTERFACE ================= */}
        <div className="mb-8">
          <div className="relative bg-white rounded-lg shadow-sm border border-[#E2E2DE] focus-within:border-[#1A1C1E] focus-within:shadow-md transition-all p-2 flex items-center gap-3">
            <div className="pl-3 text-[#8A8A85]">
              <Search className="w-5 h-5" />
            </div>
            
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search internships, skills or career paths..."
              className="w-full text-base bg-transparent border-none text-[#1A1C1E] placeholder:text-[#8A8A85] focus:outline-none py-2"
              id="discovery-search-input"
            />

            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="p-1.5 rounded-full hover:bg-[#F2F1EE] text-[#8A8A85] hover:text-[#1A1C1E] transition-colors"
                title="Clear search"
                id="clear-search-button"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => setMobileFilterOpen(true)}
              className="lg:hidden px-3.5 py-2 bg-[#F2F1EE] hover:bg-[#E2E2DE] text-[#1A1C1E] text-xs font-semibold rounded-xs transition-colors flex items-center gap-1.5 shrink-0"
              id="mobile-filter-open-button"
            >
              <SlidersHorizontal className="w-3.5 h-3.5" />
              <span>Filters</span>
              {activeFiltersCount > 0 && (
                <span className="w-4 h-4 bg-[#1A1C1E] text-white rounded-full text-[10px] flex items-center justify-center font-mono">
                  {activeFiltersCount}
                </span>
              )}
            </button>
          </div>

          {/* Quick Search Chips */}
          <div className="flex flex-wrap items-center gap-2 mt-3 text-xs text-[#5A5C60]">
            <span className="font-mono text-[#8A8A85]">Popular searches:</span>
            {['React', 'Python', 'Data Analyst', 'UI/UX Design', 'Product Management', 'Cybersecurity', 'Cloud'].map((tag) => (
              <button
                key={tag}
                onClick={() => setSearchQuery(tag)}
                className={`px-2.5 py-1 rounded-xs border transition-all ${
                  searchQuery.toLowerCase() === tag.toLowerCase()
                    ? 'bg-[#1A1C1E] border-[#1A1C1E] text-white font-medium'
                    : 'bg-white border-[#E2E2DE] text-[#484B4F] hover:border-[#1A1C1E] hover:text-[#1A1C1E]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* ================= RECOMMENDED FOR YOU SECTION ================= */}
        {/* Only show when not aggressively filtering by search query to preserve discovery focus */}
        {!searchQuery && filters.category === 'all' && (
          <DiscoveryRecommendedSection 
            recommendedInternships={recommendedForYou}
            onPreview={(internship) => setPreviewInternship(internship)}
            onEnroll={handleEnroll}
          />
        )}

        {/* ================= MAIN TWO-COLUMN DISCOVERY LAYOUT ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT SIDEBAR: FILTERS (DESKTOP) */}
          <div className="hidden lg:block lg:col-span-4 xl:col-span-3">
            <DiscoveryFilters 
              filters={filters}
              onFilterChange={setFilters}
              onReset={handleResetFilters}
              availableSkills={allAvailableSkills}
              totalResultsCount={sortedInternships.length}
            />
          </div>

          {/* RIGHT COLUMN: RESULTS & CONTROLS */}
          <div className="lg:col-span-8 xl:col-span-9 space-y-4">
            
            {/* Sorting, View & Active Filter Strip */}
            <div className="bg-white p-4 border border-[#E2E2DE] rounded-lg shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              
              {/* Results Count & Bookmark Filter */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-[#1A1C1E]">
                  Showing {sortedInternships.length} simulation{sortedInternships.length === 1 ? '' : 's'}
                </span>

                <button
                  onClick={() => setFilters(prev => ({ ...prev, onlyBookmarked: !prev.onlyBookmarked }))}
                  className={`text-xs px-2.5 py-1 rounded-xs border transition-colors flex items-center gap-1.5 ${
                    filters.onlyBookmarked
                      ? 'bg-amber-50 border-amber-300 text-amber-800 font-semibold'
                      : 'bg-[#F9F8F6] border-[#E2E2DE] text-[#5A5C60] hover:text-[#1A1C1E]'
                  }`}
                  id="filter-saved-toggle"
                >
                  <Bookmark className={`w-3.5 h-3.5 ${filters.onlyBookmarked ? 'fill-amber-600' : ''}`} />
                  <span>Saved ({bookmarkedIds.length})</span>
                </button>
              </div>

              {/* Sorting Dropdown */}
              <div className="flex items-center gap-2">
                <label htmlFor="sort-dropdown" className="text-xs text-[#8A8A85] font-mono shrink-0">
                  Sort by:
                </label>
                <select
                  id="sort-dropdown"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value as SortOption)}
                  className="text-xs font-semibold bg-[#F9F8F6] border border-[#E2E2DE] text-[#1A1C1E] rounded-xs px-2.5 py-1.5 focus:outline-none focus:border-[#1A1C1E] cursor-pointer"
                >
                  <option value="relevant">Most Relevant</option>
                  <option value="popular">Most Popular ★</option>
                  <option value="duration">Shortest Duration</option>
                  <option value="newest">Newest Additions</option>
                </select>
              </div>
            </div>

            {/* Active Filters Pills Container */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 p-2 bg-[#F9F8F6] border border-[#E2E2DE] rounded-xs text-xs">
                <span className="text-[11px] font-mono text-[#8A8A85] mr-1">Active filters:</span>
                
                {filters.category !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white border border-[#E2E2DE] rounded-xs text-[#1A1C1E] font-medium">
                    Category: {CAREER_CATEGORIES.find(c => c.id === filters.category)?.name}
                    <button onClick={() => setFilters(f => ({ ...f, category: 'all' }))} className="hover:text-red-500">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {filters.difficulty !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white border border-[#E2E2DE] rounded-xs text-[#1A1C1E] font-medium">
                    Level: {filters.difficulty}
                    <button onClick={() => setFilters(f => ({ ...f, difficulty: 'all' }))} className="hover:text-red-500">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {filters.duration !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white border border-[#E2E2DE] rounded-xs text-[#1A1C1E] font-medium">
                    Duration: {filters.duration === 'short' ? '2-3 Weeks' : filters.duration === 'standard' ? '4-5 Weeks' : '6+ Weeks'}
                    <button onClick={() => setFilters(f => ({ ...f, duration: 'all' }))} className="hover:text-red-500">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {filters.pricing !== 'all' && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white border border-[#E2E2DE] rounded-xs text-[#1A1C1E] font-medium">
                    Tier: {filters.pricing === 'free' ? 'Free' : 'Verified Pro'}
                    <button onClick={() => setFilters(f => ({ ...f, pricing: 'all' }))} className="hover:text-red-500">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                {filters.skills.map((s) => (
                  <span key={s} className="inline-flex items-center gap-1 px-2 py-0.5 bg-white border border-[#E2E2DE] rounded-xs text-[#1A1C1E] font-medium">
                    Skill: {s}
                    <button onClick={() => setFilters(f => ({ ...f, skills: f.skills.filter(sk => sk !== s) }))} className="hover:text-red-500">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}

                {filters.onlyBookmarked && (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-amber-50 border border-amber-200 text-amber-800 rounded-xs font-medium">
                    Saved only
                    <button onClick={() => setFilters(f => ({ ...f, onlyBookmarked: false }))} className="hover:text-red-500">
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                )}

                <button
                  onClick={handleResetFilters}
                  className="text-[11px] font-semibold text-[#8A8A85] hover:text-[#1A1C1E] underline ml-2"
                >
                  Clear all
                </button>
              </div>
            )}

            {/* RESULTS LIST: REFINED LIST/GRID HYBRID */}
            {sortedInternships.length > 0 ? (
              <div className="space-y-4" id="discovery-results-container">
                {sortedInternships.map((internship) => {
                  const isEnrolled = !!userProfile.enrolledInternships[internship.id];
                  const isBookmarked = bookmarkedIds.includes(internship.id);
                  const matchScore = getMatchScore(internship);

                  return (
                    <DiscoveryItemRow
                      key={internship.id}
                      internship={internship}
                      isEnrolled={isEnrolled}
                      isBookmarked={isBookmarked}
                      matchScore={matchScore}
                      onPreview={(inst) => setPreviewInternship(inst)}
                      onEnroll={handleEnroll}
                      onToggleBookmark={handleToggleBookmark}
                    />
                  );
                })}
              </div>
            ) : (
              /* EMPTY STATE */
              <div className="p-12 text-center bg-white border border-[#E2E2DE] rounded-lg shadow-xs space-y-4">
                <div className="w-12 h-12 rounded-full bg-[#F2F1EE] text-[#8A8A85] flex items-center justify-center mx-auto">
                  <Search className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1A1C1E] mb-1">
                    No matching simulations found
                  </h3>
                  <p className="text-sm text-[#5A5C60] max-w-md mx-auto">
                    Try adjusting your keyword search, removing active filters, or exploring all career tracks.
                  </p>
                </div>
                <button
                  onClick={handleResetFilters}
                  className="px-5 py-2 text-xs font-semibold bg-[#1A1C1E] text-white hover:bg-black rounded-xs transition-colors shadow-xs"
                >
                  Reset All Filters
                </button>
              </div>
            )}

          </div>

        </div>

      </main>

      {/* ================= MOBILE FILTER DRAWER ================= */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-150">
          <div className="w-full max-w-md bg-white h-full shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-200">
            <DiscoveryFilters
              filters={filters}
              onFilterChange={setFilters}
              onReset={handleResetFilters}
              availableSkills={allAvailableSkills}
              totalResultsCount={sortedInternships.length}
              isMobile={true}
              onCloseMobile={() => setMobileFilterOpen(false)}
            />
          </div>
        </div>
      )}

      {/* ================= QUICK VIEW PREVIEW MODAL ================= */}
      <InternshipPreviewModal
        internship={previewInternship}
        onClose={() => setPreviewInternship(null)}
        onEnroll={handleEnroll}
        isEnrolled={previewInternship ? !!userProfile.enrolledInternships[previewInternship.id] : false}
        isBookmarked={previewInternship ? bookmarkedIds.includes(previewInternship.id) : false}
        onToggleBookmark={handleToggleBookmark}
      />
    </div>
  );
};
