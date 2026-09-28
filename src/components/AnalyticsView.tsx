import React from 'react';
import {
  BarChart3,
  TrendingDown,
  Clock,
  Brain,
  ShieldCheck,
  RotateCcw,
  Zap,
} from 'lucide-react';

export const AnalyticsView: React.FC = () => {
  const rootCauses = [
    { name: 'Database & Connection Saturation', percent: 32, color: 'bg-blue-500' },
    { name: 'Configuration Regressions', percent: 24, color: 'bg-cyan-400' },
    { name: 'Deployment Pipeline Glitches', percent: 18, color: 'bg-indigo-400' },
    { name: 'Network & Proxy Timeouts', percent: 14, color: 'bg-amber-400' },
    { name: 'Memory & Resource Exhaustion', percent: 12, color: 'bg-rose-400' },
  ];

  const runbookPerformance = [
    { code: 'RB-042', name: 'Payment Pool Expansion', success: 96, fail: 4, count: 23 },
    { code: 'RB-103', name: 'Postgres Read Scaling', success: 94, fail: 6, count: 19 },
    { code: 'RB-018', name: 'Redis Eviction & Failover', success: 91, fail: 9, count: 14 },
    { code: 'RB-033', name: 'Auth JWKS Cache Purge', success: 99, fail: 1, count: 11 },
    { code: 'RB-077', name: 'Circuit Breaker Tuning', success: 88, fail: 12, count: 9 },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <section aria-label="Analytics Header" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5 text-cyan-400" />
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              Operational Impact & Memory Telemetry
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">SRE Analytics & Learning Curve</h1>
          <p className="text-xs text-slate-400 max-w-2xl">
            Simulated benchmarks demonstrating MTTR reduction, runbook efficacy, and institutional memory reuse over a 30-day production cycle.
          </p>
        </div>

        <span className="text-xs font-mono bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-slate-400">
          Prototype simulation • Synthetic metrics
        </span>
      </section>

      {/* MTTR Impact Hero Card */}
      <section aria-label="MTTR Impact" className="bg-gradient-to-br from-slate-900 via-blue-950/20 to-slate-900 border border-blue-500/40 rounded-2xl p-8 shadow-2xl">
        <div className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest mb-2">
          Primary Operational Impact
        </div>
        <h2 className="text-xl font-bold text-white">Mean Time to Resolution (MTTR) Comparison</h2>
        <p className="text-xs text-slate-300 mt-1 max-w-xl">
          Historical memory eliminates discovery lag, preventing engineers from repeating failed approaches and identifying proven runbooks within seconds.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-800">
          {/* Before Memory */}
          <div className="p-5 rounded-xl bg-slate-950 border border-rose-950/60 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 uppercase">Without Organizational Memory</span>
              <span className="text-xs font-mono text-rose-400">Traditional</span>
            </div>
            <div className="text-4xl font-black font-mono text-rose-400">31 min</div>
            <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden">
              <div className="bg-rose-500 h-full rounded-full" style={{ width: '100%' }}></div>
            </div>
            <p className="text-xs text-slate-400">
              Engineers spent 16m searching tickets, 7m trying pod restarts, and 8m finding Helm values.
            </p>
          </div>

          {/* With SentinelOps AI */}
          <div className="p-5 rounded-xl bg-blue-950/30 border border-emerald-500/40 space-y-3 shadow-lg shadow-emerald-950/20">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-emerald-400 uppercase">With SentinelOps Incident Memory</span>
              <span className="text-xs font-mono text-emerald-300 font-bold flex items-center space-x-1">
                <TrendingDown className="w-3.5 h-3.5" />
                <span>42% Faster MTTR</span>
              </span>
            </div>
            <div className="text-4xl font-black font-mono text-emerald-300">18 min</div>
            <div className="w-full bg-slate-900 rounded-full h-3 overflow-hidden">
              <div className="bg-emerald-400 h-full rounded-full" style={{ width: '58%' }}></div>
            </div>
            <p className="text-xs text-slate-300">
              Agent instantly correlated 503 error with INC-1042, warned against pod restart, and staged RB-042 for approval in 2m.
            </p>
          </div>
        </div>
      </section>

      {/* Root Causes & Runbook Usage Grids */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Most Common Root Causes */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white">Most Common Root Causes (30 Days)</h3>
            <span className="text-xs text-slate-400 font-mono">105 Analyzed</span>
          </div>

          <div className="space-y-3 pt-2">
            {rootCauses.map((rc, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-300">{rc.name}</span>
                  <span className="text-white font-mono font-bold">{rc.percent}%</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden">
                  <div className={`${rc.color} h-full rounded-full`} style={{ width: `${rc.percent}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Runbook Performance & Reuse */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white">Runbook Efficacy & Execution History</h3>
            <span className="text-xs text-emerald-400 font-mono font-bold">74% Knowledge Reuse</span>
          </div>

          <div className="space-y-3 pt-2">
            {runbookPerformance.map((rb, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5 text-xs font-mono">
                <div className="flex justify-between text-slate-300">
                  <span className="font-bold text-blue-400">{rb.code}: {rb.name}</span>
                  <span className="text-emerald-400">{rb.success}% Success</span>
                </div>
                <div className="w-full bg-slate-900 rounded-full h-1.5 overflow-hidden flex">
                  <div className="bg-emerald-400 h-full" style={{ width: `${rb.success}%` }}></div>
                  <div className="bg-rose-500 h-full" style={{ width: `${rb.fail}%` }}></div>
                </div>
                <div className="text-[10px] text-slate-500 font-sans">
                  Executed {rb.count} times across production environments.
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
