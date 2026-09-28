import React, { useState } from 'react';
import { useIncidents } from '../context/IncidentContext';
import {
  Brain,
  Search,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  ThumbsUp,
  Clock,
  ArrowRight,
  Sparkles,
  Layers,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

export const IncidentMemoryExplorer: React.FC = () => {
  const { memories, investigateIncident, setCurrentView } = useIncidents();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<string>('ALL');
  const [selectedMemoryId, setSelectedMemoryId] = useState<string>(memories[0]?.id || 'MEM-001');

  const filteredMemories = memories.filter((mem) => {
    const matchesService = selectedService === 'ALL' || mem.service === selectedService;
    const matchesSearch =
      mem.patternSignature.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mem.rootCause.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mem.service.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesService && matchesSearch;
  });

  const activeMemory = memories.find((m) => m.id === selectedMemoryId) || memories[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <section aria-label="Incident Memory Header" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Brain className="w-5 h-5 text-cyan-300" />
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              Persistent Institutional Knowledge
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Organizational Incident Memory
          </h1>
          <p className="text-xs text-slate-400 max-w-2xl">
            Each pattern represents aggregated lessons from historical outages, correlating proven runbooks, diagnostic heuristics, and explicitly recorded failure modes.
          </p>
        </div>

        <button
          onClick={() => setCurrentView('knowledge-graph')}
          className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center space-x-2 whitespace-nowrap self-start md:self-center"
        >
          <span>View Knowledge Graph</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search learned patterns, root causes..."
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center space-x-1 overflow-x-auto w-full sm:w-auto">
          {['ALL', 'Payment API', 'Redis', 'Authentication', 'PostgreSQL'].map((svc) => (
            <button
              key={svc}
              onClick={() => setSelectedService(svc)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                selectedService === svc
                  ? 'bg-blue-600 text-white font-semibold'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {svc}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Pattern Cards & Selected Memory Drilldown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Cards List */}
        <div className="lg:col-span-2 space-y-4">
          {filteredMemories.map((mem) => {
            const isSelected = activeMemory?.id === mem.id;
            return (
              <div
                key={mem.id}
                onClick={() => setSelectedMemoryId(mem.id)}
                className={`p-6 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 border-blue-500 shadow-xl shadow-blue-950/40 ring-1 ring-blue-500/40'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between pb-3 border-b border-slate-800/80">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-cyan-300 px-2 py-0.5 rounded bg-cyan-950/40 border border-cyan-800/40">
                      {mem.id}
                    </span>
                    <span className="text-xs font-semibold text-slate-300">{mem.service}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs font-mono text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-slate-500" />
                    <span>Updated {mem.lastUpdated}</span>
                  </div>
                </div>

                <div className="mt-3 space-y-2">
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {mem.patternSignature}
                  </h3>
                  <p className="text-xs text-slate-300">
                    <strong className="text-slate-400">Identified Root Cause:</strong> {mem.rootCause}
                  </p>
                </div>

                {/* Evidence Metrics */}
                <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                  <div className="p-2 rounded bg-slate-950/60 border border-slate-800 text-center">
                    <span className="text-slate-500 block text-[10px]">Evidence Incidents</span>
                    <span className="font-bold text-cyan-300 text-sm">{mem.evidenceIncidentCount}</span>
                  </div>
                  <div className="p-2 rounded bg-slate-950/60 border border-slate-800 text-center">
                    <span className="text-slate-500 block text-[10px]">Resolved Successfully</span>
                    <span className="font-bold text-emerald-400 text-sm">{mem.successfulResolutionCount}</span>
                  </div>
                  <div className="p-2 rounded bg-slate-950/60 border border-slate-800 text-center">
                    <span className="text-slate-500 block text-[10px]">Runbook</span>
                    <span className="font-bold text-blue-400 text-sm">
                      {mem.successfulRunbookId.toUpperCase()}
                    </span>
                  </div>
                  <div className="p-2 rounded bg-slate-950/60 border border-slate-800 text-center">
                    <span className="text-slate-500 block text-[10px]">SRE Rating</span>
                    <span className="font-bold text-amber-400 text-sm flex items-center justify-center space-x-1">
                      <span>{mem.engineerFeedbackScore}/5</span>
                      <ThumbsUp className="w-3 h-3" />
                    </span>
                  </div>
                </div>

                {/* Negative Memory Snippet */}
                {mem.failedApproaches.length > 0 && (
                  <div className="mt-4 p-3 rounded-lg bg-rose-950/20 border border-rose-900/40 text-xs text-rose-300 flex items-start space-x-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                    <div>
                      <strong className="block font-semibold">Negative Memory Recorded:</strong>
                      &ldquo;{mem.failedApproaches[0].attemptedAction}&rdquo; failed previously in{' '}
                      <code className="text-white font-mono">{mem.failedApproaches[0].incidentId}</code>.
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Right Col: Deep Drilldown for Selected Memory */}
        {activeMemory && (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6 h-fit sticky top-24">
            <div className="pb-3 border-b border-slate-800">
              <span className="text-xs font-mono text-cyan-300 uppercase tracking-wider font-semibold">
                Pattern Deep Dive
              </span>
              <h3 className="text-lg font-bold text-white mt-1">{activeMemory.patternSignature}</h3>
            </div>

            {/* Key Failure Indicators */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Telemetry Signatures
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5">
                {activeMemory.keyIndicators.map((ind, idx) => (
                  <li key={idx} className="flex items-center space-x-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{ind}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Negative Memory Details */}
            {activeMemory.failedApproaches.length > 0 && (
              <div className="space-y-2">
                <div className="text-xs font-semibold text-rose-400 uppercase tracking-wider flex items-center space-x-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Remembered Failed Approaches ({activeMemory.failedApproaches.length})</span>
                </div>
                <div className="space-y-2">
                  {activeMemory.failedApproaches.map((fail, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-lg bg-rose-950/20 border border-rose-900/40 text-xs space-y-1"
                    >
                      <div className="text-white font-semibold flex items-center justify-between">
                        <span>{fail.attemptedAction}</span>
                        <span className="font-mono text-rose-300">{fail.incidentId}</span>
                      </div>
                      <p className="text-slate-400">{fail.whyItFailed}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Associated Contributing Incidents */}
            <div className="space-y-2">
              <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Contributing Incidents ({activeMemory.associatedIncidents.length})
              </div>
              <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                {activeMemory.associatedIncidents.map((incId) => (
                  <button
                    key={incId}
                    onClick={() => investigateIncident(incId)}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-blue-600 hover:text-white text-slate-300 border border-slate-700 transition-colors"
                  >
                    {incId}
                  </button>
                ))}
              </div>
            </div>

            {/* Action CTA */}
            <div className="pt-4 border-t border-slate-800">
              <button
                onClick={() => investigateIncident('INC-1042')}
                className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md transition-colors flex items-center justify-center space-x-1.5"
              >
                <span>Investigate Current Incident with this Memory</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
