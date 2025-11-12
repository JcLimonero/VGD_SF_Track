import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TabItem {
  id: string;
  label: string;
  icon: string;
}

@Component({
  selector: 'vex-tabs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tabs.component.html',
  styleUrl: './tabs.component.scss'
})
export class TabsComponent {
  @Output() tabChanged = new EventEmitter<string>();

  activeTab = 'orders'; // Tab por defecto: Ordenes

  tabs: TabItem[] = [
    { id: 'orders', label: 'Ordenes', icon: 'order_approve' },
    { id: 'inventory', label: 'Inventario', icon: 'inventory' },
    { id: 'services', label: 'Servicios', icon: 'car_repair' },
    { id: 'clients', label: 'Clientes', icon: 'group' },
    { id: 'dwh', label: 'DWH', icon: 'database' }
  ];

  selectTab(tabId: string): void {
    this.activeTab = tabId;
    this.tabChanged.emit(tabId);
  }

  isActive(tabId: string): boolean {
    return this.activeTab === tabId;
  }
}
