import React, { useState } from 'react';
import { useIncidents } from '../context/IncidentContext';
import {
  MessageSquareCode,
  X,
  Send,
  Sparkles,
  Brain,
  ArrowRight,
  ShieldCheck,
  BookOpen,
  Search,
} from 'lucide-react';

interface CopilotMessage {
  id: string;
  sender: 'user' | 'agent';
  text: string;
  actions?: { label: string; action: () => void }[];
}

export const IncidentCopilot: React.FC = () => {
  const {
    isCopilotOpen,
    setIsCopilotOpen,
    investigateIncident,
    setCurrentView,
    activeIncident,
  } = useIncidents();

  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<CopilotMessage[]>([
    {
      id: 'msg-1',
      sender: 'agent',
      text: 'Hello, SRE! I am SentinelOps Incident Copilot. I am directly grounded in your organization’s 105 historical incidents, runbooks, and codified failure memories.',
      actions: [
        {
          label: 'Have we seen this database issue before?',
          action: () => handlePresetQuery('Have we seen this database issue before?'),
        },
        {
          label: 'What should I check first?',
          action: () => handlePresetQuery('What should I check first?'),
        },
        {
          label: 'What failed previously?',
          action: () => handlePresetQuery('What failed previously?'),
        },
      ],
    },
  ]);

  if (!isCopilotOpen) {
    return (
      <button
        onClick={() => setIsCopilotOpen(true)}
        className="fixed bottom-6 right-6 z-40 p-3.5 rounded-full bg-blue-600 hover:bg-blue-500 text-white shadow-2xl shadow-blue-600/50 hover:scale-110 active:scale-95 transition-all flex items-center space-x-2 border border-blue-400/40"
        title="Open Incident Copilot"
      >
        <Brain className="w-5 h-5 text-cyan-300 animate-pulse" />
        <span className="text-xs font-bold pr-1 hidden sm:inline">Incident Copilot</span>
      </button>
    );
  }

  const handlePresetQuery = (query: string) => {
    respondToQuery(query);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    respondToQuery(input);
    setInput('');
  };

  const respondToQuery = (queryText: string) => {
    const userMsg: CopilotMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: queryText,
    };

    setMessages((prev) => [...prev, userMsg]);

    // Grounded knowledge deterministic fallback matching prompt specifications
    setTimeout(() => {
      const q = queryText.toLowerCase();
      let reply = '';
      let actions: { label: string; action: () => void }[] = [];

      if (q.includes('seen') || q.includes('before') || q.includes('database')) {
        reply =
          'Yes. I found 7 related incidents in organizational memory. Five had database connection pool exhaustion as the root cause. RB-042 successfully resolved three of them with an average MTTR of 11 minutes.';
        actions = [
          { label: 'View Evidence', action: () => investigateIncident('INC-1042') },
          { label: 'Open Runbook RB-042', action: () => setCurrentView('runbooks') },
        ];
      } else if (q.includes('check first') || q.includes('what should i check') || q.includes('triage')) {
        reply =
          'Check database connection utilization and compare the current connection pool configuration with the configuration from INC-1042. Specifically verify that HikariCP maxPoolSize is set to 200, not 100.';
        actions = [
          { label: 'Inspect Telemetry', action: () => investigateIncident('INC-1042') },
        ];
      } else if (q.includes('failed') || q.includes('negative') || q.includes('mistake') || q.includes('1088')) {
        reply =
          'CRITICAL NEGATIVE MEMORY: In incident INC-1088, engineers attempted a pod restart without increasing the connection pool. The incident persisted because replacement pods immediately exhausted the 100-connection limit. Do NOT restart pods without expanding pool capacity first!';
        actions = [
          { label: 'Inspect INC-1088 Post-Mortem', action: () => setCurrentView('post-mortems') },
          { label: 'View Memory Pattern', action: () => setCurrentView('memory-explorer') },
        ];
      } else {
        reply = `Analyzing active context for ${activeIncident.id} (${activeIncident.service}). Current telemetry indicates 94-97% DB connection saturation with HikariCP timeout logs. Historical memory strongly indicates applying runbook RB-042.`;
        actions = [
          { label: 'Open Investigation', action: () => investigateIncident(activeIncident.id) },
        ];
      }

      const agentMsg: CopilotMessage = {
        id: `a-${Date.now()}`,
        sender: 'agent',
        text: reply,
        actions,
      };

      setMessages((prev) => [...prev, agentMsg]);
    }, 400);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 w-96 sm:w-[420px] bg-slate-900 border border-blue-500/40 rounded-2xl shadow-2xl flex flex-col h-[520px] overflow-hidden animate-in fade-in slide-in-from-bottom-6">
      {/* Copilot Header */}
      <div className="bg-slate-950 p-4 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-lg bg-blue-600/30 border border-blue-500/40 flex items-center justify-center">
            <Brain className="w-4 h-4 text-cyan-300" />
          </div>
          <div>
            <div className="text-xs font-bold text-white flex items-center space-x-1.5">
              <span>Incident Copilot</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-500/20 text-blue-300 font-mono">
                GROUNDED
              </span>
            </div>
            <div className="text-[10px] text-slate-400 font-mono">
              Memory Store: 105 Synced Incidents
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsCopilotOpen(false)}
          className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
          >
            <div
              className={`max-w-[85%] p-3 rounded-xl leading-relaxed ${
                m.sender === 'user'
                  ? 'bg-blue-600 text-white font-medium'
                  : 'bg-slate-950 text-slate-200 border border-slate-800'
              }`}
            >
              {m.text}
            </div>

            {m.actions && m.actions.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-2">
                {m.actions.map((act, aIdx) => (
                  <button
                    key={aIdx}
                    onClick={act.action}
                    className="px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-blue-600 hover:text-white text-[11px] text-cyan-300 border border-slate-700/80 transition-colors flex items-center space-x-1"
                  >
                    <span>{act.label}</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSend} className="p-3 bg-slate-950 border-t border-slate-800 flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask incident memory (e.g. 'What failed previously?')..."
          className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
        />
        <button
          type="submit"
          className="p-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white transition-colors"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
};
