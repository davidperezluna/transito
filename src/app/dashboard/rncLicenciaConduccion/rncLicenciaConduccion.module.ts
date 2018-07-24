import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RncLicenciaConduccionComponent } from './rncLicenciaConduccion.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { RncLicenciaConduccionService } from '../../services/rncLicenciaConduccion.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [RncLicenciaConduccionComponent,NewComponent,EditComponent],
    exports: [RncLicenciaConduccionComponent, NewComponent,EditComponent],
    providers:[RncLicenciaConduccionService]
})

export class RncLicenciaConduccionModule { }
