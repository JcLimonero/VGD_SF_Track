import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import { MAX_LIST_VALUES, parseValueList } from '../shared/value-list';

export type BulkSearchField = 'order_dms' | 'vin';

/** Lo que devuelve el diálogo al pulsar Buscar. */
export interface BulkSearchRequest {
  field: BulkSearchField;
  /** Nombre que ve el usuario: "pedidos" o "VIN". */
  label: string;
  values: string[];
  duplicates: number;
  /** Agencia elegida para acotar la búsqueda; sin ella se busca en todas. */
  agencyName?: string;
}

/** Datos con los que se abre el diálogo. */
export interface BulkSearchDialogData {
  /** Nombres de agencia disponibles. */
  agencies?: string[];
  /** Agencia que ya estaba elegida en el filtro. */
  agencyName?: string;
}

interface FieldOption {
  field: BulkSearchField;
  label: string;
  placeholder: string;
}

@Component({
  selector: 'vex-bulk-search-dialog',
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './bulk-search-dialog.component.html',
  styleUrl: './bulk-search-dialog.component.scss'
})
export class BulkSearchDialogComponent {
  readonly maxValues = MAX_LIST_VALUES;

  readonly options: FieldOption[] = [
    {
      field: 'order_dms',
      label: 'pedidos',
      placeholder: 'Pega los números de pedido, uno por línea'
    },
    {
      field: 'vin',
      label: 'VIN',
      placeholder: 'Pega los VIN, uno por línea'
    }
  ];

  private readonly data =
    inject<BulkSearchDialogData | null>(MAT_DIALOG_DATA, { optional: true }) ??
    {};

  readonly agencies: string[] = this.data.agencies ?? [];

  field: BulkSearchField = 'order_dms';
  text = '';
  agencyName = this.data.agencyName ?? '';

  constructor(private dialogRef: MatDialogRef<BulkSearchDialogComponent>) {}

  get selected(): FieldOption {
    return this.options.find((o) => o.field === this.field)!;
  }

  get parsed() {
    return parseValueList(this.text, { uppercase: this.field === 'vin' });
  }

  get count(): number {
    return this.parsed.values.length;
  }

  get overLimit(): boolean {
    return this.count > MAX_LIST_VALUES;
  }

  get canSearch(): boolean {
    return this.count > 0 && !this.overLimit;
  }

  selectField(field: BulkSearchField): void {
    this.field = field;
  }

  search(): void {
    if (!this.canSearch) return;
    const { values, duplicates } = this.parsed;
    const request: BulkSearchRequest = {
      field: this.field,
      label: this.selected.label,
      values,
      duplicates
    };
    if (this.agencyName) request.agencyName = this.agencyName;
    this.dialogRef.close(request);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
