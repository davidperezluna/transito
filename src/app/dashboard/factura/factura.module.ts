import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FacturaComponent } from './factura.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {FacturaService} from '../../services/factura.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [FacturaComponent,NewComponent,EditComponent],
    exports: [FacturaComponent, NewComponent,EditComponent],
    providers:[FacturaService]
})

export class FacturaModule { }
