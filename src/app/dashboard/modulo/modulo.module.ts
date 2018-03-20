import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModuloComponent } from './modulo.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {ModuloService} from '../../services/modulo.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
// import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot()],
    declarations: [ModuloComponent,NewComponent,EditComponent],
    exports: [ModuloComponent, NewComponent,EditComponent],
    providers:[ModuloService]
})

export class ModuloModule { }
