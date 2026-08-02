import { EnvironmentProviders, Provider } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

/**
 * Proveedores comunes para las pruebas.
 *
 * Los componentes son standalone y se inyectan a sí mismos sus dependencias,
 * así que en las pruebas hay que suministrar HttpClient, el router o el
 * MatDialogRef según lo que use cada componente.
 */

type TestProviders = (Provider | EnvironmentProviders)[];

/** Componentes que consultan la API (tablas y filtros). */
export const httpTestProviders: TestProviders = [
  provideHttpClient(),
  provideHttpClientTesting(),
  provideNoopAnimations()
];

/** Componentes que navegan (login, menú). */
export const routerTestProviders: TestProviders = [
  provideRouter([]),
  provideNoopAnimations()
];

/** Componentes que se abren dentro de un MatDialog. */
export function dialogTestProviders(data: unknown = {}): TestProviders {
  return [
    { provide: MatDialogRef, useValue: { close: () => undefined } },
    { provide: MAT_DIALOG_DATA, useValue: data },
    provideNoopAnimations()
  ];
}
