import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCfgGrupoSanguineoComponent } from './userCfgGrupoSanguineo.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { UserCfgGrupoSanguineoService } from '../../../../services/userCfgGrupoSanguineo.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [UserCfgGrupoSanguineoComponent,NewComponent,EditComponent],
    exports: [UserCfgGrupoSanguineoComponent, NewComponent,EditComponent],
    providers:[UserCfgGrupoSanguineoService]
})

export class UserCfgGrupoSanguineoModule { }
