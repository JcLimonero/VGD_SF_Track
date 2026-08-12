import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from '../../generic-table/generic-table.component';
import { GenericDetailModalComponent } from '../../generic-table/generic-detail-modal.component';
import { TableColumn } from '../../../../@vex/interfaces/table-column.interface';
import { VanguardiaApiService } from '../../../services/vanguardia-api.service';
import { NotificationService } from '../../../services/notification.service';
import { CrabiFilters } from '../crabi-filter/crabi-filter.component';
import { forkJoin } from 'rxjs';
import * as XLSX from 'xlsx';

@Component({
  selector: 'vex-crabi-table',
  standalone: true,
  imports: [CommonModule, GenericTableComponent],
  templateUrl: './crabi-table.component.html',
  styleUrl: './crabi-table.component.scss'
})
export class CrabiTableComponent implements OnInit {
  data: any[] = [];
  loading = false;
  error: string | null = null;
  total: number | null = null;

  // Paginación - respetando el default de la API
  pageIndex = 0;
  defaultPageSize = 5;
  currentPageSize = 5;

  // Filtros
  currentFilters: CrabiFilters = {};
  isDownloadingExcel = false;
  currentSort: { column: string; direction: 'asc' | 'desc' } | null = {
    column: 'captured_at',
    direction: 'desc'
  };

  /** El endpoint no devuelve el nombre de la agencia, solo `idAgency` */
  private agencyNames: Record<string, string> = {};

  /**
   * Modal de detalles genérico: recorre todos los campos del registro en lugar
   * de tener una lista fija, porque el esquema de Crabi no es el de facturas.
   */
  readonly detailModal = GenericDetailModalComponent;

  /**
   * `request_body` y `response_body` salen del modal de detalles y se muestran
   * en el de JSON, igual que `sf_jsonRequest` en los módulos que mandan a
   * Salesforce.
   *
   * Son el payload que se envió a Crabi y lo que Crabi contestó. En la lista de
   * detalles aparecían como un renglón de JSON sin formato, mezclado con los
   * datos del vehículo; en su propio modal salen indentados y con botón de
   * copiar, y los datos personales del cliente que lleva la petición quedan
   * detrás de un clic explícito en vez de a la vista.
   *
   * No se ocultan del todo: `response_body` es lo que dice por qué falló un
   * envío, que es con lo que se decide si reenviar.
   */
  readonly detailExclude = ['request_body', 'response_body'];
  readonly jsonField = 'json_data';
  readonly jsonTitle = 'Petición y respuesta - Crabi';
  readonly jsonFields = [
    { field: 'request_body', label: 'Petición' },
    { field: 'response_body', label: 'Respuesta' }
  ];

  /** Campo de envío de este módulo (los demás usan `sendedSalesForce`) */
  readonly sendField = 'isSend';

  /**
   * En la tabla `isSend` se pinta como icono, pero el modal de detalles listaba
   * el valor tal cual y se leía 'Envío Crabi: 1'.
   *
   * La redacción es la misma de `sentOptions` en el filtro, para que la opción
   * con la que se busca y lo que se lee en el detalle digan igual.
   *
   * `id_status` no está aquí a propósito: vale 3 en las 707 filas y no hay
   * catálogo que diga qué significa, así que se muestra el número en vez de
   * inventarle un nombre.
   */
  readonly detailValueLabels: Record<string, Record<string, string>> = {
    isSend: {
      '1': 'Enviado a Crabi',
      '0': 'Pendiente de envío'
    }
  };

  /** Columnas por las que la API acepta ordenar */
  readonly sortableColumns = [
    'order_dms',
    'vin',
    'brand',
    'model',
    'year',
    'amount',
    'isSend',
    'captured_at',
    'sent_at'
  ];

  /**
   * Campos que no salen en la tabla pero sí en el detalle y en el Excel.
   *
   * Los que sí salen no se repiten aquí: sus etiquetas se toman de `columns`,
   * que ya las declara.
   *
   * `id_status` no es columna porque hoy vale 3 en todos los registros, pero se
   * etiqueta igual: el modal recorre el registro completo, así que quitarlo de
   * aquí no lo ocultaría, solo lo dejaría sin traducir.
   *
   * `request_body` y `response_body` siguen aquí aunque `detailExclude` los saca
   * del modal de detalles: estas etiquetas también nombran las columnas del
   * Excel, donde sí van, como 'JSON Request SF' y 'JSON Response SF' en el de
   * facturas.
   */
  private readonly extraLabels: Record<string, string> = {
    id: 'ID',
    idAgency: 'Clave Agencia',
    version: 'Versión',
    external_color: 'Color Exterior',
    internal_color: 'Color Interior',
    ndClientDMS: 'No. Cliente DMS',
    ndConsultant: 'No. Asesor',
    id_status: 'Estado',
    timestamp_dms: 'Fecha DMS',
    request_body: 'Petición',
    response_body: 'Respuesta'
  };

