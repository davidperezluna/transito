import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCfgGrupoEtnicoComponent } from './userCfgGrupoEtnico.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { UserCfgGrupoEtnicoService } from '../../services/userCfgGrupoEtnico.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [UserCfgGrupoEtnicoComponent, NewComponent, EditComponent],
    exports: [UserCfgGrupoEtnicoComponent, NewComponent, EditComponent],
    providers: [UserCfgGrupoEtnicoService]
})

export class UserCfgGrupoEtnicoModule { }
