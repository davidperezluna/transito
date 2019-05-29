import { Route } from '@angular/router';
import { UserMedidaCautelarComponent } from '.';
import { DeleteComponent } from '.';

export const UserMedidaCautelarRoutes: Route[] = [
    {
      path: 'userMedidaCautelar',
    component: UserMedidaCautelarComponent
    },

    {
      path: 'medidaCautelar/levantamiento',
      component: DeleteComponent
    }
];