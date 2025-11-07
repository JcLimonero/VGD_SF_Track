import { Component, OnInit } from '@angular/core';
import { GenericTableComponent } from '../generic-table/generic-table.component';
import { TableColumn } from '../../../@vex/interfaces/table-column.interface';
import { VanguardiaApiService } from '../../services/vanguardia-api.service';
import { map, tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'vex-invoice-table',
  standalone: true,
  imports: [GenericTableComponent],
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

  // Columnas para mostrar datos del inventario (basadas en los datos del mock)
  columns: TableColumn<any>[] = [
    { label: 'Agencia', property: 'agencyName', type: 'text' },
    { label: 'Número de orden', property: 'order_dms', type: 'text' },
    { label: 'VIN', property: 'vin', type: 'text' },
    { label: 'Fecha Facturación', property: 'billing_date', type: 'text' },
    { label: 'Referencia de venta', property: 'invoice_reference', type: 'text' },
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

  console.log('📋 Cargando página con filtros actuales:', this.currentFilters);

  // Ahora la API acepta 'page' y 'perpage'
  const params: any = {
    page: pageIndex + 1,  // API usa 1-indexed
    perpage: pageSize     // Agregar el tamaño de página
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

  console.log('📋 Parámetros enviados a la API:', params);

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
  console.log('📋 ApplyFilter recibido:', filters);
  // Guardar filtros y reiniciar a primera página
  this.currentFilters = { ...filters };
  this.pageIndex = 0;
  this.loadPage(this.pageIndex, this.defaultPageSize);
}

onSortChange(sort: { column: string; direction: 'asc' | 'desc' }): void {
  console.log('🔄 Ordenamiento cambiado:', sort);
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


}

