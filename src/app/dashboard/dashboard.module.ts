import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

import { HomeModule } from './home/home.module';
import { VehiculoModule } from './vehiculo/vehiculo.module';
import { MarcaModule } from './marca/marca.module';
import { LineaModule } from './linea/linea.module';
import { BancoModule } from './banco/banco.module';
import { ClaseModule } from './clase/clase.module';
import { ColorModule } from './color/color.module';
import { ConpetoParametroModule } from './conceptoParametro/conceptoParametro.module';
import { CombustibleModule } from './combustible/combustible.module';
import { ConsumibleModule } from './consumible/consumible.module';
import { ModalidadModule } from './modalidad/modalidad.module';
import { PaisModule } from './pais/pais.module';
import { DepartamentoModule } from './departamento/departamento.module';
import { MunicipioModule } from './municipio/municipio.module';
import { OrganismoTransitoModule } from './organismoTransito/organismoTransito.module';
import { ServicioModule } from './servicio/servicio.module';
import { ModuloModule } from './modulo/modulo.module';
import { TramiteModule } from './tramite/tramite.module'; 
import { AlmacenModule } from './almacen/almacen.module';
import { CfgTipoInfractorModule } from './cfgTipoInfractor/cfgTipoInfractor.module';
import { RpcccInventarioDocumentalModule } from './rpcccInventarioDocumental/rpcccInventarioDocumental.module';

import { CfgAdmFormatoTipoModule } from './cfgAdmFormatoTipo/cfgAdmFormatoTipo.module';

import { CfgBodegaModule } from './cfgBodega/cfgBodega.module';
import { CfgSvConectorModule } from './cfgSvConector/cfgSvConector.module';
import { CfgSvSenialTipoModule } from './cfgSvSenialTipo/cfgSvSenialTipo.module';
import { CfgSvSenialColorModule } from './cfgSvSenialColor/cfgSvSenialColor.module';
import { CfgSvSenialEstadoModule } from './cfgSvSenialEstado/cfgSvSenialEstado.module';
import { CfgSvUnidadMedidaModule } from './cfgSvUnidadMedida/cfgSvUnidadMedida.module';

import { CvCfgInteresModule } from './cvCfgInteres/cvCfgInteres.module';
import { CvCfgPorcentajeInicialModule } from './cvCfgPorcentajeInicial/cvCfgPorcentajeInicial.module';
import { CvAcuerdoPagoModule } from './cvAcuerdoPago/cvAcuerdoPago.module';

import { VhloCfgCdaModule } from './vhloCfgCda/vhloCfgCda.module';
import { VhloCfgOrigenRegistroModule } from './vhloCfgOrigenRegistro/vhloCfgOrigenRegistro.module';
import { VhloCfgEmpresaGpsModule } from './vhloCfgEmpresaGps/vhloCfgEmpresaGps.module';
import { VhloCfgTipoRodajeModule } from './vhloCfgTipoRodaje/vhloCfgTipoRodaje.module';
import { VhloCfgTipoCabinaModule } from './vhloCfgTipoCabina/vhloCfgTipoCabina.module';
import { VhloCfgTipoMaquinariaModule } from './vhloCfgTipoMaquinaria/vhloCfgTipoMaquinaria.module';
import { VhloCfgClaseMaquinariaModule } from './vhloCfgClaseMaquinaria/vhloCfgClaseMaquinaria.module';
import { VhloCfgSubpartidaArancelariaModule } from './vhloCfgSubpartidaArancelaria/vhloCfgSubpartidaArancelaria.module';
import { VhloCfgCondicionIngresoModule } from './vhloCfgCondicionIngreso/vhloCfgCondicionIngreso.module';
import { VehiculoTecnoMecanicaModule } from './vehiculoTecnoMecanica/vehiculoTecnoMecanica.module';
import { SoatModule } from './soat/soat.module';

import { SvCapacitacionModule } from "./svCapacitacion/svCapacitacion.module";
import { SvCfgFuncionModule } from "./svCfgFuncion/svCfgFuncion.module";
import { SvCfgFuncionCriterioModule } from "./svCfgFuncionCriterio/svCfgFuncionCriterio.module";

