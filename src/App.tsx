import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { SystemPipelineBar } from './components/SystemPipelineBar';
import { DemoModeModal } from './components/DemoModeModal';

// Tabs
import { DashboardOverview } from './components/tabs/DashboardOverview';
import { LiveSensors } from './components/tabs/LiveSensors';
import { DiseaseDetection } from './components/tabs/DiseaseDetection';
import { MultimodalRisk } from './components/tabs/MultimodalRisk';
import { GenAiAdvisor } from './components/tabs/GenAiAdvisor';
import { SmartIrrigation } from './components/tabs/SmartIrrigation';
import { FarmZones } from './components/tabs/FarmZones';
import { SystemArchitecture } from './components/tabs/SystemArchitecture';
import { Esp32Controller } from './components/tabs/Esp32Controller';
import { MqttStream } from './components/tabs/MqttStream';
import { AboutProject } from './components/tabs/AboutProject';

const MainLayout: React.FC = () => {
  const { activeTab } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'sensors':
        return <LiveSensors />;
      case 'disease':
        return <DiseaseDetection />;
      case 'risk':
        return <MultimodalRisk />;
      case 'genai':
        return <GenAiAdvisor />;
      case 'irrigation':
        return <SmartIrrigation />;
      case 'zones':
        return <FarmZones />;
      case 'architecture':
        return <SystemArchitecture />;
      case 'esp32':
        return <Esp32Controller />;
      case 'mqtt':
        return <MqttStream />;
      case 'about':
        return <AboutProject />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-[#07100a] text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-slate-950">
      {/* Top Header */}
      <Header onMobileMenuToggle={() => setIsMobileMenuOpen(prev => !prev)} />

      {/* Center Layout: Sidebar + Main Content */}
      <div className="flex-1 flex w-full max-w-[1720px] mx-auto">
        <Sidebar
          isOpen={isMobileMenuOpen}
          onClose={() => setIsMobileMenuOpen(false)}
        />

        {/* Main Content View */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-x-hidden min-w-0">
          {renderActiveTab()}
        </main>
      </div>

      {/* Automated 14-Step Presentation Tour Controller */}
      <DemoModeModal />

      {/* Bottom 8-Step System Pipeline Ribbon & Academic Footer */}
      <SystemPipelineBar />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
