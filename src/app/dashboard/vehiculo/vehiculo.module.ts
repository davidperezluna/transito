import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiculoComponent } from './vehiculo.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { ChartsModule } from 'ng2-charts';
import {VehiculoService} from '../../services/vehiculo.service';
import {CarroceriaService} from '../../services/carroceria.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';

@NgModule({
    imports: [CommonModule, ChartsModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [VehiculoComponent,NewComponent,EditComponent],
    exports: [VehiculoComponent, NewComponent,EditComponent],
    providers:[VehiculoService,CarroceriaService]
})

export class VehiculoModule { }
