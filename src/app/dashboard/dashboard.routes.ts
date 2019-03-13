import { Route } from '@angular/router';

import { UserEmpresaRoutes } from './userEmpresa/userEmpresa.routes';
import { UserCiudadanoRoutes } from './userCiudadano/userCiudadano.routes';
import { UserCfgTipoIdentificacionRoutes } from './userCfgTipoIdentificacion/userCfgTipoIdentificacion.routes';
import { UserCfgGeneroRoutes } from './userCfgGenero/userCfgGenero.routes';
import { UserCfgGrupoSanguineoRoutes } from './userCfgGrupoSanguineo/userCfgGrupoSanguineo.routes';
import { UserCfgMenuRoutes } from './userCfgMenu/userCfgMenu.routes';
import { UserCfgRoleRoutes } from './userCfgRole/userCfgRole.routes';
import { UserUsuarioMenuRoutes } from './userUsuarioMenu/userUsuarioMenu.routes';

import { HomeRoutes } from './home/home.routes';
import { VehiculoRoutes } from './vehiculo/vehiculo.routes';
import { VhloCfgMarcaRoutes } from './vhloCfgMarca/vhloCfgMarca.routes';
import { VhloCfgLineaRoutes } from './vhloCfgLinea/vhloCfgLinea.routes';
import { BancoRoutes } from './banco/banco.routes';
import { VhloCfgClaseRoutes } from './vhloCfgClase/vhloCfgClase.routes';
import { VhloCfgColorRoutes } from './vhloCfgColor/vhloCfgColor.routes';
import { VhloCfgCombustibleRoutes } from './vhloCfgCombustible/vhloCfgCombustible.routes';
import { ConsumibleRoutes } from './consumible/consumible.routes';
import { ModalidadRoutes } from './modalidad/modalidad.routes';

import { FroTrteSolicitudRncRoutes } from './froTrteSolicitudRnc/froTrteSolicitudRnc.routes';
import { FroFacTramiteRoutes } from './froFacTramite/froFacTramite.routes';
import { FroTrteCfgCuentaRoutes } from './froTrteCfgCuenta/froTrteCfgCuenta.routes';

import { OrganismoTransitoRoutes } from './organismoTransito/organismoTransito.routes';
import { VhloCfgServicioRoutes } from './vhloCfgServicio/vhloCfgServicio.routes';
import { AlmacenRoutes } from './almacen/almacen.routes';

import { CfgPaisRoutes } from './cfgPais/cfgPais.routes';
import { CfgDepartamentoRoutes } from './cfgDepartamento/cfgDepartamento.routes';
import { CfgMunicipioRoutes } from './cfgMunicipio/cfgMunicipio.routes';
import { CfgTipoInfractorRoutes } from './cfgTipoInfractor/cfgTipoInfractor.routes';
import { CfgAdmFormatoRoutes } from './cfgAdmFormato/cfgAdmFormato.routes';
import { CfgAdmFormatoTipoRoutes } from './cfgAdmFormatoTipo/cfgAdmFormatoTipo.routes';

import { CvCdoTrazabilidadRoutes } from './cvCdoTrazabilidad/cvCdoTrazabilidad.routes';
import { CvCdoNotificacionRoutes } from './cvCdoNotificacion/cvCdoNotificacion.routes';
import { CvCdoCfgInteresRoutes } from './cvCdoCfgInteres/cvCdoCfgInteres.routes';
import { CvAudienciaRoutes } from './cvAudiencia/cvAudiencia.routes';
import { CvAuCfgAtencionRoutes } from './cvAuCfgAtencion/cvAuCfgAtencion.routes';
import { CvAuCfgHorarioRoutes } from './cvAuCfgHorario/cvAuCfgHorario.routes';

import { CvLcCfgMotivoRoutes } from './cvLcCfgMotivo/cvLcCfgMotivo.routes';
import { CvRestriccionRoutes } from './cvRestriccion/cvRestriccion.routes';
import { CvCfgInteresRoutes } from './cvCfgInteres/cvCfgInteres.routes';
import { CvCfgPorcentajeInicialRoutes } from './cvCfgPorcentajeInicial/cvCfgPorcentajeInicial.routes';

import { CfgBodegaRoutes } from './cfgBodega/cfgBodega.routes';
import { SvCfgSenialUnidadMedidaRoutes } from './svCfgSenialUnidadMedida/svCfgSenialUnidadMedida.routes';
import { SvCfgSenialTipoRoutes } from './svCfgSenialTipo/svCfgSenialTipo.routes';
import { SvCfgSenialColorRoutes } from './svCfgSenialColor/svCfgSenialColor.routes';
import { SvCfgSenialEstadoRoutes } from './svCfgSenialEstado/svCfgSenialEstado.routes';
import { SvCfgSenialLineaRoutes } from './svCfgSenialLinea/svCfgSenialLinea.routes';
import { SvCfgSenialProveedorRoutes } from './svCfgSenialProveedor/svCfgSenialProveedor.routes';
import { SvCfgSenialRoutes } from './svCfgSenial/svCfgSenial.routes';
import { SvSenialInventarioRoutes } from './svSenialInventario/svSenialInventario.routes';

