import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap, switchMap } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface ApiResponse<T> {
  status: string;
  data: T;
  message?: string;
}

export interface InventoryItem {
  id?: number;
  name?: string;
  code?: string;
  quantity?: number;
  price?: number;
  // Agregar más propiedades según la estructura real de tu API
}

export interface Agency {
  id?: number;
  name?: string;
  code?: string;
  // Agregar más propiedades según la estructura real de tu API
}

@Injectable({
  providedIn: 'root'
})
export class VanguardiaApiService {
  // Configuración de la API basada en tu archivo Postman
  private readonly baseUrl = environment.api.baseUrl;
  private readonly providerTokenHeader = environment.api.providerTokenHeader;
  private readonly providerTokenValue = environment.api.providerTokenValue;
  
  // Token de autenticación (se debe obtener del login)
  private authToken: string | null = null;

  constructor(private http: HttpClient) {}

  /**
   * Crea los headers necesarios para las peticiones
   */
  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      [this.providerTokenHeader]: this.providerTokenValue
    });

    if (this.authToken) {
      headers = headers.set('Authorization', `Bearer ${this.authToken}`);
    }

    return headers;
  }

  // INVENTARIO 
  // Método para paginación server-side con filtros dinámicos
  getInventory(params?: any): Observable<{items: any[], total: number}>{
    const url = `${this.baseUrl}/vgd/inventoryfilter`;

    const headers= new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('X-Provider-Token', 'b26e88c4-ddbe-4adb-a214-4667f454824a');

    // Construir parámetros de consulta si se proporcionan
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key].toString());
        }
      });
    }

    return this.http.get<any>(url, { headers, params: httpParams }).pipe(
      map(res => {
        const items = res?.data?.data ?? [];
        const total = res?.data?.total_rows ?? items.length; // Usar total_rows de la API
        return { items, total };
      })
    );
  }

  // CLIENTES
  // Método para paginación server-side con filtros dinámicos
  getCustomers(params?: any): Observable<{items: any[], total: number}>{
    const url = `${this.baseUrl}/vgd/customerfilter`;

    const headers= new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('X-Provider-Token', 'b26e88c4-ddbe-4adb-a214-4667f454824a');

    // Construir parámetros de consulta si se proporcionan
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          httpParams = httpParams.set(key, params[key].toString());
        }
      });
    }

    return this.http.get<any>(url, { headers, params: httpParams }).pipe(
      map(res => {
        const items = res?.data?.data ?? [];
        const total = res?.data?.total_rows ?? items.length; // Usar total_rows de la API
        return { items, total };
      })
    );
  }

  /**
   * Obtiene las ordenes de venta desde /vgd/invoice con ordenamiento por defecto por fecha de facturación
   */
  getInvoices(): Observable<any[]> {
    const url = `${this.baseUrl}/vgd/invoice?ordertype=desc&orderby=billing_date`;

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('X-Provider-Token', 'b26e88c4-ddbe-4adb-a214-4667f454824a');

    return this.http.get<any>(url, { headers }).pipe(
      map(res => {
        return res?.data?.data ?? []; //devolver solo array
      })
    );
  }

  getInvoicesbyOrder_dms(order_dms:string): Observable<any[]> {
    const url = `${this.baseUrl}/vgd/invoice?order_dms=${order_dms}`;

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('X-Provider-Token', 'b26e88c4-ddbe-4adb-a214-4667f454824a');

    return this.http.get<any>(url, { headers }).pipe(
      map(res => {
        return res?.data?.data ?? []; //devolver solo array
      })
    );
  }

  getInvoicesbyVin(vin:string): Observable<any[]> {
    const url = `${this.baseUrl}/vgd/invoice?vin=${vin}`;

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('X-Provider-Token', 'b26e88c4-ddbe-4adb-a214-4667f454824a');

    return this.http.get<any>(url, { headers }).pipe(
      map(res => {
        console.log('Respuesta completa de la API VIN:', res);
        return res?.data?.data ?? []; //devolver solo array
      })
    );
  }

  getInvoicesbySendSF(send:string): Observable<any[]> {
    const url = `${this.baseUrl}/vgd/invoice?sendedSalesForce=${send}`;

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('X-Provider-Token', 'b26e88c4-ddbe-4adb-a214-4667f454824a');

    return this.http.get<any>(url, { headers }).pipe(
      map(res => {
        return res?.data?.data ?? []; //devolver solo array
      })
    );
  }
  
  getInvoicesbyInsert(status:string): Observable<any[]> {
    // status: 'true' => Insertado correctamente (insertCorrect == '1')
    // status: 'false' => Error (insertCorrect == '0')
    const insertCorrectValue = (status === 'true') ? '1' : '0';
    const url = `${this.baseUrl}/vgd/invoice?insertCorrect=${insertCorrectValue}`;

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('X-Provider-Token', 'b26e88c4-ddbe-4adb-a214-4667f454824a');

    return this.http.get<any>(url, { headers }).pipe(
      map(res => {
        return res?.data?.data ?? []; //devolver solo array
      })
    );
  }

  getInvoicesbyReference(reference:string): Observable<any[]> {
    const url = `${this.baseUrl}/vgd/invoice?invoice_reference=${reference}`;

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('X-Provider-Token', 'b26e88c4-ddbe-4adb-a214-4667f454824a');

    return this.http.get<any>(url, { headers }).pipe(
      map(res => {
        return res?.data?.data ?? []; //devolver solo array
      })
    );
  }

  getInvoicesbyAgencies(agencie:string): Observable<any[]> {
    const url = `${this.baseUrl}/vgd/invoice?agencyName=${agencie}`;

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('X-Provider-Token', 'b26e88c4-ddbe-4adb-a214-4667f454824a');

    return this.http.get<any>(url, { headers }).pipe(
      map(res => {
        return res?.data?.data ?? []; //devolver solo array
      })
    );
  }

  /**
   * Paginación y filtros combinados: retorna items y metadatos (total, per_page, page)
   */
  getInvoicesPaged(params: {
    page?: number;
    perpage?: number; // Cambio de per_page a perpage
    order_dms?: string;
    vin?: string;
    invoice_reference?: string;
    agencyName?: string; // Agregar agencyName
    sendedSalesForce?: string; // '1' | '0'
    insertCorrect?: string; // '0' | '1'
    orderby?: string;
    ordertype?: string;
  }): Observable<{ items: any[]; total: number; per_page: number; page: number }> {
    const url = `${this.baseUrl}/vgd/invoice`;

    let httpParams = new HttpParams();
    const p = params || {};
    
    // Core filters
    ['order_dms','vin','invoice_reference','agencyName','sendedSalesForce','insertCorrect']
      .forEach((k) => {
        const v = (p as any)[k];
        if (v !== undefined && v !== null && v !== '') {
          httpParams = httpParams.set(k, String(v));
        }
      });

    // Paginación con page y perpage
    const page = Number(p.page || 1);
    const perpage = Number(p.perpage || 5);
    httpParams = httpParams.set('page', String(page));
    httpParams = httpParams.set('perpage', String(perpage));

    // Agregar ordenamiento si existe
    if (p.orderby && p.ordertype) {
      httpParams = httpParams.set('orderby', p.orderby);
      httpParams = httpParams.set('ordertype', p.ordertype);
    }

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('X-Provider-Token', 'b26e88c4-ddbe-4adb-a214-4667f454824a');

    
    return this.http.get<any>(url, { headers, params: httpParams }).pipe(
      map(res => {
        const d = res?.data ?? {};
        return {
          items: d?.data ?? [],
          total: d?.total_rows ?? 0,
          per_page: d?.per_page ?? (Array.isArray(d?.data) ? d.data.length : 0),
          page: d?.page ?? 1
        };
      })
    );
  }

  getAgencies(): Observable<any[]> {
    // Solicitar todas las agencias usando un perpage alto
    const url = `${this.baseUrl}/vgd/agenciesfilter?perpage=100`;

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('X-Provider-Token', 'b26e88c4-ddbe-4adb-a214-4667f454824a');

    return this.http.get<any>(url, { headers }).pipe(
      map(res => {
        return res?.data?.data ?? []; //devolver solo array
      })
    );
  }



  /**
   * Refresca el token desde /auth/refresh
   */
  refreshToken(refreshToken: string): Observable<ApiResponse<{ token: string; refresh_token: string }>> {
    const url = `${this.baseUrl}/auth/refresh`;
    return this.http.post<ApiResponse<{ token: string; refresh_token: string }>>(url, {
      refresh_token: refreshToken
    }, {
      headers: this.getHeaders()
    });
  }
}
