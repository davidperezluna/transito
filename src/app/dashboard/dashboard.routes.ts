import { Route } from '@angular/router';

import { UserCfgMenuRoutes } from './userCfgMenu/userCfgMenu.routes';
import { UserCfgRoleRoutes } from './userCfgRole/userCfgRole.routes';

import { HomeRoutes } from './home/home.routes';
import { VehiculoRoutes } from './vehiculo/vehiculo.routes';
import { MarcaRoutes } from './marca/marca.routes';
import { LineaRoutes } from './linea/linea.routes';
import { BancoRoutes } from './banco/banco.routes';
import { ClaseRoutes } from './clase/clase.routes';
import { ColorRoutes } from './color/color.routes';
import { CombustibleRoutes } from './combustible/combustible.routes';
import { ConsumibleRoutes } from './consumible/consumible.routes';
import { ModalidadRoutes } from './modalidad/modalidad.routes';
import { DepartamentoRoutes } from './departamento/departamento.routes';
import { MunicipioRoutes } from './municipio/municipio.routes';
import { PaisRoutes } from './pais/pais.routes';
import { CuentaRoutes } from './cuenta/cuenta.routes';
import { OrganismoTransitoRoutes } from './organismoTransito/organismoTransito.routes';
import { ServicioRoutes } from './servicio/servicio.routes';
import { AlmacenRoutes } from './almacen/almacen.routes';
import { CfgTipoInfractorRoutes } from './cfgTipoInfractor/cfgTipoInfractor.routes';

import { CfgAdmFormatoTipoRoutes } from './cfgAdmFormatoTipo/cfgAdmFormatoTipo.routes';

import { CvLcCfgMotivoRoutes } from './cvLcCfgMotivo/cvLcCfgMotivo.routes';
import { CvLcCfgRestriccionRoutes } from './cvLcCfgRestriccion/cvLcCfgRestriccion.routes';
import { CvCfgInteresRoutes } from './cvCfgInteres/cvCfgInteres.routes';
import { CvCfgPorcentajeInicialRoutes } from './cvCfgPorcentajeInicial/cvCfgPorcentajeInicial.routes';
import { CvAcuerdoPagoRoutes } from './cvAcuerdoPago/cvAcuerdoPago.routes';

import { CfgBodegaRoutes } from './cfgBodega/cfgBodega.routes';
import { CfgSvConectorRoutes } from './cfgSvConector/cfgSvConector.routes';
import { SvCfgSenialTipoRoutes } from './svCfgSenialTipo/svCfgSenialTipo.routes';
import { CfgSvSenialColorRoutes } from './cfgSvSenialColor/cfgSvSenialColor.routes';
import { CfgSvSenialEstadoRoutes } from './cfgSvSenialEstado/cfgSvSenialEstado.routes';
import { MsvSenialInventarioRoutes } from './msvSenialInventario/msvSenialInventario.routes';
import { CfgSvUnidadMedidaRoutes } from './cfgSvUnidadMedida/cfgSvUnidadMedida.routes';

import { VhloCfgTipoAlertaRoutes } from './vhloCfgTipoAlerta/vhloCfgTipoAlerta.routes';
import { VhloCfgCdaRoutes } from './vhloCfgCda/vhloCfgCda.routes';
import { VhloCfgOrigenRegistroRoutes } from './vhloCfgOrigenRegistro/vhloCfgOrigenRegistro.routes';
import { VhloCfgModalidadTransporteRoutes } from './vhloCfgModalidadTransporte/vhloCfgModalidadTransporte.routes';
import { VhloCfgRadioAccionRoutes } from './vhloCfgRadioAccion/vhloCfgRadioAccion.routes';
import { VhloCfgTransportePasajeroRoutes } from './vhloCfgTransportePasajero/vhloCfgTransportePasajero.routes';
import { VhloCfgTransporteEspecialRoutes } from './vhloCfgTransporteEspecial/vhloCfgTransporteEspecial.routes';
import { VhloCfgEmpresaGpsRoutes } from './vhloCfgEmpresaGps/vhloCfgEmpresaGps.routes';
import { VhloCfgTipoRodajeRoutes } from './vhloCfgTipoRodaje/vhloCfgTipoRodaje.routes';
import { VhloCfgTipoCabinaRoutes } from './vhloCfgTipoCabina/vhloCfgTipoCabina.routes';
import { VhloCfgTipoMaquinariaRoutes } from './vhloCfgTipoMaquinaria/vhloCfgTipoMaquinaria.routes';
import { VhloCfgClaseMaquinariaRoutes } from './vhloCfgClaseMaquinaria/vhloCfgClaseMaquinaria.routes';
import { VhloCfgSubpartidaArancelariaRoutes } from './vhloCfgSubpartidaArancelaria/vhloCfgSubpartidaArancelaria.routes';
import { VhloCfgCondicionIngresoRoutes } from './vhloCfgCondicionIngreso/vhloCfgCondicionIngreso.routes';
import { VehiculoTecnoMecanicaRoutes } from './vehiculoTecnoMecanica/vehiculoTecnoMecanica.routes';
import { SoatRoutes } from './soat/soat.routes';

