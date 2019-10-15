import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { VhloDevolucionRadicadoService } from '../../../../services/vhloDevolucionRadicado.service';

import { NewComponent } from './new/new.component';
/* import { EditComponent } from './edit/edit.component'; */
import { SelectModule } from 'angular2-select';

import { VhloVehiculoService } from '../../../../services/vhloVehiculo.service';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [NewComponent/* , EditComponent */],
    exports: [NewComponent/* , EditComponent */],
    providers: [
        VhloDevolucionRadicadoService,
        VhloVehiculoService,
    ]
})

export class VhloDevolucionRadicadoModule { } 
