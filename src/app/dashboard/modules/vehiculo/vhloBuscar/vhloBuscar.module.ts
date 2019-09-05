import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';

import { ShowComponent } from './show/show.component';

import { VhloVehiculoService } from '../../../../services/vhloVehiculo.service';
import { VhloPropietarioService } from '../../../../services/vhloPropietario.service'

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [ShowComponent],
    exports: [ShowComponent],
    providers:[
        VhloVehiculoService,
        VhloPropietarioService,
    ]
})

export class VhloBuscarModule { }
