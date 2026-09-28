import React, { createContext, useContext, useState, useMemo } from 'react';
import {
  Incident,
  IncidentMemoryPattern,
  Runbook,
  AuditLogEntry,
  ServiceHealthStatus,
  PreventionItem,
  EngineerFeedback,
} from '../types';
import {
  INITIAL_SERVICES,
  INITIAL_RUNBOOKS,
  DEMO_INCIDENT_1,
  DEMO_INCIDENT_2,
  DEMO_INCIDENT_5,
  INITIAL_MEMORIES,
  INITIAL_PREVENTIONS,
  INITIAL_AUDIT_LOGS,
  generateSyntheticIncidents,
} from '../data/mockData';

export type AppView =
  | 'landing'
  | 'dashboard'
  | 'live-incidents'
  | 'investigation'
  | 'memory-explorer'
  | 'knowledge-graph'
  | 'runbooks'
  | 'history'
  | 'post-mortems'
  | 'analytics'
  | 'prevention'
  | 'azure-integration'
  | 'security'
  | 'multi-agent';

export interface DemoStepState {
  currentStep: number; // 1 to 8
  totalSteps: number;
  stepTitle: string;
  isAutoPlaying: boolean;
  activeScenarioId: 'INC-1042' | 'INC-1061' | 'INC-1112';
}

interface IncidentContextType {
  currentView: AppView;
  setCurrentView: (view: AppView) => void;
  incidents: Incident[];
  activeIncident: Incident;
  setActiveIncident: (incident: Incident) => void;
  memories: IncidentMemoryPattern[];
  runbooks: Runbook[];
  services: ServiceHealthStatus[];
  preventions: PreventionItem[];
  auditLogs: AuditLogEntry[];
  // Demo Mode
  isDemoMode: boolean;
  setIsDemoMode: (val: boolean) => void;
  demoState: DemoStepState;
  startHackathonDemo: () => void;
  resetDemo: () => void;
  nextDemoStep: () => void;
  prevDemoStep: () => void;
  jumpToDemoStep: (step: number) => void;
  switchDemoScenario: (id: 'INC-1042' | 'INC-1061' | 'INC-1112') => void;
  // Actions
  investigateIncident: (id: string) => void;
  approveResolution: (id: string, notes?: string) => Promise<void>;
  rejectResolution: (id: string, reason: string) => void;
  submitEngineerFeedback: (incidentId: string, feedback: EngineerFeedback) => void;
  savePostMortemToMemory: (incidentId: string) => void;
  updatePreventionStatus: (id: string, status: PreventionItem['status']) => void;
  // Copilot drawer state
  isCopilotOpen: boolean;
  setIsCopilotOpen: (open: boolean) => void;
  copilotQuery: string;
  setCopilotQuery: (q: string) => void;
}

const IncidentContext = createContext<IncidentContextType | undefined>(undefined);

