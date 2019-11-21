import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
import { VhloCfgValorComponent } from './vhloCfgValor/vhloCfgValor.component';
import { VhloCfgPlacaReportComponent } from './vhloCfgPlaca/report/report.component';
import { VhloLimitacionComponent } from './vhloLimitacion/vhloLimitacion.component';
import { VhloLimitacionDeleteComponent } from './vhloLimitacion/delete/delete.component';
import { VhloPlacaSedeComponent } from './vhloPlacaSede/vhloPlacaSede.component';
import { VhloPlacaSedeDeliveredComponent } from './vhloPlacaSede/delivered/delivered.component';
import { VhloTpAsignacionComponent } from './vhloTpAsignacion/vhloTpAsignacion.component';
import { VhloTpConvenioComponent } from './vhloTpConvenio/vhloTpConvenio.component';
import { VhloTpRangoComponent } from './vhloTpRango/vhloTpRango.component';
import { VhloTpTarjetaOperacionComponent } from './vhloTpTarjetaOperacion/vhloTpTarjetaOperacion.component';
import { VhloRnaPreregistroComponent } from "./vhloRnaPreregistro/vhloRnaPreregistro.component";
import { VhloRnaPreasignacionPlacaComponent } from "./vhloRnaPreasignacionPlaca/vhloRnaPreasignacionPlaca.component";
import { VhloRnmaPreregistroComponent } from "./vhloRnmaPreregistro/vhloRnmaPreregistro.component";
import { VhloRnrsPreasignacionPlacaComponent } from "./vhloRnrsPreasignacionPlaca/vhloRnrsPreasignacionPlaca.component";
import { VhloRnrsPreregistroComponent } from './vhloRnrsPreregistro/vhloRnrsPreregistro.component';
import { VhloDevolucionRadicadoComponent } from './vhloDevolucionRadicado/vhloDevolucionRadicado.component';
import { VhloSoatComponent } from './vhloSoat/vhloSoat.component';
import { VhloVehiculoComponent } from './vhloVehiculo/vhloVehiculo.component';
import { VhloTecnoMecanicaComponent } from './vhloTecnoMecanica';

const routes: Routes = [
  {
    path: 'vhloBuscar',
    component: VhloBuscarComponent
  },
  {
    path: 'vhloCertificadoTradicion',
    component: VhloCertificadoTradicionComponent
  },
  {
    path: 'vhloCfgCarroceria',
    component: VhloCfgCarroceriaComponent
  },
  {
    path: 'vhloCfgCda',
    component: VhloCfgCdaComponent
  },
  {
    path: 'vhloCfgClase',
    component: VhloCfgClaseComponent
  },
  {
    path: 'vhloCfgColor',
    component: VhloCfgColorComponent
  },
  {
    path: 'vhloCfgCombustible',
    component: VhloCfgCombustibleComponent
  },
  {
    path: 'vhloCfgCondicionIngreso',
    component: VhloCfgCondicionIngresoComponent
  },
  { 
    path: 'vhloCfgEmpresaGps',
    component: VhloCfgEmpresaGpsComponent 
  },
  { 
    path: 'vhloCfgLimitacionCausal',
    component: VhloCfgLimitacionCausalComponent 
  },
  { 
    path: 'vhloCfgLimitacionTipo',
    component: VhloCfgLimitacionTipoComponent 
  },
  { 
    path: 'vhloCfgLimitacionTipoProceso',
    component: VhloCfgLimitacionTipoProcesoComponent 
  },
  { 
    path: 'vhloCfgLinea',
    component: VhloCfgLineaComponent 
  },
  { 
    path: 'vhloCfgMarca',
    component: VhloCfgMarcaComponent 
  },
  { 
    path: 'vhloCfgModalidadTransporte',
    component: VhloCfgModalidadTransporteComponent 
  },
  { 
    path: 'vhloCfgMotivoCancelacion',
    component: VhloCfgMotivoCancelacionComponent 
  },
  {
    path: 'vhloCfgNivelServicio',
    component: VhloCfgNivelServicioComponent
  },
  { 
    path: 'vhloCfgOrigenRegistro',
    component: VhloCfgOrigenRegistroComponent 
  },
  {
    path: 'vhloCfgPlaca',
    component: VhloCfgPlacaComponent
  },
  { 
    path: 'vhloCfgRadioAccion',
    component: VhloCfgRadioAccionComponent 
  },
  { 
    path: 'vhloCfgServicio',
    component: VhloCfgServicioComponent 
  },
  { 
    path: 'vhloCfgSubpartidaArancelaria',
    component: VhloCfgSubpartidaArancelariaComponent 
  },
  { 
    path: 'vhloCfgTipoAlerta',
    component: VhloCfgTipoAlertaComponent 
  },
  { 
    path: 'vhloCfgTipoCabina',
    component: VhloCfgTipoCabinaComponent 
  },
  {
    path: 'vhloCfgTipoMaquinaria',
    component: VhloCfgTipoMaquinariaComponent
  },
  { 
    path: 'vhloCfgTipoRodaje',
    component: VhloCfgTipoRodajeComponent 
  },
  { 
    path: 'vhloCfgTipoVehiculo',
    component: VhloCfgTipoVehiculoComponent 
  },
  { 
    path: 'vhloCfgTransporteEspecial',
    component: VhloCfgTransporteEspecialComponent 
  },
  { 
    path: 'vhloCfgTransportePasajero',
    component: VhloCfgTransportePasajeroComponent 
  },
  {
    path: 'vhloCfgValor',
    component: VhloCfgValorComponent
  },
  
  {
    path: 'vhloCfgPlacaReport',
    component: VhloCfgPlacaReportComponent
  },
  {
    path: 'vhloLimitacion/levantamiento',
    component: VhloLimitacionDeleteComponent
  },
  {
    path: 'vhloLimitacion',
    component: VhloLimitacionComponent
  },
  {
    path: 'vhloPlacaSede',
    component: VhloPlacaSedeComponent
  },
  {
    path: 'vhloPlacaEntrega',
    component: VhloPlacaSedeDeliveredComponent
  },
  {
    path: 'vhloTpAsignacion',
    component: VhloTpAsignacionComponent
  },
  {
    path: 'vhloTpConvenio',
    component: VhloTpConvenioComponent
  },
  {
    path: 'vhloTpRango',
    component: VhloTpRangoComponent
  },
  {
    path: 'vhloTpTarjetaOperacion',
    component: VhloTpTarjetaOperacionComponent
  },
  {
    path: 'vhloRnaPreregistro',
    component: VhloRnaPreregistroComponent
  },
  {
    path: 'vhloRnaPreAsignacionPlaca',
    component: VhloRnaPreasignacionPlacaComponent
  },
  {
    path: 'vhloRnmaPreregistro',
    component: VhloRnmaPreregistroComponent
  },
  {
    path: 'vhloRnrsPreAsignacionPlaca',
    component: VhloRnrsPreasignacionPlacaComponent
  },
  {
    path: 'vhloRnrsPreregistro',
    component: VhloRnrsPreregistroComponent
  },
  {
    path: 'vhloDevolucionRadicado',
    component: VhloDevolucionRadicadoComponent
  },
  {
    path: 'vhloSoat',
    component: VhloSoatComponent
  },
  {
    path: 'vhloVehiculo',
    component: VhloVehiculoComponent
  },
  {
    path: 'vhloTecnoMecanica',
    component: VhloTecnoMecanicaComponent
  }
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiculoRoutingModule { }
