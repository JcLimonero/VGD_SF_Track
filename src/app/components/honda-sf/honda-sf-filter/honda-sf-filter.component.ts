import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

export interface HondaSfFilters {
  record_id?: string;
  vin?: string;
  sf_object?: string;
  sync_status?: string;
}

@Component({
  selector: 'vex-honda-sf-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './honda-sf-filter.component.html',
  styleUrl: './honda-sf-filter.component.scss'
})
export class HondaSfFilterComponent {
  @Output() filterChange = new EventEmitter<HondaSfFilters>();

  /** Se emite cuando el usuario solicita descargar el Excel */
  @Output() downloadRequested = new EventEmitter<void>();

  /** El padre indica si hay una descarga de Excel en curso */
  @Input() isDownloadingExcel = false;

  filterForm: FormGroup;
  selectedObject = '';
  selectedStatus = '';

  readonly sfObjects = ['Order', 'Lead', 'Asset', 'Case'];
  readonly syncStatuses = ['Sincronizado', 'Pendiente', 'Error', 'En proceso'];

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      record_id: [''],
      vin: [''],
      sf_object: [''],
      sync_status: ['']
    });
  }

  onFilter(): void {
    this.filterChange.emit(this.filterForm.value as HondaSfFilters);
  }

  onClearFilters(): void {
    this.selectedObject = '';
    this.selectedStatus = '';
    this.filterForm.reset({
      record_id: '',
      vin: '',
      sf_object: '',
      sync_status: ''
    });

    this.filterChange.emit({
      record_id: undefined,
      vin: undefined,
      sf_object: undefined,
      sync_status: undefined
    });
  }

  onObjectToggle(sfObject: string, event: Event): void {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;

    if (input.checked) {
      this.selectedObject = sfObject;
      this.filterForm.patchValue({ sf_object: sfObject }, { emitEvent: false });
    } else if (this.selectedObject === sfObject) {
      this.selectedObject = '';
      this.filterForm.patchValue({ sf_object: '' }, { emitEvent: false });
    }
  }

  onStatusToggle(status: string, event: Event): void {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;

    if (input.checked) {
      this.selectedStatus = status;
      this.filterForm.patchValue({ sync_status: status }, { emitEvent: false });
    } else if (this.selectedStatus === status) {
      this.selectedStatus = '';
      this.filterForm.patchValue({ sync_status: '' }, { emitEvent: false });
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
