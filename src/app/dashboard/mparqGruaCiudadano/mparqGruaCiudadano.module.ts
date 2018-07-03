import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MparqGruaCiudadanoComponent } from './mparqGruaCiudadano.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { MparqGruaCiudadanoService } from '../../services/mparqGruaCiudadano.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [MparqGruaCiudadanoComponent,NewComponent,EditComponent],
    exports: [MparqGruaCiudadanoComponent, NewComponent,EditComponent],
    providers:[MparqGruaCiudadanoService]
})

export class MparqGruaCiudadanoModule { }
