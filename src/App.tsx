import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { ArchitectureOverview } from './components/architecture/ArchitectureOverview';
import { DesignSystemShowcase } from './design-system/DesignSystemShowcase';
import { LandingPage } from './components/landing/LandingPage';
import { SignUpPage, LoginPage, ForgotPasswordPage } from './components/auth';
import { OnboardingPage } from './components/onboarding/OnboardingPage';
import { RecommendedInternshipsPage } from './components/onboarding/RecommendedInternshipsPage';
import { DiscoveryPage } from './components/discovery/DiscoveryPage';
import { InternshipExperiencePage } from './components/experience/InternshipExperiencePage';
import { DashboardPage } from './components/dashboard/DashboardPage';
import { WorkspacePage } from './components/workspace/WorkspacePage';
import { ProjectFeedbackPage } from './components/feedback/ProjectFeedbackPage';
import { MentorAssistantPanel } from './components/mentor/MentorAssistantPanel';
import { MentorFloatingTrigger } from './components/mentor/MentorFloatingTrigger';
import { CompletionCelebrationPage } from './components/certificate/CompletionCelebrationPage';
import { VerifyCertificatePage } from './components/certificate/VerifyCertificatePage';
import { StudentPortfolioPage } from './components/portfolio/StudentPortfolioPage';
import { UniversityLandingPage } from './components/university/UniversityLandingPage';
import { CollegeDashboardPage } from './components/university/CollegeDashboardPage';

function MainContent() {
  const { route } = useApp();

  if (route.view === 'universities') {
    return (
      <div className="min-h-screen bg-[#FDFCFB] text-[#1A1C1E] flex flex-col font-sans selection:bg-[#EEF0FF] selection:text-[#3E51FF]">
        <Navbar />
        <main className="flex-1">
          <UniversityLandingPage />
        </main>
      </div>
    );
  }

  if (route.view === 'college-dashboard') {
    return (
      <div className="min-h-screen bg-[#FDFCFB] text-[#1A1C1E] flex flex-col font-sans selection:bg-[#EEF0FF] selection:text-[#3E51FF]">
        <Navbar />
        <main className="flex-1">
          <CollegeDashboardPage initialTab={route.tab || 'overview'} />
        </main>
      </div>
    );
  }

  if (route.view === 'completion-celebration') {
    return <CompletionCelebrationPage internshipId={route.internshipId} />;
  }

  if (route.view === 'verify-certificate') {
    return <VerifyCertificatePage initialCertificateId={route.certificateId} />;
  }

  if (route.view === 'certificate') {
    return <CompletionCelebrationPage internshipId={route.certificateId} />;
  }

  if (route.view === 'portfolio') {
    return <StudentPortfolioPage />;
  }

  if (route.view === 'project-feedback' || route.view === 'review-hub') {
    return <ProjectFeedbackPage />;
  }

  if (route.view === 'workspace') {
    return <WorkspacePage internshipId={route.internshipId} initialTab={route.activeTab as any} />;
  }

  if (route.view === 'dashboard') {
    return <DashboardPage initialTab={route.tab || 'overview'} />;
  }

  if (route.view === 'my-learning') {
    return <DashboardPage initialTab="my-internships" />;
  }

  if (route.view === 'career-progress') {
    return <DashboardPage initialTab="career-progress" />;
  }

  if (route.view === 'landing') {
    return <LandingPage />;
  }

  if (route.view === 'login') {
    return <LoginPage />;
  }

  if (route.view === 'signup') {
    return <SignUpPage />;
  }

  if (route.view === 'forgot-password') {
    return <ForgotPasswordPage />;
  }

  if (route.view === 'onboarding') {
    return <OnboardingPage />;
  }

  if (route.view === 'recommended-internships') {
    return <RecommendedInternshipsPage />;
  }

  if (route.view === 'discover') {
    return <DiscoveryPage />;
  }

  if (route.view === 'internship-detail') {
    return <InternshipExperiencePage internshipId={route.internshipId} />;
  }

  if (route.view === 'architecture') {
    return (
      <div className="min-h-screen bg-[#F9F8F6] text-[#1A1C1E] flex flex-col font-sans selection:bg-[#EEF0FF] selection:text-[#3E51FF]">
        <Navbar />
        <main className="flex-1">
          <ArchitectureOverview />
        </main>
      </div>
    );
  }

  if (route.view === 'design-system') {
    return (
      <div className="min-h-screen bg-[#F9F8F6] text-[#1A1C1E] flex flex-col font-sans selection:bg-[#EEF0FF] selection:text-[#3E51FF]">
        <Navbar />
        <main className="flex-1">
          <DesignSystemShowcase />
        </main>
      </div>
    );
  }

  // Fallback to landing page
  return <LandingPage />;
}

export default function App() {
  return (
    <AppProvider>
      <MainContent />
      <MentorAssistantPanel />
      <MentorFloatingTrigger />
    </AppProvider>
  );
}


