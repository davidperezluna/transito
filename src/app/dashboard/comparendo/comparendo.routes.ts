import { Route } from '@angular/router';
import { ComparendoComponent } from '.';
import { NewComponent } from '.';
import { StateComponent } from '.';
import { SearchComponent } from '.';
import { ExportComponent } from '.';

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
    },

    {
      path: 'comparendo/search',
      component: SearchComponent
    },

    {
    path: 'comparendo/export',
    component: ExportComponent
    }
];
 