import { SvCfgAreaModule } from "./svCfgArea/svCfgArea.module";
import { SvCfgTipoAreaModule } from "./svCfgTipoArea/svCfgTipoArea.module";
import { SvCfgAseguradoraModule } from "./svCfgAseguradora/svCfgAseguradora.module";
import { SvCfgCalzadaCarrilModule } from "./svCfgCalzadaCarril/svCfgCalzadaCarril.module";
import { SvCfgCardinalidadModule } from "./svCfgCardinalidad/svCfgCardinalidad.module";
import { SvCfgClaseChoqueModule } from "./svCfgClaseChoque/svCfgClaseChoque.module";
import { SvCfgCondicionViaModule } from "./svCfgCondicionVia/svCfgCondicionVia.module";
import { SvCfgControlViaModule } from "./svCfgControlVia/svCfgControlVia.module";
import { SvCfgDisenioModule } from "./svCfgDisenio/svCfgDisenio.module";
import { SvCfgEntidadAccidenteModule } from "./svCfgEntidadAccidente/svCfgEntidadAccidente.module";
import { SvCfgEstadoConductorModule } from "./svCfgEstadoConductor/svCfgEstadoConductor.module";
import { SvCfgEstadoIluminacionModule } from "./svCfgEstadoIluminacion/svCfgEstadoIluminacion.module";
import { SvCfgEstadoTiempoModule } from "./svCfgEstadoTiempo/svCfgEstadoTiempo.module";
import { SvCfgEstadoViaModule } from "./svCfgEstadoVia/svCfgEstadoVia.module";
import { SvCfgFallaModule } from "./svCfgFalla/svCfgFalla.module";
import { SvCfgGeometriaModule } from "./svCfgGeometria/svCfgGeometria.module";
import { SvCfgGradoExamenModule } from "./svCfgGradoExamen/svCfgGradoExamen.module";
import { SvCfgGravedadVictimaModule } from "./svCfgGravedadVictima/svCfgGravedadVictima.module";
import { SvCfgHipotesisModule } from "./svCfgHipotesis/svCfgHipotesis.module";
import { SvCfgHospitalModule } from "./svCfgHospital/svCfgHospital.module";
import { SvCfgIluminacionModule } from "./svCfgIluminacion/svCfgIluminacion.module";
import { SvCfgLugarImpactoModule } from "./svCfgLugarImpacto/svCfgLugarImpacto.module";
import { SvCfgMaterialModule } from "./svCfgMaterial/svCfgMaterial.module";
import { SvCfgMotivoAnulacionModule } from "./svCfgMotivoAnulacion/svCfgMotivoAnulacion.module";
import { SvCfgNacionalidadModule } from "./svCfgNacionalidad/svCfgNacionalidad.module";
import { SvCfgRequiereEmpresaModule } from "./svCfgRequiereEmpresa/svCfgRequiereEmpresa.module";
import { SvCfgResultadoExamenModule } from "./svCfgResultadoExamen/svCfgResultadoExamen.module";
import { SvCfgSectorModule } from "./svCfgSector/svCfgSector.module";
import { SvCfgSustanciaPeligrosaModule } from "./svCfgSustanciaPeligrosa/svCfgSustanciaPeligrosa.module"; 
import { SvCfgTipoControlModule } from "./svCfgTipoControl/svCfgTipoControl.module";
import { SvCfgTipoGeometriaModule } from "./svCfgTipoGeometria/svCfgTipoGeometria.module";
import { SvCfgTipoViaModule } from "./svCfgTipoVia/svCfgTipoVia.module";
import { SvCfgTipoVictimaModule } from "./svCfgTipoVictima/svCfgTipoVictima.module";
import { SvCfgUnidadReceptoraModule } from "./svCfgUnidadReceptora/svCfgUnidadReceptora.module";
import { SvCfgUtilizacionModule } from "./svCfgUtilizacion/svCfgUtilizacion.module";
import { SvCfgVisualModule } from "./svCfgVisual/svCfgVisual.module";
import { SvCfgVisualDisminuidaModule } from "./svCfgVisualDisminuida/svCfgVisualDisminuida.module";
import { SvCfgZonaModule } from "./svCfgZona/svCfgZona.module";
import { SvCfgClaseActorViaModule } from './svCfgClaseActorVia/svCfgClaseActorVia.module';
import { SvCfgTemaCapacitacionModule } from './svCfgTemaCapacitacion/svCfgTemaCapacitacion.module';

