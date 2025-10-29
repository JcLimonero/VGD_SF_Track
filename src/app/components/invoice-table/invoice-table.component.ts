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
  serverPageSize = 5; // El API siempre devuelve 5 registros por página
  pageIndex = 0;
  currentFilters: { order_dms?: string; vin?: string; reference?: string; sendedSalesForce?: '1'|'0'; insertado?: boolean; error?: boolean } = {};
  currentSort: { column: string; direction: 'asc' | 'desc' } | null = null;

  // Columnas para mostrar datos del inventario (basadas en los datos del mock)
  columns: TableColumn<any>[] = [
    { label: 'Agencia', property: 'agencyName', type: 'text' },
    { label: 'Número de venta', property: 'order_dms', type: 'text' },
    { label: 'VIN', property: 'vin', type: 'text' },
    { label: 'Referencia de venta', property: 'invoice_reference', type: 'text' },
    { label: 'Envio SF', property: 'sendedSalesForce', type: 'text' },
    { label: 'Fecha SF', property: 'timestamp_sales_force', type: 'text' },
    { label: 'Estado SF', property: 'resultSF', type: 'text' },
    { label: 'Datos', property: 'sf_jsonRequest', type: 'button' },
    { label: 'Detalles', property: 'actions', type: 'button' }
  ];

  displayedColumns: string[] = ['agencyName','order_dms', 'vin','invoice_reference', 'sendedSalesForce', 'timestamp_sales_force', 'resultSF','sf_jsonRequest', 'actions'];

  constructor(private vanguardiaApi: VanguardiaApiService) {}

  ngOnInit(): void {
    this.loadPage(this.pageIndex, this.serverPageSize);
  }

  /**
   * Carga los datos desde la API de Vanguardia
   */

loadPage(pageIndex: number, pageSize: number): void {
  this.loading = true;
  this.error = null;

  // El API solo acepta 'page' y siempre devuelve 5 registros
  const params: any = {
    page: pageIndex + 1  // API usa 1-indexed
  };

  // Map current filters to params
  if (this.currentFilters.order_dms) params.order_dms = this.currentFilters.order_dms;
  if (this.currentFilters.vin) params.vin = this.currentFilters.vin;
  if (this.currentFilters.reference) params.invoice_reference = this.currentFilters.reference;
  if (this.currentFilters.sendedSalesForce) params.sendedSalesForce = this.currentFilters.sendedSalesForce;
  if (this.currentFilters.insertado && !this.currentFilters.error) params.resultSF = 'Insert Correct';
  if (this.currentFilters.error && !this.currentFilters.insertado) params.resultSF_ne = 'Insert Correct';

  // Agregar ordenamiento si existe
  if (this.currentSort && this.currentSort.column) {
    params._sort = this.currentSort.column;
    params._order = this.currentSort.direction;
    console.log('📊 Aplicando ordenamiento:', params._sort, params._order);
  }

  this.vanguardiaApi.getInvoicesPaged(params).subscribe({
    next: (res) => {
      this.data = res.items;
      
      // Si hay ordenamiento activo y los datos no vienen ordenados de la API,
      // ordenar del lado del cliente
      if (this.currentSort && this.currentSort.column) {
        console.log('📋 Datos ANTES de ordenar:', this.data.map(d => ({ 
          order_dms: d.order_dms, 
          timestamp_sales_force: d.timestamp_sales_force 
        })));
        this.data = this.sortData(this.data, this.currentSort.column, this.currentSort.direction);
        console.log('📋 Datos DESPUÉS de ordenar:', this.data.map(d => ({ 
          order_dms: d.order_dms, 
          timestamp_sales_force: d.timestamp_sales_force 
        })));
      }
      
      this.total = res.total;
      this.pageIndex = pageIndex;
      this.loading = false;
      console.log('Inventario paginado:', this.data.length, 'registros de', this.total, '(página', pageIndex + 1, ')');
    },
    error: (err: any) => {
      console.error('Error al cargar inventario (paginado):', err);
      this.error = 'Error al cargar los datos del inventario';
      this.data = [];
      this.loading = false;
    }
  });
}

private sortData(data: any[], column: string, direction: 'asc' | 'desc'): any[] {
  return [...data].sort((a, b) => {
    const aVal = this.getNestedValue(a, column);
    const bVal = this.getNestedValue(b, column);
    
    // Manejar valores nulos/undefined/vacíos
    const aEmpty = aVal == null || aVal === '' || aVal === 'null' || aVal === 'undefined';
    const bEmpty = bVal == null || bVal === '' || bVal === 'null' || bVal === 'undefined';
    
    if (aEmpty && bEmpty) return 0;
    if (aEmpty) return 1; // Los vacíos al final
    if (bEmpty) return -1;
    
    let comparison = 0;
    
    // Ordenamiento especial para order_dms (números como strings)
    if (column === 'order_dms') {
      const numA = parseInt(String(aVal).replace(/\D/g, ''), 10);
      const numB = parseInt(String(bVal).replace(/\D/g, ''), 10);
      
      if (isNaN(numA) && isNaN(numB)) return 0;
      if (isNaN(numA)) return 1;
      if (isNaN(numB)) return -1;
      
      comparison = numA - numB;
      console.log(`Comparando order_dms: ${aVal} (${numA}) vs ${bVal} (${numB}) = ${comparison}`);
    }
    // Ordenamiento especial para timestamp_sales_force (fechas)
    else if (column === 'timestamp_sales_force') {
      const dateA = new Date(aVal);
      const dateB = new Date(bVal);
      
      if (isNaN(dateA.getTime()) && isNaN(dateB.getTime())) return 0;
      if (isNaN(dateA.getTime())) return 1;
      if (isNaN(dateB.getTime())) return -1;
      
      comparison = dateA.getTime() - dateB.getTime();
      console.log(`Comparando fecha: ${aVal} (${dateA.getTime()}) vs ${bVal} (${dateB.getTime()}) = ${comparison}`);
    }
    // Comparación genérica
    else if (typeof aVal === 'string' && typeof bVal === 'string') {
      comparison = aVal.localeCompare(bVal);
    } else if (typeof aVal === 'number' && typeof bVal === 'number') {
      comparison = aVal - bVal;
    } else {
      comparison = String(aVal).localeCompare(String(bVal));
    }
    
    return direction === 'asc' ? comparison : -comparison;
  });
}

private getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, prop) => current?.[prop], obj);
}

applyFilter(filters: { order_dms?: string; vin?: string; reference?: string; sendedSalesForce?: '1' | '0'; insertado?: boolean; error?: boolean }): void {
  // Guardar filtros y reiniciar a primera página
  this.currentFilters = { ...filters };
  this.pageIndex = 0;
  this.loadPage(this.pageIndex, this.serverPageSize);
}

onSortChange(sort: { column: string; direction: 'asc' | 'desc' }): void {
  console.log('🔄 Ordenamiento cambiado:', sort);
  // Si column está vacío, resetear ordenamiento
  if (!sort.column) {
    this.currentSort = null;
  } else {
    this.currentSort = sort;
  }
  // Reiniciar a primera página al cambiar ordenamiento
  this.pageIndex = 0;
  this.loadPage(this.pageIndex, this.serverPageSize);
}

  /**
   * Recarga los datos del inventario
   */
  refreshData(): void {
    this.loadPage(this.pageIndex, this.serverPageSize);
  }

  /**
   * Maneja las acciones de los botones en la tabla
   */
  onActionClick(item: any, action: string): void {
    console.log('Acción:', action, 'Item:', item);
    // Aquí puedes implementar las acciones específicas
  }


}

