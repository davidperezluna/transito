import { NgModule, NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { UserUsuarioMenuService } from '../../../../services/userUsuarioMenu.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';

@NgModule({
    imports: [CommonModule, FormsModule],
    declarations: [NewComponent,EditComponent,DeleteComponent],
    exports: [ NewComponent,EditComponent,DeleteComponent],
    providers:[UserUsuarioMenuService],
    schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]    
})

export class UserUsuarioMenuModule { }