export const IncidentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<AppView>('landing');
  const [incidents, setIncidents] = useState<Incident[]>(() => generateSyntheticIncidents());
  const [activeIncident, setActiveIncident] = useState<Incident>(DEMO_INCIDENT_1);
  const [memories, setMemories] = useState<IncidentMemoryPattern[]>(INITIAL_MEMORIES);
  const [runbooks] = useState<Runbook[]>(INITIAL_RUNBOOKS);
  const [services, setServices] = useState<ServiceHealthStatus[]>(INITIAL_SERVICES);
  const [preventions, setPreventions] = useState<PreventionItem[]>(INITIAL_PREVENTIONS);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);

  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);
  const [isCopilotOpen, setIsCopilotOpen] = useState<boolean>(false);
  const [copilotQuery, setCopilotQuery] = useState<string>('');

  const [demoState, setDemoState] = useState<DemoStepState>({
    currentStep: 1,
    totalSteps: 8,
    stepTitle: 'Incident Detected',
    isAutoPlaying: false,
    activeScenarioId: 'INC-1042',
  });

  const stepTitles = useMemo(
    () => [
      'Incident Detected',
      'Signals & Telemetry Analyzed',
      'Historical Memory Search',
      'Root Cause Identified',
      'Runbook Recommended',
      'Engineer Approval Required',
      'Incident Resolved & Recovery',
      'Organizational Memory Updated',
    ],
    []
  );

  const addAuditEntry = (
    actor: string,
    action: string,
    details: string,
    category: AuditLogEntry['category'],
    status: AuditLogEntry['status'] = 'SUCCESS'
  ) => {
    const newEntry: AuditLogEntry = {
      id: `aud-${Date.now()}`,
      timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
      actor,
      action,
      details,
      category,
      status,
    };
    setAuditLogs((prev) => [newEntry, ...prev]);
  };

  const startHackathonDemo = () => {
    setIsDemoMode(true);
    setDemoState({
      currentStep: 1,
      totalSteps: 8,
      stepTitle: stepTitles[0],
      isAutoPlaying: false,
      activeScenarioId: 'INC-1042',
    });
    setActiveIncident(DEMO_INCIDENT_1);
    setCurrentView('investigation');
    addAuditEntry('Demo Controller', 'Hackathon Demo Started', 'Initialized Incident 1 (INC-1042) baseline exploration', 'SECURITY');
  };

  const resetDemo = () => {
    setIsDemoMode(false);
    setDemoState({
      currentStep: 1,
      totalSteps: 8,
      stepTitle: stepTitles[0],
      isAutoPlaying: false,
      activeScenarioId: 'INC-1042',
    });
    // Reset active incidents to fresh baseline
    setIncidents(generateSyntheticIncidents());
    setActiveIncident(DEMO_INCIDENT_1);
    setServices(INITIAL_SERVICES);
    setCurrentView('dashboard');
    addAuditEntry('Demo Controller', 'Demo Reset to Baseline', 'Restored initial clean state with zero active locks', 'SECURITY');
  };

  const jumpToDemoStep = (step: number) => {
    const clamped = Math.max(1, Math.min(8, step));
    setDemoState((prev) => ({
      ...prev,
      currentStep: clamped,
      stepTitle: stepTitles[clamped - 1],
    }));
  };

  const nextDemoStep = () => {
    jumpToDemoStep(demoState.currentStep + 1);
  };

  const prevDemoStep = () => {
    jumpToDemoStep(demoState.currentStep - 1);
  };

  const switchDemoScenario = (scenarioId: 'INC-1042' | 'INC-1061' | 'INC-1112') => {
    let incident = DEMO_INCIDENT_1;
    if (scenarioId === 'INC-1061') incident = DEMO_INCIDENT_2;
    if (scenarioId === 'INC-1112') incident = DEMO_INCIDENT_5;

    setActiveIncident(incident);
    setDemoState((prev) => ({
      ...prev,
      activeScenarioId: scenarioId,
      currentStep: scenarioId === 'INC-1042' ? 1 : 3, // Start at memory search for later incidents
      stepTitle: stepTitles[scenarioId === 'INC-1042' ? 0 : 2],
    }));
    setCurrentView('investigation');
    addAuditEntry(
      'Demo Controller',
      `Switched Scenario to ${scenarioId}`,
      `Demonstrating agent memory with ${scenarioId === 'INC-1042' ? '0' : scenarioId === 'INC-1061' ? '1' : '7'} historical matches`,
      'INVESTIGATION'
    );
  };

  const investigateIncident = (id: string) => {
    const found = incidents.find((i) => i.id === id);
    if (found) {
      setActiveIncident(found);
      setCurrentView('investigation');
      addAuditEntry('Engineer', 'Opened Investigation', `Investigating incident ${found.id} (${found.service})`, 'INVESTIGATION');
    }
  };

  const approveResolution = async (id: string, notes?: string): Promise<void> => {
    addAuditEntry('Engineer (Human SRE)', 'Approved Remediation', `Granted approval for ${id} execution: ${notes || 'Proceed with RB-042'}`, 'APPROVAL');

    // Update incident status to REMEDIATING
    setIncidents((prev) =>
      prev.map((inc) =>
        inc.id === id
          ? {
              ...inc,
              status: 'REMEDIATING',
              engineerApproval: {
                approvedBy: 'harsha.devops@company.internal',
                approvedAt: new Date().toLocaleTimeString('en-US', { hour12: false }),
                decision: 'APPROVED',
                notes,
              },
            }
          : inc
      )
    );

    setActiveIncident((prev) => ({
      ...prev,
      status: 'REMEDIATING',
      engineerApproval: {
        approvedBy: 'harsha.devops@company.internal',
        approvedAt: new Date().toLocaleTimeString('en-US', { hour12: false }),
        decision: 'APPROVED',
        notes,
      },
    }));

    // Advance to step 7 in demo mode
    if (isDemoMode) {
      jumpToDemoStep(7);
    }

    // Simulate recovery progression
    setTimeout(() => {
      setIncidents((prev) =>
        prev.map((inc) =>
          inc.id === id
            ? {
                ...inc,
                status: 'RESOLVED',
                resolvedAt: 'Just now',
                resolutionDurationMinutes: 11,
                telemetry: inc.telemetry.map((t) => {
                  if (t.name.includes('Database')) return { ...t, currentValue: '61%', status: 'HEALTHY' };
                  if (t.name.includes('5xx')) return { ...t, currentValue: '1.2%', status: 'HEALTHY' };
                  if (t.name.includes('Latency')) return { ...t, currentValue: '420ms', status: 'HEALTHY' };
                  return t;
                }),
              }
            : inc
        )
      );

      setActiveIncident((prev) => ({
        ...prev,
        status: 'RESOLVED',
        resolvedAt: 'Just now',
        resolutionDurationMinutes: 11,
        telemetry: prev.telemetry.map((t) => {
          if (t.name.includes('Database')) return { ...t, currentValue: '61%', status: 'HEALTHY' };
          if (t.name.includes('5xx')) return { ...t, currentValue: '1.2%', status: 'HEALTHY' };
          if (t.name.includes('Latency')) return { ...t, currentValue: '420ms', status: 'HEALTHY' };
          return t;
        }),
      }));

      // Update service health
      setServices((prev) =>
        prev.map((s) =>
          s.name === 'Payment API'
            ? { ...s, status: 'OPERATIONAL', latencyMs: 420, errorRatePercent: 1.2, activeIncidentsCount: 0 }
            : s.name === 'PostgreSQL'
            ? { ...s, status: 'OPERATIONAL', latencyMs: 38, errorRatePercent: 0.1 }
            : s
        )
      );

      addAuditEntry('Response Agent', 'Remediation Verified', `Incident ${id} successfully resolved. Telemetry normalized.`, 'REMEDIATION');
    }, 1200);
  };

  const rejectResolution = (id: string, reason: string) => {
    addAuditEntry('Engineer (Human SRE)', 'Rejected Recommendation', `Remediation rejected: ${reason}`, 'APPROVAL', 'BLOCKED');
    setIncidents((prev) =>
      prev.map((inc) =>
        inc.id === id
          ? {
              ...inc,
              engineerApproval: {
                approvedBy: 'harsha.devops@company.internal',
                approvedAt: new Date().toLocaleTimeString('en-US', { hour12: false }),
                decision: 'REJECTED',
                notes: reason,
              },
            }
          : inc
      )
    );
  };

  const submitEngineerFeedback = (incidentId: string, feedback: EngineerFeedback) => {
    setIncidents((prev) =>
      prev.map((inc) => (inc.id === incidentId ? { ...inc, feedback } : inc))
    );
    if (activeIncident.id === incidentId) {
      setActiveIncident((prev) => ({ ...prev, feedback }));
    }
    addAuditEntry(
      'Engineer',
      'Submitted Feedback',
      `Rated ${feedback.rating} for ${incidentId}${feedback.reason ? ` (${feedback.reason})` : ''}`,
      'LEARNING'
    );
  };

  const savePostMortemToMemory = (incidentId: string) => {
    const inc = incidents.find((i) => i.id === incidentId) || activeIncident;
    if (!inc) return;

    // Advance to step 8
    if (isDemoMode) {
      jumpToDemoStep(8);
    }

    // Add or increment memory pattern
    setMemories((prev) => {
      const existing = prev.find((m) => m.service === inc.service && m.rootCause.includes('Database connection pool'));
      if (existing) {
        return prev.map((m) =>
          m.id === existing.id
            ? {
                ...m,
                evidenceIncidentCount: m.evidenceIncidentCount + 1,
                successfulResolutionCount: m.successfulResolutionCount + 1,
                lastUpdated: 'Just now',
                associatedIncidents: Array.from(new Set([...m.associatedIncidents, inc.id])),
              }
            : m
        );
      } else {
        const newMem: IncidentMemoryPattern = {
          id: `MEM-${Date.now().toString().slice(-3)}`,
          patternSignature: `${inc.service} + HTTP 503 + DB pool >90%`,
          service: inc.service,
          rootCause: inc.rootCauseIdentified || 'Database Connection Pool Exhaustion',
          successfulRunbookId: inc.recommendedRunbookId || 'rb-042',
          failedApproaches: [
            {
              attemptedAction: 'Restart Payment API pods alone',
              incidentId: 'INC-1088',
              whyItFailed: 'New pods immediately re-saturated connection limit without pool expansion.',
            },
          ],
          evidenceIncidentCount: 1,
          successfulResolutionCount: 1,
          engineerFeedbackScore: 5,
          lastUpdated: 'Just now',
          associatedIncidents: [inc.id],
          keyIndicators: ['HTTP 503', 'Database pool >90%', 'Hikari connection timeout'],
        };
        return [newMem, ...prev];
      }
    });

    addAuditEntry(
      'Learning Agent',
      'Knowledge Extracted & Stored',
      `Added post-mortem findings and pattern for ${incidentId} into organizational incident memory`,
      'LEARNING'
    );
  };

  const updatePreventionStatus = (id: string, status: PreventionItem['status']) => {
    setPreventions((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status } : item))
    );
    addAuditEntry('SRE Lead', 'Updated Prevention Action', `Marked action ${id} as ${status}`, 'SECURITY');
  };

  return (
    <IncidentContext.Provider
      value={{
        currentView,
        setCurrentView,
        incidents,
        activeIncident,
        setActiveIncident,
        memories,
        runbooks,
        services,
        preventions,
        auditLogs,
        isDemoMode,
        setIsDemoMode,
        demoState,
        startHackathonDemo,
        resetDemo,
        nextDemoStep,
        prevDemoStep,
        jumpToDemoStep,
        switchDemoScenario,
        investigateIncident,
        approveResolution,
        rejectResolution,
        submitEngineerFeedback,
        savePostMortemToMemory,
        updatePreventionStatus,
        isCopilotOpen,
        setIsCopilotOpen,
        copilotQuery,
        setCopilotQuery,
      }}
    >
      {children}
    </IncidentContext.Provider>
  );
};

export const useIncidents = () => {
  const context = useContext(IncidentContext);
  if (!context) {
    throw new Error('useIncidents must be used within an IncidentProvider');
  }
  return context;
};
