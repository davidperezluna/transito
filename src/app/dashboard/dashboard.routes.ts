import { Route } from '@angular/router';

import { HomeRoutes } from './home/home.routes';

import { UserEmpresaRoutes } from './userEmpresa/userEmpresa.routes';
import { UserCiudadanoRoutes } from './userCiudadano/userCiudadano.routes';
import { UserCfgTipoIdentificacionRoutes } from './userCfgTipoIdentificacion/userCfgTipoIdentificacion.routes';
import { UserCfgGeneroRoutes } from './userCfgGenero/userCfgGenero.routes';
import { UserCfgGrupoSanguineoRoutes } from './userCfgGrupoSanguineo/userCfgGrupoSanguineo.routes';
import { UserCfgMenuRoutes } from './userCfgMenu/userCfgMenu.routes';
import { UserCfgRoleRoutes } from './userCfgRole/userCfgRole.routes';
import { UserUsuarioMenuRoutes } from './userUsuarioMenu/userUsuarioMenu.routes';
import { UserLicenciaConduccionRoutes } from './userLicenciaConduccion/userLicenciaConduccion.routes';
import { UserLicenciaTransitoRoutes } from './userLicenciaTransito/userLicenciaTransito.routes';
import { UserLcCfgCategoriaRoutes } from './userLcCfgCategoria/userLcCfgCategoria.routes';
import { UserMedidaCautelarRoutes } from './userMedidaCautelar/userMedidaCautelar.routes';
import { UserCfgGrupoEtnicoRoutes } from './userCfgGrupoEtnico/userCfgGrupoEtnico.routes';
import { UserCfgEmpresaTipoRoutes } from './userCfgEmpresaTipo/userCfgEmpresaTipo.routes';
import { UserCfgEmpresaServicioRoutes } from './userCfgEmpresaServicio/userCfgEmpresaServicio.routes';

import { CfgValorVehiculoRoutes } from './cfgValorVehiculo/cfgValorVehiculo.routes';
import { CfgBodegaRoutes } from './cfgBodega/cfgBodega.routes';
import { CfgTipoClaseRoutes } from './cfgTipoClase/cfgTipoClase.routes';

import { CvAudienciaRoutes } from './cvAudiencia/cvAudiencia.routes';
import { CvAuCfgAtencionRoutes } from './cvAuCfgAtencion/cvAuCfgAtencion.routes';
import { CvAuCfgHorarioRoutes } from './cvAuCfgHorario/cvAuCfgHorario.routes';
import { CvAuCfgTipoRoutes } from './cvAuCfgTipo/cvAuCfgTipo.routes';

import { CvCdoComparendoRoutes } from './cvCdoComparendo/cvCdoComparendo.routes';
import { CvCdoTrazabilidadRoutes } from './cvCdoTrazabilidad/cvCdoTrazabilidad.routes';
import { CvCdoNotificacionRoutes } from './cvCdoNotificacion/cvCdoNotificacion.routes';
import { CvCdoCfgDescuentoRoutes } from './cvCdoCfgDescuento/cvCdoCfgDescuento.routes';
import { CvCdoCfgInteresRoutes } from './cvCdoCfgInteres/cvCdoCfgInteres.routes';
import { CvCdoCfgEstadoRoutes } from './cvCdoCfgEstado/cvCdoCfgEstado.routes';
import { CvRestriccionRoutes } from './cvRestriccion/cvRestriccion.routes';
import { CvCfgInteresRoutes } from './cvCfgInteres/cvCfgInteres.routes';
import { CvCfgPorcentajeInicialRoutes } from './cvCfgPorcentajeInicial/cvCfgPorcentajeInicial.routes';
import { CvLcCfgMotivoRoutes } from './cvLcCfgMotivo/cvLcCfgMotivo.routes';

