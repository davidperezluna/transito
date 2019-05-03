import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { ToolTipModule } from 'angular2-tooltip'

import { UserEmpresaModule } from './userEmpresa/userEmpresa.module';
import { UserCiudadanoModule } from './userCiudadano/userCiudadano.module';
import { UserCfgTipoIdentificacionModule } from './userCfgTipoIdentificacion/userCfgTipoIdentificacion.module';
import { UserCfgGeneroModule } from './userCfgGenero/userCfgGenero.module';
import { UserCfgGrupoSanguineoModule } from './userCfgGrupoSanguineo/userCfgGrupoSanguineo.module';
import { UserCfgMenuModule } from './userCfgMenu/userCfgMenu.module';
import { UserCfgRoleModule } from './userCfgRole/userCfgRole.module';
import { UserUsuarioMenuModule } from './userUsuarioMenu/userUsuarioMenu.module';
import { UserCfgGrupoEtnicoModule } from './userCfgGrupoEtnico/userCfgGrupoEtnico.module';

import { HomeModule } from './home/home.module';
import { VhloCfgMarcaModule } from './vhloCfgMarca/vhloCfgMarca.module';
import { VhloCfgLineaModule } from './vhloCfgLinea/vhloCfgLinea.module';
import { BancoModule } from './banco/banco.module';
import { VhloCfgClaseModule } from './vhloCfgClase/vhloCfgClase.module';
import { VhloCfgColorModule } from './vhloCfgColor/vhloCfgColor.module';
import { ConpetoParametroModule } from './conceptoParametro/conceptoParametro.module';
import { VhloCfgCombustibleModule } from './vhloCfgCombustible/vhloCfgCombustible.module';
import { ConsumibleModule } from './consumible/consumible.module';
import { VhloCfgServicioModule } from './vhloCfgServicio/vhloCfgServicio.module';
import { TramiteModule } from './tramite/tramite.module'; 
import { CfgTipoInfractorModule } from './cfgTipoInfractor/cfgTipoInfractor.module';
import { RpcccInventarioDocumentalModule } from './rpcccInventarioDocumental/rpcccInventarioDocumental.module';

import { CfgPaisModule } from './cfgPais/cfgPais.module';
import { CfgDepartamentoModule } from './cfgDepartamento/cfgDepartamento.module';
import { CfgMunicipioModule } from './cfgMunicipio/cfgMunicipio.module';
import { CfgAdmFormatoModule } from './cfgAdmFormato/cfgAdmFormato.module';
import { CfgAdmFormatoTipoModule } from './cfgAdmFormatoTipo/cfgAdmFormatoTipo.module';
import { CfgModuloModule } from './cfgModulo/cfgModulo.module';

import { CfgBodegaModule } from './cfgBodega/cfgBodega.module';
import { SvCfgSenialUnidadMedidaModule } from './svCfgSenialUnidadMedida/svCfgSenialUnidadMedida.module';
import { SvCfgSenialTipoModule } from './svCfgSenialTipo/svCfgSenialTipo.module';
import { SvCfgSenialColorModule } from './svCfgSenialColor/svCfgSenialColor.module';
import { SvCfgSenialEstadoModule } from './svCfgSenialEstado/svCfgSenialEstado.module';
import { SvCfgSenialLineaModule } from './svCfgSenialLinea/svCfgSenialLinea.module';
import { SvCfgSenialProveedorModule } from './svCfgSenialProveedor/svCfgSenialProveedor.module';
import { SvCfgSenialModule } from './svCfgSenial/svCfgSenial.module';
import { SvSenialInventarioModule } from './svSenialInventario/svSenialInventario.module';

import { CvCdoComparendoModule } from './cvCdoComparendo/cvCdoComparendo.module';
import { CvCdoTrazabilidadModule } from './cvCdoTrazabilidad/cvCdoTrazabilidad.module';
import { CvCdoNotificacionModule } from './cvCdoNotificacion/cvCdoNotificacion.module';
import { CvCdoCfgInteresModule } from './cvCdoCfgInteres/cvCdoCfgInteres.module';
import { CvAudienciaModule } from './cvAudiencia/cvAudiencia.module';
import { CvAuCfgAtencionModule } from './cvAuCfgAtencion/cvAuCfgAtencion.module';
import { CvAuCfgHorarioModule } from './cvAuCfgHorario/cvAuCfgHorario.module';