import { SvCapacitacionRoutes } from './svCapacitacion/svCapacitacion.routes';
import { SvCfgFuncionRoutes } from './svCfgFuncion/svCfgFuncion.routes';
import { SvCfgFuncionCriterioRoutes } from './svCfgFuncionCriterio/svCfgFuncionCriterio.routes';
import { SvCfgAreaRoutes } from './svCfgArea/svCfgArea.routes';
import { SvCfgTipoAreaRoutes } from './svCfgTipoArea/svCfgTipoArea.routes';
import { SvCfgAseguradoraRoutes } from './svCfgAseguradora/svCfgAseguradora.routes';
import { SvCfgCalzadaCarrilRoutes } from './svCfgCalzadaCarril/svCfgCalzadaCarril.routes';
import { SvCfgCardinalidadRoutes } from './svCfgCardinalidad/svCfgCardinalidad.routes';
import { SvCfgClaseChoqueRoutes } from './svCfgClaseChoque/svCfgClaseChoque.routes';
import { SvCfgCondicionViaRoutes } from './svCfgCondicionVia/svCfgCondicionVia.routes';
import { SvCfgControlViaRoutes } from './svCfgControlVia/svCfgControlVia.routes';
import { SvCfgDisenioRoutes } from './svCfgDisenio/svCfgDisenio.routes';
import { SvCfgEntidadAccidenteRoutes } from './svCfgEntidadAccidente/svCfgEntidadAccidente.routes';
import { SvCfgEstadoConductorRoutes } from './svCfgEstadoConductor/svCfgEstadoConductor.routes';
import { SvCfgEstadoIluminacionRoutes } from './svCfgEstadoIluminacion/svCfgEstadoIluminacion.routes';
import { SvCfgEstadoTiempoRoutes } from './svCfgEstadoTiempo/svCfgEstadoTiempo.routes';
import { SvCfgEstadoViaRoutes } from './svCfgEstadoVia/svCfgEstadoVia.routes';
import { SvCfgFallaRoutes } from './svCfgFalla/svCfgFalla.routes';
import { SvCfgGeometriaRoutes } from './svCfgGeometria/svCfgGeometria.routes';
import { SvCfgGradoExamenRoutes } from './svCfgGradoExamen/svCfgGradoExamen.routes';
import { SvCfgGravedadVictimaRoutes } from './svCfgGravedadVictima/svCfgGravedadVictima.routes';
import { SvCfgHipotesisRoutes } from './svCfgHipotesis/svCfgHipotesis.routes';
import { SvCfgHospitalRoutes } from './svCfgHospital/svCfgHospital.routes';
import { SvCfgIluminacionRoutes } from './svCfgIluminacion/svCfgIluminacion.routes';
import { SvCfgLugarImpactoRoutes } from './svCfgLugarImpacto/svCfgLugarImpacto.routes';
import { SvCfgMaterialRoutes } from './svCfgMaterial/svCfgMaterial.routes';
import { SvCfgMotivoAnulacionRoutes } from './svCfgMotivoAnulacion/svCfgMotivoAnulacion.routes';
import { SvCfgNacionalidadRoutes } from './svCfgNacionalidad/svCfgNacionalidad.routes';
import { SvCfgRequiereEmpresaRoutes } from './svCfgRequiereEmpresa/svCfgRequiereEmpresa.routes';
import { SvCfgResultadoExamenRoutes } from './svCfgResultadoExamen/svCfgResultadoExamen.routes';
import { SvCfgSectorRoutes } from './svCfgSector/svCfgSector.routes';
import { SvCfgSustanciaPeligrosaRoutes } from './svCfgSustanciaPeligrosa/svCfgSustanciaPeligrosa.routes';
import { SvCfgTipoControlRoutes } from './svCfgTipoControl/svCfgTipoControl.routes';
import { SvCfgTipoGeometriaRoutes } from './svCfgTipoGeometria/svCfgTipoGeometria.routes';
import { SvCfgTipoViaRoutes } from './svCfgTipoVia/svCfgTipoVia.routes';
import { SvCfgTipoVictimaRoutes } from './svCfgTipoVictima/svCfgTipoVictima.routes';
import { SvCfgUnidadReceptoraRoutes } from './svCfgUnidadReceptora/svCfgUnidadReceptora.routes';
import { SvCfgUtilizacionRoutes } from './svCfgUtilizacion/svCfgUtilizacion.routes';
import { SvCfgVisualRoutes } from './svCfgVisual/svCfgVisual.routes';
import { SvCfgVisualDisminuidaRoutes } from './svCfgVisualDisminuida/svCfgVisualDisminuida.routes';
import { SvCfgZonaRoutes } from './svCfgZona/svCfgZona.routes';

