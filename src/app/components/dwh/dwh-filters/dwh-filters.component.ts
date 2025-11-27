import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VanguardiaApiService } from '../../../services/vanguardia-api.service';

@Component({
  selector: 'vex-dwh-filters',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './dwh-filters.component.html',
  styleUrl: './dwh-filters.component.scss'
})
export class DwhFiltersComponent implements OnInit {

  @Output() filterChange = new EventEmitter<{
    idAgency?: string;
    type?: string;
  }>();

  /** Emitted when the user requests to download the Excel file */
  @Output() downloadRequested = new EventEmitter<void>();

  /** Parent can pass whether an Excel generation is in progress */
  @Input() isDownloadingExcel = false;

  filterForm: FormGroup;
  agencies: any[] = [];
  selectedAgency: string = ''; // Nombre mostrado en UI
  selectedAgencyId: string = ''; // ID para enviar a la API
  selectedType: string = ''; // Tipo seleccionado

  constructor(private fb: FormBuilder, private vanguardiaApi: VanguardiaApiService) {
    this.filterForm = this.fb.group({
      idAgency: [''],
      type: ['']
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
    const { idAgency, type } = this.filterForm
      .value as {
      idAgency?: string;
      type?: string;
    };

    const payload = {
      idAgency,
      type,
    };
    this.filterChange.emit(payload);
  }

  onClearFilters(): void {
    // Resetear el formulario a valores vacíos
    this.selectedAgency = '';
    this.selectedAgencyId = '';
    this.selectedType = '';
    this.filterForm.reset({
      idAgency: '',
      type: ''
    });

    // Emitir filtros vacíos para que la tabla se resetee
    const emptyPayload = {
      idAgency: undefined,
      type: undefined
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

  onTypeToggle(typeValue: string, event: Event): void {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;
    
    const current = this.filterForm.get('type')?.value as string;
    
    if (input.checked) {
      this.selectedType = typeValue;
      this.filterForm.patchValue({ type: typeValue }, { emitEvent: false });
      console.log('Tipo DWH seleccionado:', typeValue);
    } else if (current === typeValue) {
      this.selectedType = '';
      this.filterForm.patchValue({ type: '' }, { emitEvent: false });
      console.log('Tipo DWH deseleccionado');
    }
  }
}
