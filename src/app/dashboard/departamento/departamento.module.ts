import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartamentoComponent } from './departamento.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {DepartamentoService} from '../../services/departamento.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
// import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot()],
    declarations: [DepartamentoComponent,NewComponent,EditComponent],
    exports: [DepartamentoComponent, NewComponent,EditComponent],
    providers:[DepartamentoService]
})

export class DepartamentoModule { }
