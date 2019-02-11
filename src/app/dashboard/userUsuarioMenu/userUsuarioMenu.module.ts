import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserUsuarioMenuComponent } from './userUsuarioMenu.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { UserUsuarioMenuService } from '../../services/userUsuarioMenu.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [UserUsuarioMenuComponent,NewComponent,EditComponent],
    exports: [UserUsuarioMenuComponent, NewComponent,EditComponent],
    providers:[UserUsuarioMenuService]     
})

export class UserUsuarioMenuModule { }
