import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';

import { FroReporteIngresosService } from '../../../../services/froReporteIngresos.service';
import { FroFacturaService } from '../../../../services/froFactura.service';

/* import { NewComponent } from './new/new.component'; */
/* import { EditComponent } from './edit/edit.component'; */

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [],
    exports: [],
    providers: [FroReporteIngresosService, FroFacturaService]
})

export class FroReporteIngresosModule { }
