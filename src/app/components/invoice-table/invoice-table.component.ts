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

  // Columnas para mostrar datos del inventario (basadas en los datos del mock)
  columns: TableColumn<any>[] = [
    { label: 'Agencia', property: 'agencyName', type: 'text' },
    { label: 'Número de venta', property: 'order_dms', type: 'text' },
    { label: 'VIN', property: 'vin', type: 'text' },
    { label: 'Referencia de venta', property: 'invoice_reference', type: 'text' },
    { label: 'Envio SF', property: 'sendedSalesForce', type: 'text' },
    { label: 'Fecha SF', property: 'timestamp_sales_force', type: 'text' },
    { label: 'Estado SF', property: 'resultSF', type: 'text' },
    { label: 'Acciones', property: 'actions', type: 'button' }
  ];

  displayedColumns: string[] = ['agencyName','order_dms', 'vin','invoice_reference', 'sendedSalesForce', 'timestamp_sales_force', 'resultSF', 'actions'];

  constructor(private vanguardiaApi: VanguardiaApiService) {}

  ngOnInit(): void {
    this.loadInvoices();
  }

  /**
   * Carga los datos desde la API de Vanguardia
   */

private loadInvoices(): void {
  this.loading = true;
  this.error = null;

  this.vanguardiaApi.getInvoices().subscribe({
    next: (data: any[]) => {
      this.data = data;
      this.loading = false;
      console.log('Inventario cargado exitosamente:', this.data.length, 'registros');
    },
    error: (err: any) => {
      console.error('Error al cargar inventario desde API de Vanguardia:', err);
      this.error = 'Error al cargar los datos del inventario';
      this.data = [];
      this.loading = false;
    }
  });
}

applyFilter(filters: { order_dms?: string; vin?: string; reference?: string }): void {
  this.loading = true;
  this.error = null;

  let request$;

  if (filters.order_dms) {
    request$ = this.vanguardiaApi.getInvoicesbyOrder_dms(filters.order_dms);
  } else if (filters.vin) {
    request$ = this.vanguardiaApi.getInvoicesbyVin(filters.vin);
  } else if (filters.reference) {
    request$ = this.vanguardiaApi.getInvoicesbyReference(filters.reference);
  } else {
    // Si no hay filtros, obtener todo
    request$ = this.vanguardiaApi.getInvoices();
  }

  request$.subscribe({
    next: (data: any[]) => {
      this.data = data;
      this.loading = false;
      console.log(' Datos filtrados cargados:', this.data.length);
    },
    error: (err: any) => {
      console.error(' Error al filtrar datos:', err);
      this.error = 'Error al filtrar datos';
      this.data = [];
      this.loading = false;
    }
  });
}

// private loadInventory(): void {
//   this.loading = true;
//   this.error = null;

//   // Paso 1: Login automático
//   this.vanguardiaApi.loginInvisible().pipe(
//   switchMap(() => this.vanguardiaApi.getInventory())
// ).subscribe({
//   next: (data: any[]) => {
//     this.data = data;
//     this.loading = false;
//     console.log('✅ Inventario cargado exitosamente:', this.data.length, 'registros');
//   },
//   error: (err: any) => {
//     console.error('❌ Error al cargar inventario:', err);
//     this.error = 'Error al cargar los datos del inventario';
//     this.data = [];
//     this.loading = false;
//   }
// });

//   // this.vanguardiaApi.loginInvisible().pipe(
//   //   // Paso 2: una vez logueado, obtener inventario
//   //   switchMap(() => this.vanguardiaApi.getInventory())
//   // ).subscribe({
//   //   next: (response: { data: any[]; }) => {
      
//   //     this.data = Array.isArray(response?.data) ? response.data : [];
//   //     this.loading = false;
//   //     console.log('Inventario cargado exitosamente:', this.data.length, 'registros');
//   //   },
//   //   error: (err: any) => {
//   //     console.error('Error al cargar inventario desde API de Vanguardia:', err);
//   //     this.error = 'Error al cargar los datos del inventario';
//   //     this.data = [];
//   //     this.loading = false;
//   //   }
//   // });
// }


  /**
   * Recarga los datos del inventario
   */
  refreshData(): void {
    this.loadInvoices();
  }

  /**
   * Maneja las acciones de los botones en la tabla
   */
  onActionClick(item: any, action: string): void {
    console.log('Acción:', action, 'Item:', item);
    // Aquí puedes implementar las acciones específicas
  }


}

