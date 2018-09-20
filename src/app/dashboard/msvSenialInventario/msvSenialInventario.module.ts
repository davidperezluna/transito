import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsvSenialInventarioComponent } from './msvSenialInventario.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

import { MsvSenialInventarioService } from '../../services/msvSenialInventario.service';
import { MsvSenialUbicacionService } from '../../services/msvSenialUbicacion.service';
import { CfgInventarioService } from '../../services/cfgInventario.service';
import { CfgTipoEstadoService } from '../../services/cfgTipoEstado.service';
import { CfgTipoColorService } from '../../services/cfgTipoColor.service';
import { CfgTipoDestinoService } from '../../services/cfgTipoDestino.service';
import { CfgBodegaService } from '../../services/cfgBodega.service';
import { MunicipioService } from '../../services/municipio.service';
import { CfgTipoSenialService } from '../../services/cfgTipoSenial.service';

import { NewSenialBodegaComponent } from './newSenialBodega/newSenialBodega.component';
import { NewSenialMunicipioComponent } from './newSenialMunicipio/newSenialMunicipio.component';
import { EditComponent } from './edit/edit.component';
import { LocationComponent } from './location/location.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [MsvSenialInventarioComponent, NewSenialBodegaComponent, NewSenialMunicipioComponent, EditComponent, LocationComponent],
    exports: [MsvSenialInventarioComponent, NewSenialBodegaComponent, NewSenialMunicipioComponent, EditComponent, LocationComponent],
    providers: [MsvSenialInventarioService, MsvSenialUbicacionService, CfgTipoDestinoService, CfgBodegaService, MunicipioService, CfgTipoSenialService, CfgTipoColorService, CfgTipoEstadoService, CfgInventarioService]
})

export class MsvSenialInventarioModule { }
