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
import { DepartamentoModule } from './departamento/departamento.module';
import { DashboardComponent } from './dashboard.component';

import {TopNavComponent} from '../shared/index';
import {SidebarComponent} from '../shared/index';
import {FooterComponent} from '../shared/index';
import {RightsidebarComponent} from '../shared/index';



@NgModule({
    imports: [
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
      DepartamentoModule,
    ],
    declarations: [DashboardComponent, TopNavComponent, SidebarComponent, FooterComponent, RightsidebarComponent],
    exports: [DashboardComponent, TopNavComponent, SidebarComponent, FooterComponent, RightsidebarComponent],
    
})

export class DashboardModule { }