import { CfgComparendoEstadoModule } from './cfgComparendoEstado/cfgComparendoEstado.module';
import { ComparendoModule } from './comparendo/comparendo.module';
import { InfraccionModule } from './infraccion/infraccion.module';

import { CiudadanoModule } from './ciudadano/ciudadano.module';
import { TipoIdentificacionModule } from './tipoIdentificacion/tipoIdentificacion.module';

import { CfgAuditoriaModule } from './cfgAuditoria/cfgAuditoria.module';
import { CfgValorVehiculoModule } from './cfgValorVehiculo/cfgValorVehiculo.module'; 
import { CfgSmlmvModule } from './cfgSmlmv/cfgSmlmv.module';
import { cfgFestivoModule } from './cfgFestivo/cfgFestivo.module';
import { buscarAutomotorModule } from './buscarAutomotor/buscarAutomotor.module';
import { registroEntregaProductoModule } from './registroEntregaProducto/registroEntregaProducto.module';

import { CfgLicenciaConduccionCategoriaModule } from './cfgLicenciaConduccionCategoria/cfgLicenciaConduccionCategoria.module';
import { RncLicenciaConduccionModule } from './rncLicenciaConduccion/rncLicenciaConduccion.module';

import { CfgTipoVehiculoModule } from './cfgTipoVehiculo/cfgTipoVehiculo.module';
import { CfgAsignacionPlacaSedeModule } from './cfgAsignacionPlacaSede/cfgAsignacionPlacaSede.module';
import { CfgTipoClaseModule } from './cfgTipoClase/cfgTipoClase.module';

import { MsvEvaluacionModule } from './msvEvaluacion/msvEvaluacion.module';
import { MsvRevisionModule } from './msvRevision/msvRevision.module';
import { MsvCaracterizacionModule } from './msvCaracterizacion/msvCaracterizacion.module';
import { MsvCategoriaModule } from './msvCategoria/msvCategoria.module';
import { MsvTalonarioModule } from './msvTalonario/msvTalonario.module';
import { MsvAsignacionModule } from './msvAsignacion/msvAsignacion.module';

import { MparqCostoTrayectoModule } from './mparqCostoTrayecto/mparqCostoTrayecto.module';
import { MparqGruaModule } from './mparqGrua/mparqGrua.module';
import { MparqGruaCiudadanoModule } from './mparqGruaCiudadano/mparqGruaCiudadano.module';
import { MparqEntradaModule } from './mparqEntrada/mparqEntrada.module';
import { MparqSalidaModule } from './mparqSalida/mparqSalida.module';
import { MparqPatioModule } from './mparqPatio/mparqPatio.module';

