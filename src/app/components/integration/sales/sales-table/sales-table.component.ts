import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';
import * as XLSX from 'xlsx';
import { TableColumn } from '../../../../../@vex/interfaces/table-column.interface';
import { GenericTableComponent } from '../../../generic-table/generic-table.component';
import { VanguardiaApiService } from '../../../../services/vanguardia-api.service';

@Component({
  selector: 'integration-sales-table',
  standalone: true,
  imports: [CommonModule, GenericTableComponent],
  templateUrl: './sales-table.component.html',
  styleUrl: './sales-table.component.scss'
})
export class IntegrationSalesTableComponent implements OnInit {
  data: any[] = [];
  loading = false;
  error: string | null = null;
  total = 0;

  pageIndex = 0;
  defaultPageSize = 5;
  currentPageSize = 5;
  isDownloadingExcel = false;

  currentFilters: { customer_id?: string; dealer_id?: string; vin?: string; is_sent?: '1' | '0' } = {};
  currentSort: { column: string; direction: 'asc' | 'desc' } | null = { column: 'sent_at', direction: 'desc' };

  columns: TableColumn<any>[] = [
    { property: 'customer_id', label: 'Customer ID', type: 'text' },
    { property: 'dealer_id', label: 'Dealer ID', type: 'text' },
    { property: 'vin', label: 'VIN', type: 'text' },
    { property: 'is_valid', label: 'Valido', type: 'text' },
    { property: 'error_message', label: 'Error', type: 'button' },
    { property: 'is_sent', label: 'Enviado', type: 'text' },
    { property: 'sent_at', label: 'Fecha Envio', type: 'text' },
    { property: 'original_json', label: 'Datos', type: 'button' },
    { property: 'api_response', label: 'API Response', type: 'button' }
  ];

  displayedColumns: string[] = [
    'customer_id',
    'dealer_id',
    'vin',
    'is_valid',
    'error_message',
    'is_sent',
    'sent_at',
    'original_json',
    'api_response'
  ];

  get hasActiveFilters(): boolean {
    return !!(
      this.currentFilters.customer_id ||
      this.currentFilters.dealer_id ||
      this.currentFilters.vin ||
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
    if (this.currentFilters.vin) params.vin = this.currentFilters.vin;
    if (this.currentFilters.is_sent) params.is_sent = this.currentFilters.is_sent;

    if (this.currentSort && this.currentSort.column) {
      params.orderby = this.currentSort.column;
      params.ordertype = this.currentSort.direction;
    }

    this.vanguardiaApi.getIntegrationHondaSales(params).subscribe({
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

  applyFilter(filters: { customer_id?: string; dealer_id?: string; vin?: string; is_sent?: '1' | '0' }): void {
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
    if (this.currentFilters.vin) baseParams.vin = this.currentFilters.vin;
    if (this.currentFilters.is_sent) baseParams.is_sent = this.currentFilters.is_sent;
    if (this.currentSort?.column) {
      baseParams.orderby = this.currentSort.column;
      baseParams.ordertype = this.currentSort.direction;
    }

    const pageRequests = [];
    for (let page = 1; page <= totalPages; page++) {
      pageRequests.push(this.vanguardiaApi.getIntegrationHondaSales({ ...baseParams, page }));
    }

    forkJoin(pageRequests).subscribe({
      next: (responses) => {
        try {
          const allData: any[] = [];
          responses.forEach((response) => allData.push(...response.items));

          const excelData = allData.map(item => ({
            'Customer ID': item.customer_id || '',
            'Dealer ID': item.dealer_id || '',
            'VIN': item.vin || '',
            'Valido': item.is_valid || '',
            'Error': item.error_message || '',
            'Enviado': item.is_sent || '',
            'Fecha Envio': item.sent_at || ''
          }));

          const worksheet = XLSX.utils.json_to_sheet(excelData);
          const workbook = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(workbook, worksheet, 'IntegrationVentas');

          const columnWidths = excelData.length > 0 ? Object.keys(excelData[0]).map(() => ({ wch: 20 })) : [];
          worksheet['!cols'] = columnWidths;

          const now = new Date();
          const timestamp = now.toISOString().slice(0, 19).replace(/[:-]/g, '');
          XLSX.writeFile(workbook, `integration_ventas_${allData.length}_${timestamp}.xlsx`);
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
