import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';
import { TooltipModule } from "ngx-tooltip";

import { UserEmpresaTransporteService } from '../../services/userEmpresaTransporte.service';

import { UserEmpresaTransporteComponent } from './userEmpresaTransporte.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { RangeComponent } from './range/range.component';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule, TooltipModule],
    declarations: [
        UserEmpresaTransporteComponent,
        NewComponent,
        EditComponent,
        RangeComponent,
    ],
    exports: [
        UserEmpresaTransporteComponent,
        NewComponent,
        EditComponent,
        RangeComponent,
    ],
    providers: [
        UserEmpresaTransporteService,
    ]
})

export class UserEmpresaTransporteModule { }
