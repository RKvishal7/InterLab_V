import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { LandingNavbar } from './LandingNavbar';
import { HeroSection } from './HeroSection';
import { StatsSection } from './StatsSection';
import { CategoriesSection } from './CategoriesSection';
import { FeaturedInternshipsSection } from './FeaturedInternshipsSection';
import { HowItWorksSection } from './HowItWorksSection';
import { TransformationSection } from './TransformationSection';
import { FinalCtaSection } from './FinalCtaSection';
import { FooterSection } from './FooterSection';
import { ForCollegesModal } from './ForCollegesModal';
import { AuthModal } from './AuthModal';
import { ResourcesModal } from './ResourcesModal';

export const LandingPage: React.FC = () => {
  const { navigate, internships } = useApp();

  // Modals state
  const [collegesModalOpen, setCollegesModalOpen] = useState<boolean>(false);
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [resourcesModalOpen, setResourcesModalOpen] = useState<boolean>(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (sectionId === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectInternship = (internshipId: string) => {
    // Check if we have matching internship in mock database or route to discovery
    const matched = internships.find(
      (i) => i.id === internshipId || i.slug.includes(internshipId) || i.trackId.includes(internshipId)
    );
    if (matched) {
      navigate({ view: 'internship-detail', internshipId: matched.id });
    } else {
      navigate({ view: 'discover' });
    }
  };

  const handleSelectCategory = (categoryId: string) => {
    navigate({ view: 'discover', trackFilter: categoryId as any });
  };

  return (
    <div className="min-h-screen bg-[#F9F8F6] text-[#1A1C1E] flex flex-col selection:bg-[#1A1C1E] selection:text-white font-sans antialiased">
      
      {/* Top sticky navigation */}
      <LandingNavbar
        onOpenCollegesModal={() => setCollegesModalOpen(true)}
        onOpenAuthModal={() => {
          setAuthMode('login');
          setAuthModalOpen(true);
        }}
        onOpenResourcesModal={() => setResourcesModalOpen(true)}
        onScrollToSection={scrollToSection}
      />

      {/* Main Content Sections */}
      <main className="flex-1 w-full">
        
        {/* 1. Hero Section with Live Workplace Simulation Preview */}
        <HeroSection
          onExploreClick={() => scrollToSection('featured-internships')}
          onHowItWorksClick={() => scrollToSection('how-it-works')}
          onSelectInternship={handleSelectInternship}
        />

        {/* 2. Social Proof / Metrics (Horizontal Statistics) */}
        <StatsSection />

        {/* 3. 10 Career Disciplines & Tracks (Editorial Asymmetric Layout) */}
        <CategoriesSection onSelectCategory={handleSelectCategory} />

        {/* 4. Featured Practical Virtual Internships (Frontend, Data, UI/UX, Marketing) */}
        <FeaturedInternshipsSection onSelectInternship={handleSelectInternship} />

        {/* 5. How It Works: 5-Step Experiential Flow */}
        <HowItWorksSection />

        {/* 6. Career Outcome Paradigm Shift (Before vs. After Split Layout) */}
        <TransformationSection />

        {/* 7. Final Call to Action */}
        <FinalCtaSection
          onStartLearning={() => {
            setAuthMode('signup');
            setAuthModalOpen(true);
          }}
          onExploreTracks={() => scrollToSection('categories')}
        />

      </main>

      {/* Footer */}
      <FooterSection
        onScrollToSection={scrollToSection}
        onOpenCollegesModal={() => setCollegesModalOpen(true)}
        onOpenResourcesModal={() => setResourcesModalOpen(true)}
      />

      {/* Modals */}
      <ForCollegesModal
        isOpen={collegesModalOpen}
        onClose={() => setCollegesModalOpen(false)}
      />

      <AuthModal
        isOpen={authModalOpen}
        defaultTab={authMode}
        onClose={() => setAuthModalOpen(false)}
        onSuccess={() => navigate({ view: 'discover' })}
      />

      <ResourcesModal
        isOpen={resourcesModalOpen}
        onClose={() => setResourcesModalOpen(false)}
      />

    </div>
  );
};
