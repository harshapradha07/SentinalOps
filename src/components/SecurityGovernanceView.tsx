import React, { useState } from 'react';
import { useIncidents } from '../context/IncidentContext';
import {
  Lock,
  ShieldCheck,
  Eye,
  EyeOff,
  UserCheck,
  FileCode,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';

export const SecurityGovernanceView: React.FC = () => {
  const { auditLogs } = useIncidents();
  const [maskPii, setMaskPii] = useState(true);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <section aria-label="Security & Governance Header" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Lock className="w-5 h-5 text-amber-400" />
            <span className="text-xs font-mono font-bold text-amber-400 uppercase tracking-wider">
              Production Safety & Compliance
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Security & Governance Controls</h1>
          <p className="text-xs text-slate-400 max-w-2xl">
            Enterprise safeguards ensuring AI models never execute destructive production actions autonomously. Human approval is strictly enforced with immutable audit logging.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-xs font-mono text-emerald-400">
          <ShieldCheck className="w-4 h-4" />
          <span>SOC2 & ISO-27001 Compliant</span>
        </div>
      </section>

      {/* Safety Philosophy Banner */}
      <section aria-label="Core SRE Principle" className="bg-gradient-to-r from-blue-950/40 via-slate-900 to-slate-950 border border-blue-500/40 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="text-xs font-mono font-bold text-blue-400 uppercase">Foundational SRE Policy</div>
          <h2 className="text-xl font-bold text-white">AI recommends. Engineers decide. The organization learns.</h2>
          <p className="text-xs text-slate-300">
            No rolling restarts, parameter overrides, or replica teardowns are ever scheduled without cryptographic confirmation from a human engineer on call.
          </p>
        </div>
        <span className="px-4 py-2 rounded-xl bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold border border-emerald-500/40 whitespace-nowrap">
          Zero Autonomous Mutation Lock
        </span>
      </section>

      {/* Sensitive Data Masking Demo */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <FileCode className="w-5 h-5 text-cyan-400" />
            <h3 className="text-sm font-bold text-white">Zero-Leak Sensitive Data Masking</h3>
          </div>
          <button
            onClick={() => setMaskPii(!maskPii)}
            className="flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 transition-colors"
          >
            {maskPii ? <EyeOff className="w-3.5 h-3.5 text-amber-400" /> : <Eye className="w-3.5 h-3.5 text-cyan-400" />}
            <span>{maskPii ? 'Masking Enabled (Default)' : 'Masking Disabled (Unsafe)'}</span>
          </button>
        </div>

        <p className="text-xs text-slate-400">
          All client payment tokens, passwords, bearer secrets, and PII are redacted on edge ingestion prior to embedding in organizational memory:
        </p>

        <div className="p-4 rounded-xl bg-black/60 font-mono text-xs text-slate-300 space-y-2 border border-slate-800">
          <div>
            <span className="text-slate-500">[20:14:31.442]</span>{' '}
            <span className="text-rose-400">ERROR</span>{' '}
            <span className="text-indigo-400">PaymentService:</span> Processing checkout token=
            {maskPii ? (
              <span className="bg-amber-500/20 text-amber-300 px-1 rounded border border-amber-500/30">
                [REDACTED_STRIPE_TOKEN_**9182]
              </span>
            ) : (
              <span className="text-rose-400">tok_1N3k092eZvKYlo2CLs9182f718</span>
            )}{' '}
            customer_email=
            {maskPii ? (
              <span className="bg-amber-500/20 text-amber-300 px-1 rounded border border-amber-500/30">
                [REDACTED_EMAIL_**@corp.com]
              </span>
            ) : (
              <span className="text-rose-400">harsha.oncall@corp.com</span>
            )}
          </div>
        </div>
      </div>

      {/* Immutable Audit Log Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <UserCheck className="w-5 h-5 text-indigo-400" />
            <h3 className="text-sm font-bold text-white">Immutable Incident Audit Log</h3>
          </div>
          <span className="text-xs font-mono text-slate-400">Append-Only Cryptographic Ledger</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Time</th>
                <th className="py-2.5 px-3">Actor / Agent</th>
                <th className="py-2.5 px-3">Action</th>
                <th className="py-2.5 px-3">Details</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
              {auditLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-800/30">
                  <td className="py-2.5 px-3 text-slate-500">{log.timestamp}</td>
                  <td className="py-2.5 px-3 text-cyan-300 font-bold">{log.actor}</td>
                  <td className="py-2.5 px-3 text-white font-medium">{log.action}</td>
                  <td className="py-2.5 px-3 text-slate-300 font-sans max-w-md truncate">{log.details}</td>
                  <td className="py-2.5 px-3 text-slate-400 text-[10px]">{log.category}</td>
                  <td className="py-2.5 px-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        log.status === 'SUCCESS'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : log.status === 'WARN'
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-rose-500/20 text-rose-300'
                      }`}
                    >
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
