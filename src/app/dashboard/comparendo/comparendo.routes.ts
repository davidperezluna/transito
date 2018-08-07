import { Route } from '@angular/router';
import { ComparendoComponent } from '.';
import { NewComponent } from '.';
import { StateComponent } from '.';

export const ComparendoRoutes: Route[] = [
    {
      path: 'comparendo',
      component: ComparendoComponent
    },

    {
      path: 'comparendo/new',
      component: NewComponent
    },

    {
      path: 'comparendo/state',
      component: StateComponent
    }
];
 