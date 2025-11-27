import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VanguardiaApiService } from '../../../services/vanguardia-api.service';

@Component({
  selector: 'vex-customer-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customer-filter.component.html',
  styleUrl: './customer-filter.component.scss'
})
export class CustomerFilterComponent {

  @Output() filterChange = new EventEmitter<{
    idAgency?: string;
    mail?: string;
    mobile_phone?: string;
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

  constructor(private fb: FormBuilder, private vanguardiaApi: VanguardiaApiService) {
    this.filterForm = this.fb.group({
      idAgency: [''],
      mail: [''],
      mobile_phone: [''],
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
        
    if (input.checked) {
      this.selectedAgency = agency.name;
      this.selectedAgencyId = agency.idAgency;
      this.filterForm.patchValue({ idAgency: agency.idAgency }, { emitEvent: false });
    } else if (this.selectedAgency === agency.name) {
      this.selectedAgency = '';
      this.selectedAgencyId = '';
      this.filterForm.patchValue({ idAgency: '' }, { emitEvent: false });
    }
  }

  onFilter(): void {
    const { idAgency, mail, mobile_phone, sendedSalesForce, insertado, error } = this.filterForm
      .value as {
      idAgency?: string;
      mail?: string;
      mobile_phone?: string;
      sendedSalesForce?: string;
      insertado?: boolean;
      error?: boolean;
    };

    const payload = {
      idAgency,
      mail,
      mobile_phone,
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
    this.filterForm.reset({
      idAgency: '',
      mail: '',
      mobile_phone: '',
      sendedSalesForce: '',
      insertado: false,
      error: false
    });

    // Emitir filtros vacíos para que la tabla se resetee
    const emptyPayload = {
      idAgency: undefined,
      mail: undefined,
      mobile_phone: undefined,
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
}
