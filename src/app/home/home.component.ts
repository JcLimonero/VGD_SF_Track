import { Component } from '@angular/core';
import { VexPageLayoutComponent } from '@vex/components/vex-page-layout/vex-page-layout.component';
import { VexBreadcrumbsComponent } from '@vex/components/vex-breadcrumbs/vex-breadcrumbs.component';
import { VexChartComponent } from '@vex/components/vex-chart/vex-chart.component';
import { VexProgressBarComponent } from '@vex/components/vex-progress-bar/vex-progress-bar.component';
import { VexShowdownComponent } from '@vex/components/vex-showdown/vex-showdown.component';
import { MenuComponent } from '../components/menu/menu.component';
import { CommonModule } from '@angular/common';
import { InvoiceTableComponent } from '../components/invoice-table/invoice-table.component';


@Component({
  selector: 'vex-home',
  standalone: true,
  imports: [
    VexPageLayoutComponent,
    MenuComponent,
    CommonModule,
    InvoiceTableComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  // Datos para el gráfico
  chartOptions = {
    series: [{
      name: 'Ventas',
      data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
    }],
    chart: {
      type: 'line' as const,
      height: 350
    },
    xaxis: {
      categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep']
    }
  };

  // Contenido Markdown
  markdownContent = `
# ¡Bienvenido a Vex!

Este es un ejemplo de cómo usar los componentes de Vex en tu aplicación.

## Características principales:
- **Diseño moderno** con Material Design
- **Componentes reutilizables**
- **Fácil personalización**

### Lista de tareas:
- [x] Configurar Vex
- [x] Crear componente Home
- [ ] Personalizar tema
- [ ] Agregar más páginas
  `;

  // Datos para breadcrumbs
  breadcrumbs = ['Dashboard', 'Home','Grafico'];
}
