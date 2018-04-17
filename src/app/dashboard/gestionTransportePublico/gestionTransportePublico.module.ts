import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { VehiculoService} from '../../services/vehiculo.service';
import { CarroceriaService} from '../../services/carroceria.service';

import { SelectModule} from 'angular2-select';

@NgModule({
    imports: [CommonModule, ChartsModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [],
    exports: [],
    providers:[VehiculoService,CarroceriaService]
})

export class VehiculoModule { }
