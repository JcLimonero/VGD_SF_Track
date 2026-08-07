import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import {
  SALESFORCE_HONDA_LABELS,
  SALESFORCE_HONDA_MOCK,
  SALESFORCE_HONDA_TABLES
} from './mock-data/salesforce-honda.mock';

/**
 * Fuente de datos temporal para el módulo de Integración SF.
 *
 * ATENCIÓN: lo que sirve este servicio es INVENTADO. Las cuatro tablas
 * (`honda_orders`, `honda_leads`, `honda_services`, `honda_inventory`) no
 * existen y sus registros se generan con bucles en `salesforce-honda.mock.ts`.
 * Quien abra esa pestaña está viendo datos falsos.
 *
 * Los métodos devuelven exactamente la misma forma que los de
 * `VanguardiaApiService` (`{ items, total }`), de manera que al conectar una
 * API real solo haya que reemplazar el cuerpo de cada método por la llamada
 * HTTP.
 *
 * Ni Crabi ni Honda SF están aquí: consumen la API real a través de
 * `VanguardiaApiService`, Crabi con `/vgd/orderscrabi` y Honda SF con los
 * siete endpoints `/vgd/portalhonda*`.
 */
@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  /** Retardo simulado para que se vea el estado de carga de las tablas. */
  private readonly latencyMs = 300;

  /** Parámetros que controlan la consulta y no se usan para filtrar. */
  private readonly reservedParams = ['page', 'perpage', 'orderby', 'ordertype'];

  // SALESFORCE
  /** Nombres de las tablas de `vgd_dwh_prod` que contienen "honda". */
  getSalesforceTables(): string[] {
    return [...SALESFORCE_HONDA_TABLES];
  }

  /** Etiqueta legible de una tabla, para mostrar en la sub-pestaña. */
  getSalesforceTableLabel(table: string): string {
    return SALESFORCE_HONDA_LABELS[table] ?? table;
  }

  getSalesforceTable(
    table: string,
    params?: any
  ): Observable<{ items: any[]; total: number }> {
    return this.query(SALESFORCE_HONDA_MOCK[table] ?? [], params);
  }

  /** Todos los registros de una tabla, sin paginar (para el Excel). */
  getAllSalesforceTable(
    table: string,
    params?: any
  ): Observable<{ items: any[]; total: number }> {
    return this.query(SALESFORCE_HONDA_MOCK[table] ?? [], params, false);
  }

  /**
   * Aplica filtros, ordenamiento y paginación sobre un arreglo en memoria,
   * imitando el comportamiento de los endpoints `/vgd/*filter`.
   */
  private query(
    source: any[],
    params?: any,
    paginate = true
  ): Observable<{ items: any[]; total: number }> {
    let items = this.applyFilters(source, params);
    items = this.applySort(items, params?.orderby, params?.ordertype);

    const total = items.length;

    if (paginate) {
      const page = Number(params?.page) || 1;
      const perpage = Number(params?.perpage) || 5;
      const start = (page - 1) * perpage;
      items = items.slice(start, start + perpage);
    }

    return of({ items, total }).pipe(delay(this.latencyMs));
  }

  /**
   * Coincidencia exacta para campos numéricos y por subcadena (sin distinguir
   * mayúsculas) para el resto. Los parámetros que no existen en el registro se
   * ignoran.
   */
  private applyFilters(items: any[], params?: any): any[] {
    if (!params) return [...items];

    const entries = Object.entries(params).filter(
      ([key, value]) =>
        !this.reservedParams.includes(key) &&
        value !== undefined &&
        value !== null &&
        value !== ''
    );

    if (entries.length === 0) return [...items];

    return items.filter((item) =>
      entries.every(([key, value]) => {
        if (!(key in item)) return true;
        const itemValue = item[key];
        if (itemValue === null || itemValue === undefined) return false;
        if (typeof itemValue === 'number') {
          return itemValue === Number(value);
        }
        return String(itemValue)
          .toLowerCase()
          .includes(String(value).toLowerCase());
      })
    );
  }

  private applySort(
    items: any[],
    orderby?: string,
    ordertype?: string
  ): any[] {
    if (!orderby) return items;

    const dir = ordertype === 'desc' ? -1 : 1;
    return [...items].sort((a, b) => {
      const av = a[orderby];
      const bv = b[orderby];
      // Los nulos siempre al final, sin importar la dirección
      if (av === null || av === undefined) return 1;
      if (bv === null || bv === undefined) return -1;
      if (av < bv) return -1 * dir;
      if (av > bv) return 1 * dir;
      return 0;
    });
  }
}