import { SvCfgClaseActorViaRoutes } from './svCfgClaseActorVia';
import { SvCfgTemaCapacitacionRoutes } from './svCfgTemaCapacitacion';

import { CfgComparendoEstadoRoutes } from './cfgComparendoEstado/cfgComparendoEstado.routes';
import { ComparendoRoutes } from './comparendo/comparendo.routes';
import { InfraccionRoutes } from './infraccion/infraccion.routes';

import { CiudadanoRoutes } from './ciudadano/ciudadano.routes';
import { TipoIdentificacionRoutes } from './tipoIdentificacion/tipoIdentificacion.routes';

import { CfgAuditoriaRoutes } from './cfgAuditoria/cfgAuditoria.routes';
import { CfgSmlmvRoutes } from './cfgSmlmv/cfgSmlmv.routes';
import { cfgFestivoRoutes } from './cfgFestivo/cfgFestivo.routes';
import { CfgValorVehiculoRoutes } from './cfgValorVehiculo/cfgValorVehiculo.routes';
import { buscarAutomotorRoutes } from './buscarAutomotor/buscarAutomotor.routes';
import { registroEntregaProductoRoutes } from './registroEntregaProducto/registroEntregaProducto.routes';

import { CfgLicenciaConduccionCategoriaRoutes } from './cfgLicenciaConduccionCategoria/cfgLicenciaConduccionCategoria.routes';
import { RncLicenciaConduccionRoutes } from './rncLicenciaConduccion/rncLicenciaConduccion.routes';

import { CfgTipoVehiculoRoutes } from './cfgTipoVehiculo/cfgTipoVehiculo.routes';
import { CfgAsignacionPlacaSedeRoutes } from './cfgAsignacionPlacaSede/cfgAsignacionPlacaSede.routes';
import { CfgTipoClaseRoutes } from './cfgTipoClase/cfgTipoClase.routes';

import { MsvCaracterizacion } from './msvCaracterizacion/msvCaracterizacion.routes';
import { MsvEvaluacionRoutes } from './msvEvaluacion/msvEvaluacion.routes';
import { MsvRevisionRoutes } from './msvRevision/msvRevision.routes';
import { MsvCategoriaRoutes } from './msvCategoria/msvCategoria.routes';

import { GdDocumentoRoutes } from './gdDocumento/gdDocumento.routes';
import { GdTrazabilidadRoutes } from './gdTrazabilidad/gdTrazabilidad.routes';
import { GdCfgTipoCorrespondenciaRoutes } from './gdCfgTipoCorrespondencia/gdCfgTipoCorrespondencia.routes';
import { GdCfgMedioCorrespondenciaRoutes } from './gdCfgMedioCorrespondencia/gdCfgMedioCorrespondencia.routes';

