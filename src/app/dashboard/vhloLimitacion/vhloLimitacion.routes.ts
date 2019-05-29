import { Route } from '@angular/router';
import { VhloLimitacionComponent } from '.';
import { DeleteComponent } from '.';

export const VhloLimitacionRoutes: Route[] = [
    {
      path: 'vhloLimitacion',
    component: VhloLimitacionComponent
    },

    {
      path: 'limitacion/levantamiento',
      component: DeleteComponent
    }
];