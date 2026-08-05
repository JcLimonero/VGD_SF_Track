import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { IntegrationInventoryFilterComponent } from './inventory/inventory-filter/inventory-filter.component';
import { IntegrationInventoryTableComponent } from './inventory/inventory-table/inventory-table.component';
import { IntegrationSalesFilterComponent } from './sales/sales-filter/sales-filter.component';
import { IntegrationSalesTableComponent } from './sales/sales-table/sales-table.component';
import { IntegrationCustomerFilterComponent } from './customers/customer-filter/customer-filter.component';
import { IntegrationCustomerTableComponent } from './customers/customer-table/customer-table.component';

@Component({
  selector: 'integration-module',
  standalone: true,
  imports: [
    CommonModule,
    IntegrationInventoryFilterComponent,
    IntegrationInventoryTableComponent,
    IntegrationSalesFilterComponent,
    IntegrationSalesTableComponent,
    IntegrationCustomerFilterComponent,
    IntegrationCustomerTableComponent
  ],
  templateUrl: './integration.component.html',
  styleUrls: ['./integration.component.scss']
})
export class IntegrationComponent {
  @ViewChild('integrationInventoryTable') integrationInventoryTable!: IntegrationInventoryTableComponent;
  @ViewChild('integrationSalesTable') integrationSalesTable!: IntegrationSalesTableComponent;
  @ViewChild('integrationCustomerTable') integrationCustomerTable!: IntegrationCustomerTableComponent;

  activeTab: 'inventory' | 'sales' | 'customers' = 'inventory';

  tabs: Array<{ id: 'inventory' | 'sales' | 'customers'; label: string; icon: string }> = [
    { id: 'inventory', label: 'Inventario', icon: 'inventory' },
    { id: 'sales', label: 'Ventas', icon: 'sell' },
    { id: 'customers', label: 'Clientes', icon: 'group' }
  ];

  selectTab(tabId: 'inventory' | 'sales' | 'customers'): void {
    this.activeTab = tabId;
  }

  isActive(tabId: 'inventory' | 'sales' | 'customers'): boolean {
    return this.activeTab === tabId;
  }

  handleInventoryFilter(filters: any): void {
    if (this.integrationInventoryTable?.applyFilter) {
      this.integrationInventoryTable.applyFilter(filters);
    }
  }

  handleInventoryDownload(): void {
    if (this.integrationInventoryTable?.downloadExcel) {
      this.integrationInventoryTable.downloadExcel();
    }
  }

  handleSalesFilter(filters: any): void {
    if (this.integrationSalesTable?.applyFilter) {
      this.integrationSalesTable.applyFilter(filters);
    }
  }

  handleSalesDownload(): void {
    if (this.integrationSalesTable?.downloadExcel) {
      this.integrationSalesTable.downloadExcel();
    }
  }

  handleCustomerFilter(filters: any): void {
    if (this.integrationCustomerTable?.applyFilter) {
      this.integrationCustomerTable.applyFilter(filters);
    }
  }

  handleCustomerDownload(): void {
    if (this.integrationCustomerTable?.downloadExcel) {
      this.integrationCustomerTable.downloadExcel();
    }
  }
}
