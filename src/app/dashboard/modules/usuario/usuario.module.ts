import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TooltipModule } from "ngx-tooltip";
import { FormsModule } from '@angular/forms';

import { UserCfgMenuComponent } from './userCfgMenu/userCfgMenu.component';
import { UserUsuarioMenuComponent } from './userUsuarioMenu/userUsuarioMenu.component';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UserCfgMenuModule } from './userCfgMenu/userCfgMenu.module';
import { UserUsuarioMenuModule } from './userUsuarioMenu/userUsuarioMenu.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TooltipModule,
    FormsModule,
    UsuarioRoutingModule,
    UserCfgMenuModule,
    UserUsuarioMenuModule,
  ],
  declarations: [
    UserCfgMenuComponent,
    UserUsuarioMenuComponent,
  ]
})
export class UsuarioModule { }
