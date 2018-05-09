import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestionDocumentosComponent } from './gestionDocumentos.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { PeticionarioService } from '../../services/peticionario.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [GestionDocumentosComponent,NewComponent,EditComponent],
    exports: [GestionDocumentosComponent, NewComponent,EditComponent],
    providers:[PeticionarioService]
})

export class GestionDocumentosModule { }
 