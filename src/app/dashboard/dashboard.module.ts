import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToolTipModule } from 'angular2-tooltip'
import { Ng2BootstrapModule } from 'ng2-bootstrap';

import { DashboardComponent } from './dashboard.component'; 
import { DashboardRoutes } from './dashboard.routes';

import { TopNavComponent } from '../shared';
import { SidebarComponent } from '../shared';
import { FooterComponent } from '../shared';
import { RightsidebarComponent } from '../shared';

import { HomeModule } from './home/home.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DashboardRoutes,
    ToolTipModule,
    Ng2BootstrapModule.forRoot(),
    HomeModule,
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