import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalidadComponent } from './modalidad.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {ModalidadService} from '../../services/modalidad.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
// import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot()],
    declarations: [ModalidadComponent,NewComponent,EditComponent],
    exports: [ModalidadComponent, NewComponent,EditComponent],
    providers:[ModalidadService]
})

export class ModalidadModule { }
