import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VhloCfgTipoVehiculoComponent } from './vhloCfgTipoVehiculo.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { VhloCfgTipoVehiculoService } from '../../services/vhloCfgTipoVehiculo.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [VhloCfgTipoVehiculoComponent, NewComponent, EditComponent],
    exports: [VhloCfgTipoVehiculoComponent, NewComponent, EditComponent],
    providers: [VhloCfgTipoVehiculoService]
})

export class VhloCfgTipoVehiculoModule { }
