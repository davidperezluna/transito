import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FroReporteIngresosComponent } from './froReporteIngresos.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { FroReporteIngresosService } from '../../services/froReporteIngresos.service';
import { FroFacturaService } from '../../services/froFactura.service';

/* import { NewComponent } from './new/new.component'; */
/* import { EditComponent } from './edit/edit.component'; */
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [FroReporteIngresosComponent],
    exports: [FroReporteIngresosComponent],
    providers: [FroReporteIngresosService, FroFacturaService]
})

export class FroReporteIngresosModule { }
