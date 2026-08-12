import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from '../../generic-table/generic-table.component';
import { GenericDetailModalComponent } from '../../generic-table/generic-detail-modal.component';
import {
  buildColumns,
  humanizeFieldName
} from '../../generic-table/dynamic-columns.util';
import { TableColumn } from '../../../../@vex/interfaces/table-column.interface';
import { VanguardiaApiService } from '../../../services/vanguardia-api.service';
import { NotificationService } from '../../../services/notification.service';
import {
  HONDA_SF_LABELS,
  HONDA_SF_TABLES,
  HondaSfTable,
  findHondaSfTable
} from '../honda-sf.catalog';
import { forkJoin } from 'rxjs';
import * as XLSX from 'xlsx';

@Component({
  selector: 'vex-honda-sf-table',
  imports: [CommonModule, GenericTableComponent],
  templateUrl: './honda-sf-table.component.html',
  styleUrl: './honda-sf-table.component.scss'
})
export class HondaSfTableComponent implements OnInit, OnChanges {
  /** Endpoint de la sub-pestaña activa (ver `honda-sf.catalog.ts`) */
  @Input() table: string = HONDA_SF_TABLES[0]?.id ?? '';

  data: any[] = [];
  loading = false;
  error: string | null = null;
  total: number | null = null;

  // Paginación
  pageIndex = 0;
  defaultPageSize = 5;
  currentPageSize = 5;

  // Filtros
  currentFilters: Record<string, string> = {};
  isDownloadingExcel = false;
  currentSort: { column: string; direction: 'asc' | 'desc' } | null = null;

  /**
   * Máximo de registros que se bajan a Excel de una sola vez.
   *
   * La tabla de clientes tiene casi 200,000 registros y la API topa en 1000 por
   * página: bajarla completa serían 200 peticiones, varios minutos y más de 100
   * MB en memoria del navegador. Por encima de este tope se pide al usuario que
   * filtre en vez de arrancar la descarga.
   */
  readonly excelRowLimit = 20000;

  /**
   * Página máxima que acepta la API. Verificado: pedir más devuelve 1000 igual.
   */
  private readonly maxPerPage = 1000;

  /** El endpoint devuelve `dealer_id`, no el nombre del distribuidor */
  private dealerNames: Record<string, string> = {};

  /** El esquema cambia entre sub-pestañas, así que el modal recorre el registro */
  readonly detailModal = GenericDetailModalComponent;

  readonly detailLabels = HONDA_SF_LABELS;

  columns: TableColumn<any>[] = [];
  displayedColumns: string[] = [];

  /**
   * Columnas visibles por las que sí se puede ordenar. Quedan fuera:
   *
   *  - `dealerName`, que se resuelve en el cliente contra el catálogo de
   *    agencias y no es una columna de la tabla, así que la API no la conoce.
   *  - las que el endpoint ignora, declaradas en `noSort`.
   */
  get sortableColumns(): string[] {
    const noSort = this.config.noSort ?? [];
    return this.config.columns.filter(
      (field) => field !== 'dealerName' && !noSort.includes(field)
    );
  }

  get config(): HondaSfTable {
    return findHondaSfTable(this.table) ?? HONDA_SF_TABLES[0];
  }

  get hasActiveFilters(): boolean {
    return Object.values(this.currentFilters).some((value) => !!value);
  }

  constructor(
    private vanguardiaApi: VanguardiaApiService,
    private notifications: NotificationService
  ) {}

  ngOnInit(): void {
    this.currentSort = { ...this.config.defaultSort };
    this.loadDealers();
    this.loadPage(this.pageIndex, this.defaultPageSize);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Cada tabla tiene esquema, filtros y orden propios: no sirve arrastrar
    // nada de la anterior, se arranca de cero salvo el catálogo de agencias.
    if ('table' in changes && !changes['table'].firstChange) {
      this.columns = [];
      this.displayedColumns = [];
      this.currentFilters = {};
      this.currentSort = { ...this.config.defaultSort };
      this.pageIndex = 0;
      this.loadPage(this.pageIndex, this.currentPageSize);
    }
  }

