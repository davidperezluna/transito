import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';
import { TooltipModule } from "ngx-tooltip";
import { FormsModule } from '@angular/forms';

import { VhloBuscarComponent } from './vhloBuscar/vhloBuscar.component';
import { VhloCertificadoTradicionComponent } from './vhloCertificadoTradicion/vhloCertificadoTradicion.component';
import { VhloCfgCarroceriaComponent } from './vhloCfgCarroceria/vhloCfgCarroceria.component';
import { VhloCfgCdaComponent } from './vhloCfgCda/vhloCfgCda.component';
import { VhloCfgClaseComponent } from './vhloCfgClase/vhloCfgClase.component';
import { VhloCfgColorComponent } from './vhloCfgColor/vhloCfgColor.component';
import { VhloCfgCombustibleComponent } from './vhloCfgCombustible/vhloCfgCombustible.component';
import { VhloCfgCondicionIngresoComponent } from './vhloCfgCondicionIngreso/vhloCfgCondicionIngreso.component';
import { VhloCfgEmpresaGpsComponent } from './vhloCfgEmpresaGps/vhloCfgEmpresaGps.component';
import { VhloCfgLimitacionCausalComponent } from './vhloCfgLimitacionCausal/vhloCfgLimitacionCausal.component';
import { VhloCfgLimitacionTipoComponent } from './vhloCfgLimitacionTipo/vhloCfgLimitacionTipo.component';
import { VhloCfgLimitacionTipoProcesoComponent } from './vhloCfgLimitacionTipoProceso/vhloCfgLimitacionTipoProceso.component';
import { VhloCfgLineaComponent } from './vhloCfgLinea/vhloCfgLinea.component';
import { VhloCfgMarcaComponent } from './vhloCfgMarca/vhloCfgMarca.component';
import { VhloCfgModalidadTransporteComponent } from './vhloCfgModalidadTransporte/vhloCfgModalidadTransporte.component';
import { VhloCfgMotivoCancelacionComponent } from './vhloCfgMotivoCancelacion/vhloCfgMotivoCancelacion.component';
import { VhloCfgNivelServicioComponent } from './vhloCfgNivelServicio/vhloCfgNivelServicio.component';
import { VhloCfgOrigenRegistroComponent } from './vhloCfgOrigenRegistro/vhloCfgOrigenRegistro.component';
import { VhloCfgPlacaComponent } from './vhloCfgPlaca/vhloCfgPlaca.component';
import { VhloCfgRadioAccionComponent } from './vhloCfgRadioAccion/vhloCfgRadioAccion.component';
import { VhloCfgServicioComponent } from './vhloCfgServicio/vhloCfgServicio.component';
import { VhloCfgSubpartidaArancelariaComponent } from './vhloCfgSubpartidaArancelaria/vhloCfgSubpartidaArancelaria.component';
import { VhloCfgTipoAlertaComponent } from './vhloCfgTipoAlerta/vhloCfgTipoAlerta.component';
import { VhloCfgTipoCabinaComponent } from './vhloCfgTipoCabina/vhloCfgTipoCabina.component';
import { VhloCfgTipoMaquinariaComponent } from './vhloCfgTipoMaquinaria/vhloCfgTipoMaquinaria.component';
import { VhloCfgTipoRodajeComponent } from './vhloCfgTipoRodaje/vhloCfgTipoRodaje.component';
import { VhloCfgTipoVehiculoComponent } from './vhloCfgTipoVehiculo/vhloCfgTipoVehiculo.component';
import { VhloCfgTransporteEspecialComponent } from './vhloCfgTransporteEspecial/vhloCfgTransporteEspecial.component';
import { VhloCfgTransportePasajeroComponent } from './vhloCfgTransportePasajero/vhloCfgTransportePasajero.component';
import { VhloCfgPlacaReportComponent } from './vhloCfgPlaca/report/report.component';
import { VhloCfgValorComponent } from './vhloCfgValor/vhloCfgValor.component';
import { VhloPlacaSedeComponent } from './vhloPlacaSede/vhloPlacaSede.component';
import { VhloLimitacionComponent } from './vhloLimitacion/vhloLimitacion.component';
import { VhloLimitacionDeleteComponent } from './vhloLimitacion/delete/delete.component';
import { VhloTpAsignacionComponent } from './vhloTpAsignacion/vhloTpAsignacion.component';
import { VhloTpConvenioComponent } from './vhloTpConvenio/vhloTpConvenio.component';
import { VhloTpRangoComponent } from './vhloTpRango/vhloTpRango.component';
import { VhloTpTarjetaOperacionComponent } from './vhloTpTarjetaOperacion/vhloTpTarjetaOperacion.component';
import { VhloRnaPreregistroComponent } from "./vhloRnaPreregistro/vhloRnaPreregistro.component";
import { VhloRnaPreasignacionPlacaComponent } from './vhloRnaPreasignacionPlaca/vhloRnaPreasignacionPlaca.component';
import { VhloRnmaPreregistroComponent } from "./vhloRnmaPreregistro/vhloRnmaPreregistro.component";
import { VhloRnrsPreasignacionPlacaComponent } from "./vhloRnrsPreasignacionPlaca/vhloRnrsPreasignacionPlaca.component";
import { VhloRnrsPreregistroComponent } from './vhloRnrsPreregistro/vhloRnrsPreregistro.component';
import { VhloDevolucionRadicadoComponent } from './vhloDevolucionRadicado/vhloDevolucionRadicado.component';
import { VhloSoatComponent } from './vhloSoat/vhloSoat.component';
import { VhloVehiculoComponent } from './vhloVehiculo/vhloVehiculo.component';
import { VhloTecnoMecanicaComponent } from './vhloTecnoMecanica/vhloTecnoMecanica.component';

