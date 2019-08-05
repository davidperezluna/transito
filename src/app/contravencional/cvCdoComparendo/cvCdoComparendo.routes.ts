import { Route } from '@angular/router';
import { CvCdoComparendoComponent } from '.';
import { NewComponent } from '.';
import { StateComponent } from '.';
import { SearchComponent } from '.';
import { ExportComponent } from '.';

export const CvCdoComparendoRoutes: Route[] = [
    {
      path: 'cvCdoComparendo',
      component: CvCdoComparendoComponent
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
 