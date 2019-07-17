import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VhloCfgNivelServicioComponent } from './vhloCfgNivelServicio.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {VhloCfgNivelServicioService} from '../../services/vhloCfgNivelServicio.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
// import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot()],
    declarations: [VhloCfgNivelServicioComponent,NewComponent,EditComponent],
    exports: [VhloCfgNivelServicioComponent, NewComponent,EditComponent],
    providers:[VhloCfgNivelServicioService]
})

export class VhloCfgNivelServicioModule { }