import { CvLcCfgMotivoModule } from './cvLcCfgMotivo/cvLcCfgMotivo.module';
import { CvRestriccionModule } from './cvRestriccion/cvRestriccion.module';
import { CvCfgInteresModule } from './cvCfgInteres/cvCfgInteres.module';
import { CvCfgPorcentajeInicialModule } from './cvCfgPorcentajeInicial/cvCfgPorcentajeInicial.module';
import { CvCfgTipoRestriccionModule } from './cvCfgTipoRestriccion/cvCfgTipoRestriccion.module';
import { CvLcCfgTipoRestriccionModule } from './cvLcCfgTipoRestriccion/cvLcCfgTipoRestriccion.module';
import { CvCfgTipoMedidaCautelarModule } from './cvCfgTipoMedidaCautelar/cvCfgTipoMedidaCautelar.module';
import { CvMedidaCautelarModule } from './cvMedidaCautelar/cvMedidaCautelar.module';

import { VhloCfgTipoVehiculoModule } from './vhloCfgTipoVehiculo/vhloCfgTipoVehiculo.module';
import { VhloCfgTipoAlertaModule } from './vhloCfgTipoAlerta/vhloCfgTipoAlerta.module';
import { VhloCfgCdaModule } from './vhloCfgCda/vhloCfgCda.module';
import { VhloCfgOrigenRegistroModule } from './vhloCfgOrigenRegistro/vhloCfgOrigenRegistro.module';
import { VhloCfgModalidadTransporteModule } from './vhloCfgModalidadTransporte/vhloCfgModalidadTransporte.module';
import { VhloCfgRadioAccionModule } from './vhloCfgRadioAccion/vhloCfgRadioAccion.module';
import { VhloCfgTransportePasajeroModule } from './vhloCfgTransportePasajero/vhloCfgTransportePasajero.module';
import { VhloCfgTransporteEspecialModule } from './vhloCfgTransporteEspecial/vhloCfgTransporteEspecial.module';
import { VhloCfgEmpresaGpsModule } from './vhloCfgEmpresaGps/vhloCfgEmpresaGps.module';
import { VhloCfgTipoRodajeModule } from './vhloCfgTipoRodaje/vhloCfgTipoRodaje.module';
import { VhloCfgTipoCabinaModule } from './vhloCfgTipoCabina/vhloCfgTipoCabina.module';
import { VhloCfgTipoMaquinariaModule } from './vhloCfgTipoMaquinaria/vhloCfgTipoMaquinaria.module';
import { VhloCfgClaseMaquinariaModule } from './vhloCfgClaseMaquinaria/vhloCfgClaseMaquinaria.module';
import { VhloCfgSubpartidaArancelariaModule } from './vhloCfgSubpartidaArancelaria/vhloCfgSubpartidaArancelaria.module';
import { VhloCfgCondicionIngresoModule } from './vhloCfgCondicionIngreso/vhloCfgCondicionIngreso.module';
import { VhloPlacaSedeModule } from './vhloPlacaSede/vhloPlacaSede.module';
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

import { registroEntregaProductoModule } from './registroEntregaProducto/registroEntregaProducto.module';

import { UserLcCfgCategoriaModule } from './userLcCfgCategoria/userLcCfgCategoria.module';
import { UserLicenciaConduccionModule } from './userLicenciaConduccion/userLicenciaConduccion.module';
import { UserLicenciaTransitoModule } from './userLicenciaTransito/userLicenciaTransito.module';

import { CfgComparendoEstadoModule } from './cfgComparendoEstado/cfgComparendoEstado.module';
import { CfgAuditoriaModule } from './cfgAuditoria/cfgAuditoria.module';
import { CfgValorVehiculoModule } from './cfgValorVehiculo/cfgValorVehiculo.module'; 
import { VhloCfgValorModule } from './vhloCfgValor/vhloCfgValor.module'; 
import { CfgSmlmvModule } from './cfgSmlmv/cfgSmlmv.module';
import { cfgFestivoModule } from './cfgFestivo/cfgFestivo.module';
import { CfgTipoClaseModule } from './cfgTipoClase/cfgTipoClase.module';

