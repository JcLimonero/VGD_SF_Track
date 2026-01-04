import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GenericTableComponent } from '../../generic-table/generic-table.component';
import { TableColumn } from '../../../../@vex/interfaces/table-column.interface';
import { VanguardiaApiService } from '../../../services/vanguardia-api.service';
import { forkJoin } from 'rxjs';
import * as XLSX from 'xlsx';

@Component({
  selector: 'vex-leads-table',
  standalone: true,
  imports: [CommonModule, GenericTableComponent],
  templateUrl: './leads-table.component.html',
  styleUrl: './leads-table.component.scss'
})
export class LeadsTableComponent implements OnInit {
  data: any[] = [];
  loading = false;
  error: string | null = null;
  total: number | null = null;

  // Paginación
  pageIndex = 0;
  defaultPageSize = 5;
  currentPageSize = 5;

  // Filtros
  currentFilters: {
    idAgency?: string;
    LeadNo?: string;
    FullName?: string;
    sendedSalesForce?: '1' | '0';
    insertado?: boolean;
    error?: boolean;
  } = {};
  isDownloadingExcel = false;
  currentSort: { column: string; direction: 'asc' | 'desc' } | null = { column: 'timestamp_dms', direction: 'desc' };

  // Columnas para tabla de Leads
  columns: TableColumn<any>[] = [
    { property: 'agencyName', label: 'Agencia', type: 'text' },
    { property: 'LeadNo', label: 'Lead No', type: 'text' },
    { property: 'OemLeadId', label: 'OEM Lead ID', type: 'text' },
    { property: 'FullName', label: 'Nombre Completo', type: 'text' },
    { property: 'Type', label: 'Tipo', type: 'text' },
    { property: 'DueDate', label: 'Fecha Límite', type: 'text' },
    { property: 'timestamp_dms', label: 'Fecha DMS', type: 'text' },
    { property: 'sendedSalesForce', label: 'Envio SF', type: 'text' },
    { property: 'timestamp_sales_force', label: 'Fecha SF', type: 'text' },
    { property: 'resultSF', label: 'Estado SF', type: 'text' },
    { property: 'sf_jsonRequest', label: 'Datos', type: 'button' },
    { property: 'sf_link', label: 'Ver SF', type: 'button' },
    { property: 'resend',label: 'Reenviar',  type: 'button' },
    { property: 'actions', label: 'Detalles', type: 'button' }
  ];

  displayedColumns: string[] = [
    'agencyName',
    'LeadNo',
    'OemLeadId',
    'FullName',
    'Type',
    'DueDate',
    'timestamp_dms',
    'sendedSalesForce',
    'timestamp_sales_force',
    'resultSF',
    'sf_jsonRequest',
    'sf_link',
    'resend',
    'actions'
  ];

