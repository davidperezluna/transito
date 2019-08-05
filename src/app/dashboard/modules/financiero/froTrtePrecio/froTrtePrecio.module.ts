import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';
import { TooltipModule } from "ngx-tooltip";
 
import { FroTrtePrecioService } from '../../../../services/froTrtePrecio.service';
import { FroTramiteService } from "../../../../services/froTramite.service";
import { VhloCfgClaseService } from "../../../../services/vhloCfgClase.service";
import { ModuloService } from "../../../../services/modulo.service";

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { RecordComponent } from './record/record.component';
@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule, TooltipModule],
    declarations: [NewComponent, EditComponent, RecordComponent],
    exports: [NewComponent, EditComponent, RecordComponent],
    providers: [FroTrtePrecioService,FroTramiteService,VhloCfgClaseService,ModuloService]
})

export class FroTrtePrecioModule { }
