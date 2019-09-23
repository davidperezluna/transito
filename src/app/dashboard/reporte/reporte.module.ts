import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteComponent } from './reporte.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { ChartsModule } from 'ng2-charts';
import {SelectModule} from 'angular2-select';

import { TramiteComponent } from './tramite/tramite.component';
import { MultaComponent } from './multa/multa.component';
import { RetefuenteComponent } from './retefuente/retefuente.component';

import { VhloCfgCarroceriaService} from '../../services/vhloCfgCarroceria.service';
import { VhloRemolqueService } from '../../services/vhloRemolque.service';
import { VhloCfgOrigenRegistroService } from '../../services/vhloCfgOrigenRegistro.service';

@NgModule({
    declarations: [ReporteComponent,TramiteComponent,MultaComponent,RetefuenteComponent],
    imports: [CommonModule, ChartsModule, Ng2BootstrapModule.forRoot(),SelectModule],
    exports: [ReporteComponent, TramiteComponent,MultaComponent,RetefuenteComponent],
    providers:[
        VhloRemolqueService,
        VhloCfgCarroceriaService,
        VhloCfgOrigenRegistroService
    ]
})

export class ReporteModule { }
