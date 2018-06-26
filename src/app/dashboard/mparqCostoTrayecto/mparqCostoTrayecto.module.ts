import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MparqCostoTrayectoComponent } from './mparqCostoTrayecto.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { MparqCostoTrayectoService } from '../../services/mparqCostoTrayecto.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [MparqCostoTrayectoComponent,NewComponent,EditComponent],
    exports: [MparqCostoTrayectoComponent, NewComponent,EditComponent],
    providers:[MparqCostoTrayectoService]
})

export class MparqCostoTrayectoModule { }
