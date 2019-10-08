import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';
import { TooltipModule } from "ngx-tooltip";

import { GdCfgMedioCorrespondenciaComponent } from './gdCfgMedioCorrespondencia/gdCfgMedioCorrespondencia.component';
import { GdCfgTipoCorrespondenciaComponent } from './gdCfgTipoCorrespondencia/gdCfgTipoCorrespondencia.component';
import { GdDocumentoComponent } from './gdDocumento/gdDocumento.component';
import { GdTrazabilidadComponent } from './gdTrazabilidad/gdTrazabilidad.component';
import { TemplateComponent } from './gdDocumento/template/template.component';
import { SearchComponent } from './gdDocumento/search/search.component';
import { ReportComponent } from './gdDocumento/report/report.component';

import { GestionDocumentalRoutingModule } from './gestion-documental-routing.module';
import { GdCfgMedioCorrespondenciaModule } from './gdCfgMedioCorrespondencia/gdCfgMedioCorrespondencia.module';
import { GdCfgTipoCorrespondenciaModule } from './gdCfgTipoCorrespondencia/gdCfgTipoCorrespondencia.module';
import { GdDocumentoModule } from './gdDocumento/gdDocumento.module';
import { GdTrazabilidadModule } from './gdTrazabilidad/gdTrazabilidad.module';

import { ExitComponent } from './gdDocumento/exit/exit.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    Ng2BootstrapModule.forRoot(),
    SelectModule,
    TooltipModule,
    GestionDocumentalRoutingModule,
    GestionDocumentalRoutingModule,
    GdCfgMedioCorrespondenciaModule,
    GdCfgTipoCorrespondenciaModule,
    GdDocumentoModule,
    GdTrazabilidadModule,
  ],
  declarations: [
    GdCfgMedioCorrespondenciaComponent,
    GdCfgTipoCorrespondenciaComponent,
    GdDocumentoComponent,
    GdTrazabilidadComponent,
    TemplateComponent,
    SearchComponent,
    ReportComponent,
    ExitComponent,
  ]
})
export class GestionDocumentalModule { }
