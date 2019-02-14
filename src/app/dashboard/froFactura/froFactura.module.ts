import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FroFacturaComponent } from './froFactura.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { FroFacturaService } from '../../services/froFactura.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { FroFacInfraccionComponent } from './froFacInfraccion/froFacInfraccion.component';
import { FroFacAcuerdoPagoComponent } from './froFacAcuerdoPago/froFacAcuerdoPago.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [FroFacturaComponent,NewComponent,EditComponent, FroFacInfraccionComponent, FroFacAcuerdoPagoComponent],
    exports: [FroFacturaComponent, NewComponent,EditComponent, FroFacInfraccionComponent, FroFacAcuerdoPagoComponent],
    providers:[FroFacturaService]
})

export class FroFacturaModule { }
