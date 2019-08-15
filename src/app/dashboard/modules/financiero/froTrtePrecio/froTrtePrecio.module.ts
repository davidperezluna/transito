import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';
import { TooltipModule } from "ngx-tooltip";
 
import { FroTrtePrecioService } from '../../../../services/froTrtePrecio.service';
import { FroTramiteService } from "../../../../services/froTramite.service";
import { FroTrteCfgConceptoService } from '../../../../services/froTrteCfgConcepto.service';
import { VhloCfgTipoVehiculoService } from "../../../../services/vhloCfgTipoVehiculo.service";
import { CfgModuloService } from '../../../../services/cfgModulo.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { RecordComponent } from './record/record.component';
@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule, TooltipModule],
    declarations: [NewComponent, EditComponent, RecordComponent],
    exports: [NewComponent, EditComponent, RecordComponent],
    providers: [
        FroTrtePrecioService,
        FroTramiteService,
        FroTrteCfgConceptoService,
        VhloCfgTipoVehiculoService,
        CfgModuloService
    ]
})

export class FroTrtePrecioModule { }