import { SvIpatRoutes } from './svIpat/svIpat.routes';
import { SvCfgSenialUnidadMedidaRoutes } from './svCfgSenialUnidadMedida/svCfgSenialUnidadMedida.routes';
import { SvCfgSenialTipoRoutes } from './svCfgSenialTipo/svCfgSenialTipo.routes';
import { SvCfgSenialColorRoutes } from './svCfgSenialColor/svCfgSenialColor.routes';
import { SvCfgSenialEstadoRoutes } from './svCfgSenialEstado/svCfgSenialEstado.routes';
import { SvCfgSenialLineaRoutes } from './svCfgSenialLinea/svCfgSenialLinea.routes';
import { SvCfgSenialProveedorRoutes } from './svCfgSenialProveedor/svCfgSenialProveedor.routes';
import { SvCfgSenialRoutes } from './svCfgSenial/svCfgSenial.routes';
import { SvSenialInventarioRoutes } from './svSenialInventario/svSenialInventario.routes';
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
import { SvCfgGravedadAccidenteRoutes } from './svCfgGravedadAccidente/svCfgGravedadAccidente.routes';
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

import { FroInfraccionRoutes } from './froInfraccion/froInfraccion.routes';
import { FroInfrCfgCategoriaRoutes } from './froInfrCfgCategoria/froInfrCfgCategoria.routes';

import { PqoCfgTarifaRoutes } from './pqoCfgTarifa/pqoCfgTarifa.routes';
import { PqoCfgPatioRoutes } from './pqoCfgPatio/pqoCfgPatio.routes';
import { PqoCfgGruaRoutes } from './pqoCfgGrua/pqoCfgGrua.routes';
import { PqoGruaCiudadanoRoutes } from './pqoGruaCiudadano/pqoGruaCiudadano.routes';
import { PqoInmovilizacionRoutes } from './pqoInmovilizacion/pqoInmovilizacion.routes';

import { PnalCfgCdoConsecutivoRoutes } from './pnalCfgCdoConsecutivo/pnalCfgCdoConsecutivo.routes';
import { PnalCfgCargoRoutes } from './pnalCfgCargo/pnalCfgCargo.routes';
import { PnalCfgTipoNombramientoRoutes } from './pnalCfgTipoNombramiento/pnalCfgTipoNombramiento.routes';
import { PnalFuncionarioRoutes } from './pnalFuncionario/pnalFuncionario.routes';

import { BancoRoutes } from './banco/banco.routes';
import { registroEntregaProductoRoutes } from './registroEntregaProducto/registroEntregaProducto.routes';

import { CfgCargoRoutes } from './cfgCargo/cfgCargo.routes';

import { PnalTalonarioRoutes } from './pnalTalonario/pnalTalonario.routes';
import { PnalAsignacionRoutes } from './pnalAsignacion/pnalAsignacion.routes';

import { GestionTransportePublicoRoutes } from './gestionTransportePublico/gestionTransportePublico.routes';

import { VhloTpConvenioRoutes } from './vhloTpConvenio/vhloTpConvenio.routes';
import { RpcccInventarioDocumentalRoutes } from './rpcccInventarioDocumental/rpcccInventarioDocumental.routes';
import { RnrsPreasignacionPlacaRoutes } from './rnrsPreasignacionPlaca/rnrsPreasignacionPlaca.routes';

// import { SucursalRoutes } from './empresa/sucursal/sucursal.routes';

import { SvIpatTalonarioRoutes } from './svIpatTalonario/svIpatTalonario.routes';
import { SvIpatConsecutivoRoutes } from './svIpatConsecutivo/svIpatConsecutivo.routes';
import { SvIpatAsignacionRoutes } from './svIpatAsignacion/svIpatAsignacion.routes';
import { SvIpatImpresoBodegaRoutes } from './svIpatImpresoBodega/svIpatImpresoBodega.routes';
import { SvIpatImpresoAsignacionRoutes } from './svIpatImpresoAsignacion/svIpatImpresoAsignacion.routes';
import { SvIpatImpresoMunicipioRoutes } from './svIpatImpresoMunicipio/svIpatImpresoMunicipio.routes';

import { rnaRegistroInsumosRoutes } from './rnaRegistroInsumos/rnaRegistroInsumos.routes';
//import { RnaPreasignacionInsumoRoutes } from './rnaPreasignacionInsumo/rnaPreasignacionInsumo.routes';
import { RnmaPreregistroRoutes } from './rnmaPreregistro/rnmaPreregistro.routes'; 

