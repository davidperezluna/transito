import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsvInventarioSenialComponent } from './msvInventarioSenial.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

 import { MsvInventarioSenialService } from '../../services/msvInventarioSenial.service';
 import { CfgTipoDestinoService } from '../../services/cfgTipoDestino.service';
 import { CfgBodegaService } from '../../services/cfgBodega.service';
 import { MunicipioService } from '../../services/municipio.service';
 import { CfgTipoSenialService } from '../../services/cfgTipoSenial.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';
// import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [MsvInventarioSenialComponent,NewComponent,EditComponent],
    exports: [MsvInventarioSenialComponent, NewComponent,EditComponent],
    providers: [MsvInventarioSenialService, CfgTipoDestinoService, CfgBodegaService, MunicipioService, CfgTipoSenialService]
})

export class MsvInventarioSenialModule { }
