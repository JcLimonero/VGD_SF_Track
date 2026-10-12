import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Subscription, from, of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import * as XLSX from 'xlsx';
import { VanguardiaApiService } from '../../services/vanguardia-api.service';
import { NotificationService } from '../../services/notification.service';
import {
  canOpenSalesForce,
  openInSalesForce,
  resendPayload,
  salesForceStatus,
  wasSentToSalesForce
} from '../shared/salesforce-link';
import {
  DemoResult,
  DemoValidationRow,
  MAX_VINS,
  RESULT_LABELS,
  classifyVin,
  errorRow,
  parseVins
} from './demo-validation.util';

/** Consultas simultáneas a la API, para no saturarla con listas largas. */
const CONCURRENCY = 5;

@Component({
  selector: 'vex-demo-validation',
  imports: [CommonModule, FormsModule],
  templateUrl: './demo-validation.component.html',
  styleUrls: ['./demo-validation.component.scss']
})
export class DemoValidationComponent implements OnDestroy {
  readonly maxVins = MAX_VINS;
  readonly labels = RESULT_LABELS;
  readonly resultOptions: DemoResult[] = [
    'demo',
    'not_demo',
    'not_found',
    'error'
  ];

  text = '';
  rows: DemoValidationRow[] = [];
  resultFilter: DemoResult | 'all' = 'all';

  running = false;
  /** VIN de la corrida actual, en el orden en que se capturaron. */
  private runVins: string[] = [];
  private pending = 0;
  duplicatesRemoved = 0;

  private sub?: Subscription;

  constructor(
    private api: VanguardiaApiService,
    private notify: NotificationService
  ) {}

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  get vinCount(): number {
    return parseVins(this.text).vins.length;
  }

  get overLimit(): boolean {
    return this.vinCount > MAX_VINS;
  }

  get progress(): { done: number; total: number } {
    return { done: this.runVins.length - this.pending, total: this.runVins.length };
  }

  get filteredRows(): DemoValidationRow[] {
    return this.resultFilter === 'all'
      ? this.rows
      : this.rows.filter((row) => row.result === this.resultFilter);
  }

  count(result: DemoResult): number {
    return this.rows.filter((row) => row.result === result).length;
  }

  validate(): void {
    const { vins, duplicates } = parseVins(this.text);
    if (vins.length === 0) {
      this.notify.warning('Captura al menos un VIN.');
      return;
    }
    if (vins.length > MAX_VINS) {
      this.notify.error(
        `Son ${vins.length} VIN y el máximo por corrida es ${MAX_VINS}. Divide la lista.`
      );
      return;
    }

    this.sub?.unsubscribe();
    this.runVins = vins;
    this.duplicatesRemoved = duplicates;
    this.rows = [];
    this.resultFilter = 'all';
    this.pending = vins.length;
    this.running = true;

    this.sub = this.query(vins).subscribe({
      next: (row) => {
        this.pending--;
        this.place(row);
      },
      complete: () => (this.running = false)
    });
  }

  /** Vuelve a consultar un solo VIN que falló. */
  retry(row: DemoValidationRow): void {
    this.query([row.vin]).subscribe((fresh) => this.place(fresh));
  }

  canOpenSf = canOpenSalesForce;
  openSf = openInSalesForce;
  sfStatus = salesForceStatus;
  wasSent = wasSentToSalesForce;

  /** VIN cuyo reenvío está en curso, para no repetir el clic. */
  resending = new Set<string>();

  /**
   * Solo se reenvía lo que viajó mal: se envió y Salesforce lo rechazó.
   * Lo que aún no se envía ya está en cola, y lo exitoso no necesita reenvío.
   */
  canResend(row: DemoValidationRow): boolean {
    return (
      !!row.raw?.id &&
      wasSentToSalesForce(row) &&
      salesForceStatus(row) === 'error' &&
      !this.resending.has(row.vin)
    );
  }

  /** Marca la unidad para que vuelva a viajar a Salesforce y refresca su fila. */
  resend(row: DemoValidationRow): void {
    if (!this.canResend(row)) return;

    this.resending.add(row.vin);
    this.api.updateInventory(row.raw.id, resendPayload(row.raw)).subscribe({
      next: () => {
        this.notify.success(
          `Vehículo ${row.vin} marcado para reenvío a Salesforce`
        );
        this.resending.delete(row.vin);
        this.query([row.vin]).subscribe((fresh) => this.place(fresh));
      },
      error: (error) => {
        this.resending.delete(row.vin);
        this.notify.error(
          `Error al actualizar: ${error.error?.message || 'Error desconocido'}`
        );
      }
    });
  }

  clear(): void {
    this.sub?.unsubscribe();
    this.text = '';
    this.rows = [];
    this.runVins = [];
    this.pending = 0;
    this.duplicatesRemoved = 0;
    this.resultFilter = 'all';
    this.running = false;
  }

  downloadExcel(): void {
    if (this.rows.length === 0) return;

    const sheetRows = this.rows.map((row) => ({
      VIN: row.vin,
      Resultado: RESULT_LABELS[row.result],
      Tipo: row.typeDescription,
      Estado: row.statusDescription,
      Agencia: row.agencyName,
      Marca: row.brand,
      Modelo: row.model,
      Año: row.year,
      'Enviado a SF': row.raw ? (wasSentToSalesForce(row) ? 'Sí' : 'No') : '',
      'Estado SF': row.raw ? this.statusLabel(row) : '',
      'Resultado SF': row.resultSF,
      'ID Salesforce': row.idSalesForce
    }));
    const worksheet = XLSX.utils.json_to_sheet(sheetRows);
    worksheet['!cols'] = Object.keys(sheetRows[0]).map(() => ({ wch: 20 }));
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Validación demos');

    const stamp = new Date().toISOString().slice(0, 19).replace(/[:-]/g, '');
    XLSX.writeFile(workbook, `validacion_demos_${stamp}.xlsx`);
  }

  statusLabel(row: DemoValidationRow): string {
    return {
      success: 'Insertado correctamente',
      warning: 'Pendiente de envío',
      error: 'Error en Salesforce'
    }[salesForceStatus(row)];
  }

  private query(vins: string[]) {
    return from(vins).pipe(
      mergeMap(
        (vin) =>
          this.api.getInventory({ vin, perpage: 5 }).pipe(
            map((res) => classifyVin(vin, res.items)),
            catchError(() => of(errorRow(vin)))
          ),
        CONCURRENCY
      )
    );
  }

  /** Inserta o reemplaza la fila y mantiene el orden de captura. */
  private place(row: DemoValidationRow): void {
    const rest = this.rows.filter((r) => r.vin !== row.vin);
    this.rows = [...rest, row].sort(
      (a, b) => this.runVins.indexOf(a.vin) - this.runVins.indexOf(b.vin)
    );
  }
}
