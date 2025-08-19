
import { Component, OnInit, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { L01ExportData } from '../../../models/l01-export.model';
import { L01CatalogService } from '../../../services/l01-catalog.service';
import { L01RegulatoryService, L01RegulatoryData } from '../../../services/l01-regulatory.service';
import { L01ExportService } from '../../../services/l01-export.service';
import { LogMonitorComponent } from '../../../components/debug/log-monitor/log-monitor.component';
import { L01ModalFormComponent } from '../../../components/l01/l01-modal-form/l01-modal-form.component';
import { LoggerService } from '../../../services/logger.service';
import { TxtLoggerService } from '../../../services/txt-logger.service';
import { environment } from '../../../../environments/environment';
import { getL01FieldTooltip, L01FieldTooltip, L01_STRUCTURE_INFO } from '../../../utils/l01-field-tooltips';
import { HttpClient } from '@angular/common/http';
import {MatExpansionModule} from '@angular/material/expansion';

@Component({
  selector: 'app-l02-main',
  templateUrl: './l02-main.component.html',
  styleUrls: ['./l02-main.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatExpansionModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class L02MainComponent implements OnInit {
    readonly panelOpenState = signal(false);

    constructor(){}

    ngOnInit(): void {
    }
}