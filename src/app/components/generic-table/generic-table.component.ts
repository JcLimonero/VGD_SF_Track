import { Component, Input, OnInit, OnChanges, SimpleChanges, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TableColumn } from '../../../@vex/interfaces/table-column.interface';

@Component({
  selector: 'vex-generic-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatDialogModule],
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})


export class GenericTableComponent implements OnInit, OnChanges {
  @Input() columns: TableColumn<any>[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() data: any[] = [];
  // optional callback invoked when a row is clicked; parent can pass a function
  @Input() onRow: ((row: any) => void) | null = null;
  
  constructor(public dialog: MatDialog) {}
  
  ngOnInit() {
    console.log('GenericTable - onRow function:', this.onRow);
  }

  ngOnChanges(changes: SimpleChanges) {
    // Handle input changes if needed
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
}

// Modal component defined in the same file
@Component({
  selector: 'modal-dialog',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule],
  template: `
    <h2 mat-dialog-title>Detalles de la Factura</h2>

    <mat-dialog-content class="mat-typography">
      <div class="invoice-details">
        <div class="detail-row">
          <strong>ID:</strong> {{ data?.Id }}
        </div>
        <div class="detail-row">
          <strong>ID Agencia:</strong> {{ data?.idAgency }}
        </div>
        <div class="detail-row">
          <strong>Nombre de Agencia:</strong> {{ data?.agencyName }}
        </div>
        <div class="detail-row">
          <strong>Número de Pedido DMS:</strong> {{ data?.order_dms }}
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
          <strong>Referencia de Factura:</strong> {{ data?.invoice_reference }}
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
          <strong>Intentos SF:</strong> {{ data?.sf_attempts }}
        </div>
        <div class="detail-row">
          <strong>Timestamp DMS:</strong> {{ data?.timestamp_dms }}
        </div>
        <div class="detail-row">
          <strong>Timestamp:</strong> {{ data?.timestamp }}
        </div>
        <div class="detail-row">
          <strong>Timestamp SalesForce:</strong> {{ data?.timestamp_sales_force }}
        </div>
      </div>
    </mat-dialog-content>

    <mat-dialog-actions align="end">
      <button mat-button (click)="onNoClick()">Cerrar</button>
    </mat-dialog-actions>
  `,
  styles: [`
    .invoice-details {
      max-height: 400px;
      overflow-y: auto;
    }

    .detail-row {
      margin-bottom: 12px;
      padding: 8px;
      border-bottom: 1px solid #e0e0e0;
    }

    .detail-row:last-child {
      border-bottom: none;
    }

    .detail-row strong {
      color: #1976d2;
      margin-right: 8px;
    }

    mat-dialog-content {
      max-height: 500px;
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
