import React, { useState } from 'react';
import { IncidentProvider, useIncidents } from './context/IncidentContext';
import { Navbar } from './components/Navbar';
import { DemoControllerBar } from './components/DemoControllerBar';
import { HeroLanding } from './components/HeroLanding';
import { DashboardOverview } from './components/DashboardOverview';
import { IncidentInvestigation } from './components/IncidentInvestigation';
import { IncidentMemoryExplorer } from './components/IncidentMemoryExplorer';
import { MemoryKnowledgeGraph } from './components/MemoryKnowledgeGraph';
import { RunbookLibrary } from './components/RunbookLibrary';
import { IncidentHistory } from './components/IncidentHistory';
import { PostMortemLibrary } from './components/PostMortemLibrary';
import { AnalyticsView } from './components/AnalyticsView';
import { PreventionCenter } from './components/PreventionCenter';
import { AzureIntegrationView } from './components/AzureIntegrationView';
import { SecurityGovernanceView } from './components/SecurityGovernanceView';
import { MultiAgentArchitecture } from './components/MultiAgentArchitecture';
import { IncidentCopilot } from './components/IncidentCopilot';
import { DemoFinalScreenModal } from './components/DemoFinalScreenModal';
import { Sparkles, Trophy } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentView, isDemoMode, demoState } = useIncidents();
  const [showFinalModal, setShowFinalModal] = useState(false);

  // Trigger final screen if step 8 is reached in demo mode or allow manual open
  const isDemoComplete = isDemoMode && demoState.currentStep === 8;

  return (
    <div className="min-h-screen bg-[#0B0F19] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Demo Controller Bar (Active in Demo Mode) */}
      <DemoControllerBar />

      {/* Main View Area */}
      <main className="flex-1">
        {currentView === 'landing' && <HeroLanding />}
        {currentView === 'dashboard' && <DashboardOverview />}
        {currentView === 'live-incidents' && <DashboardOverview />}
        {currentView === 'investigation' && <IncidentInvestigation />}
        {currentView === 'memory-explorer' && <IncidentMemoryExplorer />}
        {currentView === 'knowledge-graph' && <MemoryKnowledgeGraph />}
        {currentView === 'runbooks' && <RunbookLibrary />}
        {currentView === 'history' && <IncidentHistory />}
        {currentView === 'post-mortems' && <PostMortemLibrary />}
        {currentView === 'analytics' && <AnalyticsView />}
        {currentView === 'prevention' && <PreventionCenter />}
        {currentView === 'azure-integration' && <AzureIntegrationView />}
        {currentView === 'security' && <SecurityGovernanceView />}
        {currentView === 'multi-agent' && <MultiAgentArchitecture />}
      </main>

      {/* Floating Incident Copilot */}
      <IncidentCopilot />

      {/* Final Demo Screen Trigger Floating Pill if on Step 8 */}
      {isDemoComplete && (
        <div className="fixed bottom-6 left-6 z-40">
          <button
            onClick={() => setShowFinalModal(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-bold text-xs shadow-2xl shadow-emerald-950/60 border border-emerald-400/50 flex items-center space-x-2 animate-bounce"
          >
            <Trophy className="w-4 h-4 text-amber-300" />
            <span>View Hackathon Climax Summary</span>
          </button>
        </div>
      )}

      {/* Demo Final Climax Modal */}
      <DemoFinalScreenModal
        isOpen={showFinalModal}
        onClose={() => setShowFinalModal(false)}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2">
            <span className="font-mono font-bold text-slate-300">SENTINELOPS AI</span>
            <span>•</span>
            <span>Microsoft Hackathon Prototype</span>
          </div>
          <div className="text-center sm:text-right font-mono text-[11px] text-slate-400">
            &ldquo;AI recommends. Engineers decide. The organization learns.&rdquo;
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <IncidentProvider>
      <AppContent />
    </IncidentProvider>
  );
}
