import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'integration-sales-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sales-filter.component.html',
  styleUrl: './sales-filter.component.scss'
})
export class IntegrationSalesFilterComponent {
  @Output() filterChange = new EventEmitter<{
    customer_id?: string;
    dealer_id?: string;
    vin?: string;
    is_sent?: '1' | '0';
  }>();

  @Output() downloadRequested = new EventEmitter<void>();
  @Input() isDownloadingExcel = false;

  filterForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      customer_id: [''],
      dealer_id: [''],
      vin: [''],
      is_sent: ['']
    });
  }

  onFilter(): void {
    const { customer_id, dealer_id, vin, is_sent } = this.filterForm.value as {
      customer_id?: string;
      dealer_id?: string;
      vin?: string;
      is_sent?: string;
    };

    this.filterChange.emit({
      customer_id,
      dealer_id,
      vin,
      is_sent: is_sent ? (is_sent as '1' | '0') : undefined
    });
  }

  onClearFilters(): void {
    this.filterForm.reset({
      customer_id: '',
      dealer_id: '',
      vin: '',
      is_sent: ''
    });

    this.filterChange.emit({
      customer_id: undefined,
      dealer_id: undefined,
      vin: undefined,
      is_sent: undefined
    });
  }

  onSentToggle(value: '1' | '0', event: Event): void {
    const input = event.target as HTMLInputElement | null;
    if (!input) return;

    const current = this.filterForm.get('is_sent')?.value as string;
    const next = input.checked ? value : current === value ? '' : current;
    this.filterForm.patchValue({ is_sent: next }, { emitEvent: false });
  }

  closeDropdown(event: Event): void {
    const target = event.target as HTMLElement | null;
    if (!target) return;
    const details = target.closest('details.dropdown') as HTMLDetailsElement | null;
    if (details) {
      setTimeout(() => {
        details.open = false;
      });
    }
  }

}
