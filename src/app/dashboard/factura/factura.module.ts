import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacturaComponent } from './factura.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {FacturaService} from '../../services/factura.service';
import { MflTipoRecaudoService } from '../../services/mflTipoRecaudo.service';

import { NewComponent } from './new/new.component';
import { ShowComponent } from './show/show.component';
import { EditComponent } from './edit/edit.component';
import { NewCiudadanoComponent } from './newCiudadano/newCiudadano.component';
import {SelectModule} from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [FacturaComponent,NewComponent,EditComponent,ShowComponent,NewCiudadanoComponent],
    exports: [FacturaComponent, NewComponent,EditComponent,ShowComponent,NewCiudadanoComponent],
    providers:[FacturaService,MflTipoRecaudoService]
})

export class FacturaModule { }
