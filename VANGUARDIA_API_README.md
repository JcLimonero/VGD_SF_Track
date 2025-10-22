# Integración con APIs de Vanguardia

Este proyecto ahora incluye integración completa con las APIs de Vanguardia basada en tu colección de Postman.

## 🚀 Configuración

### Variables de Entorno

Las configuraciones de la API están en `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  api: {
    baseUrl: 'https://apisvanguardia.com:400',
    providerTokenHeader: 'X-Provider-Token',
    providerTokenValue: 'b26e88c4-ddbe-4adb-a214-4667f1509d4a'
  }
};
```

### Servicio Principal

El servicio `VanguardiaApiService` (`src/app/services/vanguardia-api.service.ts`) maneja todas las peticiones HTTP a las APIs de Vanguardia.

## 📋 Endpoints Disponibles

### Autenticación

- **Login**: `POST /vgd/auth/login`
- **Refresh Token**: `POST /auth/refresh`

### Catálogos

- **Inventario**: `GET /vgd/inventory`
- **Agencias**: `GET /vgd/agencies`
- **Repuestos**: `GET /vgd/spare?family={family}`

### Mega Invoice

- **Mega Users**: `GET /vgd/megausers?perpage={perpage}`
- **Mega Orders**: `GET /vgd/megaorders`

### Customer

- **Vehículos**: `GET /customer/vehicle?orderby={orderby}&ordertype={ordertype}`
- **Servicios**: `GET /customer/service?vin={vin}&perpage={perpage}`
- **Vehículo por VIN**: `GET /customer/vehicle/{vin}`
- **Órdenes**: `GET /customer/order`

## 🔧 Uso del Servicio

### 1. Inyección del Servicio

```typescript
import { VanguardiaApiService } from './services/vanguardia-api.service';

constructor(private vanguardiaApi: VanguardiaApiService) {}
```

### 2. Autenticación

```typescript
// Login
this.vanguardiaApi.login({ username: 'usuario', password: 'contraseña' }).subscribe((response) => {
  this.vanguardiaApi.setAuthToken(response.data.token);
});

// Verificar token
const token = this.vanguardiaApi.getAuthToken();
```

### 3. Obtener Datos

```typescript
// Inventario
this.vanguardiaApi.getInventory().subscribe((response) => {
  console.log('Inventario:', response.data);
});

// Agencias
this.vanguardiaApi.getAgencies().subscribe((response) => {
  console.log('Agencias:', response.data);
});

// Repuestos con filtro
this.vanguardiaApi.getSpareParts('LLANTAS').subscribe((response) => {
  console.log('Repuestos:', response.data);
});
```

## 🎯 Componentes de Ejemplo

### InvoiceTableComponent

El componente `invoice-table` ha sido actualizado para usar la API de inventario:

```typescript
// Carga automática del inventario
ngOnInit(): void {
  this.loadInventory();
}

private loadInventory(): void {
  this.vanguardiaApi.getInventory().subscribe({
    next: (response) => {
      this.data = response.data || [];
    },
    error: (err) => {
      this.error = 'Error al cargar inventario';
    }
  });
}
```

### InventoryDemoComponent

Componente de demostración que muestra cómo usar todos los endpoints:

- Carga de inventario
- Carga de agencias
- Carga de repuestos con filtros
- Sistema de autenticación

## 🔐 Autenticación

El servicio maneja automáticamente:

1. **Headers de Provider Token**: Se incluyen automáticamente en todas las peticiones
2. **Bearer Token**: Se agrega cuando está disponible
3. **Content-Type**: Se establece como `application/json`

```typescript
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
```

## 📊 Estructura de Respuesta

Todas las APIs devuelven una estructura consistente:

```typescript
interface ApiResponse<T> {
  status: string;
  data: T;
  message?: string;
}
```

## 🛠️ Personalización

### Agregar Nuevos Endpoints

Para agregar nuevos endpoints, simplemente añade métodos al servicio:

```typescript
getNewEndpoint(): Observable<ApiResponse<any[]>> {
  const url = `${this.baseUrl}/nuevo/endpoint`;
  return this.http.get<ApiResponse<any[]>>(url, {
    headers: this.getHeaders()
  });
}
```

### Modificar Headers

Puedes personalizar los headers en el método `getHeaders()`:

```typescript
private getHeaders(): HttpHeaders {
  let headers = new HttpHeaders({
    'Content-Type': 'application/json',
    [this.providerTokenHeader]: this.providerTokenValue,
    'Custom-Header': 'valor-personalizado'
  });
  // ... resto del código
}
```

## 🚨 Manejo de Errores

El servicio incluye manejo de errores consistente:

```typescript
this.vanguardiaApi.getInventory().subscribe({
  next: (response) => {
    // Manejo exitoso
    this.data = response.data;
  },
  error: (err) => {
    // Manejo de errores
    console.error('Error:', err);
    this.error = 'Error al cargar datos';
  }
});
```

## 📝 Notas Importantes

1. **CORS**: Asegúrate de que el servidor de Vanguardia permita peticiones desde tu dominio
2. **HTTPS**: La API usa HTTPS, asegúrate de que tu aplicación también lo use en producción
3. **Tokens**: Los tokens de autenticación deben manejarse de forma segura
4. **Rate Limiting**: Considera implementar límites de velocidad para las peticiones

## 🔄 Próximos Pasos

1. Implementar almacenamiento seguro de tokens (localStorage/sessionStorage)
2. Agregar interceptores HTTP para manejo automático de errores
3. Implementar refresh automático de tokens
4. Agregar tests unitarios para el servicio
5. Implementar caché para datos que no cambian frecuentemente

