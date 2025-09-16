import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashboard-metrics',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboard-metrics.component.html',
  styleUrl: './dashboard-metrics.component.css'
})
export class DashboardMetricsComponent {
  constructor() {}
}