  columns: TableColumn<any>[] = [
    { property: 'agencyName', label: 'Agencia', type: 'text' },
    { property: 'order_dms', label: 'No. Orden', type: 'text' },
    { property: 'invoice', label: 'Factura', type: 'text' },
    { property: 'vin', label: 'VIN', type: 'text' },
    { property: 'brand', label: 'Marca', type: 'text' },
    { property: 'model', label: 'Modelo', type: 'text' },
    { property: 'year', label: 'Año', type: 'text' },
    { property: 'amount', label: 'Monto', type: 'text' },
    { property: 'isSend', label: 'Envío Crabi', type: 'text' },
    { property: 'captured_at', label: 'Capturado', type: 'text' },
    { property: 'sent_at', label: 'Fecha Envío', type: 'text' },
    // No es un campo del registro: es la columna que abre el modal con
    // `request_body` y `response_body`, como 'Datos' en los demás módulos
    { property: 'json_data', label: 'Datos', type: 'button' },
    { property: 'resend', label: 'Reenviar', type: 'button' },
    { property: 'actions', label: 'Detalles', type: 'button' }
  ];

  displayedColumns: string[] = [
    'agencyName',
    'order_dms',
    'invoice',
    'vin',
    'brand',
    'model',
    'year',
    'amount',
    'isSend',
    'captured_at',
    'sent_at',
    'json_data',
    'resend',
    'actions'
  ];

  /**
   * Etiquetas de todos los campos, para el modal de detalles y el Excel.
   *
   * Se arma a partir de `columns` más `extraLabels`, para no declarar dos veces
   * la etiqueta de un campo visible. El orden es el de la tabla y luego el de
   * los campos extra, que es el que usa el Excel.
   */
  readonly detailLabels: Record<string, string> = this.buildDetailLabels();

  get hasActiveFilters(): boolean {
    return !!(
      this.currentFilters.order_dms ||
      this.currentFilters.vin ||
      this.currentFilters.idAgency ||
      this.currentFilters.isSend
    );
  }

  constructor(
    private vanguardiaApi: VanguardiaApiService,
    private notifications: NotificationService
  ) {}

  ngOnInit(): void {
    this.loadAgencies();
    this.loadPage(this.pageIndex, this.defaultPageSize);
  }

  loadPage(pageIndex: number, pageSize: number): void {
    this.loading = true;
    this.error = null;

    this.vanguardiaApi.getCrabiOrders(this.buildParams(pageIndex, pageSize)).subscribe({
      next: (res) => {
        this.data = this.withAgencyName(res.items || []);
        this.total = res.total || 0;
        this.pageIndex = pageIndex;
        this.currentPageSize = pageSize;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudo cargar la información. Por favor, intenta de nuevo.';
        this.data = [];
        this.total = 0;
        this.loading = false;
      }
    });
  }

  applyFilter(filters: CrabiFilters): void {
    this.currentFilters = { ...filters };
    this.pageIndex = 0;
    this.loadPage(this.pageIndex, this.currentPageSize);
  }

  onSortChange(sort: { column: string; direction: 'asc' | 'desc' }): void {
    this.currentSort = sort.column ? sort : null;
    this.pageIndex = 0;
    this.loadPage(this.pageIndex, this.currentPageSize);
  }

