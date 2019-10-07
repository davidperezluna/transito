import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GdCfgMedioCorrespondenciaComponent } from './gdCfgMedioCorrespondencia/gdCfgMedioCorrespondencia.component';
import { GdCfgTipoCorrespondenciaComponent } from './gdCfgTipoCorrespondencia/gdCfgTipoCorrespondencia.component';
import { GdDocumentoComponent } from './gdDocumento/gdDocumento.component';
import { GdTrazabilidadComponent } from './gdTrazabilidad/gdTrazabilidad.component';
import { TemplateComponent } from './gdDocumento/template/template.component';
import { SearchComponent } from './gdDocumento/search/search.component';
import { ReportComponent } from './gdDocumento/report/report.component';

const routes: Routes = [
  {
    path: 'gdCfgMedioCorrespondencia',
    component: GdCfgMedioCorrespondenciaComponent
  },
  {
    path: 'gdCfgTipoCorrespondencia',
    component: GdCfgTipoCorrespondenciaComponent
  },
  {
    path: 'gdDocumento',
    component: GdDocumentoComponent
  },
  {
    path: 'gdTrazabilidad',
    component: GdTrazabilidadComponent
  },
  {
    path: 'template',
    component: TemplateComponent
  },
  {
    path: 'search',
    component: SearchComponent
  },
  {
    path: 'report',
    component: ReportComponent
  },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionDocumentalRoutingModule { }
