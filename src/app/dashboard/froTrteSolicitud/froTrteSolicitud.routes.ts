import { Route } from '@angular/router';
import { FroTrteSolicitudComponent } from '.';
import { NewRncComponent } from '.';
import { NewRnaComponent } from '.';
import { NewRnmaComponent } from '.';
import { NewRnrsComponent } from '.';
import { ReportesComponent } from '.';

export const FroTrteSolicitudRoutes: Route[] = [
    {
      path: 'froTrteSolicitud',
      component: FroTrteSolicitudComponent
    },

    {
      path: 'tramitesolicitud/rnc',
      component: NewRncComponent
    },

    {
      path: 'tramitesolicitud/rna',
      component: NewRnaComponent
    },

    {
      path: 'tramitesolicitud/rnma',
      component: NewRnmaComponent
    },

    {
      path: 'tramitesolicitud/rnrs',
      component: NewRnrsComponent
    },

    {
      path: 'tramitesolicitud/reportes',
      component: ReportesComponent
    }
];
 