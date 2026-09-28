import React, { useState } from 'react';
import { useIncidents } from '../context/IncidentContext';
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Brain,
  ShieldAlert,
  Search,
  BookOpen,
} from 'lucide-react';
import { PostMortem } from '../types';

export const PostMortemLibrary: React.FC = () => {
  const { incidents, investigateIncident } = useIncidents();

  // Synthetic Post-Mortem collection
  const postMortems: PostMortem[] = [
    {
      id: 'pm-1042',
      incidentId: 'INC-1042',
      title: 'Payment API HTTP 503 Major Outage Post-Mortem',
      service: 'Payment API',
      date: '2026-09-28',
      impact: '32% of users experienced failed checkout requests over an 11-minute window.',
      timeline: [
        { time: '20:10', event: 'Deployment payment-api v2.8.1 completed via Helm' },
        { time: '20:14', event: 'First HTTP 503 error returned to client' },
        { time: '20:15', event: 'SentinelOps AI flagged DB connection saturation (97%)' },
        { time: '20:17', event: 'Engineer approved RB-042 pool expansion' },
        { time: '20:21', event: 'Rolling restart complete; error rate normalized to 1.2%' },
        { time: '20:25', event: 'Incident closed and learned into organizational memory' },
      ],
      rootCause: 'Database connection pool exhaustion following deployment v2.8.1 due to undersized maxPoolSize (100).',
      contributingFactors: [
        'Connection pool limit set too low for peak concurrency',
        'Deployment validation did not execute synthetic concurrency load tests',
        'Database connection alert threshold was set at 95% instead of 80%',
      ],
      resolution: 'Increased connection pool capacity (100 -> 200) and restarted affected pods via RB-042.',
      failedAttempts: [],
      successfulRunbook: 'RB-042',
      preventionActions: [
        { action: 'Add connection pool monitoring with 80% warning alerts', status: 'ACCEPTED' },
        { action: 'Add automated load testing to CI/CD deployment pipeline', status: 'PENDING' },
        { action: 'Lower connection pool exhaustion alert threshold', status: 'IMPLEMENTED' },
      ],
      lessonsLearned: 'Connection pool metrics must be checked automatically prior to promoting canary deployments to 100% production traffic.',
    },
    {
      id: 'pm-1088',
      incidentId: 'INC-1088',
      title: 'Payment API 503 Timeout & Failed Pod Restart Post-Mortem',
      service: 'Payment API',
      date: '2026-09-23',
      impact: '24% of users experienced checkout timeouts during hotfix rollout.',
      timeline: [
        { time: '18:15', event: 'Hotfix v2.8.4 rolled out' },
        { time: '18:22', event: 'HTTP 503 timeouts spiked to 14%' },
        { time: '18:26', event: 'Engineer attempted standalone pod restart without config change' },
        { time: '18:31', event: 'Outage persisted; replacement pods immediately saturated pool' },
        { time: '18:35', event: 'RB-042 applied to expand pool to 200; incident resolved' },
      ],
      rootCause: 'Database connection pool exhaustion; attempted restart without pool expansion was ineffective.',
      contributingFactors: [
        'Incorrect troubleshooting assumption that pod restarts would clear connection leak',
      ],
      resolution: 'Executed RB-042 after pod restart failed.',
      failedAttempts: [
        'Restarted Payment API pods alone (failed: new pods immediately re-saturated connection limit)',
      ],
      successfulRunbook: 'RB-042',
      preventionActions: [
        { action: 'Log negative pattern in SentinelOps AI: pod restart alone will not resolve pool exhaustion', status: 'IMPLEMENTED' },
      ],
      lessonsLearned: 'Negative operational memory must be codified: do not restart pods when backend DB pool is the bottleneck.',
    },
    {
      id: 'pm-0982',
      incidentId: 'INC-0982',
      title: 'Redis Cluster Memory OOM Eviction Storm Post-Mortem',
      service: 'Redis',
      date: '2026-09-12',
      impact: 'Session dropouts for 8% of users during flash cart event.',
      timeline: [
        { time: '14:00', event: 'Flash checkout event launched' },
        { time: '14:12', event: 'Redis latency exceeded 300ms' },
        { time: '14:18', event: 'RB-018 executed: forced key eviction purge' },
        { time: '14:23', event: 'Memory utilization dropped from 94% to 62%' },
      ],
      rootCause: 'Cart session keys stored without explicit TTL, leading to Redis memory exhaustion.',
      contributingFactors: ['Missing application-level key expiration policy'],
      resolution: 'Executed RB-018 eviction runbook and patched cart session service.',
      failedAttempts: ['Attempted scaling redis-sentinel pods horizontally (did not relieve master RAM)'],
      successfulRunbook: 'RB-018',
      preventionActions: [
        { action: 'Mandate TTL on all redis.set calls via static code analysis', status: 'ACCEPTED' },
      ],
      lessonsLearned: 'All distributed cache keys must require deterministic TTL expiration.',
    },
  ];

  const [activePmId, setActivePmId] = useState<string>('pm-1042');
  const activePm = postMortems.find((p) => p.id === activePmId) || postMortems[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <section aria-label="Post-Mortem Library Header" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-cyan-400" />
            <span className="text-xs font-mono font-bold text-cyan-400 uppercase tracking-wider">
              Continuous Organizational Learning
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Post-Mortem Library</h1>
          <p className="text-xs text-slate-400 max-w-2xl">
            Structured retrospective documents. SentinelOps AI automatically parses timeline events, failed attempts, and prevention items to continuously train organizational memory.
          </p>
        </div>

        <div className="text-xs font-mono bg-slate-950 px-3 py-2 rounded-xl border border-slate-800 text-cyan-300">
          RFC-7944 Compliant Retrospectives
        </div>
      </section>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Post-Mortem Cards */}
        <div className="space-y-3">
          {postMortems.map((pm) => {
            const isSelected = pm.id === activePm.id;
            return (
              <div
                key={pm.id}
                onClick={() => setActivePmId(pm.id)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 border-blue-500 shadow-lg shadow-blue-950/40 ring-1 ring-blue-500/40'
                    : 'bg-slate-900/80 border-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-bold text-cyan-300 px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800/40">
                    {pm.incidentId}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{pm.date}</span>
                </div>

                <h3 className="text-sm font-bold text-white mt-2 line-clamp-2">{pm.title}</h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">{pm.rootCause}</p>

                <div className="mt-3 flex items-center justify-between text-[11px] font-mono text-slate-400 pt-2 border-t border-slate-800/80">
                  <span className="text-slate-300">{pm.service}</span>
                  <span className="text-blue-400 font-semibold">{pm.successfulRunbook}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Right 2 Columns: Full Post-Mortem Viewer */}
        {activePm && (
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
            <div className="pb-4 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-mono font-bold text-blue-400 bg-blue-950/60 px-2.5 py-0.5 rounded border border-blue-800">
                  {activePm.incidentId} • {activePm.service}
                </span>
                <h2 className="text-xl font-bold text-white mt-2">{activePm.title}</h2>
              </div>
              <span className="text-xs text-slate-400 font-mono">Date: {activePm.date}</span>
            </div>

            {/* Impact & Root Cause */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-bold block">User & Business Impact</span>
                <p className="text-slate-200">{activePm.impact}</p>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <span className="text-slate-400 font-bold block">Verified Root Cause</span>
                <p className="text-slate-200">{activePm.rootCause}</p>
              </div>
            </div>

            {/* Timeline */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1.5">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span>Incident Timeline</span>
              </div>
              <div className="space-y-2">
                {activePm.timeline.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 flex items-center space-x-3 text-xs"
                  >
                    <span className="font-mono text-cyan-300 font-bold">{item.time}</span>
                    <span className="text-slate-300">{item.event}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Failed Attempts (Negative Memory) */}
            {activePm.failedAttempts && activePm.failedAttempts.length > 0 && (
              <div className="p-4 rounded-xl bg-rose-950/20 border border-rose-900/40 space-y-2">
                <div className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center space-x-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Failed Troubleshooting Attempts (Codified Negative Knowledge)</span>
                </div>
                <ul className="text-xs text-slate-300 list-disc pl-5 space-y-1">
                  {activePm.failedAttempts.map((f, idx) => (
                    <li key={idx}>{f}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Prevention Action Items */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                Preventive Safeguards & Action Tracker
              </div>
              <div className="space-y-2">
                {activePm.preventionActions.map((act, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-between text-xs"
                  >
                    <span className="text-slate-300">{act.action}</span>
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        act.status === 'IMPLEMENTED'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : act.status === 'ACCEPTED'
                          ? 'bg-blue-500/20 text-blue-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {act.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Lessons Learned */}
            <div className="p-4 rounded-xl bg-blue-950/20 border border-blue-500/30 text-xs space-y-1">
              <span className="font-bold text-cyan-300 flex items-center space-x-1">
                <Brain className="w-4 h-4" />
                <span>Organizational Lesson Learned</span>
              </span>
              <p className="text-slate-200 leading-relaxed">{activePm.lessonsLearned}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
