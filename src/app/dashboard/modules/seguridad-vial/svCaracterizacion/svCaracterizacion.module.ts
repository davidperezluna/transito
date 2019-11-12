import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';

import { SvCaracterizacionService } from '../../../../services/svCaracterizacion.service';
import { UserCfgGrupoSanguineoService } from "../../../../services/userCfgGrupoSanguineo.service";
import { VhloCfgTipoVehiculoService } from 'app/services/vhloCfgTipoVehiculo.service';
import { VhloCfgLineaService } from 'app/services/vhloCfgLinea.service';
import { VhloCfgMarcaService } from 'app/services/vhloCfgMarca.service';
import { VhloCfgColorService } from 'app/services/vhloCfgColor.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [NewComponent,EditComponent],
    exports: [NewComponent,EditComponent],
    providers:[
        SvCaracterizacionService,
        UserCfgGrupoSanguineoService,
        VhloCfgTipoVehiculoService,
        VhloCfgLineaService,
        VhloCfgMarcaService,
        VhloCfgColorService,
    ]
})

export class SvCaracterizacionModule { }
