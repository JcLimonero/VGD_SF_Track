import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from '../generic-table/generic-table.component';
import { TableColumn } from '../../../@vex/interfaces/table-column.interface';
import { VanguardiaApiService } from '../../services/vanguardia-api.service';
import { map, tap, switchMap } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import * as XLSX from 'xlsx';

@Component({
  selector: 'vex-invoice-table',
  standalone: true,
  imports: [CommonModule, GenericTableComponent],
  templateUrl: './invoice-table.component.html',
  styleUrls: ['./invoice-table.component.scss']
})

export class InvoiceTableComponent implements OnInit {

  // Datos del inventario desde la API de Vanguardia
  data: any[] = [];
  loading = false;
  error: string | null = null;
  total = 0;
  defaultPageSize = 5; // Tamaño por defecto
  pageIndex = 0;
  currentFilters: { order_dms?: string; vin?: string; reference?: string; agencyName?: string; sendedSalesForce?: '1'|'0'; insertado?: boolean; error?: boolean } = {};
  currentSort: { column: string; direction: 'asc' | 'desc' } | null = { column: 'billing_date', direction: 'desc' };
  isDownloadingExcel = false;

  // Columnas para mostrar datos del inventario (basadas en los datos del mock)
  columns: TableColumn<any>[] = [
    { label: 'Agencia', property: 'agencyName', type: 'text' },
    { label: 'Número de orden', property: 'order_dms', type: 'text' },
    { label: 'VIN', property: 'vin', type: 'text' },
    { label: 'Fecha Facturación', property: 'billing_date', type: 'text' },
    { label: 'Número de factura', property: 'invoice_reference', type: 'text' },
    { label: 'Envio SF', property: 'sendedSalesForce', type: 'text' },
    { label: 'Fecha SF', property: 'timestamp_sales_force', type: 'text' },
    { label: 'Estado SF', property: 'resultSF', type: 'text' },
    { label: 'Datos', property: 'sf_jsonRequest', type: 'button' },
    { label: 'Ver SF', property: 'sf_link', type: 'button' },
    { label: 'Detalles', property: 'actions', type: 'button' }
  ];

  displayedColumns: string[] = ['agencyName','order_dms', 'vin','billing_date','invoice_reference', 'sendedSalesForce', 'timestamp_sales_force', 'resultSF','sf_jsonRequest', 'sf_link', 'actions'];

  constructor(private vanguardiaApi: VanguardiaApiService) {}

  get hasActiveFilters(): boolean {
    return !!(
      this.currentFilters.order_dms ||
      this.currentFilters.vin ||
      this.currentFilters.reference ||
      this.currentFilters.agencyName ||
      this.currentFilters.sendedSalesForce ||
      this.currentFilters.insertado ||
      this.currentFilters.error
    );
  }

  ngOnInit(): void {
    this.loadPage(this.pageIndex, this.defaultPageSize);
  }

