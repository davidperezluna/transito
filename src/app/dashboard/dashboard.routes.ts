import { Route } from '@angular/router';

import { HomeRoutes } from './home/home.routes';
import { VehiculoRoutes } from './vehiculo/vehiculo.routes';
import { DashboardComponent } from './index';

export const DashboardRoutes: Route[] = [
    {
      path: 'dashboard',
      component: DashboardComponent,
      children: [
        ...HomeRoutes,
        ...VehiculoRoutes,
        
      ]
    }
];
