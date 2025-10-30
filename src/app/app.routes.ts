import { HomeComponent } from './home/home.component';
import { LoginComponent } from './components/login/login.component';
import { LayoutComponent } from './layouts/layout/layout.component';
import { AuthGuard } from './guards/auth.guard';
import { VexRoutes } from '@vex/interfaces/vex-route.interface';

/**
 * Routes configuration
 * - Login is the default route for unauthenticated users
 * - Home and other routes are protected by AuthGuard
 */
export const appRoutes: VexRoutes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'app',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      // add other child routes here, for example:
      // { path: 'dashboard', component: DashboardComponent }
    ]
  }
];
