import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, catchError } from 'rxjs';
import { RiskMetric, RiskStatus } from '../models/risk-metric.model';
import { RiskAlert, AlertType, RiskLevel, AlertStatus } from '../models/risk-alert.model';
import { RiskTrend, TrendDirection } from '../models/risk-trend.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RiskService {
  private baseUrl = environment.backendEndpoint;

  // Datos mock para desarrollo cuando el backend no esté disponible
  private mockMetrics: RiskMetric[] = [
    {
      id: 1,
      name: 'Ratio de Capital',
      value: 12.5,
      previousValue: 11.8,
      category: 'Capital',
      status: RiskStatus.LOW,
      threshold: 8.0,
      unit: '%',
      lastUpdated: new Date('2024-01-15T10:30:00Z'),
      description: 'Ratio de capital regulatorio'
    },
    {
      id: 2,
      name: 'Liquidez Neta',
      value: 85.2,
      previousValue: 82.1,
      category: 'Liquidez',
      status: RiskStatus.LOW,
      threshold: 70.0,
      unit: '%',
      lastUpdated: new Date('2024-01-15T10:30:00Z'),
      description: 'Ratio de liquidez neta estable'
    },
    {
      id: 3,
      name: 'Riesgo de Crédito',
      value: 6.8,
      previousValue: 7.2,
      category: 'Crédito',
      status: RiskStatus.MEDIUM,
      threshold: 5.0,
      unit: '%',
      lastUpdated: new Date('2024-01-15T10:30:00Z'),
      description: 'Exposición al riesgo de crédito'
    },
    {
      id: 4,
      name: 'Riesgo de Mercado',
      value: 4.2,
      previousValue: 3.9,
      category: 'Mercado',
      status: RiskStatus.LOW,
      threshold: 6.0,
      unit: '%',
      lastUpdated: new Date('2024-01-15T10:30:00Z'),
      description: 'Exposición al riesgo de mercado'
    },
    {
      id: 5,
      name: 'Concentración Sectorial',
      value: 18.5,
      previousValue: 19.2,
      category: 'Concentración',
      status: RiskStatus.MEDIUM,
      threshold: 15.0,
      unit: '%',
      lastUpdated: new Date('2024-01-15T10:30:00Z'),
      description: 'Concentración por sector económico'
    }
  ];

  private mockAlerts: RiskAlert[] = [
    {
      id: 1,
      title: 'Alta concentración en sector inmobiliario',
      message: 'La exposición al sector inmobiliario supera el 25% del portafolio',
      type: AlertType.CONCENTRATION,
      level: RiskLevel.MEDIUM,
      status: AlertStatus.ACTIVE,
      clientId: 'CLI001',
      createdAt: new Date('2024-01-15T08:00:00Z'),
      acknowledgedAt: null,
      resolvedAt: null
    },
    {
      id: 2,
      title: 'Deterioro en cartera comercial',
      message: 'Incremento del 15% en morosidad de cartera comercial',
      type: AlertType.CREDIT,
      level: RiskLevel.HIGH,
      status: AlertStatus.ACTIVE,
      clientId: 'CLI002',
      createdAt: new Date('2024-01-15T07:30:00Z'),
      acknowledgedAt: null,
      resolvedAt: null
    }
  ];

  private mockTrends: RiskTrend[] = [
    {
      id: 1,
      metricName: 'Ratio de Capital',
      currentValue: 12.5,
      previousValue: 11.8,
      change: 0.7,
      changePercentage: 5.9,
      direction: TrendDirection.IMPROVING,
      category: 'Capital',
      timePeriod: 'Mensual',
      trendDate: new Date('2024-01-15T10:30:00Z'),
      description: 'Mejora sostenida en el ratio de capital'
    },
    {
      id: 2,
      metricName: 'Liquidez Neta',
      currentValue: 85.2,
      previousValue: 82.1,
      change: 3.1,
      changePercentage: 3.8,
      direction: TrendDirection.IMPROVING,
      category: 'Liquidez',
      timePeriod: 'Mensual',
      trendDate: new Date('2024-01-15T10:30:00Z'),
      description: 'Liquidez estable y en mejora'
    }
  ];

  constructor(private http: HttpClient) {
    // baseUrl ya está configurado usando environment.backendEndpoint
  }

  // Métricas de Riesgo - HTTP con fallback a mock
  createMetric(metric: RiskMetric): Observable<RiskMetric> {
    return this.http.post<RiskMetric>(`${this.baseUrl}/metrics`, metric)
      .pipe(catchError(() => {
        const newMetric = { ...metric, id: this.mockMetrics.length + 1 };
        this.mockMetrics.push(newMetric);
        return of(newMetric);
      }));
  }

  getMetricsByCategory(category: string): Observable<RiskMetric[]> {
    return this.http.get<RiskMetric[]>(`${this.baseUrl}/metrics/category/${category}`)
      .pipe(catchError(() => {
        const filtered = this.mockMetrics.filter(m => m.category === category);
        return of(filtered);
      }));
  }

  getMetricsByStatus(status: RiskStatus): Observable<RiskMetric[]> {
    return this.http.get<RiskMetric[]>(`${this.baseUrl}/metrics/status/${status}`)
      .pipe(catchError(() => {
        const filtered = this.mockMetrics.filter(m => m.status === status);
        return of(filtered);
      }));
  }

  getMetricsByTimeRange(start: string, end: string): Observable<RiskMetric[]> {
    let params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<RiskMetric[]>(`${this.baseUrl}/metrics/time-range`, { params })
      .pipe(catchError(() => of(this.mockMetrics)));
  }

  updateMetric(id: number, metric: RiskMetric): Observable<RiskMetric> {
    return this.http.put<RiskMetric>(`${this.baseUrl}/metrics/${id}`, metric)
      .pipe(catchError(() => {
        const index = this.mockMetrics.findIndex(m => m.id === id);
        if (index !== -1) {
          this.mockMetrics[index] = { ...metric, id };
          return of(this.mockMetrics[index]);
        }
        return of(metric);
      }));
  }

  deleteMetric(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/metrics/${id}`)
      .pipe(catchError(() => {
        const index = this.mockMetrics.findIndex(m => m.id === id);
        if (index !== -1) {
          this.mockMetrics.splice(index, 1);
        }
        return of(void 0);
      }));
  }

  getLatestMetrics(): Observable<RiskMetric[]> {
    return this.http.get<RiskMetric[]>(`${this.baseUrl}/metrics/latest`)
      .pipe(catchError(() => of(this.mockMetrics)));
  }

  // Alertas de Riesgo - HTTP con fallback a mock
  createAlert(title: string, message: string, type: AlertType, level: RiskLevel): Observable<RiskAlert> {
    let params = new HttpParams()
      .set('title', title)
      .set('message', message)
      .set('type', type)
      .set('level', level);
    return this.http.post<RiskAlert>(`${this.baseUrl}/alerts`, {}, { params })
      .pipe(catchError(() => {
        const newAlert: RiskAlert = {
          id: this.mockAlerts.length + 1,
          title,
          message,
          type,
          level,
          status: AlertStatus.ACTIVE,
          clientId: 'CLI' + (this.mockAlerts.length + 1).toString().padStart(3, '0'),
          createdAt: new Date(),
          acknowledgedAt: null,
          resolvedAt: null
        };
        this.mockAlerts.push(newAlert);
        return of(newAlert);
      }));
  }

  getActiveAlerts(): Observable<RiskAlert[]> {
    return this.http.get<RiskAlert[]>(`${this.baseUrl}/alerts/active`)
      .pipe(catchError(() => {
        const active = this.mockAlerts.filter(a => a.status === AlertStatus.ACTIVE);
        return of(active);
      }));
  }

  getAlertsByLevel(level: RiskLevel): Observable<RiskAlert[]> {
    return this.http.get<RiskAlert[]>(`${this.baseUrl}/alerts/level/${level}`)
      .pipe(catchError(() => {
        const filtered = this.mockAlerts.filter(a => a.level === level);
        return of(filtered);
      }));
  }

  getAlertsByType(type: AlertType): Observable<RiskAlert[]> {
    return this.http.get<RiskAlert[]>(`${this.baseUrl}/alerts/type/${type}`)
      .pipe(catchError(() => {
        const filtered = this.mockAlerts.filter(a => a.type === type);
        return of(filtered);
      }));
  }

  getClientAlerts(clientId: string): Observable<RiskAlert[]> {
    return this.http.get<RiskAlert[]>(`${this.baseUrl}/alerts/client/${clientId}`)
      .pipe(catchError(() => {
        const filtered = this.mockAlerts.filter(a => a.clientId === clientId);
        return of(filtered);
      }));
  }

  acknowledgeAlert(alertId: number): Observable<RiskAlert> {
    return this.http.post<RiskAlert>(`${this.baseUrl}/alerts/${alertId}/acknowledge`, {})
      .pipe(catchError(() => {
        const alert = this.mockAlerts.find(a => a.id === alertId);
        if (alert) {
          alert.status = AlertStatus.ACKNOWLEDGED;
          alert.acknowledgedAt = new Date();
        }
        return of(alert!);
      }));
  }

  resolveAlert(alertId: number): Observable<RiskAlert> {
    return this.http.post<RiskAlert>(`${this.baseUrl}/alerts/${alertId}/resolve`, {})
      .pipe(catchError(() => {
        const alert = this.mockAlerts.find(a => a.id === alertId);
        if (alert) {
          alert.status = AlertStatus.RESOLVED;
          alert.resolvedAt = new Date();
        }
        return of(alert!);
      }));
  }

  getAlertsByTimeRange(start: string, end: string): Observable<RiskAlert[]> {
    let params = new HttpParams()
      .set('start', start)
      .set('end', end);
    return this.http.get<RiskAlert[]>(`${this.baseUrl}/alerts/time-range`, { params })
      .pipe(catchError(() => of(this.mockAlerts)));
  }

  // Tendencias de Riesgo - HTTP con fallback a mock
  createTrend(trend: RiskTrend): Observable<RiskTrend> {
    return this.http.post<RiskTrend>(`${this.baseUrl}/trends`, trend)
      .pipe(catchError(() => {
        const newTrend = { ...trend, id: this.mockTrends.length + 1 };
        this.mockTrends.push(newTrend);
        return of(newTrend);
      }));
  }

  getTrendsByCategory(category: string): Observable<RiskTrend[]> {
    return this.http.get<RiskTrend[]>(`${this.baseUrl}/trends/category/${category}`)
      .pipe(catchError(() => {
        const filtered = this.mockTrends.filter(t => t.category === category);
        return of(filtered);
      }));
  }

  getTrendsByTimePeriod(timePeriod: string): Observable<RiskTrend[]> {
    return this.http.get<RiskTrend[]>(`${this.baseUrl}/trends/period/${timePeriod}`)
      .pipe(catchError(() => {
        const filtered = this.mockTrends.filter(t => t.timePeriod === timePeriod);
        return of(filtered);
      }));
  }

  getTrendsByDirection(direction: TrendDirection): Observable<RiskTrend[]> {
    return this.http.get<RiskTrend[]>(`${this.baseUrl}/trends/direction/${direction}`)
      .pipe(catchError(() => {
        const filtered = this.mockTrends.filter(t => t.direction === direction);
        return of(filtered);
      }));
  }

  updateTrend(id: number, trend: RiskTrend): Observable<RiskTrend> {
    return this.http.put<RiskTrend>(`${this.baseUrl}/trends/${id}`, trend)
      .pipe(catchError(() => {
        const index = this.mockTrends.findIndex(t => t.id === id);
        if (index !== -1) {
          this.mockTrends[index] = { ...trend, id };
          return of(this.mockTrends[index]);
        }
        return of(trend);
      }));
  }

  deleteTrend(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/trends/${id}`)
      .pipe(catchError(() => {
        const index = this.mockTrends.findIndex(t => t.id === id);
        if (index !== -1) {
          this.mockTrends.splice(index, 1);
        }
        return of(void 0);
      }));
  }

  getLatestTrends(timePeriod: string): Observable<RiskTrend[]> {
    return this.http.get<RiskTrend[]>(`${this.baseUrl}/trends/latest/${timePeriod}`)
      .pipe(catchError(() => {
        const filtered = this.mockTrends.filter(t => t.timePeriod === timePeriod);
        return of(filtered);
      }));
  }

  getTrendsByMetricAndPeriod(metricName: string, timePeriod: string): Observable<RiskTrend[]> {
    return this.http.get<RiskTrend[]>(`${this.baseUrl}/trends/metric/${metricName}/period/${timePeriod}`)
      .pipe(catchError(() => {
        const filtered = this.mockTrends.filter(t => 
          t.metricName === metricName && t.timePeriod === timePeriod
        );
        return of(filtered);
      }));
  }
} 
