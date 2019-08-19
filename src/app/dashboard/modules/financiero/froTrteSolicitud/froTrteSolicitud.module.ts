import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

import { DefaultService } from '../../../../services/default.service';
import { CfgTipoAlertaService } from '../../../../services/cfgTipoAlerta.service';
import { FroFacRetefuenteService } from '../../../../services/froFacRetefuente.service';
import { FroTrteSolicitudService } from '../../../../services/froTrteSolicitud.service';
import { FroTrteSolicitudReporteService } from '../../../../services/froTrteSolicitudReporte.service';
import { FroFacTramiteService } from '../../../../services/froFacTramite.service';
import { FroFacturaService } from '../../../../services/froFactura.service';
import { ImoInsumoService } from '../../../../services/imoInsumo.service';
import { VhloAcreedorService } from '../../../../services/vhloAcreedor.service';
import { VhloRestriccionService } from '../../../../services/vhloRestriccion.service';
import { VhloVehiculoService } from '../../../../services/vhloVehiculo.service';
import { VhloPropietarioService } from '../../../../services/vhloPropietario.service';
import { PnalFuncionarioService } from '../../../../services/pnalFuncionario.service';
import { TramiteTrasladoService } from '../../../../services/tramiteTraslado.service';
import { UserCiudadanoService } from '../../../../services/userCiudadano.service';
import { UserEmpresaService } from '../../../../services/userEmpresa.service';

//Reportes de tramite solicitud
import { ReportesComponent } from "./reportes/reportes.component";

import { UserCiudadanoModule } from '../../usuario/userCiudadano/userCiudadano.module';

@NgModule({
    imports: [
        CommonModule,
        Ng2BootstrapModule.forRoot(),
        UserCiudadanoModule,
    ],
    declarations: [
        ReportesComponent,
    ],
    exports: [
        ReportesComponent,
    ],
    providers: [
        DefaultService,
        CfgTipoAlertaService, 
        FroTrteSolicitudService, 
        FroTrteSolicitudReporteService, 
        FroFacRetefuenteService,
        FroFacTramiteService,
        FroFacturaService,
        VhloRestriccionService,
        VhloAcreedorService,
        VhloPropietarioService,
        VhloVehiculoService,
        UserEmpresaService,
        UserCiudadanoService,
        TramiteTrasladoService, 
        PnalFuncionarioService,
        ImoInsumoService,
    ]
})

export class FroTrteSolicitudModule { }
