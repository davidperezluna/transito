import { Route } from '@angular/router';
import { FroFacturaComponent } from '.';
import { FroFacInfraccionComponent } from '.';

export const FroFacturaRoutes: Route[] = [
    {
      path: 'froFactura',
      component: FroFacturaComponent
    },
    
    {
      path: 'factura/infraccion',
      component: FroFacInfraccionComponent
    },
];
 