import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserCfgMenuComponent } from './userCfgMenu/userCfgMenu.component';
import { UserUsuarioMenuComponent } from './userUsuarioMenu/userUsuarioMenu.component';

const routes: Routes = [
  {
    path: 'userCfgMenu',
    component: UserCfgMenuComponent
  },
  {
    path: 'userUsuarioMenu',
    component: UserUsuarioMenuComponent
  },
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
