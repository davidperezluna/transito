import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MgdTipoCorrespondenciaComponent } from './mgdTipoCorrespondencia.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { MgdTipoCorrespondenciaService } from '../../services/mgdTipoCorrespondencia.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [MgdTipoCorrespondenciaComponent,NewComponent,EditComponent],
    exports: [MgdTipoCorrespondenciaComponent, NewComponent,EditComponent],
    providers:[MgdTipoCorrespondenciaService]
})

export class MgdTipoCorrespondenciaModule { }
