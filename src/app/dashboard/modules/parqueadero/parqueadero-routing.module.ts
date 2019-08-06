import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PqoCfgGruaComponent } from './pqoCfgGrua/pqoCfgGrua.component';
import { PqoCfgPatioComponent } from './pqoCfgPatio/pqoCfgPatio.component';
import { PqoCfgTarifaComponent } from './pqoCfgTarifa/pqoCfgTarifa.component';
import { PqoGruaCiudadanoComponent } from './pqoGruaCiudadano/pqoGruaCiudadano.component';
import { PqoInmovilizacionComponent } from './pqoInmovilizacion/pqoInmovilizacion.component';
import { SearchComponent } from './pqoInmovilizacion/search/search.component';

const routes: Routes = [
  {
    path: 'pqoCfgGrua',
    component: PqoCfgGruaComponent
  },
  {
    path: 'pqoCfgPatio',
    component: PqoCfgPatioComponent
  },
  {
    path: 'pqoCfgTarifa',
    component: PqoCfgTarifaComponent
  },
  {
    path: 'pqoGruaCiudadano',
    component: PqoGruaCiudadanoComponent
  },
  {
    path: 'pqoInmovilizacion',
    component: PqoInmovilizacionComponent
  },
  {
    path: 'inmovilizacionSearch',
    component: SearchComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParqueaderoRoutingModule { }
