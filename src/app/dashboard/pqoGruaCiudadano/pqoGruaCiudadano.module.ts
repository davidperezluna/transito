import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PqoGruaCiudadanoComponent } from './pqoGruaCiudadano.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { PqoGruaCiudadanoService } from '../../services/pqoGruaCiudadano.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [PqoGruaCiudadanoComponent,NewComponent,EditComponent],
    exports: [PqoGruaCiudadanoComponent, NewComponent,EditComponent],
    providers:[PqoGruaCiudadanoService]
})

export class PqoGruaCiudadanoModule { }