import { VhloCfgTipoVehiculoRoutes } from './vhloCfgTipoVehiculo/vhloCfgTipoVehiculo.routes';
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
import { VhloPlacaSedeRoutes } from './vhloPlacaSede/vhloPlacaSede.routes';
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

import { ComparendoRoutes } from './comparendo/comparendo.routes';
import { InfraccionRoutes } from './infraccion/infraccion.routes';

import { CfgComparendoEstadoRoutes } from './cfgComparendoEstado/cfgComparendoEstado.routes';
import { CfgAuditoriaRoutes } from './cfgAuditoria/cfgAuditoria.routes';
import { CfgSmlmvRoutes } from './cfgSmlmv/cfgSmlmv.routes';
import { cfgFestivoRoutes } from './cfgFestivo/cfgFestivo.routes';
import { CfgValorVehiculoRoutes } from './cfgValorVehiculo/cfgValorVehiculo.routes';

import { buscarAutomotorRoutes } from './buscarAutomotor/buscarAutomotor.routes';
import { registroEntregaProductoRoutes } from './registroEntregaProducto/registroEntregaProducto.routes';

import { CfgLicenciaConduccionCategoriaRoutes } from './cfgLicenciaConduccionCategoria/cfgLicenciaConduccionCategoria.routes';
import { RncLicenciaConduccionRoutes } from './rncLicenciaConduccion/rncLicenciaConduccion.routes';

import { CfgTipoClaseRoutes } from './cfgTipoClase/cfgTipoClase.routes';

import { MsvCaracterizacionRoutes } from './msvCaracterizacion/msvCaracterizacion.routes';
import { MsvEvaluacionRoutes } from './msvEvaluacion/msvEvaluacion.routes';
import { MsvCategoriaRoutes } from './msvCategoria/msvCategoria.routes';
import { MsvVariableRoutes } from './msvVariable/msvVariable.routes';
import { MsvParametroRoutes } from './msvParametro/msvParametro.routes';
import { MsvCriterioRoutes } from './msvCriterio/msvCriterio.routes';

import { GdDocumentoRoutes } from './gdDocumento/gdDocumento.routes';
import { GdTrazabilidadRoutes } from './gdTrazabilidad/gdTrazabilidad.routes';
import { GdCfgTipoCorrespondenciaRoutes } from './gdCfgTipoCorrespondencia/gdCfgTipoCorrespondencia.routes';
import { GdCfgMedioCorrespondenciaRoutes } from './gdCfgMedioCorrespondencia/gdCfgMedioCorrespondencia.routes';

import { MflInfraccionRoutes } from './mflInfraccion/mflInfraccion.routes';
import { MflInfraccionCategoriaRoutes } from './mflInfraccionCategoria/mflInfraccionCategoria.routes';

import { PqoCfgPatioRoutes } from './pqoCfgPatio/pqoCfgPatio.routes';
import { PqoCfgGruaRoutes } from './pqoCfgGrua/pqoCfgGrua.routes';
import { PqoGruaCiudadanoRoutes } from './pqoGruaCiudadano/pqoGruaCiudadano.routes';
import { PqoInmovilizacionRoutes } from './pqoInmovilizacion/pqoInmovilizacion.routes';
import { MparqCostoTrayectoRoutes } from './mparqCostoTrayecto/mparqCostoTrayecto.routes';

import { PnalCfgCargoRoutes } from './pnalCfgCargo/pnalCfgCargo.routes';
import { PnalCfgTipoNombramientoRoutes } from './pnalCfgTipoNombramiento/pnalCfgTipoNombramiento.routes';
import { PnalFuncionarioRoutes } from './pnalFuncionario/pnalFuncionario.routes';

import { CfgCargoRoutes } from './cfgCargo/cfgCargo.routes';
import { MpersonalFuncionarioRoutes } from './mpersonalFuncionario/mpersonalFuncionario.routes';
import { MpersonalTipoContratoRoutes } from './mpersonalTipoContrato/mpersonalTipoContrato.routes';
import { MpersonalTalonarioRoutes } from './mpersonalTalonario/mpersonalTalonario.routes';
import { MpersonalAsignacionRoutes } from './mpersonalAsignacion/mpersonalAsignacion.routes';

