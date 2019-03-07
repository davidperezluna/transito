import { Route } from '@angular/router';
import { FroFacturaComponent } from '.';
import { FroFacAcuerdoPagoComponent } from '.';
import { FroFacInfraccionComponent } from '.';
import { FroFacTramiteComponent } from '.';

export const FroFacturaRoutes: Route[] = [
    {
      path: 'froFactura',
      component: FroFacturaComponent
    },

    {
      path: 'factura/acuerdoPago',
      component: FroFacAcuerdoPagoComponent
    },

    {
      path: 'factura/infraccion',
      component: FroFacInfraccionComponent
    },

    {
      path: 'factura/tramite',
      component: FroFacTramiteComponent
    }
];
 