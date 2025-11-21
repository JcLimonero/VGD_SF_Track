import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from '../../generic-table/generic-table.component';
import { TableColumn } from '../../../../@vex/interfaces/table-column.interface';
import { VanguardiaApiService } from '../../../services/vanguardia-api.service';
import { forkJoin } from 'rxjs';
import * as XLSX from 'xlsx';

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

  ///filtros
  currentFilters: { idAgency?: string } = {};
  isDownloadingExcel = false;

  // Columnas para tabla de clientes
  columns: TableColumn<any>[] = [
    { property: 'agencyName', label: 'Agencia', type: 'text' },
    { property: 'bussines_name', label: 'Nombre', type: 'text' },
    { property: 'mobile_phone', label: 'Celular', type: 'text' },
    { property: 'phone', label: 'Teléfono', type: 'text' },
    { property: 'mail', label: 'Email', type: 'text' },
    { property: 'street', label: 'Calle', type: 'text' },
    { property: 'external_number', label: 'Número', type: 'text' },
    { property: 'city', label: 'Ciudad', type: 'text' },
    { property: 'actions', label: 'Detalles', type: 'button' }
  ];

  displayedColumns: string[] = [
    'agencyName',
    'bussines_name',
    'mobile_phone',
    'phone',
    'mail',
    'street',
    'external_number',
    'city',
    'actions'
  ];

  get hasActiveFilters(): boolean {
    return !!this.currentFilters.idAgency;
  }

  constructor(private vanguardiaApi: VanguardiaApiService) {}

  ngOnInit(): void {
    this.loadPage(this.pageIndex, this.defaultPageSize);
  }

  loadPage(pageIndex: number, pageSize: number): void {
    this.loading = true;
    this.error = null;

    // Server-side pagination - igual que invoice-table
    const params: any = {
      page: pageIndex + 1, // API usa 1-indexed
      perpage: pageSize // Tamaño de página
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

  applyFilter(filters: { idAgency?: string }): void {
    //guardar filtros y reiniciar a primera página
    this.currentFilters = { ...filters };
    this.pageIndex = 0;
    this.loadPage(this.pageIndex, this.defaultPageSize);
  }

  downloadExcel(): void {
    if (!this.total || this.total === 0) {
      console.warn('No hay datos de clientes para descargar');
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
      pageRequests.push(this.vanguardiaApi.getCustomers(params));
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
            // Información de Agencia
            'Agencia': item.agencyName || '',
            'ID Agencia': item.idAgency || '',
            
            // Datos del Cliente
            'No. Cliente DMS': item.ndClientDMS || '',
            'Nombre': item.name || '',
            'Apellido Paterno': item.paternal_surname || '',
            'Apellido Materno': item.maternal_surname || '',
            'Nombre Comercial': item.bussines_name || '',
            'RFC': item.rfc || '',
            'CURP': item.curp || '',
            
            // Contacto
            'Teléfono Móvil': item.mobile_phone || '',
            'Teléfono': item.phone || '',
            'Otro Teléfono': item.other_phone || '',
            'Email': item.mail || '',
            
            // Datos Adicionales
            'Actividad': item.activitie || '',
            'Fecha de Nacimiento': item.birthay_date || '',
            'Género': item.gender || '',
            'Tipo de Cliente': item.costumer_type || '',
            'Última Venta': item.last_sale || '',
            
            // Dirección
            'Calle': item.street || '',
            'No. Exterior': item.external_number || '',
            'No. Interior': item.internal_number || '',
            'Código Postal': item.zipcode || '',
            'Colonia': item.settlement || '',
            'Delegación': item.deputation || '',
            'Ciudad': item.city || '',
            'Estado': item.state || '',
            'País': item.country || '',
            
            // Timestamps
            'Timestamp DMS': item.timestamp_dms || '',
            'Timestamp': item.timestamp || '',
            'Consolidado': item.is_consolidated === '1' ? 'Sí' : 'No'
          }));

          // Crear libro de Excel
          const worksheet = XLSX.utils.json_to_sheet(excelData);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, 'Clientes');

          // Configurar el ancho de las columnas
          const columnWidths =
            excelData.length > 0
              ? Object.keys(excelData[0]).map(() => ({ wch: 15 }))
              : [];
          worksheet['!cols'] = columnWidths;

          // Generar nombre del archivo con timestamp y total de registros
          const now = new Date();
          const timestamp = now.toISOString().slice(0, 19).replace(/[:-]/g, '');
          const fileName = `clientes_${allData.length}_registros_${timestamp}.xlsx`;

          // Descargar el archivo
          XLSX.writeFile(workbook, fileName);

          console.log(`Excel de clientes generado exitosamente: ${fileName}`);
          console.log(
            `${excelData.length} registros exportados con todos los campos`
          );
        } catch (error) {
          console.error('⚠️ Error al generar Excel de clientes:', error);
        } finally {
          this.isDownloadingExcel = false;
        }
      },
      error: (error) => {
        console.error(
          '⚠️ Error al obtener datos de inventario para Excel:',
          error
        );
        this.isDownloadingExcel = false;
      }
    });
  }
}
