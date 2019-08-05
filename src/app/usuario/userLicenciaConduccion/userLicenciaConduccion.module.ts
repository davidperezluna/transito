import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserLicenciaConduccionComponent } from './userLicenciaConduccion.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { UserLicenciaConduccionService } from '../../services/userLicenciaConduccion.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [UserLicenciaConduccionComponent, NewComponent, EditComponent],
    exports: [UserLicenciaConduccionComponent, NewComponent, EditComponent],
    providers: [UserLicenciaConduccionService]
})

export class UserLicenciaConduccionModule { }