import { MsvEvaluacionModule } from './msvEvaluacion/msvEvaluacion.module';
import { MsvCaracterizacionModule } from './msvCaracterizacion/msvCaracterizacion.module';
import { MsvCategoriaModule } from './msvCategoria/msvCategoria.module';
import { MsvVariableModule } from './msvVariable/msvVariable.module';
import { MsvParametroModule } from './msvParametro/msvParametro.module';
import { MsvCriterioModule } from './msvCriterio/msvCriterio.module';

import { SvIpatTalonarioModule } from './svIpatTalonario/svIpatTalonario.module';
import { SvIpatConsecutivoModule } from './svIpatConsecutivo/svIpatConsecutivo.module';
import { SvIpatAsignacionModule } from './svIpatAsignacion/svIpatAsignacion.module';
import { SvIpatImpresoBodegaModule } from './svIpatImpresoBodega/svIpatImpresoBodega.module';
import { SvIpatImpresoAsignacionModule } from './svIpatImpresoAsignacion/svIpatImpresoAsignacion.module';
import { SvIpatImpresoMunicipioModule } from './svIpatImpresoMunicipio/svIpatImpresoMunicipio.module';

import { PqoCfgPatioModule } from './pqoCfgPatio/pqoCfgPatio.module';
import { PqoCfgGruaModule } from './pqoCfgGrua/pqoCfgGrua.module';
import { PqoGruaCiudadanoModule } from './pqoGruaCiudadano/pqoGruaCiudadano.module';
import { PqoInmovilizacionModule } from './pqoInmovilizacion/pqoInmovilizacion.module';
import { MparqCostoTrayectoModule } from './mparqCostoTrayecto/mparqCostoTrayecto.module';

import { VhloBuscarModule } from './vhloBuscar/vhloBuscar.module';
import { VhloVehiculoModule } from './vhloVehiculo/vhloVehiculo.module';
import { VhloPropietarioModule } from './vhloPropietario/vhloPropietario.module';
import { VhloCfgCarroceriaModule } from './vhloCfgCarroceria/vhloCfgCarroceria.module';
import { VhloCfgPlacaModule } from './vhloCfgPlaca/vhloCfgPlaca.module';
import { VhloRnaPreasignacionPlacaModule } from './vhloRnaPreasignacionPlaca/vhloRnaPreasignacionPlaca.module';
import { VhloRnaTramiteInscripcionLimitacionModule } from './vhloRnaTramiteInscripcionLimitacion/vhloRnaTramiteInscripcionLimitacion.module';
import { VhloRnaTramiteLevantamientoLimitacionModule } from './vhloRnaTramiteLevantamientoLimitacion/vhloRnaTramiteLevantamientoLimitacion.module';
import { VhloCfgLimitacionCausalModule } from './vhloCfgLimitacionCausal/vhloCfgLimitacionCausal.module';
import { VhloCfgLimitacionTipoModule } from './vhloCfgLimitacionTipo/vhloCfgLimitacionTipo.module';

import { FacturaModule } from './factura/factura.module';
import { FacturaInfraccionModule } from './facturaInfraccion/facturaInfraccion.module';
import { TramiteFacturaModule } from './tramiteFactura/tramiteFactura.module';
import { RnmaTramiteInscripcionLimitacionModule } from './rnmaTramiteInscripcionLimitacion/rnmaTramiteInscripcionLimitacion.module';
import { RnmaTramiteLevantamientoLimitacionModule } from './rnmaTramiteLevantamientoLimitacion/rnmaTramiteLevantamientoLimitacion.module';
import { RnrsTramiteInscripcionLimitacionModule } from './rnrsTramiteInscripcionLimitacion/rnrsTramiteInscripcionLimitacion.module';
import { RnrsTramiteLevantamientoLimitacionModule } from './rnrsTramiteLevantamientoLimitacion/rnrsTramiteLevantamientoLimitacion.module';
import { SvIpatModule } from './svIpat/svIpat.module';

