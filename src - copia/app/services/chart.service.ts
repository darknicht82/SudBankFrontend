import { Injectable } from '@angular/core';
import { ChartConfiguration } from 'chart.js';

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  constructor() { }

  getLineChartConfig(): ChartConfiguration<'line'> {
    return {
      type: 'line',
      data: {
        datasets: []
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Tendencias de Riesgo'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };
  }

  getBarChartConfig(): ChartConfiguration<'bar'> {
    return {
      type: 'bar',
      data: {
        datasets: []
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'top',
          },
          title: {
            display: true,
            text: 'Métricas de Riesgo'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    };
  }
} 
