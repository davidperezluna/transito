import { Route } from '@angular/router';
import { UserEmpresaTransporteComponent } from '.';
import { RangeComponent } from "./range/range.component";

export const UserEmpresaTransporteRoutes: Route[] = [
    {
        path: 'userEmpresaTransporte',
        component: UserEmpresaTransporteComponent
    },
    {
        path: 'userEmpresaTransporte/range',
        component: RangeComponent
    },
];
