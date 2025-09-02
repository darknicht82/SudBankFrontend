import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { L01RegulatoryService, ValidationResult } from '../../../services/l01-regulatory.service';

@Component({
  selector: 'app-l01-validate',
  templateUrl: './l01-validate.component.html',
  styleUrls: ['./l01-validate.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class L01ValidateComponent implements OnInit {
  isLoading = false;
  validationResult: ValidationResult | null = null;

  constructor(private l01Service: L01RegulatoryService) {}

  ngOnInit(): void {
    this.validateStructure();
  }

  validateStructure(): void {
    this.isLoading = true;
    this.validationResult = null;

    this.l01Service.validateStructure().subscribe({
      next: (result) => {
        this.validationResult = result;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error validando estructura L01:', error);
        this.validationResult = {
          valid: false,
          message: 'Error al validar la estructura'
        };
        this.isLoading = false;
      }
    });
  }

  onRefresh(): void {
    this.validateStructure();
  }
}
