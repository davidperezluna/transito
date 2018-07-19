import { Route } from '@angular/router';
import { ComparendoComponent } from '.';
import { NewComponent } from '.';

export const ComparendoRoutes: Route[] = [
    {
      path: 'comparendo',
      component: ComparendoComponent
    },

    {
      path: 'comparendo/new',
      component: NewComponent
    }
];
 