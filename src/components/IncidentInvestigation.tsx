import React, { useState } from 'react';
import { useIncidents } from '../context/IncidentContext';
import {
  ShieldAlert,
  Database,
  Activity,
  GitCommit,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  Server,
  ThumbsUp,
  ThumbsDown,
  RotateCcw,
  Search,
  ArrowRight,
  ShieldCheck,
  FileText,
  Copy,
  Check,
  Brain,
  Sliders,
  XCircle,
  HelpCircle,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';

export const IncidentInvestigation: React.FC = () => {
  const {
    activeIncident,
    demoState,
    isDemoMode,
    approveResolution,
    rejectResolution,
    submitEngineerFeedback,
    savePostMortemToMemory,
    switchDemoScenario,
    jumpToDemoStep,
    memories,
    runbooks,
  } = useIncidents();

  // Local investigation state
  const [investigateClicked, setInvestigateClicked] = useState<boolean>(true);
  const [copiedLog, setCopiedLog] = useState<boolean>(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean>(false);
  const [feedbackRating, setFeedbackRating] = useState<'HELPFUL' | 'NOT_HELPFUL' | null>(null);
  const [negativeReason, setNegativeReason] = useState<string>('');
  const [customFeedbackNotes, setCustomFeedbackNotes] = useState<string>('');
  const [showApprovalModal, setShowApprovalModal] = useState<boolean>(false);
  const [isRemediating, setIsRemediating] = useState<boolean>(false);
  const [remediationStepIndex, setRemediationStepIndex] = useState<number>(0);
  const [memorySavedNotice, setMemorySavedNotice] = useState<boolean>(false);

  const isInc1 = activeIncident.id === 'INC-1042';
  const isInc2 = activeIncident.id === 'INC-1061';
  const isInc5 = activeIncident.id === 'INC-1112';

  const remediationAnimationSteps = [
    'Validating safety preconditions and PostgreSQL connection allowance...',
    'Updating Helm chart values (maxPoolSize: 100 → 200)...',
    'Executing rolling restart of affected Payment API pods (6/6)...',
    'Running synthetic HTTP 503 and latency health probes...',
    'Monitoring cluster recovery: metrics normalized!',
  ];

  const handleCopyLogs = () => {
    const text = activeIncident.logs.map((l) => `[${l.timestamp}] ${l.level} ${l.service}: ${l.message}`).join('\n');
    navigator.clipboard.writeText(text);
    setCopiedLog(true);
    setTimeout(() => setCopiedLog(false), 2000);
  };

  const handleApprove = async () => {
    setShowApprovalModal(false);
    setIsRemediating(true);
    setRemediationStepIndex(0);

    // Simulate animated remediation progression
    for (let i = 0; i < remediationAnimationSteps.length; i++) {
      await new Promise((r) => setTimeout(r, 600));
      setRemediationStepIndex(i + 1);
    }

    await approveResolution(activeIncident.id, 'Approved via SentinelOps Safety Console');
    setIsRemediating(false);
  };

  const handleFeedback = (rating: 'HELPFUL' | 'NOT_HELPFUL') => {
    setFeedbackRating(rating);
    if (rating === 'HELPFUL') {
      submitEngineerFeedback(activeIncident.id, {
        rating: 'HELPFUL',
        engineer: 'harsha.devops@company.internal',
        submittedAt: new Date().toLocaleTimeString('en-US', { hour12: false }),
      });
      setFeedbackSubmitted(true);
    }
  };

  const submitNegativeFeedback = () => {
    submitEngineerFeedback(activeIncident.id, {
      rating: 'NOT_HELPFUL',
      reason: negativeReason as any,
      notes: customFeedbackNotes,
      engineer: 'harsha.devops@company.internal',
      submittedAt: new Date().toLocaleTimeString('en-US', { hour12: false }),
    });
    setFeedbackSubmitted(true);
  };

  const handleSaveMemory = () => {
    savePostMortemToMemory(activeIncident.id);
    setMemorySavedNotice(true);
    setTimeout(() => setMemorySavedNotice(false), 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* 1. Incident Header Banner */}
      <section aria-label="Incident Header" className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="font-mono text-sm px-2.5 py-0.5 rounded bg-slate-800 text-blue-400 font-bold border border-slate-700">
                {activeIncident.id}
              </span>
              <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40 flex items-center space-x-1">
                <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                <span>🔴 CRITICAL SEVERITY</span>
              </span>
              <span className="px-2.5 py-0.5 rounded text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
                Env: {activeIncident.environment}
              </span>
              <span className="px-2.5 py-0.5 rounded text-xs font-medium bg-slate-800 text-amber-300 border border-amber-500/30">
                Impact: {activeIncident.affectedUsersPercent}% Users Affected
              </span>
              <span
                className={`px-2.5 py-0.5 rounded text-xs font-semibold ${
                  activeIncident.status === 'RESOLVED'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : activeIncident.status === 'REMEDIATING'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                }`}
              >
                Status: {activeIncident.status}
              </span>
            </div>

            <h1 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
              {activeIncident.title}
            </h1>
            <p className="text-sm text-slate-400 font-mono">
              Error Signature: <span className="text-slate-200">{activeIncident.errorSignature}</span>
            </p>
          </div>

          {/* Quick Demo Switcher within View */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 bg-slate-950/70 p-3 rounded-lg border border-slate-800">
            <div className="text-xs text-slate-400">
              <span className="block font-semibold text-slate-200">Incident Learning Journey:</span>
              <span className="text-[11px]">Compare agent response across lifecycle</span>
            </div>
            <div className="flex items-center space-x-1.5">
              <button
                onClick={() => switchDemoScenario('INC-1042')}
                className={`px-2.5 py-1.5 rounded text-xs font-mono transition-all ${
                  isInc1
                    ? 'bg-blue-600 text-white font-bold ring-1 ring-blue-400'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Inc 1 (0 Matches)
              </button>
              <button
                onClick={() => switchDemoScenario('INC-1061')}
                className={`px-2.5 py-1.5 rounded text-xs font-mono transition-all ${
                  isInc2
                    ? 'bg-blue-600 text-white font-bold ring-1 ring-blue-400'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Inc 2 (1 Match)
              </button>
              <button
                onClick={() => switchDemoScenario('INC-1112')}
                className={`px-2.5 py-1.5 rounded text-xs font-mono transition-all ${
                  isInc5
                    ? 'bg-cyan-600 text-white font-bold ring-1 ring-cyan-400'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
              >
                Inc 5 (7 Matches + 94%)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Telemetry & Deployment Signals Grid */}
      <section aria-label="Live Telemetry Signals" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {activeIncident.telemetry.map((metric, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-xl border transition-all ${
              metric.status === 'CRITICAL'
                ? 'bg-rose-950/20 border-rose-900/60 shadow-lg shadow-rose-950/20'
                : metric.status === 'WARNING'
                ? 'bg-amber-950/20 border-amber-900/60'
                : 'bg-slate-900/90 border-slate-800'
            }`}
          >
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span className="font-medium">{metric.name}</span>
              <span
                className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                  metric.status === 'CRITICAL'
                    ? 'bg-rose-500/20 text-rose-300'
                    : metric.status === 'WARNING'
                    ? 'bg-amber-500/20 text-amber-300'
                    : 'bg-emerald-500/20 text-emerald-300'
                }`}
              >
                {metric.status}
              </span>
            </div>

            <div className="flex items-baseline justify-between mt-2">
              <div className="text-2xl font-bold font-mono text-white">
                {metric.currentValue}
              </div>
              <div className="text-xs text-slate-400 font-mono">
                Threshold: <span className="text-slate-300">{metric.threshold}</span>
              </div>
            </div>

            {/* Sparkline representation */}
            <div className="mt-3 flex items-end space-x-1 h-6 pt-1">
              {metric.history.map((val, hIdx) => {
                const max = Math.max(...metric.history, 100);
                const heightPct = Math.min(100, Math.max(15, (val / max) * 100));
                return (
                  <div
                    key={hIdx}
                    style={{ height: `${heightPct}%` }}
                    className={`flex-1 rounded-t-sm ${
                      metric.status === 'CRITICAL'
                        ? 'bg-rose-500/70'
                        : metric.status === 'WARNING'
                        ? 'bg-amber-500/70'
                        : 'bg-emerald-500/70'
                    }`}
                    title={`t-${metric.history.length - hIdx}m: ${val}`}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </section>

      {/* 3. Deep Dive: Logs & Recent Deployment Details */}
      <section aria-label="Investigation Evidence" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Error Logs View */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Database className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-semibold text-white">Application Error Logs</h3>
                <span className="text-xs text-slate-400">({activeIncident.service})</span>
              </div>
              <button
                onClick={handleCopyLogs}
                className="flex items-center space-x-1 px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 transition-colors"
              >
                {copiedLog ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedLog ? 'Copied' : 'Copy Logs'}</span>
              </button>
            </div>

            <div className="mt-3 bg-black/60 rounded-lg p-3 font-mono text-xs text-slate-300 space-y-1.5 overflow-x-auto max-h-56">
              {activeIncident.logs.map((log, idx) => (
                <div
                  key={idx}
                  className={`leading-relaxed ${
                    log.level === 'ERROR'
                      ? 'text-rose-400 bg-rose-950/20 px-1 rounded'
                      : log.level === 'WARN'
                      ? 'text-amber-400'
                      : 'text-slate-400'
                  }`}
                >
                  <span className="text-slate-500">[{log.timestamp}]</span>{' '}
                  <span className="font-semibold text-slate-400">{log.level}</span>{' '}
                  <span className="text-indigo-400">{log.service}:</span> {log.message}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
            <span>Log Source: Azure App Service / Kubernetes Pod stdout</span>
            <span className="text-emerald-400 font-mono">Telemetry ingestion healthy</span>
          </div>
        </div>

        {/* Deployment Context Card */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2 pb-3 border-b border-slate-800">
              <GitCommit className="w-4 h-4 text-blue-400" />
              <h3 className="text-sm font-semibold text-white">Correlated Deployment</h3>
            </div>

            <div className="mt-4 space-y-3">
              <div className="bg-slate-950/70 p-3 rounded-lg border border-slate-800/80">
                <div className="text-xs text-slate-400">Release Version</div>
                <div className="text-base font-bold font-mono text-white mt-0.5">
                  {activeIncident.deployment.version}
                </div>
                <div className="text-xs text-amber-400 mt-1 flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>Deployed {activeIncident.deployment.deployedAt}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded bg-slate-950/50 border border-slate-800">
                  <span className="text-slate-500 block">Commit Hash</span>
                  <span className="font-mono text-slate-300 font-semibold">{activeIncident.deployment.commitHash}</span>
                </div>
                <div className="p-2.5 rounded bg-slate-950/50 border border-slate-800">
                  <span className="text-slate-500 block">Deployer</span>
                  <span className="text-slate-300 truncate font-mono">{activeIncident.deployment.author.split('@')[0]}</span>
                </div>
              </div>

              {activeIncident.deployment.hasConfigChange && (
                <div className="p-2.5 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs">
                  <span className="font-semibold block">⚠️ Config Modification Detected:</span>
                  Datasource configuration parameters updated in Helm deployment manifest.
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-[11px] text-slate-400">
            Automated correlation score: <strong className="text-white">98.2% temporal match</strong>
          </div>
        </div>
      </section>

      {/* 4. AI INVESTIGATION & HISTORICAL MEMORY SEARCH */}
      <section aria-label="AI Investigation Engine" className="bg-slate-900 border border-blue-500/30 rounded-xl p-6 shadow-2xl relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center">
              <Brain className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                AI Investigation & Incident Memory Retrieval
              </h2>
              <p className="text-xs text-slate-400">
                Autonomous multi-agent correlation against persistent organizational memory
              </p>
            </div>
          </div>

          {/* AI Confidence Meter */}
          <div className="flex items-center space-x-4 bg-slate-950/80 px-4 py-2 rounded-lg border border-slate-800">
            <div>
              <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                AI Confidence
              </div>
              <div
                className={`text-xl font-black font-mono ${
                  activeIncident.aiConfidence >= 90
                    ? 'text-cyan-300'
                    : activeIncident.aiConfidence >= 80
                    ? 'text-blue-400'
                    : 'text-amber-400'
                }`}
              >
                {activeIncident.aiConfidence}%
              </div>
            </div>
            <div className="h-8 w-px bg-slate-800"></div>
            <div>
              <div className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">
                Historical Evidence
              </div>
              <div className="text-xl font-black font-mono text-white">
                {activeIncident.historicalEvidenceCount}{' '}
                <span className="text-xs font-normal text-slate-400">
                  {activeIncident.historicalEvidenceCount === 1 ? 'incident' : 'incidents'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Animated Investigation Steps Checklist */}
        <div className="mt-5 grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs">
          {[
            { label: 'Collecting incident signals', state: 'done' },
            { label: 'Reading application logs', state: 'done' },
            { label: 'Checking service health', state: 'done' },
            { label: 'Checking recent deployments', state: 'done' },
            {
              label: 'Searching incident memory',
              state: 'done',
              badge: isInc1 ? '0 matches' : isInc2 ? '1 match' : '7 matches',
            },
          ].map((step, idx) => (
            <div
              key={idx}
              className="p-2.5 rounded bg-slate-950/60 border border-slate-800/80 flex items-center space-x-2"
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <div className="truncate">
                <span className="text-slate-300 font-medium block truncate">{step.label}</span>
                {step.badge && (
                  <span className="text-[10px] text-cyan-400 font-mono font-semibold">{step.badge}</span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* INCIDENT 1 NARRATIVE: Baseline Limited Memory */}
        {isInc1 && (
          <div className="mt-6 p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-slate-300 space-y-3">
            <div className="flex items-center space-x-2 text-amber-400 text-sm font-semibold">
              <HelpCircle className="w-4 h-4" />
              <span>Historical Matches: 0 Highly Relevant Incidents (Establishing Baseline)</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-300">
              The Payment API is experiencing elevated 503 errors. Current evidence suggests database connectivity or connection-pool exhaustion may be contributing factors. I recommend checking database connection utilization and comparing the current deployment configuration with the previous stable version.
            </p>
            <div className="flex items-center space-x-3 text-xs text-slate-400 pt-1">
              <span>Historical Evidence: <strong className="text-white">Limited</strong></span>
              <span>•</span>
              <span>Baseline Confidence: <strong className="text-amber-400">61%</strong></span>
              <span>•</span>
              <span className="text-slate-300">The agent does not yet possess organizational pattern memory for this specific failure mode.</span>
            </div>
          </div>
        )}

        {/* INCIDENT 2 NARRATIVE: Memory Activated! Signal Comparison Table */}
        {isInc2 && (
          <div className="mt-6 p-5 rounded-xl bg-blue-950/30 border border-blue-500/40 text-slate-300 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 text-blue-400 font-semibold text-sm">
                <Brain className="w-4 h-4 text-blue-300" />
                <span>Historical Match Found: INC-1042 (Similarity: 87%)</span>
              </div>
              <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 text-xs font-mono font-bold">
                87% Match Score
              </span>
            </div>

            {/* Signal Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-950 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="py-2 px-3">Telemetry Signal</th>
                    <th className="py-2 px-3">Current (INC-1061)</th>
                    <th className="py-2 px-3">Historical (INC-1042)</th>
                    <th className="py-2 px-3">Correlation</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
                  <tr>
                    <td className="py-2 px-3 text-slate-400 font-sans">Service</td>
                    <td className="py-2 px-3 text-white">Payment API</td>
                    <td className="py-2 px-3 text-white">Payment API</td>
                    <td className="py-2 px-3 text-emerald-400">100% Identical</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-slate-400 font-sans">Error Signature</td>
                    <td className="py-2 px-3 text-rose-300">HTTP 503</td>
                    <td className="py-2 px-3 text-rose-300">HTTP 503</td>
                    <td className="py-2 px-3 text-emerald-400">Exact Match</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-slate-400 font-sans">Database Usage</td>
                    <td className="py-2 px-3 text-amber-300">94%</td>
                    <td className="py-2 px-3 text-rose-300">97%</td>
                    <td className="py-2 px-3 text-emerald-400">&gt;90% Saturation Pattern</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-slate-400 font-sans">Connection Timeout</td>
                    <td className="py-2 px-3 text-rose-300">Yes (HikariPool)</td>
                    <td className="py-2 px-3 text-rose-300">Yes (HikariPool)</td>
                    <td className="py-2 px-3 text-emerald-400">Identical Log Signature</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-slate-400 font-sans">Root Cause</td>
                    <td className="py-2 px-3 text-cyan-300">Identified via Memory</td>
                    <td className="py-2 px-3 text-slate-400">DB Pool Exhaustion</td>
                    <td className="py-2 px-3 text-emerald-400">Verified</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-3 text-slate-400 font-sans">Proven Resolution</td>
                    <td className="py-2 px-3 text-emerald-300">RB-042 Recommended</td>
                    <td className="py-2 px-3 text-slate-400">RB-042 Applied</td>
                    <td className="py-2 px-3 text-emerald-400">Proven 11m MTTR</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-slate-200 bg-slate-900/80 p-3 rounded-lg border border-slate-800">
              <strong>Agent Recommendation:</strong> This incident strongly resembles{' '}
              <strong className="text-cyan-300">INC-1042</strong>. The previous incident was caused by database connection pool exhaustion and was successfully resolved by increasing the connection pool and restarting the affected pods via{' '}
              <strong className="text-blue-400">RB-042</strong>.
            </p>
          </div>
        )}

        {/* INCIDENT 5 NARRATIVE: Climax with 7 Matches & Crucial Negative Memory! */}
        {isInc5 && (
          <div className="mt-6 space-y-4">
            <div className="p-5 rounded-xl bg-gradient-to-br from-blue-950/40 via-cyan-950/20 to-slate-900 border border-cyan-500/50 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-cyan-900/40">
                <div className="flex items-center space-x-2 text-cyan-300 font-bold text-sm">
                  <Brain className="w-5 h-5 text-cyan-400 animate-pulse" />
                  <span>🧠 ORGANIZATIONAL MEMORY ACTIVATED: 7 Related Incidents Found</span>
                </div>
                <div className="flex items-center space-x-2 text-xs font-mono">
                  <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                    AI Confidence: 94%
                  </span>
                  <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                    RB-042 Validated
                  </span>
                </div>
              </div>

              {/* Accumulated Evidence Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
                <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-center">
                  <div className="text-2xl font-black font-mono text-cyan-300">7</div>
                  <div className="text-[11px] text-slate-400">Related Incidents</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-center">
                  <div className="text-2xl font-black font-mono text-white">5 / 7</div>
                  <div className="text-[11px] text-slate-400">Same Root Cause</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-center">
                  <div className="text-2xl font-black font-mono text-emerald-400">3x</div>
                  <div className="text-[11px] text-slate-400">Successful RB-042 Uses</div>
                </div>
                <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800 text-center">
                  <div className="text-2xl font-black font-mono text-rose-400">2</div>
                  <div className="text-[11px] text-slate-400">Failed Approaches Remembered</div>
                </div>
              </div>

              {/* Advanced Contextual Recommendation */}
              <p className="text-sm leading-relaxed text-slate-200 bg-slate-900/90 p-4 rounded-lg border border-slate-800">
                I found <strong>7 related incidents</strong>. Five were caused by database connection pool exhaustion. Three were successfully resolved using <strong>RB-042</strong>. The current telemetry closely matches those incidents.
                <br /><br />
                <span className="text-cyan-300 font-semibold">Nuanced Intelligence:</span> Deployment <code>v2.8.5</code> contains a configuration change similar to <strong>INC-1088</strong>, where increasing the pool alone did not resolve the issue. I recommend <strong>validating the connection pool configuration first</strong>, then applying RB-042 if the configuration is confirmed.
              </p>
            </div>

            {/* CRUCIAL NEGATIVE MEMORY WARNING */}
            <div className="p-4 rounded-xl bg-rose-950/30 border border-rose-600/50 text-slate-300 space-y-2">
              <div className="flex items-center space-x-2 text-rose-400 font-bold text-sm">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>⚠ CRITICAL NEGATIVE MEMORY: Previous Failed Approach (INC-1088)</span>
              </div>
              <div className="text-xs space-y-1 pl-6">
                <div>
                  <span className="text-slate-400">Incident:</span>{' '}
                  <span className="font-mono text-slate-200 font-semibold">INC-1088</span>
                </div>
                <div>
                  <span className="text-slate-400">Action Attempted:</span>{' '}
                  <span className="font-mono text-rose-300">Restart Payment API pods without config validation</span>
                </div>
                <div>
                  <span className="text-slate-400">Result:</span>{' '}
                  <span className="text-rose-400 font-semibold">Incident persisted! 503 errors continued</span>
                </div>
                <div>
                  <span className="text-slate-400">Learned Rule:</span>{' '}
                  <span className="text-slate-200">
                    Restarting pods alone did NOT resolve a similar incident previously. Historical evidence mandates validating database connection limits and Helm overrides before restarting services.
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5. Root Cause Identified Card */}
        <div className="mt-6 p-5 rounded-xl bg-slate-950/90 border border-slate-800">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              <h3 className="text-base font-bold text-white">Root Cause Identified</h3>
            </div>
            <span className="px-2.5 py-0.5 rounded text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Verified by Evidence
            </span>
          </div>

          <div className="mt-3 space-y-2">
            <div className="text-lg font-semibold text-white font-mono">
              {activeIncident.rootCauseIdentified || 'Database Connection Pool Exhaustion'}
            </div>
            {activeIncident.contributingFactors && activeIncident.contributingFactors.length > 0 && (
              <div className="pt-2">
                <div className="text-xs text-slate-400 font-semibold mb-1">Contributing Factors:</div>
                <ul className="text-xs text-slate-300 space-y-1 list-disc pl-5">
                  {activeIncident.contributingFactors.map((factor, idx) => (
                    <li key={idx}>{factor}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* 6. AI Explainability ("Why this recommendation?") */}
        <div className="mt-6 p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
          <div className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2 flex items-center space-x-1.5">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>WHY THIS RECOMMENDATION? ({activeIncident.aiConfidence}% Confidence Evidence Breakdown)</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-slate-300">
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                {isInc1
                  ? 'Real-time HikariPool exhaustion logs verified (active=100/100)'
                  : isInc2
                  ? 'Strong 87% similarity match to resolved incident INC-1042'
                  : '7 similar historical incidents in organizational memory'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Current database connection utilization is 94-97% (exceeds 90% critical threshold)</span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                {isInc5
                  ? '5 / 7 incidents had the exact same database pool root cause'
                  : 'Recent deployment occurred within 15 minutes of incident onset'}
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>
                {isInc5
                  ? 'INC-1088 negative memory prevented premature standalone pod restart'
                  : 'RB-042 runbook has proven 96% success rate in production'}
              </span>
            </div>
          </div>
        </div>

        {/* 7. RECOMMENDED RESOLUTION & HUMAN APPROVAL GATEWAY */}
        <div className="mt-6 p-6 rounded-xl bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-blue-500/40 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-blue-500/20 text-blue-300">
                  RUNBOOK RB-042
                </span>
                <span className="px-2 py-0.5 rounded text-xs font-semibold bg-emerald-500/20 text-emerald-300">
                  Risk Level: SAFE
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mt-1">
                {activeIncident.recommendedResolution.title}
              </h3>
            </div>

            {/* Principle callout */}
            <div className="text-right">
              <div className="text-[11px] font-bold text-amber-400 tracking-wider">
                ⚠ ENGINEER APPROVAL REQUIRED
              </div>
              <div className="text-[10px] text-slate-400">
                AI recommends. Engineers decide.
              </div>
            </div>
          </div>

          <p className="text-xs text-slate-300 mt-3 leading-relaxed">
            {activeIncident.recommendedResolution.description}
          </p>

          <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Parameter Change</span>
              <span className="font-mono text-cyan-300 font-bold">
                {activeIncident.recommendedResolution.parameterChange || 'max_pool_size: 100 → 200'}
              </span>
            </div>
            <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Affected Workloads</span>
              <span className="font-mono text-white font-bold">6 Payment API Pods (Rolling)</span>
            </div>
            <div className="p-2.5 rounded bg-slate-900 border border-slate-800">
              <span className="text-slate-400 block text-[11px]">Estimated Downtime</span>
              <span className="font-mono text-emerald-400 font-bold">0 seconds (Zero-drop)</span>
            </div>
          </div>

          {/* Action Gateway Buttons */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-800">
            <div className="text-xs text-slate-400 flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Production guardrails verified: Dry-run passed with exit code 0</span>
            </div>

            {activeIncident.status === 'RESOLVED' ? (
              <div className="flex items-center space-x-2 text-emerald-400 font-semibold text-xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Remediation successfully applied and verified</span>
              </div>
            ) : isRemediating ? (
              <div className="flex items-center space-x-2 text-cyan-300 font-semibold text-xs">
                <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin"></div>
                <span>Executing remediation sequence...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowApprovalModal(true)}
                  className="px-5 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg shadow-emerald-900/40 hover:shadow-emerald-600/30 transition-all flex items-center space-x-1.5"
                >
                  <Check className="w-4 h-4" />
                  <span>Approve Resolution</span>
                </button>
                <button
                  onClick={() => setShowApprovalModal(true)}
                  className="px-3.5 py-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-xs border border-slate-700 transition-colors"
                >
                  Modify Parameters
                </button>
                <button
                  onClick={() => rejectResolution(activeIncident.id, 'Engineer rejected')}
                  className="px-3.5 py-2.5 rounded-lg bg-slate-800 hover:bg-rose-950 text-slate-400 hover:text-rose-300 font-medium text-xs border border-slate-700 transition-colors"
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        </div>

        {/* 8. SIMULATED REMEDIATION PROGRESSION DISPLAY */}
        {(isRemediating || activeIncident.status === 'RESOLVED') && (
          <div className="mt-6 p-6 rounded-xl bg-slate-950 border border-emerald-500/40 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <Server className="w-5 h-5 text-emerald-400" />
                <h3 className="text-sm font-bold text-white">Automated Remediation Execution</h3>
              </div>
              <span className="text-xs font-mono text-emerald-400">
                {activeIncident.status === 'RESOLVED' ? '100% Complete' : 'In Progress...'}
              </span>
            </div>

            {/* Stepper details */}
            <div className="space-y-2 text-xs font-mono">
              {remediationAnimationSteps.map((step, idx) => {
                const isFinished = activeIncident.status === 'RESOLVED' || remediationStepIndex > idx;
                const isCurrent = isRemediating && remediationStepIndex === idx;
                return (
                  <div
                    key={idx}
                    className={`flex items-center space-x-2 p-2 rounded ${
                      isFinished
                        ? 'text-emerald-300 bg-emerald-950/20'
                        : isCurrent
                        ? 'text-cyan-300 bg-cyan-950/30 animate-pulse'
                        : 'text-slate-600'
                    }`}
                  >
                    {isFinished ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    ) : isCurrent ? (
                      <div className="w-4 h-4 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin shrink-0"></div>
                    ) : (
                      <div className="w-4 h-4 rounded-full border border-slate-700 text-[10px] flex items-center justify-center text-slate-500">
                        {idx + 1}
                      </div>
                    )}
                    <span>{step}</span>
                  </div>
                );
              })}
            </div>

            {/* Post-Remediation Verification & Recovery Metrics */}
            {activeIncident.status === 'RESOLVED' && (
              <div className="mt-4 pt-4 border-t border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
                    <span className="text-base font-bold text-emerald-400">🟢 INCIDENT RESOLVED</span>
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    Resolution Time: <strong className="text-white">11 minutes</strong>
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                  <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/40 text-center">
                    <div className="text-xs text-slate-400">HTTP 5xx Error Rate</div>
                    <div className="text-xl font-bold font-mono text-emerald-300 mt-1 flex items-center justify-center space-x-1">
                      <span>18.4% → 1.2%</span>
                      <TrendingDown className="w-4 h-4 text-emerald-400" />
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/40 text-center">
                    <div className="text-xs text-slate-400">Database Connection Utilization</div>
                    <div className="text-xl font-bold font-mono text-emerald-300 mt-1 flex items-center justify-center space-x-1">
                      <span>97% → 61%</span>
                      <TrendingDown className="w-4 h-4 text-emerald-400" />
                    </div>
                  </div>
                  <div className="p-3 rounded-lg bg-emerald-950/20 border border-emerald-900/40 text-center">
                    <div className="text-xs text-slate-400">p99 API Latency</div>
                    <div className="text-xl font-bold font-mono text-emerald-300 mt-1 flex items-center justify-center space-x-1">
                      <span>2.84s → 420ms</span>
                      <TrendingDown className="w-4 h-4 text-emerald-400" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* 9. LEARNING MOMENT: "WHAT DID THE AGENT LEARN?" */}
        {activeIncident.status === 'RESOLVED' && (
          <div className="mt-8 p-6 rounded-xl bg-gradient-to-br from-blue-950/40 to-slate-900 border border-blue-400/40 shadow-2xl space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center">
                  <Brain className="w-5 h-5 text-cyan-300" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">🧠 WHAT DID THE AGENT LEARN?</h3>
                  <p className="text-xs text-slate-400">
                    Automatically extracted knowledge pattern ready to persist into organizational memory
                  </p>
                </div>
              </div>
              <span className="px-3 py-1 rounded bg-blue-500/20 text-blue-300 text-xs font-mono font-bold border border-blue-400/30">
                +1 Learned Incident Pattern
              </span>
            </div>

            {/* Extracted Pattern Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
                <span className="text-slate-400 block text-[11px] font-semibold">Incident Pattern</span>
                <span className="font-mono text-white font-medium">Payment API + HTTP 503 + DB connection &gt;90%</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
                <span className="text-slate-400 block text-[11px] font-semibold">Root Cause</span>
                <span className="text-white font-medium">Database connection pool exhaustion</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
                <span className="text-slate-400 block text-[11px] font-semibold">Successful Resolution</span>
                <span className="text-emerald-300 font-medium">Increase connection pool (100 → 200) + restart pods</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
                <span className="text-slate-400 block text-[11px] font-semibold">Proven Runbook</span>
                <span className="font-mono text-blue-400 font-bold">RB-042 (96% success rate)</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
                <span className="text-slate-400 block text-[11px] font-semibold">Triggering Deployment</span>
                <span className="font-mono text-white font-medium">{activeIncident.deployment.version}</span>
              </div>
              <div className="p-3 rounded-lg bg-slate-950/80 border border-slate-800">
                <span className="text-slate-400 block text-[11px] font-semibold">Resolution Time</span>
                <span className="font-mono text-emerald-400 font-bold">11 minutes</span>
              </div>
            </div>

            {/* Engineer Feedback Loop */}
            <div className="p-4 rounded-lg bg-slate-950/70 border border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold text-slate-300">
                  Was this recommendation useful to the incident team?
                </div>
                {feedbackSubmitted && (
                  <span className="text-xs text-emerald-400 flex items-center space-x-1">
                    <Check className="w-3.5 h-3.5" />
                    <span>Feedback Recorded in Organizational Memory</span>
                  </span>
                )}
              </div>

              {!feedbackSubmitted ? (
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleFeedback('HELPFUL')}
                      className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-emerald-950 hover:text-emerald-300 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
                    >
                      <ThumbsUp className="w-4 h-4 text-emerald-400" />
                      <span>👍 Helpful</span>
                    </button>
                    <button
                      onClick={() => handleFeedback('NOT_HELPFUL')}
                      className="flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-rose-950 hover:text-rose-300 text-slate-300 text-xs font-medium border border-slate-700 transition-colors"
                    >
                      <ThumbsDown className="w-4 h-4 text-rose-400" />
                      <span>👎 Not Helpful</span>
                    </button>
                  </div>

                  {feedbackRating === 'NOT_HELPFUL' && (
                    <div className="p-3 rounded bg-slate-900 border border-slate-800 space-y-2">
                      <div className="text-xs text-slate-400 font-medium">What was wrong?</div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {['Wrong root cause', 'Wrong runbook', 'Incident was unrelated', 'Resolution incomplete'].map(
                          (reason) => (
                            <button
                              key={reason}
                              onClick={() => setNegativeReason(reason)}
                              className={`p-1.5 rounded text-[11px] text-left border ${
                                negativeReason === reason
                                  ? 'bg-rose-950/60 border-rose-500 text-rose-200'
                                  : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-200'
                              }`}
                            >
                              {reason}
                            </button>
                          )
                        )}
                      </div>
                      <button
                        onClick={submitNegativeFeedback}
                        className="px-3 py-1 rounded bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium"
                      >
                        Submit Detailed Feedback
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-xs text-slate-400">
                  Rating: <strong className="text-white">{feedbackRating}</strong>. Stored to reinforce future recommendation weights.
                </div>
              )}
            </div>

            {/* AI-GENERATED POST-MORTEM CARD */}
            <div className="p-5 rounded-xl bg-slate-950 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center space-x-2">
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <h4 className="text-sm font-bold text-white">AI-GENERATED POST-MORTEM (INC-1042)</h4>
                </div>
                <span className="text-[11px] text-slate-400 font-mono">Format: RFC-7944 SRE Standard</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block font-semibold">Executive Impact</span>
                  <p className="text-slate-300 mt-1">32% of users experienced failed payment requests over an 11-minute window.</p>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Identified Root Cause</span>
                  <p className="text-slate-300 mt-1">Database connection pool exhaustion following deployment v2.8.1.</p>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Contributing Factors</span>
                  <ul className="text-slate-300 list-disc pl-4 mt-1 space-y-0.5">
                    <li>Connection pool limit too low</li>
                    <li>Deployment validation did not detect the issue</li>
                    <li>Database connection alert threshold was too high</li>
                  </ul>
                </div>
                <div>
                  <span className="text-slate-400 block font-semibold">Preventive Action Items</span>
                  <ul className="text-slate-300 list-disc pl-4 mt-1 space-y-0.5">
                    <li>Add connection pool monitoring with 80% warning</li>
                    <li>Add deployment validation & load testing to CI/CD</li>
                    <li>Lower alert threshold from 95% to 80%</li>
                  </ul>
                </div>
              </div>

              {/* SAVE TO INCIDENT MEMORY BUTTON */}
              <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="text-xs text-slate-400">
                  Saves structured lessons, telemetry embeddings, and negative approaches to the organizational graph.
                </div>
                <button
                  onClick={handleSaveMemory}
                  className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-900/40 hover:shadow-blue-600/30 transition-all flex items-center justify-center space-x-2"
                >
                  <Brain className="w-4 h-4 text-cyan-300" />
                  <span>SAVE TO INCIDENT MEMORY</span>
                </button>
              </div>

              {memorySavedNotice && (
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between animate-bounce">
                  <span>✓ Stored to Incident Memory. Pattern MEM-001 updated!</span>
                  <button
                    onClick={() => switchDemoScenario('INC-1061')}
                    className="text-white underline font-semibold flex items-center space-x-1"
                  >
                    <span>Launch Incident 2 to see memory in action</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </section>

      {/* Human Approval Confirmation Modal */}
      {showApprovalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center space-x-3 text-amber-400">
              <ShieldAlert className="w-6 h-6" />
              <h3 className="text-lg font-bold text-white">Authorize Production Remediation</h3>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              You are about to authorize execution of runbook <strong className="text-blue-400">RB-042</strong> on production cluster{' '}
              <code className="text-slate-200">prod-eastus-aks-01</code>.
            </p>

            <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 space-y-2 text-xs font-mono">
              <div className="flex justify-between">
                <span className="text-slate-500">Service:</span>
                <span className="text-white">Payment API (deployment/payment-api)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Parameter:</span>
                <span className="text-cyan-300">max_pool_size: 100 → 200</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Restart Mode:</span>
                <span className="text-emerald-400">Zero-downtime rolling restart (maxUnavailable=0)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Approver:</span>
                <span className="text-slate-300">harsha.devops@company.internal</span>
              </div>
            </div>

            <div className="text-[11px] text-slate-400 bg-blue-500/10 p-2.5 rounded border border-blue-500/30">
              <strong>SentinelOps Safety Contract:</strong> Production actions are strictly logged to immutable audit logs. You may abort rolling restarts at any point.
            </div>

            <div className="flex items-center justify-end space-x-3 pt-2">
              <button
                onClick={() => setShowApprovalModal(false)}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium"
              >
                Cancel
              </button>
              <button
                onClick={handleApprove}
                className="px-5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-lg shadow-emerald-900/40"
              >
                Confirm & Execute
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
