import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from '../../generic-table/generic-table.component';
import { TableColumn } from '../../../../@vex/interfaces/table-column.interface';
import { VanguardiaApiService } from '../../../services/vanguardia-api.service';


@Component({
  selector: 'vex-customer-table',
  standalone: true,
  imports: [CommonModule, GenericTableComponent],
  templateUrl: './customer-table.component.html',
  styleUrl: './customer-table.component.scss'
})
export class CustomerTableComponent implements OnInit {

  data: any[] = []; ///objeto de datos
  loading = false;
  error: string | null = null;
  total: number | null = null;
  
  // Paginación - respetando el default de la API
  pageIndex = 0;
  defaultPageSize = 5; // API devuelve 5 por defecto
  currentPageSize = 5; // Mantenemos el pageSize actual

 // Columnas para tabla de clientes
  columns: TableColumn<any>[] = [
    { property: 'agencyName', label: 'Agencia', type: 'text' },
    { property: 'bussines_name', label: 'Nombre', type: 'text' },
    { property: 'mobile_phone', label: 'Celular', type: 'text' },
    { property: 'phone', label: 'Teléfono', type: 'text' },
    { property: 'mail', label: 'Email', type: 'text' },
    { property: 'street',label: 'Calle',  type: 'text' },
    { property: 'external_number',label: 'Número',  type: 'text' },
    { property: 'city',label: 'Ciudad',  type: 'text' },
    { property: 'actions',label: 'Detalles',  type: 'button' }
    
  ];

  displayedColumns: string[] = ['agencyName', 'bussines_name', 'mobile_phone', 'phone', 'mail', 'street', 'external_number', 'city', 'actions'];

  constructor(private vanguardiaApi: VanguardiaApiService) {}

  ngOnInit(): void {
    this.loadPage(this.pageIndex, this.defaultPageSize);
  }

  loadPage(pageIndex: number, pageSize: number): void {
    this.loading = true;
    this.error = null;

    // Server-side pagination - igual que invoice-table
    const params: any = {
      page: pageIndex + 1,  // API usa 1-indexed
      perpage: pageSize     // Tamaño de página
    };


    // Usar getInventory con parámetros (server-side pagination)
    this.vanguardiaApi.getCustomers(params).subscribe({
      next: (res) => {
        this.data = res.items || [];
        this.total = res.total || 0;
        this.pageIndex = pageIndex;
        this.loading = false;
      },
      error: (error) => {
        this.error = 'Error al cargar el inventario';
        this.data = [];
        this.total = 0;
        this.loading = false;
      }
    });
  }
  
}
