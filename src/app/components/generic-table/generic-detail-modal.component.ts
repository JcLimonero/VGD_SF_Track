import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { humanizeFieldName } from './dynamic-columns.util';

interface DetailEntry {
  /** Nombre del campo en el registro */
  field: string;
  label: string;
  value: any;
}

/**
 * Botón que el módulo puede poner junto a un campo del detalle, solo cuando el
 * valor lo amerita (por ejemplo "Reenviar VIN" junto a un Resultado SF que dice
 * que el VIN no existe en Salesforce).
 */
export interface DetailAction {
  /** Campo del registro junto al que aparece el botón */
  field: string;
  label: string;
  /** El botón sale solo si esto devuelve true (valor crudo del campo y registro) */
  when: (value: unknown, row: any) => boolean;
  /**
   * Hace la acción. Si falla, el error debe llevar un `message` legible: es lo
   * que se muestra junto al botón.
   */
  run: (row: any) => Observable<unknown>;
  /** Texto del botón una vez hecha la acción */
  doneLabel?: string;
}

type ActionState = { status: 'idle' | 'running' | 'done' | 'error'; message?: string };

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
          <div class="detail-action" *ngFor="let action of actionsFor(entry)">
            <button
              type="button"
              class="detail-action-btn"
              [disabled]="state(action).status === 'running' || state(action).status === 'done'"
              (click)="runAction(action)"
            >
              {{
                state(action).status === 'running'
                  ? 'Reenviando...'
                  : state(action).status === 'done'
                    ? action.doneLabel || 'Listo'
                    : action.label
              }}
            </button>
            <span class="detail-action-error" *ngIf="state(action).status === 'error'">
              {{ state(action).message }}
            </span>
          </div>
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
        text-decoration-color: #1a1a1a;
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

      .detail-action {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
        margin-top: 6px;
      }

      .detail-action-btn {
        height: 30px;
        padding: 0 12px;
        border: 1px solid #1a1a1a;
        background: #fff;
        color: #1a1a1a;
        font-family: inherit;
        font-size: 12px;
        font-weight: 600;
        cursor: pointer;
      }

      .detail-action-btn:hover:not(:disabled) {
        background: #f1f3f5;
      }

      .detail-action-btn:disabled {
        opacity: 0.55;
        cursor: not-allowed;
      }

      .detail-action-error {
        font-size: 12px;
        color: #c92a2a;
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
  private row: any = null;
  private actions: DetailAction[] = [];
  private actionStates = new Map<DetailAction, ActionState>();

  constructor(
    public dialogRef: MatDialogRef<GenericDetailModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // `vex-generic-table` envía { row, labels, exclude, title }; también se
    // acepta el registro directo por si el modal se abre desde otro lugar. Se
    // distingue por la presencia de la llave `row`, no por su valor: un `row`
    // nulo es válido y no debe hacer que se listen los campos del envoltorio.
    const isWrapped = !!data && typeof data === 'object' && 'row' in data;
    const row = isWrapped ? data.row : data;
    this.row = row;
    this.actions = (isWrapped ? data.actions : null) ?? [];
    const labels = (isWrapped ? data.labels : null) ?? {};
    const exclude = (isWrapped ? data.exclude : null) ?? [];
    const valueLabels = (isWrapped ? data.valueLabels : null) ?? {};
    // Cada modulo nombra su entidad; sin titulo propio se queda el generico
    this.title = (isWrapped ? data.title : null) || this.title;
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
        field,
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

  /** Acciones que aplican a este campo con el valor que trae el registro. */
  actionsFor(entry: DetailEntry): DetailAction[] {
    return this.actions.filter(
      (action) =>
        action.field === entry.field &&
        action.when(this.row?.[entry.field], this.row)
    );
  }

  state(action: DetailAction): ActionState {
    return this.actionStates.get(action) ?? { status: 'idle' };
  }

  runAction(action: DetailAction): void {
    const current = this.state(action).status;
    if (current === 'running' || current === 'done') return;

    this.actionStates.set(action, { status: 'running' });
    action.run(this.row).subscribe({
      next: () => this.actionStates.set(action, { status: 'done' }),
      error: (error: unknown) =>
        this.actionStates.set(action, {
          status: 'error',
          message:
            (error as Error)?.message || 'No se pudo completar la acción'
        })
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
