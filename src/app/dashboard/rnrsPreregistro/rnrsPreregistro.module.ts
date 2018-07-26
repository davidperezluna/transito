import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RnrsPreregistroComponent } from './rnrsPreregistro.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { ChartsModule } from 'ng2-charts';
import {RegistroRemolqueService} from '../../services/rnrsRegistroRemolque.service';
import {CarroceriaService} from '../../services/carroceria.service';
import {CfgOrigenRegistroService} from '../../services/cfgOrigenRegistro.service';

import { NewRegistroRemolqueComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
// import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';
// ,EditComponent
@NgModule({
    declarations: [RnrsPreregistroComponent,NewRegistroRemolqueComponent,EditComponent],
    imports: [CommonModule, ChartsModule, Ng2BootstrapModule.forRoot(),SelectModule],
    exports: [RnrsPreregistroComponent, NewRegistroRemolqueComponent,EditComponent],
    providers:[RegistroRemolqueService,CarroceriaService,CfgOrigenRegistroService]
})

export class RnrsPreregistroModule { }
