import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';
import { TooltipModule } from "ngx-tooltip";
import { ChartsModule } from 'ng2-charts';

import { CvCdoComparendoService } from '../../../../services/cvCdoComparendo.service';
import { CfgOrganismoTransitoService } from '../../../../services/cfgOrganismoTransito.service';
import { PnalFuncionarioService } from '../../../../services/pnalFuncionario.service';
import { PnalCfgCdoConsecutivoService } from '../../../../services/pnalCfgCdoConsecutivo.service';
import { CfgMunicipioService } from '../../../../services/cfgMunicipio.service';
import { CfgTipoInfractorService } from '../../../../services/cfgTipoInfractor.service';
import { UserLcCfgCategoriaService } from '../../../../services/userLcCfgCategoria.service';
import { UserCiudadanoService } from '../../../../services/userCiudadano.service';
import { UserEmpresaService } from '../../../../services/userEmpresa.service';
import { UserCfgTipoIdentificacionService } from '../../../../services/userCfgTipoIdentificacion.service';
import { PqoCfgPatioService } from '../../../../services/pqoCfgPatio.service';
import { PqoCfgGruaService } from '../../../../services/pqoCfgGrua.service';
import { PqoInmovilizacionService } from '../../../../services/pqoInmovilizacion.service';
import { VhloCfgRadioAccionService } from '../../../../services/vhloCfgRadioAccion.service';
import { VhloCfgModalidadTransporteService } from '../../../../services/vhloCfgModalidadTransporte.service';
import { VhloCfgTransportePasajeroService } from '../../../../services/vhloCfgTransportePasajero.service';
import { VhloCfgTransporteEspecialService } from '../../../../services/vhloCfgTransporteEspecial.service';
import { VhloCfgClaseService } from '../../../../services/vhloCfgClase.service';
import { VhloCfgServicioService } from '../../../../services/vhloCfgServicio.service';
import { FroInfraccionService } from '../../../../services/froInfraccion.service';
import { CfgAdmFormatoService } from '../../../../services/cfgAdmFormato.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { StateComponent } from './state/state.component';
import { ShowComponent } from './show/show.component';
import { DocumentComponent } from './document/document.component';
import { InventoryComponent } from './inventory/inventory.component';

@NgModule({
    imports: [
        CommonModule, 
        Ng2BootstrapModule.forRoot(),
        SelectModule,
        TooltipModule,
        ChartsModule
    ],
    declarations: [
        NewComponent,
        EditComponent,
        StateComponent,
        ShowComponent,
        DocumentComponent,
        InventoryComponent,
    ],
    exports: [
        NewComponent,
        EditComponent,
        StateComponent,
        ShowComponent,
        DocumentComponent,
        InventoryComponent,
    ],
    providers:[
        CvCdoComparendoService,
        PnalFuncionarioService,
        CfgOrganismoTransitoService,
        PnalCfgCdoConsecutivoService,
        CfgMunicipioService,
        CfgTipoInfractorService,
        UserLcCfgCategoriaService,
        UserCiudadanoService,
        UserEmpresaService,
        UserCfgTipoIdentificacionService,
        PqoCfgPatioService,
        PqoCfgGruaService,
        PqoInmovilizacionService,
        VhloCfgRadioAccionService,
        VhloCfgModalidadTransporteService,
        VhloCfgTransportePasajeroService,
        VhloCfgTransporteEspecialService,
        VhloCfgClaseService,
        VhloCfgServicioService,
        FroInfraccionService,
        CfgAdmFormatoService,
    ]
})

export class CvCdoComparendoModule { }
