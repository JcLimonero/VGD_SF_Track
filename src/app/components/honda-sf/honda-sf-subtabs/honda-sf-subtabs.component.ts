import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HONDA_SF_TABLES, HondaSfTable } from '../honda-sf.catalog';

/**
 * Sub-pestañas de Honda SF: una por cada tabla de Salesforce que expone la API.
 *
 * La lista sale del catálogo y no de la API porque no hay un endpoint que
 * enumere las tablas disponibles; los siete nombres se verificaron a mano.
 */
@Component({
  selector: 'vex-honda-sf-subtabs',
  imports: [CommonModule],
  templateUrl: './honda-sf-subtabs.component.html',
  styleUrl: './honda-sf-subtabs.component.scss'
})
export class HondaSfSubtabsComponent {
  @Output() tabChanged = new EventEmitter<string>();

  readonly tabs: HondaSfTable[] = HONDA_SF_TABLES;
  activeTab = HONDA_SF_TABLES[0]?.id ?? '';

  selectTab(tabId: string): void {
    if (this.activeTab === tabId) return;
    this.activeTab = tabId;
    this.tabChanged.emit(tabId);
  }

  isActive(tabId: string): boolean {
    return this.activeTab === tabId;
  }
}