import { MflInfraccionRoutes } from './mflInfraccion/mflInfraccion.routes';
import { MflInfraccionCategoriaRoutes } from './mflInfraccionCategoria/mflInfraccionCategoria.routes';

import { MparqCostoTrayectoRoutes } from './mparqCostoTrayecto/mparqCostoTrayecto.routes';
import { MparqGruaRoutes } from './mparqGrua/mparqGrua.routes';
import { MparqGruaCiudadanoRoutes } from './mparqGruaCiudadano/mparqGruaCiudadano.routes';
import { MparqEntradaRoutes } from './mparqEntrada/mparqEntrada.routes';
import { MparqSalidaRoutes } from './mparqSalida/mparqSalida.routes';
import { MparqPatioRoutes } from './mparqPatio/mparqPatio.routes';

import { CfgCargoRoutes } from './cfgCargo/cfgCargo.routes';
import { MpersonalFuncionarioRoutes } from './mpersonalFuncionario/mpersonalFuncionario.routes';
import { MpersonalTipoContratoRoutes } from './mpersonalTipoContrato/mpersonalTipoContrato.routes';
import { MpersonalTalonarioRoutes } from './mpersonalTalonario/mpersonalTalonario.routes';
import { MpersonalAsignacionRoutes } from './mpersonalAsignacion/mpersonalAsignacion.routes';

import { GeneroRoutes } from './genero/genero.routes';
import { GrupoSanguineoRoutes } from './grupoSanguineo/grupoSanguineo.routes';
import { CarroceriaRoutes } from './carroceria/carroceria.routes';
import { ModuloRoutes } from './modulo/modulo.routes';
import { TramiteRoutes } from './tramite/tramite.routes';
import { FacturaRoutes } from './factura/factura.routes';
import { FacturaInfraccionRoutes } from './facturaInfraccion/facturaInfraccion.routes';
import { TramiteFacturaRoutes } from './tramiteFactura/tramiteFactura.routes';

import { TramiteSolicitudRoutes } from './tramiteSolicitud/tramiteSolicitud.routes';
import { TramiteSolicitudRncRoutes } from './tramiteSolicitudRnc/tramiteSolicitudRnc.routes';
import { TramiteSolicitudRpcccRoutes } from './tramiteSolicitudRpccc/tramiteSolicitudRpccc.routes';
import { TramiteSolicitudRnmaRoutes } from './tramiteSolicitudRnma/tramiteSolicitudRnma.routes';
import { TramiteSolicitudRnrsRoutes } from './tramiteSolicitudRnrs/tramiteSolicitudRnrs.routes';

import { SustratoRoutes } from './sustrato/sustrato.routes';
import { GestionTransportePublicoRoutes } from './gestionTransportePublico/gestionTransportePublico.routes';
import { ConceptoParametroRoutes } from './conceptoParametro/conceptoParametro.routes';
import { EmpresaRoutes } from './empresa/empresa.routes';
import { RpcccInventarioDocumentalRoutes } from './rpcccInventarioDocumental/rpcccInventarioDocumental.routes';

import { RnaPreasignacionPlacaRoutes } from './rnaPreasignacionPlaca/rnaPreasignacionPlaca.routes';
import { RnaPreregistroRoutes } from './rnaPreregistro/rnaPreregistro.routes';

