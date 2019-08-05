import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { VhloCfgModalidadTransporteComponent } from './vhloCfgModalidadTransporte.component';
import { VhloCfgModalidadTransporteService } from '../../../../services/vhloCfgModalidadTransporte.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [VhloCfgModalidadTransporteComponent,NewComponent,EditComponent],
    exports: [VhloCfgModalidadTransporteComponent, NewComponent,EditComponent],
    providers: [VhloCfgModalidadTransporteService]
})

export class VhloCfgModalidadTransporteModule { }
