import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MgdRegistroComponent } from './mgdRegistro.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { MgdPeticionarioService } from '../../services/mgdPeticionario.service';
import { MgdDocumentoService } from '../../services/mgdDocumento.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [MgdRegistroComponent,NewComponent,EditComponent],
    exports: [MgdRegistroComponent, NewComponent,EditComponent],
    providers:[MgdPeticionarioService,MgdDocumentoService]
})

export class MgdRegistroModule { }
 