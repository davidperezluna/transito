import { Route } from '@angular/router';
import { ComparendoComponent } from './index';
import { NewComponent } from './index';

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
 