import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCiudadanoService } from '../../../../services/userCiudadano.service';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

import { NewCiudadanoComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component';
import { SelectModule } from 'angular2-select';
import { TooltipModule } from "ngx-tooltip";

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule, TooltipModule],
    declarations: [
        NewCiudadanoComponent,
        EditComponent,
        ShowComponent
    ],
    exports: [
        NewCiudadanoComponent,
        EditComponent,
        ShowComponent
    ],
    providers:[UserCiudadanoService]
})

export class UserCiudadanoModule { }