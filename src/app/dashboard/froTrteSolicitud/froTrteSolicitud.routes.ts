import { Route } from '@angular/router';
import { FroTrteSolicitudComponent } from '.';
import { NewRnmaComponent } from '.';
import { NewRnrsComponent } from '.';

export const FroTrteSolicitudRoutes: Route[] = [
    {
      path: 'froTrteSolicitud',
      component: FroTrteSolicitudComponent
    },

    {
      path: 'tramitesolicitud/rnma',
      component: NewRnmaComponent
    },

    {
      path: 'tramitesolicitud/rnrs',
      component: NewRnrsComponent
    }
];
 