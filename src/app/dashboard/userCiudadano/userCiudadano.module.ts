import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCiudadanoComponent } from './userCiudadano.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { UserCiudadanoService } from '../../services/userCiudadano.service';

import { NewCiudadanoComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';
import { TooltipModule } from "ngx-tooltip";

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule, TooltipModule],
    declarations: [UserCiudadanoComponent,NewCiudadanoComponent,EditComponent],
    exports: [UserCiudadanoComponent, NewCiudadanoComponent,EditComponent],
    providers:[UserCiudadanoService]
})

export class UserCiudadanoModule { }
