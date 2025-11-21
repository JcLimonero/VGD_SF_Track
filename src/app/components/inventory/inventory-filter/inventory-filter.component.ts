import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VanguardiaApiService } from '../../../services/vanguardia-api.service';

@Component({
  selector: 'vex-inventory-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './inventory-filter.component.html',
  styleUrl: './inventory-filter.component.scss'
})
export class InventoryFilterComponent implements OnInit {

  @Output() filterChange = new EventEmitter<{
    vin?: string;
    idAgency?: string;
    statusDescription?: string;
    typeDescription?: string;
    sendedSalesForce?: '1' | '0';
    insertado?: boolean;
    error?: boolean;
  }>();

  /** Emitted when the user requests to download the Excel file */
  @Output() downloadRequested = new EventEmitter<void>();

  /** Parent can pass whether an Excel generation is in progress */
  @Input() isDownloadingExcel = false;

  filterForm: FormGroup;
  agencies: any[] = [];
  selectedAgency: string = ''; // Nombre mostrado en UI
  selectedAgencyId: string = ''; // ID para enviar a la API
  selectedStatus: string = ''; // Estado seleccionado
  selectedType: string = ''; // Tipo seleccionado

  constructor(private fb: FormBuilder, private vanguardiaApi: VanguardiaApiService) {
    this.filterForm = this.fb.group({
      vin: [''],
      idAgency: [''],
      statusDescription: [''],
      typeDescription: [''],
      sendedSalesForce: [''],
      insertado: [false],
      error: [false]
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

  onAgencySelect(agency: any, event: Event): void {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;
    
    console.log('Agencia seleccionada:', agency.name, 'ID:', agency.idAgency, 'checked:', input.checked);
    
    if (input.checked) {
      this.selectedAgency = agency.name;
      this.selectedAgencyId = agency.idAgency;
      this.filterForm.patchValue({ idAgency: agency.idAgency }, { emitEvent: false });
      console.log('Agencia guardada en formulario - ID:', this.filterForm.get('idAgency')?.value);
    } else if (this.selectedAgency === agency.name) {
      this.selectedAgency = '';
      this.selectedAgencyId = '';
      this.filterForm.patchValue({ idAgency: '' }, { emitEvent: false });
      console.log('Agencia deseleccionada');
    }
  }

  onFilter(): void {
    const { vin, idAgency, statusDescription,typeDescription, sendedSalesForce, insertado, error } = this.filterForm
      .value as {
      vin?: string;
      idAgency?: string;
      statusDescription?: string;
      typeDescription?: string;
      sendedSalesForce?: string;
      insertado?: boolean;
      error?: boolean;
    };

    const payload = {
      vin,
      idAgency,
      statusDescription,
      typeDescription,
      sendedSalesForce: sendedSalesForce ? (sendedSalesForce as '1' | '0') : undefined,
      insertado,
      error,
    };
    this.filterChange.emit(payload);
  }

  onClearFilters(): void {
    // Resetear el formulario a valores vacíos
    this.selectedAgency = '';
    this.selectedAgencyId = '';
    this.selectedStatus = '';
    this.selectedType = '';
    this.filterForm.reset({
      vin: '',
      idAgency: '',
      statusDescription: '',
      typeDescription: '',
      sendedSalesForce: '',
      insertado: false,
      error: false
    });

    // Emitir filtros vacíos para que la tabla se resetee
    const emptyPayload = {
      vin: undefined,
      idAgency: undefined,
      statusDescription: undefined,
      typeDescription: undefined,
      sendedSalesForce: undefined,
      insertado: false,
      error: false,
    };

    this.filterChange.emit(emptyPayload);
  }

  closeDropdown(event: Event): void {
    const target = event.target as HTMLElement | null;
    if (!target) return;
    const details = target.closest('details.dropdown') as HTMLDetailsElement | null;
    if (details) {
      // Close after the form state settles
      setTimeout(() => {
        details.open = false;
      });
    }
  }

  onSfToggle(value: '1' | '0', event: Event): void {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;
    const current = this.filterForm.get('sendedSalesForce')?.value as string;
    // If unchecking the currently selected value, clear; otherwise set the new value
    const next = input.checked ? value : current === value ? '' : current;
    this.filterForm.patchValue({ sendedSalesForce: next }, { emitEvent: false });
  }

  onInsertToggle(kind: 'insertado' | 'error', event: Event): void {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;
    if (kind === 'insertado' && input.checked) {
      this.filterForm.patchValue({ error: false }, { emitEvent: false });
    }
    if (kind === 'error' && input.checked) {
      this.filterForm.patchValue({ insertado: false }, { emitEvent: false });
    }
  }

  onStatusToggle(statusValue: string, event: Event): void {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;
    
    const current = this.filterForm.get('statusDescription')?.value as string;
    
    if (input.checked) {
      this.selectedStatus = statusValue;
      this.filterForm.patchValue({ statusDescription: statusValue }, { emitEvent: false });
      console.log('Estado seleccionado:', statusValue);
    } else if (current === statusValue) {
      this.selectedStatus = '';
      this.filterForm.patchValue({ statusDescription: '' }, { emitEvent: false });
      console.log('Estado deseleccionado');
    }
  }

  onTypeToggle(typeValue: string, event: Event): void {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;
    
    const current = this.filterForm.get('typeDescription')?.value as string;
    
    if (input.checked) {
      this.selectedType = typeValue;
      this.filterForm.patchValue({ typeDescription: typeValue }, { emitEvent: false });
      console.log('Tipo seleccionado:', typeValue);
    } else if (current === typeValue) {
      this.selectedType = '';
      this.filterForm.patchValue({ typeDescription: '' }, { emitEvent: false });
      console.log('Tipo deseleccionado');
    }
  }

}