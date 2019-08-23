import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImoActaComponent } from "./imoActa/imoActa.component";
import { ImoAsignacionComponent } from "./imoAsignacion/imoAsignacion.component";
import { ImoBusquedaComponent } from "./imoBusqueda/imoBusqueda.component";
import { ImoCfgTipoComponent } from "./imoCfgTipo/imoCfgTipo.component";
import { ImoLoteComponent } from "./imoLote/imoLote.component";
import { ImoReasignacionComponent } from "./imoReasignacion/imoReasignacion.component";

const routes: Routes = [
  {
    path: 'imoActa',
    component: ImoActaComponent
  },
  {
    path: 'imoAsignacion',
    component: ImoAsignacionComponent
  },
  {
    path: 'imoBusqueda',
    component: ImoBusquedaComponent
  },
  {
    path: 'imoCfgTipo',
    component: ImoCfgTipoComponent
  },
  {
    path: 'imoLote',
    component: ImoLoteComponent
  },
  {
    path: 'imoReasignacion',
    component: ImoReasignacionComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InsumoRoutingModule { }
