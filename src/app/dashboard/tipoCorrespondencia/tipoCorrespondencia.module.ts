import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoCorrespondenciaComponent } from './tipoCorrespondencia.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { TipoCorrespondenciaService } from '../../services/tipoCorrespondencia.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [TipoCorrespondenciaComponent,NewComponent,EditComponent],
    exports: [TipoCorrespondenciaComponent, NewComponent,EditComponent],
    providers:[TipoCorrespondenciaService]
})

export class TipoCorrespondenciaModule { }