import { CfgOrganismoTransitoModule } from './cfgOrganismoTransito/cfgOrganismoTransito.module';
import { CfgTipoProcesoModule } from './vhloCfgLimitacionTipoProceso/vhloCfgLimitacionTipoProceso.module';
import { CfgEntidadJudicialModule } from './cfgEntidadJudicial/cfgEntidadJudicial.module';
import { SvCfgGravedadAccidenteModule } from './svCfgGravedadAccidente/svCfgGravedadAccidente.module';
import { SvCfgClaseAccidenteModule } from './svCfgClaseAccidente/svCfgClaseAccidente.module';
import { CfgChoqueConModule } from './cfgChoqueCon/cfgChoqueCon.module';
import { SvCfgObjetoFijoModule } from './svCfgObjetoFijo/svCfgObjetoFijo.module';

import { TpAlcaldiaModule } from './tpAlcaldia/tpAlcaldia.module';
// import { SucursalModule } from './empresa/sucursal/new/sucursal.module';
import { SustratoModule } from './sustrato/sustrato.module';
import { TramitePrecioModule } from './tramitePrecio/tramitePrecio.module';

import { GdDocumentoModule } from './gdDocumento/gdDocumento.module';
import { GdTrazabilidadModule } from './gdTrazabilidad/gdTrazabilidad.module';
import { GdCfgTipoCorrespondenciaModule } from './gdCfgTipoCorrespondencia/gdCfgTipoCorrespondencia.module';
import { GdCfgMedioCorrespondenciaModule } from './gdCfgMedioCorrespondencia/gdCfgMedioCorrespondencia.module';

import { FroInfraccionModule } from './froInfraccion/froInfraccion.module';
import { FroInfrCfgCategoriaModule } from './froInfrCfgCategoria/froInfrCfgCategoria.module';

import { PnalComparendoModule } from './pnalComparendo/pnalComparendo.module';
import { PnalCfgCargoModule } from './pnalCfgCargo/pnalCfgCargo.module';
import { PnalCfgTipoNombramientoModule } from './pnalCfgTipoNombramiento/pnalCfgTipoNombramiento.module';
import { PnalFuncionarioModule } from './pnalFuncionario/pnalFuncionario.module';
import { PnalTalonarioModule } from './pnalTalonario/pnalTalonario.module';
import { PnalAsignacionModule } from './pnalAsignacion/pnalAsignacion.module';

import { CfgCargoModule } from './cfgCargo/cfgCargo.module';

import { ImoPreasignacionModule } from './imoPreasignacIon/imoPreasignacion.module';
import { ImoActaModule } from './imoActa/imoActa.module';
import { ImoAsignacionModule } from './imoAsignacion/imoAsignacion.module';
import { ImoCfgTipoModule } from './imoCfgTipo/imoCfgTipo.module';
import { ImoBusquedaModule } from './imoBusqueda/imoBusqueda.module';
import { ImoLoteModule } from "./imoLote/imoLote.module";


import { RnrsPreasignacionPlacaModule } from './rnrsPreasignacionPlaca/rnrsPreasignacionPlaca.module';
import { RnaPreregistroModule } from './rnaPreregistro/RnaPreregistro.module';

import { FroTrteSolicitudRncModule } from './froTrteSolicitudRnc/froTrteSolicitudRnc.module';
import { FroFacTramiteModule } from './froFacTramite/froFacTramite.module';
import { FroTrteCfgCuentaModule } from './froTrteCfgCuenta/froTrteCfgCuenta.module';

import { GestionTransportePublicoModule } from './gestionTransportePublico/gestionTransportePublico.module';
import { rnaRegistroInsumosModule } from './rnaRegistroInsumos/rnaRegistroInsumos.module';
//import { RnaPreasignacionInsumoModule } from './rnaPreasignacIonInsumo/rnaPreasignacionInsumo.module';
import { RnmaPreregistroModule } from './rnmaPreregistro/rnmaPreregistro.module';
import { RnrsPreregistroModule } from './rnrsPreregistro/rnrsPreregistro.module';
import { ReporteModule } from './reporte/reporte.module';
import { RnaCertificadoTradicionOficialModule } from './rnaCertificadoTradicionOficial/rnaCertificadoTradicionOficial.module';

import { BpCfgTipoInsumoModule } from './bpCfgTipoInsumo/bpCfgTipoInsumo.module';
import { BpProyectoModule } from './bpProyecto/bpProyecto.module';

