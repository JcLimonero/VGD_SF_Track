// COPIADO EXACTO de invoice-table con server-side pagination
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from '../../generic-table/generic-table.component';
import { VanguardiaApiService } from '../../../services/vanguardia-api.service';
import { NotificationService } from '../../../services/notification.service';
import { TableColumn } from '../../../../@vex/interfaces/table-column.interface';
import { forkJoin, from, of } from 'rxjs';
import { catchError, map, mergeMap, switchMap } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../confirm-dialog/confirm-dialog.component';
import * as XLSX from 'xlsx';
import { resendPayload } from '../../shared/salesforce-link';

/** Máximo de unidades que "Reenviar todos" procesa de una vez. */
const MAX_RESEND_ALL = 1000;

/** Escrituras simultáneas a la API en "Reenviar todos". */
const RESEND_CONCURRENCY = 5;

@Component({
  selector: 'vex-inventory-table',
  imports: [CommonModule, GenericTableComponent],
  templateUrl: './inventory-table.component.html',
  styleUrls: ['./inventory-table.component.scss']
})
export class InventoryTableComponent implements OnInit {
  data: any[] = [];
  loading = false;
  error: string | null = null;
  total: number | null = null;

  // Paginación - respetando el default de la API
  pageIndex = 0;
  defaultPageSize = 10;
  currentPageSize = 10;

  // Filtros activos
  currentFilters: {
    vin?: string;
    idAgency?: string;
    statusDescription?: string;
    typeDescription?: string;
    sendedSalesForce?: '1' | '0';
    insertado?: boolean;
    error?: boolean;
  } = {};
  isDownloadingExcel = false;
  currentSort: { column: string; direction: 'asc' | 'desc' } | null = {
    column: 'timestamp_sales_force',
    direction: 'desc'
  };

  // Columnas para inventario
  columns: TableColumn<any>[] = [
    { property: 'agencyName', label: 'Agencia', type: 'text' },
    { property: 'vin', label: 'VIN', type: 'text' },
    { property: 'statusDescription', label: 'Estado', type: 'text' },
    { property: 'typeDescription', label: 'Tipo', type: 'text' },
    { property: 'brand', label: 'Marca', type: 'text' },
    { property: 'year', label: 'Año', type: 'text' },
    { property: 'model', label: 'Modelo', type: 'text' },
    { property: 'sendedSalesForce', label: 'Envio SF', type: 'text' },
    { property: 'timestamp_sales_force', label: 'Fecha SF', type: 'text' },
    { property: 'resultSF', label: 'Estado SF', type: 'text' },
    { property: 'sf_jsonRequest', label: 'Datos', type: 'button' },
    { property: 'sf_link', label: 'Ver SF', type: 'button' },
    { property: 'resend', label: 'Reenviar', type: 'button' },
    { property: 'actions', label: 'Detalles', type: 'button' }
  ];

  displayedColumns: string[] = [
    'agencyName',
    'vin',
    'statusDescription',
    'typeDescription',
    'brand',
    'year',
    'model',
    'sendedSalesForce',
    'timestamp_sales_force',
    'resultSF',
    'sf_jsonRequest',
    'sf_link',
    'resend',
    'actions'
  ];

  get hasActiveFilters(): boolean {
    return !!(
      this.currentFilters.vin ||
      this.currentFilters.idAgency ||
      this.currentFilters.statusDescription ||
      this.currentFilters.typeDescription ||
      this.currentFilters.sendedSalesForce ||
      this.currentFilters.insertado ||
      this.currentFilters.error
    );
  }

  constructor(
    private vanguardiaApi: VanguardiaApiService,
    private notifications: NotificationService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadPage(this.pageIndex, this.defaultPageSize);
  }

