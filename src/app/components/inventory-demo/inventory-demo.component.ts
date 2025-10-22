import { Component, OnInit } from '@angular/core';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VanguardiaApiService, InventoryItem, Agency } from '../../services/vanguardia-api.service';

@Component({
  selector: 'app-inventory-demo',
  standalone: true,
  imports: [CommonModule, FormsModule, JsonPipe],
  template: `
    <div class="inventory-demo">
      <h2>Demo de APIs de Vanguardia</h2>
      
      <!-- Sección de Inventario -->
      <div class="section">
        <h3>Inventario</h3>
        <button (click)="loadInventory()" [disabled]="loading">Cargar Inventario</button>
        <div *ngIf="loading" class="loading">Cargando...</div>
        <div *ngIf="error" class="error">{{ error }}</div>
        
        <div *ngIf="inventoryData.length > 0" class="data-section">
          <h4>Datos del Inventario ({{ inventoryData.length }} registros)</h4>
          <pre>{{ inventoryData | json }}</pre>
        </div>
      </div>

      <!-- Sección de Agencias -->
      <div class="section">
        <h3>Agencias</h3>
        <button (click)="loadAgencies()" [disabled]="loading">Cargar Agencias</button>
        
        <div *ngIf="agenciesData.length > 0" class="data-section">
          <h4>Datos de Agencias ({{ agenciesData.length }} registros)</h4>
          <pre>{{ agenciesData | json }}</pre>
        </div>
      </div>

      <!-- Sección de Repuestos -->
      <div class="section">
        <h3>Repuestos</h3>
        <input type="text" [(ngModel)]="spareFamily" placeholder="Familia (ej: LLANTAS)" />
        <button (click)="loadSpareParts()" [disabled]="loading">Cargar Repuestos</button>
        
        <div *ngIf="spareData.length > 0" class="data-section">
          <h4>Datos de Repuestos ({{ spareData.length }} registros)</h4>
          <pre>{{ spareData | json }}</pre>
        </div>
      </div>

      <!-- Sección de Autenticación -->
      <div class="section">
        <h3>Autenticación</h3>
        <div>
          <input type="text" [(ngModel)]="username" placeholder="Usuario" />
          <input type="password" [(ngModel)]="password" placeholder="Contraseña" />
          <button (click)="login()" [disabled]="loading">Login</button>
        </div>
        <div *ngIf="authToken" class="success">
          Token obtenido: {{ authToken.substring(0, 20) }}...
        </div>
      </div>
    </div>
  `,
  styles: [`
    .inventory-demo {
      padding: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    
    .section {
      margin-bottom: 30px;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
    }
    
    .loading {
      color: #007bff;
      font-weight: bold;
    }
    
    .error {
      color: #dc3545;
      font-weight: bold;
    }
    
    .success {
      color: #28a745;
      font-weight: bold;
    }
    
    .data-section {
      margin-top: 15px;
    }
    
    pre {
      background-color: #f8f9fa;
      padding: 10px;
      border-radius: 4px;
      overflow-x: auto;
      max-height: 300px;
    }
    
    button {
      margin: 5px;
      padding: 8px 16px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
    
    button:disabled {
      background-color: #6c757d;
      cursor: not-allowed;
    }
    
    input {
      margin: 5px;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  `]
})
export class InventoryDemoComponent implements OnInit {
  // Datos
  inventoryData: InventoryItem[] = [];
  agenciesData: Agency[] = [];
  spareData: any[] = [];
  
  // Estado
  loading = false;
  error: string | null = null;
  authToken: string | null = null;
  
  // Formularios
  spareFamily = 'LLANTAS';
  username = '';
  password = '';

  constructor(private vanguardiaApi: VanguardiaApiService) {}

  ngOnInit(): void {
    // Verificar si ya hay un token guardado
    this.authToken = this.vanguardiaApi.getAuthToken();
  }

  /**
   * Carga los datos del inventario
   */
  loadInventory(): void {
    this.loading = true;
    this.error = null;

    this.vanguardiaApi.getInventory().subscribe({
      next: (response) => {
        this.inventoryData = response.data || [];
        this.loading = false;
        console.log('Inventario cargado:', this.inventoryData);
      },
      error: (err) => {
        this.error = 'Error al cargar inventario: ' + err.message;
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }

  /**
   * Carga las agencias
   */
  loadAgencies(): void {
    this.loading = true;
    this.error = null;

    this.vanguardiaApi.getAgencies().subscribe({
      next: (response) => {
        this.agenciesData = response.data || [];
        this.loading = false;
        console.log('Agencias cargadas:', this.agenciesData);
      },
      error: (err) => {
        this.error = 'Error al cargar agencias: ' + err.message;
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }

  /**
   * Carga los repuestos
   */
  loadSpareParts(): void {
    this.loading = true;
    this.error = null;

    this.vanguardiaApi.getSpareParts(this.spareFamily).subscribe({
      next: (response) => {
        this.spareData = response.data || [];
        this.loading = false;
        console.log('Repuestos cargados:', this.spareData);
      },
      error: (err) => {
        this.error = 'Error al cargar repuestos: ' + err.message;
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }

  /**
   * Realiza el login
   */
  login(): void {
    if (!this.username || !this.password) {
      this.error = 'Por favor ingresa usuario y contraseña';
      return;
    }

    this.loading = true;
    this.error = null;

    this.vanguardiaApi.login({
      username: this.username,
      password: this.password
    }).subscribe({
      next: (response) => {
        this.authToken = response.data.token;
        this.vanguardiaApi.setAuthToken(this.authToken);
        this.loading = false;
        console.log('Login exitoso:', response);
      },
      error: (err) => {
        this.error = 'Error en login: ' + err.message;
        this.loading = false;
        console.error('Error:', err);
      }
    });
  }
}
