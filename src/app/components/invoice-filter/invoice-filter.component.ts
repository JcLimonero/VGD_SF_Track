import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'vex-invoice-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './invoice-filter.component.html',
  styleUrl: './invoice-filter.component.scss'
})
export class InvoiceFilterComponent {

  @Output() filterChange = new EventEmitter<{
    order_dms?: string;
    vin?: string;
    reference?: string;
    sendedSalesForce?: '1' | '0';
    insertado?: boolean;
    error?: boolean;
  }>();

  filterForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      order_dms: [''],
      vin: [''],
      reference: [''],
      sendedSalesForce: [''],
      insertado: [false],
      error: [false]
    });
  }

  onFilter(): void {
    const { order_dms, vin, reference, sendedSalesForce, insertado, error } = this.filterForm
      .value as {
      order_dms?: string;
      vin?: string;
      reference?: string;
      sendedSalesForce?: string;
      insertado?: boolean;
      error?: boolean;
    };

    const payload = {
      order_dms,
      vin,
      reference,
      sendedSalesForce: sendedSalesForce ? (sendedSalesForce as '1' | '0') : undefined,
      insertado,
      error,
    };

    console.log('InvoiceFilter -> onFilter(), emitiendo:', payload);
    this.filterChange.emit(payload);

    // Limpiar todos los campos después de enviar el filtro
    this.filterForm.reset({
      order_dms: '',
      vin: '',
      reference: '',
      sendedSalesForce: '',
      insertado: false,
      error: false
    });
  }

  onClearFilters(): void {
    // Resetear el formulario a valores vacíos
    this.filterForm.reset({
      order_dms: '',
      vin: '',
      reference: '',
      sendedSalesForce: '',
      insertado: false,
      error: false
    });

    // Emitir filtros vacíos para que la tabla se resetee
    const emptyPayload = {
      order_dms: undefined,
      vin: undefined,
      reference: undefined,
      sendedSalesForce: undefined,
      insertado: false,
      error: false,
    };

    console.log('InvoiceFilter -> onClearFilters(), emitiendo filtros vacíos:', emptyPayload);
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