import { FroFacturaModule } from './froFactura/froFactura.module';
import { FroRecaudoModule } from './froRecaudo/froRecaudo.module';
import { FroTramiteModule } from './froTramite/froTramite.module';
import { FroTrteCfgConceptoModule } from './froTrteCfgConcepto/froTrteCfgConcepto.module';
import { FroTrtePrecioModule } from './froTrtePrecio/froTrtePrecio.module';
import { FroTrteSolicitudRnaModule } from './froTrteSolicitudRna/froTrteSolicitudRna.module';
import { FroTrteSolicitudRnmaModule } from './froTrteSolicitudRnma/froTrteSolicitudRnma.module';
import { FroTrteSolicitudRnrsModule } from './froTrteSolicitudRnrs/froTrteSolicitudRnrs.module';
import { FroReporteIngresosModule } from './froReporteIngresos/froReporteIngresos.module';
import { FroCfgTipoRecaudoModule } from './froCfgTipoRecaudo/froCfgTipoRecaudo.module';
import { FroAcuerdoPagoModule } from './froAcuerdoPago/froAcuerdoPago.module';

import { BpCdpModule } from './bpCdp/bpCdp.module';

import { UserCfgEmpresaTipoModule } from './userCfgEmpresaTipo/userCfgEmpresaTipo.module';
import { UserCfgEmpresaServicioModule } from './userCfgEmpresaServicio/userCfgEmpresaServicio.module';

import { DashboardComponent } from './dashboard.component'; 

import {TopNavComponent} from '../shared';
import {SidebarComponent} from '../shared';
import {FooterComponent} from '../shared';
import {RightsidebarComponent} from '../shared';



