import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacturaInfraccionComponent } from './facturaInfraccion.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {FacturaInfraccionService} from '../../services/facturaInfraccion.service';
import { MflTipoRecaudoService } from '../../services/mflTipoRecaudo.service';


import {SelectModule} from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [FacturaInfraccionComponent],
    exports: [FacturaInfraccionComponent],
    providers:[FacturaInfraccionService,MflTipoRecaudoService]
})

export class FacturaInfraccionModule { }
