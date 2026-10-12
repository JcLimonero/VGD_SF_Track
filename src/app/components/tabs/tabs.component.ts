import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../core/auth/auth.service';

export interface TabItem {
  id: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'vex-tabs',
  imports: [CommonModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss'
})
export class TabsComponent {
  @Output() tabChanged = new EventEmitter<string>();

  /** Todas las pestañas del portal; cada perfil ve solo las suyas */
  private readonly allTabs: TabItem[] = [
    { id: 'orders', label: 'Ordenes', icon: 'order_approve' },
    { id: 'inventory', label: 'Inventario', icon: 'inventory' },
    { id: 'demos', label: 'Validar demos', icon: 'fact_check' },
    { id: 'services', label: 'Servicios', icon: 'car_repair' },
    { id: 'clients', label: 'Clientes', icon: 'group' },
    { id: 'leads', label: 'Leads', icon: 'database' },
    { id: 'dwh', label: 'DWH', icon: 'database' },
    { id: 'crabi', label: 'Crabi', icon: 'directions_car' },
    { id: 'salesforce', label: 'Integración SF', icon: 'cloud' },
    { id: 'hondasf', label: 'Honda SF', icon: 'cloud_sync' }
  ];

  /** Pestañas que el perfil de la sesión puede ver */
  tabs: TabItem[];

  /** Pestaña con la que abre el perfil (Órdenes para SALES FORCE, Crabi para CRABI) */
  activeTab: string;

  constructor(private auth: AuthService) {
    this.tabs = this.allTabs.filter((tab) => this.auth.canSee(tab.id));
    this.activeTab = this.auth.defaultTab() ?? 'orders';
  }

  selectTab(tabId: string): void {
    if (!this.auth.canSee(tabId)) return;
    this.activeTab = tabId;
    this.tabChanged.emit(tabId);
  }

  isActive(tabId: string): boolean {
    return this.activeTab === tabId;
  }
}
