import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { ChartsModule } from 'ng2-charts';

import { CfgOrganismoTransitoService } from '../../../../services/cfgOrganismoTransito.service';
import { VhloRnaPreregistroService } from '../../../../services/vhloRnaPreregistro.service';
import { VhloCfgCarroceriaService } from '../../../../services/vhloCfgCarroceria.service';
import { VhloCfgRadioAccionService } from '../../../../services/vhloCfgRadioAccion.service';
import { VhloCfgModalidadTransporteService } from '../../../../services/vhloCfgModalidadTransporte.service';
import { VhloCfgLineaService } from '../../../../services/vhloCfgLinea.service';
import { VhloCfgClaseService } from '../../../../services/vhloCfgClase.service';
import { VhloCfgServicioService } from '../../../../services/vhloCfgServicio.service';
import { VhloCfgColorService } from '../../../../services/vhloCfgColor.service';
import { VhloCfgCombustibleService } from '../../../../services/vhloCfgCombustible.service';
import { VhloCfgMarcaService } from '../../../../services/vhloCfgMarca.service';
import { VhloPropietarioService } from '../../../../services/vhloPropietario.service';
import { UserCfgTipoIdentificacionService } from '../../../../services/userCfgTipoIdentificacion.service';
import { UserCiudadanoService } from '../../../../services/userCiudadano.service';
import { UserEmpresaService } from "../../../../services/userEmpresa.service";
import { PnalFuncionarioService } from '../../../../services/pnalFuncionario.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';

import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, ChartsModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [NewComponent,EditComponent],
    exports: [NewComponent,EditComponent],
    providers:[
        CfgOrganismoTransitoService,
        VhloRnaPreregistroService,
        VhloCfgCarroceriaService,
        VhloCfgRadioAccionService,
        VhloCfgModalidadTransporteService,
        VhloCfgLineaService,
        VhloCfgClaseService,
        VhloCfgServicioService,
        VhloCfgColorService,
        VhloCfgCombustibleService,
        VhloCfgMarcaService,
        VhloPropietarioService,
        UserCfgTipoIdentificacionService,
        UserCiudadanoService,
        UserEmpresaService,
        PnalFuncionarioService,
    ]
}) 

export class VhloRnaPreregistroModule { }
