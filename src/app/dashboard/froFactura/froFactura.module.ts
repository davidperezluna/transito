import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FroFacturaComponent } from './froFactura.component';
import { FroFacturaService } from '../../services/froFactura.service';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { FroFacAcuerdoPagoComponent } from './froFacAcuerdoPago/froFacAcuerdoPago.component';
import { FroFacInfraccionComponent } from './froFacInfraccion/froFacInfraccion.component';
import { FroFacTramiteComponent } from './froFacTramite/froFacTramite.component';
import { FroFacParqueaderoComponent } from './froFacParqueadero/froFacParqueadero.component';

import { UserCiudadanoModule } from '../userCiudadano/userCiudadano.module';

@NgModule({
    imports: [
        CommonModule, 
        Ng2BootstrapModule.forRoot(),
        SelectModule,
        UserCiudadanoModule
    ],
    declarations: [
        FroFacturaComponent,
        NewComponent,
        EditComponent,
        FroFacAcuerdoPagoComponent, 
        FroFacInfraccionComponent, 
        FroFacTramiteComponent,
        FroFacParqueaderoComponent
    ],
    exports: [
        FroFacturaComponent, 
        NewComponent,
        EditComponent,
        FroFacAcuerdoPagoComponent, 
        FroFacInfraccionComponent, 
        FroFacTramiteComponent,
        FroFacParqueaderoComponent
    ],
    providers:[FroFacturaService]
})

export class FroFacturaModule { }
