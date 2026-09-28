import React from 'react';
import { useIncidents } from '../context/IncidentContext';
import {
  ShieldAlert,
  Activity,
  Clock,
  Brain,
  Layers,
  Sparkles,
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  CheckCircle2,
  Server,
  Zap,
  Play,
} from 'lucide-react';

export const DashboardOverview: React.FC = () => {
  const {
    services,
    incidents,
    investigateIncident,
    setCurrentView,
    startHackathonDemo,
    memories,
  } = useIncidents();

  const activeIncidents = incidents.filter((i) => i.status !== 'RESOLVED').slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Top Banner: Welcome & Quick Launch */}
      <section aria-label="Command Center Header" className="bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950/40 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider font-semibold">
              Live SRE Command Center Active
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Production Observability & Organizational Memory
          </h1>
          <p className="text-xs text-slate-400 max-w-xl">
            Continuously analyzing cluster telemetry, detecting regressions, and mapping real-time incidents to historical root causes.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={startHackathonDemo}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-900/30 flex items-center space-x-2 transition-all hover:scale-105"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>Launch Hackathon Demo</span>
          </button>
        </div>
      </section>

      {/* KPI Cards */}
      <section aria-label="Key Performance Indicators" className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {[
          {
            title: 'Active Incidents',
            value: '3',
            sub: '1 Critical Ongoing',
            badgeColor: 'text-rose-400',
            borderColor: 'border-rose-900/50',
          },
          {
            title: 'Critical Outages',
            value: '1',
            sub: 'Payment API (503)',
            badgeColor: 'text-rose-500',
            borderColor: 'border-rose-900/60',
          },
          {
            title: 'Avg Resolution Time',
            value: '18m 42s',
            sub: 'Down from 31m (Memory)',
            badgeColor: 'text-emerald-400',
            borderColor: 'border-slate-800',
          },
          {
            title: 'AI-Assisted MTTR',
            value: '82%',
            sub: 'Guided by Runbooks',
            badgeColor: 'text-blue-400',
            borderColor: 'border-slate-800',
          },
          {
            title: 'Knowledge Reuse',
            value: '74%',
            sub: 'Historical Matched',
            badgeColor: 'text-cyan-300',
            borderColor: 'border-slate-800',
          },
          {
            title: 'Learned Patterns',
            value: `${memories.length + 123}`,
            sub: 'Organizational Memory',
            badgeColor: 'text-indigo-400',
            borderColor: 'border-slate-800',
          },
        ].map((kpi, idx) => (
          <div
            key={idx}
            className={`bg-slate-900/90 border ${kpi.borderColor} rounded-xl p-4 flex flex-col justify-between`}
          >
            <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
              {kpi.title}
            </div>
            <div className={`text-2xl font-black font-mono mt-1 ${kpi.badgeColor}`}>
              {kpi.value}
            </div>
            <div className="text-[10px] text-slate-400 mt-1 font-mono">{kpi.sub}</div>
          </div>
        ))}
      </section>

      {/* Synthetic Demo Data Disclaimer */}
      <div className="text-right">
        <span className="inline-flex items-center text-[10px] font-mono text-slate-400 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-800">
          * Synthetic Demo Data: Telemetry and metrics simulated for demonstration.
        </span>
      </div>

      {/* RECURRING INCIDENT ALERT CARD */}
      <section aria-label="Recurring Incident Alert" className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start space-x-3">
          <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-300 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold font-mono text-amber-300 px-2 py-0.5 rounded bg-amber-500/20 border border-amber-500/40">
                RECURRING INCIDENT DETECTED
              </span>
              <span className="text-xs text-slate-300 font-semibold">
                Recurrence Signal: <strong className="text-rose-400">HIGH</strong>
              </span>
            </div>
            <p className="text-sm font-bold text-white">
              Payment API has experienced 4 related incidents in the last 30 days.
            </p>
            <p className="text-xs text-slate-300">
              Correlated evidence: Same microservice (Payment API), identical HikariCP error signature, &gt;90% database connection utilization, and recurring Helm configuration regression.
            </p>
          </div>
        </div>

        <button
          onClick={() => setCurrentView('prevention')}
          className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs shadow-md transition-all whitespace-nowrap self-start md:self-center flex items-center space-x-1.5"
        >
          <span>View Prevention Recommendations</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </section>

      {/* Live Service Health Grid */}
      <section aria-label="Live Service Health" className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Server className="w-5 h-5 text-blue-400" />
            <h2 className="text-base font-bold text-white">Production Service Health</h2>
          </div>
          <span className="text-xs text-slate-400 font-mono">Cluster: prod-eastus-aks-01</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((svc) => {
            const isCritical = svc.status === 'CRITICAL';
            const isDegraded = svc.status === 'DEGRADED';
            return (
              <div
                key={svc.id}
                onClick={() => {
                  if (svc.name === 'Payment API') {
                    investigateIncident('INC-1042');
                  }
                }}
                className={`p-4 rounded-xl border transition-all ${
                  isCritical
                    ? 'bg-rose-950/20 border-rose-600/70 shadow-lg shadow-rose-950/30 cursor-pointer hover:border-rose-400'
                    : isDegraded
                    ? 'bg-amber-950/20 border-amber-800/60'
                    : 'bg-slate-900 border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-800/60">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`w-2.5 h-2.5 rounded-full ${
                        isCritical
                          ? 'bg-rose-500 animate-ping'
                          : isDegraded
                          ? 'bg-amber-400'
                          : 'bg-emerald-400'
                      }`}
                    ></span>
                    <span className="text-sm font-bold text-white">{svc.name}</span>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded font-mono ${
                      isCritical
                        ? 'bg-rose-500/20 text-rose-300'
                        : isDegraded
                        ? 'bg-amber-500/20 text-amber-300'
                        : 'bg-emerald-500/20 text-emerald-300'
                    }`}
                  >
                    {svc.status}
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-xs font-mono">
                  <div>
                    <span className="text-slate-400 text-[10px] block font-sans">p99 Latency</span>
                    <span className={isCritical ? 'text-rose-400 font-bold' : 'text-slate-200'}>
                      {svc.latencyMs}ms
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[10px] block font-sans">Error Rate</span>
                    <span className={isCritical ? 'text-rose-400 font-bold' : 'text-slate-200'}>
                      {svc.errorRatePercent}%
                    </span>
                  </div>
                </div>

                {isCritical && (
                  <div className="mt-3 pt-2 border-t border-rose-900/50 flex items-center justify-between text-xs text-rose-300 font-semibold">
                    <span>1 Critical Incident Active</span>
                    <span className="underline flex items-center space-x-1">
                      <span>Investigate</span>
                      <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Active Incidents Table */}
      <section aria-label="Active Incidents Table" className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-5 h-5 text-rose-400" />
            <h2 className="text-base font-bold text-white">Active Production Incidents</h2>
          </div>
          <button
            onClick={() => setCurrentView('history')}
            className="text-xs text-blue-400 hover:text-blue-300 flex items-center space-x-1"
          >
            <span>View All 105 Incidents</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="text-slate-400 border-b border-slate-800 bg-slate-950/60 font-semibold">
              <tr>
                <th className="py-2.5 px-3">Incident ID</th>
                <th className="py-2.5 px-3">Service</th>
                <th className="py-2.5 px-3">Severity</th>
                <th className="py-2.5 px-3">Root Cause Pattern</th>
                <th className="py-2.5 px-3">Historical Matches</th>
                <th className="py-2.5 px-3">AI Confidence</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {activeIncidents.map((inc) => (
                <tr key={inc.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-3 text-blue-400 font-bold">{inc.id}</td>
                  <td className="py-3 px-3 text-white font-sans font-medium">{inc.service}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        inc.severity === 'CRITICAL'
                          ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {inc.severity}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-slate-300 font-sans max-w-xs truncate">
                    {inc.rootCauseIdentified || inc.errorSignature}
                  </td>
                  <td className="py-3 px-3 text-slate-300">
                    {inc.historicalEvidenceCount > 0 ? (
                      <span className="text-cyan-300 font-bold">{inc.historicalEvidenceCount} incidents</span>
                    ) : (
                      <span className="text-slate-500">0 (Baseline)</span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-cyan-300 font-bold">{inc.aiConfidence}%</td>
                  <td className="py-3 px-3 text-right font-sans">
                    <button
                      onClick={() => investigateIncident(inc.id)}
                      className="px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors"
                    >
                      Investigate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};
