import React, { useState } from 'react';
import { useIncidents, AppView } from '../context/IncidentContext';
import {
  ShieldAlert,
  Terminal,
  Brain,
  Network,
  BookOpen,
  FileText,
  BarChart3,
  CheckCircle2,
  Lock,
  Cpu,
  Layers,
  Sparkles,
  RotateCcw,
  Play,
  MessageSquareCode,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    startHackathonDemo,
    resetDemo,
    isDemoMode,
    setIsCopilotOpen,
    isCopilotOpen,
    services,
  } = useIncidents();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activeCriticalService = services.find((s) => s.status === 'CRITICAL');

  const navItems: { view: AppView; label: string; icon: React.ReactNode; badge?: string }[] = [
    { view: 'dashboard', label: 'Command Center', icon: <Terminal className="w-4 h-4" /> },
    {
      view: 'live-incidents',
      label: 'Live Incidents',
      icon: <ShieldAlert className="w-4 h-4" />,
      badge: activeCriticalService ? '1 Critical' : undefined,
    },
    { view: 'investigation', label: 'AI Investigation', icon: <Sparkles className="w-4 h-4 text-cyan-400" /> },
    { view: 'memory-explorer', label: 'Incident Memory', icon: <Brain className="w-4 h-4 text-blue-400" /> },
    { view: 'knowledge-graph', label: 'Knowledge Graph', icon: <Network className="w-4 h-4 text-indigo-400" /> },
    { view: 'runbooks', label: 'Runbooks', icon: <BookOpen className="w-4 h-4" /> },
    { view: 'history', label: 'History (105)', icon: <Layers className="w-4 h-4" /> },
    { view: 'post-mortems', label: 'Post-Mortems', icon: <FileText className="w-4 h-4" /> },
    { view: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-4 h-4" /> },
    { view: 'prevention', label: 'Preventions', icon: <CheckCircle2 className="w-4 h-4 text-emerald-400" /> },
    { view: 'azure-integration', label: 'Azure & Teams', icon: <Cpu className="w-4 h-4 text-sky-400" /> },
    { view: 'security', label: 'Governance', icon: <Lock className="w-4 h-4 text-amber-400" /> },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#0B0F19]/90 backdrop-blur-md border-b border-slate-800 text-slate-100">
      {/* Top micro bar: Microsoft Hackathon context */}
      <div className="bg-slate-950/80 px-4 py-1 text-xs border-b border-slate-900/60 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-blue-500/10 text-blue-400 border border-blue-500/30">
            MICROSOFT HACKATHON PROTOTYPE
          </span>
          <span className="text-slate-400 hidden sm:inline">
            Organizational Incident Memory & Learning Agent for SREs
          </span>
        </div>
        <div className="flex items-center space-x-3 text-[11px] text-slate-400">
          <span className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="hidden md:inline">Memory Store:</span>
            <span className="text-slate-300 font-mono">105 Synced Incidents</span>
          </span>
          <span className="text-slate-600">|</span>
          <button
            onClick={() => setCurrentView('multi-agent')}
            className="text-blue-400 hover:text-blue-300 transition-colors flex items-center space-x-1"
          >
            <span>7 Autonomous Agents</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Brand */}
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setCurrentView('landing')}
              className="flex items-center space-x-2.5 group text-left"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-lg shadow-blue-500/20 border border-blue-400/30 group-hover:scale-105 transition-transform">
                <ShieldAlert className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center space-x-1.5">
                  <span className="text-lg font-black tracking-tight text-white font-mono">
                    SENTINEL<span className="text-blue-400">OPS</span>
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30">
                    AI
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 tracking-wide font-sans">
                  Incident Response & Learning Agent
                </p>
              </div>
            </button>
          </div>

          {/* Core Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Primary Hackathon Demo CTA Button */}
            <button
              onClick={startHackathonDemo}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold text-xs transition-all shadow-md ${
                isDemoMode
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white ring-2 ring-blue-400/50 shadow-blue-500/25 animate-pulse'
                  : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/30 hover:shadow-blue-600/30'
              }`}
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>🚀 START HACKATHON DEMO</span>
            </button>

            {/* Reset Demo Button */}
            <button
              onClick={resetDemo}
              title="Reset application to clean initial state"
              className="flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700/60 transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
              <span>Reset Demo</span>
            </button>

            {/* Incident Copilot Toggle Button */}
            <button
              onClick={() => setIsCopilotOpen(!isCopilotOpen)}
              className={`flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-medium border transition-colors ${
                isCopilotOpen
                  ? 'bg-indigo-600/30 border-indigo-500 text-indigo-200'
                  : 'bg-slate-800/80 hover:bg-slate-700 border-slate-700 text-slate-300'
              }`}
            >
              <MessageSquareCode className="w-3.5 h-3.5 text-indigo-400" />
              <span>Incident Copilot</span>
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="lg:hidden flex items-center space-x-2">
            <button
              onClick={startHackathonDemo}
              className="px-2.5 py-1.5 rounded bg-blue-600 text-white text-xs font-semibold flex items-center space-x-1"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>Demo</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Secondary Subnav (Desktop): Categorized Views */}
      <div className="hidden lg:block bg-slate-900/60 border-t border-slate-800/60 px-4 sm:px-6 lg:px-8 overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto flex items-center space-x-1 py-1.5">
          {navItems.map((item) => {
            const isActive = currentView === item.view;
            return (
              <button
                key={item.view}
                onClick={() => setCurrentView(item.view)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-600/20 text-blue-300 border border-blue-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {item.badge && (
                  <span className="ml-1 px-1.5 py-0.2 text-[10px] font-bold rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/40">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-4 space-y-1">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800">
            <button
              onClick={() => {
                resetDemo();
                setMobileMenuOpen(false);
              }}
              className="text-xs text-slate-400 flex items-center space-x-1 py-1"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Demo State</span>
            </button>
            <button
              onClick={() => {
                setIsCopilotOpen(true);
                setMobileMenuOpen(false);
              }}
              className="text-xs text-indigo-400 flex items-center space-x-1 py-1"
            >
              <MessageSquareCode className="w-3.5 h-3.5" />
              <span>Open Copilot</span>
            </button>
          </div>
          <div className="grid grid-cols-2 gap-1">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => {
                  setCurrentView(item.view);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-xs font-medium text-left ${
                  currentView === item.view
                    ? 'bg-blue-600/20 text-blue-300 border border-blue-500/40'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {item.icon}
                <span className="truncate">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