@NgModule({
  imports: [
    CvLcCfgTipoRestriccionModule,
    ConpetoParametroModule,
    CommonModule,
    RouterModule,
    Ng2BootstrapModule.forRoot(),
    ToolTipModule,
    UserEmpresaModule,
    UserCiudadanoModule,
    UserCfgTipoIdentificacionModule,
    UserCfgGeneroModule,
    UserCfgGrupoSanguineoModule,
    UserCfgMenuModule,
    UserCfgRoleModule,
    UserUsuarioMenuModule,
    UserLicenciaConduccionModule,
    UserLicenciaTransitoModule,
    UserCfgGrupoEtnicoModule,
    HomeModule,
    VhloCfgMarcaModule,
    VhloCfgLineaModule,
    VhloCfgValorModule,
    BancoModule,
    VhloCfgClaseModule,
    VhloCfgColorModule,
    VhloCfgCombustibleModule,
    ConsumibleModule,
    VhloCfgServicioModule,
    TramiteModule,
    CfgPaisModule,
    CfgDepartamentoModule,
    CfgMunicipioModule,
    CfgModuloModule,
    CfgTipoInfractorModule,
    CfgAuditoriaModule,
    CfgSmlmvModule,
    cfgFestivoModule,
    CfgTipoClaseModule,
    UserLcCfgCategoriaModule,
    SvCapacitacionModule,
    SvIpatTalonarioModule,
    SvIpatConsecutivoModule,
    SvIpatAsignacionModule,
    SvIpatImpresoBodegaModule,
    SvIpatImpresoAsignacionModule,
    SvIpatImpresoMunicipioModule,
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
    SvCfgClaseAccidenteModule,
    
    MsvEvaluacionModule,
    MsvCaracterizacionModule,
    MsvCategoriaModule,
    MsvVariableModule,
    MsvParametroModule,
    MsvCriterioModule,

    GdDocumentoModule,
    GdTrazabilidadModule,
    GdCfgTipoCorrespondenciaModule,
    GdCfgMedioCorrespondenciaModule,
    FroInfraccionModule,
    FroInfrCfgCategoriaModule,
    PqoCfgPatioModule,
    PqoCfgGruaModule,
    PqoGruaCiudadanoModule,
    PqoInmovilizacionModule,
    MparqCostoTrayectoModule,
    PnalComparendoModule,
    PnalCfgCargoModule,
    PnalCfgTipoNombramientoModule,
    PnalFuncionarioModule,
    CfgCargoModule,
    PnalTalonarioModule,
    PnalAsignacionModule,
    FroTrteSolicitudRncModule,
    FroFacTramiteModule,
    FroTrteCfgCuentaModule,
    VhloBuscarModule,
    VhloVehiculoModule,
    VhloPropietarioModule,
    VhloCfgCarroceriaModule,
    CfgAdmFormatoModule,
    CfgAdmFormatoTipoModule,
    CfgBodegaModule,
    SvCfgSenialUnidadMedidaModule,
    SvCfgSenialTipoModule,
    SvCfgSenialColorModule,
    SvCfgSenialEstadoModule,
    SvCfgSenialLineaModule,
    SvCfgSenialProveedorModule,
    SvCfgSenialModule,
    SvSenialInventarioModule,
    SvCfgGravedadAccidenteModule,
    CvCdoComparendoModule,
    CvCdoTrazabilidadModule,
    CvCdoNotificacionModule,
    CvCdoCfgInteresModule,
    CvAudienciaModule,
    CvAuCfgAtencionModule,
    CvAuCfgHorarioModule,
    CvLcCfgMotivoModule,
    CvRestriccionModule,
    CvCfgInteresModule,
    CvCfgPorcentajeInicialModule,
    VhloCfgTipoVehiculoModule,
    VhloCfgTipoAlertaModule,
    VhloCfgCdaModule,
    VhloCfgOrigenRegistroModule,
    VhloCfgModalidadTransporteModule,
    VhloCfgRadioAccionModule,
    VhloCfgTransportePasajeroModule,
    VhloCfgTransporteEspecialModule,
    VhloCfgEmpresaGpsModule,
    VhloCfgTipoRodajeModule,
    VhloCfgTipoCabinaModule,
    VhloCfgTipoMaquinariaModule,
    VhloCfgClaseMaquinariaModule,
    VhloCfgSubpartidaArancelariaModule,
    VhloCfgCondicionIngresoModule,
    VhloPlacaSedeModule,
    VhloCfgPlacaModule,
    VhloRnaPreasignacionPlacaModule,
    VhloRnaTramiteInscripcionLimitacionModule,
    VhloRnaTramiteLevantamientoLimitacionModule,
    VehiculoTecnoMecanicaModule,
    SoatModule,
    CfgComparendoEstadoModule,
    FacturaModule,
    TramiteFacturaModule,
    SustratoModule,
    GestionTransportePublicoModule,
    CvCfgTipoRestriccionModule,
    TramitePrecioModule,
    RnaPreregistroModule,
    CfgOrganismoTransitoModule,
    CfgChoqueConModule,
    SvCfgObjetoFijoModule,
    CfgEntidadJudicialModule,
    VhloCfgLimitacionCausalModule,
    VhloCfgLimitacionTipoModule,
    rnaRegistroInsumosModule,
    RnmaPreregistroModule,
    CfgTipoProcesoModule,
    RnmaTramiteInscripcionLimitacionModule,
    RnmaTramiteLevantamientoLimitacionModule,
    RnrsTramiteInscripcionLimitacionModule,
    RnrsTramiteLevantamientoLimitacionModule,
    SvIpatModule,
    CfgValorVehiculoModule,
    RnrsPreregistroModule,
    ReporteModule,
    registroEntregaProductoModule,
    RpcccInventarioDocumentalModule,
    FacturaInfraccionModule,
    UserCfgEmpresaTipoModule,
    UserCfgEmpresaServicioModule,
    RnaCertificadoTradicionOficialModule,
    ImoPreasignacionModule,
    ImoBusquedaModule,
    ImoAsignacionModule,
    ImoCfgTipoModule,
    ImoActaModule,
    ImoLoteModule,
    CvCfgTipoMedidaCautelarModule,
    CvMedidaCautelarModule,
    BpCfgTipoInsumoModule,
    BpProyectoModule,
    BpCdpModule,
    RnrsPreasignacionPlacaModule,
    TpAlcaldiaModule,
    FroFacturaModule,
    FroRecaudoModule,
    FroAcuerdoPagoModule,
    FroTramiteModule,
    FroTrteCfgConceptoModule,
    FroTrtePrecioModule,
    FroTrteSolicitudRnaModule, 
    FroTrteSolicitudRnmaModule,
    FroTrteSolicitudRnrsModule,
    FroReporteIngresosModule,
    FroCfgTipoRecaudoModule,
  ],
  declarations: [DashboardComponent, TopNavComponent, SidebarComponent, FooterComponent, RightsidebarComponent],
  exports: [DashboardComponent, TopNavComponent, SidebarComponent, FooterComponent, RightsidebarComponent],
  providers: [],
})

export class DashboardModule { }
