import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import * as XLSX from 'xlsx';
import { TableColumn } from '../../../../../@vex/interfaces/table-column.interface';
import { GenericTableComponent } from '../../../generic-table/generic-table.component';
import { VanguardiaApiService } from '../../../../services/vanguardia-api.service';

@Component({
  selector: 'integration-customer-table',
  standalone: true,
  imports: [CommonModule, GenericTableComponent],
  templateUrl: './customer-table.component.html',
  styleUrl: './customer-table.component.scss'
})
export class IntegrationCustomerTableComponent implements OnInit {
  data: any[] = [];
  loading = false;
  error: string | null = null;
  total = 0;

  pageIndex = 0;
  defaultPageSize = 5;
  currentPageSize = 5;
  isDownloadingExcel = false;

  currentFilters: { customer_id?: string; dealer_id?: string; is_sent?: '1' | '0' } = {};
  currentSort: { column: string; direction: 'asc' | 'desc' } | null = { column: 'timestamp_dms', direction: 'desc' };

  columns: TableColumn<any>[] = [
    { property: 'customer_id', label: 'Customer ID', type: 'text' },
    { property: 'dealer_id', label: 'Dealer ID', type: 'text' },
    { property: 'is_valid', label: 'Valido', type: 'text' },
    { property: 'error_message', label: 'Error', type: 'button' },
    { property: 'api_response_status', label: 'API Status', type: 'text' },
    { property: 'is_sent', label: 'Enviado', type: 'text' },
    { property: 'sent_timestamp', label: 'Fecha Envio', type: 'text' },
    { property: 'processed_at', label: 'Procesado', type: 'text' },
    { property: 'timestamp_dms', label: 'Fecha DMS', type: 'text' },
    { property: 'original_json', label: 'Datos', type: 'button' },
    { property: 'api_response', label: 'API Response', type: 'button' }
  ];

  displayedColumns: string[] = [
    'customer_id',
    'dealer_id',
    'is_valid',
    'error_message',
    'api_response_status',
    'is_sent',
    'sent_timestamp',
    'processed_at',
    'timestamp_dms',
    'original_json',
    'api_response'
  ];

  get hasActiveFilters(): boolean {
    return !!(
      this.currentFilters.customer_id ||
      this.currentFilters.dealer_id ||
      this.currentFilters.is_sent
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

    if (this.currentFilters.customer_id) params.customer_id = this.currentFilters.customer_id;
    if (this.currentFilters.dealer_id) params.dealer_id = this.currentFilters.dealer_id;
    if (this.currentFilters.is_sent) params.is_sent = this.currentFilters.is_sent;

    if (this.currentSort && this.currentSort.column) {
      params.orderby = this.currentSort.column;
      params.ordertype = this.currentSort.direction;
    }

    this.vanguardiaApi.getIntegrationHondaCustomers(params).subscribe({
      next: (res) => {
        this.data = res.items || [];
        this.total = res.total || 0;
        this.pageIndex = pageIndex;
        this.currentPageSize = pageSize;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudo cargar la información. Por favor, intenta de nuevo.';
        this.data = [];
        this.total = 0;
        this.loading = false;
      }
    });
  }

  applyFilter(filters: { customer_id?: string; dealer_id?: string; is_sent?: '1' | '0' }): void {
    this.currentFilters = { ...filters };
    this.pageIndex = 0;
    this.loadPage(this.pageIndex, this.defaultPageSize);
  }

  onSortChange(sort: { column: string; direction: 'asc' | 'desc' }): void {
    if (!sort || !sort.column) {
      this.currentSort = null;
    } else {
      this.currentSort = sort;
    }
    this.pageIndex = 0;
    this.loadPage(this.pageIndex, this.currentPageSize);
  }

  downloadExcel(): void {
    if (!this.total) {
      return;
    }

    this.isDownloadingExcel = true;
    const maxPerPage = 100;
    const totalPages = Math.ceil(this.total / maxPerPage);

    const baseParams: any = { perpage: maxPerPage };

    if (this.currentFilters.customer_id) baseParams.customer_id = this.currentFilters.customer_id;
    if (this.currentFilters.dealer_id) baseParams.dealer_id = this.currentFilters.dealer_id;
    if (this.currentFilters.is_sent) baseParams.is_sent = this.currentFilters.is_sent;
    if (this.currentSort?.column) {
      baseParams.orderby = this.currentSort.column;
      baseParams.ordertype = this.currentSort.direction;
    }

    const pageRequests = [];
    for (let page = 1; page <= totalPages; page++) {
      pageRequests.push(this.vanguardiaApi.getIntegrationHondaCustomers({ ...baseParams, page }));
    }

    forkJoin(pageRequests).subscribe({
      next: (responses) => {
        try {
          const allData: any[] = [];
          responses.forEach((response) => allData.push(...response.items));

          const excelData = allData.map(item => ({
            'Customer ID': item.customer_id || '',
            'Dealer ID': item.dealer_id || '',
            'Valido': item.is_valid || '',
            'Error': item.error_message || '',
            'API Status': item.api_response_status || '',
            'Enviado': item.is_sent || '',
            'Fecha Envio': item.sent_timestamp || '',
            'Procesado': item.processed_at || '',
            'Fecha DMS': item.timestamp_dms || ''
          }));

          const worksheet = XLSX.utils.json_to_sheet(excelData);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, 'IntegrationClientes');

          const columnWidths = excelData.length > 0 ? Object.keys(excelData[0]).map(() => ({ wch: 20 })) : [];
          worksheet['!cols'] = columnWidths;

          const now = new Date();
          const timestamp = now.toISOString().slice(0, 19).replace(/[:-]/g, '');
          XLSX.writeFile(workbook, `integration_clientes_${allData.length}_${timestamp}.xlsx`);
        } finally {
          this.isDownloadingExcel = false;
        }
      },
      error: () => {
        this.isDownloadingExcel = false;
      }
    });
  }

}
