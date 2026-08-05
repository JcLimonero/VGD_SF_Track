import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from '../../generic-table/generic-table.component';
import { GenericDetailModalComponent } from '../../generic-table/generic-detail-modal.component';
import { buildColumns } from '../../generic-table/dynamic-columns.util';
import { TableColumn } from '../../../../@vex/interfaces/table-column.interface';
import { MockDataService } from '../../../services/mock-data.service';
import { SalesforceFilters } from '../salesforce-filter/salesforce-filter.component';
import * as XLSX from 'xlsx';

@Component({
  selector: 'vex-salesforce-table',
  standalone: true,
  imports: [CommonModule, GenericTableComponent],
  templateUrl: './salesforce-table.component.html',
  styleUrl: './salesforce-table.component.scss'
})
export class SalesforceTableComponent implements OnInit, OnChanges {
  /** Tabla de `vgd_dwh_prod` que se está mostrando */
  @Input() table = '';

  data: any[] = [];
  loading = false;
  error: string | null = null;
  total: number | null = null;

  // Paginación
  pageIndex = 0;
  defaultPageSize = 5;
  currentPageSize = 5;

  // Filtros
  currentFilters: SalesforceFilters = {};
  isDownloadingExcel = false;
  currentSort: { column: string; direction: 'asc' | 'desc' } | null = {
    column: 'colDate',
    direction: 'desc'
  };

  /** Modal de detalles: el esquema cambia entre tablas, así que se recorren los campos */
  readonly detailModal = GenericDetailModalComponent;

  /** Columnas por las que se puede ordenar, si existen en la tabla actual */
  readonly sortableColumns = [
    'colDate',
    'billing_date',
    'service_date',
    'order_dms',
    'score',
    'stock_days'
  ];

  /**
   * Las columnas se construyen a partir de los datos: cada tabla de honda tiene
   * un esquema distinto y todavía no está definido el real. Las etiquetas solo
   * aplican a los campos que existan en la tabla que se esté mostrando.
   */
  readonly columnOptions = {
    labels: {
      agencyName: 'Agencia',
      order_dms: 'No. Orden',
      vin: 'VIN',
      model: 'Modelo',
      year: 'Año',
      total_amount: 'Importe',
      billing_date: 'Fecha Facturación',
      sendedSalesForce: 'Envio SF',
      idSalesForce: 'ID SF',
      colDate: 'Actualizado',
      lead_no: 'No. Lead',
      full_name: 'Nombre Completo',
      email: 'Correo',
      phone: 'Teléfono',
      model_interest: 'Modelo de Interés',
      campaign: 'Campaña',
      stage: 'Etapa',
      score: 'Score',
      service_order: 'No. Servicio',
      service_type: 'Tipo de Servicio',
      advisor: 'Asesor',
      km: 'KM',
      labor_amount: 'Mano de Obra',
      parts_amount: 'Refacciones',
      service_date: 'Fecha Servicio',
      exterior_color: 'Color',
      list_price: 'Precio Lista',
      stock_days: 'Días en Piso',
      status: 'Estado'
    } as Record<string, string>,
    order: ['agencyName'],
    // Campos internos; siguen visibles en el modal de detalles
    exclude: ['id', 'idAgency']
  };

  columns: TableColumn<any>[] = [];
  displayedColumns: string[] = [];

  get hasActiveFilters(): boolean {
    return !!(
      this.currentFilters.vin ||
      this.currentFilters.agencyName ||
      this.currentFilters.sendedSalesForce
    );
  }

  constructor(private mockData: MockDataService) {}

  ngOnInit(): void {
    this.loadPage(this.pageIndex, this.defaultPageSize);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Al cambiar de tabla el esquema es distinto: se rearman las columnas y se
    // vuelve a la primera página, conservando los filtros que apliquen.
    if ('table' in changes && !changes['table'].firstChange) {
      this.columns = [];
      this.displayedColumns = [];
      this.pageIndex = 0;
      this.loadPage(this.pageIndex, this.currentPageSize);
    }
  }

  loadPage(pageIndex: number, pageSize: number): void {
    if (!this.table) return;

    this.loading = true;
    this.error = null;

    this.mockData
      .getSalesforceTable(this.table, this.buildParams(pageIndex, pageSize))
      .subscribe({
        next: (res) => {
          this.data = res.items || [];
          this.total = res.total || 0;
          this.pageIndex = pageIndex;
          this.currentPageSize = pageSize;
          this.setColumns(this.data);
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

  applyFilter(filters: SalesforceFilters): void {
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
      console.warn('No hay datos de Salesforce para descargar');
      return;
    }

    this.isDownloadingExcel = true;

    this.mockData
      .getAllSalesforceTable(this.table, this.buildParams())
      .subscribe({
        next: (res) => {
          try {
            // El Excel lleva todos los campos, no solo los visibles en la tabla
            const worksheet = XLSX.utils.json_to_sheet(res.items);
            const workbook = XLSX.utils.book_new();
            // El nombre de hoja en Excel admite 31 caracteres como máximo
            XLSX.utils.book_append_sheet(
              workbook,
              worksheet,
              this.table.slice(0, 31)
            );

            worksheet['!cols'] =
              res.items.length > 0
                ? Object.keys(res.items[0]).map(() => ({ wch: 20 }))
                : [];

            const timestamp = new Date()
              .toISOString()
              .slice(0, 19)
              .replace(/[:-]/g, '');
            XLSX.writeFile(
              workbook,
              `${this.table}_${res.items.length}_registros_${timestamp}.xlsx`
            );
          } catch (error) {
            console.error('⚠️ Error al generar Excel de Salesforce:', error);
          } finally {
            this.isDownloadingExcel = false;
          }
        },
        error: (error) => {
          console.error(
            '⚠️ Error al obtener datos de Salesforce para Excel:',
            error
          );
          this.isDownloadingExcel = false;
        }
      });
  }

  /** Parámetros de consulta; sin paginación cuando no se pasan índices. */
  private buildParams(pageIndex?: number, pageSize?: number): any {
    const params: any = { ...this.currentFilters };

    if (pageIndex !== undefined && pageSize !== undefined) {
      params.page = pageIndex + 1;
      params.perpage = pageSize;
    }

    if (this.currentSort?.column) {
      params.orderby = this.currentSort.column;
      params.ordertype = this.currentSort.direction;
    }

    return params;
  }

  /** Reconstruye las columnas solo si aún no se han definido para esta tabla. */
  private setColumns(rows: any[]): void {
    if (this.columns.length > 0 || rows.length === 0) return;

    this.columns = [
      ...buildColumns(rows, this.columnOptions),
      { property: 'actions', label: 'Detalles', type: 'button' }
    ];
    this.displayedColumns = this.columns.map((col) => col.property);
  }
}
