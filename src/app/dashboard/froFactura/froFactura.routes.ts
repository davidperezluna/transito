import { Route } from '@angular/router';
import { FroFacturaComponent } from '.';
import { FroFacInfraccionComponent } from '.';
import { FroFacAcuerdoPagoComponent } from '.';

export const FroFacturaRoutes: Route[] = [
    {
      path: 'froFactura',
      component: FroFacturaComponent
    },
    
    {
      path: 'factura/infraccion',
      component: FroFacInfraccionComponent
    },

    {
      path: 'factura/acuerdoPago',
      component: FroFacAcuerdoPagoComponent
    }
];
 