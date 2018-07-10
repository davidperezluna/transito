import { Route } from '@angular/router';
import { FacturaComponent } from './index';

export const FacturaRoutes: Route[] = [
    {
      path: 'factura/:tipo',
      component: FacturaComponent
    }
];
 