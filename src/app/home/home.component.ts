import { Component, ViewChild } from '@angular/core';
import { VexPageLayoutComponent } from '@vex/components/vex-page-layout/vex-page-layout.component';
import { MenuComponent } from '../components/menu/menu.component';
import { CommonModule } from '@angular/common';
import { InvoiceTableComponent } from '../components/invoice-table/invoice-table.component';
import { InvoiceFilterComponent } from "../components/invoice-filter/invoice-filter.component";
import { TabsComponent } from '../components/tabs/tabs.component';
import { InventoryTableComponent } from '../components/inventory/inventory-table/inventory-table.component';
import { InventoryFilterComponent } from "../components/inventory/inventory-filter/inventory-filter.component";
import { CustomerTableComponent } from '../components/customer/customer-table/customer-table.component';
import { CustomerFilterComponent } from '../components/customer/customer-filter/customer-filter.component';
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
    InventoryFilterComponent,
    CustomerTableComponent,
    CustomerFilterComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  @ViewChild('invoiceTable') invoiceTable!: InvoiceTableComponent;
  @ViewChild('inventoryTable') inventoryTable!: InventoryTableComponent;
  @ViewChild('customerTable') customerTable!: CustomerTableComponent;
  
  activeTab = 'orders'; // Tab activo por defecto: Ordenes

  onTabChanged(tabId: string): void {
    this.activeTab = tabId;
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

  handleCustomerDownload(): void {
    if (this.customerTable && this.customerTable.downloadExcel) {
      this.customerTable.downloadExcel();
    } else {
      console.warn('customerTable no disponible aún o no tiene downloadExcel');
    }
  }


  handleCustomerFilter(filters: any) {
    if (this.customerTable && this.customerTable.applyFilter) {
      this.customerTable.applyFilter(filters);
    } else {
      console.warn('customerTable no disponible aún o no tiene applyFilter');
    }
  }
}