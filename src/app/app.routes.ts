import { Routes } from '@angular/router';

// empieza la carga del front end

import { LoginRoutes } from './login/login.routes';


import { DashboardRoutes } from './dashboard/dashboard.routes';


import { LoginComponent } from './login';

export const routes: Routes = [
  ...LoginRoutes,
  ...DashboardRoutes,
 
  {
    path: '**',
    component: LoginComponent
   }
];
