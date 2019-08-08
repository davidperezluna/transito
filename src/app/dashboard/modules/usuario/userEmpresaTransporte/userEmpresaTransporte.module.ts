import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';
import { TooltipModule } from "ngx-tooltip";

import { UserEmpresaTransporteService } from '../../../../services/userEmpresaTransporte.service';
import { VhloCfgRadioAccionService } from "../../../../services/vhloCfgRadioAccion.service";
import { VhloCfgModalidadTransporteService } from "../../../../services/vhloCfgModalidadTransporte.service";
import { VhloCfgServicioService } from "../../../../services/vhloCfgServicio.service";
import { VhloCfgClaseService } from "../../../../services/vhloCfgClase.service";
import { VhloCfgColorService } from "../../../../services/vhloCfgColor.service";
import { VhloCfgCarroceriaService } from "../../../../services/vhloCfgCarroceria.service";
import { CfgMunicipioService } from "../../../../services/cfgMunicipio.service";

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule, TooltipModule],
    declarations: [
        NewComponent,
        EditComponent,
    ],
    exports: [
        NewComponent,
        EditComponent,
    ],
    providers: [
        UserEmpresaTransporteService,
        VhloCfgRadioAccionService,
        VhloCfgModalidadTransporteService,
        VhloCfgServicioService,
        VhloCfgClaseService,
        VhloCfgColorService,
        VhloCfgCarroceriaService,
        CfgMunicipioService,
    ]
})

export class UserEmpresaTransporteModule { }