  /**
   * Marca la orden para que se vuelva a enviar a Crabi.
   *
   * Es la única escritura del módulo. No hay alta ni baja de registros: el
   * portal solo consulta y reenvía.
   *
   * El cuerpo lleva solo `isSend`, a diferencia de los demás módulos, que
   * mandan `{ ...row, sendedSalesForce: '0' }`. Aquí no debe hacerse: `row`
   * trae `agencyName`, que se resuelve en el cliente y no es columna de
   * `orders_to_crabi`, así que se enviaría un campo inexistente. El `id` va en
   * la ruta y no hace falta repetirlo en el cuerpo.
   */
  resendToCrabi(row: any): void {
    if (!row.id) {
      this.notifications.error('No se encontró el ID del registro');
      return;
    }

    this.vanguardiaApi.updateCrabiOrder(row.id, { isSend: 0 }).subscribe({
      next: () => {
        this.notifications.success(
          `Orden ${row.order_dms} marcada para reenvío a Crabi`
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

  downloadExcel(): void {
    if (!this.total || this.total === 0) {
      console.warn('No hay datos de Crabi para descargar');
      return;
    }

    this.isDownloadingExcel = true;

    // Se pide por páginas, igual que en los demás módulos, para no depender de
    // que la API acepte un perpage arbitrariamente grande.
    //
    // Deliberadamente SIN ordenar: `captured_at` tiene muchísimos empates (en
    // 100 filas hay 3 valores distintos, uno repetido 64 veces) y la API no
    // desempata, así que el orden entre páginas no es estable y las descargas
    // salían con filas repetidas y otras faltantes. Sin `orderby` la paginación
    // es consistente; el orden se aplica aquí, ya con todo en memoria.
    const maxPerPage = 100;
    const totalPages = Math.ceil(this.total / maxPerPage);
    const baseParams = { ...this.currentFilters };

    const pageRequests = [];
    for (let page = 1; page <= totalPages; page++) {
      pageRequests.push(
        this.vanguardiaApi.getCrabiOrders({ ...baseParams, page, perpage: maxPerPage })
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
          XLSX.utils.book_append_sheet(workbook, worksheet, 'Crabi');

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
            `crabi_${excelData.length}_registros_${timestamp}.xlsx`
          );

          console.log(`Excel de Crabi generado exitosamente: ${excelData.length} registros`);
        } catch (error) {
          console.error('⚠️ Error al generar Excel de Crabi:', error);
        } finally {
          this.isDownloadingExcel = false;
        }
      },
      error: (error) => {
        console.error('⚠️ Error al obtener datos de Crabi para Excel:', error);
        this.isDownloadingExcel = false;
      }
    });
  }

  /**
   * Arma las filas del Excel: una columna por cada campo etiquetado, no solo
   * por los visibles en la tabla. `request_body` y `response_body` van incluidos
   * aunque no se listen en el modal de detalles, igual que 'JSON Request SF' y
   * 'JSON Response SF' en el Excel de facturas.
   */
  buildExcelRows(items: any[]): Record<string, any>[] {
    return this.sortInMemory(this.withAgencyName(items)).map((item) => {
      const row: Record<string, any> = {};
      Object.keys(this.detailLabels).forEach((field) => {
        row[this.detailLabels[field]] = item[field] ?? '';
      });
      return row;
    });
  }

  /**
   * Ordena en memoria con el criterio activo en la tabla, para que el Excel
   * salga como el usuario lo está viendo. Se usa solo en la descarga: ahí las
   * páginas se piden sin ordenar para que la paginación sea consistente.
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

  private buildDetailLabels(): Record<string, string> {
    const fromColumns: Record<string, string> = {};
    this.columns
      .filter((col) => col.type !== 'button')
      .forEach((col) => (fromColumns[col.property] = col.label));

    return { ...fromColumns, ...this.extraLabels };
  }

  /** Parámetros de consulta; sin paginación cuando no se pasan índices. */
  private buildParams(pageIndex?: number, pageSize?: number): any {
    const params: any = { ...this.currentFilters };

    if (pageIndex !== undefined && pageSize !== undefined) {
      params.page = pageIndex + 1; // La API usa 1-indexed
      params.perpage = pageSize;
    }

    if (this.currentSort?.column) {
      params.orderby = this.currentSort.column;
      params.ordertype = this.currentSort.direction;
    }

    return params;
  }

  /**
   * Catálogo de agencias, para poder mostrar el nombre en lugar de la clave.
   * Si falla, la columna queda con la clave y el resto de la tabla sigue igual.
   */
  private loadAgencies(): void {
    this.vanguardiaApi.getAgencies().subscribe({
      next: (agencies) => {
        this.agencyNames = {};
        agencies.forEach((agency: any) => {
          this.agencyNames[agency.idAgency] = agency.name;
        });
        // Las órdenes pueden haber llegado antes que el catálogo
        this.data = this.withAgencyName(this.data);
      },
      error: (error) => {
        console.error('Error al cargar agencias para Crabi:', error);
      }
    });
  }

  private withAgencyName(rows: any[]): any[] {
    // Va primero para que el modal la liste al principio, como en la tabla, y
    // no al final detrás de los JSON
    return rows.map((row) => ({
      agencyName: this.agencyNames[row.idAgency] ?? row.idAgency,
      ...row
    }));
  }
}
