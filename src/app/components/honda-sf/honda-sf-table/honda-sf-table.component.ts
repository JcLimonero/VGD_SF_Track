import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from '../../generic-table/generic-table.component';
import { GenericDetailModalComponent } from '../../generic-table/generic-detail-modal.component';
import { buildColumns } from '../../generic-table/dynamic-columns.util';
import { TableColumn } from '../../../../@vex/interfaces/table-column.interface';
import { MockDataService } from '../../../services/mock-data.service';
import { HondaSfFilters } from '../honda-sf-filter/honda-sf-filter.component';
import * as XLSX from 'xlsx';

@Component({
  selector: 'vex-honda-sf-table',
  standalone: true,
  imports: [CommonModule, GenericTableComponent],
  templateUrl: './honda-sf-table.component.html',
  styleUrl: './honda-sf-table.component.scss'
})
export class HondaSfTableComponent implements OnInit {
  data: any[] = [];
  loading = false;
  error: string | null = null;
  total: number | null = null;

  // Paginación
  pageIndex = 0;
  defaultPageSize = 5;
  currentPageSize = 5;

  // Filtros
  currentFilters: HondaSfFilters = {};
  isDownloadingExcel = false;
  currentSort: { column: string; direction: 'asc' | 'desc' } | null = {
    column: 'created_at',
    direction: 'desc'
  };

  /** Modal de detalles: el esquema no es fijo, así que se recorren los campos */
  readonly detailModal = GenericDetailModalComponent;

  /** Columnas por las que se puede ordenar */
  readonly sortableColumns = [
    'record_id',
    'order_dms',
    'created_at',
    'last_sync_at'
  ];

  /**
   * Las columnas se construyen a partir de los datos porque todavía no está
   * definida la fuente real de esta pestaña. El mapa de etiquetas y el orden
   * solo aplican a los campos que existan.
   */
  readonly columnOptions = {
    labels: {
      record_id: 'No. Registro',
      sf_object: 'Objeto SF',
      sf_id: 'ID Salesforce',
      dealer_code: 'Clave Distribuidor',
      dealerName: 'Distribuidor',
      order_dms: 'No. Orden',
      vin: 'VIN',
      model: 'Modelo',
      year: 'Año',
      customer_name: 'Cliente',
      customer_email: 'Correo',
      sync_status: 'Sincronización',
      sent_to_sf: 'Envío SF',
      response_code: 'Código',
      error_message: 'Error',
      created_at: 'Fecha Creación',
      last_sync_at: 'Última Sincronización'
    } as Record<string, string>,
    order: [
      'dealerName',
      'record_id',
      'sf_object',
      'order_dms',
      'vin',
      'model',
      'customer_name',
      'sync_status',
      'created_at'
    ],
    // Campos internos o demasiado largos para la tabla; siguen visibles en el modal
    exclude: [
      'id',
      'sf_id',
      'dealer_code',
      'year',
      'customer_email',
      'sent_to_sf',
      'response_code',
      'error_message',
      'last_sync_at'
    ]
  };

  columns: TableColumn<any>[] = [];
  displayedColumns: string[] = [];

  get hasActiveFilters(): boolean {
    return !!(
      this.currentFilters.record_id ||
      this.currentFilters.vin ||
      this.currentFilters.sf_object ||
      this.currentFilters.sync_status
    );
  }

  constructor(private mockData: MockDataService) {}

  ngOnInit(): void {
    this.loadPage(this.pageIndex, this.defaultPageSize);
  }

  loadPage(pageIndex: number, pageSize: number): void {
    this.loading = true;
    this.error = null;

    this.mockData.getHondaSf(this.buildParams(pageIndex, pageSize)).subscribe({
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

  applyFilter(filters: HondaSfFilters): void {
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
      console.warn('No hay datos de Honda SF para descargar');
      return;
    }

    this.isDownloadingExcel = true;

    this.mockData.getAllHondaSf(this.buildParams()).subscribe({
      next: (res) => {
        try {
          // El Excel lleva todos los campos, no solo los visibles en la tabla
          const worksheet = XLSX.utils.json_to_sheet(res.items);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, 'Honda SF');

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
            `honda_sf_${res.items.length}_registros_${timestamp}.xlsx`
          );
        } catch (error) {
          console.error('⚠️ Error al generar Excel de Honda SF:', error);
        } finally {
          this.isDownloadingExcel = false;
        }
      },
      error: (error) => {
        console.error('⚠️ Error al obtener datos de Honda SF para Excel:', error);
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

  /** Reconstruye las columnas solo si aún no se han definido. */
  private setColumns(rows: any[]): void {
    if (this.columns.length > 0 || rows.length === 0) return;

    this.columns = [
      ...buildColumns(rows, this.columnOptions),
      { property: 'actions', label: 'Detalles', type: 'button' }
    ];
    this.displayedColumns = this.columns.map((col) => col.property);
  }
}
