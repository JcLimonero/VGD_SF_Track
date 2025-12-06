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
  currentFilters: {
    idAgency?: string;
    mail?: string;
    mobile_phone?: string;
    sendedSalesForce?: '1' | '0';
    insertado?: boolean;
    error?: boolean;
  } = {};
  isDownloadingExcel = false;
  currentSort: { column: string; direction: 'asc' | 'desc' } | null = { column: 'timestamp_sales_force', direction: 'desc' };

  // Columnas para tabla de clientes
  columns: TableColumn<any>[] = [
    { property: 'agencyName', label: 'Agencia', type: 'text' },
    { property: 'bussines_name', label: 'Nombre', type: 'text' },
    { property: 'mobile_phone', label: 'Celular', type: 'text' },
    { property: 'phone', label: 'Teléfono', type: 'text' },
    { property: 'mail', label: 'Email', type: 'text' },
    { property: 'sendedSalesForce', label: 'Envio SF', type: 'text' },
    { property: 'timestamp_sales_force',label: 'Fecha SF',  type: 'text' },
    { property: 'resultSF',label: 'Estado SF',  type: 'text' },
    { property: 'sf_jsonRequest',label: 'Datos',  type: 'button' },
    { property: 'sf_link',label: 'Ver SF',  type: 'button' },
    { property: 'actions', label: 'Detalles', type: 'button' }
  ];

  displayedColumns: string[] = [
    'agencyName',
    'bussines_name',
    'mobile_phone',
    'phone',
    'mail',
    'sendedSalesForce',
    'timestamp_sales_force',
    'resultSF',
    'sf_jsonRequest',
    'sf_link',
    'actions'
  ];

  get hasActiveFilters(): boolean {
    return !!(
      this.currentFilters.idAgency ||
      this.currentFilters.mail ||
      this.currentFilters.mobile_phone ||
      this.currentFilters.sendedSalesForce ||
      this.currentFilters.insertado ||
      this.currentFilters.error
    );
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

    // Map current filters to params
    if (this.currentFilters.idAgency) params.idAgency = this.currentFilters.idAgency;
    if (this.currentFilters.mail) params.mail = this.currentFilters.mail;
    if (this.currentFilters.mobile_phone) params.mobile_phone = this.currentFilters.mobile_phone;
    if (this.currentFilters.sendedSalesForce) params.sendedSalesForce = this.currentFilters.sendedSalesForce;
    if (this.currentFilters.insertado) params.insertCorrect = '1';
    if (this.currentFilters.error) params.insertCorrect = '0';

    // Agregar ordenamiento si existe
    if (this.currentSort && this.currentSort.column) {
      params.orderby = this.currentSort.column;
      params.ordertype = this.currentSort.direction;
    }

    // Usar getCustomers con parámetros (server-side pagination)
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

  applyFilter(filters: {
    idAgency?: string;
    mail?: string;
    mobile_phone?: string;
    sendedSalesForce?: '1' | '0';
    insertado?: boolean;
    error?: boolean;
  }): void {
    //guardar filtros y reiniciar a primera página
    this.currentFilters = { ...filters };
    this.pageIndex = 0;
    this.loadPage(this.pageIndex, this.defaultPageSize);
  }

  onSortChange(sort: { column: string; direction: 'asc' | 'desc' }): void {
    console.log('Ordenamiento Customer cambiado:', sort);
    if (!sort.column) {
      this.currentSort = null;
    } else {
      this.currentSort = sort;
    }
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
    if (this.currentFilters.mail)
      baseParams.mail = this.currentFilters.mail;
    if (this.currentFilters.mobile_phone)
      baseParams.mobile_phone = this.currentFilters.mobile_phone;
    if (this.currentFilters.sendedSalesForce)
      baseParams.sendedSalesForce = this.currentFilters.sendedSalesForce;
    if (this.currentFilters.insertado)
      baseParams.insertCorrect = '1';
    if (this.currentFilters.error)
      baseParams.insertCorrect = '0';

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
            'Segundo Nombre': item.second_name || '',
            'Apellidos': item.last_name || '',
            'Nombre Comercial': item.bussines_name || '',
            'RFC': item.rfc || '',
            'CURP': item.curp || '',
            'Fecha de Nacimiento': item.birthay_date || '',
            'Género': item.gender || '',
            'Saludo': item.salutation || '',
            'Tipo de Cliente': item.costumer_type || '',
            
            // Contacto
            'Teléfono Móvil': item.mobile_phone || '',
            'Teléfono': item.phone || '',
            'Otro Teléfono': item.other_phone || '',
            'Tel. Asistente': item.assitant_phone || '',
            'Tel. Oficina': item.office_phone || '',
            'Email': item.mail || '',
            
            // Dirección
            'Calle': item.street || '',
            'No. Exterior': item.external_number || '',
            'No. Interior': item.internal_number || '',
            'Entre Calles': item.between_streets || '',
            'Código Postal': item.zipcode || '',
            'Colonia': item.settlement || '',
            'Delegación/Municipio': item.deputation || '',
            'Ciudad': item.city || '',
            'Estado': item.state || '',
            'País': item.country || '',
            
            // Datos Adicionales
            'Ocupación': item.activitie || '',
            'Cargo/Nombramiento': item.appointment || '',
            'Permite Contacto': item.allow_contact === '1' ? 'Sí' : 'No',
            'Clasificación': item.clasification || '',
            
            // Vendedor
            'No. Vendedor': item.ndSeller || '',
            'Nombre Vendedor': item.seller_Name || '',
            'Última Venta': item.last_sale || '',
            
            // Salesforce
            'Enviado a SF': item.sendedSalesForce === '1' ? 'Sí' : 'No',
            'ID Salesforce': item.idSalesForce || '',
            'Resultado SF': item.resultSF || '',
            'Timestamp SF': item.timestamp_sales_force || '',
            
            // Timestamps
            'Timestamp DMS': item.timestamp_dms || '',
            'Timestamp': item.timestamp || ''
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
