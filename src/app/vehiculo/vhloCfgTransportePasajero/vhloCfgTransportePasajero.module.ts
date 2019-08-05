import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VhloCfgTransportePasajeroComponent } from './vhloCfgTransportePasajero.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { VhloCfgTransportePasajeroService } from '../../services/vhloCfgTransportePasajero.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [VhloCfgTransportePasajeroComponent,NewComponent,EditComponent],
    exports: [VhloCfgTransportePasajeroComponent, NewComponent,EditComponent],
    providers:[VhloCfgTransportePasajeroService]     
})

export class VhloCfgTransportePasajeroModule { }
