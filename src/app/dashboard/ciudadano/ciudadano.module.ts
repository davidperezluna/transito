import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CiudadanoComponent } from './ciudadano.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {CiudadanoService} from '../../services/ciudadano.service';
import {TipoIdentificacionService} from '../../services/tipoIdentificacion.service';

import { NewCiudadanoComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [CiudadanoComponent,NewCiudadanoComponent,EditComponent],
    exports: [CiudadanoComponent, NewCiudadanoComponent,EditComponent],
    providers:[CiudadanoService,TipoIdentificacionService]
})

export class CiudadanoModule { }
