import { Component, Input, OnInit, OnChanges, SimpleChanges, Inject, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule, MatTableDataSource } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TableColumn } from '../../../@vex/interfaces/table-column.interface';

@Component({
  selector: 'vex-generic-table',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule, MatButtonModule, MatDialogModule],
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})

export class GenericTableComponent implements OnInit, OnChanges {
  @Input() columns: TableColumn<any>[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() data: any[] = [];
  @Input() total: number | null = null;
  @Input() initialPageSize: number = 10;
  @Input() currentPageIndex: number = 0; // Página actual desde el componente padre
  @Input() initialSort: { column: string; direction: 'asc' | 'desc' } | null = null; // Estado inicial de ordenamiento
  @Input() hasActiveFilters: boolean = false; // Indica si hay filtros activos
  @Input() onRow: ((row: any) => void) | null = null;
  @Output() pageChanged = new EventEmitter<{ pageIndex: number; pageSize: number }>();
  @Output() sortChanged = new EventEmitter<{ column: string; direction: 'asc' | 'desc' }>();
  
  dataSource = new MatTableDataSource<any>([]);
  
  // Paginación personalizada
  currentPage = 0;
  pageSize = 5;
  totalPages = 0;
  Math = Math; // Para usar Math.min en el template
  pageSizeOptions = [5, 10, 25, 50, 100];
  
  // Ordenamiento
  sortColumn: string | null = null;
  sortDirection: 'asc' | 'desc' | null = null;
  
  constructor(public dialog: MatDialog) {}
  
  ngOnInit() {
    this.dataSource.data = this.data || [];
    this.updatePagination();
    
    // Inicializar estado de ordenamiento si se proporciona
    if (this.initialSort) {
      this.sortColumn = this.initialSort.column;
      this.sortDirection = this.initialSort.direction;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if ('data' in changes) {
      this.dataSource.data = this.data || [];
    }
    if ('total' in changes) {
      this.updatePagination();
    }
    if ('currentPageIndex' in changes) {
      this.currentPage = this.currentPageIndex || 0;
    }
    if ('initialPageSize' in changes) {
      this.pageSize = this.initialPageSize;
      this.updatePagination();
    }
  }

  updatePagination() {
    if (this.total !== null && this.total > 0) {
      this.totalPages = Math.ceil(this.total / this.pageSize);
    } else {
      this.totalPages = 0;
    }
  }

  get canGoPrevious(): boolean {
    return this.currentPage > 0;
  }

  get canGoNext(): boolean {
    return this.currentPage < this.totalPages - 1;
  }

  goToFirstPage() {
    if (this.currentPage !== 0) {
      this.currentPage = 0;
      this.emitPageChange();
    }
  }

  goToPreviousPage() {
    if (this.canGoPrevious) {
      this.currentPage--;
      this.emitPageChange();
    }
  }

  goToNextPage() {
    if (this.canGoNext) {
      this.currentPage++;
      this.emitPageChange();
    }
  }

  goToLastPage() {
    const lastPage = this.totalPages - 1;
    if (this.currentPage !== lastPage) {
      this.currentPage = lastPage;
      this.emitPageChange();
    }
  }

  emitPageChange() {
    this.pageChanged.emit({
      pageIndex: this.currentPage,
      pageSize: this.pageSize
    });
  }

  onPageSizeChange(newSize: number) {
    this.pageSize = newSize;
    this.currentPage = 0; // Resetear a la primera página
    this.updatePagination();
    this.emitPageChange();
  }

  toggleSort(column: string) {
    if (this.sortColumn === column) {
      // Cambiar dirección: asc -> desc -> null
      if (this.sortDirection === 'asc') {
        this.sortDirection = 'desc';
      } else if (this.sortDirection === 'desc') {
        this.sortDirection = null;
        this.sortColumn = null;
      }
    } else {
      // Nueva columna, empezar con asc
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    if (this.sortColumn && this.sortDirection) {
      this.sortChanged.emit({
        column: this.sortColumn,
        direction: this.sortDirection
      });
    } else {
      // Resetear ordenamiento
      this.sortChanged.emit({
        column: '',
        direction: 'asc'
      });
    }
  }

  isSortable(column: string): boolean {
    return column === 'order_dms' || column === 'timestamp_sales_force' || column === 'billing_date';
  }

  cellValue(row: any, property: string) {
    if (!property) return '';
    const parts = property.split('.');
    let v: any = row;
    for (const p of parts) {
      v = v ? v[p] : undefined;
    }
    return v;
  }

  truncateToWords(text: string, wordLimit: number = 5): string {
    if (!text || typeof text !== 'string') return '';
    const words = text.trim().split(/\s+/);
    if (words.length <= wordLimit) return text;
    return words.slice(0, wordLimit).join(' ') + '...';
  }

  isResultSFSuccess(element: any): boolean {
    // Verificar el campo insertCorrect para determinar éxito/error
    const insertCorrectValue = this.cellValue(element, 'insertCorrect');
    
    // insertCorrect = '1' o 1 = éxito (ícono verde)
    // insertCorrect = '0' o 0 = error (ícono rojo)
    if (insertCorrectValue === '1' || insertCorrectValue === 1) {
      return true;
    }
    
    if (insertCorrectValue === '0' || insertCorrectValue === 0) {
      return false;
    }
    
    // Fallback: si no existe insertCorrect, usar valor truthy del resultSF
    const resultValue = this.cellValue(element, 'resultSF');
    return !!resultValue;
  }

  isSalesForceAvailable(element: any): boolean {
    // Solo habilitado si insertCorrect = 1 y tiene idSalesForce
    const insertCorrectValue = this.cellValue(element, 'insertCorrect');
    const idSalesForce = this.cellValue(element, 'idSalesForce');
    
    const isSuccess = insertCorrectValue === '1' || insertCorrectValue === 1;
    const hasIdSalesForce = idSalesForce && idSalesForce !== null && idSalesForce !== '';
    
    return isSuccess && hasIdSalesForce;
  }

  openSalesForceLink(element: any): void {
    if (!this.isSalesForceAvailable(element)) {
      console.warn('Salesforce link not available for this element');
      return;
    }
    
    const idSalesForce = this.cellValue(element, 'idSalesForce');
    const url = `https://grupovanguardiamx.lightning.force.com/lightning/r/Opportunity/${idSalesForce}/view`;
    
    console.log('Opening Salesforce URL:', url);
    window.open(url, '_blank');
  }

  openModal(rowData: any) {
    console.log('Opening modal with data:', rowData);
    const dialogRef = this.dialog.open(ModalDialogComponent, {
      data: rowData,
      width: '80%',
      maxWidth: '800px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('Modal closed with result:', result);
    });
  }

  openJsonModal(rowData: any) {
    console.log('Opening JSON modal with data:', rowData);
    const dialogRef = this.dialog.open(JsonModalComponent, {
      data: rowData.sf_jsonRequest,
      width: '90%',
      maxWidth: '900px',
      maxHeight: '80vh'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('JSON Modal closed');
    });
  }
}

// Modal component defined in the same file
@Component({
  selector: 'modal-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule],
  template: `
    <h2 mat-dialog-title class="title text-xl">Detalles de la orden</h2>

    <mat-dialog-content >
      <div class="invoice-details">
      
        <div class="detail-row">
          <strong>Nombre de Agencia:</strong> {{ data?.agencyName }}
        </div>
        <div class="detail-row">
          <strong>Número de Orden:</strong> {{ data?.order_dms }}
        </div>
        <div class="detail-row">
          <strong>Estado:</strong> {{ data?.state }}
        </div>
        <div class="detail-row">
          <strong>VIN:</strong> {{ data?.vin }}
        </div>
        <div class="detail-row">
          <strong>Fecha de Inicio de Garantía:</strong> {{ data?.warranty_init_date || 'N/A' }}
        </div>
        <div class="detail-row">
          <strong>Placas:</strong> {{ data?.plates || 'N/A' }}
        </div>
        <div class="detail-row">
          <strong>Método de Pago:</strong> {{ data?.payment_method }}
        </div>
        <div class="detail-row">
          <strong>Número de Factura:</strong> {{ data?.invoice_reference }}
        </div>
        <div class="detail-row">
          <strong>Fecha de Entrega:</strong> {{ data?.delivery_date || 'N/A' }}
        </div>
        <div class="detail-row">
          <strong>Fecha de Facturación:</strong> {{ data?.billing_date }}
        </div>
        <div class="detail-row">
          <strong>Enviado a SalesForce:</strong> {{ data?.sendedSalesForce }}
        </div>
        <div class="detail-row">
          <strong>ID SalesForce:</strong> {{ data?.idSalesForce || 'N/A' }}
        </div>
        <div class="detail-row">
          <strong>Resultado SF:</strong> {{ data?.resultSF }}
        </div>
        <div class="detail-row">
          <strong>Timestamp DMS:</strong> {{ data?.timestamp_dms }}
        </div>
        <div class="detail-row">
          <strong>Timestamp SalesForce:</strong> {{ data?.timestamp_sales_force }}
        </div>
        <div class="detail-row">
          <strong>Envío a SalesForce cada:</strong> 30 minutos
        </div>
      </div>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button (click)="onNoClick()">Cerrar</button>
    </mat-dialog-actions>
  `,
  styles: [`

    .title{
      text-decoration: underline;
      text-decoration-color: #FF5C20;
      text-decoration-thickness: 3px;
      align-self: center;
    }

    .invoice-details {
      max-height: 400px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
    }

    .detail-row {
      border-bottom: 1px solid #e0e0e0;
    }

    .detail-row:last-child {
      border-bottom: none;
    }

    .detail-row strong {
      color: #1b1a1aff;
      margin-right: 8px;
    }

    mat-dialog-content {
      max-height: 550px;
      overflow-y: auto;
    }
  `]
})
export class ModalDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ModalDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}

// JSON Modal component
@Component({
  selector: 'json-modal',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule],
  template: `
    <h2 mat-dialog-title>JSON Request - SalesForce</h2>

    <mat-dialog-content class="mat-typography">
      <div class="json-container">
        <pre class="json-content">{{ formattedJson }}</pre>
      </div>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button (click)="copyToClipboard()" class="flex flex-row items-center bg-black text-white p-[0.45rem] rounded-2xl">
        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#ffffff"  class="mr-[0.2rem]">
          <path d="M360-240q-33 0-56.5-23.5T280-320v-480q0-33 23.5-56.5T360-880h360q33 0 56.5 23.5T800-800v480q0 33-23.5 56.5T720-240H360Zm0-80h360v-480H360v480ZM200-80q-33 0-56.5-23.5T120-160v-560h80v560h440v80H200Zm160-240v-480 480Z"/>
        </svg>
        {{ copyButtonText }}
      </button>
      <button mat-button (click)="onNoClick()">Cerrar</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .json-container {
      background-color: #f5f5f5;
      border-radius: 4px;
      padding: 16px;
      overflow: auto;
      max-height: 500px;
    }

    .json-content {
      margin: 0;
      font-family: 'Courier New', monospace;
      font-size: 13px;
      line-height: 1.5;
      color: #333;
      white-space: pre-wrap;
      word-wrap: break-word;
    }

    mat-dialog-content {
      max-height: 60vh;
      overflow-y: auto;
    }

    mat-dialog-actions button {
      margin-left: 8px;
    }
  `]
})
export class JsonModalComponent {
  formattedJson: string;
  copyButtonText = 'Copiar';

  constructor(
    public dialogRef: MatDialogRef<JsonModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Format JSON with proper indentation
    try {
      if (typeof data === 'string') {
        // If it's a string, try to parse and re-stringify
        this.formattedJson = JSON.stringify(JSON.parse(data), null, 2);
      } else {
        this.formattedJson = JSON.stringify(data, null, 2);
      }
    } catch (e) {
      // If parsing fails, show as-is
      this.formattedJson = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  copyToClipboard(): void {
    navigator.clipboard.writeText(this.formattedJson).then(() => {
      this.copyButtonText = 'Copiado';
      setTimeout(() => {
        this.copyButtonText = 'Copiar';
      }, 2000);
    }).catch(err => {
      console.error('Error al copiar al portapapeles:', err);
      this.copyButtonText = '✗ Error';
      setTimeout(() => {
        this.copyButtonText = 'Copiar';
      }, 2000);
    });
  }
}

