import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CuentaComponent } from './cuenta.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {CuentaService} from '../../services/cuenta.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [CuentaComponent,NewComponent,EditComponent],
    exports: [CuentaComponent, NewComponent,EditComponent],
    providers:[CuentaService]
})

export class CuentaModule { }
