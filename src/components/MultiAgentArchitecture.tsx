import React from 'react';
import {
  Brain,
  ShieldAlert,
  Search,
  Cpu,
  BookOpen,
  Server,
  RotateCw,
  UserCheck,
  ArrowRight,
  Sparkles,
  Layers,
} from 'lucide-react';

export const MultiAgentArchitecture: React.FC = () => {
  const agents = [
    {
      name: 'Detection Agent',
      role: 'Monitors telemetry stream, identifies anomalies, and classifies incident severity.',
      icon: <ShieldAlert className="w-5 h-5 text-rose-400" />,
      tag: 'Real-time Signal Ingestion',
    },
    {
      name: 'Investigation Agent',
      role: 'Correlates application logs, commit diffs, and pod health metrics.',
      icon: <Search className="w-5 h-5 text-cyan-400" />,
      tag: 'Signal Diagnostics',
    },
    {
      name: 'Memory Agent',
      role: 'Performs semantic retrieval across historical incidents and negative failure cases.',
      icon: <Brain className="w-5 h-5 text-blue-400" />,
      tag: 'Vector Memory Search',
    },
    {
      name: 'Root Cause Agent',
      role: 'Synthesizes telemetry evidence with historical patterns to isolate the failure mechanism.',
      icon: <Cpu className="w-5 h-5 text-indigo-400" />,
      tag: 'Causal Reasoning',
    },
    {
      name: 'Runbook Agent',
      role: 'Matches validated remediation playbooks based on historical recovery success rates.',
      icon: <BookOpen className="w-5 h-5 text-amber-400" />,
      tag: 'Playbook Orchestration',
    },
    {
      name: 'Response Agent',
      role: 'Stages safe parameters, executes preflight checks, and gates on human approval.',
      icon: <Server className="w-5 h-5 text-emerald-400" />,
      tag: 'Safe Execution Guard',
    },
    {
      name: 'Learning Agent',
      role: 'Extracts post-mortem patterns and engineer ratings to update the institutional graph.',
      icon: <RotateCw className="w-5 h-5 text-teal-400" />,
      tag: 'Knowledge Compounding',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <section aria-label="Multi-Agent Architecture Header" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-5 h-5 text-cyan-400" />
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              Autonomous Agent Orchestration
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Multi-Agent SRE Architecture</h1>
          <p className="text-xs text-slate-400 max-w-2xl">
            SentinelOps AI delegates responsibilities across 7 specialized cognitive agents connected via a high-performance Shared Incident Memory substrate.
          </p>
        </div>

        <span className="px-3 py-1.5 rounded-xl bg-blue-950 border border-blue-800 text-blue-300 text-xs font-mono">
          7 Autonomous Co-operating Agents
        </span>
      </section>

      {/* Shared Incident Memory Hub */}
      <div className="bg-gradient-to-r from-blue-950/40 via-indigo-950/30 to-slate-900 border border-blue-500/40 rounded-2xl p-8 text-center space-y-3 relative overflow-hidden">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-mono font-bold border border-blue-400/30">
          <Brain className="w-4 h-4 text-cyan-300 animate-pulse" />
          <span>SHARED INCIDENT MEMORY BUS</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-black text-white">
          Central Semantic Knowledge Substrate
        </h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-2xl mx-auto">
          All seven agents read from and write to the same evolving memory store, enabling real-time cross-agent verification and persistent organizational learning.
        </p>
      </div>

      {/* Agents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {agents.map((ag, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/40 transition-all space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="p-2.5 rounded-xl bg-slate-800 flex items-center justify-center">
                  {ag.icon}
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                  Agent #{idx + 1}
                </span>
              </div>
              <h3 className="text-sm font-bold text-white">{ag.name}</h3>
              <p className="text-xs text-slate-400 leading-relaxed">{ag.role}</p>
            </div>
            <div className="pt-2 border-t border-slate-800/80 text-[11px] font-mono text-cyan-400">
              {ag.tag}
            </div>
          </div>
        ))}
      </div>

      {/* Linear Execution Flow Diagram */}
      <section aria-label="Agent Execution Flow" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider">
          Coordinated Autonomous Workflow
        </h2>

        <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
          {[
            'Detection',
            'Investigation',
            'Memory',
            'Reasoning',
            'Recommendation',
            'Human Approval',
            'Response',
            'Learning',
          ].map((step, idx, arr) => (
            <React.Fragment key={step}>
              <div
                className={`px-3 py-2 rounded-lg font-bold ${
                  step === 'Human Approval'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                    : step === 'Learning'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : 'bg-slate-950 text-slate-300 border border-slate-800'
                }`}
              >
                {step}
              </div>
              {idx < arr.length - 1 && <span className="text-slate-600 font-bold">→</span>}
            </React.Fragment>
          ))}
        </div>
      </section>
    </div>
  );
};
