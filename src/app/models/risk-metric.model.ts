export enum RiskStatus {
    HIGH = 'HIGH',
    MEDIUM = 'MEDIUM',
    LOW = 'LOW'
}

export interface RiskMetric {
    id: number;
    name: string;
    value: number;
    previousValue?: number;
    change?: number;
    status: RiskStatus;
    timestamp?: Date;
    category: string;
    description?: string;
    threshold?: number;
    unit?: string;
    lastUpdated?: Date;
} 