import { VhloPropietarioRoutes } from './vhloPropietario/vhloPropietario.routes';
import { VhloCfgCarroceriaRoutes } from './vhloCfgCarroceria/vhloCfgCarroceria.routes';

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

import { EmpresaAlcaldiaRoutes } from './empresaAlcaldia/empresaAlcaldia.routes';
import { RpcccInventarioDocumentalRoutes } from './rpcccInventarioDocumental/rpcccInventarioDocumental.routes';

import { RnaPreasignacionPlacaRoutes } from './rnaPreasignacionPlaca/rnaPreasignacionPlaca.routes';
import { RnrsPreasignacionPlacaRoutes } from './rnrsPreasignacionPlaca/rnrsPreasignacionPlaca.routes';
import { RnaPreregistroRoutes } from './rnaPreregistro/rnaPreregistro.routes';

// import { SucursalRoutes } from './empresa/sucursal/sucursal.routes';
import { TramitePrecioRoutes } from './tramitePrecio/tramitePrecio.routes';

import { CfgModuloRoutes } from './cfgModulo/cfgModulo.routes';
import { CfgOrganismoTransitoRoutes } from './cfgOrganismoTransito/cfgOrganismoTransito.routes';
import { VhloCfgPlacaRoutes } from './vhloCfgPlaca/vhloCfgPlaca.routes';
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
import { ReporteRoutes } from './reporte/reporte.routes';
import { rnaPreasignacionInsumoRoutes } from './rnaPreasignacIonInsumo/rnaPreasignacionInsumo.routes';
import { RnaCertificadoTradicionRoutes } from './rnaCertificadoTradicionOficial/rnaCertificadoTradicionOficial.routes';
import { CvCfgTipoRestriccionRoutes } from './cvCfgTipoRestriccion/cvCfgTipoRestriccion.routes';
import { CvLcCfgTipoRestriccionRoutes } from './cvLcCfgTipoRestriccion/cvLcCfgTipoRestriccion.routes';
import { CvCfgTipoMedidaCautelarRoutes } from './cvCfgTipoMedidaCautelar/cvCfgTipoMedidaCautelar.routes';
import { CvMedidaCautelarRoutes } from './cvMedidaCautelar/cvMedidaCautelar.routes';

import { InsumoBusquedaRoutes } from './insumoBusqueda/insumoBusqueda.routes';
import { ImoCfgTipoRoutes } from './imoCfgTipo/imoCfgTipo.routes';

import { BpCfgTipoInsumoRoutes } from './bpCfgTipoInsumo/bpCfgTipoInsumo.routes';
import { BpProyectoRoutes } from './bpProyecto/bpProyecto.routes';
import { BpCdpRoutes } from './bpCdp/bpCdp.routes';

