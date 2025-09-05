export enum TrendDirection {
    IMPROVING = 'IMPROVING',
    DECLINING = 'DECLINING',
    STABLE = 'STABLE'
}

export interface RiskTrend {
    id: number;
    metricName: string;
    currentValue: number;
    previousValue: number;
    change: number;
    changePercentage: number;
    direction: TrendDirection;
    category: string;
    timePeriod: string;
    trendDate: Date;
    description?: string;
}