  loadPage(pageIndex: number, pageSize: number): void {
    this.loading = true;
    this.error = null;

    this.vanguardiaApi
      .getHondaPortal(this.table, this.buildParams(pageIndex, pageSize))
      .subscribe({
        next: (res) => {
          this.data = this.forDisplay(res.items || []);
          this.total = res.total || 0;
          this.pageIndex = pageIndex;
          this.currentPageSize = pageSize;
          this.setColumns(this.data);
          this.loading = false;
        },
        error: () => {
          this.error =
            'No se pudo cargar la información. Por favor, intenta de nuevo.';
          this.data = [];
          this.total = 0;
          this.loading = false;
        }
      });
  }

  applyFilter(filters: Record<string, string>): void {
    this.currentFilters = { ...filters };
    this.pageIndex = 0;
    this.loadPage(this.pageIndex, this.currentPageSize);
  }

  onSortChange(sort: { column: string; direction: 'asc' | 'desc' }): void {
    this.currentSort = sort.column ? sort : null;
    this.pageIndex = 0;
    this.loadPage(this.pageIndex, this.currentPageSize);
  }

  downloadExcel(): void {
    if (!this.total || this.total === 0) {
      console.warn(`No hay datos de ${this.config.label} para descargar`);
      return;
    }

    if (this.total > this.excelRowLimit) {
      // `warning` y no `error`: no falló nada, es el usuario quien tiene que
      // hacer algo. Por eso este aviso no caduca solo, a diferencia de los
      // demás: si desapareciera a los segundos, se quedaría sin saber que lo
      // que le falta es filtrar.
      this.notifications.warning(
        `El resultado tiene ${this.total.toLocaleString('es-MX')} registros y ` +
          `el máximo por descarga es ${this.excelRowLimit.toLocaleString('es-MX')}.\n\n` +
          'Aplica un filtro (distribuidor, cliente, VIN...) y vuelve a intentarlo.'
      );
      return;
    }

    this.isDownloadingExcel = true;

    // Las páginas se piden SIN ordenar, igual que en Crabi: la API no desempata
    // el ORDER BY, así que ordenar aquí arriesga filas repetidas entre páginas.
    // El orden que ve el usuario se aplica en memoria, ya con todo descargado.
    const totalPages = Math.ceil(this.total / this.maxPerPage);
    const baseParams = { ...this.currentFilters };

    const pageRequests = [];
    for (let page = 1; page <= totalPages; page++) {
      pageRequests.push(
        this.vanguardiaApi.getHondaPortal(this.table, {
          ...baseParams,
          page,
          perpage: this.maxPerPage
        })
      );
    }

    forkJoin(pageRequests).subscribe({
      next: (responses) => {
        try {
          const allData: any[] = [];
          responses.forEach((response) => allData.push(...response.items));

          const excelData = this.buildExcelRows(allData);

          const worksheet = XLSX.utils.json_to_sheet(excelData);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, this.config.sheet);

          worksheet['!cols'] =
            excelData.length > 0
              ? Object.keys(excelData[0]).map(() => ({ wch: 20 }))
              : [];

          const timestamp = new Date()
            .toISOString()
            .slice(0, 19)
            .replace(/[:-]/g, '');
          XLSX.writeFile(
            workbook,
            `${this.table}_${excelData.length}_registros_${timestamp}.xlsx`
          );
        } catch (error) {
          console.error('⚠️ Error al generar Excel de Honda SF:', error);
        } finally {
          this.isDownloadingExcel = false;
        }
      },
      error: (error) => {
        console.error(
          '⚠️ Error al obtener datos de Honda SF para Excel:',
          error
        );
        this.isDownloadingExcel = false;
      }
    });
  }

  /**
   * Filas del Excel: todos los campos que devuelve el endpoint, con encabezado
   * en español, no solo los visibles en la tabla.
   *
   * A diferencia de la vista, aquí las fechas van tal cual las manda la API:
   * el Excel es el respaldo de lo que hay en la base, y un `0000-00-00` en
   * blanco no se distinguiría de un campo realmente vacío.
   */
  buildExcelRows(items: any[]): Record<string, any>[] {
    const rows = this.sortInMemory(this.withDealerName(items));
    if (rows.length === 0) return [];

    const fields = Object.keys(rows[0]);

    return rows.map((item) => {
      const row: Record<string, any> = {};
      fields.forEach((field) => {
        row[HONDA_SF_LABELS[field] ?? humanizeFieldName(field)] =
          item[field] ?? '';
      });
      return row;
    });
  }

  /**
   * Ordena en memoria con el criterio activo, para que el Excel salga como el
   * usuario está viendo la tabla. Solo se usa en la descarga.
   */
  private sortInMemory(rows: any[]): any[] {
    const sort = this.currentSort;
    if (!sort?.column) return rows;

    const dir = sort.direction === 'desc' ? -1 : 1;
    return [...rows].sort((a, b) => {
      const av = a[sort.column];
      const bv = b[sort.column];
      // Los nulos al final, sin importar la dirección
      if (av === null || av === undefined) return 1;
      if (bv === null || bv === undefined) return -1;
      if (av === bv) return 0;
      return av < bv ? -1 * dir : 1 * dir;
    });
  }

  /** Parámetros de consulta; sin paginación cuando no se pasan índices. */
  private buildParams(pageIndex?: number, pageSize?: number): any {
    const params: any = { ...this.currentFilters };

    if (pageIndex !== undefined && pageSize !== undefined) {
      params.page = pageIndex + 1; // La API es 1-indexed
      params.perpage = pageSize;
    }

    if (this.currentSort?.column) {
      params.orderby = this.currentSort.column;
      params.ordertype = this.currentSort.direction;
    }

    return params;
  }

  /**
   * Catálogo de agencias, para mostrar el nombre del distribuidor en vez de la
   * clave. Si falla, queda la clave y el resto de la tabla sigue igual.
   */
  private loadDealers(): void {
    this.vanguardiaApi.getAgencies().subscribe({
      next: (agencies) => {
        this.dealerNames = {};
        agencies.forEach((agency: any) => {
          this.dealerNames[agency.idAgency] = agency.name;
        });
        // Los registros pueden haber llegado antes que el catálogo
        this.data = this.withDealerName(this.data);
      },
      error: (error) => {
        console.error('Error al cargar agencias para Honda SF:', error);
      }
    });
  }

  /** Lo que se muestra en pantalla: con distribuidor y sin fechas basura. */
  private forDisplay(rows: any[]): any[] {
    return this.withDealerName(rows.map((row) => this.blankZeroDates(row)));
  }

  private withDealerName(rows: any[]): any[] {
    // Va primero para que el modal de detalles la liste al principio, igual
    // que la tabla
    return rows.map((row) => ({
      dealerName: this.dealerNames[row.dealer_id] ?? row.dealer_id,
      ...row
    }));
  }

  /**
   * MySQL devuelve `0000-00-00` para las fechas sin capturar. Mostrarlo tal cual
   * se lee como una fecha del año cero; se deja en blanco, como cualquier otro
   * campo vacío. En el Excel sí se conserva el valor original.
   */
  private blankZeroDates(row: any): any {
    const cleaned: any = { ...row };
    Object.keys(cleaned).forEach((field) => {
      if (
        typeof cleaned[field] === 'string' &&
        /^0000-00-00/.test(cleaned[field])
      ) {
        cleaned[field] = '';
      }
    });
    return cleaned;
  }

  /** Rearma las columnas cuando aún no se han definido para esta tabla. */
  private setColumns(rows: any[]): void {
    if (this.columns.length > 0 || rows.length === 0) return;

    this.columns = [
      ...buildColumns(rows, {
        labels: HONDA_SF_LABELS,
        include: this.config.columns
      }),
      { property: 'actions', label: 'Detalles', type: 'button' }
    ];
    this.displayedColumns = this.columns.map((col) => col.property);
  }
}
