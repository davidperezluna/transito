import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';

import { CfgModuloService } from '../../../../services/cfgModulo.service';
import { CfgOrganismoTransitoService } from '../../../../services/cfgOrganismoTransito.service';
import { VhloPlacaSedeService } from '../../../../services/vhloPlacaSede.service';
import { VhloCfgTipoVehiculoService } from "../../../../services/vhloCfgTipoVehiculo.service";
import { VhloCfgServicioService } from "../../../../services/vhloCfgServicio.service";

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { RequestComponent } from './request/request.component';
import { VhloPlacaSedeDeliveredComponent } from './delivered/delivered.component';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [NewComponent, EditComponent, RequestComponent, VhloPlacaSedeDeliveredComponent],
    exports: [NewComponent, EditComponent, RequestComponent],
    providers: [
        CfgModuloService,
        CfgOrganismoTransitoService,
        VhloPlacaSedeService,
        VhloCfgTipoVehiculoService,
        VhloCfgServicioService,
    ]
})

export class VhloPlacaSedeModule { }
