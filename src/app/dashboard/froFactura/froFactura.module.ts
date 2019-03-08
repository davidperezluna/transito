import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FroFacturaComponent } from './froFactura.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { FroFacturaService } from '../../services/froFactura.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { NewCiudadanoComponent } from './newCiudadano/newCiudadano.component';
import { FroFacAcuerdoPagoComponent } from './froFacAcuerdoPago/froFacAcuerdoPago.component';
import { FroFacInfraccionComponent } from './froFacInfraccion/froFacInfraccion.component';
import { FroFacTramiteComponent } from './froFacTramite/froFacTramite.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [
        FroFacturaComponent,
        NewComponent,
        EditComponent,
        NewCiudadanoComponent,
        FroFacAcuerdoPagoComponent, 
        FroFacInfraccionComponent, 
        FroFacTramiteComponent
    ],
    exports: [
        FroFacturaComponent, 
        NewComponent,
        EditComponent,
        NewCiudadanoComponent,
        FroFacAcuerdoPagoComponent, 
        FroFacInfraccionComponent, 
        FroFacTramiteComponent
    ],
    providers:[FroFacturaService]
})

export class FroFacturaModule { }
