import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteComponent } from './reporte.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { ChartsModule } from 'ng2-charts';
import {VhloCfgCarroceriaService} from '../../services/vhloCfgCarroceria.service';
import { RnmaPreregistroService } from '../../services/rnmaPreregistro.service';
import { VhloCfgOrigenRegistroService } from '../../services/vhloCfgOrigenRegistro.service';

import { TramiteComponent } from './tramite/tramite.component';
import { MultaComponent } from './multa/multa.component';
import { RetefuenteComponent } from './retefuente/retefuente.component';
import {SelectModule} from 'angular2-select';
// ,EditComponent
@NgModule({
    declarations: [ReporteComponent,TramiteComponent,MultaComponent,RetefuenteComponent],
    imports: [CommonModule, ChartsModule, Ng2BootstrapModule.forRoot(),SelectModule],
    exports: [ReporteComponent, TramiteComponent,MultaComponent,RetefuenteComponent],
    providers:[RnmaPreregistroService,VhloCfgCarroceriaService,VhloCfgOrigenRegistroService]
})

export class ReporteModule { }