import { SvCfgClaseAccidenteRoutes } from './svCfgClaseAccidente/svCfgClaseAccidente.routes';
import { CfgChoqueConRoutes } from './cfgChoqueCon/cfgChoqueCon.routes';
import { SvCfgObjetoFijoRoutes } from './svCfgObjetoFijo/svCfgObjetoFijo.routes';
import { RnrsPreregistroRoutes } from './rnrsPreregistro/rnrsPreregistro.routes';
import { ReporteRoutes } from './reporte/reporte.routes';
import { RnaCertificadoTradicionRoutes } from './rnaCertificadoTradicionOficial/rnaCertificadoTradicionOficial.routes';
import { CvCfgTipoRestriccionRoutes } from './cvCfgTipoRestriccion/cvCfgTipoRestriccion.routes';
import { CvLcCfgTipoRestriccionRoutes } from './cvLcCfgTipoRestriccion/cvLcCfgTipoRestriccion.routes';
import { CvCfgTipoMedidaCautelarRoutes } from './cvCfgTipoMedidaCautelar/cvCfgTipoMedidaCautelar.routes';
import { CvMedidaCautelarRoutes } from './cvMedidaCautelar/cvMedidaCautelar.routes';

import { ImoBusquedaRoutes } from './imoBusqueda/imoBusqueda.routes';
import { ImoCfgTipoRoutes } from './imoCfgTipo/imoCfgTipo.routes';
import { ImoLoteRoutes } from "./imoLote/imoLote.routes";
import { ImoAsignacionRoutes} from './imoAsignacion/imoAsignacion.routes';
import { ImoReasignacionRoutes } from './imoReasignacIon/imoReasignacion.routes';
import { ImoActaRoutes } from './imoActa/imoActa.routes';

import { BpCfgTipoInsumoRoutes } from './bpCfgTipoInsumo/bpCfgTipoInsumo.routes';
import { BpProyectoRoutes } from './bpProyecto/bpProyecto.routes';
import { BpCdpRoutes } from './bpCdp/bpCdp.routes';

import { FroFacturaRoutes } from './froFactura/froFactura.routes';
import { FroRecaudoRoutes } from './froRecaudo/froRecaudo.routes';
import { FroAcuerdoPagoRoutes } from './froAcuerdoPago/froAcuerdoPago.routes';
import { FroTramiteRoutes } from './froTramite/froTramite.routes';
import { FroTrteCfgConceptoRoutes } from './froTrteCfgConcepto/froTrteCfgConcepto.routes';
import { FroTrtePrecioRoutes } from './froTrtePrecio/froTrtePrecio.routes';
import { FroTrteSolicitudRoutes } from './froTrteSolicitud/froTrteSolicitud.routes';
import { FroReporteIngresosRoutes } from './froReporteIngresos/froReporteIngresos.routes';
import { FroCfgTipoRecaudoRoutes } from './froCfgTipoRecaudo/froCfgTipoRecaudo.routes';
import { FroFacTramiteRoutes } from './froFacTramite/froFacTramite.routes';
import { FroTrteCfgCuentaRoutes } from './froTrteCfgCuenta/froTrteCfgCuenta.routes';

