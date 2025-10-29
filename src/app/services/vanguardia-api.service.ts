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

  /**
   * Obtiene el inventario desde /vgd/inventoryfilter
   */
  getInvoices(): Observable<any[]> {
    const url = `${this.baseUrl}/vgd/invoice`;

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('X-Provider-Token', 'b26e88c4-ddbe-4adb-a214-4667f454824a');

    return this.http.get<any>(url, { headers }).pipe(
      map(res => {
        console.log('Respuesta completa de la API:', res);
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
        console.log('Respuesta completa de la API Order:', res);
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
        console.log('Respuesta completa de la API Send:', res);
        return res?.data?.data ?? []; //devolver solo array
      })
    );
  }
  
  getInvoicesbyInsert(status:string): Observable<any[]> {
    // status: 'true' => Insertado (resultSF == 'Insert Correct')
    // status: 'false' => Error (resultSF != 'Insert Correct')
    const url = (status === 'true')
      ? `${this.baseUrl}/vgd/invoice?resultSF=Insert Correct`
      : `${this.baseUrl}/vgd/invoice?resultSF_ne=Insert Correct`;
    

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('X-Provider-Token', 'b26e88c4-ddbe-4adb-a214-4667f454824a');

    return this.http.get<any>(url, { headers }).pipe(
      map(res => {
        console.log('Respuesta completa de la API Insert:', res);
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
        console.log('Respuesta completa de la API Rerence:', res);
        return res?.data?.data ?? []; //devolver solo array
      })
    );
  }

  /**
   * Paginación y filtros combinados: retorna items y metadatos (total, per_page, page)
   */
  getInvoicesPaged(params: {
    page?: number;
    per_page?: number;
    order_dms?: string;
    vin?: string;
    invoice_reference?: string;
    sendedSalesForce?: string; // '1' | '0'
    resultSF?: string;
    resultSF_ne?: string;
    _sort?: string;
    _order?: string;
  }): Observable<{ items: any[]; total: number; per_page: number; page: number }> {
    const url = `${this.baseUrl}/vgd/invoice`;

    let httpParams = new HttpParams();
    const p = params || {};
    
    // Core filters
    ['order_dms','vin','invoice_reference','sendedSalesForce','resultSF','resultSF_ne']
      .forEach((k) => {
        const v = (p as any)[k];
        if (v !== undefined && v !== null && v !== '') {
          httpParams = httpParams.set(k, String(v));
        }
      });

    // API solo soporta 'page' (siempre devuelve 5 por página)
    const page = Number(p.page || 1);
    httpParams = httpParams.set('page', String(page));

    // Agregar ordenamiento si existe
    if (p._sort && p._order) {
      httpParams = httpParams.set('_sort', p._sort);
      httpParams = httpParams.set('_order', p._order);
    }

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json')
      .set('X-Provider-Token', 'b26e88c4-ddbe-4adb-a214-4667f454824a');

    console.log('[VanguardiaApi] GET', url, httpParams.toString());

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

/**
 * Login automático (invisible) desde /vgd/auth/login
 * usando el "code" del Postman original
 */
// loginInvisible():any {
//   const url = `${this.baseUrl}/vgd/inventoryfilter`;
//   const body = {};

//   const headers = new HttpHeaders()
//     .set('Content-Type', 'application/json')
//     .set('X-Provider-Token', 'b26e88c4-ddbe-4adb-a214-4667f454824a');

//   console.log('Enviando login invisible a:', url);

//   return this.http.get(url,{headers:headers}
//   );

// }

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
