import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserCfgGeneroComponent } from './userCfgGenero.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { UserCfgGeneroService } from '../../../../services/userCfgGenero.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [UserCfgGeneroComponent,NewComponent,EditComponent],
    exports: [UserCfgGeneroComponent, NewComponent,EditComponent],
    providers: [UserCfgGeneroService]
})

export class UserCfgGeneroModule { }
