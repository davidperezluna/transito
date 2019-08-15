import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { ToolTipModule } from 'angular2-tooltip'

import { DashboardRoutes } from './dashboard.routes';
import { DashboardComponent } from './dashboard.component'; 
import { TopNavComponent } from '../shared';
import { SidebarComponent } from '../shared';
import { FooterComponent } from '../shared';
import { RightsidebarComponent } from '../shared';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DashboardRoutes,
    Ng2BootstrapModule.forRoot(),
    ToolTipModule
  ],
  declarations: [
    DashboardComponent, 
    TopNavComponent, 
    SidebarComponent, 
    FooterComponent, 
    RightsidebarComponent,
  ],
  exports: [
    DashboardComponent,
    TopNavComponent,
    SidebarComponent,
    FooterComponent,
    RightsidebarComponent
  ],
})
export class DashboardModule { }