// import { SucursalRoutes } from './empresa/sucursal/sucursal.routes';
import { TramitePrecioRoutes } from './tramitePrecio/tramitePrecio.routes';
import { CfgPlacaRoutes } from './cfgPlaca/cfgPlaca.routes';
import { CfgCasoInsumoRoutes } from './cfgCasoInsumo/cfgCasoInsumo.routes';
import { CfgSedeOperativaRoutes } from './cfgSedeOperativa/cfgSedeOperativa.routes';
import { CfgEntidadJudicialRoutes } from './cfgEntidadJudicial/cfgEntidadJudicial.routes';
import { CfgCausalLimitacionRoutes } from './cfgCausalLimitacion/cfgCausalLimitacion.routes';
import { MsvTalonarioRoutes } from './msvTalonario/msvTalonario.routes';
import { rnaRegistroInsumosRoutes } from './rnaRegistroInsumos/rnaRegistroInsumos.routes';
import { rnaAsignacionInsumosRoutes } from './rnaAsignacionInsumos/rnaAsignacionInsumos.routes';
//import { RnaPreasignacionInsumoRoutes } from './rnaPreasignacionInsumo/rnaPreasignacionInsumo.routes';
import { RnmaPreregistroRoutes } from './rnmaPreregistro/rnmaPreregistro.routes'; 
import { MsvRegistroIpatRoutes } from './msvRegistroIpat/msvRegistroIpat.routes';
import { TramiteInscripcionLimitacionRoutes } from './rnmaTramiteInscripcionLimitacion/rnmaTramiteInscripcionLimitacion.routes';
import { TramiteLevantamientoLimitacionRoutes } from './rnmaTramiteLevantamientoLimitacion/rnmaTramiteLevantamientoLimitacion.routes';
import { RnaTramiteInscripcionLimitacionRoutes } from './rnaTramiteInscripcionLimitacion/rnaTramiteInscripcionLimitacion.routes';
import { RnaTramiteLevantamientoLimitacionRoutes } from './rnaTramiteLevantamientoLimitacion/rnaTramiteLevantamientoLimitacion.routes';
import { RnrsTramiteInscripcionLimitacionRoutes } from './rnrsTramiteInscripcionLimitacion/rnrsTramiteInscripcionLimitacion.routes';
import { RnrsTramiteLevantamientoLimitacionRoutes } from './rnrsTramiteLevantamientoLimitacion/rnrsTramiteLevantamientoLimitacion.routes';
import { CfgEmpresaServicioRoutes } from './cfgEmpresaServicio/cfgEmpresaServicio.routes';
import { LimitacionRoutes } from './limitacion/limitacion.routes';
import { CfgTipoProcesoRoutes } from './cfgTipoProceso/cfgTipoProceso.routes';
import { CfgGravedadRoutes } from './cfgGravedad/cfgGravedad.routes';
import { CfgClaseAccidenteRoutes } from './cfgClaseAccidente/cfgClaseAccidente.routes';
import { CfgChoqueConRoutes } from './cfgChoqueCon/cfgChoqueCon.routes';
import { CfgObjetoFijoRoutes } from './cfgObjetoFijo/cfgObjetoFijo.routes';
import { RnrsPreregistroRoutes } from './rnrsPreregistro/rnrsPreregistro.routes';
import { InsumoBusquedaRoutes } from './insumoBusqueda/insumoBusqueda.routes';
import { ReporteRoutes } from './reporte/reporte.routes';
import { rnaPreasignacionInsumoRoutes } from './rnaPreasignacIonInsumo/rnaPreasignacionInsumo.routes';
import { RnaCertificadoTradicionRoutes } from './rnaCertificadoTradicionOficial/rnaCertificadoTradicionOficial.routes';
import { CvCfgTipoRestriccionRoutes } from './cvCfgTipoRestriccion/cvCfgTipoRestriccion.routes';
import { CvCfgTipoMedidaCautelarRoutes } from './cvCfgTipoMedidaCautelar/cvCfgTipoMedidaCautelar.routes';
import { CvMedidaCautelarRoutes } from './cvMedidaCautelar/cvMedidaCautelar.routes';
import { BpProyectoRoutes } from './bpProyecto/bpProyecto.routes';
//import { MsvTCAsignacionRoutes } from './msvTCAsignacion/msvTCAsignacion.routes';

//import { MsvSenialInventarioRoutes } from './msvSenialInventario/msvSenialInventario.routes';
//import { MsvSenialRoutes } from './msvSenial/msvSenial.routes';
//import { RnaCertificadoTradicionRoutes } from './rnaCertificadoTradicionOficial/rnaCertificadoTradicionOficial.routes';
import { DashboardComponent } from '.';

