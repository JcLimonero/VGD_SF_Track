import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';

export interface ConfirmDialogData {
  title: string;
  /** Párrafos del mensaje, uno por elemento. */
  lines: string[];
  confirmLabel: string;
  cancelLabel?: string;
}

/**
 * Confirmación antes de una acción que escribe en la API. Devuelve `true` si el
 * usuario confirma; cerrar con Cancelar, Escape o fuera del diálogo no devuelve
 * nada.
 */
@Component({
  selector: 'vex-confirm-dialog',
  imports: [CommonModule, MatDialogModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrl: './confirm-dialog.component.scss'
})
export class ConfirmDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<ConfirmDialogComponent, boolean>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {}

  confirm(): void {
    this.dialogRef.close(true);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
