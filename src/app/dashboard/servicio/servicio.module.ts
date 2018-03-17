import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServicioComponent } from './servicio.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {ServicioService} from '../../services/servicio.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
// import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot()],
    declarations: [ServicioComponent,NewComponent,EditComponent],
    exports: [ServicioComponent, NewComponent,EditComponent],
    providers:[ServicioService]
})

export class ServicioModule { }
