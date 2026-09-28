import React from 'react';
import { useIncidents } from '../context/IncidentContext';
import {
  CheckCircle2,
  Brain,
  TrendingDown,
  Sparkles,
  ArrowRight,
  RotateCcw,
  ShieldCheck,
  Zap,
} from 'lucide-react';

interface DemoFinalScreenProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoFinalScreenModal: React.FC<DemoFinalScreenProps> = ({ isOpen, onClose }) => {
  const { resetDemo, setCurrentView } = useIncidents();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 overflow-y-auto">
      <div className="bg-slate-900 border border-blue-500/50 rounded-3xl max-w-3xl w-full p-8 shadow-2xl space-y-8 animate-in fade-in zoom-in-95 my-8">
        {/* Top Status */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-mono font-bold border border-emerald-500/40">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span>🟢 INCIDENT RESOLVED & MEMORY PERSISTED</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            &ldquo;The next incident doesn&apos;t start from zero.&rdquo;
          </h2>

          <p className="text-sm text-cyan-300 font-medium">
            SentinelOps AI • Turning incident history into operational intelligence.
          </p>
        </div>

        {/* What Changed Comparison */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-slate-950/70 border border-rose-950/60 space-y-2">
            <span className="text-xs font-mono text-slate-400 font-bold uppercase">Before SentinelOps</span>
            <div className="text-lg font-bold text-rose-300">Generic Troubleshooting</div>
            <ul className="text-xs text-slate-400 space-y-1.5 pt-2">
              <li>• Search old Slack channels and closed tickets</li>
              <li>• Repeated the failed pod restart from INC-1088</li>
              <li>• 31 minutes average downtime and customer loss</li>
              <li>• Knowledge evaporates when tickets are closed</li>
            </ul>
          </div>

          <div className="p-5 rounded-2xl bg-blue-950/30 border border-emerald-500/50 space-y-2 shadow-lg shadow-emerald-950/20">
            <span className="text-xs font-mono text-emerald-400 font-bold uppercase">With SentinelOps AI</span>
            <div className="text-lg font-bold text-emerald-300">Accumulated Institutional Memory</div>
            <ul className="text-xs text-slate-200 space-y-1.5 pt-2 font-medium">
              <li>• Historical evidence: 7 related incidents identified</li>
              <li>• Remembered negative approach: warned against pod restart</li>
              <li>• Proven runbook RB-042 recommended with 94% confidence</li>
              <li>• MTTR slashed to 11 minutes with zero customer drop</li>
            </ul>
          </div>
        </div>

        {/* Cumulative Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-2xl font-black font-mono text-white">105</div>
            <div className="text-[10px] text-slate-400 font-mono mt-1">Incidents Analyzed</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-2xl font-black font-mono text-cyan-300">7</div>
            <div className="text-[10px] text-slate-400 font-mono mt-1">Related Outages Found</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-2xl font-black font-mono text-blue-400">5</div>
            <div className="text-[10px] text-slate-400 font-mono mt-1">Matching Root Causes</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800">
            <div className="text-2xl font-black font-mono text-emerald-400">3x</div>
            <div className="text-[10px] text-slate-400 font-mono mt-1">RB-042 Executions</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 col-span-2 sm:col-span-1">
            <div className="text-2xl font-black font-mono text-rose-400">2</div>
            <div className="text-[10px] text-slate-400 font-mono mt-1">Failed Approaches Remembered</div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800">
          <button
            onClick={() => {
              resetDemo();
              onClose();
            }}
            className="flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo to Start</span>
          </button>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => {
                setCurrentView('memory-explorer');
                onClose();
              }}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold"
            >
              Explore Incident Memory
            </button>
            <button
              onClick={onClose}
              className="px-6 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold shadow-lg shadow-blue-900/40"
            >
              Close & Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
