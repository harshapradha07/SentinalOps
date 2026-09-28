import React, { useState } from 'react';
import { useIncidents } from '../context/IncidentContext';
import {
  Cpu,
  MessageSquare,
  ArrowRight,
  Database,
  Cloud,
  CheckCircle2,
  ExternalLink,
  ShieldAlert,
  Sparkles,
} from 'lucide-react';

export const AzureIntegrationView: React.FC = () => {
  const { investigateIncident, setCurrentView } = useIncidents();
  const [acknowledged, setAcknowledged] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <section aria-label="Azure Integration Header" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Cpu className="w-5 h-5 text-sky-400" />
            <span className="text-xs font-mono font-bold text-sky-400 uppercase tracking-wider">
              Microsoft Cloud Ecosystem
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Microsoft Azure & Teams Architecture
          </h1>
          <p className="text-xs text-slate-400 max-w-2xl">
            SentinelOps AI seamlessly plugs into the enterprise Microsoft stack, transforming Azure Monitor telemetry into actionable organizational intelligence delivered straight into Microsoft Teams.
          </p>
        </div>

        <span className="px-3 py-1.5 rounded-xl bg-sky-950/60 border border-sky-800 text-sky-300 text-xs font-mono">
          Conceptual Azure-Ready Architecture
        </span>
      </section>

      {/* Conceptual Pipeline Visualization */}
      <section aria-label="Conceptual Architecture Pipeline" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <h2 className="text-base font-bold text-white">Azure Operational Data Flow</h2>
          <span className="text-xs text-slate-400 font-mono">Enterprise Microservice Integration</span>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2 pt-2">
          {[
            { step: '1. Ingestion', name: 'Azure Monitor', desc: 'Metrics & Log Analytics' },
            { step: '2. Eventing', name: 'Azure Functions', desc: 'Webhook dispatch' },
            { step: '3. Core Engine', name: 'SentinelOps AI', desc: 'Autonomous reasoning' },
            { step: '4. Intelligence', name: 'Azure OpenAI', desc: 'LLM reasoning engine' },
            { step: '5. Retrieval', name: 'Azure AI Search', desc: 'Vector incident store' },
            { step: '6. Storage', name: 'Cosmos DB', desc: 'Incident memory graph' },
            { step: '7. Execution', name: 'Automation Runbooks', desc: 'Safe pod remediation' },
            { step: '8. Collaboration', name: 'Microsoft Teams', desc: 'Interactive approval' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col justify-between space-y-2 hover:border-sky-500/40 transition-colors"
            >
              <div>
                <span className="text-[10px] font-mono text-sky-400 font-bold block">{item.step}</span>
                <span className="text-xs font-bold text-white mt-1 block">{item.name}</span>
              </div>
              <span className="text-[10px] text-slate-400 font-mono">{item.desc}</span>
            </div>
          ))}
        </div>

        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-400 mt-2">
          <strong>Transparency Notice:</strong> All Azure and Teams integrations shown in this hackathon prototype demonstrate the proposed production architecture and use simulated telemetry connectors.
        </div>
      </section>

      {/* Simulated Microsoft Teams Adaptive Card Preview */}
      <section aria-label="Simulated Microsoft Teams Adaptive Card" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center space-x-2">
            <MessageSquare className="w-5 h-5 text-indigo-400" />
            <h2 className="text-base font-bold text-white">Simulated Microsoft Teams Incident Alert</h2>
          </div>
          <p className="text-xs text-slate-400">
            Interactive Adaptive Card posted to <code>#sre-oncall-critical</code> channel whenever a recurring production outage is detected.
          </p>

          {/* Teams Card Mockup */}
          <div className="bg-[#1b1c2e] border border-[#2b2d42] rounded-xl p-5 shadow-2xl space-y-4 max-w-xl">
            {/* Teams Channel Header */}
            <div className="flex items-center space-x-3 pb-3 border-b border-[#2b2d42]">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                SO
              </div>
              <div>
                <div className="text-xs font-bold text-white flex items-center space-x-2">
                  <span>SentinelOps AI Bot</span>
                  <span className="text-[10px] px-1 rounded bg-blue-500/20 text-blue-300">BOT</span>
                </div>
                <div className="text-[10px] text-slate-400">Today at 20:14 PM in #sre-oncall</div>
              </div>
            </div>

            {/* Incident Alert Body */}
            <div className="space-y-3">
              <div className="flex items-center space-x-2 text-rose-400 font-bold text-sm">
                <ShieldAlert className="w-4 h-4 text-rose-500" />
                <span>🔴 CRITICAL INCIDENT: Payment API 503 errors detected</span>
              </div>

              <div className="text-xs text-slate-300 space-y-1.5 font-sans">
                <div>
                  <span className="text-slate-400 font-semibold">Incident Memory:</span>{' '}
                  <span className="text-cyan-300 font-bold">Found 7 related incidents</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold">Likely Root Cause:</span>{' '}
                  <span className="text-white">Database connection pool exhaustion (&gt;90%)</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold">Recommended Runbook:</span>{' '}
                  <span className="font-mono text-emerald-400 font-bold">RB-042 (96% success rate)</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold">Negative Memory Alert:</span>{' '}
                  <span className="text-rose-300">Do NOT restart pods without pool expansion (failed in INC-1088)</span>
                </div>
              </div>

              {/* Action Buttons inside Card */}
              <div className="pt-2 flex flex-wrap items-center gap-2">
                <button
                  onClick={() => investigateIncident('INC-1042')}
                  className="px-3.5 py-1.5 rounded bg-[#4f52b2] hover:bg-[#6264a7] text-white text-xs font-semibold shadow transition-colors"
                >
                  Investigate in SentinelOps
                </button>
                <button
                  onClick={() => setCurrentView('runbooks')}
                  className="px-3.5 py-1.5 rounded bg-[#2b2d42] hover:bg-[#353852] text-slate-200 text-xs font-medium transition-colors"
                >
                  Open Runbook RB-042
                </button>
                <button
                  onClick={() => setAcknowledged(true)}
                  className={`px-3.5 py-1.5 rounded text-xs font-medium transition-colors ${
                    acknowledged
                      ? 'bg-emerald-600/30 text-emerald-300 border border-emerald-500/40'
                      : 'bg-[#2b2d42] hover:bg-[#353852] text-slate-300'
                  }`}
                >
                  {acknowledged ? '✓ Acknowledged' : 'Acknowledge'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Info Box */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-white">Why Microsoft Teams First?</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              When an outage begins, engineers don&apos;t want to log into another dashboard. They want actionable context where they already communicate.
            </p>
            <ul className="text-xs text-slate-400 space-y-2">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>1-Click human approval directly from Teams adaptive cards</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Threaded retrospective notes saved to Azure Cosmos DB</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Zero context switching during high-stress P1 incidents</span>
              </li>
            </ul>
          </div>

          <div className="pt-4 border-t border-slate-800 text-[11px] font-mono text-slate-400">
            Certified for Microsoft Copilot Studio & Teams App Package
          </div>
        </div>
      </section>
    </div>
  );
};
