import { Route } from '@angular/router';
import { GdDocumentoComponent } from '.';
import { TemplateComponent } from '.';
import { SearchComponent } from '.';

export const GdDocumentoRoutes: Route[] = [
    {
      path: 'gdDocumento',
      component: GdDocumentoComponent
    },

    {
      path: 'documentotemplate',
      component: TemplateComponent
    },

    {
      path: 'documentosearch',
      component: SearchComponent
    }
];
 