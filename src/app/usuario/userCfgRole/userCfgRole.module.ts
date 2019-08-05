import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCfgRoleComponent } from './userCfgRole.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { UserCfgRoleService } from '../../services/userCfgRole.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [UserCfgRoleComponent,NewComponent,EditComponent],
    exports: [UserCfgRoleComponent, NewComponent,EditComponent],
    providers:[UserCfgRoleService]     
})

export class UserCfgRoleModule { }