import { VehiculoRoutingModule } from './vehiculo-routing.module';
import { VhloBuscarModule } from './vhloBuscar/vhloBuscar.module';
import { VhloCertificadoTradicionModule } from './vhloCertificadoTradicion/vhloCertificadoTradicion.module';
import { VhloCfgCarroceriaModule } from './vhloCfgCarroceria/vhloCfgCarroceria.module';
import { VhloCfgCdaModule } from './vhloCfgCda/vhloCfgCda.module';
import { VhloCfgClaseModule } from './vhloCfgClase/vhloCfgClase.module';
import { VhloCfgColorModule } from './vhloCfgColor/vhloCfgColor.module';
import { VhloCfgCombustibleModule } from './vhloCfgCombustible/vhloCfgCombustible.module';
import { VhloCfgCondicionIngresoModule } from './vhloCfgCondicionIngreso/vhloCfgCondicionIngreso.module';
import { VhloCfgEmpresaGpsModule } from './vhloCfgEmpresaGps/vhloCfgEmpresaGps.module';
import { VhloCfgLimitacionCausalModule } from './vhloCfgLimitacionCausal/vhloCfgLimitacionCausal.module';
import { VhloCfgLimitacionTipoModule } from './vhloCfgLimitacionTipo/vhloCfgLimitacionTipo.module';
import { VhloCfgLimitacionTipoProcesoModule } from './vhloCfgLimitacionTipoProceso/vhloCfgLimitacionTipoProceso.module';
import { VhloCfgLineaModule } from './vhloCfgLinea/vhloCfgLinea.module';
import { VhloCfgMarcaModule } from './vhloCfgMarca/vhloCfgMarca.module';
import { VhloCfgModalidadTransporteModule } from './vhloCfgModalidadTransporte/vhloCfgModalidadTransporte.module';
import { VhloCfgMotivoCancelacionModule } from './vhloCfgMotivoCancelacion/vhloCfgMotivoCancelacion.module';
import { VhloCfgNivelServicioModule } from './vhloCfgNivelServicio/vhloCfgNivelServicio.module';
import { VhloCfgOrigenRegistroModule } from './vhloCfgOrigenRegistro/vhloCfgOrigenRegistro.module';
import { VhloCfgPlacaModule } from './vhloCfgPlaca/vhloCfgPlaca.module';
import { VhloCfgRadioAccionModule } from './vhloCfgRadioAccion/vhloCfgRadioAccion.module';
import { VhloCfgServicioModule } from './vhloCfgServicio/vhloCfgServicio.module';
import { VhloCfgSubpartidaArancelariaModule } from './vhloCfgSubpartidaArancelaria/vhloCfgSubpartidaArancelaria.module';
import { VhloCfgTipoAlertaModule } from './vhloCfgTipoAlerta/vhloCfgTipoAlerta.module';
import { VhloCfgTipoCabinaModule } from './vhloCfgTipoCabina/vhloCfgTipoCabina.module';
import { VhloCfgTipoMaquinariaModule } from './vhloCfgTipoMaquinaria/vhloCfgTipoMaquinaria.module';
import { VhloCfgTipoRodajeModule } from './vhloCfgTipoRodaje/vhloCfgTipoRodaje.module';
import { VhloCfgTipoVehiculoModule } from './vhloCfgTipoVehiculo/vhloCfgTipoVehiculo.module';
import { VhloCfgTransporteEspecialModule } from './vhloCfgTransporteEspecial/vhloCfgTransporteEspecial.module';
import { VhloCfgTransportePasajeroModule } from './vhloCfgTransportePasajero/vhloCfgTransportePasajero.module';
import { VhloCfgValorModule } from './vhloCfgValor/vhloCfgValor.module';
import { VhloLimitacionModule } from './vhloLimitacion/vhloLimitacion.module';
import { VhloPlacaSedeModule } from './vhloPlacaSede/vhloPlacaSede.module';
import { VhloTpAsignacionModule } from './vhloTpAsignacion/vhloTpAsignacion.module';
import { VhloTpConvenioModule } from './vhloTpConvenio/vhloTpConvenio.module';
import { VhloTpRangoModule } from './vhloTpRango/vhloTpRango.module';
import { VhloTpTarjetaOperacionModule } from './vhloTpTarjetaOperacion/vhloTpTarjetaOperacion.module';
import { VhloRnaPreregistroModule } from "./vhloRnaPreregistro/vhloRnaPreregistro.module";
import { VhloRnaPreasignacionPlacaModule } from './vhloRnaPreasignacionPlaca/vhloRnaPreasignacionPlaca.module';
import { VhloRnmaPreregistroModule } from "./vhloRnmaPreregistro/vhloRnmaPreregistro.module";
import { VhloRnrsPreasignacionPlacaModule } from "./vhloRnrsPreasignacionPlaca/vhloRnrsPreasignacionPlaca.module";
import { VhloRnrsPreregistroModule } from './vhloRnrsPreregistro/vhloRnrsPreregistro.module';
import { VhloDevolucionRadicadoModule } from './vhloDevolucionRadicado/vhloDevolucionRadicado.module';
import { VhloSoatModule } from './vhloSoat/vhloSoat.module';
import { VhloVehiculoModule } from './vhloVehiculo/vhloVehiculo.module';
import { VhloTecnoMecanicaModule } from './vhloTecnoMecanica/vhloTecnoMecanica.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TooltipModule,
    FormsModule,
    Ng2BootstrapModule.forRoot(),
    SelectModule,
    VehiculoRoutingModule,
    VhloBuscarModule,
    VhloCertificadoTradicionModule,
    VhloCfgCarroceriaModule,
    VhloCfgCdaModule,
    VhloCfgClaseModule,
    VhloCfgCondicionIngresoModule,
    VhloCfgNivelServicioModule,
    VhloCfgPlacaModule,
    VhloCfgTipoMaquinariaModule,
    VhloCfgColorModule,
    VhloCfgCombustibleModule,
    VhloCfgCondicionIngresoModule,
    VhloCfgEmpresaGpsModule,
    VhloCfgLimitacionCausalModule,
    VhloCfgLimitacionTipoModule,
    VhloCfgLimitacionTipoProcesoModule,
    VhloCfgLineaModule,
    VhloCfgMarcaModule,
    VhloCfgModalidadTransporteModule,
    VhloCfgMotivoCancelacionModule,
    VhloCfgNivelServicioModule,
    VhloCfgOrigenRegistroModule,
    VhloCfgPlacaModule,
    VhloCfgRadioAccionModule,
    VhloCfgServicioModule,
    VhloCfgSubpartidaArancelariaModule,
    VhloCfgTipoAlertaModule,
    VhloCfgTipoCabinaModule,
    VhloCfgTipoMaquinariaModule,
    VhloCfgTipoRodajeModule,
    VhloCfgTipoVehiculoModule,
    VhloCfgTransporteEspecialModule,
    VhloCfgTransportePasajeroModule,
    VhloCfgValorModule,
    VhloLimitacionModule,
    VhloPlacaSedeModule,
    VhloTpAsignacionModule,
    VhloTpConvenioModule,
    VhloTpRangoModule,
    VhloTpTarjetaOperacionModule,
    VhloRnaPreregistroModule,
    VhloRnaPreasignacionPlacaModule,
    VhloRnmaPreregistroModule,
    VhloRnrsPreasignacionPlacaModule,
    VhloRnrsPreregistroModule,
    VhloDevolucionRadicadoModule,
    VhloSoatModule,
    VhloVehiculoModule,
    VhloTecnoMecanicaModule,
  ],
  declarations: [
    VhloBuscarComponent,
    VhloCertificadoTradicionComponent,
    VhloCfgCarroceriaComponent,
    VhloCfgCdaComponent,
    VhloCfgClaseComponent,
    VhloCfgColorComponent,
    VhloCfgCombustibleComponent,
    VhloCfgCondicionIngresoComponent,
    VhloCfgEmpresaGpsComponent,
    VhloCfgLimitacionCausalComponent,
    VhloCfgLimitacionTipoComponent,
    VhloCfgLimitacionTipoProcesoComponent,
    VhloCfgLineaComponent,
    VhloCfgMarcaComponent,
    VhloCfgModalidadTransporteComponent,
    VhloCfgMotivoCancelacionComponent,
    VhloCfgNivelServicioComponent,
    VhloCfgOrigenRegistroComponent,
    VhloCfgPlacaComponent,
    VhloCfgRadioAccionComponent,
    VhloCfgServicioComponent,
    VhloCfgSubpartidaArancelariaComponent,
    VhloCfgTipoAlertaComponent,
    VhloCfgTipoCabinaComponent,
    VhloCfgTipoMaquinariaComponent,
    VhloCfgTipoRodajeComponent,
    VhloCfgTipoVehiculoComponent,
    VhloCfgTransporteEspecialComponent,
    VhloCfgTransportePasajeroComponent,
    VhloCfgPlacaReportComponent,
    VhloCfgTipoMaquinariaComponent,
    VhloCfgValorComponent,
    VhloLimitacionComponent,
    VhloLimitacionDeleteComponent,
    VhloPlacaSedeComponent,
    VhloTpAsignacionComponent,
    VhloTpConvenioComponent,
    VhloTpRangoComponent,
    VhloTpTarjetaOperacionComponent,
    VhloRnaPreregistroComponent,
    VhloRnaPreasignacionPlacaComponent,
    VhloRnmaPreregistroComponent,
    VhloRnrsPreasignacionPlacaComponent,
    VhloRnrsPreregistroComponent,
    VhloDevolucionRadicadoComponent,
    VhloSoatComponent,
    VhloVehiculoComponent,
    VhloTecnoMecanicaComponent,
  ]
})
export class VehiculoModule { }
