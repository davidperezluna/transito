import { Route } from '@angular/router';
import { PqoInmovilizacionComponent } from '.';
import { SearchComponent } from '.';

export const PqoInmovilizacionRoutes: Route[] = [
    {
      path: 'pqoInmovilizacion',
      component: PqoInmovilizacionComponent
    },

    {
      path: 'inmovilizacion/search',
      component: SearchComponent
    }
];
 