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


import { CfgComparendoEstadoModule } from './cfgComparendoEstado/cfgComparendoEstado.module';
import { ComparendoModule } from './comparendo/comparendo.module';
import { InfraccionModule } from './infraccion/infraccion.module';

import { CiudadanoModule } from './ciudadano/ciudadano.module';
import { TipoIdentificacionModule } from './tipoIdentificacion/tipoIdentificacion.module';
import { MgdTipoCorrespondenciaModule } from './mgdTipoCorrespondencia/mgdTipoCorrespondencia.module';

import { CfgAuditoriaModule } from './cfgAuditoria/cfgAuditoria.module';
import { CfgValorVehiculoModule } from './cfgValorVehiculo/cfgValorVehiculo.module'; 
import { CfgSmlmvModule } from './cfgSmlmv/cfgSmlmv.module';
import { cfgFestivoModule } from './cfgFestivo/cfgFestivo.module';
import { buscarAutomotorModule } from './buscarAutomotor/buscarAutomotor.module';
import { registroEntregaProductoModule } from './registroEntregaProducto/registroEntregaProducto.module';

import { CfgLicenciaConduccionCategoriaModule } from './cfgLicenciaConduccionCategoria/cfgLicenciaConduccionCategoria.module';
import { RncLicenciaConduccionModule } from './rncLicenciaConduccion/rncLicenciaConduccion.module';

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

import { GeneroModule } from './genero/genero.module';
import { GrupoSanguineoModule } from './grupoSanguineo/grupoSanguineo.module';
import { CarroceriaModule } from './carroceria/carroceria.module';
import { FacturaModule } from './factura/factura.module';
import { TramiteFacturaModule } from './tramiteFactura/tramiteFactura.module';
import { CfgPlacaModule } from './cfgPlaca/cfgPlaca.module';
import { LimitacionModule } from './limitacion/limitacion.module';
import { CfgTipoProcesoModule } from './cfgTipoProceso/cfgTipoProceso.module';
import { RnmaTramiteInscripcionLimitacionModule } from './rnmaTramiteInscripcionLimitacion/rnmaTramiteInscripcionLimitacion.module';
import { CfgCasoInsumoModule } from './cfgCasoInsumo/cfgCasoInsumo.module';
import { CfgSedeOperativaModule } from './cfgSedeOperativa/cfgSedeOperativa.module';
import { CfgEntidadJudicialModule } from './cfgEntidadJudicial/cfgEntidadJudicial.module';

import { TramiteSolicitudModule } from './tramiteSolicitud/tramiteSolicitud.module';
import { TramiteSolicitudRncModule } from './tramiteSolicitudRnc/tramiteSolicitudRnc.module';
import { TramiteSolicitudRpcccModule } from './tramiteSolicitudRpccc/tramiteSolicitudRpccc.module';
import { TramiteSolicitudRnmaModule } from './tramiteSolicitudRnma/tramiteSolicitudRnma.module';
import { TramiteSolicitudRnrsModule } from './tramiteSolicitudRnrs/tramiteSolicitudRnrs.module';
import { EmpresaModule } from './empresa/empresa.module';
// import { SucursalModule } from './empresa/sucursal/new/sucursal.module';
import { SustratoModule } from './sustrato/sustrato.module';
import { TramitePrecioModule } from './tramitePrecio/tramitePrecio.module';

import { MgdRegistroModule } from './mgdRegistro/mgdRegistro.module';
import { MgdDocumentoModule } from './mgdDocumento/mgdDocumento.module';

import { MflInfraccionModule } from './mflInfraccion/mflInfraccion.module';
import { MflInfraccionCategoriaModule } from './mflInfraccionCategoria/mflInfraccionCategoria.module';

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
import { RnmaRegistroMaquinariaModule } from './rnmaRegistroMaquinaria/rnmaRegistroMaquinaria.module';
import { RnrsPreregistroModule } from './rnrsPreregistro/rnrsPreregistro.module';
import { ReporteModule } from './reporte/reporte.module';

import { DashboardComponent } from './dashboard.component'; 

import {TopNavComponent} from '../shared';
import {SidebarComponent} from '../shared';
import {FooterComponent} from '../shared';
import {RightsidebarComponent} from '../shared';

import { MsvInventarioSenialModule } from './msvInventarioSenial/msvInventarioSenial.module';
import { MsvSenialModule } from './msvSenial/msvSenial.module';

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
      CiudadanoModule,
      TipoIdentificacionModule,
      CfgAuditoriaModule,
      CfgSmlmvModule,
      cfgFestivoModule,
      buscarAutomotorModule,
      CfgLicenciaConduccionCategoriaModule,
      RncLicenciaConduccionModule,
      MsvEvaluacionModule,
      MsvRevisionModule,
      MsvCaracterizacionModule,
      MsvCategoriaModule,
      MgdDocumentoModule,
      MgdTipoCorrespondenciaModule,
      MflInfraccionModule,
      MflInfraccionCategoriaModule,
      MgdRegistroModule,
      MparqCostoTrayectoModule,
      MparqGruaModule,
      MparqGruaCiudadanoModule,
      MparqEntradaModule,
      MparqSalidaModule,
      MpersonalFuncionarioModule,
      MpersonalTipoContratoModule,
      MpersonalTalonarioModule,
      MpersonalAsignacionModule,
      GeneroModule,
      GrupoSanguineoModule,
      CuentaModule,
      CarroceriaModule,
      ComparendoModule,
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
      CfgSedeOperativaModule,
      CfgEntidadJudicialModule,
      MsvTalonarioModule,
      rnaRegistroInsumosModule,
      RnmaRegistroMaquinariaModule,
      rnaAsignacionInsumosModule,
      LimitacionModule,
      CfgTipoProcesoModule,
      RnmaTramiteInscripcionLimitacionModule,
      CfgValorVehiculoModule,
      RnrsPreregistroModule,
      ReporteModule,
      registroEntregaProductoModule,
      RpcccInventarioDocumentalModule,
      
      //MsvTCAsignacionModule,

      MsvInventarioSenialModule,
      MsvSenialModule,
    ],
    declarations: [DashboardComponent, TopNavComponent, SidebarComponent, FooterComponent, RightsidebarComponent],
    exports: [DashboardComponent, TopNavComponent, SidebarComponent, FooterComponent, RightsidebarComponent],
  providers: [],
})

export class DashboardModule { }
