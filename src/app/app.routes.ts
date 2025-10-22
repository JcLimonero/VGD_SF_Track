import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layouts/layout/layout.component';
import { VexRoutes } from '@vex/interfaces/vex-route.interface';

/**
 * Routes configuration
 * - Root path ('') renders HomeComponent directly so it won't be wrapped by LayoutComponent
 * - Other app routes can be placed under the 'app' path and will use the LayoutComponent
 */
export const appRoutes: VexRoutes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'app',
    component: LayoutComponent,
    children: [
      // add other child routes here, for example:
      // { path: 'dashboard', component: DashboardComponent }
    ]
  }
];
