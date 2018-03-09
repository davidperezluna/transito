import { Route } from '@angular/router';

import { VehiculoRoutes } from './vehiculo/vehiculo.routes';

import { ParametrizacionComponent } from './index';

export const ParametrizacionRoutes: Route[] = [
    {
      path: 'parametrizacion',
      component: ParametrizacionComponent,
      children: [
        ...VehiculoRoutes,
      ]
    }
];
