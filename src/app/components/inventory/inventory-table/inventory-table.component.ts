// COPIADO EXACTO de invoice-table con server-side pagination
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from '../../generic-table/generic-table.component';
import { VanguardiaApiService } from '../../../services/vanguardia-api.service';
import { TableColumn } from '../../../../@vex/interfaces/table-column.interface';
import { forkJoin } from 'rxjs';
import * as XLSX from 'xlsx';

@Component({
  selector: 'vex-inventory-table',
  standalone: true,
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
  defaultPageSize = 5; // API devuelve 5 por defecto
  currentPageSize = 5; // Mantenemos el pageSize actual
  
  // Filtros activos
  currentFilters: { vin?: string; agencyName?: string; sendedSalesForce?: '1'|'0'; insertado?: boolean; error?: boolean } = {};
  isDownloadingExcel = false;
  
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
    { property: 'timestamp_sales_force',label: 'Fecha SF',  type: 'text' },
    { property: 'resultSF',label: 'Estado SF',  type: 'text' },
    { property: 'sf_jsonRequest',label: 'Datos',  type: 'button' },
    { property: 'sf_link',label: 'Ver SF',  type: 'button' },
    { property: 'actions',label: 'Detalles',  type: 'button' }
  ];

  displayedColumns: string[] = ['agencyName', 'vin', 'statusDescription', 'typeDescription', 'brand', 'year', 'model','sendedSalesForce','timestamp_sales_force','resultSF', 'sf_jsonRequest', 'sf_link', 'actions'];

  get hasActiveFilters(): boolean {
    return !!(
      this.currentFilters.vin ||
      this.currentFilters.agencyName ||
      this.currentFilters.sendedSalesForce ||
      this.currentFilters.insertado ||
      this.currentFilters.error
    );
  }

  constructor(private vanguardiaApi: VanguardiaApiService) {}

  ngOnInit(): void {
    this.loadPage(this.pageIndex, this.defaultPageSize);
  }

  /**
   * Carga los datos desde la API con server-side pagination
   */
  loadPage(pageIndex: number, pageSize: number): void {
    this.loading = true;
    this.error = null;

    // Server-side pagination - igual que invoice-table
    const params: any = {
      page: pageIndex + 1,  // API usa 1-indexed
      perpage: pageSize     // Tamaño de página
    };

    // Map current filters to params
    if (this.currentFilters.vin) params.vin = this.currentFilters.vin;
    if (this.currentFilters.agencyName) params.agencyName = this.currentFilters.agencyName;
    if (this.currentFilters.sendedSalesForce) params.sendedSalesForce = this.currentFilters.sendedSalesForce;
    if (this.currentFilters.insertado && !this.currentFilters.error) params.insertCorrect = '1';
    if (this.currentFilters.error && !this.currentFilters.insertado) params.insertCorrect = '0';

    // Usar getInventory con parámetros (server-side pagination)
    this.vanguardiaApi.getInventory(params).subscribe({
      next: (res) => {
        this.data = res.items || [];
        this.total = res.total || 0;
        this.pageIndex = pageIndex;
        this.loading = false;
      },
      error: (error) => {
        console.error('❌ Error cargando inventario:', error);
        this.error = 'Error al cargar el inventario';
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

  applyFilter(filters: { vin?: string; agencyName?: string; sendedSalesForce?: '1' | '0'; insertado?: boolean; error?: boolean }): void {
    // Guardar filtros y reiniciar a primera página
    this.currentFilters = { ...filters };
    this.pageIndex = 0;
    this.loadPage(this.pageIndex, this.defaultPageSize);
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
    
    console.log(`📥 Descargando ${this.total} registros de inventario en ${totalPages} páginas`);

    // Preparar parámetros base
    const baseParams: any = {
      perpage: maxPerPage
    };

    // Aplicar los mismos filtros que están actualmente activos
    if (this.currentFilters.vin) baseParams.vin = this.currentFilters.vin;
    if (this.currentFilters.agencyName) baseParams.agencyName = this.currentFilters.agencyName;
    if (this.currentFilters.sendedSalesForce) baseParams.sendedSalesForce = this.currentFilters.sendedSalesForce;
    if (this.currentFilters.insertado && !this.currentFilters.error) baseParams.insertCorrect = '1';
    if (this.currentFilters.error && !this.currentFilters.insertado) baseParams.insertCorrect = '0';

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
            responses.forEach(response => {
              allData.push(...response.items);
            });

            console.log(`Datos de inventario obtenidos para Excel: ${allData.length} registros de ${this.total} esperados`);

            // Preparar los datos para Excel con TODOS los campos disponibles
            const excelData = allData.map(item => ({
              // Campos básicos de identificación
              'Agencia': item.agencyName || '',
              'VIN': item.vin || '',
              'Estado:': item.statusDescription || '',
              'Tipo': item.typeDescription || '',
              'Marca': item.brand || '',
              'Año': item.year || '',
              'Modelo': item.model || '',
              'Versión': item.version || '',
              
              // Información adicional del inventario
              'Estado': item.state || '',
              'Color interior': item.interior_color || '',
              'Color exterior': item.exterior_color || '',
              'Cantidad': item.amount || '',
              'Kilometraje': item.km || '',
              
              // Información de Salesforce
              'Enviado a SF': item.sendedSalesForce === '1' ? 'Sí' : 'No',
              'ID Salesforce': item.idSalesForce || '',
              'Resultado SF': item.resultSF || '',
              'Insertado Correctamente': item.insertCorrect === '1' ? 'Sí' : 'No',
              
              // Timestamps
              'Timestamp DMS': item.timestamp_dms || '',
              'Timestamp': item.timestamp || '',
              'Timestamp SalesForce': item.timestamp_sales_force || '',
            }));

            // Crear libro de Excel
            const worksheet = XLSX.utils.json_to_sheet(excelData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Inventario');

            // Configurar el ancho de las columnas
            const columnWidths = excelData.length > 0 ? 
              Object.keys(excelData[0]).map(() => ({ wch: 15 })) : [];
            worksheet['!cols'] = columnWidths;

            // Generar nombre del archivo con timestamp y total de registros
            const now = new Date();
            const timestamp = now.toISOString().slice(0, 19).replace(/[:-]/g, '');
            const fileName = `inventario_${allData.length}_registros_${timestamp}.xlsx`;

            // Descargar el archivo
            XLSX.writeFile(workbook, fileName);

            console.log(`Excel de inventario generado exitosamente: ${fileName}`);
            console.log(`${excelData.length} registros exportados con todos los campos`);

          } catch (error) {
            console.error('⚠️ Error al generar Excel de inventario:', error);
          } finally {
            this.isDownloadingExcel = false;
          }
        },
        error: (error) => {
          console.error('⚠️ Error al obtener datos de inventario para Excel:', error);
          this.isDownloadingExcel = false;
        }
      });
  }
}
