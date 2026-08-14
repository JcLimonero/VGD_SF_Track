import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MockDataService } from '../../../services/mock-data.service';

export interface SalesforceSubTab {
  /** Nombre de la tabla en `vgd_dwh_prod` */
  id: string;
  /** Etiqueta legible que se muestra en la sub-pestaña */
  label: string;
}

/**
 * Sub-pestañas del módulo de Salesforce: una por cada tabla de `vgd_dwh_prod`
 * cuyo nombre contiene "honda".
 */
@Component({
  selector: 'vex-salesforce-subtabs',
  imports: [CommonModule],
  templateUrl: './salesforce-subtabs.component.html',
  styleUrl: './salesforce-subtabs.component.scss'
})
export class SalesforceSubtabsComponent implements OnInit {
  @Output() tabChanged = new EventEmitter<string>();

  tabs: SalesforceSubTab[] = [];

  /**
   * Sub-pestaña marcada. La decide el padre; ver el comentario equivalente en
   * `HondaSfSubtabsComponent`, que sufría el mismo desajuste al recrearse.
   *
   * Vacío significa "elige tú la primera": el componente sigue funcionando solo
   * si nadie lo enlaza.
   */
  @Input() activeTab = '';

  constructor(private mockData: MockDataService) {}

  ngOnInit(): void {
    this.tabs = this.mockData.getSalesforceTables().map((table) => ({
      id: table,
      label: this.mockData.getSalesforceTableLabel(table)
    }));

    // Solo si el padre no ha dicho ya cuál va marcada. El @Input llega antes
    // que ngOnInit, así que pisarlo aquí devolvería el fallo que esto arregla.
    if (!this.activeTab && this.tabs.length > 0) {
      this.activeTab = this.tabs[0].id;
    }
  }

  selectTab(tabId: string): void {
    if (this.activeTab === tabId) return;
    this.activeTab = tabId;
    this.tabChanged.emit(tabId);
  }

  isActive(tabId: string): boolean {
    return this.activeTab === tabId;
  }
}
