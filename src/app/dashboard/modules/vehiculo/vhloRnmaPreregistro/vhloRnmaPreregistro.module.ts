import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { ChartsModule } from 'ng2-charts';

import { CfgOrganismoTransitoService } from '../../../../services/cfgOrganismoTransito.service';
import { VhloMaquinariaService } from '../../../../services/vhloMaquinaria.service';
import { VhloCfgLineaService } from '../../../../services/vhloCfgLinea.service';
import { VhloCfgClaseService } from '../../../../services/vhloCfgClase.service';
import { VhloCfgClaseMaquinariaService } from '../../../../services/vhloCfgClaseMaquinaria.service';
import { VhloCfgCarroceriaService } from '../../../../services/vhloCfgCarroceria.service';
import { VhloCfgServicioService } from '../../../../services/vhloCfgServicio.service';
import { VhloCfgColorService } from '../../../../services/vhloCfgColor.service';
import { VhloCfgCombustibleService } from '../../../../services/vhloCfgCombustible.service';
import { VhloCfgRadioAccionService } from '../../../../services/vhloCfgRadioAccion.service';
import { VhloCfgModalidadTransporteService } from '../../../../services/vhloCfgModalidadTransporte.service';
import { VhloCfgMarcaService } from '../../../../services/vhloCfgMarca.service';
import { VhloPropietarioService } from '../../../../services/vhloPropietario.service';
import { VhloRnaPreregistroService } from '../../../../services/vhloRnaPreregistro.service';
import { UserCfgTipoIdentificacionService } from '../../../../services/userCfgTipoIdentificacion.service';
import { UserCiudadanoService } from '../../../../services/userCiudadano.service';
import { PnalFuncionarioService } from '../../../../services/pnalFuncionario.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';

import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, ChartsModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [NewComponent,EditComponent],
    exports: [
        NewComponent,
        EditComponent
    ],
    providers:[
        CfgOrganismoTransitoService,
        VhloMaquinariaService,
        VhloCfgLineaService,
        VhloCfgClaseService,
        VhloCfgClaseMaquinariaService,
        VhloCfgCarroceriaService,
        VhloCfgServicioService,
        VhloCfgColorService,
        VhloCfgCombustibleService,
        VhloCfgRadioAccionService,
        VhloCfgModalidadTransporteService,
        VhloCfgMarcaService,
        VhloPropietarioService,
        VhloRnaPreregistroService,
        UserCfgTipoIdentificacionService,
        UserCiudadanoService,
        PnalFuncionarioService,
    ]
}) 

export class VhloRnmaPreregistroModule { }
