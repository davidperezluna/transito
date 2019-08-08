import { Route } from '@angular/router';
import { BpCdpComponent } from '.';
import { RequestComponent } from '.';

export const BpCdpRoutes: Route[] = [
    {
    path: 'bpCdp',
      component: BpCdpComponent
    },
    {
      path: 'request',
      component: RequestComponent
    }
];
 