import { GeneroModule } from './genero/genero.module';
import { GrupoSanguineoModule } from './grupoSanguineo/grupoSanguineo.module';
import { CarroceriaModule } from './carroceria/carroceria.module';
import { FacturaModule } from './factura/factura.module';
import { FacturaInfraccionModule } from './facturaInfraccion/facturaInfraccion.module';
import { TramiteFacturaModule } from './tramiteFactura/tramiteFactura.module';
import { CfgPlacaModule } from './cfgPlaca/cfgPlaca.module';
import { LimitacionModule } from './limitacion/limitacion.module';
import { CfgTipoProcesoModule } from './cfgTipoProceso/cfgTipoProceso.module';
import { RnmaTramiteInscripcionLimitacionModule } from './rnmaTramiteInscripcionLimitacion/rnmaTramiteInscripcionLimitacion.module';
import { RnmaTramiteLevantamientoLimitacionModule } from './rnmaTramiteLevantamientoLimitacion/rnmaTramiteLevantamientoLimitacion.module';
import { RnrsTramiteInscripcionLimitacionModule } from './rnrsTramiteInscripcionLimitacion/rnrsTramiteInscripcionLimitacion.module';
import { RnrsTramiteLevantamientoLimitacionModule } from './rnrsTramiteLevantamientoLimitacion/rnrsTramiteLevantamientoLimitacion.module';
import { RnaTramiteInscripcionLimitacionModule } from './rnaTramiteInscripcionLimitacion/rnaTramiteInscripcionLimitacion.module';
import { RnaTramiteLevantamientoLimitacionModule } from './rnaTramiteLevantamientoLimitacion/rnaTramiteLevantamientoLimitacion.module';
import { MsvRegistroIpatModule } from './msvRegistroIpat/msvRegistroIpat.module';
import { CfgCasoInsumoModule } from './cfgCasoInsumo/cfgCasoInsumo.module';
import { CfgSedeOperativaModule } from './cfgSedeOperativa/cfgSedeOperativa.module';
import { CfgEntidadJudicialModule } from './cfgEntidadJudicial/cfgEntidadJudicial.module';
import { CfgCausalLimitacionModule } from './cfgCausalLimitacion/cfgCausalLimitacion.module';

import { CfgGravedadModule } from './cfgGravedad/cfgGravedad.module';
import { CfgClaseAccidenteModule } from './cfgClaseAccidente/cfgClaseAccidente.module';
import { CfgChoqueConModule } from './cfgChoqueCon/cfgChoqueCon.module';
import { CfgObjetoFijoModule } from './cfgObjetoFijo/cfgObjetoFijo.module';

import { TramiteSolicitudModule } from './tramiteSolicitud/tramiteSolicitud.module';
import { TramiteSolicitudRncModule } from './tramiteSolicitudRnc/tramiteSolicitudRnc.module';
import { TramiteSolicitudRpcccModule } from './tramiteSolicitudRpccc/tramiteSolicitudRpccc.module';
import { TramiteSolicitudRnmaModule } from './tramiteSolicitudRnma/tramiteSolicitudRnma.module';
import { TramiteSolicitudRnrsModule } from './tramiteSolicitudRnrs/tramiteSolicitudRnrs.module';
import { EmpresaModule } from './empresa/empresa.module';
// import { SucursalModule } from './empresa/sucursal/new/sucursal.module';
import { SustratoModule } from './sustrato/sustrato.module';
import { TramitePrecioModule } from './tramitePrecio/tramitePrecio.module';

import { GdDocumentoModule } from './gdDocumento/gdDocumento.module';
import { GdTrazabilidadModule } from './gdTrazabilidad/gdTrazabilidad.module';
import { GdCfgTipoCorrespondenciaModule } from './gdCfgTipoCorrespondencia/gdCfgTipoCorrespondencia.module';
import { GdCfgMedioCorrespondenciaModule } from './gdCfgMedioCorrespondencia/gdCfgMedioCorrespondencia.module';

import { MflInfraccionModule } from './mflInfraccion/mflInfraccion.module';
import { MflInfraccionCategoriaModule } from './mflInfraccionCategoria/mflInfraccionCategoria.module';

import { CfgCargoModule } from './cfgCargo/cfgCargo.module';
import { MpersonalFuncionarioModule } from './mpersonalFuncionario/mpersonalFuncionario.module';
import { MpersonalTipoContratoModule } from './mpersonalTipoContrato/mpersonalTipoContrato.module';
import { MpersonalTalonarioModule } from './mpersonalTalonario/mpersonalTalonario.module';
import { MpersonalAsignacionModule } from './mpersonalAsignacion/mpersonalAsignacion.module';


import { RnaPreasignacionPlacaModule } from './rnaPreasignacionPlaca/RnaPreasignacionPlaca.module';
import { RnaPreregistroModule } from './rnaPreregistro/RnaPreregistro.module';

