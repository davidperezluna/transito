import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';
import { TooltipModule } from "ngx-tooltip";
import { FormsModule } from '@angular/forms';

import { SvCaracterizacionComponent } from './svCaracterizacion/svCaracterizacion.component';
import { ExportComponent } from "./svCaracterizacion/export/export.component";
import { SvCfgCategoriaComponent } from './svCfgCategoria/svCfgCategoria.component';
import { SvCfgCriterioComponent } from './svCfgCriterio/svCfgCriterio.component';
import { SvEvaluacionComponent } from './svEvaluacion/svEvaluacion.component';
import { SvCfgParametroComponent } from './svCfgParametro/svCfgParametro.component';
import { SvCfgVariableComponent } from './svCfgVariable/svCfgVariable.component';
import { SvCapacitacionComponent } from "./svCapacitacion/svCapacitacion.component";
import { ReporteComponent } from './svCapacitacion/reporte/reporte.component';
import { SvCfgAreaComponent } from "./svCfgArea/svCfgArea.component";
import { SvCfgAseguradoraComponent } from "./svCfgAseguradora/svCfgAseguradora.component";
import { SvCfgCalzadaCarrilComponent } from "./svCfgCalzadaCarril/svCfgCalzadaCarril.component";
import { SvCfgCardinalidadComponent } from "./svCfgCardinalidad/svCfgCardinalidad.component";
import { SvCfgClaseAccidenteComponent } from "./svCfgClaseAccidente/svCfgClaseAccidente.component";
import { SvCfgClaseActorViaComponent } from "./svCfgClaseActorVia/svCfgClaseActorVia.component";
import { SvCfgClaseChoqueComponent } from "./svCfgClaseChoque/svCfgClaseChoque.component";
import { SvCfgCondicionViaComponent } from "./svCfgCondicionVia/svCfgCondicionVia.component";
import { SvCfgControlViaComponent } from "./svCfgControlVia/svCfgControlVia.component";
import { SvCfgDisenioComponent } from "./svCfgDisenio/svCfgDisenio.component";
import { SvCfgEntidadAccidenteComponent } from "./svCfgEntidadAccidente/svCfgEntidadAccidente.component";
import { SvCfgEstadoConductorComponent } from "./svCfgEstadoConductor/svCfgEstadoConductor.component";
import { SvCfgEstadoIluminacionComponent } from "./svCfgEstadoIluminacion/svCfgEstadoIluminacion.component";
import { SvCfgEstadoTiempoComponent } from "./svCfgEstadoTiempo/svCfgEstadoTiempo.component";
import { SvCfgEstadoViaComponent } from "./svCfgEstadoVia/svCfgEstadoVia.component";
import { SvCfgFallaComponent } from "./svCfgFalla/svCfgFalla.component";
import { SvCfgFuncionComponent } from "./svCfgFuncion/svCfgFuncion.component";
import { SvCfgFuncionCriterioComponent } from "./svCfgFuncionCriterio/svCfgFuncionCriterio.component";
import { SvCfgGeometriaComponent } from "./svCfgGeometria/svCfgGeometria.component";
import { SvCfgGradoExamenComponent } from "./svCfgGradoExamen/svCfgGradoExamen.component";
import { SvCfgGravedadAccidenteComponent } from "./svCfgGravedadAccidente/svCfgGravedadAccidente.component";
import { SvCfgGravedadVictimaComponent } from "./svCfgGravedadVictima/svCfgGravedadVictima.component";
import { SvCfgHipotesisComponent } from "./svCfgHipotesis/svCfgHipotesis.component";
import { SvCfgHospitalComponent } from "./svCfgHospital/svCfgHospital.component";
import { SvCfgIluminacionComponent } from "./svCfgIluminacion/svCfgIluminacion.component";
import { SvCfgLugarImpactoComponent } from "./svCfgLugarImpacto/svCfgLugarImpacto.component";
import { SvCfgMaterialComponent } from "./svCfgMaterial/svCfgMaterial.component";
import { SvCfgMotivoAnulacionComponent } from "./svCfgMotivoAnulacion/svCfgMotivoAnulacion.component";
import { SvCfgNacionalidadComponent } from "./svCfgNacionalidad/svCfgNacionalidad.component";
import { SvCfgObjetoFijoComponent } from "./svCfgObjetoFijo/svCfgObjetoFijo.component";
import { SvCfgRequiereEmpresaComponent } from "./svCfgRequiereEmpresa/svCfgRequiereEmpresa.component";
import { SvCfgResultadoExamenComponent } from "./svCfgResultadoExamen/svCfgResultadoExamen.component";
import { SvCfgSectorComponent } from "./svCfgSector/svCfgSector.component";
import { SvCfgSenialComponent } from "./svCfgSenial/svCfgSenial.component";
import { SvCfgSenialColorComponent } from "./svCfgSenialColor/svCfgSenialColor.component";
import { SvCfgSenialEstadoComponent } from "./svCfgSenialEstado/svCfgSenialEstado.component";
import { SvCfgSenialLineaComponent } from "./svCfgSenialLinea/svCfgSenialLinea.component";
import { SvCfgSenialProveedorComponent } from "./svCfgSenialProveedor/svCfgSenialProveedor.component";
import { SvCfgSenialTipoComponent } from "./svCfgSenialTipo/svCfgSenialTipo.component";
import { SvCfgSenialUnidadMedidaComponent } from "./svCfgSenialUnidadMedida/svCfgSenialUnidadMedida.component";
import { SvCfgSustanciaPeligrosaComponent } from "./svCfgSustanciaPeligrosa/svCfgSustanciaPeligrosa.component";
import { SvCfgTemaCapacitacionComponent } from "./svCfgTemaCapacitacion/svCfgTemaCapacitacion.component";
import { SvCfgTipoAreaComponent } from "./svCfgTipoArea/svCfgTipoArea.component";
import { SvCfgTipoControlComponent } from "./svCfgTipoControl/svCfgTipoControl.component";
import { SvCfgTipoGeometriaComponent } from "./svCfgTipoGeometria/svCfgTipoGeometria.component";
import { SvCfgTipoViaComponent } from "./svCfgTipoVia/svCfgTipoVia.component";
import { SvCfgTipoVictimaComponent } from "./svCfgTipoVictima/svCfgTipoVictima.component";
import { SvCfgUnidadReceptoraComponent } from "./svCfgUnidadReceptora/svCfgUnidadReceptora.component";
import { SvCfgUtilizacionComponent } from "./svCfgUtilizacion/svCfgUtilizacion.component";
import { SvCfgVisualComponent } from "./svCfgVisual/svCfgVisual.component";
import { SvCfgVisualDisminuidaComponent } from "./svCfgVisualDisminuida/svCfgVisualDisminuida.component";
import { SvCfgZonaComponent } from "./svCfgZona/svCfgZona.component";
import { SvIpatComponent } from "./svIpat/svIpat.component";
import { SvIpatAsignacionComponent } from "./svIpatAsignacion/svIpatAsignacion.component";
import { SvIpatConsecutivoComponent } from "./svIpatConsecutivo/svIpatConsecutivo.component";
import { SvIpatImpresoAsignacionComponent } from "./svIpatImpresoAsignacion/svIpatImpresoAsignacion.component";
import { SvIpatImpresoBodegaComponent } from "./svIpatImpresoBodega/svIpatImpresoBodega.component";
import { SvIpatImpresoMunicipioComponent } from "./svIpatImpresoMunicipio/svIpatImpresoMunicipio.component";
import { SvIpatTalonarioComponent } from "./svIpatTalonario/svIpatTalonario.component";
import { SvSenialInventarioComponent } from "./svSenialInventario/svSenialInventario.component";
import { LocationComponent } from "./svSenialInventario/location/location.component";


