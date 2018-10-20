import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCfgMenuComponent } from './userCfgMenu.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { UserCfgMenuService } from '../../services/userCfgMenu.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [UserCfgMenuComponent,NewComponent,EditComponent],
    exports: [UserCfgMenuComponent, NewComponent,EditComponent],
    providers:[UserCfgMenuService]     
})

export class UserCfgMenuModule { }