import { CuentaModule } from './cuenta/cuenta.module';
import { GestionTransportePublicoModule } from './gestionTransportePublico/gestionTransportePublico.module';
import { rnaRegistroInsumosModule } from './rnaRegistroInsumos/rnaRegistroInsumos.module';
import { rnaAsignacionInsumosModule } from './rnaAsignacionInsumos/rnaAsignacionInsumos.module';
//import { RnaPreasignacionInsumoModule } from './rnaPreasignacIonInsumo/rnaPreasignacionInsumo.module';
import { RnmaPreregistroModule } from './rnmaPreregistro/rnmaPreregistro.module';
import { RnrsPreregistroModule } from './rnrsPreregistro/rnrsPreregistro.module';
import { ReporteModule } from './reporte/reporte.module';
import { InsumoBusquedaModule } from './insumoBusqueda/insumoBusqueda.module';
import { RnaCertificadoTradicionOficialModule } from './rnaCertificadoTradicionOficial/rnaCertificadoTradicionOficial.module';

import { CfgEmpresaServicioModule } from './cfgEmpresaServicio/cfgEmpresaServicio.module';

import { DashboardComponent } from './dashboard.component'; 

import {TopNavComponent} from '../shared';
import {SidebarComponent} from '../shared';
import {FooterComponent} from '../shared';
import {RightsidebarComponent} from '../shared';

import { MsvSenialInventarioModule } from './msvSenialInventario/msvSenialInventario.module';
//import { MsvSenialModule } from './msvSenial/msvSenial.module';


