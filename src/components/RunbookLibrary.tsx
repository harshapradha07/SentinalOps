import React, { useState } from 'react';
import { useIncidents } from '../context/IncidentContext';
import {
  BookOpen,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  Search,
  Terminal,
  ShieldCheck,
  ChevronRight,
  ArrowRight,
} from 'lucide-react';
import { Runbook } from '../types';

export const RunbookLibrary: React.FC = () => {
  const { runbooks, investigateIncident } = useIncidents();
  const [selectedRunbookId, setSelectedRunbookId] = useState<string>('rb-042');
  const [search, setSearch] = useState<string>('');

  const filtered = runbooks.filter(
    (rb) =>
      rb.title.toLowerCase().includes(search.toLowerCase()) ||
      rb.code.toLowerCase().includes(search.toLowerCase()) ||
      rb.service.toLowerCase().includes(search.toLowerCase())
  );

  const activeRb = runbooks.find((r) => r.id === selectedRunbookId) || runbooks[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <section aria-label="Runbook Intelligence Header" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <BookOpen className="w-5 h-5 text-blue-400" />
            <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
              Automated SRE Remediation Catalog
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Runbook Intelligence</h1>
          <p className="text-xs text-slate-400 max-w-2xl">
            Validated procedural playbooks evaluated against historical telemetry signatures. Every runbook is weighted by real-world recovery outcomes and engineer ratings.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search runbooks by code, service..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-xl px-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 w-64"
          />
        </div>
      </section>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Runbook Selector Cards */}
        <div className="space-y-3">
          {filtered.map((rb) => {
            const isSelected = rb.id === activeRb.id;
            return (
              <div
                key={rb.id}
                onClick={() => setSelectedRunbookId(rb.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 border-blue-500 shadow-lg shadow-blue-950/40 ring-1 ring-blue-500/40'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-blue-400 px-2 py-0.5 rounded bg-blue-950 border border-blue-800/40">
                    {rb.code}
                  </span>
                  <span className="text-xs text-slate-400">{rb.service}</span>
                </div>

                <h3 className="text-sm font-bold text-white mt-2 line-clamp-1">{rb.title}</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{rb.description}</p>

                <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800/80">
                  <span className="text-emerald-400 font-bold">{rb.successRatePercent}% Success</span>
                  <span>{rb.executionCount} executions</span>
                  <span>~{rb.avgRecoveryMinutes}m recovery</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right 2 Columns: Detailed Runbook View */}
        {activeRb && (
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-mono font-bold text-blue-400 bg-blue-950/60 px-2.5 py-0.5 rounded border border-blue-800">
                    {activeRb.code}
                  </span>
                  <span className="text-xs font-semibold text-slate-300">{activeRb.service}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      activeRb.safetyRiskLevel === 'SAFE'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-amber-500/20 text-amber-300'
                    }`}
                  >
                    Risk: {activeRb.safetyRiskLevel}
                  </span>
                </div>
                <h2 className="text-xl font-bold text-white mt-2">{activeRb.title}</h2>
              </div>

              <div className="text-right">
                <div className="text-2xl font-black font-mono text-emerald-400">
                  {activeRb.successRatePercent}%
                </div>
                <div className="text-[10px] text-slate-400">Verified Success Rate</div>
              </div>
            </div>

            {/* Why AI Recommends This */}
            <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/30 text-xs space-y-1">
              <span className="font-bold text-blue-300 flex items-center space-x-1.5">
                <Sparkles className="w-3.5 h-3.5 text-cyan-300" />
                <span>Why SentinelOps AI Recommends This Runbook</span>
              </span>
              <p className="text-slate-300 leading-relaxed">{activeRb.recommendedWhen}</p>
            </div>

            {/* Preflight Checks */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Automated Safety Preflight Checks
              </div>
              <div className="space-y-1.5">
                {activeRb.preflightChecks.map((chk, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-xs text-slate-300 flex items-center space-x-2"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{chk}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Execution Steps */}
            <div className="space-y-3">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Execution Steps ({activeRb.steps.length})
              </div>
              <div className="space-y-3">
                {activeRb.steps.map((st) => (
                  <div key={st.stepNumber} className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center space-x-2">
                        <span className="w-5 h-5 rounded-full bg-blue-600/30 text-blue-300 font-mono text-[10px] flex items-center justify-center font-bold">
                          {st.stepNumber}
                        </span>
                        <span className="font-bold text-white">{st.title}</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300">
                        {st.isAutomated ? 'Automated Action' : 'Manual Verification'}
                      </span>
                    </div>

                    <div className="bg-black/50 p-2.5 rounded font-mono text-xs text-cyan-300 overflow-x-auto">
                      <code>{st.commandOrAction}</code>
                    </div>

                    <div className="text-[11px] text-slate-400 flex items-center space-x-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>Verification: {st.verification}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Runbook Actions */}
            <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
              <div className="text-xs text-slate-400">
                Linked in <strong className="text-white">{activeRb.relatedIncidentsCount}</strong> historical incident memories.
              </div>
              <button
                onClick={() => investigateIncident('INC-1042')}
                className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md flex items-center space-x-1.5"
              >
                <span>Simulate Runbook on Active Incident</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
