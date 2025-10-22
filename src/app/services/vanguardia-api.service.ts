import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
