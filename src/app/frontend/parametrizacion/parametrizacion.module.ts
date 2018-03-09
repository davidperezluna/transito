import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

import { VehiculoModule } from './vehiculo/vehiculo.module';

import {TopNavComponent} from '../shared/index';
import {SidebarComponent} from '../shared/index';
import {FooterComponent} from '../shared/index';
import {RightsidebarComponent} from '../shared/index';
import { ParametrizacionComponent } from './parametrizacion.component';


@NgModule({
    imports: [
      CommonModule,
      RouterModule,
      Ng2BootstrapModule.forRoot(),
      VehiculoModule,
    ],
    declarations: [ParametrizacionComponent, TopNavComponent, SidebarComponent, FooterComponent, RightsidebarComponent],
    exports: [ParametrizacionComponent, TopNavComponent, SidebarComponent, FooterComponent, RightsidebarComponent]
})

export class ParametrizacionModule { }