  /**
   * Carga los datos desde la API con server-side pagination
   */
  loadPage(pageIndex: number, pageSize: number): void {
    this.currentPageSize = pageSize;
    this.loading = true;
    this.error = null;

    // Server-side pagination - igual que invoice-table
    const params: any = {
      page: pageIndex + 1, // API usa 1-indexed
      perpage: pageSize // Tamaño de página
    };

    // Map current filters to params
    if (this.currentFilters.vin) params.vin = this.currentFilters.vin;
    if (this.currentFilters.idAgency)
      params.idAgency = this.currentFilters.idAgency;
    if (this.currentFilters.statusDescription)
      params.statusDescription = this.currentFilters.statusDescription;
    if (this.currentFilters.typeDescription)
      params.typeDescription = this.currentFilters.typeDescription;
    if (this.currentFilters.sendedSalesForce)
      params.sendedSalesForce = this.currentFilters.sendedSalesForce;
    if (this.currentFilters.insertado && !this.currentFilters.error)
      params.insertCorrect = '1';
    if (this.currentFilters.error && !this.currentFilters.insertado)
      params.insertCorrect = '0';

    // Agregar ordenamiento si existe
    if (this.currentSort && this.currentSort.column) {
      params.orderby = this.currentSort.column;
      params.ordertype = this.currentSort.direction;
    }

    // Usar getInventory con parámetros (server-side pagination)
    this.vanguardiaApi.getInventory(params).subscribe({
      next: (res) => {
        this.data = res.items || [];
        this.total = res.total || 0;
        this.pageIndex = pageIndex;
        this.loading = false;
      },
      error: (error) => {
        this.error =
          'No se pudo cargar la información. Por favor, intenta de nuevo.';
        this.data = [];
        this.total = 0;
        this.loading = false;
      }
    });
  }

  /**
   * Maneja el cambio de página desde generic-table
   */
  onPageChanged(event: { pageIndex: number; pageSize: number }): void {
    this.currentPageSize = event.pageSize; // Actualizar pageSize actual
    this.loadPage(event.pageIndex, event.pageSize);
  }

  applyFilter(filters: {
    vin?: string;
    idAgency?: string;
    statusDescription?: string;
    typeDescription?: string;
    sendedSalesForce?: '1' | '0';
    insertado?: boolean;
    error?: boolean;
  }): void {
    // Guardar filtros y reiniciar a primera página
    this.currentFilters = { ...filters };
    this.pageIndex = 0;
    this.loadPage(this.pageIndex, this.currentPageSize);
  }

  /**
   * Maneja el cambio de ordenamiento
   */
  onSortChange(
    sort: { column: string; direction: 'asc' | 'desc' } | null
  ): void {
    if (!sort || !sort.column) {
      this.currentSort = null;
    } else {
      this.currentSort = sort;
    }
    this.pageIndex = 0;
    this.loadPage(this.pageIndex, this.currentPageSize);
  }

  /**
   * Reenvía el registro a Salesforce actualizando sendedSalesForce a 0
   */
  resendToSalesForce(row: any): void {
    if (!row.id) {
      this.notifications.error('No se encontró el ID del registro');
      return;
    }

    this.vanguardiaApi.updateInventory(row.id, resendPayload(row)).subscribe({
      next: (response) => {
        this.notifications.success(
          `Vehículo ${row.vin} marcado para reenvío a Salesforce`
        );
        this.loadPage(this.pageIndex, this.currentPageSize);
      },
      error: (error) => {
        this.notifications.error(
          `Error al actualizar: ${error.error?.message || 'Error desconocido'}`
        );
      }
    });
  }

