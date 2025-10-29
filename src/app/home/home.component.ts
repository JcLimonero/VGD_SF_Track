import { Component, ViewChild } from '@angular/core';
import { VexPageLayoutComponent } from '@vex/components/vex-page-layout/vex-page-layout.component';
import { MenuComponent } from '../components/menu/menu.component';
import { CommonModule } from '@angular/common';
import { InvoiceTableComponent } from '../components/invoice-table/invoice-table.component';
import { InvoiceFilterComponent } from "../components/invoice-filter/invoice-filter.component";
import { TabsComponent } from '../components/tabs/tabs.component';


@Component({
  selector: 'vex-home',
  standalone: true,
  imports: [
    VexPageLayoutComponent,
    MenuComponent,
    CommonModule,
    InvoiceTableComponent,
    InvoiceFilterComponent,
    TabsComponent
],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})

export class HomeComponent {
  @ViewChild('invoiceTable') invoiceTable!: InvoiceTableComponent;

  handleFilter(filters: any) {
    console.log('Home -> filter recibido:', filters); // <-- debug
    if (this.invoiceTable && this.invoiceTable.applyFilter) {
      this.invoiceTable.applyFilter(filters);
    } else {
      console.warn('invoiceTable no disponible aún o no tiene applyFilter');
    }
  }
}
