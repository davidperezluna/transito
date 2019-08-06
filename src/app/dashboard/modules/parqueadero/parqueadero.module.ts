import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TooltipModule } from "ngx-tooltip";
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'angular2-select';

import { PqoCfgGruaComponent } from './pqoCfgGrua/pqoCfgGrua.component';
import { PqoCfgPatioComponent } from './pqoCfgPatio/pqoCfgPatio.component';
import { PqoCfgTarifaComponent } from './pqoCfgTarifa/pqoCfgTarifa.component';
import { PqoGruaCiudadanoComponent } from './pqoGruaCiudadano/pqoGruaCiudadano.component';
import { PqoInmovilizacionComponent } from './pqoInmovilizacion/pqoInmovilizacion.component';
import { SearchComponent } from './pqoInmovilizacion/search/search.component';

import { ParqueaderoRoutingModule } from './parqueadero-routing.module';
import { PqoCfgGruaModule } from './pqoCfgGrua/pqoCfgGrua.module';
import { PqoCfgPatioModule } from './pqoCfgPatio/pqoCfgPatio.module';
import { PqoCfgTarifaModule } from './pqoCfgTarifa/pqoCfgTarifa.module';
import { PqoGruaCiudadanoModule } from './pqoGruaCiudadano/pqoGruaCiudadano.module';
import { PqoInmovilizacionModule } from './pqoInmovilizacion/pqoInmovilizacion.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TooltipModule,
    FormsModule,
    SelectModule,
    ParqueaderoRoutingModule,
    PqoCfgGruaModule,
    PqoCfgPatioModule,
    PqoCfgTarifaModule,
    PqoGruaCiudadanoModule,
    PqoInmovilizacionModule,
  ],
  declarations: [
    PqoCfgGruaComponent,
    PqoCfgPatioComponent,
    PqoCfgTarifaComponent,
    PqoGruaCiudadanoComponent,
    PqoInmovilizacionComponent,
    SearchComponent,
  ]
})
export class ParqueaderoModule { }