import { VhloRnaPreregistroRoutes } from './vhloRnaPreregistro/vhloRnaPreregistro.routes';
import { VhloCfgMarcaRoutes } from './vhloCfgMarca/vhloCfgMarca.routes';
import { VhloCfgLineaRoutes } from './vhloCfgLinea/vhloCfgLinea.routes';
import { VhloCfgClaseRoutes } from './vhloCfgClase/vhloCfgClase.routes';
import { VhloCfgColorRoutes } from './vhloCfgColor/vhloCfgColor.routes';
import { VhloCfgCombustibleRoutes } from './vhloCfgCombustible/vhloCfgCombustible.routes';
import { VhloCfgServicioRoutes } from './vhloCfgServicio/vhloCfgServicio.routes';
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
import { VhloBuscarRoutes } from './vhloBuscar/vhloBuscar.routes';
import { VhloVehiculoRoutes } from './vhloVehiculo/vhloVehiculo.routes';
import { VhloPropietarioRoutes } from './vhloPropietario/vhloPropietario.routes';
import { VhloCfgCarroceriaRoutes } from './vhloCfgCarroceria/vhloCfgCarroceria.routes';
import { VhloCfgPlacaRoutes } from './vhloCfgPlaca/vhloCfgPlaca.routes';
import { VhloRnaPreasignacionPlacaRoutes } from './vhloRnaPreasignacionPlaca/vhloRnaPreasignacionPlaca.routes';
import { VhloCfgLimitacionTipoRoutes } from './vhloCfgLimitacionTipo/vhloCfgLimitacionTipo.routes';
import { VhloCfgLimitacionTipoProcesoRoutes } from './vhloCfgLimitacionTipoProceso/vhloCfgLimitacionTipoProceso.routes';
import { VhloLimitacionRoutes } from './vhloLimitacion/vhloLimitacion.routes';
import { VhloCfgValorRoutes } from './vhloCfgValor/vhloCfgValor.routes';
import { VhloCfgLimitacionCausalRoutes } from './vhloCfgLimitacionCausal/vhloCfgLimitacionCausal.routes';
import { VhloTecnoMecanicaRoutes } from './vhloTecnoMecanica/vhloTecnoMecanica.routes';
import { VhloSoatRoutes } from './vhloSoat/vhloSoat.routes';

import { CfgPaisRoutes } from './cfgPais/cfgPais.routes';
import { CfgDepartamentoRoutes } from './cfgDepartamento/cfgDepartamento.routes';
import { CfgMunicipioRoutes } from './cfgMunicipio/cfgMunicipio.routes';
import { CfgTipoInfractorRoutes } from './cfgTipoInfractor/cfgTipoInfractor.routes';
import { CfgAdmFormatoRoutes } from './cfgAdmFormato/cfgAdmFormato.routes';
import { CfgAdmFormatoTipoRoutes } from './cfgAdmFormatoTipo/cfgAdmFormatoTipo.routes';
import { CfgAuditoriaRoutes } from './cfgAuditoria/cfgAuditoria.routes';
import { CfgSmlmvRoutes } from './cfgSmlmv/cfgSmlmv.routes';
import { CfgModuloRoutes } from './cfgModulo/cfgModulo.routes';
import { CfgOrganismoTransitoRoutes } from './cfgOrganismoTransito/cfgOrganismoTransito.routes';
import { CfgEntidadJudicialRoutes } from './cfgEntidadJudicial/cfgEntidadJudicial.routes';
import { cfgFestivoRoutes } from './cfgFestivo/cfgFestivo.routes';

//import { MsvTCAsignacionRoutes } from './msvTCAsignacion/msvTCAsignacion.routes';