  /**
   * Carga los datos desde la API de Vanguardia
   */

loadPage(pageIndex: number, pageSize: number): void {
  this.loading = true;
  this.error = null;

  
  // Ahora la API acepta 'page' y 'perpage'
  const params: any = {
    page: pageIndex + 1,  // API usa 1-indexed
    perpage: pageSize     // Agregar el tamaño de pagina
  };

  // Map current filters to params
  if (this.currentFilters.order_dms) params.order_dms = this.currentFilters.order_dms;
  if (this.currentFilters.vin) params.vin = this.currentFilters.vin;
  if (this.currentFilters.reference) params.invoice_reference = this.currentFilters.reference;
  if (this.currentFilters.agencyName) params.agencyName = this.currentFilters.agencyName;
  if (this.currentFilters.sendedSalesForce) params.sendedSalesForce = this.currentFilters.sendedSalesForce;
  if (this.currentFilters.insertado && !this.currentFilters.error) params.insertCorrect = '1';
  if (this.currentFilters.error && !this.currentFilters.insertado) params.insertCorrect = '0';

  // Agregar ordenamiento si existe
  if (this.currentSort && this.currentSort.column) {
    params.orderby = this.currentSort.column;
    params.ordertype = this.currentSort.direction;
  }

  //enviar parametros para carga de datos inicial ordenada
  this.vanguardiaApi.getInvoicesPaged(params).subscribe({
    next: (res) => {
      this.data = res.items;
      this.total = res.total;
      this.pageIndex = pageIndex;
      this.loading = false;
    },
    error: (err: any) => {
      console.error('Error al cargar inventario (paginado):', err);
      this.error = 'Error al cargar los datos del inventario';
      this.data = [];
      this.loading = false;
    }
  });
}

applyFilter(filters: { order_dms?: string; vin?: string; reference?: string; agencyName?: string; sendedSalesForce?: '1' | '0'; insertado?: boolean; error?: boolean }): void {
  console.log('ApplyFilter recibido:', filters);
  // Guardar filtros y reiniciar a primera página
  this.currentFilters = { ...filters };
  this.pageIndex = 0;
  this.loadPage(this.pageIndex, this.defaultPageSize);
}

onSortChange(sort: { column: string; direction: 'asc' | 'desc' }): void {
  console.log('Ordenamiento cambiado:', sort);
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

  /**
   * Recarga los datos del inventario
   */
  refreshData(): void {
    this.loadPage(this.pageIndex, this.defaultPageSize);
  }

  /**
   * Maneja las acciones de los botones en la tabla
   */
  onActionClick(item: any, action: string): void {
    console.log('Acción:', action, 'Item:', item);
    // Aquí puedes implementar las acciones específicas
  }

  /**
   * Descarga los datos actuales en formato Excel - TODOS los registros con filtros aplicados
   * Maneja paginación múltiple para obtener todos los registros
   */
  downloadExcel(): void {
    if (this.total === 0) {
      console.warn('No hay datos para descargar');
      return;
    }

    this.isDownloadingExcel = true;
    
    // Calcular cuántas páginas necesitamos (asumiendo límite de 100 por página)
    const maxPerPage = 100;
    const totalPages = Math.ceil(this.total / maxPerPage);
    
    console.log(`📥 Descargando ${this.total} registros en ${totalPages} páginas`);

    // Preparar parámetros base
    const baseParams: any = {
      perpage: maxPerPage
    };

    // Aplicar los mismos filtros que están actualmente activos
    if (this.currentFilters.order_dms) baseParams.order_dms = this.currentFilters.order_dms;
    if (this.currentFilters.vin) baseParams.vin = this.currentFilters.vin;
    if (this.currentFilters.reference) baseParams.invoice_reference = this.currentFilters.reference;
    if (this.currentFilters.agencyName) baseParams.agencyName = this.currentFilters.agencyName;
    if (this.currentFilters.sendedSalesForce) baseParams.sendedSalesForce = this.currentFilters.sendedSalesForce;
    if (this.currentFilters.insertado && !this.currentFilters.error) baseParams.insertCorrect = '1';
    if (this.currentFilters.error && !this.currentFilters.insertado) baseParams.insertCorrect = '0';

    // Aplicar el mismo ordenamiento
    if (this.currentSort && this.currentSort.column) {
      baseParams.orderby = this.currentSort.column;
      baseParams.ordertype = this.currentSort.direction;
    }

    // Crear array de observables para todas las páginas
    const pageRequests = [];
    for (let page = 1; page <= totalPages; page++) {
      const params = { ...baseParams, page };
      pageRequests.push(this.vanguardiaApi.getInvoicesPaged(params));
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

            console.log(`Datos obtenidos para Excel: ${allData.length} registros de ${this.total} esperados`);

            // Preparar los datos para Excel con TODOS los campos disponibles
            const excelData = allData.map(item => ({
              // Campos básicos de identificación
              'Agencia': item.agencyName || '',
              'Número de Orden': item.order_dms || '',
              'Estado': item.state || '',
              'VIN': item.vin || '',
              
              // Fechas importantes
              'Fecha Inicio Garantía': item.warranty_init_date || '',
              'Fecha Facturación': item.billing_date || '',
              'Fecha Entrega': item.delivery_date || '',
              
              // Información del vehículo
              'Placas': item.plates || '',
              
              // Información de pago
              'Método de Pago': item.payment_method || '',
              'Referencia de Venta': item.invoice_reference || '',
              
              // Información de Salesforce
              'Enviado a SF': item.sendedSalesForce === '1' ? 'Sí' : 'No',
              'ID Salesforce': item.idSalesForce || '',
              'Resultado SF': item.resultSF || '',
              'Intentos SF': item.sf_attempts || '',
              'Insertado Correctamente': item.insertCorrect === '1' ? 'Sí' : 'No',
              
              // Timestamps
              'Timestamp DMS': item.timestamp_dms || '',
              'Timestamp': item.timestamp || '',
              'Timestamp SalesForce': item.timestamp_sales_force || '',
              
              // JSON y datos técnicos (truncados para Excel)
              'JSON Request SF': item.sf_jsonRequest || '',
              'JSON Response SF': item.sf_jsonResponse || '',
            }));

            // Crear libro de Excel
            const worksheet = XLSX.utils.json_to_sheet(excelData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Facturas');

            // Configurar el ancho de las columnas
            const columnWidths = excelData.length > 0 ? 
              Object.keys(excelData[0]).map(() => ({ wch: 15 })) : [];
            worksheet['!cols'] = columnWidths;

            // Generar nombre del archivo con timestamp y total de registros
            const now = new Date();
            const timestamp = now.toISOString().slice(0, 19).replace(/[:-]/g, '');
            const fileName = `facturas_${allData.length}_registros_${timestamp}.xlsx`;

            // Descargar el archivo
            XLSX.writeFile(workbook, fileName);

            console.log(`Excel generado exitosamente: ${fileName}`);
            console.log(`${excelData.length} registros exportados con todos los campos`);

          } catch (error) {
            console.error(' Error al generar Excel:', error);
          } finally {
            this.isDownloadingExcel = false;
          }
        },
        error: (error) => {
          console.error(' Error al obtener datos para Excel:', error);
          this.isDownloadingExcel = false;
        }
      });
  }


}

