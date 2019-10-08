import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UserCfgMenuComponent } from './userCfgMenu/userCfgMenu.component';
import { UserCfgTipoIdentificacionComponent } from './userCfgTipoIdentificacion/userCfgTipoIdentificacion.component';
import { UserUsuarioMenuComponent } from './userUsuarioMenu/userUsuarioMenu.component';
import { UserEmpresaTransporteComponent } from './userEmpresaTransporte/userEmpresaTransporte.component';
import { UserEmpresaComponent } from './userEmpresa/userEmpresa.component';
import { UserCiudadanoComponent } from './userCiudadano/userCiudadano.component';
import { UserLcCfgCategoriaComponent } from './userLcCfgCategoria/userLcCfgCategoria.component';
import { UserLcCfgRestriccionComponent } from './userLcCfgRestriccion/userLcCfgRestriccion.component';
import { UserLicenciaConduccionComponent } from './userLicenciaConduccion/userLicenciaConduccion.component';
import { SearchComponent } from './userLicenciaConduccion/search/search.component';
import { newProhibicionComponent } from './userLicenciaConduccion/newProhibicion/newProhibicion.component';
import { reporteProhibicionComponent } from './userLicenciaConduccion/reporteProhibicion/reporteProhibicion.component';
import { UserMedidaCautelarComponent } from './userMedidaCautelar/userMedidaCautelar.component';
  
const routes: Routes = [ 
  {
    path: 'userCfgMenu',
    component: UserCfgMenuComponent
  },
  {
    path: 'userCfgTipoIdentificacion',
    component: UserCfgTipoIdentificacionComponent
  },
  {
    path: 'userUsuarioMenu',
    component: UserUsuarioMenuComponent
  },
  {
    path: 'userEmpresaTransporte',
    component: UserEmpresaTransporteComponent
  },
  {
    path: 'userEmpresa',
    component: UserEmpresaComponent
  },
  {
    path: 'userCiudadano',
    component: UserCiudadanoComponent
  },
  {
    path: 'userLcCfgCategoria',
    component: UserLcCfgCategoriaComponent
  },
  {
    path: 'userLcCfgRestriccion',
    component: UserLcCfgRestriccionComponent
  },
  {
    path: 'userLicenciaConduccion',
    component: UserLicenciaConduccionComponent
  },
  {
    path: 'searchLicencia',
    component: SearchComponent
  },
  {
    path: 'newProhibicion',
    component: newProhibicionComponent
  },
  {
    path: 'reporteProhibicion',
    component: reporteProhibicionComponent
  },
  
  {
    path: 'userMedidaCautelar',
    component: UserMedidaCautelarComponent
  },
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuarioRoutingModule { }
