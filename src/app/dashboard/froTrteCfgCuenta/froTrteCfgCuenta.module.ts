import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FroTrteCfgCuentaComponent } from './froTrteCfgCuenta.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {FroTrteCfgCuentaService} from '../../services/froTrteCfgCuenta.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [FroTrteCfgCuentaComponent,NewComponent,EditComponent],
    exports: [FroTrteCfgCuentaComponent, NewComponent,EditComponent],
    providers:[FroTrteCfgCuentaService]
})

export class FroTrteCfgCuentaModule { }
