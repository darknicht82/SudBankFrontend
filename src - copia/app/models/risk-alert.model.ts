export enum AlertType {
    THRESHOLD_EXCEEDED = 'THRESHOLD_EXCEEDED',
    ANOMALY_DETECTED = 'ANOMALY_DETECTED',
    TREND_ALERT = 'TREND_ALERT',
    SYSTEM_ALERT = 'SYSTEM_ALERT',
    CONCENTRATION = 'CONCENTRATION',
    CREDIT = 'CREDIT'
}

export enum RiskLevel {
    CRITICAL = 'CRITICAL',
    HIGH = 'HIGH',
    MEDIUM = 'MEDIUM',
    LOW = 'LOW'
}

export enum AlertStatus {
    ACTIVE = 'ACTIVE',
    ACKNOWLEDGED = 'ACKNOWLEDGED',
    RESOLVED = 'RESOLVED'
}

export interface RiskAlert {
    id: number;
    title: string;
    message: string;
    type: AlertType;
    level: RiskLevel;
    createdAt: Date;
    acknowledgedAt?: Date | null;
    resolvedAt?: Date | null;
    status: AlertStatus;
    clientId?: string;
    metricId?: number;
}
