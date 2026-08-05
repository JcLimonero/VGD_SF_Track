import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'integration-customer-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './customer-filter.component.html',
  styleUrl: './customer-filter.component.scss'
})
export class IntegrationCustomerFilterComponent {
  @Output() filterChange = new EventEmitter<{
    customer_id?: string;
    dealer_id?: string;
    is_sent?: '1' | '0';
  }>();

  @Output() downloadRequested = new EventEmitter<void>();
  @Input() isDownloadingExcel = false;

  filterForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      customer_id: [''],
      dealer_id: [''],
      is_sent: ['']
    });
  }

  onFilter(): void {
    const { customer_id, dealer_id, is_sent } = this.filterForm.value as {
      customer_id?: string;
      dealer_id?: string;
      is_sent?: string;
    };

    this.filterChange.emit({
      customer_id,
      dealer_id,
      is_sent: is_sent ? (is_sent as '1' | '0') : undefined
    });
  }

  onClearFilters(): void {
    this.filterForm.reset({
      customer_id: '',
      dealer_id: '',
      is_sent: ''
    });

    this.filterChange.emit({
      customer_id: undefined,
      dealer_id: undefined,
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
