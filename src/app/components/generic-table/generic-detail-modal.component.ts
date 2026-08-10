import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import { humanizeFieldName } from './dynamic-columns.util';

interface DetailEntry {
  label: string;
  value: any;
}

/**
 * Modal de detalles que recorre los campos del registro en lugar de tener una
 * lista fija de campos.
 *
 * Se usa en los módulos cuyo esquema no coincide con el de facturas (Crabi,
 * Integración SF y Honda SF), donde el modal por defecto mostraría campos
 * vacíos.
 */
@Component({
    selector: 'vex-generic-detail-modal',
    imports: [CommonModule, MatDialogModule, MatButtonModule],
    template: `
    <h2 mat-dialog-title class="title text-xl">{{ title }}</h2>

    <mat-dialog-content>
      <div class="detail-list">
        <div class="detail-row" *ngFor="let entry of entries">
          <strong>{{ entry.label }}:</strong> {{ entry.value }}
        </div>
        <p *ngIf="entries.length === 0" class="empty">
          No hay información para mostrar.
        </p>
      </div>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button (click)="onClose()">Cerrar</button>
    </mat-dialog-actions>
  `,
    styles: [
        `
      .title {
        text-decoration: underline;
        text-decoration-color: #ff5c20;
        text-decoration-thickness: 3px;
        align-self: center;
      }

      .detail-list {
        display: flex;
        flex-direction: column;
      }

      .detail-row {
        border-bottom: 1px solid #e0e0e0;
        padding: 4px 0;
        word-break: break-word;
      }

      .detail-row:last-child {
        border-bottom: none;
      }

      .detail-row strong {
        color: #1b1a1aff;
        margin-right: 8px;
      }

      .empty {
        color: #848484;
      }

      /*
       * Único contenedor con scroll del modal, y en alto relativo.
       *
       * Antes la lista tenía su propio max-height de 400px dentro de este, así
       * que mandaba el más chico de los dos y sobraba espacio alrededor: de los
       * 29 campos de Clientes se veían 12 a la vez. En vh el modal aprovecha la
       * pantalla que haya en vez de un alto fijo.
       */
      mat-dialog-content {
        max-height: 70vh;
        overflow-y: auto;
      }
    `
    ]
})
export class GenericDetailModalComponent {
  title = 'Detalles del registro';
  entries: DetailEntry[] = [];

  constructor(
    public dialogRef: MatDialogRef<GenericDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // `vex-generic-table` envía { row, labels, exclude }; también se acepta el
    // registro directo por si el modal se abre desde otro lugar. Se distingue
    // por la presencia de la llave `row`, no por su valor: un `row` nulo es
    // válido y no debe hacer que se listen los campos del propio envoltorio.
    const isWrapped = !!data && typeof data === 'object' && 'row' in data;
    const row = isWrapped ? data.row : data;
    const labels = (isWrapped ? data.labels : null) ?? {};
    const exclude = (isWrapped ? data.exclude : null) ?? [];
    const valueLabels = (isWrapped ? data.valueLabels : null) ?? {};
    this.entries = this.buildEntries(row, labels, exclude, valueLabels);
  }

  /**
   * `exclude` deja fuera campos que sí vienen en el registro. Se usa para los
   * que no se leen bien en una lista de renglones —un JSON completo, por
   * ejemplo—, que se muestran aparte en su propio modal.
   */
  private buildEntries(
    row: any,
    labels: Record<string, string>,
    exclude: string[],
    valueLabels: Record<string, Record<string, string>>
  ): DetailEntry[] {
    if (!row || typeof row !== 'object') return [];

    return Object.entries(row)
      .filter(([field]) => !exclude.includes(field))
      .map(([field, value]) => ({
        label: labels[field] ?? humanizeFieldName(field),
        value: this.formatValue(value, valueLabels[field])
      }));
  }

  /**
   * `valueLabels` traduce los valores codificados de un campo, para que el
   * detalle no muestre el número que llega de la API. Solo se aplica a los
   * valores declarados: uno que no esté en el mapa se muestra tal cual, que es
   * preferible a esconderlo detrás de una etiqueta equivocada.
   *
   * Un campo vacío es 'N/A' antes de traducir: `valueLabels` nombra valores
   * reales, no la ausencia de valor.
   */
  private formatValue(
    value: any,
    valueLabels?: Record<string, string>
  ): string {
    if (value === null || value === undefined || value === '') return 'N/A';
    if (typeof value === 'object') return JSON.stringify(value);

    const raw = String(value);
    return valueLabels?.[raw] ?? raw;
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
