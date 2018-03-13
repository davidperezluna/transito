import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiculoComponent } from './vehiculo.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { ChartsModule } from 'ng2-charts';
import {VehiculoService} from '../../services/vehiculo.service';

import { NewComponent } from './new/new.component';

@NgModule({
    imports: [CommonModule, ChartsModule, Ng2BootstrapModule.forRoot()],
    declarations: [VehiculoComponent,NewComponent],
    exports: [VehiculoComponent, NewComponent],
    providers:[VehiculoService]
})

export class VehiculoModule { }