@NgModule({
  imports: [
      ConpetoParametroModule,
      CommonModule,
      RouterModule,
      Ng2BootstrapModule.forRoot(),
      HomeModule,
      VehiculoModule,
      MarcaModule,
      LineaModule,
      BancoModule,
      ClaseModule,
      ColorModule,
      ModalidadModule,
      PaisModule,
      DepartamentoModule,
      CombustibleModule,
      ConsumibleModule,
      MunicipioModule,
      OrganismoTransitoModule,
      ServicioModule,
      ModuloModule,
      TramiteModule,
      AlmacenModule,
      CfgTipoInfractorModule,
      CiudadanoModule,
      TipoIdentificacionModule,
      CfgAuditoriaModule,
      CfgSmlmvModule,
      cfgFestivoModule,
      buscarAutomotorModule,
      CfgLicenciaConduccionCategoriaModule,
      CfgTipoVehiculoModule,
      CfgAsignacionPlacaSedeModule,
      CfgTipoClaseModule,
      RncLicenciaConduccionModule,
      
      SvCapacitacionModule,
      SvCfgFuncionModule,
      SvCfgFuncionCriterioModule,
      SvCfgClaseActorViaModule,
      SvCfgTemaCapacitacionModule,
      SvCfgAreaModule,
      SvCfgTipoAreaModule,
      SvCfgAseguradoraModule,
      SvCfgCalzadaCarrilModule,
      SvCfgCardinalidadModule,
      SvCfgClaseChoqueModule,
      SvCfgCondicionViaModule,
      SvCfgControlViaModule,
      SvCfgDisenioModule,
      SvCfgEntidadAccidenteModule,
      SvCfgEstadoConductorModule,
      SvCfgEstadoIluminacionModule,
      SvCfgEstadoTiempoModule,
      SvCfgEstadoViaModule,
      SvCfgFallaModule,
      SvCfgGeometriaModule,
      SvCfgGradoExamenModule,
      SvCfgGravedadVictimaModule,
      SvCfgHipotesisModule,
      SvCfgHospitalModule,
      SvCfgIluminacionModule,
      SvCfgLugarImpactoModule,
      SvCfgMaterialModule,
      SvCfgMotivoAnulacionModule,
      SvCfgNacionalidadModule,
      SvCfgRequiereEmpresaModule,
      SvCfgResultadoExamenModule,
      SvCfgSectorModule,
      SvCfgSustanciaPeligrosaModule,
      SvCfgTipoControlModule,
      SvCfgTipoGeometriaModule,
      SvCfgTipoViaModule,
      SvCfgTipoVictimaModule,
      SvCfgUnidadReceptoraModule,
      SvCfgUtilizacionModule,
      SvCfgVisualModule,
      SvCfgVisualDisminuidaModule,
      SvCfgZonaModule,

      MsvEvaluacionModule,
      MsvRevisionModule,
      MsvCaracterizacionModule,
      MsvCategoriaModule,
      GdDocumentoModule,
      GdTrazabilidadModule,
      GdCfgTipoCorrespondenciaModule,
      GdCfgMedioCorrespondenciaModule,
      MflInfraccionModule,
      MflInfraccionCategoriaModule,
      MparqCostoTrayectoModule,
      MparqGruaModule,
      MparqGruaCiudadanoModule,
      MparqEntradaModule,
      MparqSalidaModule,
      MparqPatioModule,
      CfgCargoModule,
      MpersonalFuncionarioModule,
      MpersonalTipoContratoModule,
      MpersonalTalonarioModule,
      MpersonalAsignacionModule,
      GeneroModule,
      GrupoSanguineoModule,
      CuentaModule,
      CarroceriaModule,
      ComparendoModule,
      CfgAdmFormatoTipoModule,
      CfgBodegaModule,
      CfgSvConectorModule,
      CfgSvSenialTipoModule,
      CfgSvSenialColorModule,
      CfgSvSenialEstadoModule,
      CfgSvUnidadMedidaModule,
      CvCfgInteresModule,
      CvCfgPorcentajeInicialModule,
      CvAcuerdoPagoModule,
      VhloCfgCdaModule,
      VhloCfgOrigenRegistroModule,
      VhloCfgEmpresaGpsModule,
      VhloCfgTipoRodajeModule,
      VhloCfgTipoCabinaModule,
      VhloCfgTipoMaquinariaModule,
      VhloCfgClaseMaquinariaModule,
      VhloCfgSubpartidaArancelariaModule,
      VhloCfgCondicionIngresoModule,
      VehiculoTecnoMecanicaModule,
      SoatModule,
      CfgComparendoEstadoModule,
      InfraccionModule,
      FacturaModule,
      TramiteFacturaModule,
      TramiteSolicitudModule,
      TramiteSolicitudRncModule,
      TramiteSolicitudRpcccModule,
      TramiteSolicitudRnmaModule,
      TramiteSolicitudRnrsModule,
      SustratoModule,
      GestionTransportePublicoModule,
      EmpresaModule,
      // SucursalModule,
      TramitePrecioModule,
      RnaPreasignacionPlacaModule,
      RnaPreregistroModule,
      CfgPlacaModule,
      CfgCasoInsumoModule,
      CfgGravedadModule,
      CfgClaseAccidenteModule,
      CfgChoqueConModule,
      CfgObjetoFijoModule,
      CfgSedeOperativaModule,
      CfgEntidadJudicialModule,
      CfgCausalLimitacionModule,
      MsvTalonarioModule,
      rnaRegistroInsumosModule,
      RnmaPreregistroModule,
      rnaAsignacionInsumosModule,
      LimitacionModule,
      CfgTipoProcesoModule,
      RnmaTramiteInscripcionLimitacionModule,
      RnmaTramiteLevantamientoLimitacionModule,
      RnrsTramiteInscripcionLimitacionModule,
      RnrsTramiteLevantamientoLimitacionModule,
      RnaTramiteInscripcionLimitacionModule,
      RnaTramiteLevantamientoLimitacionModule,
      MsvRegistroIpatModule,
      CfgValorVehiculoModule,
      RnrsPreregistroModule,
      ReporteModule,
      registroEntregaProductoModule,
      RpcccInventarioDocumentalModule,
      InsumoBusquedaModule,
      FacturaInfraccionModule,
      //MsvTCAsignacionModule,
      CfgEmpresaServicioModule,
      MsvSenialInventarioModule,
      RnaCertificadoTradicionOficialModule,
      //RnaPreasignacionInsumoModule,
    ],
    declarations: [DashboardComponent, TopNavComponent, SidebarComponent, FooterComponent, RightsidebarComponent],
    exports: [DashboardComponent, TopNavComponent, SidebarComponent, FooterComponent, RightsidebarComponent],
  providers: [],
})

export class DashboardModule { }
