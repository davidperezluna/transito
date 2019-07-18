import { Route } from '@angular/router';
import { SvCapacitacionComponent } from '.';
import { ReporteComponent } from './reporte/reporte.component';

export const SvCapacitacionRoutes: Route[] = [
    {
        path: 'svCapacitacion',
        component: SvCapacitacionComponent
    },
    {
        path: 'svCapacitacion/reporte',
        component: ReporteComponent
    }
];

