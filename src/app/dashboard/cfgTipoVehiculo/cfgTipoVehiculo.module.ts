import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CfgTipoVehiculoComponent } from './cfgTipoVehiculo.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { CfgTipoVehiculoService } from '../../services/cfgTipoVehiculo.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [CfgTipoVehiculoComponent, NewComponent, EditComponent],
    exports: [CfgTipoVehiculoComponent, NewComponent, EditComponent],
    providers: [CfgTipoVehiculoService]
})

export class CfgTipoVehiculoModule { }
