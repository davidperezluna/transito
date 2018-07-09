import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComparendoComponent } from './comparendo.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { ComparendoService } from '../../services/comparendo.service';
import { SedeOperativaService } from '../../services/sedeOperativa.service';
import { MpersonalFuncionarioService } from '../../services/mpersonalFuncionario.service';
import { CiudadanoVehiculoService } from '../../services/ciudadanoVehiculo.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [ComparendoComponent,NewComponent,EditComponent],
    exports: [ComparendoComponent, NewComponent,EditComponent],
    providers:[MpersonalFuncionarioService,ComparendoService,SedeOperativaService,CiudadanoVehiculoService]
})

export class ComparendoModule { }
