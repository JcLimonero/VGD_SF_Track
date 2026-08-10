import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

/**
 * Avisos al usuario, en lugar de `alert()`.
 *
 * Los siete módulos con reenvío o descarga usaban `alert()` nativo: congela la
 * pestaña hasta que se acepta, antepone "localhost dice:" al texto y bloquea la
 * automatización del navegador. MatSnackBar ya viene en @angular/material, así
 * que no hace falta ninguna dependencia nueva.
 *
 * Está centralizado en un servicio y no llamando a MatSnackBar en cada
 * componente para que la duración y el estilo de un error sean los mismos en
 * los siete, y para poder espiarlo desde las pruebas sin montar el overlay.
 */
@Injectable({ providedIn: 'root' })
export class NotificationService {
  private readonly snackBar = inject(MatSnackBar);

  /** Confirmación de algo que salió bien. Se va solo. */
  success(message: string): void {
    this.show(message, {
      duration: 4000,
      panelClass: ['vgd-notif', 'vgd-notif-exito']
    });
  }

  /**
   * Un fallo. Dura más que un acierto porque el usuario tiene que leerlo y
   * normalmente decidir si reintenta.
   */
  error(message: string): void {
    this.show(message, {
      duration: 8000,
      panelClass: ['vgd-notif', 'vgd-notif-error']
    });
  }

  /**
   * Aviso que pide una acción concreta al usuario, como filtrar antes de
   * descargar. NO caduca solo: si se fuera a los pocos segundos, el usuario se
   * quedaría sin saber qué tiene que hacer. Se cierra con el botón.
   */
  warning(message: string): void {
    this.show(message, {
      duration: 0,
      panelClass: ['vgd-notif', 'vgd-notif-aviso']
    });
  }

  private show(message: string, config: MatSnackBarConfig): void {
    this.snackBar.open(message, 'Cerrar', {
      horizontalPosition: 'center',
      verticalPosition: 'bottom',
      ...config
    });
  }
}
