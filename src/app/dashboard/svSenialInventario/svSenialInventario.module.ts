import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvSenialInventarioComponent } from './svSenialInventario.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

import { SvSenialInventarioService } from '../../services/svSenialInventario.service';
import { SvSenialUbicacionService } from '../../services/svSenialUbicacion.service';
import { CfgInventarioService } from '../../services/cfgInventario.service';
import { CfgBodegaService } from '../../services/cfgBodega.service';

import { NewSenialBodegaComponent } from './newSenialBodega/newSenialBodega.component';
import { NewSenialMunicipioComponent } from './newSenialMunicipio/newSenialMunicipio.component';
import { EditComponent } from './edit/edit.component';
import { LocationComponent } from './location/location.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [SvSenialInventarioComponent, NewSenialBodegaComponent, NewSenialMunicipioComponent, EditComponent, LocationComponent],
    exports: [SvSenialInventarioComponent, NewSenialBodegaComponent, NewSenialMunicipioComponent, EditComponent, LocationComponent],
    providers: [SvSenialInventarioService, SvSenialUbicacionService, CfgBodegaService, CfgInventarioService]
})

export class SvSenialInventarioModule { }
