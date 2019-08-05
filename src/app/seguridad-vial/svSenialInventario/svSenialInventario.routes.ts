import { Route } from '@angular/router';
import { SvSenialInventarioComponent } from '.';
import { LocationComponent } from '.';

export const SvSenialInventarioRoutes: Route[] = [
    {
      path: 'svSenialInventario',
      component: SvSenialInventarioComponent
    },

    {
      path: 'senializacion/location',
      component: LocationComponent
    }
];