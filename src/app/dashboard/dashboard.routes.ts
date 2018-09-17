import { Route } from '@angular/router';

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

import { CfgBodegaRoutes } from './cfgBodega/cfgBodega.routes';
import { CfgSvConectorRoutes } from './cfgSvConector/cfgSvConector.routes';
import { CfgSvSenialTipoRoutes } from './cfgSvSenialTipo/cfgSvSenialTipo.routes';
import { CfgSvSenialColorRoutes } from './cfgSvSenialColor/cfgSvSenialColor.routes';
import { CfgSvSenialEstadoRoutes } from './cfgSvSenialEstado/cfgSvSenialEstado.routes';
import { CfgSvUnidadMedidaRoutes } from './cfgSvUnidadMedida/cfgSvUnidadMedida.routes';

import { CfgCdaRoutes } from './cfgCda/cfgCda.routes';
import { VehiculoTecnoMecanicaRoutes } from './vehiculoTecnoMecanica/vehiculoTecnoMecanica.routes';

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

import { MgdRegistroRoutes } from './mgdRegistro/mgdRegistro.routes';
import { MgdDocumentoRoutes } from './mgdDocumento/mgdDocumento.routes';
import { MgdTipoCorrespondenciaRoutes } from './mgdTipoCorrespondencia/mgdTipoCorrespondencia.routes';

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
import { RnmaRegistroMaquinariaRoutes } from './rnmaRegistroMaquinaria/rnmaRegistroMaquinaria.routes';
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
//import { MsvTCAsignacionRoutes } from './msvTCAsignacion/msvTCAsignacion.routes';
import { DashboardComponent } from '.';


import { MsvSenialInventarioRoutes } from './msvSenialInventario/msvSenialInventario.routes';
import { MsvSenialRoutes } from './msvSenial/msvSenial.routes';
import { RnaCertificadoTradicionRoutes } from './rnaCertificadoTradicionOficial/rnaCertificadoTradicionOficial.routes';

export const DashboardRoutes: Route[] = [
  {
    path: 'dashboard', 
    component: DashboardComponent,
    children: [
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
      ...MgdDocumentoRoutes,
      ...MgdRegistroRoutes,
      ...MgdTipoCorrespondenciaRoutes,
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
      ...CfgBodegaRoutes,
      ...CfgSvConectorRoutes,
      ...CfgSvSenialTipoRoutes,
      ...CfgSvSenialColorRoutes,
      ...CfgSvSenialEstadoRoutes,
      ...CfgSvUnidadMedidaRoutes,
      ...CfgCdaRoutes,
      ...VehiculoTecnoMecanicaRoutes,
      ...CfgComparendoEstadoRoutes,
      ...InfraccionRoutes,
      ...CarroceriaRoutes,
      ...FacturaRoutes,
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
      // ...SucursalRoutes,
      ...TramitePrecioRoutes,
      ...CfgPlacaRoutes,
      ...CfgCasoInsumoRoutes,
      ...CfgSedeOperativaRoutes,
      ...CfgEntidadJudicialRoutes,
      ...CfgCausalLimitacionRoutes,
      ...MsvTalonarioRoutes,
      //...MsvTCAsignacionRoutes, 
      ...ConceptoParametroRoutes,
      ...RnmaRegistroMaquinariaRoutes,
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
      ...MsvSenialInventarioRoutes,
      ...MsvSenialRoutes,
      ...RnaCertificadoTradicionRoutes,
      ...CfgEmpresaServicioRoutes
    ]
  }
];
