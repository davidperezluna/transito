import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';
import { TooltipModule } from "ngx-tooltip";

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UserCfgMenuComponent } from './userCfgMenu/userCfgMenu.component';
import { UserCfgMenuModule } from './userCfgMenu/userCfgMenu.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    Ng2BootstrapModule.forRoot(),
    SelectModule,
    TooltipModule,
    UsuarioRoutingModule,
    UserCfgMenuModule,
  ],
  declarations: [
    UserCfgMenuComponent
  ]
})
export class UsuarioModule { }
