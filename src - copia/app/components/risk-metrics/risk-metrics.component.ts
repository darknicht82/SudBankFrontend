import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { isPlatformBrowser } from '@angular/common';
import { Chart } from 'chart.js';
import { RiskService } from '../../services/risk.service';
import { RiskMetric, RiskStatus } from '../../models/risk-metric.model';
import { ChartService } from '../../services/chart.service';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-risk-metrics',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './risk-metrics.component.html',
  styleUrls: ['./risk-metrics.component.css']
})
export class RiskMetricsComponent implements OnInit {
  metrics: RiskMetric[] = [];
  barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: []
  };
  chart: Chart | null = null;

  constructor(
    private riskService: RiskService,
    private chartService: ChartService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    this.loadMetrics();
  }

  private loadMetrics(): void {
    this.riskService.getLatestMetrics().subscribe(metrics => {
      this.metrics = metrics;
      this.updateChartData();
    });
  }

  private updateChartData(): void {
    this.barChartData = {
      labels: this.metrics.map(m => m.name),
      datasets: [
        {
          data: this.metrics.map(m => m.value),
          label: 'Valor Actual',
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        },
        {
          data: this.metrics.map(m => m.previousValue || 0),
          label: 'Valor Anterior',
          backgroundColor: 'rgba(255, 99, 132, 0.5)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1
        }
      ]
    };

    if (this.chart) {
      this.chart.destroy();
    }

    if (isPlatformBrowser(this.platformId)) {
      const ctx = document.getElementById('metricsChart') as HTMLCanvasElement;
      if (ctx) {
        this.chart = new Chart(ctx, {
          type: 'bar',
          data: this.barChartData,
          options: this.chartService.getBarChartConfig().options
        });
      }
    }
  }

  getMetricStatusClass(status: RiskStatus): string {
    switch (status) {
      case RiskStatus.HIGH:
        return 'status-high';
      case RiskStatus.MEDIUM:
        return 'status-medium';
      case RiskStatus.LOW:
        return 'status-low';
      default:
        return '';
    }
  }
} 
