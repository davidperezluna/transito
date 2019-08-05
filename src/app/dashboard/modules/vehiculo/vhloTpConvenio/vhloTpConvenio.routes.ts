import { Route } from '@angular/router';
import { VhloTpConvenioComponent } from '.';
import { EnableComponent } from './enable/enable.component';

export const VhloTpConvenioRoutes: Route[] = [
    {
      path: 'vhloTpConvenio',
      component: VhloTpConvenioComponent
    },
    {
      path: 'vhloTpConvenio/enable',
      component: EnableComponent
    }
];
 