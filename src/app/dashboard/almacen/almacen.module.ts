import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlmacenComponent } from './almacen.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {AlmacenService} from '../../services/almacen.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [AlmacenComponent,NewComponent,EditComponent],
    exports: [AlmacenComponent, NewComponent,EditComponent],
    providers:[AlmacenService]
})

export class AlmacenModule { }
