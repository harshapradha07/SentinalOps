import React, { useState } from 'react';
import { useIncidents } from '../context/IncidentContext';
import {
  Network,
  Brain,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  FileText,
  ShieldCheck,
  Sparkles,
  Info,
  ArrowRight,
} from 'lucide-react';

interface GraphNode {
  id: string;
  label: string;
  sublabel: string;
  type: 'CURRENT' | 'HISTORICAL' | 'CAUSE' | 'RUNBOOK' | 'RESOLUTION' | 'NEGATIVE' | 'PREVENTION';
  x: number;
  y: number;
  description: string;
}

export const MemoryKnowledgeGraph: React.FC = () => {
  const { activeIncident, investigateIncident } = useIncidents();

  const [selectedNode, setSelectedNode] = useState<string>('curr-inc');

  const nodes: GraphNode[] = [
    {
      id: 'curr-inc',
      label: activeIncident.id,
      sublabel: 'Active Incident',
      type: 'CURRENT',
      x: 350,
      y: 220,
      description: `Current production outage: ${activeIncident.title} (${activeIncident.service}) with 94-97% connection saturation.`,
    },
    // Historical incidents
    {
      id: 'inc-1042',
      label: 'INC-1042',
      sublabel: 'Initial Outage',
      type: 'HISTORICAL',
      x: 180,
      y: 100,
      description: 'First occurrence following deployment v2.8.1. Established baseline pattern and RB-042 resolution.',
    },
    {
      id: 'inc-1061',
      label: 'INC-1061',
      sublabel: '87% Similarity',
      type: 'HISTORICAL',
      x: 140,
      y: 220,
      description: 'Second occurrence during v2.8.3 rollout. Matched INC-1042 and successfully resolved via RB-042.',
    },
    {
      id: 'inc-1078',
      label: 'INC-1078',
      sublabel: '89% Similarity',
      type: 'HISTORICAL',
      x: 180,
      y: 340,
      description: 'Weekend checkout surge triggered HikariCP pool lockup. Cured with RB-042 pool expansion.',
    },
    {
      id: 'inc-1088',
      label: 'INC-1088',
      sublabel: '⚠ Negative Memory',
      type: 'NEGATIVE',
      x: 230,
      y: 430,
      description: 'Crucial negative lesson: engineers attempted restarting pods alone. The incident persisted. Learned rule: validate pool size first!',
    },
    {
      id: 'inc-1104',
      label: 'INC-1104',
      sublabel: '93% Similarity',
      type: 'HISTORICAL',
      x: 350,
      y: 80,
      description: 'EU cluster instance. 10m MTTR recorded by applying the learned organizational runbook.',
    },
    // Root Cause & Runbook
    {
      id: 'cause-pool',
      label: 'Root Cause',
      sublabel: 'DB Pool Exhaustion',
      type: 'CAUSE',
      x: 550,
      y: 130,
      description: 'HikariCP maximum pool size (100) insufficient for peak transaction concurrency during promotion events.',
    },
    {
      id: 'rb-042',
      label: 'Runbook RB-042',
      sublabel: '96% Success Rate',
      type: 'RUNBOOK',
      x: 580,
      y: 250,
      description: 'Automated Helm values patch (maxPoolSize: 200) followed by rolling pod restart with zero dropped requests.',
    },
    {
      id: 'res-verified',
      label: 'Resolution',
      sublabel: 'Rolling Recovery (11m)',
      type: 'RESOLUTION',
      x: 740,
      y: 200,
      description: 'Error rate drops from 18.4% to 1.2%. Latency normalizes from 2.8s to 420ms.',
    },
    {
      id: 'prev-action',
      label: 'Prevention Gate',
      sublabel: 'CI/CD Automated Check',
      type: 'PREVENTION',
      x: 740,
      y: 330,
      description: 'Deployment pipeline linting rule: blocks deployments if candidate Helm values configure pool under 200.',
    },
  ];

  const edges = [
    { from: 'curr-inc', to: 'inc-1042', label: 'Learned from' },
    { from: 'curr-inc', to: 'inc-1061', label: '87% match' },
    { from: 'curr-inc', to: 'inc-1078', label: 'Related' },
    { from: 'curr-inc', to: 'inc-1088', label: 'Negative warning', isNegative: true },
    { from: 'curr-inc', to: 'inc-1104', label: '93% match' },
    { from: 'curr-inc', to: 'cause-pool', label: 'Identified Cause' },
    { from: 'cause-pool', to: 'rb-042', label: 'Prescribed Procedure' },
    { from: 'rb-042', to: 'res-verified', label: 'Executes' },
    { from: 'res-verified', to: 'prev-action', label: 'Feeds Prevention' },
    { from: 'inc-1088', to: 'rb-042', label: 'Mandates RB-042' },
  ];

  const currentNode = nodes.find((n) => n.id === selectedNode) || nodes[0];

  const getNodeColor = (type: GraphNode['type']) => {
    switch (type) {
      case 'CURRENT':
        return 'fill-blue-600 stroke-cyan-300 text-white';
      case 'HISTORICAL':
        return 'fill-slate-800 stroke-blue-500 text-blue-200';
      case 'NEGATIVE':
        return 'fill-rose-950 stroke-rose-500 text-rose-200';
      case 'CAUSE':
        return 'fill-amber-950 stroke-amber-400 text-amber-200';
      case 'RUNBOOK':
        return 'fill-indigo-950 stroke-indigo-400 text-indigo-200';
      case 'RESOLUTION':
        return 'fill-emerald-950 stroke-emerald-400 text-emerald-200';
      case 'PREVENTION':
        return 'fill-teal-950 stroke-teal-400 text-teal-200';
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <section aria-label="Incident Memory Knowledge Graph Header" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Network className="w-5 h-5 text-indigo-400" />
            <span className="text-xs font-mono font-bold text-indigo-400 uppercase tracking-wider">
              Interactive Relationship Topology
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Incident Memory Knowledge Graph
          </h1>
          <p className="text-xs text-slate-400 max-w-2xl">
            Visualizing the semantic connection between the active incident, historical failure cases, negative approaches, runbooks, and preventive safeguards.
          </p>
        </div>

        <div className="flex items-center space-x-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800 text-xs font-mono text-slate-300">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
          <span>Active Context: </span>
          <span className="text-cyan-300 font-bold">{activeIncident.id}</span>
        </div>
      </section>

      {/* Main Graph Viewport and Node Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* SVG Interactive Canvas */}
        <div className="lg:col-span-3 bg-slate-950 border border-slate-800 rounded-2xl p-4 shadow-2xl relative overflow-hidden min-h-[520px] flex items-center justify-center">
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>

          <svg className="w-full h-[500px] relative z-10" viewBox="0 0 880 500">
            {/* Draw Edges */}
            <g className="edges">
              {edges.map((edge, idx) => {
                const src = nodes.find((n) => n.id === edge.from);
                const dst = nodes.find((n) => n.id === edge.to);
                if (!src || !dst) return null;
                const isSelectedEdge = selectedNode === edge.from || selectedNode === edge.to;
                return (
                  <g key={idx}>
                    <line
                      x1={src.x}
                      y1={src.y}
                      x2={dst.x}
                      y2={dst.y}
                      stroke={
                        edge.isNegative
                          ? '#f43f5e'
                          : isSelectedEdge
                          ? '#38bdf8'
                          : '#334155'
                      }
                      strokeWidth={edge.isNegative ? 2 : isSelectedEdge ? 2.5 : 1.5}
                      strokeDasharray={edge.isNegative ? '5,5' : undefined}
                      className="transition-colors duration-300"
                    />
                  </g>
                );
              })}
            </g>

            {/* Draw Nodes */}
            <g className="nodes">
              {nodes.map((node) => {
                const isSelected = selectedNode === node.id;
                const isCurrent = node.type === 'CURRENT';
                const isNegative = node.type === 'NEGATIVE';
                const r = isCurrent ? 34 : 26;

                return (
                  <g
                    key={node.id}
                    className="cursor-pointer group"
                    onClick={() => setSelectedNode(node.id)}
                  >
                    {/* Pulsing ring for current node */}
                    {isCurrent && (
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={r + 8}
                        className="fill-blue-500/20 stroke-cyan-400/40 animate-ping"
                      />
                    )}

                    {/* Node circle */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={r}
                      className={`${getNodeColor(node.type)} stroke-2 transition-all ${
                        isSelected ? 'stroke-white stroke-[3px] scale-110' : ''
                      }`}
                    />

                    {/* Node label */}
                    <text
                      x={node.x}
                      y={node.y - 2}
                      textAnchor="middle"
                      className="text-[11px] font-mono font-bold fill-white pointer-events-none select-none"
                    >
                      {node.label}
                    </text>
                    <text
                      x={node.x}
                      y={node.y + 12}
                      textAnchor="middle"
                      className="text-[9px] font-sans fill-slate-300 pointer-events-none select-none"
                    >
                      {node.sublabel.slice(0, 14)}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>

          {/* Graph Legend Overlay */}
          <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-lg p-2.5 flex flex-wrap items-center gap-3 text-[10px] font-mono text-slate-300">
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
              <span>Current</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-700 border border-blue-400"></span>
              <span>Historical</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
              <span>Negative Memory</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <span>Root Cause</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
              <span>Runbook</span>
            </span>
            <span className="flex items-center space-x-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span>Resolution</span>
            </span>
          </div>
        </div>

        {/* Node Inspector Panel */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-indigo-400 text-xs font-mono font-semibold pb-2 border-b border-slate-800">
              <Info className="w-4 h-4" />
              <span>Node Inspector</span>
            </div>

            <div>
              <span
                className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded ${
                  currentNode.type === 'NEGATIVE'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                    : currentNode.type === 'CURRENT'
                    ? 'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                    : 'bg-slate-800 text-slate-300'
                }`}
              >
                {currentNode.type}
              </span>
              <h3 className="text-xl font-bold text-white mt-1">{currentNode.label}</h3>
              <p className="text-xs text-cyan-400 font-mono mt-0.5">{currentNode.sublabel}</p>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3.5 rounded-xl border border-slate-800/80">
              {currentNode.description}
            </p>

            {currentNode.type === 'NEGATIVE' && (
              <div className="p-3 rounded-lg bg-rose-950/30 border border-rose-600/40 text-rose-300 text-xs space-y-1">
                <span className="font-bold flex items-center space-x-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>SRE Negative Knowledge Contract</span>
                </span>
                <p className="text-slate-300 text-[11px]">
                  Restarting pods alone failed in this incident. SentinelOps actively suppresses standalone restart suggestions.
                </p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-2">
            <button
              onClick={() => investigateIncident('INC-1042')}
              className="w-full py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs transition-colors flex items-center justify-center space-x-1.5"
            >
              <span>Jump to Investigation View</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
