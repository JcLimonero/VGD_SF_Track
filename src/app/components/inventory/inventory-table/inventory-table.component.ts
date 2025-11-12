// COPIADO EXACTO de invoice-table con server-side pagination
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from '../../generic-table/generic-table.component';
import { VanguardiaApiService } from '../../../services/vanguardia-api.service';
import { TableColumn } from '../../../../@vex/interfaces/table-column.interface';

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
  
  // Columnas para inventario
  columns: TableColumn<any>[] = [
    { property: 'agencyName', label: 'Agencia', type: 'text' },
    { property: 'vin', label: 'VIN', type: 'text' },
    { property: 'brand', label: 'Marca', type: 'text' },
    { property: 'year', label: 'Año', type: 'text' },
    { property: 'model', label: 'Modelo', type: 'text' },
    { property: 'version', label: 'Versión', type: 'text' }
  ];

  displayedColumns: string[] = ['agencyName', 'vin', 'brand', 'year', 'model', 'version'];

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

    // Usar getInventory con parámetros (server-side pagination)
    this.vanguardiaApi.getInventory(params).subscribe({
      next: (res) => {
        this.data = res.items || [];
        this.total = res.total || 0;
        this.pageIndex = pageIndex;
        this.loading = false;
        console.log('✅ Inventario paginado cargado:', this.data.length, 'registros en página', pageIndex + 1, 'de', res.total, 'total');
        console.log('📊 Respuesta completa API:', res);
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
    console.log('📄 Cambio de página:', event);
    this.currentPageSize = event.pageSize; // Actualizar pageSize actual
    this.loadPage(event.pageIndex, event.pageSize);
  }
}
