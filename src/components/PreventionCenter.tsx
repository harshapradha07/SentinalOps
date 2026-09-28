import React from 'react';
import { useIncidents } from '../context/IncidentContext';
import {
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  TrendingUp,
  Clock,
  ArrowRight,
  Sliders,
  Check,
  X,
  HelpCircle,
} from 'lucide-react';

export const PreventionCenter: React.FC = () => {
  const { preventions, updatePreventionStatus, investigateIncident } = useIncidents();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <section aria-label="Recurrence Detection Header" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <span className="text-xs font-mono font-bold text-emerald-400 uppercase tracking-wider">
              Systemic Risk Mitigation
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Recurrence Detection & Preventive Engineering
          </h1>
          <p className="text-xs text-slate-400 max-w-2xl">
            SentinelOps AI isolates chronic infrastructural hotspots, analyzing multi-incident patterns to propose permanent safeguards before the next outage occurs.
          </p>
        </div>

        <button
          onClick={() => investigateIncident('INC-1042')}
          className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs shadow-md flex items-center space-x-1.5"
        >
          <span>Correlate Active Outage</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </section>

      {/* RECURRING INCIDENT ALERT CARD */}
      <section aria-label="Recurring Incident Alert" className="bg-gradient-to-br from-amber-950/20 via-slate-900 to-slate-950 border border-amber-500/40 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-amber-900/30">
          <div className="flex items-center space-x-2">
            <AlertTriangle className="w-5 h-5 text-amber-400" />
            <h2 className="text-base font-bold text-white">RECURRING INCIDENT ALERT</h2>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs text-slate-400">Historical Recurrence Signal:</span>
            <span className="px-2.5 py-0.5 rounded text-xs font-bold font-mono bg-rose-500/20 text-rose-300 border border-rose-500/30">
              HIGH
            </span>
          </div>
        </div>

        <div className="text-sm font-semibold text-amber-200">
          Payment API has experienced 4 related incidents in the last 30 days.
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-slate-500 block text-[10px]">Correlated Service</span>
            <span className="text-white font-semibold">Payment API</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-slate-500 block text-[10px]">Error Signature</span>
            <span className="text-rose-300 font-mono font-semibold">HikariPool Timeout</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-slate-500 block text-[10px]">Underlying Cause</span>
            <span className="text-white font-semibold">DB Pool Saturation &gt;90%</span>
          </div>
          <div className="p-3 rounded-lg bg-slate-950 border border-slate-800">
            <span className="text-slate-500 block text-[10px]">Regression Vector</span>
            <span className="text-cyan-300 font-semibold">Helm Config Sync</span>
          </div>
        </div>

        <p className="text-xs text-slate-400 leading-relaxed pt-1">
          <strong>Evidence Explanation:</strong> Recurrence signal is derived from repeated regression in Helm charts overwriting the HikariCP maxPoolSize from 200 back to 100 during automatic canary synchronizations.
        </p>
      </section>

      {/* RECOMMENDED PREVENTIVE ACTIONS LIST */}
      <section aria-label="Recommended Preventive Actions" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white">Recommended Preventive Actions</h2>
          <span className="text-xs text-slate-400">Click actions to update SRE backlog status</span>
        </div>

        <div className="space-y-3">
          {preventions.map((item, idx) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-[10px] font-bold text-cyan-300 bg-slate-800 px-2 py-0.5 rounded border border-slate-700">
                    {item.service}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      item.priority === 'HIGH'
                        ? 'bg-rose-500/20 text-rose-300'
                        : 'bg-amber-500/20 text-amber-300'
                    }`}
                  >
                    Priority: {item.priority}
                  </span>
                </div>

                <h3 className="text-sm font-bold text-white">{item.title}</h3>
                <p className="text-xs text-slate-400">{item.basis}</p>
                <p className="text-xs text-slate-300 pt-1 font-mono">{item.impactExplanation}</p>
              </div>

              {/* Status Selector Chips */}
              <div className="flex items-center space-x-2 self-start md:self-center shrink-0">
                <button
                  onClick={() => updatePreventionStatus(item.id, 'ACCEPTED')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    item.status === 'ACCEPTED'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Accepted
                </button>
                <button
                  onClick={() => updatePreventionStatus(item.id, 'ALREADY_IMPLEMENTED')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center space-x-1 ${
                    item.status === 'ALREADY_IMPLEMENTED'
                      ? 'bg-emerald-600 text-white shadow-md'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Implemented</span>
                </button>
                <button
                  onClick={() => updatePreventionStatus(item.id, 'REJECTED')}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    item.status === 'REJECTED'
                      ? 'bg-rose-950 text-rose-300 border border-rose-800'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Rejected
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
