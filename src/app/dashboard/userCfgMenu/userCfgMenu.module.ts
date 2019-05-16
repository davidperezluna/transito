import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';
import { TooltipModule } from "ngx-tooltip";

import { UserCfgMenuComponent } from './userCfgMenu.component';
import { UserCfgMenuService } from '../../services/userCfgMenu.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule, TooltipModule],
    declarations: [UserCfgMenuComponent,NewComponent,EditComponent],
    exports: [UserCfgMenuComponent, NewComponent,EditComponent],
    providers:[UserCfgMenuService]     
})

export class UserCfgMenuModule { }