import { SvCaracterizacionModule } from "./svCaracterizacion/svCaracterizacion.module";
import { SvCfgCategoriaModule } from "./svCfgCategoria/svCfgCategoria.module";
import { SvCfgCriterioModule } from "./svCfgCriterio/svCfgCriterio.module";
import { SvEvaluacionModule } from "./svEvaluacion/svEvaluacion.module";
import { SvCfgParametroModule } from "./svCfgParametro/svCfgParametro.module";
import { SvCfgVariableModule } from "./svCfgVariable/svCfgVariable.module";
import { SvCapacitacionModule } from "./svCapacitacion/svCapacitacion.module";
import { SvCfgAreaModule } from "./svCfgArea/svCfgArea.module";
import { SvCfgAseguradoraModule } from "./svCfgAseguradora/svCfgAseguradora.module";
import { SvCfgCalzadaCarrilModule } from "./svCfgCalzadaCarril/svCfgCalzadaCarril.module";
import { SvCfgCardinalidadModule } from "./svCfgCardinalidad/svCfgCardinalidad.module";
import { SvCfgClaseAccidenteModule } from "./svCfgClaseAccidente/svCfgClaseAccidente.module";
import { SvCfgClaseActorViaModule } from "./svCfgClaseActorVia/svCfgClaseActorVia.module";
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
import { SvCfgFuncionModule } from "./svCfgFuncion/svCfgFuncion.module";
import { SvCfgFuncionCriterioModule } from "./svCfgFuncionCriterio/svCfgFuncionCriterio.module";
import { SvCfgGeometriaModule } from "./svCfgGeometria/svCfgGeometria.module";
import { SvCfgGradoExamenModule } from "./svCfgGradoExamen/svCfgGradoExamen.module";
import { SvCfgGravedadAccidenteModule } from "./svCfgGravedadAccidente/svCfgGravedadAccidente.module";
import { SvCfgGravedadVictimaModule } from "./svCfgGravedadVictima/svCfgGravedadVictima.module";
import { SvCfgHipotesisModule } from "./svCfgHipotesis/svCfgHipotesis.module";
import { SvCfgHospitalModule } from "./svCfgHospital/svCfgHospital.module";
import { SvCfgIluminacionModule } from "./svCfgIluminacion/svCfgIluminacion.module";
import { SvCfgLugarImpactoModule } from "./svCfgLugarImpacto/svCfgLugarImpacto.module";
import { SvCfgMaterialModule } from "./svCfgMaterial/svCfgMaterial.module";
import { SvCfgMotivoAnulacionModule } from "./svCfgMotivoAnulacion/svCfgMotivoAnulacion.module";
import { SvCfgNacionalidadModule } from "./svCfgNacionalidad/svCfgNacionalidad.module";
import { SvCfgObjetoFijoModule } from "./svCfgObjetoFijo/svCfgObjetoFijo.module";
import { SvCfgRequiereEmpresaModule } from "./svCfgRequiereEmpresa/svCfgRequiereEmpresa.module";
import { SvCfgResultadoExamenModule } from "./svCfgResultadoExamen/svCfgResultadoExamen.module";
import { SvCfgSectorModule } from "./svCfgSector/svCfgSector.module";
import { SvCfgSenialModule } from "./svCfgSenial/svCfgSenial.module";
import { SvCfgSenialColorModule } from "./svCfgSenialColor/svCfgSenialColor.module";
import { SvCfgSenialEstadoModule } from "./svCfgSenialEstado/svCfgSenialEstado.module";
import { SvCfgSenialLineaModule } from "./svCfgSenialLinea/svCfgSenialLinea.module";
import { SvCfgSenialProveedorModule } from "./svCfgSenialProveedor/svCfgSenialProveedor.module";
import { SvCfgSenialTipoModule } from "./svCfgSenialTipo/svCfgSenialTipo.module";
import { SvCfgSenialUnidadMedidaModule } from "./svCfgSenialUnidadMedida/svCfgSenialUnidadMedida.module";
import { SvCfgSustanciaPeligrosaModule } from "./svCfgSustanciaPeligrosa/svCfgSustanciaPeligrosa.module";
import { SvCfgTemaCapacitacionModule } from "./svCfgTemaCapacitacion/svCfgTemaCapacitacion.module";
import { SvCfgTipoAreaModule } from "./svCfgTipoArea/svCfgTipoArea.module";
import { SvCfgTipoControlModule } from "./svCfgTipoControl/svCfgTipoControl.module";
import { SvCfgTipoGeometriaModule } from "./svCfgTipoGeometria/svCfgTipoGeometria.module";
import { SvCfgTipoViaModule } from "./svCfgTipoVia/svCfgTipoVia.module";
import { SvCfgTipoVictimaModule } from "./svCfgTipoVictima/svCfgTipoVictima.module";
import { SvCfgUnidadReceptoraModule } from "./svCfgUnidadReceptora/svCfgUnidadReceptora.module";
import { SvCfgUtilizacionModule } from "./svCfgUtilizacion/svCfgUtilizacion.module";
import { SvCfgVisualModule } from "./svCfgVisual/svCfgVisual.module";
import { SvCfgVisualDisminuidaModule } from "./svCfgVisualDisminuida/svCfgVisualDisminuida.module";
import { SvCfgZonaModule } from "./svCfgZona/svCfgZona.module";
import { SvIpatModule } from "./svIpat/svIpat.module";
import { SvIpatAsignacionModule } from "./svIpatAsignacion/svIpatAsignacion.module";
import { SvIpatConsecutivoModule } from "./svIpatConsecutivo/svIpatConsecutivo.module";
import { SvIpatImpresoAsignacionModule } from "./svIpatImpresoAsignacion/svIpatImpresoAsignacion.module";
import { SvIpatImpresoBodegaModule } from "./svIpatImpresoBodega/svIpatImpresoBodega.module";
import { SvIpatImpresoMunicipioModule } from "./svIpatImpresoMunicipio/svIpatImpresoMunicipio.module";
import { SvIpatTalonarioModule } from "./svIpatTalonario/svIpatTalonario.module";
import { SvSenialInventarioModule } from "./svSenialInventario/svSenialInventario.module";
import { SeguridadVialRoutingModule } from './seguridad-vial-routing.module';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    TooltipModule,
    FormsModule,
    Ng2BootstrapModule.forRoot(),
    SelectModule,
    SeguridadVialRoutingModule,
    SvCaracterizacionModule,
    SvCfgCategoriaModule,
    SvCfgCriterioModule,
    SvEvaluacionModule,
    SvCfgParametroModule,
    SvCfgVariableModule,
    SvCapacitacionModule,
    SvCfgAreaModule,
    SvCfgAseguradoraModule,
    SvCfgCalzadaCarrilModule,
    SvCfgCardinalidadModule,
    SvCfgClaseAccidenteModule,
    SvCfgClaseActorViaModule,
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
    SvCfgFuncionModule,
    SvCfgFuncionCriterioModule,
    SvCfgGeometriaModule,
    SvCfgGradoExamenModule,
    SvCfgGravedadAccidenteModule,
    SvCfgGravedadVictimaModule,
    SvCfgHipotesisModule,
    SvCfgHospitalModule,
    SvCfgIluminacionModule,
    SvCfgLugarImpactoModule,
    SvCfgMaterialModule,
    SvCfgMotivoAnulacionModule,
    SvCfgNacionalidadModule,
    SvCfgObjetoFijoModule,
    SvCfgRequiereEmpresaModule,
    SvCfgResultadoExamenModule,
    SvCfgSectorModule,
    SvCfgSenialModule,
    SvCfgSenialColorModule,
    SvCfgSenialEstadoModule,
    SvCfgSenialLineaModule,
    SvCfgSenialProveedorModule,
    SvCfgSenialTipoModule,
    SvCfgSenialUnidadMedidaModule,
    SvCfgSustanciaPeligrosaModule,
    SvCfgTemaCapacitacionModule,
    SvCfgTipoAreaModule,
    SvCfgTipoControlModule,
    SvCfgTipoGeometriaModule,
    SvCfgTipoViaModule,
    SvCfgTipoVictimaModule,
    SvCfgUnidadReceptoraModule,
    SvCfgUtilizacionModule,
    SvCfgVisualModule,
    SvCfgVisualDisminuidaModule,
    SvCfgZonaModule,
    SvIpatModule,
    SvIpatAsignacionModule,
    SvIpatConsecutivoModule,
    SvIpatImpresoAsignacionModule,
    SvIpatImpresoBodegaModule,
    SvIpatImpresoMunicipioModule,
    SvIpatTalonarioModule,
    SvSenialInventarioModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCZLRPtun19mn3xqSZi08dPp-1R4P2A2B4'
    })
  ],
  declarations: [
    SvCaracterizacionComponent,
    ExportComponent,
    SvCfgCategoriaComponent,
    SvCfgCriterioComponent,
    SvEvaluacionComponent,
    SvCfgParametroComponent,
    SvCfgVariableComponent,
    SvCapacitacionComponent,
    ReporteComponent,
    SvCfgAreaComponent,
    SvCfgAseguradoraComponent,
    SvCfgCalzadaCarrilComponent,
    SvCfgCardinalidadComponent,
    SvCfgClaseAccidenteComponent,
    SvCfgClaseActorViaComponent,
    SvCfgClaseChoqueComponent,
    SvCfgCondicionViaComponent,
    SvCfgControlViaComponent,
    SvCfgDisenioComponent,
    SvCfgEntidadAccidenteComponent,
    SvCfgEstadoConductorComponent,
    SvCfgEstadoIluminacionComponent,
    SvCfgEstadoTiempoComponent,
    SvCfgEstadoViaComponent,
    SvCfgFallaComponent,
    SvCfgFuncionComponent,
    SvCfgFuncionCriterioComponent,
    SvCfgGeometriaComponent,
    SvCfgGradoExamenComponent,
    SvCfgGravedadAccidenteComponent,
    SvCfgGravedadVictimaComponent,
    SvCfgHipotesisComponent,
    SvCfgHospitalComponent,
    SvCfgIluminacionComponent,
    SvCfgLugarImpactoComponent,
    SvCfgMaterialComponent,
    SvCfgMotivoAnulacionComponent,
    SvCfgNacionalidadComponent,
    SvCfgObjetoFijoComponent,
    SvCfgRequiereEmpresaComponent,
    SvCfgResultadoExamenComponent,
    SvCfgSectorComponent,
    SvCfgSenialComponent,
    SvCfgSenialColorComponent,
    SvCfgSenialEstadoComponent,
    SvCfgSenialLineaComponent,
    SvCfgSenialProveedorComponent,
    SvCfgSenialTipoComponent,
    SvCfgSenialUnidadMedidaComponent,
    SvCfgSustanciaPeligrosaComponent,
    SvCfgTemaCapacitacionComponent,
    SvCfgTipoAreaComponent,
    SvCfgTipoControlComponent,
    SvCfgTipoGeometriaComponent,
    SvCfgTipoViaComponent,
    SvCfgTipoVictimaComponent,
    SvCfgUnidadReceptoraComponent,
    SvCfgUtilizacionComponent,
    SvCfgVisualComponent,
    SvCfgVisualDisminuidaComponent,
    SvCfgZonaComponent,
    SvIpatComponent,
    SvIpatAsignacionComponent,
    SvIpatConsecutivoComponent,
    SvIpatImpresoAsignacionComponent,
    SvIpatImpresoBodegaComponent,
    SvIpatImpresoMunicipioComponent,
    SvIpatTalonarioComponent,
    SvSenialInventarioComponent,
    LocationComponent
  ]
})
export class SeguridadVialModule { }
