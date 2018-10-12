import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RnaPreasignacionInsumoComponent } from './rnaPreasignacionInsumo.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {SelectModule} from 'angular2-select';
import {RnaInsumoService} from '../../services/rnaInsumos.service';
import { CfgCasoInsumoService } from '../../services/cfgCasoInsumo.service';
import { ImoTrazabilidadService } from '../../services/imoTrazabilidad.service';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [RnaPreasignacionInsumoComponent],
    exports: [RnaPreasignacionInsumoComponent],
    providers:[RnaInsumoService,CfgCasoInsumoService,ImoTrazabilidadService]
})

export class rnaPreasignacionInsumoModule { }