  /**
   * Descarga los datos actuales en formato Excel - TODOS los registros con filtros aplicados
   */
  downloadExcel(): void {
    if (!this.total || this.total === 0) {
      console.warn('No hay datos de inventario para descargar');
      return;
    }

    this.isDownloadingExcel = true;

    // Calcular cuántas páginas necesitamos (asumiendo límite de 100 por página)
    const maxPerPage = 100;
    const totalPages = Math.ceil(this.total / maxPerPage);

    console.log(
      `📥 Descargando ${this.total} registros de inventario en ${totalPages} páginas`
    );

    // Preparar parámetros base
    const baseParams: any = {
      perpage: maxPerPage
    };

    // Aplicar los mismos filtros que están actualmente activos
    if (this.currentFilters.vin) baseParams.vin = this.currentFilters.vin;
    if (this.currentFilters.idAgency)
      baseParams.idAgency = this.currentFilters.idAgency;
    if (this.currentFilters.statusDescription)
      baseParams.statusDescription = this.currentFilters.statusDescription;
    if (this.currentFilters.typeDescription)
      baseParams.typeDescription = this.currentFilters.typeDescription;
    if (this.currentFilters.sendedSalesForce)
      baseParams.sendedSalesForce = this.currentFilters.sendedSalesForce;
    if (this.currentFilters.insertado && !this.currentFilters.error)
      baseParams.insertCorrect = '1';
    if (this.currentFilters.error && !this.currentFilters.insertado)
      baseParams.insertCorrect = '0';

    // Crear array de observables para todas las páginas
    const pageRequests = [];
    for (let page = 1; page <= totalPages; page++) {
      const params = { ...baseParams, page };
      pageRequests.push(this.vanguardiaApi.getInventory(params));
    }

    // Ejecutar todas las peticiones en paralelo
    forkJoin(pageRequests).subscribe({
      next: (responses) => {
        try {
          // Combinar todos los resultados
          const allData: any[] = [];
          responses.forEach((response) => {
            allData.push(...response.items);
          });

          console.log(
            `Datos de inventario obtenidos para Excel: ${allData.length} registros de ${this.total} esperados`
          );

          // Preparar los datos para Excel con TODOS los campos disponibles
          const excelData = allData.map((item) => ({
            // Campos básicos de identificación
            Agencia: item.agencyName || '',
            VIN: item.vin || '',
            'Estado:': item.statusDescription || '',
            Tipo: item.typeDescription || '',
            Marca: item.brand || '',
            Año: item.year || '',
            Modelo: item.model || '',
            Versión: item.version || '',

            // Información adicional del inventario
            Estado: item.state || '',
            'Color interior': item.interior_color || '',
            'Color exterior': item.exterior_color || '',
            Cantidad: item.amount || '',
            Kilometraje: item.km || '',

            // Información de Salesforce
            'Enviado a SF': item.sendedSalesForce === '1' ? 'Sí' : 'No',
            'ID Salesforce': item.idSalesForce || '',
            'Resultado SF': item.resultSF || '',
            'Insertado Correctamente': item.insertCorrect === '1' ? 'Sí' : 'No',

            // Timestamps
            'Timestamp DMS': item.timestamp_dms || '',
            Timestamp: item.timestamp || '',
            'Timestamp SalesForce': item.timestamp_sales_force || ''
          }));

          // Crear libro de Excel
          const worksheet = XLSX.utils.json_to_sheet(excelData);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, 'Inventario');

          // Configurar el ancho de las columnas
          const columnWidths =
            excelData.length > 0
              ? Object.keys(excelData[0]).map(() => ({ wch: 15 }))
              : [];
          worksheet['!cols'] = columnWidths;

          // Generar nombre del archivo con timestamp y total de registros
          const now = new Date();
          const timestamp = now.toISOString().slice(0, 19).replace(/[:-]/g, '');
          const fileName = `inventario_${allData.length}_registros_${timestamp}.xlsx`;

          // Descargar el archivo
          XLSX.writeFile(workbook, fileName);

          console.log(`Excel de inventario generado exitosamente: ${fileName}`);
          console.log(
            `${excelData.length} registros exportados con todos los campos`
          );
        } catch (error) {
          console.error('⚠️ Error al generar Excel de inventario:', error);
        } finally {
          this.isDownloadingExcel = false;
        }
      },
      error: (error) => {
        console.error(
          '⚠️ Error al obtener datos de inventario para Excel:',
          error
        );
        this.isDownloadingExcel = false;
      }
    });
  }

  // ───────────── Reenviar todos los que no viajaron correctamente ─────────────

  /** Hay un reenvío masivo en curso (el botón del filtro se deshabilita). */
  isResendingAll = false;

  /**
   * Marca para reenvío a Salesforce todo lo que se envió y no entró (`sendedSalesForce`
   * = 1 e `insertCorrect` = 0), respetando los filtros de agencia, VIN, estado
   * y tipo que haya activos. Lo que aún está pendiente de envío ya está en cola y
   * lo que entró bien no se toca. Pide confirmación mostrando cuántas son.
   */
  resendAllFailed(): void {
    if (this.isResendingAll) return;
    this.isResendingAll = true;

    this.collectFailed().subscribe({
      next: ({ rows, total }) => {
        if (total > MAX_RESEND_ALL) {
          this.isResendingAll = false;
          this.notifications.warning(
            `Son ${total} unidades y el máximo por vez es ${MAX_RESEND_ALL}. ` +
              'Aplica un filtro (agencia, tipo o VIN) y vuelve a intentarlo.'
          );
        } else if (rows.length === 0) {
          this.isResendingAll = false;
          this.notifications.warning(
            'No hay unidades con envío fallido con los filtros actuales.'
          );
        } else {
          this.confirmResendAll(rows);
        }
      },
      error: () => {
        this.isResendingAll = false;
        this.notifications.error(
          'No se pudo consultar lo que falló. Intenta de nuevo.'
        );
      }
    });
  }

  /** Parámetros de lo que falló, con los filtros de agencia, VIN, estado y tipo. */
  private failedParams(): Record<string, string | number> {
    const params: Record<string, string | number> = {
      perpage: 100,
      sendedSalesForce: '1',
      insertCorrect: '0'
    };
    const f = this.currentFilters;
    if (f.vin) params['vin'] = f.vin;
    if (f.idAgency) params['idAgency'] = f.idAgency;
    if (f.statusDescription) params['statusDescription'] = f.statusDescription;
    if (f.typeDescription) params['typeDescription'] = f.typeDescription;
    return params;
  }

  /** Trae todas las unidades con envío fallido (hasta el tope) y su total. */
  private collectFailed() {
    const base = this.failedParams();
    return this.vanguardiaApi.getInventory({ ...base, page: 1 }).pipe(
      switchMap((first) => {
        const total = first.total;
        if (total > MAX_RESEND_ALL || total <= first.items.length) {
          return of({ items: first.items, total });
        }
        const pages = Math.ceil(total / 100);
        const rest = Array.from({ length: pages - 1 }, (_, i) =>
          this.vanguardiaApi.getInventory({ ...base, page: i + 2 })
        );
        return forkJoin(rest).pipe(
          map((responses) => ({
            items: [...first.items, ...responses.flatMap((r) => r.items)],
            total
          }))
        );
      }),
      map(({ items, total }) => {
        // Por si la API ignorara un filtro: solo lo que de verdad falló, sin repetir
        const seen = new Set<string>();
        const rows = items.filter((row) => {
          const failed =
            String(row?.sendedSalesForce) === '1' &&
            String(row?.insertCorrect) === '0';
          const key = String(row?.id);
          if (!failed || seen.has(key)) return false;
          seen.add(key);
          return true;
        });
        return { rows, total };
      })
    );
  }

  private confirmResendAll(rows: any[]): void {
    const filters = this.describeFilters();
    this.dialog
      .open(ConfirmDialogComponent, {
        width: '480px',
        maxWidth: '92vw',
        data: {
          title: 'Reenviar todos',
          lines: [
            `Se marcarán ${rows.length} unidades con envío fallido para reenviarlas a Salesforce.`,
            filters
              ? `Solo las que cumplen los filtros actuales: ${filters}.`
              : 'Sin filtros: son todas las unidades con envío fallido.',
            'Esta acción escribe en la API.'
          ],
          confirmLabel: `Reenviar ${rows.length}`
        }
      })
      .afterClosed()
      .subscribe((confirmed?: boolean) => {
        if (confirmed) {
          this.runResendAll(rows);
        } else {
          this.isResendingAll = false;
        }
      });
  }

  /** Los filtros activos en palabras, para el mensaje de confirmación. */
  private describeFilters(): string {
    const f = this.currentFilters;
    const parts: string[] = [];
    if (f.idAgency) parts.push(`agencia ${f.idAgency}`);
    if (f.vin) parts.push(`VIN ${f.vin}`);
    if (f.statusDescription) parts.push(`estado ${f.statusDescription}`);
    if (f.typeDescription) parts.push(`tipo ${f.typeDescription}`);
    return parts.join(', ');
  }

  private runResendAll(rows: any[]): void {
    let marked = 0;
    let failed = 0;

    from(rows)
      .pipe(
        mergeMap((row) => {
          if (!row?.id) return of(false);
          return this.vanguardiaApi
            .updateInventory(row.id, resendPayload(row))
            .pipe(
              map(() => true),
              catchError(() => of(false))
            );
        }, RESEND_CONCURRENCY)
      )
      .subscribe({
        next: (ok) => (ok ? marked++ : failed++),
        complete: () => {
          this.isResendingAll = false;
          if (failed === 0) {
            this.notifications.success(
              `${marked} unidades marcadas para reenvío a Salesforce`
            );
          } else {
            this.notifications.warning(
              `${marked} unidades marcadas y ${failed} con error. Vuelve a pulsar "Reenviar todos" para reintentar las que faltan.`
            );
          }
          this.loadPage(this.pageIndex, this.currentPageSize);
        }
      });
  }
}
