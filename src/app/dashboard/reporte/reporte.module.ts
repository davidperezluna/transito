import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReporteComponent } from './reporte.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { ChartsModule } from 'ng2-charts';
import {RegistroMaquinariaService} from '../../services/registroMaquinaria.service';
import {CarroceriaService} from '../../services/carroceria.service';
import {CfgOrigenRegistroService} from '../../services/cfgOrigenRegistro.service';

import { TramiteComponent } from './tramite/tramite.component';
import { MultaComponent } from './multa/multa.component';
import { RetefuenteComponent } from './retefuente/retefuente.component';
import {SelectModule} from 'angular2-select';
// ,EditComponent
@NgModule({
    declarations: [ReporteComponent,TramiteComponent,MultaComponent,RetefuenteComponent],
    imports: [CommonModule, ChartsModule, Ng2BootstrapModule.forRoot(),SelectModule],
    exports: [ReporteComponent, TramiteComponent,MultaComponent,RetefuenteComponent],
    providers:[RegistroMaquinariaService,CarroceriaService,CfgOrigenRegistroService]
})

export class ReporteModule { }
