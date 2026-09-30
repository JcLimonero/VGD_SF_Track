import { Component, EventEmitter, Output, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { VanguardiaApiService } from '../../../services/vanguardia-api.service';

@Component({
  selector: 'vex-leads-filter',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './leads-filter.component.html',
  styleUrl: './leads-filter.component.scss'
})
export class LeadsFilterComponent implements OnInit {
  @Output() filterChange = new EventEmitter<{
    idAgency?: string;
    LeadNo?: string;
    FullName?: string;
    sendedSalesForce?: '1' | '0';
    insertado?: boolean;
    error?: boolean;
  }>();

  @Output() downloadRequested = new EventEmitter<void>();

  @Input() isDownloadingExcel = false;

  filterForm: FormGroup;
  agencies: any[] = [];

  /** Texto del buscador del menú de agencias */
  agencyQuery = '';

  /** Agencias cuyo nombre coincide con el buscador (sin mayúsculas ni acentos). */
  get filteredAgencies(): any[] {
    const query = this.normalizeText(this.agencyQuery);
    if (!query) return this.agencies;
    return this.agencies.filter((agency) =>
      this.normalizeText(agency?.name).includes(query)
    );
  }

  /** Al cerrar el menú de agencias se limpia el buscador. */
  onAgencyMenuToggle(event: Event): void {
    const details = event.target as HTMLDetailsElement | null;
    if (details && !details.open) {
      this.agencyQuery = '';
    }
  }

  private normalizeText(value: unknown): string {
    return String(value ?? '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .trim();
  }
  selectedAgency: string = '';
  selectedAgencyId: string = '';

  constructor(
    private fb: FormBuilder,
    private vanguardiaApi: VanguardiaApiService
  ) {
    this.filterForm = this.fb.group({
      LeadNo: [''],
      FullName: [''],
      idAgency: [''],
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

  onAgencySelect(agency: any): void {
    if (this.selectedAgency === agency.name) {
      this.selectedAgency = '';
      this.selectedAgencyId = '';
      this.filterForm.patchValue({ idAgency: '' }, { emitEvent: false });
    } else {
      this.selectedAgency = agency.name;
      this.selectedAgencyId = agency.idAgency;
      this.filterForm.patchValue(
        { idAgency: agency.idAgency },
        { emitEvent: false }
      );
    }
    this.onFilter();
  }

  onFilter(): void {
    const { LeadNo, FullName, idAgency, sendedSalesForce, insertado, error } =
      this.filterForm.value as {
        LeadNo?: string;
        FullName?: string;
        idAgency?: string;
        sendedSalesForce?: string;
        insertado?: boolean;
        error?: boolean;
      };

    const payload = {
      LeadNo,
      FullName,
      idAgency,
      sendedSalesForce: sendedSalesForce
        ? (sendedSalesForce as '1' | '0')
        : undefined,
      insertado,
      error
    };
    this.filterChange.emit(payload);
  }

  onClearFilters(): void {
    this.selectedAgency = '';
    this.selectedAgencyId = '';
    this.filterForm.reset({
      LeadNo: '',
      FullName: '',
      idAgency: '',
      sendedSalesForce: '',
      insertado: false,
      error: false
    });

    const emptyPayload = {
      LeadNo: undefined,
      FullName: undefined,
      idAgency: undefined,
      sendedSalesForce: undefined,
      insertado: false,
      error: false
    };

    this.filterChange.emit(emptyPayload);
  }

  closeDropdown(event: Event): void {
    const target = event.target as HTMLElement | null;
    if (!target) return;
    const details = target.closest(
      'details.dropdown'
    ) as HTMLDetailsElement | null;
    if (details) {
      setTimeout(() => {
        details.open = false;
      });
    }
  }

  onSfToggle(value: '1' | '0', event: Event): void {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;
    const current = this.filterForm.get('sendedSalesForce')?.value as string;
    const next = input.checked ? value : current === value ? '' : current;
    this.filterForm.patchValue(
      { sendedSalesForce: next },
      { emitEvent: false }
    );
    this.onFilter();
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
    this.onFilter();
  }
}
