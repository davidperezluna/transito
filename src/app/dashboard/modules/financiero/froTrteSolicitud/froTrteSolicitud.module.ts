import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';

import { DefaultService } from '../../../../services/default.service';
import { CfgTipoAlertaService } from '../../../../services/cfgTipoAlerta.service';
import { CfgDepartamentoService } from '../../../../services/cfgDepartamento.service';
import { CfgEntidadJudicialService } from "../../../../services/cfgEntidadJudicial.service";
import { CfgMunicipioService } from '../../../../services/cfgMunicipio.service';
import { CfgOrganismoTransitoService } from '../../../../services/cfgOrganismoTransito.service';
import { CfgPaisService } from '../../../../services/cfgPais.service';
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
import { VhloCfgCarroceriaService } from '../../../../services/vhloCfgCarroceria.service';
import { VhloCfgColorService } from '../../../../services/vhloCfgColor.service';
import { VhloCfgCombustibleService } from '../../../../services/vhloCfgCombustible.service';
import { VhloCfgNivelServicioService } from '../../../../services/vhloCfgNivelServicio.service';
import { VhloCfgServicioService } from '../../../../services/vhloCfgServicio.service';
import { VhloCfgMotivoCancelacionService } from "../../../../services/vhloCfgMotivoCancelacion.service";
import { VhloCfgTipoAlertaService } from '../../../../services/vhloCfgTipoAlerta.service';
import { VhloTpAsignacionService } from '../../../../services/vhloTpAsignacion.service';
import { VhloTpTarjetaOperacionService } from "../../../../services/vhloTpTarjetaOperacion.service";
import { PnalFuncionarioService } from '../../../../services/pnalFuncionario.service';
import { TramiteTrasladoService } from '../../../../services/tramiteTraslado.service';
import { UserCfgTipoIdentificacionService } from '../../../../services/userCfgTipoIdentificacion.service';
import { UserCiudadanoService } from '../../../../services/userCiudadano.service';
import { UserEmpresaService } from '../../../../services/userEmpresa.service';
import { UserEmpresaTransporteService } from "../../../../services/userEmpresaTransporte.service";
import { UserLicenciaTransitoService } from '../../../../services/userLicenciaTransito.service';
import { UserLcCfgCategoriaService } from '../../../../services/userLcCfgCategoria.service';
import { UserLcCfgRestriccionService } from '../../usuario/userLcCfgRestriccion/userLcCfgRestriccion.service';

//Reportes de tramite solicitud
import { ReportesComponent } from "./reportes/reportes.component";

@NgModule({
    imports: [
        CommonModule,
        Ng2BootstrapModule.forRoot(),
        SelectModule,
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
        CfgDepartamentoService,
        CfgEntidadJudicialService,
        CfgMunicipioService,
        CfgOrganismoTransitoService,
        CfgPaisService,
        FroFacRetefuenteService,
        FroTrteSolicitudService,
        FroTrteSolicitudReporteService,
        FroFacTramiteService,
        FroFacturaService,
        ImoInsumoService,
        VhloAcreedorService,
        VhloRestriccionService,
        VhloVehiculoService,
        VhloPropietarioService,
        VhloCfgCarroceriaService,
        VhloCfgColorService,
        VhloCfgCombustibleService,
        VhloCfgNivelServicioService,
        VhloCfgServicioService,
        VhloCfgMotivoCancelacionService,
        VhloCfgTipoAlertaService,
        VhloTpAsignacionService,
        VhloTpTarjetaOperacionService,
        PnalFuncionarioService,
        TramiteTrasladoService,
        UserCfgTipoIdentificacionService,
        UserCiudadanoService,
        UserEmpresaService,
        UserEmpresaTransporteService,
        UserLicenciaTransitoService,
        UserLcCfgCategoriaService,
        UserLcCfgRestriccionService,
    ]
})

export class FroTrteSolicitudModule { }
