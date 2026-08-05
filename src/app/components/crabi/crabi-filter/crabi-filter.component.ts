import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { VanguardiaApiService } from '../../../services/vanguardia-api.service';

/**
 * Filtros de Crabi. Todos corresponden a parámetros que el endpoint
 * `/vgd/orderscrabi` reconoce; los que no reconoce los ignora y devuelve el
 * listado completo, así que no conviene agregar campos sin verificarlos.
 */
export interface CrabiFilters {
  order_dms?: string;
  vin?: string;
  idAgency?: string;
  isSend?: string;
}

@Component({
  selector: 'vex-crabi-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './crabi-filter.component.html',
  styleUrl: './crabi-filter.component.scss'
})
export class CrabiFilterComponent implements OnInit {
  @Output() filterChange = new EventEmitter<CrabiFilters>();

  /** Se emite cuando el usuario solicita descargar el Excel */
  @Output() downloadRequested = new EventEmitter<void>();

  /** El padre indica si hay una descarga de Excel en curso */
  @Input() isDownloadingExcel = false;

  filterForm: FormGroup;
  agencies: any[] = [];
  selectedAgency = '';
  selectedSent = '';

  readonly sentOptions = [
    { label: 'Enviado a Crabi', value: '1' },
    { label: 'Pendiente de envío', value: '0' }
  ];

  constructor(private fb: FormBuilder, private vanguardiaApi: VanguardiaApiService) {
    this.filterForm = this.fb.group({
      order_dms: [''],
      vin: [''],
      idAgency: [''],
      isSend: ['']
    });
  }

  ngOnInit(): void {
    this.loadAgencies();
  }

  loadAgencies(): void {
    this.vanguardiaApi.getAgencies().subscribe({
      next: (agencies) => {
        this.agencies = agencies;
      },
      error: (error) => {
        console.error('Error al cargar agencias:', error);
      }
    });
  }

  onFilter(): void {
    this.filterChange.emit(this.filterForm.value as CrabiFilters);
  }

  onClearFilters(): void {
    this.selectedAgency = '';
    this.selectedSent = '';
    this.filterForm.reset({
      order_dms: '',
      vin: '',
      idAgency: '',
      isSend: ''
    });

    this.filterChange.emit({
      order_dms: undefined,
      vin: undefined,
      idAgency: undefined,
      isSend: undefined
    });
  }

  onAgencyToggle(agency: any, event: Event): void {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;

    if (input.checked) {
      this.selectedAgency = agency.name;
      this.filterForm.patchValue(
        { idAgency: agency.idAgency },
        { emitEvent: false }
      );
    } else if (this.selectedAgency === agency.name) {
      this.selectedAgency = '';
      this.filterForm.patchValue({ idAgency: '' }, { emitEvent: false });
    }
  }

  onSentToggle(option: { label: string; value: string }, event: Event): void {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;

    if (input.checked) {
      this.selectedSent = option.label;
      this.filterForm.patchValue({ isSend: option.value }, { emitEvent: false });
    } else if (this.selectedSent === option.label) {
      this.selectedSent = '';
      this.filterForm.patchValue({ isSend: '' }, { emitEvent: false });
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
