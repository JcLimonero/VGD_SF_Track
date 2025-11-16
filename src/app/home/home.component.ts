import { Component, ViewChild } from '@angular/core';
import { VexPageLayoutComponent } from '@vex/components/vex-page-layout/vex-page-layout.component';
import { MenuComponent } from '../components/menu/menu.component';
import { CommonModule } from '@angular/common';
import { InvoiceTableComponent } from '../components/invoice-table/invoice-table.component';
import { InvoiceFilterComponent } from "../components/invoice-filter/invoice-filter.component";
import { TabsComponent } from '../components/tabs/tabs.component';
import { InventoryTableComponent } from '../components/inventory/inventory-table/inventory-table.component';
import { InventoryFilterComponent } from "../components/inventory/inventory-filter/inventory-filter.component";


@Component({
  selector: 'vex-home',
  standalone: true,
  imports: [
    VexPageLayoutComponent,
    MenuComponent,
    CommonModule,
    InvoiceTableComponent,
    InvoiceFilterComponent,
    TabsComponent,
    InventoryTableComponent,
    InventoryFilterComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  @ViewChild('invoiceTable') invoiceTable!: InvoiceTableComponent;
  @ViewChild('inventoryTable') inventoryTable!: InventoryTableComponent;
  
  activeTab = 'orders'; // Tab activo por defecto: Ordenes

  onTabChanged(tabId: string): void {
    this.activeTab = tabId;
    console.log('🏠 Home - Tab cambiado a:', tabId);
  }

  handleFilter(filters: any) {
    console.log('Home -> filter recibido:', filters); // <-- debug
    if (this.invoiceTable && this.invoiceTable.applyFilter) {
      this.invoiceTable.applyFilter(filters);
    } else {
      console.warn('invoiceTable no disponible aún o no tiene applyFilter');
    }
  }

  handleDownload(): void {
    if (this.invoiceTable && this.invoiceTable.downloadExcel) {
      this.invoiceTable.downloadExcel();
    } else {
      console.warn('invoiceTable no disponible aún o no tiene downloadExcel');
    }
  }

  handleInventoryFilter(filters: any) {
    console.log('Home -> inventory filter recibido:', filters);
    console.log('🔍 Filtro por idAgency:', filters?.idAgency);
    if (this.inventoryTable && this.inventoryTable.applyFilter) {
      this.inventoryTable.applyFilter(filters);
    } else {
      console.warn('inventoryTable no disponible aún o no tiene applyFilter');
    }
  }

  handleInventoryDownload(): void {
    if (this.inventoryTable && this.inventoryTable.downloadExcel) {
      this.inventoryTable.downloadExcel();
    } else {
      console.warn('inventoryTable no disponible aún o no tiene downloadExcel');
    }
  }
}
