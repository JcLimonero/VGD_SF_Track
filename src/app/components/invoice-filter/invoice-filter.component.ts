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

  @Output() filterChange = new EventEmitter<{ order_dms?: string; vin?: string; reference?: string }>();

  filterForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.filterForm = this.fb.group({
      order_dms: [''],
      vin: [''],
      reference: ['']
    });
  }

  onFilter(): void {
    const filters = this.filterForm.value;
    this.filterChange.emit(filters);
  }

}
