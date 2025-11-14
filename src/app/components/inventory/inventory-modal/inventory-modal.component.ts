import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'vex-inventory-modal',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, CommonModule],
  templateUrl: './inventory-modal.component.html',
  styleUrl: './inventory-modal.component.scss'
})
export class InventoryModalComponent {

  constructor(
    public dialogRef: MatDialogRef<InventoryModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  // Formatear el estado de Salesforce
  getSalesForceStatus(): string {
    if (this.data?.sendedSalesForce === '1') {
      return 'Sí';
    } else if (this.data?.sendedSalesForce === '0') {
      return 'No';
    }
    return 'N/A';
  }

//   // Formatear fechas si es necesario
//   formatDate(dateString: string): string {
//     if (!dateString) return 'N/A';
//     try {
//       return new Date(dateString).toLocaleString('es-ES');
//     } catch {
//       return dateString;
//     }
//   }
}
