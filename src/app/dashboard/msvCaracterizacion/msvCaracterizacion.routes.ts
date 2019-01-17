import { Route } from '@angular/router';
import { MsvCaracterizacionComponent } from '.';
import { ExportComponent } from './export/export.component';

export const MsvCaracterizacionRoutes: Route[] = [
    {
      path: 'msvCaracterizacion',
      component: MsvCaracterizacionComponent
    },
    {
      path: 'svcaracterizacion/export',
      component: ExportComponent
  }
];
 