export const DashboardRoutes: Route[] = [
  {
    path: 'dashboard', 
    component: DashboardComponent,
    children: [
      ...UserCfgMenuRoutes,
      ...UserCfgRoleRoutes,
      ...HomeRoutes,
      ...VehiculoRoutes,
      ...MarcaRoutes,
      ...LineaRoutes,
      ...BancoRoutes,
      ...ClaseRoutes,
      ...ColorRoutes,
      ...CombustibleRoutes,
      ...ConsumibleRoutes,
      ...ModalidadRoutes,
      ...PaisRoutes,
      ...DepartamentoRoutes,
      ...MunicipioRoutes,
      ...OrganismoTransitoRoutes,
      ...ServicioRoutes,
      ...CiudadanoRoutes,
      ...TipoIdentificacionRoutes,
      ...CfgAuditoriaRoutes,
      ...CfgSmlmvRoutes,
      ...cfgFestivoRoutes,
      ...buscarAutomotorRoutes,
      ...registroEntregaProductoRoutes,
      ...CfgLicenciaConduccionCategoriaRoutes,
      ...CfgTipoVehiculoRoutes,
      ...CfgAsignacionPlacaSedeRoutes,
      ...CfgTipoClaseRoutes,
      ...RncLicenciaConduccionRoutes,
      ...MsvCaracterizacion,
      ...MsvEvaluacionRoutes,
      ...MsvRevisionRoutes,
      ...MsvCategoriaRoutes,
      ...GdDocumentoRoutes,
      ...GdTrazabilidadRoutes,
      ...GdCfgTipoCorrespondenciaRoutes,
      ...GdCfgMedioCorrespondenciaRoutes,
      ...MflInfraccionRoutes,
      ...MflInfraccionCategoriaRoutes,
      ...MparqCostoTrayectoRoutes,
      ...MparqGruaRoutes,
      ...MparqEntradaRoutes,
      ...MparqSalidaRoutes,
      ...MparqPatioRoutes,
      ...MparqGruaCiudadanoRoutes,
      ...CfgCargoRoutes,
      ...MpersonalFuncionarioRoutes,
      ...MpersonalTipoContratoRoutes,
      ...MpersonalTalonarioRoutes,
      ...MpersonalAsignacionRoutes,
      ...GeneroRoutes,
      ...GrupoSanguineoRoutes,
      ...CuentaRoutes,
      ...ModuloRoutes,
      ...TramiteRoutes,
      ...AlmacenRoutes,
      ...CfgTipoInfractorRoutes,
      ...ComparendoRoutes,
      ...CfgAdmFormatoTipoRoutes,
      ...CvLcCfgMotivoRoutes,
      ...CvLcCfgRestriccionRoutes,
      ...CvCfgInteresRoutes,
      ...CvCfgPorcentajeInicialRoutes,
      ...CvAcuerdoPagoRoutes,
      ...CfgBodegaRoutes,
      ...CfgSvConectorRoutes,
      ...SvCfgSenialTipoRoutes,
      ...CfgSvSenialColorRoutes,
      ...CfgSvSenialEstadoRoutes,
      ...MsvSenialInventarioRoutes,
      ...CfgSvUnidadMedidaRoutes,
      ...VhloCfgTipoAlertaRoutes,
      ...VhloCfgCdaRoutes,
      ...VhloCfgOrigenRegistroRoutes,
      ...VhloCfgModalidadTransporteRoutes,
      ...VhloCfgRadioAccionRoutes,
      ...VhloCfgTransportePasajeroRoutes,
      ...VhloCfgTransporteEspecialRoutes,
      ...VhloCfgEmpresaGpsRoutes,
      ...VhloCfgTipoRodajeRoutes,
      ...VhloCfgTipoCabinaRoutes,
      ...VhloCfgTipoMaquinariaRoutes,
      ...VhloCfgClaseMaquinariaRoutes,
      ...VhloCfgSubpartidaArancelariaRoutes,
      ...VhloCfgCondicionIngresoRoutes,
      ...VehiculoTecnoMecanicaRoutes,
      ...CvCfgTipoRestriccionRoutes,
      ...SoatRoutes,
      ...SvCapacitacionRoutes,
      ...SvCfgFuncionRoutes,
      ...SvCfgFuncionCriterioRoutes,
      ...SvCfgClaseActorViaRoutes,
      ...SvCfgTemaCapacitacionRoutes,
      ...SvCfgAreaRoutes,
      ...SvCfgTipoAreaRoutes,
      ...SvCfgAseguradoraRoutes,
      ...SvCfgCalzadaCarrilRoutes,
      ...SvCfgCardinalidadRoutes,
      ...SvCfgClaseChoqueRoutes,
      ...SvCfgCondicionViaRoutes,
      ...SvCfgControlViaRoutes,
      ...SvCfgDisenioRoutes,
      ...SvCfgEntidadAccidenteRoutes,
      ...SvCfgEstadoConductorRoutes,
      ...SvCfgEstadoIluminacionRoutes,
      ...SvCfgEstadoTiempoRoutes,
      ...SvCfgEstadoViaRoutes,
      ...SvCfgFallaRoutes,
      ...SvCfgGeometriaRoutes,
      ...SvCfgGradoExamenRoutes,
      ...SvCfgGravedadVictimaRoutes,
      ...SvCfgHipotesisRoutes,
      ...SvCfgHospitalRoutes,
      ...SvCfgIluminacionRoutes,
      ...SvCfgLugarImpactoRoutes,
      ...SvCfgMaterialRoutes,
      ...SvCfgMotivoAnulacionRoutes,
      ...SvCfgNacionalidadRoutes,
      ...SvCfgRequiereEmpresaRoutes,
      ...SvCfgResultadoExamenRoutes,
      ...SvCfgSectorRoutes,
      ...SvCfgSustanciaPeligrosaRoutes,
      ...SvCfgTipoControlRoutes,
      ...SvCfgTipoGeometriaRoutes,
      ...SvCfgTipoViaRoutes,
      ...SvCfgTipoVictimaRoutes,
      ...SvCfgUnidadReceptoraRoutes,
      ...SvCfgUtilizacionRoutes,
      ...SvCfgVisualRoutes,
      ...SvCfgVisualDisminuidaRoutes,
      ...SvCfgZonaRoutes,

      ...CfgComparendoEstadoRoutes,
      ...InfraccionRoutes,
      ...CarroceriaRoutes,
      ...FacturaRoutes,
      ...FacturaInfraccionRoutes,
      ...TramiteFacturaRoutes,
      ...TramiteSolicitudRoutes,
      ...TramiteSolicitudRncRoutes,
      ...TramiteSolicitudRpcccRoutes,
      ...TramiteSolicitudRnmaRoutes,
      ...TramiteSolicitudRnrsRoutes,
      ...SustratoRoutes,
      ...GestionTransportePublicoRoutes,
      ...EmpresaRoutes,
      ...RnaPreasignacionPlacaRoutes,
      ...RnaPreregistroRoutes,
      ...rnaRegistroInsumosRoutes,
      ...rnaPreasignacionInsumoRoutes,
      ...TramitePrecioRoutes,
      ...CfgPlacaRoutes,
      ...CfgCasoInsumoRoutes,
      ...CfgSedeOperativaRoutes,
      ...CfgEntidadJudicialRoutes,
      ...CfgCausalLimitacionRoutes,
      ...MsvTalonarioRoutes,
      //...MsvTCAsignacionRoutes, 
      ...ConceptoParametroRoutes,
      ...RnmaPreregistroRoutes,
      ...MsvRegistroIpatRoutes,
      ...CfgGravedadRoutes,
      ...CfgClaseAccidenteRoutes,
      ...CfgChoqueConRoutes,
      ...CfgObjetoFijoRoutes,
      ...TramiteInscripcionLimitacionRoutes,
      ...TramiteLevantamientoLimitacionRoutes,
      ...RnaTramiteInscripcionLimitacionRoutes,
      ...RnaTramiteLevantamientoLimitacionRoutes,
      ...RnrsTramiteInscripcionLimitacionRoutes,
      ...RnrsTramiteLevantamientoLimitacionRoutes,
      ...rnaAsignacionInsumosRoutes,
      ...LimitacionRoutes,
      ...CfgTipoProcesoRoutes,
      ...CfgValorVehiculoRoutes,
      ...RnrsPreregistroRoutes,
      ...ReporteRoutes,
      ...RpcccInventarioDocumentalRoutes,
      ...InsumoBusquedaRoutes,
      ...CfgEmpresaServicioRoutes,
      ...RnaCertificadoTradicionRoutes,
      ...CvCfgTipoMedidaCautelarRoutes,
      ...CvMedidaCautelarRoutes,
      ...BpProyectoRoutes,
    ]
  }
];
