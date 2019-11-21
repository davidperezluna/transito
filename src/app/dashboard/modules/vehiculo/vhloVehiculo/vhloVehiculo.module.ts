import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VhloVehiculoService } from '../../../../services/vhloVehiculo.service';
import { VhloCfgCarroceriaService } from '../../../../services/vhloCfgCarroceria.service';

import { NewVehiculoComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { ChartsModule } from 'ng2-charts';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, ChartsModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [NewVehiculoComponent,EditComponent],
    exports: [NewVehiculoComponent,EditComponent],
    providers:[VhloVehiculoService,VhloCfgCarroceriaService]
})

export class VhloVehiculoModule { }
