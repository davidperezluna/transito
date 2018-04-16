import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TramiteFacturaComponent } from './tramiteFactura.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { TramiteFacturaService } from '../../services/tramiteFactura.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [TramiteFacturaComponent,NewComponent,EditComponent],
    exports: [TramiteFacturaComponent, NewComponent,EditComponent],
    providers:[TramiteFacturaService]
})

export class TramiteFacturaModule { }
