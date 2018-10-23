"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var router_1 = require("@angular/router");
var ng2_bootstrap_1 = require("ng2-bootstrap");
var userCfgMenu_module_1 = require("./userCfgMenu/userCfgMenu.module");
var userCfgRole_module_1 = require("./userCfgRole/userCfgRole.module");
var home_module_1 = require("./home/home.module");
var vehiculo_module_1 = require("./vehiculo/vehiculo.module");
var marca_module_1 = require("./marca/marca.module");
var linea_module_1 = require("./linea/linea.module");
var banco_module_1 = require("./banco/banco.module");
var clase_module_1 = require("./clase/clase.module");
var color_module_1 = require("./color/color.module");
var conceptoParametro_module_1 = require("./conceptoParametro/conceptoParametro.module");
var combustible_module_1 = require("./combustible/combustible.module");
var consumible_module_1 = require("./consumible/consumible.module");
var modalidad_module_1 = require("./modalidad/modalidad.module");
var pais_module_1 = require("./pais/pais.module");
var departamento_module_1 = require("./departamento/departamento.module");
var municipio_module_1 = require("./municipio/municipio.module");
var organismoTransito_module_1 = require("./organismoTransito/organismoTransito.module");
var servicio_module_1 = require("./servicio/servicio.module");
var modulo_module_1 = require("./modulo/modulo.module");
var tramite_module_1 = require("./tramite/tramite.module");
var almacen_module_1 = require("./almacen/almacen.module");
var cfgTipoInfractor_module_1 = require("./cfgTipoInfractor/cfgTipoInfractor.module");
var rpcccInventarioDocumental_module_1 = require("./rpcccInventarioDocumental/rpcccInventarioDocumental.module");
var cfgAdmFormatoTipo_module_1 = require("./cfgAdmFormatoTipo/cfgAdmFormatoTipo.module");
var cfgBodega_module_1 = require("./cfgBodega/cfgBodega.module");
var cfgSvConector_module_1 = require("./cfgSvConector/cfgSvConector.module");
var cfgSvSenialTipo_module_1 = require("./cfgSvSenialTipo/cfgSvSenialTipo.module");
var cfgSvSenialColor_module_1 = require("./cfgSvSenialColor/cfgSvSenialColor.module");
var cfgSvSenialEstado_module_1 = require("./cfgSvSenialEstado/cfgSvSenialEstado.module");
var cfgSvUnidadMedida_module_1 = require("./cfgSvUnidadMedida/cfgSvUnidadMedida.module");
var cvCfgInteres_module_1 = require("./cvCfgInteres/cvCfgInteres.module");
var cvCfgPorcentajeInicial_module_1 = require("./cvCfgPorcentajeInicial/cvCfgPorcentajeInicial.module");
var cvAcuerdoPago_module_1 = require("./cvAcuerdoPago/cvAcuerdoPago.module");
var cvCfgTipoRestriccion_module_1 = require("./cvCfgTipoRestriccion/cvCfgTipoRestriccion.module");
var vhloCfgCda_module_1 = require("./vhloCfgCda/vhloCfgCda.module");
var vhloCfgOrigenRegistro_module_1 = require("./vhloCfgOrigenRegistro/vhloCfgOrigenRegistro.module");
var vhloCfgEmpresaGps_module_1 = require("./vhloCfgEmpresaGps/vhloCfgEmpresaGps.module");
var vhloCfgTipoRodaje_module_1 = require("./vhloCfgTipoRodaje/vhloCfgTipoRodaje.module");
var vhloCfgTipoCabina_module_1 = require("./vhloCfgTipoCabina/vhloCfgTipoCabina.module");
var vhloCfgTipoMaquinaria_module_1 = require("./vhloCfgTipoMaquinaria/vhloCfgTipoMaquinaria.module");
var vhloCfgClaseMaquinaria_module_1 = require("./vhloCfgClaseMaquinaria/vhloCfgClaseMaquinaria.module");
var vhloCfgSubpartidaArancelaria_module_1 = require("./vhloCfgSubpartidaArancelaria/vhloCfgSubpartidaArancelaria.module");
var vhloCfgCondicionIngreso_module_1 = require("./vhloCfgCondicionIngreso/vhloCfgCondicionIngreso.module");
var vehiculoTecnoMecanica_module_1 = require("./vehiculoTecnoMecanica/vehiculoTecnoMecanica.module");
var soat_module_1 = require("./soat/soat.module");
var svCapacitacion_module_1 = require("./svCapacitacion/svCapacitacion.module");
var svCfgFuncion_module_1 = require("./svCfgFuncion/svCfgFuncion.module");
var svCfgFuncionCriterio_module_1 = require("./svCfgFuncionCriterio/svCfgFuncionCriterio.module");
var svCfgArea_module_1 = require("./svCfgArea/svCfgArea.module");
var svCfgTipoArea_module_1 = require("./svCfgTipoArea/svCfgTipoArea.module");
var svCfgAseguradora_module_1 = require("./svCfgAseguradora/svCfgAseguradora.module");
var svCfgCalzadaCarril_module_1 = require("./svCfgCalzadaCarril/svCfgCalzadaCarril.module");
var svCfgCardinalidad_module_1 = require("./svCfgCardinalidad/svCfgCardinalidad.module");
var svCfgClaseChoque_module_1 = require("./svCfgClaseChoque/svCfgClaseChoque.module");
var svCfgCondicionVia_module_1 = require("./svCfgCondicionVia/svCfgCondicionVia.module");
var svCfgControlVia_module_1 = require("./svCfgControlVia/svCfgControlVia.module");
var svCfgDisenio_module_1 = require("./svCfgDisenio/svCfgDisenio.module");
var svCfgEntidadAccidente_module_1 = require("./svCfgEntidadAccidente/svCfgEntidadAccidente.module");
var svCfgEstadoConductor_module_1 = require("./svCfgEstadoConductor/svCfgEstadoConductor.module");
var svCfgEstadoIluminacion_module_1 = require("./svCfgEstadoIluminacion/svCfgEstadoIluminacion.module");
var svCfgEstadoTiempo_module_1 = require("./svCfgEstadoTiempo/svCfgEstadoTiempo.module");
var svCfgEstadoVia_module_1 = require("./svCfgEstadoVia/svCfgEstadoVia.module");
var svCfgFalla_module_1 = require("./svCfgFalla/svCfgFalla.module");
var svCfgGeometria_module_1 = require("./svCfgGeometria/svCfgGeometria.module");
var svCfgGradoExamen_module_1 = require("./svCfgGradoExamen/svCfgGradoExamen.module");
var svCfgGravedadVictima_module_1 = require("./svCfgGravedadVictima/svCfgGravedadVictima.module");
var svCfgHipotesis_module_1 = require("./svCfgHipotesis/svCfgHipotesis.module");
var svCfgHospital_module_1 = require("./svCfgHospital/svCfgHospital.module");
var svCfgIluminacion_module_1 = require("./svCfgIluminacion/svCfgIluminacion.module");
var svCfgLugarImpacto_module_1 = require("./svCfgLugarImpacto/svCfgLugarImpacto.module");
var svCfgMaterial_module_1 = require("./svCfgMaterial/svCfgMaterial.module");
var svCfgMotivoAnulacion_module_1 = require("./svCfgMotivoAnulacion/svCfgMotivoAnulacion.module");
var svCfgNacionalidad_module_1 = require("./svCfgNacionalidad/svCfgNacionalidad.module");
var svCfgRequiereEmpresa_module_1 = require("./svCfgRequiereEmpresa/svCfgRequiereEmpresa.module");
var svCfgResultadoExamen_module_1 = require("./svCfgResultadoExamen/svCfgResultadoExamen.module");
var svCfgSector_module_1 = require("./svCfgSector/svCfgSector.module");
var svCfgSustanciaPeligrosa_module_1 = require("./svCfgSustanciaPeligrosa/svCfgSustanciaPeligrosa.module");
var svCfgTipoControl_module_1 = require("./svCfgTipoControl/svCfgTipoControl.module");
var svCfgTipoGeometria_module_1 = require("./svCfgTipoGeometria/svCfgTipoGeometria.module");
var svCfgTipoVia_module_1 = require("./svCfgTipoVia/svCfgTipoVia.module");
var svCfgTipoVictima_module_1 = require("./svCfgTipoVictima/svCfgTipoVictima.module");
var svCfgUnidadReceptora_module_1 = require("./svCfgUnidadReceptora/svCfgUnidadReceptora.module");
var svCfgUtilizacion_module_1 = require("./svCfgUtilizacion/svCfgUtilizacion.module");
var svCfgVisual_module_1 = require("./svCfgVisual/svCfgVisual.module");
var svCfgVisualDisminuida_module_1 = require("./svCfgVisualDisminuida/svCfgVisualDisminuida.module");
var svCfgZona_module_1 = require("./svCfgZona/svCfgZona.module");
var svCfgClaseActorVia_module_1 = require("./svCfgClaseActorVia/svCfgClaseActorVia.module");
var svCfgTemaCapacitacion_module_1 = require("./svCfgTemaCapacitacion/svCfgTemaCapacitacion.module");
var cfgComparendoEstado_module_1 = require("./cfgComparendoEstado/cfgComparendoEstado.module");
var comparendo_module_1 = require("./comparendo/comparendo.module");
var infraccion_module_1 = require("./infraccion/infraccion.module");
var ciudadano_module_1 = require("./ciudadano/ciudadano.module");
var tipoIdentificacion_module_1 = require("./tipoIdentificacion/tipoIdentificacion.module");
var cfgAuditoria_module_1 = require("./cfgAuditoria/cfgAuditoria.module");
var cfgValorVehiculo_module_1 = require("./cfgValorVehiculo/cfgValorVehiculo.module");
var cfgSmlmv_module_1 = require("./cfgSmlmv/cfgSmlmv.module");
var cfgFestivo_module_1 = require("./cfgFestivo/cfgFestivo.module");
var buscarAutomotor_module_1 = require("./buscarAutomotor/buscarAutomotor.module");
var registroEntregaProducto_module_1 = require("./registroEntregaProducto/registroEntregaProducto.module");
var cfgLicenciaConduccionCategoria_module_1 = require("./cfgLicenciaConduccionCategoria/cfgLicenciaConduccionCategoria.module");
var rncLicenciaConduccion_module_1 = require("./rncLicenciaConduccion/rncLicenciaConduccion.module");
var cfgTipoVehiculo_module_1 = require("./cfgTipoVehiculo/cfgTipoVehiculo.module");
var cfgAsignacionPlacaSede_module_1 = require("./cfgAsignacionPlacaSede/cfgAsignacionPlacaSede.module");
var cfgTipoClase_module_1 = require("./cfgTipoClase/cfgTipoClase.module");
var msvEvaluacion_module_1 = require("./msvEvaluacion/msvEvaluacion.module");
var msvRevision_module_1 = require("./msvRevision/msvRevision.module");
var msvCaracterizacion_module_1 = require("./msvCaracterizacion/msvCaracterizacion.module");
var msvCategoria_module_1 = require("./msvCategoria/msvCategoria.module");
var msvTalonario_module_1 = require("./msvTalonario/msvTalonario.module");
var mparqCostoTrayecto_module_1 = require("./mparqCostoTrayecto/mparqCostoTrayecto.module");
var mparqGrua_module_1 = require("./mparqGrua/mparqGrua.module");
var mparqGruaCiudadano_module_1 = require("./mparqGruaCiudadano/mparqGruaCiudadano.module");
var mparqEntrada_module_1 = require("./mparqEntrada/mparqEntrada.module");
var mparqSalida_module_1 = require("./mparqSalida/mparqSalida.module");
var mparqPatio_module_1 = require("./mparqPatio/mparqPatio.module");
var genero_module_1 = require("./genero/genero.module");
var grupoSanguineo_module_1 = require("./grupoSanguineo/grupoSanguineo.module");
var carroceria_module_1 = require("./carroceria/carroceria.module");
var factura_module_1 = require("./factura/factura.module");
var facturaInfraccion_module_1 = require("./facturaInfraccion/facturaInfraccion.module");
var tramiteFactura_module_1 = require("./tramiteFactura/tramiteFactura.module");
var cfgPlaca_module_1 = require("./cfgPlaca/cfgPlaca.module");
var limitacion_module_1 = require("./limitacion/limitacion.module");
var cfgTipoProceso_module_1 = require("./cfgTipoProceso/cfgTipoProceso.module");
var rnmaTramiteInscripcionLimitacion_module_1 = require("./rnmaTramiteInscripcionLimitacion/rnmaTramiteInscripcionLimitacion.module");
var rnmaTramiteLevantamientoLimitacion_module_1 = require("./rnmaTramiteLevantamientoLimitacion/rnmaTramiteLevantamientoLimitacion.module");
var rnrsTramiteInscripcionLimitacion_module_1 = require("./rnrsTramiteInscripcionLimitacion/rnrsTramiteInscripcionLimitacion.module");
var rnrsTramiteLevantamientoLimitacion_module_1 = require("./rnrsTramiteLevantamientoLimitacion/rnrsTramiteLevantamientoLimitacion.module");
var rnaTramiteInscripcionLimitacion_module_1 = require("./rnaTramiteInscripcionLimitacion/rnaTramiteInscripcionLimitacion.module");
var rnaTramiteLevantamientoLimitacion_module_1 = require("./rnaTramiteLevantamientoLimitacion/rnaTramiteLevantamientoLimitacion.module");
var msvRegistroIpat_module_1 = require("./msvRegistroIpat/msvRegistroIpat.module");
var cfgCasoInsumo_module_1 = require("./cfgCasoInsumo/cfgCasoInsumo.module");
var cfgSedeOperativa_module_1 = require("./cfgSedeOperativa/cfgSedeOperativa.module");
var cfgEntidadJudicial_module_1 = require("./cfgEntidadJudicial/cfgEntidadJudicial.module");
var cfgCausalLimitacion_module_1 = require("./cfgCausalLimitacion/cfgCausalLimitacion.module");
var cfgGravedad_module_1 = require("./cfgGravedad/cfgGravedad.module");
var cfgClaseAccidente_module_1 = require("./cfgClaseAccidente/cfgClaseAccidente.module");
var cfgChoqueCon_module_1 = require("./cfgChoqueCon/cfgChoqueCon.module");
var cfgObjetoFijo_module_1 = require("./cfgObjetoFijo/cfgObjetoFijo.module");
var tramiteSolicitud_module_1 = require("./tramiteSolicitud/tramiteSolicitud.module");
var tramiteSolicitudRnc_module_1 = require("./tramiteSolicitudRnc/tramiteSolicitudRnc.module");
var tramiteSolicitudRpccc_module_1 = require("./tramiteSolicitudRpccc/tramiteSolicitudRpccc.module");
var tramiteSolicitudRnma_module_1 = require("./tramiteSolicitudRnma/tramiteSolicitudRnma.module");
var tramiteSolicitudRnrs_module_1 = require("./tramiteSolicitudRnrs/tramiteSolicitudRnrs.module");
var empresa_module_1 = require("./empresa/empresa.module");
// import { SucursalModule } from './empresa/sucursal/new/sucursal.module';
var sustrato_module_1 = require("./sustrato/sustrato.module");
var tramitePrecio_module_1 = require("./tramitePrecio/tramitePrecio.module");
var gdDocumento_module_1 = require("./gdDocumento/gdDocumento.module");
var gdTrazabilidad_module_1 = require("./gdTrazabilidad/gdTrazabilidad.module");
var gdCfgTipoCorrespondencia_module_1 = require("./gdCfgTipoCorrespondencia/gdCfgTipoCorrespondencia.module");
var gdCfgMedioCorrespondencia_module_1 = require("./gdCfgMedioCorrespondencia/gdCfgMedioCorrespondencia.module");
var mflInfraccion_module_1 = require("./mflInfraccion/mflInfraccion.module");
var mflInfraccionCategoria_module_1 = require("./mflInfraccionCategoria/mflInfraccionCategoria.module");
var cfgCargo_module_1 = require("./cfgCargo/cfgCargo.module");
var mpersonalFuncionario_module_1 = require("./mpersonalFuncionario/mpersonalFuncionario.module");
var mpersonalTipoContrato_module_1 = require("./mpersonalTipoContrato/mpersonalTipoContrato.module");
var mpersonalTalonario_module_1 = require("./mpersonalTalonario/mpersonalTalonario.module");
var mpersonalAsignacion_module_1 = require("./mpersonalAsignacion/mpersonalAsignacion.module");
var rnaPreasignacionInsumo_module_1 = require("./rnaPreasignacionInsumo/rnaPreasignacionInsumo.module");
var RnaPreasignacionPlaca_module_1 = require("./rnaPreasignacionPlaca/RnaPreasignacionPlaca.module");
var RnaPreregistro_module_1 = require("./rnaPreregistro/RnaPreregistro.module");
var cuenta_module_1 = require("./cuenta/cuenta.module");
var gestionTransportePublico_module_1 = require("./gestionTransportePublico/gestionTransportePublico.module");
var rnaRegistroInsumos_module_1 = require("./rnaRegistroInsumos/rnaRegistroInsumos.module");
var rnaAsignacionInsumos_module_1 = require("./rnaAsignacionInsumos/rnaAsignacionInsumos.module");
//import { RnaPreasignacionInsumoModule } from './rnaPreasignacIonInsumo/rnaPreasignacionInsumo.module';
var rnmaPreregistro_module_1 = require("./rnmaPreregistro/rnmaPreregistro.module");
var rnrsPreregistro_module_1 = require("./rnrsPreregistro/rnrsPreregistro.module");
var reporte_module_1 = require("./reporte/reporte.module");
var insumoBusqueda_module_1 = require("./insumoBusqueda/insumoBusqueda.module");
var rnaCertificadoTradicionOficial_module_1 = require("./rnaCertificadoTradicionOficial/rnaCertificadoTradicionOficial.module");
var cfgEmpresaServicio_module_1 = require("./cfgEmpresaServicio/cfgEmpresaServicio.module");
var dashboard_component_1 = require("./dashboard.component");
var shared_1 = require("../shared");
var shared_2 = require("../shared");
var shared_3 = require("../shared");
var shared_4 = require("../shared");
var msvSenialInventario_module_1 = require("./msvSenialInventario/msvSenialInventario.module");
//import { MsvSenialModule } from './msvSenial/msvSenial.module';
var DashboardModule = (function () {
    function DashboardModule() {
    }
    return DashboardModule;
}());
DashboardModule = __decorate([
    core_1.NgModule({
        imports: [
            conceptoParametro_module_1.ConpetoParametroModule,
            common_1.CommonModule,
            router_1.RouterModule,
            ng2_bootstrap_1.Ng2BootstrapModule.forRoot(),
            userCfgMenu_module_1.UserCfgMenuModule,
            userCfgRole_module_1.UserCfgRoleModule,
            home_module_1.HomeModule,
            vehiculo_module_1.VehiculoModule,
            marca_module_1.MarcaModule,
            linea_module_1.LineaModule,
            banco_module_1.BancoModule,
            clase_module_1.ClaseModule,
            color_module_1.ColorModule,
            modalidad_module_1.ModalidadModule,
            pais_module_1.PaisModule,
            departamento_module_1.DepartamentoModule,
            combustible_module_1.CombustibleModule,
            consumible_module_1.ConsumibleModule,
            municipio_module_1.MunicipioModule,
            organismoTransito_module_1.OrganismoTransitoModule,
            servicio_module_1.ServicioModule,
            modulo_module_1.ModuloModule,
            tramite_module_1.TramiteModule,
            almacen_module_1.AlmacenModule,
            cfgTipoInfractor_module_1.CfgTipoInfractorModule,
            ciudadano_module_1.CiudadanoModule,
            tipoIdentificacion_module_1.TipoIdentificacionModule,
            cfgAuditoria_module_1.CfgAuditoriaModule,
            cfgSmlmv_module_1.CfgSmlmvModule,
            cfgFestivo_module_1.cfgFestivoModule,
            buscarAutomotor_module_1.buscarAutomotorModule,
            cfgLicenciaConduccionCategoria_module_1.CfgLicenciaConduccionCategoriaModule,
            cfgTipoVehiculo_module_1.CfgTipoVehiculoModule,
            cfgAsignacionPlacaSede_module_1.CfgAsignacionPlacaSedeModule,
            cfgTipoClase_module_1.CfgTipoClaseModule,
            rncLicenciaConduccion_module_1.RncLicenciaConduccionModule,
            svCapacitacion_module_1.SvCapacitacionModule,
            svCfgFuncion_module_1.SvCfgFuncionModule,
            svCfgFuncionCriterio_module_1.SvCfgFuncionCriterioModule,
            svCfgClaseActorVia_module_1.SvCfgClaseActorViaModule,
            svCfgTemaCapacitacion_module_1.SvCfgTemaCapacitacionModule,
            svCfgArea_module_1.SvCfgAreaModule,
            svCfgTipoArea_module_1.SvCfgTipoAreaModule,
            svCfgAseguradora_module_1.SvCfgAseguradoraModule,
            svCfgCalzadaCarril_module_1.SvCfgCalzadaCarrilModule,
            svCfgCardinalidad_module_1.SvCfgCardinalidadModule,
            svCfgClaseChoque_module_1.SvCfgClaseChoqueModule,
            svCfgCondicionVia_module_1.SvCfgCondicionViaModule,
            svCfgControlVia_module_1.SvCfgControlViaModule,
            svCfgDisenio_module_1.SvCfgDisenioModule,
            svCfgEntidadAccidente_module_1.SvCfgEntidadAccidenteModule,
            svCfgEstadoConductor_module_1.SvCfgEstadoConductorModule,
            svCfgEstadoIluminacion_module_1.SvCfgEstadoIluminacionModule,
            svCfgEstadoTiempo_module_1.SvCfgEstadoTiempoModule,
            svCfgEstadoVia_module_1.SvCfgEstadoViaModule,
            svCfgFalla_module_1.SvCfgFallaModule,
            svCfgGeometria_module_1.SvCfgGeometriaModule,
            svCfgGradoExamen_module_1.SvCfgGradoExamenModule,
            svCfgGravedadVictima_module_1.SvCfgGravedadVictimaModule,
            svCfgHipotesis_module_1.SvCfgHipotesisModule,
            svCfgHospital_module_1.SvCfgHospitalModule,
            svCfgIluminacion_module_1.SvCfgIluminacionModule,
            svCfgLugarImpacto_module_1.SvCfgLugarImpactoModule,
            svCfgMaterial_module_1.SvCfgMaterialModule,
            svCfgMotivoAnulacion_module_1.SvCfgMotivoAnulacionModule,
            svCfgNacionalidad_module_1.SvCfgNacionalidadModule,
            svCfgRequiereEmpresa_module_1.SvCfgRequiereEmpresaModule,
            svCfgResultadoExamen_module_1.SvCfgResultadoExamenModule,
            svCfgSector_module_1.SvCfgSectorModule,
            svCfgSustanciaPeligrosa_module_1.SvCfgSustanciaPeligrosaModule,
            svCfgTipoControl_module_1.SvCfgTipoControlModule,
            svCfgTipoGeometria_module_1.SvCfgTipoGeometriaModule,
            svCfgTipoVia_module_1.SvCfgTipoViaModule,
            svCfgTipoVictima_module_1.SvCfgTipoVictimaModule,
            svCfgUnidadReceptora_module_1.SvCfgUnidadReceptoraModule,
            svCfgUtilizacion_module_1.SvCfgUtilizacionModule,
            svCfgVisual_module_1.SvCfgVisualModule,
            svCfgVisualDisminuida_module_1.SvCfgVisualDisminuidaModule,
            svCfgZona_module_1.SvCfgZonaModule,
            msvEvaluacion_module_1.MsvEvaluacionModule,
            msvRevision_module_1.MsvRevisionModule,
            msvCaracterizacion_module_1.MsvCaracterizacionModule,
            msvCategoria_module_1.MsvCategoriaModule,
            gdDocumento_module_1.GdDocumentoModule,
            gdTrazabilidad_module_1.GdTrazabilidadModule,
            gdCfgTipoCorrespondencia_module_1.GdCfgTipoCorrespondenciaModule,
            gdCfgMedioCorrespondencia_module_1.GdCfgMedioCorrespondenciaModule,
            mflInfraccion_module_1.MflInfraccionModule,
            mflInfraccionCategoria_module_1.MflInfraccionCategoriaModule,
            mparqCostoTrayecto_module_1.MparqCostoTrayectoModule,
            mparqGrua_module_1.MparqGruaModule,
            mparqGruaCiudadano_module_1.MparqGruaCiudadanoModule,
            mparqEntrada_module_1.MparqEntradaModule,
            mparqSalida_module_1.MparqSalidaModule,
            mparqPatio_module_1.MparqPatioModule,
            cfgCargo_module_1.CfgCargoModule,
            mpersonalFuncionario_module_1.MpersonalFuncionarioModule,
            mpersonalTipoContrato_module_1.MpersonalTipoContratoModule,
            mpersonalTalonario_module_1.MpersonalTalonarioModule,
            mpersonalAsignacion_module_1.MpersonalAsignacionModule,
            genero_module_1.GeneroModule,
            grupoSanguineo_module_1.GrupoSanguineoModule,
            cuenta_module_1.CuentaModule,
            carroceria_module_1.CarroceriaModule,
            comparendo_module_1.ComparendoModule,
            cfgAdmFormatoTipo_module_1.CfgAdmFormatoTipoModule,
            cfgBodega_module_1.CfgBodegaModule,
            cfgSvConector_module_1.CfgSvConectorModule,
            cfgSvSenialTipo_module_1.CfgSvSenialTipoModule,
            cfgSvSenialColor_module_1.CfgSvSenialColorModule,
            cfgSvSenialEstado_module_1.CfgSvSenialEstadoModule,
            cfgSvUnidadMedida_module_1.CfgSvUnidadMedidaModule,
            cvCfgInteres_module_1.CvCfgInteresModule,
            cvCfgPorcentajeInicial_module_1.CvCfgPorcentajeInicialModule,
            cvAcuerdoPago_module_1.CvAcuerdoPagoModule,
            vhloCfgCda_module_1.VhloCfgCdaModule,
            vhloCfgOrigenRegistro_module_1.VhloCfgOrigenRegistroModule,
            vhloCfgEmpresaGps_module_1.VhloCfgEmpresaGpsModule,
            vhloCfgTipoRodaje_module_1.VhloCfgTipoRodajeModule,
            vhloCfgTipoCabina_module_1.VhloCfgTipoCabinaModule,
            vhloCfgTipoMaquinaria_module_1.VhloCfgTipoMaquinariaModule,
            vhloCfgClaseMaquinaria_module_1.VhloCfgClaseMaquinariaModule,
            vhloCfgSubpartidaArancelaria_module_1.VhloCfgSubpartidaArancelariaModule,
            vhloCfgCondicionIngreso_module_1.VhloCfgCondicionIngresoModule,
            vehiculoTecnoMecanica_module_1.VehiculoTecnoMecanicaModule,
            soat_module_1.SoatModule,
            cfgComparendoEstado_module_1.CfgComparendoEstadoModule,
            infraccion_module_1.InfraccionModule,
            factura_module_1.FacturaModule,
            tramiteFactura_module_1.TramiteFacturaModule,
            tramiteSolicitud_module_1.TramiteSolicitudModule,
            tramiteSolicitudRnc_module_1.TramiteSolicitudRncModule,
            tramiteSolicitudRpccc_module_1.TramiteSolicitudRpcccModule,
            tramiteSolicitudRnma_module_1.TramiteSolicitudRnmaModule,
            tramiteSolicitudRnrs_module_1.TramiteSolicitudRnrsModule,
            sustrato_module_1.SustratoModule,
            gestionTransportePublico_module_1.GestionTransportePublicoModule,
            empresa_module_1.EmpresaModule,
            cvCfgTipoRestriccion_module_1.CvCfgTipoRestriccionModule,
            tramitePrecio_module_1.TramitePrecioModule,
            RnaPreasignacionPlaca_module_1.RnaPreasignacionPlacaModule,
            RnaPreregistro_module_1.RnaPreregistroModule,
            cfgPlaca_module_1.CfgPlacaModule,
            cfgCasoInsumo_module_1.CfgCasoInsumoModule,
            cfgGravedad_module_1.CfgGravedadModule,
            cfgClaseAccidente_module_1.CfgClaseAccidenteModule,
            cfgChoqueCon_module_1.CfgChoqueConModule,
            cfgObjetoFijo_module_1.CfgObjetoFijoModule,
            cfgSedeOperativa_module_1.CfgSedeOperativaModule,
            cfgEntidadJudicial_module_1.CfgEntidadJudicialModule,
            cfgCausalLimitacion_module_1.CfgCausalLimitacionModule,
            msvTalonario_module_1.MsvTalonarioModule,
            rnaRegistroInsumos_module_1.rnaRegistroInsumosModule,
            rnmaPreregistro_module_1.RnmaPreregistroModule,
            rnaAsignacionInsumos_module_1.rnaAsignacionInsumosModule,
            limitacion_module_1.LimitacionModule,
            cfgTipoProceso_module_1.CfgTipoProcesoModule,
            rnmaTramiteInscripcionLimitacion_module_1.RnmaTramiteInscripcionLimitacionModule,
            rnmaTramiteLevantamientoLimitacion_module_1.RnmaTramiteLevantamientoLimitacionModule,
            rnrsTramiteInscripcionLimitacion_module_1.RnrsTramiteInscripcionLimitacionModule,
            rnrsTramiteLevantamientoLimitacion_module_1.RnrsTramiteLevantamientoLimitacionModule,
            rnaTramiteInscripcionLimitacion_module_1.RnaTramiteInscripcionLimitacionModule,
            rnaTramiteLevantamientoLimitacion_module_1.RnaTramiteLevantamientoLimitacionModule,
            msvRegistroIpat_module_1.MsvRegistroIpatModule,
            cfgValorVehiculo_module_1.CfgValorVehiculoModule,
            rnrsPreregistro_module_1.RnrsPreregistroModule,
            reporte_module_1.ReporteModule,
            registroEntregaProducto_module_1.registroEntregaProductoModule,
            rpcccInventarioDocumental_module_1.RpcccInventarioDocumentalModule,
            insumoBusqueda_module_1.InsumoBusquedaModule,
            facturaInfraccion_module_1.FacturaInfraccionModule,
            //MsvTCAsignacionModule,
            cfgEmpresaServicio_module_1.CfgEmpresaServicioModule,
            msvSenialInventario_module_1.MsvSenialInventarioModule,
            rnaCertificadoTradicionOficial_module_1.RnaCertificadoTradicionOficialModule,
            rnaPreasignacionInsumo_module_1.RnaPreasignacionInsumoModule,
        ],
        declarations: [dashboard_component_1.DashboardComponent, shared_1.TopNavComponent, shared_2.SidebarComponent, shared_3.FooterComponent, shared_4.RightsidebarComponent],
        exports: [dashboard_component_1.DashboardComponent, shared_1.TopNavComponent, shared_2.SidebarComponent, shared_3.FooterComponent, shared_4.RightsidebarComponent],
        providers: [],
    })
], DashboardModule);
exports.DashboardModule = DashboardModule;
//# sourceMappingURL=dashboard.module.js.map