import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserCfgMenuComponent } from './userCfgMenu/userCfgMenu.component';

const routes: Routes = [
  {
    path: 'userCfgMenu',
    component: UserCfgMenuComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