//import { MsvSenialInventarioRoutes } from './msvSenialInventario/msvSenialInventario.routes';
//import { MsvSenialRoutes } from './msvSenial/msvSenial.routes';
//import { RnaCertificadoTradicionRoutes } from './rnaCertificadoTradicionOficial/rnaCertificadoTradicionOficial.routes';
import { DashboardComponent } from '.';
import { CfgOrganismoTransito } from './cfgOrganismoTransito/cfgOrganismoTransito.modelo';

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
      ...UserLicenciaConduccionRoutes,
      ...UserLicenciaTransitoRoutes,
      ...UserCfgEmpresaTipoRoutes,
      ...UserCfgEmpresaServicioRoutes,
      ...UserLcCfgCategoriaRoutes,
      ...UserMedidaCautelarRoutes,
      ...UserCfgGrupoEtnicoRoutes,
      ...HomeRoutes,
      ...BancoRoutes,
      ...VhloRnaPreregistroRoutes,
      ...VhloCfgLimitacionCausalRoutes,
      ...VhloCfgLimitacionTipoRoutes,
      ...VhloCfgLimitacionTipoProcesoRoutes,
      ...VhloBuscarRoutes,
      ...VhloVehiculoRoutes,
      ...VhloPropietarioRoutes,
      ...VhloCfgCarroceriaRoutes,
      ...VhloCfgPlacaRoutes,
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
      ...VhloRnaPreasignacionPlacaRoutes,
      ...VhloCfgMarcaRoutes,
      ...VhloCfgLineaRoutes,
      ...VhloCfgClaseRoutes,
      ...VhloCfgColorRoutes,
      ...VhloCfgCombustibleRoutes,
      ...VhloCfgServicioRoutes,
      ...VhloLimitacionRoutes,
      ...VhloCfgValorRoutes,
      ...VhloTecnoMecanicaRoutes,
      ...VhloSoatRoutes,
      ...CfgPaisRoutes,
      ...CfgDepartamentoRoutes,
      ...CfgMunicipioRoutes,
      ...CfgAuditoriaRoutes,
      ...CfgSmlmvRoutes,
      ...cfgFestivoRoutes,
      ...CfgTipoClaseRoutes,
      ...CfgModuloRoutes,
      ...PnalCfgCdoConsecutivoRoutes,
      ...PnalCfgCargoRoutes,
      ...PnalCfgTipoNombramientoRoutes,
      ...PnalFuncionarioRoutes,
      ...CfgCargoRoutes,
      ...CfgTipoInfractorRoutes,
      ...CfgAdmFormatoRoutes,
      ...CfgAdmFormatoTipoRoutes,
      ...registroEntregaProductoRoutes,
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
      ...FroInfraccionRoutes,
      ...FroInfrCfgCategoriaRoutes,
      ...PqoCfgTarifaRoutes,
      ...PqoCfgPatioRoutes,
      ...PqoCfgGruaRoutes,
      ...PqoGruaCiudadanoRoutes,
      ...PqoInmovilizacionRoutes,
      ...PnalTalonarioRoutes,
      ...PnalAsignacionRoutes,
      ...FroTrteSolicitudRoutes,
      ...FroFacTramiteRoutes,
      ...FroTrteCfgCuentaRoutes,
      ...CvCdoComparendoRoutes,
      ...CvCdoTrazabilidadRoutes,
      ...CvCdoNotificacionRoutes,
      ...CvCdoCfgDescuentoRoutes,
      ...CvCdoCfgInteresRoutes,
      ...CvCdoCfgEstadoRoutes,
      ...CvAudienciaRoutes,
      ...CvAuCfgAtencionRoutes,
      ...CvAuCfgHorarioRoutes,
      ...CvAuCfgTipoRoutes,
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
      ...SvCfgClaseAccidenteRoutes,
      ...SvSenialInventarioRoutes,
      ...CvCfgTipoRestriccionRoutes,
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
      ...SvCfgGravedadAccidenteRoutes,
      ...GestionTransportePublicoRoutes,
      ...rnaRegistroInsumosRoutes,
      ...CfgOrganismoTransitoRoutes,
      ...CfgEntidadJudicialRoutes,
      ...CfgChoqueConRoutes,
      ...SvCfgObjetoFijoRoutes,
      ...SvIpatTalonarioRoutes,
      ...SvIpatConsecutivoRoutes,
      ...SvIpatAsignacionRoutes,
      ...SvIpatImpresoBodegaRoutes,
      ...SvIpatImpresoAsignacionRoutes,
      ...SvIpatImpresoMunicipioRoutes,
      ...SvIpatRoutes,
      ...RnmaPreregistroRoutes,
      ...CfgValorVehiculoRoutes,
      ...RnrsPreregistroRoutes,
      ...ReporteRoutes,
      ...RpcccInventarioDocumentalRoutes,
      ...ImoBusquedaRoutes,
      ...ImoAsignacionRoutes,
      ...ImoCfgTipoRoutes,
      ...ImoLoteRoutes,
      ...ImoReasignacionRoutes,
      ...ImoActaRoutes,
      ...RnaCertificadoTradicionRoutes,
      ...CvCfgTipoMedidaCautelarRoutes,
      ...CvMedidaCautelarRoutes,
      ...BpCfgTipoInsumoRoutes,
      ...BpProyectoRoutes,
      ...BpCdpRoutes,
      ...RnrsPreasignacionPlacaRoutes,
      ...VhloTpConvenioRoutes,
      ...FroFacturaRoutes,
      ...FroRecaudoRoutes,
      ...FroAcuerdoPagoRoutes,
      ...FroTramiteRoutes,
      ...FroTrteCfgConceptoRoutes,
      ...FroTrtePrecioRoutes,
      ...FroReporteIngresosRoutes,
      ...FroCfgTipoRecaudoRoutes
    ]
  }
];
