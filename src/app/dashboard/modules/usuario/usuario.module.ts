import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';
import { TooltipModule } from "ngx-tooltip";
import { FormsModule } from '@angular/forms';

import { UserCfgMenuComponent } from './userCfgMenu/userCfgMenu.component';
import { UserUsuarioMenuComponent } from './userUsuarioMenu/userUsuarioMenu.component';
import { UserEmpresaTransporteComponent } from './userEmpresaTransporte/userEmpresaTransporte.component';
import { UserEmpresaComponent } from './userEmpresa/userEmpresa.component';
import { UserCiudadanoComponent } from './userCiudadano/userCiudadano.component';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UserCfgMenuModule } from './userCfgMenu/userCfgMenu.module';
import { UserUsuarioMenuModule } from './userUsuarioMenu/userUsuarioMenu.module';
import { UserEmpresaTransporteModule } from './userEmpresaTransporte/userEmpresaTransporte.module';
import { UserEmpresaModule } from './userEmpresa/userEmpresa.module';
import { UserCiudadanoModule } from './userCiudadano/userCiudadano.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TooltipModule,
    Ng2BootstrapModule.forRoot(),
    SelectModule,
    FormsModule,
    UsuarioRoutingModule,
    UserCfgMenuModule,
    UserUsuarioMenuModule,
    UserEmpresaTransporteModule,
    UserEmpresaModule,
    UserCiudadanoModule,
  ],
  declarations: [
    UserCfgMenuComponent,
    UserUsuarioMenuComponent,
    UserEmpresaTransporteComponent,
    UserEmpresaComponent,
    UserCiudadanoComponent,
  ]
})
export class UsuarioModule { }
