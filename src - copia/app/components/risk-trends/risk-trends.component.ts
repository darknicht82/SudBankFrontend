import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chart } from 'chart.js';
import { RiskService } from '../../services/risk.service';
import { RiskTrend, TrendDirection } from '../../models/risk-trend.model';
import { ChartService } from '../../services/chart.service';
import { ChartConfiguration } from 'chart.js';

@Component({
  selector: 'app-risk-trends',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './risk-trends.component.html',
  styleUrls: ['./risk-trends.component.css']
})
export class RiskTrendsComponent implements OnInit {
  trends: RiskTrend[] = [];
  lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: [],
    datasets: []
  };
  selectedPeriod: string = 'daily';
  chart: Chart | null = null;

  constructor(
    private riskService: RiskService,
    private chartService: ChartService
  ) { }

  ngOnInit(): void {
    this.loadTrends();
  }

  onPeriodChange(period: string): void {
    this.selectedPeriod = period;
    this.loadTrends();
  }

  private loadTrends(): void {
    this.riskService.getLatestTrends(this.selectedPeriod).subscribe(trends => {
      this.trends = trends;
      this.updateChartData();
    });
  }

  private updateChartData(): void {
    if (this.trends.length > 0) {
      const groupedTrends = this.trends.reduce((acc, trend) => {
        if (!acc[trend.metricName]) {
          acc[trend.metricName] = [];
        }
        acc[trend.metricName].push(trend);
        return acc;
      }, {} as { [key: string]: RiskTrend[] });

      this.lineChartData = {
        labels: Array.from(new Set(this.trends.map(t => new Date(t.trendDate).toLocaleDateString()))).sort(),
        datasets: Object.keys(groupedTrends).map(metricName => ({
          data: groupedTrends[metricName].sort((a, b) => new Date(a.trendDate).getTime() - new Date(b.trendDate).getTime()).map(t => t.currentValue),
          label: metricName,
          borderColor: this.getRandomColor(),
          fill: false,
          tension: 0.4
        }))
      };

      if (this.chart) {
        this.chart.destroy();
      }

      const ctx = document.getElementById('trendsChart') as HTMLCanvasElement;
      if (ctx) {
        this.chart = new Chart(ctx, {
          type: 'line',
          data: this.lineChartData,
          options: this.chartService.getLineChartConfig().options
        });
      }
    }
  }

  private getRandomColor(): string {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  getTrendDirectionClass(direction: TrendDirection | undefined): string {
    switch (direction) {
      case TrendDirection.IMPROVING:
        return 'trend-up';
      case TrendDirection.DECLINING:
        return 'trend-down';
      case TrendDirection.STABLE:
        return 'trend-stable';
      default:
        return '';
    }
  }
} 
