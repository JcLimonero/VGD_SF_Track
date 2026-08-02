import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

export interface CrabiFilters {
  order_dms?: string;
  vin?: string;
  status?: string;
  sent_to_crabi?: string;
}

@Component({
  selector: 'vex-crabi-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crabi-filter.component.html',
  styleUrl: './crabi-filter.component.scss'
})
export class CrabiFilterComponent {
  @Output() filterChange = new EventEmitter<CrabiFilters>();

  /** Se emite cuando el usuario solicita descargar el Excel */
  @Output() downloadRequested = new EventEmitter<void>();

  /** El padre indica si hay una descarga de Excel en curso */
  @Input() isDownloadingExcel = false;

  filterForm: FormGroup;
  selectedStatus = '';
  selectedSent = '';

  readonly statuses = ['Enviado', 'Pendiente', 'Rechazado', 'En proceso'];
  readonly sentOptions = [
    { label: 'Enviado a Crabi', value: '1' },
    { label: 'No enviado', value: '0' }
  ];

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      order_dms: [''],
      vin: [''],
      status: [''],
      sent_to_crabi: ['']
    });
  }

  onFilter(): void {
    this.filterChange.emit(this.filterForm.value as CrabiFilters);
  }

  onClearFilters(): void {
    this.selectedStatus = '';
    this.selectedSent = '';
    this.filterForm.reset({
      order_dms: '',
      vin: '',
      status: '',
      sent_to_crabi: ''
    });

    this.filterChange.emit({
      order_dms: undefined,
      vin: undefined,
      status: undefined,
      sent_to_crabi: undefined
    });
  }

  onStatusToggle(status: string, event: Event): void {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;

    if (input.checked) {
      this.selectedStatus = status;
      this.filterForm.patchValue({ status }, { emitEvent: false });
    } else if (this.selectedStatus === status) {
      this.selectedStatus = '';
      this.filterForm.patchValue({ status: '' }, { emitEvent: false });
    }
  }

  onSentToggle(option: { label: string; value: string }, event: Event): void {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;

    if (input.checked) {
      this.selectedSent = option.label;
      this.filterForm.patchValue(
        { sent_to_crabi: option.value },
        { emitEvent: false }
      );
    } else if (this.selectedSent === option.label) {
      this.selectedSent = '';
      this.filterForm.patchValue({ sent_to_crabi: '' }, { emitEvent: false });
    }
  }

  closeDropdown(event: Event): void {
    const target = event.target as HTMLElement | null;
    if (!target) return;
    const details = target.closest('details.dropdown') as HTMLDetailsElement | null;
    if (details) {
      // Se cierra una vez que el formulario terminó de actualizarse
      setTimeout(() => {
        details.open = false;
      });
    }
  }
}
