import { Route } from '@angular/router';
import { CvCdoComparendoComponent } from '.';
import { NewComponent } from '.';
import { StateComponent } from '.';
import { SearchComponent } from '.';
import { InventoryComponent } from '.';

export const CvCdoComparendoRoutes: Route[] = [
    {
      path: 'cvCdoComparendo',
      component: CvCdoComparendoComponent
    },

    {
      path: 'comparendoNew',
      component: NewComponent
    },

    {
      path: 'comparendoState',
      component: StateComponent
    },

    {
      path: 'comparendoSearch',
      component: SearchComponent
    },

    {
      path: 'comparendoInventory',
      component: InventoryComponent
    },
];
 