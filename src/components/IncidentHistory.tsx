import React, { useState, useMemo } from 'react';
import { useIncidents } from '../context/IncidentContext';
import {
  Layers,
  Search,
  Filter,
  ArrowUpDown,
  ExternalLink,
  CheckCircle2,
  Clock,
  Sparkles,
  X,
  FileText,
} from 'lucide-react';
import { Incident } from '../types';

export const IncidentHistory: React.FC = () => {
  const { incidents, investigateIncident } = useIncidents();

  const [searchTerm, setSearchTerm] = useState('');
  const [serviceFilter, setServiceFilter] = useState('ALL');
  const [severityFilter, setSeverityFilter] = useState('ALL');
  const [selectedIncident, setSelectedIncident] = useState<Incident | null>(null);
  const [page, setPage] = useState(1);
  const pageSize = 15;

  const filtered = useMemo(() => {
    return incidents.filter((inc) => {
      const matchSearch =
        inc.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        inc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (inc.rootCauseIdentified && inc.rootCauseIdentified.toLowerCase().includes(searchTerm.toLowerCase())) ||
        inc.errorSignature.toLowerCase().includes(searchTerm.toLowerCase());

      const matchService = serviceFilter === 'ALL' || inc.service === serviceFilter;
      const matchSeverity = severityFilter === 'ALL' || inc.severity === severityFilter;

      return matchSearch && matchService && matchSeverity;
    });
  }, [incidents, searchTerm, serviceFilter, severityFilter]);

  const totalPages = Math.ceil(filtered.length / pageSize) || 1;
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const services = ['ALL', 'Payment API', 'Authentication', 'PostgreSQL', 'Redis', 'Kubernetes', 'API Gateway', 'Notification Service', 'Storage'];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <section aria-label="Incident History Header" className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Layers className="w-5 h-5 text-blue-400" />
            <span className="text-xs font-mono font-bold text-blue-400 uppercase tracking-wider">
              Persistent Incident Archive ({incidents.length} Records)
            </span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Incident History</h1>
          <p className="text-xs text-slate-400 max-w-2xl">
            Every recorded production event fuels the agent&apos;s organizational memory. Filter and inspect root causes, resolution runbooks, and engineer feedback across all microservices.
          </p>
        </div>

        <div className="text-xs font-mono bg-slate-950 px-3 py-2 rounded-xl border border-slate-800 text-slate-300">
          Showing <strong className="text-white">{filtered.length}</strong> of {incidents.length} Incidents
        </div>
      </section>

      {/* Filter Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by ID, title, root cause..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setPage(1);
            }}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Service Dropdown */}
          <select
            value={serviceFilter}
            onChange={(e) => {
              setServiceFilter(e.target.value);
              setPage(1);
            }}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-blue-500"
          >
            {services.map((svc) => (
              <option key={svc} value={svc}>
                Service: {svc}
              </option>
            ))}
          </select>

          {/* Severity Dropdown */}
          <select
            value={severityFilter}
            onChange={(e) => {
              setSeverityFilter(e.target.value);
              setPage(1);
            }}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-blue-500"
          >
            <option value="ALL">Severity: ALL</option>
            <option value="CRITICAL">CRITICAL</option>
            <option value="HIGH">HIGH</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="LOW">LOW</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-950 text-slate-400 font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Incident ID</th>
                <th className="py-3 px-4">Service</th>
                <th className="py-3 px-4">Severity</th>
                <th className="py-3 px-4">Root Cause</th>
                <th className="py-3 px-4">Runbook</th>
                <th className="py-3 px-4">MTTR</th>
                <th className="py-3 px-4">AI Conf.</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono text-slate-300">
              {paginated.map((inc) => (
                <tr
                  key={inc.id}
                  onClick={() => setSelectedIncident(inc)}
                  className="hover:bg-slate-800/40 cursor-pointer transition-colors"
                >
                  <td className="py-3 px-4 text-blue-400 font-bold">{inc.id}</td>
                  <td className="py-3 px-4 text-white font-sans">{inc.service}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        inc.severity === 'CRITICAL'
                          ? 'bg-rose-500/20 text-rose-300'
                          : inc.severity === 'HIGH'
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-slate-800 text-slate-400'
                      }`}
                    >
                      {inc.severity}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-sans text-slate-300 max-w-xs truncate">
                    {inc.rootCauseIdentified || inc.title}
                  </td>
                  <td className="py-3 px-4 text-cyan-300">
                    {inc.recommendedRunbookId ? inc.recommendedRunbookId.toUpperCase() : 'RB-AUTO'}
                  </td>
                  <td className="py-3 px-4">{inc.resolutionDurationMinutes || 12}m</td>
                  <td className="py-3 px-4 text-emerald-400 font-bold">{inc.aiConfidence}%</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] ${
                        inc.status === 'RESOLVED'
                          ? 'bg-emerald-500/10 text-emerald-300'
                          : 'bg-amber-500/10 text-amber-300'
                      }`}
                    >
                      {inc.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-sans">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        investigateIncident(inc.id);
                      }}
                      className="px-2.5 py-1 rounded bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white transition-colors"
                    >
                      Inspect
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div>
            Page <strong className="text-white">{page}</strong> of {totalPages}
          </div>
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
              className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-white"
            >
              Previous
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page >= totalPages}
              className="px-3 py-1.5 rounded bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-white"
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Selected Incident Drawer Modal */}
      {selectedIncident && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center space-x-2">
                <span className="font-mono text-sm font-bold text-blue-400 px-2 py-0.5 rounded bg-blue-950 border border-blue-800">
                  {selectedIncident.id}
                </span>
                <span className="text-sm font-bold text-white">{selectedIncident.service}</span>
              </div>
              <button
                onClick={() => setSelectedIncident(null)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-bold text-white">{selectedIncident.title}</h3>
              <p className="text-xs text-slate-400 font-mono">
                Error Signature: <span className="text-slate-200">{selectedIncident.errorSignature}</span>
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-mono">
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Severity</span>
                  <span className="text-rose-300 font-bold">{selectedIncident.severity}</span>
                </div>
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Affected Users</span>
                  <span className="text-amber-300 font-bold">{selectedIncident.affectedUsersPercent}%</span>
                </div>
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Resolution Time</span>
                  <span className="text-emerald-400 font-bold">{selectedIncident.resolutionDurationMinutes || 12}m</span>
                </div>
                <div className="p-2.5 rounded bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">AI Confidence</span>
                  <span className="text-cyan-300 font-bold">{selectedIncident.aiConfidence}%</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1 text-xs">
                <div className="text-slate-400 font-semibold">Identified Root Cause:</div>
                <div className="text-white">
                  {selectedIncident.rootCauseIdentified || 'Database Connection Pool Exhaustion'}
                </div>
              </div>

              {selectedIncident.recommendedResolution && (
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1 text-xs">
                  <div className="text-slate-400 font-semibold">Applied Resolution:</div>
                  <div className="text-emerald-300 font-medium">
                    {selectedIncident.recommendedResolution.title}
                  </div>
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-end space-x-2">
              <button
                onClick={() => setSelectedIncident(null)}
                className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs"
              >
                Close
              </button>
              <button
                onClick={() => {
                  investigateIncident(selectedIncident.id);
                  setSelectedIncident(null);
                }}
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold"
              >
                Launch Deep Investigation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
