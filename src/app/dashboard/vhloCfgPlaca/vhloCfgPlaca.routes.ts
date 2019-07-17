import { Route } from '@angular/router';
import { VhloCfgPlacaComponent } from '.';
import { SearchComponent } from '.';

export const VhloCfgPlacaRoutes: Route[] = [
    {
      path: 'vhloCfgPlaca',
      component: VhloCfgPlacaComponent
    },

    {
      path: 'vehiculo/search',
      component: SearchComponent
    },
];