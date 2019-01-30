import { Route } from '@angular/router';
import { rpcccInventarioDocumentalComponent } from './rpcccInventarioDocumental.component';
import { ExportComponent } from './export/export.component';

export const RpcccInventarioDocumentalRoutes: Route[] = [
    {
      path: 'rpcccInventarioDocumental',
      component: rpcccInventarioDocumentalComponent
    },
    {
      path: 'rpcccInventarioDocumental/export',
      component: ExportComponent
    }
];
 