import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExportComponent } from "./msvCaracterizacion/export/export.component";
import { MsvCaracterizacionComponent } from './msvCaracterizacion/msvCaracterizacion.component';
import { MsvCategoriaComponent } from './msvCategoria/msvCategoria.component';
import { MsvCriterioComponent } from './msvCriterio/msvCriterio.component';
import { MsvEvaluacionComponent } from './msvEvaluacion/msvEvaluacion.component';
import { MsvParametroComponent } from './msvParametro/msvParametro.component';
import { MsvVariableComponent } from './msvVariable/msvVariable.component';
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
import { LocationComponent } from './svSenialInventario/location/location.component';


const routes: Routes = [
  {
    path: 'msvCaracterizacion',
    component: MsvCaracterizacionComponent
  },
  {
    path: 'svCaracterizacion/export',
    component: ExportComponent
  },
  {
    path: 'msvCategoria',
    component: MsvCategoriaComponent
  },
  {
    path: 'msvCriterio',
    component: MsvCriterioComponent
  },
  {
    path: 'msvEvaluacion',
    component: MsvEvaluacionComponent
  },
  {
    path: 'msvParametro',
    component: MsvParametroComponent
  },
  {
    path: 'msvVariable',
    component: MsvVariableComponent
  },
  {
    path: 'svCapacitacion',
    component: SvCapacitacionComponent
  },
  {
    path: 'svCapacitacion/reporte',
    component: ReporteComponent
  },
  {
    path: 'svCfgArea',
    component: SvCfgAreaComponent
  },
  {
    path: 'svCfgAseguradora',
    component: SvCfgAseguradoraComponent
  },
  {
    path: 'svCfgCalzadaCarril',
    component: SvCfgCalzadaCarrilComponent
  },
  {
    path: 'svCfgCardinalidad',
    component: SvCfgCardinalidadComponent
  },
  {
    path: 'svCfgClaseAccidente',
    component: SvCfgClaseAccidenteComponent
  },
  {
    path: 'svCfgClaseActorVia',
    component: SvCfgClaseActorViaComponent
  },
  {
    path: 'svCfgClaseChoque',
    component: SvCfgClaseChoqueComponent
  },
  {
    path: 'svCfgCondicionVia',
    component: SvCfgCondicionViaComponent
  },
  {
    path: 'svCfgControlVia',
    component: SvCfgControlViaComponent
  },
  {
    path: 'svCfgDisenio',
    component: SvCfgDisenioComponent
  },
  {
    path: 'svCfgEntidadAccidente',
    component: SvCfgEntidadAccidenteComponent
  },
  {
    path: 'svCfgEstadoConductor',
    component: SvCfgEstadoConductorComponent
  },
  {
    path: 'svCfgEstadoIluminacion',
    component: SvCfgEstadoIluminacionComponent
  },
  {
    path: 'svCfgEstadoTiempo',
    component: SvCfgEstadoTiempoComponent
  },
  {
    path: 'svCfgEstadoVia',
    component: SvCfgEstadoViaComponent
  },
  {
    path: 'svCfgFalla',
    component: SvCfgFallaComponent
  },
  {
    path: 'svCfgFuncion',
    component: SvCfgFuncionComponent
  },
  {
    path: 'svCfgFuncionCriterio',
    component: SvCfgFuncionCriterioComponent
  },
  {
    path: 'svCfgGeometria',
    component: SvCfgGeometriaComponent
  },
  {
    path: 'svCfgGradoExamen',
    component: SvCfgGradoExamenComponent
  },
  {
    path: 'svCfgGravedadAccidente',
    component: SvCfgGravedadAccidenteComponent
  },
  {
    path: 'svCfgGravedadVictima',
    component: SvCfgGravedadVictimaComponent
  },
  {
    path: 'svCfgHipotesis',
    component: SvCfgHipotesisComponent
  },
  {
    path: 'svCfgHospital',
    component: SvCfgHospitalComponent
  },
  {
    path: 'svCfgIluminacion',
    component: SvCfgIluminacionComponent
  },
  {
    path: 'svCfgLugarImpacto',
    component: SvCfgLugarImpactoComponent
  },
  {
    path: 'svCfgMaterial',
    component: SvCfgMaterialComponent
  },
  {
    path: 'svCfgMotivoAnulacion',
    component: SvCfgMotivoAnulacionComponent
  },
  {
    path: 'svCfgNacionalidad',
    component: SvCfgNacionalidadComponent
  },
  {
    path: 'svCfgObjetoFijo',
    component: SvCfgObjetoFijoComponent
  },
  {
    path: 'svCfgRequiereEmpresa',
    component: SvCfgRequiereEmpresaComponent
  },
  {
    path: 'svCfgResultadoExamen',
    component: SvCfgResultadoExamenComponent
  },
  {
    path: 'svCfgSector',
    component: SvCfgSectorComponent
  },
  {
    path: 'svCfgSenial',
    component: SvCfgSenialComponent
  },
  {
    path: 'svCfgSenialColor',
    component: SvCfgSenialColorComponent
  },
  {
    path: 'svCfgSenialEstado',
    component: SvCfgSenialEstadoComponent
  },
  {
    path: 'svCfgSenialLinea',
    component: SvCfgSenialLineaComponent
  },
  {
    path: 'svCfgSenialProveedor',
    component: SvCfgSenialProveedorComponent
  },
  {
    path: 'svCfgSenialTipo',
    component: SvCfgSenialTipoComponent
  },
  {
    path: 'svCfgSenialUnidadMedida',
    component: SvCfgSenialUnidadMedidaComponent
  },
  {
    path: 'svCfgSustanciaPeligrosa',
    component: SvCfgSustanciaPeligrosaComponent
  },
  {
    path: 'svCfgTemaCapacitacion',
    component: SvCfgTemaCapacitacionComponent
  },
  {
    path: 'svCfgTipoArea',
    component: SvCfgTipoAreaComponent
  },
  {
    path: 'svCfgTipoControl',
    component: SvCfgTipoControlComponent
  },
  {
    path: 'svCfgTipoGeometria',
    component: SvCfgTipoGeometriaComponent
  }, 
  {
    path: 'svCfgTipoVia',
    component: SvCfgTipoViaComponent
  },
  {
    path: 'svCfgTipoVictima',
    component: SvCfgTipoVictimaComponent
  },
  {
    path: 'svCfgUnidadReceptora',
    component: SvCfgUnidadReceptoraComponent
  },
  {
    path: 'svCfgUtilizacion',
    component: SvCfgUtilizacionComponent
  },
  {
    path: 'svCfgVisual',
    component: SvCfgVisualComponent
  },
  {
    path: 'svCfgVisualDisminuida',
    component: SvCfgVisualDisminuidaComponent
  },
  {
    path: 'svCfgZona',
    component: SvCfgZonaComponent
  },
  {
    path: 'svIpat',
    component: SvIpatComponent
  },
  {
    path: 'svIpat/export',
    component: ExportComponent
  },
  {
    path: 'svIpatAsignacion',
    component: SvIpatAsignacionComponent
  },
  {
    path: 'svIpatConsecutivo',
    component: SvIpatConsecutivoComponent
  },
  {
    path: 'svIpatImpresoAsignacion',
    component: SvIpatImpresoAsignacionComponent
  },
  {
    path: 'svIpatImpresoBodega',
    component: SvIpatImpresoBodegaComponent
  },
  {
    path: 'svIpatImpresoMunicipio',
    component: SvIpatImpresoMunicipioComponent
  },
  {
    path: 'svIpatTalonario',
    component: SvIpatTalonarioComponent
  },
  {
    path: 'svSenialInventario',
    component: SvSenialInventarioComponent
  },

  {
    path: 'senializacion/location',
    component: LocationComponent
  }
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadVialRoutingModule { }
