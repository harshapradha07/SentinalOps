export type IncidentSeverity = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
export type IncidentStatus = 'ACTIVE' | 'INVESTIGATING' | 'REMEDIATING' | 'RESOLVED';

export interface TelemetryMetric {
  name: string;
  currentValue: string;
  threshold: string;
  status: 'CRITICAL' | 'WARNING' | 'HEALTHY';
  history: number[];
}

export interface IncidentLogLine {
  timestamp: string;
  level: 'ERROR' | 'WARN' | 'INFO';
  service: string;
  message: string;
}

export interface EngineerFeedback {
  rating: 'HELPFUL' | 'NOT_HELPFUL';
  reason?: 'Wrong root cause' | 'Wrong runbook' | 'Incident was unrelated' | 'Resolution incomplete' | 'Other';
  notes?: string;
  engineer: string;
  submittedAt: string;
}

export interface PostMortem {
  id: string;
  incidentId: string;
  title: string;
  service: string;
  date: string;
  impact: string;
  timeline: { time: string; event: string }[];
  rootCause: string;
  contributingFactors: string[];
  resolution: string;
  failedAttempts?: string[];
  successfulRunbook: string;
  preventionActions: { action: string; status: 'PENDING' | 'ACCEPTED' | 'IMPLEMENTED' }[];
  lessonsLearned: string;
}

export interface Incident {
  id: string;
  title: string;
  service: string;
  severity: IncidentSeverity;
  status: IncidentStatus;
  environment: 'Production' | 'Staging' | 'Canary';
  affectedUsersPercent: number;
  errorSignature: string;
  errorCode: string;
  telemetry: TelemetryMetric[];
  logs: IncidentLogLine[];
  deployment: {
    version: string;
    deployedAt: string;
    commitHash: string;
    author: string;
    hasConfigChange?: boolean;
  };
  rootCauseIdentified?: string;
  contributingFactors?: string[];
  recommendedRunbookId?: string;
  aiConfidence: number;
  historicalEvidenceCount: number;
  similarIncidentIds: string[];
  negativeMemoryWarning?: string;
  recommendedResolution: {
    title: string;
    description: string;
    parameterChange?: string;
    affectedPodCount?: number;
    estimatedDowntime?: string;
    safetyRisk: 'SAFE' | 'LOW' | 'MEDIUM' | 'HIGH';
  };
  resolvedAt?: string;
  resolutionDurationMinutes?: number;
  engineerApproval?: {
    approvedBy: string;
    approvedAt: string;
    decision: 'APPROVED' | 'MODIFIED' | 'REJECTED';
    notes?: string;
  };
  feedback?: EngineerFeedback;
  postMortem?: PostMortem;
  learnedAt?: string;
}

export interface IncidentMemoryPattern {
  id: string;
  patternSignature: string;
  service: string;
  rootCause: string;
  successfulRunbookId: string;
  failedApproaches: {
    attemptedAction: string;
    incidentId: string;
    whyItFailed: string;
  }[];
  evidenceIncidentCount: number;
  successfulResolutionCount: number;
  engineerFeedbackScore: number; // e.g. 4 positive out of 5
  lastUpdated: string;
  associatedIncidents: string[];
  keyIndicators: string[];
}

export interface Runbook {
  id: string;
  code: string; // e.g. RB-042
  title: string;
  service: string;
  description: string;
  successRatePercent: number;
  executionCount: number;
  avgRecoveryMinutes: number;
  relatedIncidentsCount: number;
  safetyRiskLevel: 'SAFE' | 'CAUTION' | 'HIGH_RISK';
  steps: {
    stepNumber: number;
    title: string;
    commandOrAction: string;
    isAutomated: boolean;
    verification: string;
  }[];
  preflightChecks: string[];
  recommendedWhen: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  details: string;
  category: 'INVESTIGATION' | 'APPROVAL' | 'REMEDIATION' | 'LEARNING' | 'SECURITY';
  status: 'SUCCESS' | 'WARN' | 'BLOCKED';
}

export interface ServiceHealthStatus {
  id: string;
  name: string;
  status: 'OPERATIONAL' | 'DEGRADED' | 'CRITICAL';
  latencyMs: number;
  errorRatePercent: number;
  activeIncidentsCount: number;
  iconName: string;
}

export interface PreventionItem {
  id: string;
  title: string;
  service: string;
  basis: string;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'ALREADY_IMPLEMENTED';
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  impactExplanation: string;
}
