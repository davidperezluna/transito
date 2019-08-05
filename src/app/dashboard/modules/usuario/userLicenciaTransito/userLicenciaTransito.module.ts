import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLicenciaTransitoComponent } from './userLicenciaTransito.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { UserLicenciaTransitoService } from '../../../../services/userLicenciaTransito.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

import { TooltipModule } from "ngx-tooltip";

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule, TooltipModule],
    declarations: [UserLicenciaTransitoComponent, NewComponent, EditComponent],
    exports: [UserLicenciaTransitoComponent, NewComponent, EditComponent],
    providers: [UserLicenciaTransitoService]
})

export class UserLicenciaTransitoModule { }