  get hasActiveFilters(): boolean {
    return !!(
      this.currentFilters.idAgency ||
      this.currentFilters.LeadNo ||
      this.currentFilters.FullName ||
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

    const params: any = {
      page: pageIndex + 1,
      perpage: pageSize
    };

    // Map current filters to params
    if (this.currentFilters.idAgency) params.idAgency = this.currentFilters.idAgency;
    if (this.currentFilters.LeadNo) params.LeadNo = this.currentFilters.LeadNo;
    if (this.currentFilters.FullName) params.FullName = this.currentFilters.FullName;
    if (this.currentFilters.sendedSalesForce) params.sendedSalesForce = this.currentFilters.sendedSalesForce;
    if (this.currentFilters.insertado && !this.currentFilters.error) params.insertCorrect = '1';
    if (this.currentFilters.error && !this.currentFilters.insertado) params.insertCorrect = '0';

    // Agregar ordenamiento si existe
    if (this.currentSort && this.currentSort.column) {
      params.orderby = this.currentSort.column;
      params.ordertype = this.currentSort.direction;
    }

    this.vanguardiaApi.getLeads(params).subscribe({
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
    LeadNo?: string;
    FullName?: string;
    sendedSalesForce?: '1' | '0';
    insertado?: boolean;
    error?: boolean;
  }): void {
    this.currentFilters = { ...filters };
    this.pageIndex = 0;
    this.loadPage(this.pageIndex, this.defaultPageSize);
  }

  onSortChange(sort: { column: string; direction: 'asc' | 'desc' }): void {
    console.log('Ordenamiento Leads cambiado:', sort);
    if (!sort.column) {
      this.currentSort = null;
    } else {
      this.currentSort = sort;
    }
    this.pageIndex = 0;
    this.loadPage(this.pageIndex, this.defaultPageSize);
  }


  resendToSalesForce(row: any): void {
    if (!row.id) {
      alert('Error: No se encontró el ID del registro');
      return;
    }

    const data = {
      ...row,
      sendedSalesForce: '0'
    };

    this.vanguardiaApi.updateLead(row.id, data).subscribe({
      next: (response) => {
        alert(`Lead ${row.LeadNo} marcado para reenvío a Salesforce`);
        this.loadPage(this.pageIndex, this.currentPageSize);
      },
      error: (error) => {
        alert(`Error al actualizar: ${error.error?.message || 'Error desconocido'}`);
      }
    });
  }

  downloadExcel(): void {
    if (!this.total || this.total === 0) {
      console.warn('No hay datos de Leads para descargar');
      return;
    }

    this.isDownloadingExcel = true;

    const maxPerPage = 100;
    const totalPages = Math.ceil(this.total / maxPerPage);

    const baseParams: any = {
      perpage: maxPerPage
    };

    // Aplicar los mismos filtros activos
    if (this.currentFilters.idAgency) baseParams.idAgency = this.currentFilters.idAgency;
    if (this.currentFilters.LeadNo) baseParams.LeadNo = this.currentFilters.LeadNo;
    if (this.currentFilters.FullName) baseParams.FullName = this.currentFilters.FullName;
    if (this.currentFilters.sendedSalesForce) baseParams.sendedSalesForce = this.currentFilters.sendedSalesForce;
    if (this.currentFilters.insertado && !this.currentFilters.error) baseParams.insertCorrect = '1';
    if (this.currentFilters.error && !this.currentFilters.insertado) baseParams.insertCorrect = '0';

    const pageRequests = [];
    for (let page = 1; page <= totalPages; page++) {
      const params = { ...baseParams, page };
      pageRequests.push(this.vanguardiaApi.getLeads(params));
    }

    forkJoin(pageRequests).subscribe({
      next: (responses) => {
        try {
          const allData: any[] = [];
          responses.forEach((response) => {
            allData.push(...response.items);
          });

          const excelData = allData.map((item) => ({
            'Agencia': item.agencyName || '',
            'Lead No': item.LeadNo || '',
            'OEM Lead ID': item.OemLeadId || '',
            'Nombre Completo': item.FullName || '',
            'Teléfono': item.Phone || '',
            'Email': item.Email || '',
            'Nombre': item.FirstName || '',
            'Apellido': item.LastName || '',
            'Saludo': item.Salutation || '',
            'Campaña': item.Campaign || '',
            'OEM': item.Oem || '',
            'Tipo': item.Type || '',
            'Fecha Límite': item.DueDate || '',
            'Marca': item.Brand || '',
            'Modelo': item.Model || '',
            'Fecha DMS': item.timestamp_dms || '',
            'Enviado SF': item.sendedSalesForce || '',
            'ID Salesforce': item.idSalesForce || '',
            'Resultado SF': item.resultSF || '',
            'Insert Correcto': item.insertCorrect || '',
            'Fecha SF': item.timestamp_sales_force || '',
            'Intentos SF': item.sf_attempts || ''
          }));

          const worksheet = XLSX.utils.json_to_sheet(excelData);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, 'Leads');

          const columnWidths = excelData.length > 0
            ? Object.keys(excelData[0]).map(() => ({ wch: 20 }))
            : [];
          worksheet['!cols'] = columnWidths;

          const now = new Date();
          const timestamp = now.toISOString().slice(0, 19).replace(/[:-]/g, '');
          const fileName = `leads_${allData.length}_registros_${timestamp}.xlsx`;

          XLSX.writeFile(workbook, fileName);

          console.log(`Excel de Leads generado exitosamente: ${fileName}`);
        } catch (error) {
          console.error('⚠️ Error al generar Excel de Leads:', error);
        } finally {
          this.isDownloadingExcel = false;
        }
      },
      error: (error) => {
        console.error('⚠️ Error al obtener datos de Leads para Excel:', error);
        this.isDownloadingExcel = false;
      }
    });
  }
}