import { FroFacturaRoutes } from './froFactura/froFactura.routes';
import { FroRecaudoRoutes } from './froRecaudo/froRecaudo.routes';
import { FroAcuerdoPagoRoutes } from './froAcuerdoPago/froAcuerdoPago.routes';
import { FroTramiteRoutes } from './froTramite/froTramite.routes';
import { FroTrteCfgConceptoRoutes } from './froTrteCfgConcepto/froTrteCfgConcepto.routes';
import { FroTrtePrecioRoutes } from './froTrtePrecio/froTrtePrecio.routes';
import { FroTrteSolicitudRnaRoutes } from './froTrteSolicitudRna/froTrteSolicitudRna.routes';
import { FroReporteIngresosRoutes } from './froReporteIngresos/froReporteIngresos.routes';
import { FroCfgTipoRecaudoRoutes } from './froCfgTipoRecaudo/froCfgTipoRecaudo.routes';
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
      ...CvLcCfgTipoRestriccionRoutes,
      ...UserEmpresaRoutes,
      ...UserCiudadanoRoutes,
      ...UserCfgTipoIdentificacionRoutes,
      ...UserCfgGeneroRoutes,
      ...UserCfgGrupoSanguineoRoutes,
      ...UserCfgMenuRoutes,
      ...UserCfgRoleRoutes,
      ...UserUsuarioMenuRoutes,
      ...HomeRoutes,
      ...VehiculoRoutes,
      ...VhloCfgMarcaRoutes,
      ...VhloCfgLineaRoutes,
      ...BancoRoutes,
      ...VhloCfgClaseRoutes,
      ...VhloCfgColorRoutes,
      ...VhloCfgCombustibleRoutes,
      ...ConsumibleRoutes,
      ...ModalidadRoutes,
      ...OrganismoTransitoRoutes,
      ...VhloCfgServicioRoutes,
      ...CfgPaisRoutes,
      ...CfgDepartamentoRoutes,
      ...CfgMunicipioRoutes,
      ...CfgAuditoriaRoutes,
      ...CfgSmlmvRoutes,
      ...cfgFestivoRoutes,
      ...CfgLicenciaConduccionCategoriaRoutes,
      ...CfgTipoClaseRoutes,
      ...CfgModuloRoutes,
      ...PnalCfgCargoRoutes,
      ...PnalCfgTipoNombramientoRoutes,
      ...PnalFuncionarioRoutes,
      ...CfgCargoRoutes,
      ...CfgTipoInfractorRoutes,
      ...CfgAdmFormatoRoutes,
      ...CfgAdmFormatoTipoRoutes,
      ...buscarAutomotorRoutes,
      ...registroEntregaProductoRoutes,
      ...RncLicenciaConduccionRoutes,
      ...MsvCaracterizacionRoutes,
      ...MsvEvaluacionRoutes,
      ...MsvCategoriaRoutes,
      ...MsvVariableRoutes,
      ...MsvParametroRoutes,
      ...MsvCriterioRoutes,
      ...GdDocumentoRoutes,
      ...GdTrazabilidadRoutes,
      ...GdCfgTipoCorrespondenciaRoutes,
      ...GdCfgMedioCorrespondenciaRoutes,
      ...MflInfraccionRoutes,
      ...MflInfraccionCategoriaRoutes,
      ...PqoCfgPatioRoutes,
      ...PqoCfgGruaRoutes,
      ...PqoGruaCiudadanoRoutes,
      ...PqoInmovilizacionRoutes,
      ...MparqCostoTrayectoRoutes,
      ...MpersonalFuncionarioRoutes,
      ...MpersonalTipoContratoRoutes,
      ...MpersonalTalonarioRoutes,
      ...MpersonalAsignacionRoutes,
      ...FroTrteSolicitudRncRoutes,
      ...FroFacTramiteRoutes,
      ...FroTrteCfgCuentaRoutes,
      ...TramiteRoutes,
      ...AlmacenRoutes,
      ...ComparendoRoutes,
      ...CvCdoTrazabilidadRoutes,
      ...CvCdoNotificacionRoutes,
      ...CvCdoCfgInteresRoutes,
      ...CvAudienciaRoutes,
      ...CvAuCfgAtencionRoutes,
      ...CvAuCfgHorarioRoutes,
      ...CvLcCfgMotivoRoutes,
      ...CvRestriccionRoutes,
      ...CvCfgInteresRoutes,
      ...CvCfgPorcentajeInicialRoutes,
      ...CfgBodegaRoutes,
      ...SvCfgSenialUnidadMedidaRoutes,
      ...SvCfgSenialTipoRoutes,
      ...SvCfgSenialColorRoutes,
      ...SvCfgSenialEstadoRoutes,
      ...SvCfgSenialLineaRoutes,
      ...SvCfgSenialProveedorRoutes,
      ...SvCfgSenialRoutes,
      ...SvSenialInventarioRoutes,
      ...VhloCfgTipoVehiculoRoutes,
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
      ...VhloPlacaSedeRoutes,
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
      ...InfraccionRoutes,
      ...VhloPropietarioRoutes,
      ...VhloCfgCarroceriaRoutes,
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
      ...RnaPreasignacionPlacaRoutes,
      ...RnaPreregistroRoutes,
      ...rnaRegistroInsumosRoutes,
      ...rnaPreasignacionInsumoRoutes,
      ...TramitePrecioRoutes,
      ...CfgComparendoEstadoRoutes,
      ...CfgOrganismoTransitoRoutes,
      ...VhloCfgPlacaRoutes,
      ...ImoCfgTipoRoutes,
      ...CfgEntidadJudicialRoutes,
      ...CfgCausalLimitacionRoutes,
      ...CfgGravedadRoutes,
      ...CfgClaseAccidenteRoutes,
      ...CfgChoqueConRoutes,
      ...CfgObjetoFijoRoutes,
      ...MsvTalonarioRoutes,
      ...ConceptoParametroRoutes,
      ...RnmaPreregistroRoutes,
      ...MsvRegistroIpatRoutes,
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
      ...BpCfgTipoInsumoRoutes,
      ...BpProyectoRoutes,
      ...BpCdpRoutes,
      ...RnrsPreasignacionPlacaRoutes,
      ...EmpresaAlcaldiaRoutes,
      ...FroFacturaRoutes,
      ...FroRecaudoRoutes,
      ...FroAcuerdoPagoRoutes,
      ...FroTramiteRoutes,
      ...FroTrteCfgConceptoRoutes,
      ...FroTrtePrecioRoutes,
      ...FroTrteSolicitudRnaRoutes,
      ...FroReporteIngresosRoutes,
      ...FroCfgTipoRecaudoRoutes,
      
    ]
  }
];
