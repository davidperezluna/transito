import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RnaPreasignacionInsumoComponent } from './rnaPreasignacionInsumo.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';
import { RnaInsumoService } from '../../services/rnaInsumos.service';
import { ImoAsignacionService } from '../../services/imoAsignacion.service';
import { CfgCasoInsumoService } from '../../services/cfgCasoInsumo.service';
import { ImoTrazabilidadService } from '../../services/imoTrazabilidad.service';
import { NewComponent } from './new/new.component';
import { ShowComponent } from './show/show.component';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [RnaPreasignacionInsumoComponent,NewComponent,ShowComponent],
    exports: [RnaPreasignacionInsumoComponent,NewComponent,ShowComponent],
    providers:[RnaInsumoService,CfgCasoInsumoService,ImoTrazabilidadService,ImoAsignacionService]
})

export class rnaPreasignacionInsumoModule { }