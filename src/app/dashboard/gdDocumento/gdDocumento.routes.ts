import { Route } from '@angular/router';
import { GdDocumentoComponent } from '.';
import { TemplateComponent } from '.';

export const GdDocumentoRoutes: Route[] = [
    {
      path: 'gdDocumento',
      component: GdDocumentoComponent
    },

    {
      path: 'gdDocumento/new',
      component: TemplateComponent
    }
];
 