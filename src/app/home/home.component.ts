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
import { ServiceTableComponent } from '../components/servicios/service-table/service-table.component';
import { ServiceFilterComponent } from '../components/servicios/service-filter/service-filter.component';
import { DwhTableComponent } from '../components/dwh/dwh-table/dwh-table.component';
import { DwhFiltersComponent } from '../components/dwh/dwh-filters/dwh-filters.component';
import { LeadsTableComponent } from '../components/leads/leads-table/leads-table.component';
import { LeadsFilterComponent } from '../components/leads/leads-filter/leads-filter.component';
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
    CustomerFilterComponent,
    ServiceTableComponent,
    ServiceFilterComponent,
    DwhTableComponent,
    DwhFiltersComponent,
    LeadsTableComponent,
    LeadsFilterComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  @ViewChild('invoiceTable') invoiceTable!: InvoiceTableComponent;
  @ViewChild('inventoryTable') inventoryTable!: InventoryTableComponent;
  @ViewChild('customerTable') customerTable!: CustomerTableComponent;
  @ViewChild('serviceTable') serviceTable!: ServiceTableComponent;
  @ViewChild('dwhTable') dwhTable!: DwhTableComponent;
  @ViewChild('leadsTable') leadsTable!: LeadsTableComponent;
  
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

  handleServiceFilter(filters: any) {
    console.log('Home -> service filter recibido:', filters);
    if (this.serviceTable && this.serviceTable.applyFilter) {
      this.serviceTable.applyFilter(filters);
    } else {
      console.warn('serviceTable no disponible aún o no tiene applyFilter');
    }
  }

  handleServiceDownload(): void {
    if (this.serviceTable && this.serviceTable.downloadExcel) {
      this.serviceTable.downloadExcel();
    } else {
      console.warn('serviceTable no disponible aún o no tiene downloadExcel');
    }
  }

  handleDwhFilter(filters: any) {
    console.log('Home -> DWH filter recibido:', filters);
    if (this.dwhTable && this.dwhTable.applyFilter) {
      this.dwhTable.applyFilter(filters);
    } else {
      console.warn('dwhTable no disponible aún o no tiene applyFilter');
    }
  }

  handleDwhDownload(): void {
    if (this.dwhTable && this.dwhTable.downloadExcel) {
      this.dwhTable.downloadExcel();
    } else {
      console.warn('dwhTable no disponible aún o no tiene downloadExcel');
    }
  }

  handleLeadsFilter(filters: any) {
    console.log('Home -> Leads filter recibido:', filters);
    if (this.leadsTable && this.leadsTable.applyFilter) {
      this.leadsTable.applyFilter(filters);
    } else {
      console.warn('leadsTable no disponible aún o no tiene applyFilter');
    }
  }

  handleLeadsDownload(): void {
    if (this.leadsTable && this.leadsTable.downloadExcel) {
      this.leadsTable.downloadExcel();
    } else {
      console.warn('leadsTable no disponible aún o no tiene downloadExcel');
    }
  }
}