import React from 'react';
import { useIncidents } from '../context/IncidentContext';
import {
  Brain,
  ShieldAlert,
  Search,
  Zap,
  RotateCw,
  ArrowRight,
  Sparkles,
  Play,
  Layers,
  CheckCircle2,
  Terminal,
  Activity,
  Cpu,
  Flame,
  XCircle,
} from 'lucide-react';

export const HeroLanding: React.FC = () => {
  const { startHackathonDemo, setCurrentView } = useIncidents();

  return (
    <div className="space-y-20 pb-20">
      {/* 1. Hero Section */}
      <section aria-label="Hero" className="relative pt-12 pb-16 overflow-hidden">
        {/* Glow backdrop */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-600/20 via-indigo-500/15 to-cyan-400/20 blur-[120px] pointer-events-none rounded-full"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          {/* Hackathon pill */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-blue-500/40 text-blue-300 text-xs font-semibold shadow-lg shadow-blue-900/20 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></span>
            <span>MICROSOFT HACKATHON PROTOTYPE</span>
            <span className="text-slate-500">•</span>
            <span className="text-slate-300">Organizational Incident Memory</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight">
            Your AI Memory for{' '}
            <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-indigo-300 bg-clip-text text-transparent">
              Production Incidents
            </span>
          </h1>

          {/* Tagline */}
          <p className="text-lg sm:text-xl font-medium text-slate-300 max-w-3xl mx-auto leading-relaxed">
            &ldquo;Your production incidents shouldn&apos;t have to teach the same lesson twice.&rdquo;
          </p>

          <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
            SentinelOps AI turns incident history, telemetry, runbooks, post-mortems, and engineer feedback into persistent operational intelligence.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={startHackathonDemo}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white font-bold text-sm shadow-xl shadow-blue-600/30 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center space-x-2"
            >
              <Play className="w-4 h-4 fill-current" />
              <span>🚀 START HACKATHON DEMO (4 MIN)</span>
            </button>

            <button
              onClick={() => setCurrentView('dashboard')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-sm border border-slate-700/80 shadow-lg shadow-black/40 transition-all flex items-center justify-center space-x-2"
            >
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span>Launch Command Center</span>
            </button>
          </div>

          {/* Core Philosophy Callout */}
          <div className="pt-6 flex items-center justify-center space-x-2 text-xs font-mono uppercase tracking-wider text-slate-400">
            <span className="text-blue-400 font-bold">AI recommends.</span>
            <span>→</span>
            <span className="text-emerald-400 font-bold">Engineers decide.</span>
            <span>→</span>
            <span className="text-cyan-400 font-bold">The organization learns.</span>
          </div>
        </div>
      </section>

      {/* 2. THE PROBLEM VS THE SOLUTION */}
      <section aria-label="Problem and Solution" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Problem Card */}
          <div className="bg-slate-900/80 border border-rose-900/40 rounded-2xl p-8 relative overflow-hidden flex flex-col justify-between">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-rose-500/10 text-rose-400 text-xs font-bold border border-rose-500/30">
                <Flame className="w-3.5 h-3.5" />
                <span>THE SRE REALITY</span>
              </div>
              <h3 className="text-xl font-bold text-white">Production Incidents Repeat Themselves</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                Every outage generates valuable engineering knowledge. But that knowledge is immediately lost in Slack threads, closed Jira tickets, and unread post-mortem documents.
              </p>
              <ul className="text-xs text-slate-400 space-y-2 pt-2">
                <li className="flex items-center space-x-2">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>Searching old tickets & asking senior engineers: &ldquo;Have we seen this before?&rdquo;</span>
                </li>
                <li className="flex items-center space-x-2">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>Repeating troubleshooting approaches that previously failed (e.g. restarting pods)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>Wasting 30+ minutes rediscovering the exact same connection pool fix</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 text-xs font-mono text-rose-400">
              Result: Repetitive downtime, engineer burnout, and stalled releases.
            </div>
          </div>

          {/* Solution Card */}
          <div className="bg-slate-900/80 border border-blue-500/40 rounded-2xl p-8 relative overflow-hidden flex flex-col justify-between shadow-xl shadow-blue-950/40">
            <div className="space-y-4">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/30">
                <Brain className="w-3.5 h-3.5 text-cyan-300" />
                <span>THE SENTINELOPS SOLUTION</span>
              </div>
              <h3 className="text-xl font-bold text-white">Persistent Organizational Incident Memory</h3>
              <p className="text-sm text-slate-300 leading-relaxed">
                SentinelOps AI acts as the institutional memory of your infrastructure. When a 503 fires, it searches historical records, highlights proven runbooks, and warns about past failed approaches.
              </p>
              <ul className="text-xs text-slate-300 space-y-2 pt-2">
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Instant correlation with historical outages across error signatures & telemetry</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Negative memory: explicitly warns about previously failed troubleshooting attempts</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Continuous learning: every approved resolution updates future confidence scores</span>
                </li>
              </ul>
            </div>
            <div className="mt-6 pt-4 border-t border-slate-800 text-xs font-mono text-cyan-400">
              Outcome: MTTR reduced from 31m to 11m via accumulated institutional intelligence.
            </div>
          </div>
        </div>
      </section>

      {/* 3. FOUR PILLARS */}
      <section aria-label="Core Pillars" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            How Organizational Memory Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            A continuous loop from real-time detection to persistent organizational learning
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: <Brain className="w-6 h-6 text-blue-400" />,
              title: '1. Remember',
              subtitle: 'Institutional Memory',
              desc: 'Indexes root causes, telemetry signatures, pod configs, and failed troubleshooting across hundreds of past incidents.',
            },
            {
              icon: <Search className="w-6 h-6 text-cyan-400" />,
              title: '2. Investigate',
              subtitle: 'Signal Correlation',
              desc: 'Autonomous investigation agents read application logs, metrics, and deployment diffs to identify matching failure signatures.',
            },
            {
              icon: <Zap className="w-6 h-6 text-amber-400" />,
              title: '3. Recommend',
              subtitle: 'Proven Runbooks & Warnings',
              desc: 'Proposes proven runbooks (RB-042) while actively alerting against actions that failed previously (e.g. INC-1088).',
            },
            {
              icon: <RotateCw className="w-6 h-6 text-emerald-400" />,
              title: '4. Learn',
              subtitle: 'Feedback & Post-Mortem',
              desc: 'Generates structured post-mortems and records engineer feedback to calibrate future recommendation weights.',
            },
          ].map((pillar, idx) => (
            <div
              key={idx}
              className="bg-slate-900 border border-slate-800 rounded-xl p-6 hover:border-blue-500/40 hover:bg-slate-900/90 transition-all space-y-3"
            >
              <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center">
                {pillar.icon}
              </div>
              <h3 className="text-base font-bold text-white">{pillar.title}</h3>
              <div className="text-xs font-semibold text-blue-400">{pillar.subtitle}</div>
              <p className="text-xs text-slate-400 leading-relaxed">{pillar.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. MAIN DIFFERENTIATOR: FROM RESPONSE TO LEARNING */}
      <section aria-label="Key Differentiator" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 border border-blue-500/40 rounded-2xl p-8 sm:p-12 shadow-2xl space-y-8">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-widest">
              Core Architectural Shift
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              From Incident Response to Incident Learning
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              Most tools treat incidents as ephemeral tickets. SentinelOps AI treats them as compounding operational assets.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
            {/* Traditional Pipeline */}
            <div className="bg-slate-950/70 p-6 rounded-xl border border-slate-800 space-y-4">
              <div className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
                <span>Traditional Linear Approach</span>
                <span className="text-rose-400">Knowledge Lost</span>
              </div>

              <div className="flex flex-col space-y-2 text-xs font-mono text-slate-400">
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <span>1. Incident Occurs</span>
                  <span className="text-slate-500">Alert fires</span>
                </div>
                <div className="text-center text-slate-600">↓</div>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <span>2. Manual Investigation</span>
                  <span className="text-slate-500">Ask senior engineers</span>
                </div>
                <div className="text-center text-slate-600">↓</div>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <span>3. Ad-hoc Resolution</span>
                  <span className="text-slate-500">Try random restarts</span>
                </div>
                <div className="text-center text-slate-600">↓</div>
                <div className="p-2.5 rounded bg-rose-950/20 border border-rose-900/40 text-rose-300 flex items-center justify-between font-bold">
                  <span>4. Close Ticket</span>
                  <span>Lessons Forgotten</span>
                </div>
              </div>
            </div>

            {/* SentinelOps Learning Loop */}
            <div className="bg-blue-950/20 p-6 rounded-xl border border-blue-500/40 space-y-4 shadow-lg shadow-blue-950/50">
              <div className="text-xs font-bold text-blue-400 uppercase tracking-wider flex items-center justify-between">
                <span>SentinelOps Learning Loop</span>
                <span className="text-emerald-400 font-bold">Memory Compounding</span>
              </div>

              <div className="flex flex-col space-y-2 text-xs font-mono text-slate-200">
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <span>1. Detect & Telemetry Ingest</span>
                  <span className="text-cyan-300">HTTP 503 + DB pool &gt;90%</span>
                </div>
                <div className="text-center text-blue-400">↓</div>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <span>2. Organizational Memory Retrieval</span>
                  <span className="text-cyan-300">7 historical matches found</span>
                </div>
                <div className="text-center text-blue-400">↓</div>
                <div className="p-2.5 rounded bg-slate-900 border border-slate-800 flex items-center justify-between">
                  <span>3. Proven Runbook & Negative Warning</span>
                  <span className="text-amber-300">RB-042 + Avoid pod restart</span>
                </div>
                <div className="text-center text-blue-400">↓</div>
                <div className="p-2.5 rounded bg-emerald-950/30 border border-emerald-500/50 text-emerald-300 flex items-center justify-between font-bold">
                  <span>4. Post-Mortem & Memory Update</span>
                  <span>Smarter Future Response!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DEMO TEASER & SCENARIO PROGRESSION OVERVIEW */}
      <section aria-label="Demo Progression Preview" className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-bold text-white">Experience The Learning Curve</h2>
          <p className="text-xs text-slate-400">
            See how the agent starts with baseline knowledge and evolves into an intelligent incident partner
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-amber-400">INCIDENT 1 (INC-1042)</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">Baseline</span>
            </div>
            <h4 className="text-sm font-bold text-white">Limited Historical Memory</h4>
            <p className="text-xs text-slate-400">
              The AI encounters the Payment API 503 for the first time. Finds 0 relevant incidents. Suggests general troubleshooting with 61% confidence.
            </p>
            <div className="text-xs font-mono text-slate-500 pt-2 border-t border-slate-800">
              Matches: 0 | Confidence: 61%
            </div>
          </div>

          <div className="bg-slate-900 border border-blue-500/40 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-blue-400">INCIDENT 2 (INC-1061)</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-blue-500/20 text-blue-300">Memory Active</span>
            </div>
            <h4 className="text-sm font-bold text-white">Direct Historical Recall</h4>
            <p className="text-xs text-slate-400">
              The agent matches INC-1042 at 87% similarity, immediately surfaces RB-042 runbook, and explains the telemetry correlation.
            </p>
            <div className="text-xs font-mono text-blue-300 pt-2 border-t border-slate-800">
              Matches: 1 | Confidence: 84%
            </div>
          </div>

          <div className="bg-slate-900 border border-cyan-500/50 rounded-xl p-5 space-y-3 shadow-lg shadow-cyan-950/30">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-cyan-300">INCIDENT 5 (INC-1112)</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-200">Climax</span>
            </div>
            <h4 className="text-sm font-bold text-white">Nuanced Organizational Intelligence</h4>
            <p className="text-xs text-slate-400">
              Correlates 7 incidents. Remembers that restarting pods failed in INC-1088. Suggests config validation before executing RB-042.
            </p>
            <div className="text-xs font-mono text-cyan-300 pt-2 border-t border-slate-800 font-bold">
              Matches: 7 | Confidence: 94%
            </div>
          </div>
        </div>

        <div className="text-center pt-4">
          <button
            onClick={startHackathonDemo}
            className="px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-lg shadow-blue-900/40 inline-flex items-center space-x-2"
          >
            <span>Launch Interactive Hackathon Demo Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};
