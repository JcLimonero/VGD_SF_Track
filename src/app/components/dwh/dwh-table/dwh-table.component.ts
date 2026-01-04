import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from '../../generic-table/generic-table.component';
import { TableColumn } from '../../../../@vex/interfaces/table-column.interface';
import { VanguardiaApiService } from '../../../services/vanguardia-api.service';
import { forkJoin } from 'rxjs';
import * as XLSX from 'xlsx';

@Component({
  selector: 'vex-dwh-table',
  standalone: true,
  imports: [CommonModule, GenericTableComponent],
  templateUrl: './dwh-table.component.html',
  styleUrl: './dwh-table.component.scss'
})
export class DwhTableComponent implements OnInit {
  data: any[] = [];
  loading = false;
  error: string | null = null;
  total: number | null = null;

  // Paginación - respetando el default de la API
  pageIndex = 0;
  defaultPageSize = 5; // API devuelve 5 por defecto
  currentPageSize = 5; // Mantenemos el pageSize actual

  ///filtros
  currentFilters: {
    idAgency?: string;
    type?: string;
  } = {};
  isDownloadingExcel = false;
  currentSort: { column: string; direction: 'asc' | 'desc' } | null = { column: 'colDate', direction: 'desc' };

  // Columnas para tabla de DWH
  columns: TableColumn<any>[] = [
    { property: 'agencyName', label: 'Agencia', type: 'text' },
    { property: 'type', label: 'Tipo', type: 'text' },
    { property: 'description', label: 'Descripción', type: 'text' },
    { property: 'colDate', label: 'Fecha', type: 'text' },
    { property: 'updateStatus', label: 'Actualización', type: 'text' }
  ];

  displayedColumns: string[] = [
    'agencyName',
    'type',
    'description',
    'colDate',
    'updateStatus'
  ];

  get hasActiveFilters(): boolean {
    return !!(this.currentFilters.idAgency || this.currentFilters.type);
  }

  constructor(private vanguardiaApi: VanguardiaApiService) {}

  ngOnInit(): void {
    this.loadPage(this.pageIndex, this.defaultPageSize);
  }

  getUpdateStatusColor(colDate: string): string {
    if (!colDate) return 'red';
    
    const recordDate = new Date(colDate);
    const currentDate = new Date();
    const diffInMs = currentDate.getTime() - recordDate.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);

    if (diffInHours < 3) {
      return 'green';
    } else if (diffInHours >= 3 && diffInHours <= 12) {
      return 'orange';
    } else {
      return 'red';
    }
  }

  loadPage(pageIndex: number, pageSize: number): void {
    this.loading = true;
    this.error = null;

    // Server-side pagination - igual que las demás tablas
    const params: any = {
      page: pageIndex + 1, // API usa 1-indexed
      perpage: pageSize // Tamaño de página
    };

    // Map current filters to params
    if (this.currentFilters.idAgency) params.idAgency = this.currentFilters.idAgency;
    if (this.currentFilters.type) params.type = this.currentFilters.type;

    // Agregar ordenamiento si existe
    if (this.currentSort && this.currentSort.column) {
      params.orderby = this.currentSort.column;
      params.ordertype = this.currentSort.direction;
    }

    // Usar getDWH con parámetros (server-side pagination)
    this.vanguardiaApi.getDWH(params).subscribe({
      next: (res) => {
        this.data = res.items || [];
        this.total = res.total || 0;
        this.pageIndex = pageIndex;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'No se pudo cargar la información. Por favor, intenta de nuevo.';
        this.data = [];
        this.total = 0;
        this.loading = false;
      }
    });
  }

  applyFilter(filters: {
    idAgency?: string;
  }): void {
    //guardar filtros y reiniciar a primera página
    this.currentFilters = { ...filters };
    this.pageIndex = 0;
    this.loadPage(this.pageIndex, this.defaultPageSize);
  }

  onSortChange(sort: { column: string; direction: 'asc' | 'desc' }): void {
    console.log('Ordenamiento DWH cambiado:', sort);
    // Si column está vacío, resetear ordenamiento
    if (!sort.column) {
      this.currentSort = null;
    } else {
      this.currentSort = sort;
    }
    // Siempre ir a página 1 al cambiar o resetear ordenamiento
    this.pageIndex = 0;
    this.loadPage(this.pageIndex, this.defaultPageSize);
  }

  downloadExcel(): void {
    if (!this.total || this.total === 0) {
      console.warn('No hay datos de DWH para descargar');
      return;
    }

    this.isDownloadingExcel = true;

    // calcular paginas necesarias porque la api tiene un limite de 100 por llamada
    const maxPerPage = 100;
    const totalPages = Math.ceil(this.total / maxPerPage);

    // Preparar parámetros base
    const baseParams: any = {
      perpage: maxPerPage
    };

    // Aplicar los mismos filtros que están actualmente activos
    if (this.currentFilters.idAgency)
      baseParams.idAgency = this.currentFilters.idAgency;

    // Crear array de observables para todas las páginas
    const pageRequests = [];
    for (let page = 1; page <= totalPages; page++) {
      const params = { ...baseParams, page };
      pageRequests.push(this.vanguardiaApi.getDWH(params));
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

          // Preparar los datos para Excel con TODOS los campos disponibles
          const excelData = allData.map((item) => ({
            'Agencia': item.agencyName || '',
            'ID Agencia': item.idAgency || '',
            'Tipo': item.type || '',
            'Descripción': item.description || '',
            'Fecha': item.colDate || '',
            'Fecha UTC': item.colDateUTC || ''
          }));

          // Crear libro de Excel
          const worksheet = XLSX.utils.json_to_sheet(excelData);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, 'DWH');

          // Configurar el ancho de las columnas
          const columnWidths =
            excelData.length > 0
              ? Object.keys(excelData[0]).map(() => ({ wch: 20 }))
              : [];
          worksheet['!cols'] = columnWidths;

          // Generar nombre del archivo con timestamp y total de registros
          const now = new Date();
          const timestamp = now.toISOString().slice(0, 19).replace(/[:-]/g, '');
          const fileName = `dwh_${allData.length}_registros_${timestamp}.xlsx`;

          // Descargar el archivo
          XLSX.writeFile(workbook, fileName);

          console.log(`Excel de DWH generado exitosamente: ${fileName}`);
          console.log(
            `${excelData.length} registros exportados con todos los campos`
          );
        } catch (error) {
          console.error('⚠️ Error al generar Excel de DWH:', error);
        } finally {
          this.isDownloadingExcel = false;
        }
      },
      error: (error) => {
        console.error(
          '⚠️ Error al obtener datos de DWH para Excel:',
          error
        );
        this.isDownloadingExcel = false;
      }
    });
  }
}
