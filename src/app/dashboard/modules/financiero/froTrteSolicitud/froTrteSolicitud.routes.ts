import { Route } from '@angular/router';
/* import { FroTrteSolicitudComponent } from '.'; */
import { NewRncComponent } from '.';
/* import { NewRnaComponent } from '.'; */
/* import { NewRnetComponent } from '.'; */
import { NewRnmaComponent } from '.';
import { NewRnrsComponent } from '.';
/* import { ReportesRnetComponent } from './newRnet/reportes/reportesRnet.component'; */

export const FroTrteSolicitudRoutes: Route[] = [
    /* {
      path: 'froTrteSolicitud',
      component: FroTrteSolicitudComponent
    }, */

    {
      path: 'tramitesolicitud/rnc',
      component: NewRncComponent
    },

    /* {
      path: 'tramitesolicitud/rna',
      component: NewRnaComponent
    }, */

    /* {
      path: 'tramitesolicitud/rnet',
      component: NewRnetComponent
    }, */

    {
      path: 'tramitesolicitud/rnma',
      component: NewRnmaComponent
    },

    {
      path: 'tramitesolicitud/rnrs',
      component: NewRnrsComponent
    },

    /* {
      path: 'tramitesolicitud/rnet/reportes',
      component: ReportesRnetComponent
    } */
];
 