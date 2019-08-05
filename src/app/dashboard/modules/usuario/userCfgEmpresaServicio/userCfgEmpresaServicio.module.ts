import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCfgEmpresaServicioComponent } from './userCfgEmpresaServicio.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { UserCfgEmpresaServicioService } from '../../../../services/userCfgEmpresaServicio.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [UserCfgEmpresaServicioComponent,NewComponent,EditComponent],
    exports: [UserCfgEmpresaServicioComponent, NewComponent,EditComponent],
    providers:[UserCfgEmpresaServicioService]
})

export class UserCfgEmpresaServicioModule { }
