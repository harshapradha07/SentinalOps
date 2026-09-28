import React from 'react';
import { useIncidents } from '../context/IncidentContext';
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  BrainCircuit,
} from 'lucide-react';

export const DemoControllerBar: React.FC = () => {
  const {
    isDemoMode,
    demoState,
    nextDemoStep,
    prevDemoStep,
    jumpToDemoStep,
    switchDemoScenario,
    resetDemo,
    activeIncident,
  } = useIncidents();

  if (!isDemoMode) {
    return null;
  }

  const steps = [
    { num: 1, label: 'Detected' },
    { num: 2, label: 'Signals' },
    { num: 3, label: 'Memory Search' },
    { num: 4, label: 'Root Cause' },
    { num: 5, label: 'Runbook' },
    { num: 6, label: 'Approval' },
    { num: 7, label: 'Resolved' },
    { num: 8, label: 'Learned' },
  ];

  return (
    <aside aria-label="Demo Controller" className="sticky top-[105px] z-40 bg-gradient-to-r from-slate-900 via-blue-950/80 to-slate-900 border-b border-blue-500/40 shadow-xl shadow-blue-950/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        {/* Top line: Scenario Switcher & High-Level Narrative */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
          <div className="flex items-center space-x-3">
            <span className="flex items-center space-x-1.5 px-2.5 py-1 rounded bg-blue-500/20 text-blue-300 text-xs font-bold border border-blue-400/40">
              <Sparkles className="w-3.5 h-3.5 text-cyan-300 animate-spin" />
              <span>HACKATHON DEMO MODE</span>
            </span>
            <div className="text-xs text-slate-300">
              <span className="text-slate-400">Current Incident: </span>
              <span className="font-mono font-bold text-white">{activeIncident.id}</span>
              <span className="mx-2 text-slate-600">|</span>
              <span className="text-slate-400">Progression: </span>
              <span className="font-semibold text-cyan-300">
                {demoState.activeScenarioId === 'INC-1042'
                  ? 'Incident 1 (Baseline: 0 matches, 61% conf)'
                  : demoState.activeScenarioId === 'INC-1061'
                  ? 'Incident 2 (Memory Active: 1 match @ 87%)'
                  : 'Incident 5 (Climax: 7 related, 94% conf + negative memory)'}
              </span>
            </div>
          </div>

          {/* Quick Scenario Jumpers */}
          <div className="flex items-center space-x-1.5 overflow-x-auto">
            <span className="text-[11px] text-slate-400 whitespace-nowrap mr-1 font-medium">
              Demo Scenarios:
            </span>
            <button
              onClick={() => switchDemoScenario('INC-1042')}
              className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition-all ${
                demoState.activeScenarioId === 'INC-1042'
                  ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30 ring-1 ring-blue-300'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              1. INC-1042 (0 Matches)
            </button>
            <button
              onClick={() => switchDemoScenario('INC-1061')}
              className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition-all ${
                demoState.activeScenarioId === 'INC-1061'
                  ? 'bg-blue-600 text-white font-bold shadow-md shadow-blue-600/30 ring-1 ring-blue-300'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              2. INC-1061 (1 Match)
            </button>
            <button
              onClick={() => switchDemoScenario('INC-1112')}
              className={`px-2.5 py-1 rounded text-xs font-mono font-medium transition-all flex items-center space-x-1 ${
                demoState.activeScenarioId === 'INC-1112'
                  ? 'bg-cyan-600 text-white font-bold shadow-md shadow-cyan-600/30 ring-1 ring-cyan-300'
                  : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
              }`}
            >
              <BrainCircuit className="w-3 h-3 text-cyan-200" />
              <span>5. INC-1112 (Smart 94%)</span>
            </button>
          </div>
        </div>

        {/* Bottom line: 8-Step Narrative Stepper & Next/Prev Controls */}
        <div className="pt-2.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Steps Breadcrumbs */}
          <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto pb-1">
            {steps.map((st) => {
              const isPast = st.num < demoState.currentStep;
              const isCurrent = st.num === demoState.currentStep;
              return (
                <button
                  key={st.num}
                  onClick={() => jumpToDemoStep(st.num)}
                  className={`flex items-center space-x-1 px-2 py-1 rounded text-[11px] transition-all whitespace-nowrap ${
                    isCurrent
                      ? 'bg-blue-500 text-white font-bold ring-2 ring-blue-400 shadow-md shadow-blue-500/30 scale-105'
                      : isPast
                      ? 'bg-blue-950/60 text-blue-300 border border-blue-900/60 hover:bg-blue-900/50'
                      : 'bg-slate-800/40 text-slate-400 hover:bg-slate-800 hover:text-slate-200'
                  }`}
                >
                  <span
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] ${
                      isCurrent
                        ? 'bg-white text-blue-950 font-black'
                        : isPast
                        ? 'bg-blue-800 text-blue-200'
                        : 'bg-slate-700 text-slate-400'
                    }`}
                  >
                    {isPast ? '✓' : st.num}
                  </span>
                  <span>{st.label}</span>
                </button>
              );
            })}
          </div>

          {/* Stepper Navigation Buttons */}
          <div className="flex items-center space-x-2 justify-end">
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              Step <strong className="text-white">{demoState.currentStep}</strong> / 8:{' '}
              <span className="text-cyan-300 font-sans">{demoState.stepTitle}</span>
            </span>

            <div className="flex items-center space-x-1">
              <button
                onClick={prevDemoStep}
                disabled={demoState.currentStep <= 1}
                className="p-1.5 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-200"
                title="Previous Demo Step"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextDemoStep}
                disabled={demoState.currentStep >= 8}
                className="flex items-center space-x-1 px-3 py-1.5 rounded bg-blue-600 hover:bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed text-white text-xs font-semibold shadow-md shadow-blue-600/30"
                title="Next Demo Step"
              >
                <span>Next Step</span>
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={resetDemo}
                className="p-1.5 rounded bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-slate-200"
                title="Exit Demo Mode / Reset"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
