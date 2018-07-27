import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CfgValorVehiculoComponent } from './cfgValorVehiculo.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { CfgValorVehiculoService } from '../../services/cfgValorVehiculo.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';
// import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [CfgValorVehiculoComponent,NewComponent,EditComponent],
    exports: [CfgValorVehiculoComponent, NewComponent,EditComponent],
    providers:[CfgValorVehiculoService]
})

export class CfgValorVehiculoModule { }
