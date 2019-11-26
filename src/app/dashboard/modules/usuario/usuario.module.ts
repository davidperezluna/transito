import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';
import { TooltipModule } from "ngx-tooltip";
import { FormsModule } from '@angular/forms';

import { UserCfgMenuComponent } from './userCfgMenu/userCfgMenu.component';
import { UserCfgTipoIdentificacionComponent } from './userCfgTipoIdentificacion/userCfgTipoIdentificacion.component';
import { UserUsuarioMenuComponent } from './userUsuarioMenu/userUsuarioMenu.component';
import { UserEmpresaTransporteComponent } from './userEmpresaTransporte/userEmpresaTransporte.component';
import { UserEmpresaComponent } from './userEmpresa/userEmpresa.component';
import { UserCiudadanoComponent } from './userCiudadano/userCiudadano.component';
import { UserLcCfgCategoriaComponent } from './userLcCfgCategoria/userLcCfgCategoria.component';
import { SearchComponent } from './userLicenciaConduccion/search/search.component';
import { UserLcCfgRestriccionComponent } from './userLcCfgRestriccion/userLcCfgRestriccion.component';
import { newCancelacionComponent } from './userLicenciaConduccion/newCancelacion/newCancelacion.component';
import { newSuspensionComponent } from './userLicenciaConduccion/newSuspension/newSuspension.component';
import { newProhibicionComponent } from './userLicenciaConduccion/newProhibicion/newProhibicion.component';
import { reporteProhibicionComponent } from './userLicenciaConduccion/reporteProhibicion/reporteProhibicion.component';
import { UserMedidaCautelarComponent } from './userMedidaCautelar/userMedidaCautelar.component';
import { UserCfgGrupoSanguineoComponent } from './userCfgGrupoSanguineo';
import { UserCfgGeneroComponent } from './userCfgGenero';
import { UserCfgGrupoEtnicoComponent } from './userCfgGrupoEtnico';
import { UserCfgEmpresaTipoComponent } from './userCfgEmpresaTipo';
import { UserCfgEmpresaServicioComponent } from './userCfgEmpresaServicio';

import { UsuarioRoutingModule } from './usuario-routing.module';
import { UserCfgMenuModule } from './userCfgMenu/userCfgMenu.module';
import { UserCfgTipoIdentificacionModule } from './userCfgTipoIdentificacion/userCfgTipoIdentificacion.module';
import { UserUsuarioMenuModule } from './userUsuarioMenu/userUsuarioMenu.module';
import { UserEmpresaTransporteModule } from './userEmpresaTransporte/userEmpresaTransporte.module';
import { UserEmpresaModule } from './userEmpresa/userEmpresa.module';
import { UserCiudadanoModule } from './userCiudadano/userCiudadano.module';
import { UserLcCfgCategoriaModule } from './userLcCfgCategoria/userLcCfgCategoria.module';
import { UserLcCfgRestriccionModule } from './userLcCfgRestriccion/userLcCfgRestriccion.module';
import { UserLicenciaConduccionModule } from './userLicenciaConduccion/userLicenciaConduccion.module';
import { UserMedidaCautelarModule } from './userMedidaCautelar/userMedidaCautelar.module';
import { UserCfgGrupoSanguineoModule } from './userCfgGrupoSanguineo/userCfgGrupoSanguineo.module';
import { UserCfgGeneroModule } from './userCfgGenero/userCfgGenero.module';
import { UserCfgGrupoEtnicoModule } from './userCfgGrupoEtnico/userCfgGrupoEtnico.module';
import { UserCfgEmpresaTipoModule } from './userCfgEmpresaTipo/userCfgEmpresaTipo.module';
import { UserCfgEmpresaServicioModule } from './userCfgEmpresaServicio/userCfgEmpresaServicio.module';


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
    UserCfgTipoIdentificacionModule,
    UserUsuarioMenuModule,
    UserEmpresaTransporteModule,
    UserEmpresaModule,
    UserCiudadanoModule,
    UserLcCfgCategoriaModule,
    UserLcCfgRestriccionModule,
    UserLicenciaConduccionModule,
    UserMedidaCautelarModule,
    UserCfgGrupoSanguineoModule,
    UserCfgGeneroModule,
    UserCfgGrupoEtnicoModule,
    UserCfgEmpresaTipoModule,
    UserCfgEmpresaServicioModule,
  ],
  declarations: [
    UserCfgMenuComponent,
    UserCfgTipoIdentificacionComponent,
    UserUsuarioMenuComponent,
    UserEmpresaTransporteComponent,
    UserEmpresaComponent,
    UserCiudadanoComponent,
    UserLcCfgCategoriaComponent,
    SearchComponent,
    UserLcCfgRestriccionComponent,
    newCancelacionComponent,
    newSuspensionComponent,
    newProhibicionComponent,
    UserMedidaCautelarComponent,
    reporteProhibicionComponent,
    UserCfgGrupoSanguineoComponent,
    UserCfgGeneroComponent,
    UserCfgGrupoEtnicoComponent,
    UserCfgEmpresaTipoComponent,
    UserCfgEmpresaServicioComponent,
  ],
  providers: []
})
export class UsuarioModule { }
