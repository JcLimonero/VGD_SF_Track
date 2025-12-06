import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'vex-leads-modal',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatButtonModule],
  templateUrl: './leads-modal.component.html',
  styleUrl: './leads-modal.component.scss'
})
export class LeadsModalComponent {
  constructor(
    public dialogRef: MatDialogRef<LeadsModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }

  getSalesForceStatus(): string {
    if (this.data?.sendedSalesForce === '1') {
      return 'Enviado';
    }
    return 'No enviado';
  }

  formatDate(date: string): string {
    if (!date) return 'N/A';
    return new Date(date).toLocaleString('es-MX');
  }
}
