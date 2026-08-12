import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

export interface SalesforceFilters {
  vin?: string;
  agencyName?: string;
  sendedSalesForce?: string;
}

@Component({
  selector: 'vex-salesforce-filter',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './salesforce-filter.component.html',
  styleUrl: './salesforce-filter.component.scss'
})
export class SalesforceFilterComponent {
  @Output() filterChange = new EventEmitter<SalesforceFilters>();

  /** Se emite cuando el usuario solicita descargar el Excel */
  @Output() downloadRequested = new EventEmitter<void>();

  /** El padre indica si hay una descarga de Excel en curso */
  @Input() isDownloadingExcel = false;

  filterForm: FormGroup;
  selectedSent = '';

  readonly sentOptions = [
    { label: 'Enviado a SF', value: '1' },
    { label: 'No enviado', value: '0' }
  ];

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      vin: [''],
      agencyName: [''],
      sendedSalesForce: ['']
    });
  }

  onFilter(): void {
    this.filterChange.emit(this.filterForm.value as SalesforceFilters);
  }

  onClearFilters(): void {
    this.selectedSent = '';
    this.filterForm.reset({
      vin: '',
      agencyName: '',
      sendedSalesForce: ''
    });

    this.filterChange.emit({
      vin: undefined,
      agencyName: undefined,
      sendedSalesForce: undefined
    });
  }

  onSentToggle(option: { label: string; value: string }, event: Event): void {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;

    if (input.checked) {
      this.selectedSent = option.label;
      this.filterForm.patchValue(
        { sendedSalesForce: option.value },
        { emitEvent: false }
      );
    } else if (this.selectedSent === option.label) {
      this.selectedSent = '';
      this.filterForm.patchValue(
        { sendedSalesForce: '' },
        { emitEvent: false }
      );
    }
  }

  closeDropdown(event: Event): void {
    const target = event.target as HTMLElement | null;
    if (!target) return;
    const details = target.closest(
      'details.dropdown'
    ) as HTMLDetailsElement | null;
    if (details) {
      // Se cierra una vez que el formulario terminó de actualizarse
      setTimeout(() => {
        details.open = false;
      });
    }
  }
}
