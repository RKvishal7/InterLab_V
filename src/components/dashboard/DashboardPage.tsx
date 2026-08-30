import React, { useState, useEffect } from 'react';
import { DashboardLayout, DashboardTab } from './DashboardLayout';
import { DashboardOverview } from './DashboardOverview';
import { MyInternshipsTab } from './MyInternshipsTab';
import { TasksTab } from './TasksTab';
import { ProjectsTab } from './ProjectsTab';
import { CareerProgressTab } from './CareerProgressTab';
import { CertificatesTab } from './CertificatesTab';
import { ProfileTab } from './ProfileTab';
import { SettingsTab } from './SettingsTab';
import { useApp } from '../../context/AppContext';

interface DashboardPageProps {
  initialTab?: DashboardTab;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ initialTab = 'overview' }) => {
  const { route } = useApp();
  const [activeTab, setActiveTab] = useState<DashboardTab>(initialTab);

  // Synchronize route tab if passed via route
  useEffect(() => {
    if (route.view === 'dashboard' && route.tab) {
      setActiveTab(route.tab as DashboardTab);
    }
  }, [route]);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return <DashboardOverview onNavigateTab={(tab) => setActiveTab(tab)} />;
      case 'my-internships':
        return <MyInternshipsTab />;
      case 'tasks':
        return <TasksTab />;
      case 'projects':
        return <ProjectsTab />;
      case 'career-progress':
        return <CareerProgressTab />;
      case 'certificates':
        return <CertificatesTab />;
      case 'profile':
        return <ProfileTab />;
      case 'settings':
        return <SettingsTab />;
      default:
        return <DashboardOverview onNavigateTab={(tab) => setActiveTab(tab)} />;
    }
  };

  return (
    <DashboardLayout activeTab={activeTab} onSelectTab={setActiveTab}>
      {renderContent()}
    </DashboardLayout>
  );
};
