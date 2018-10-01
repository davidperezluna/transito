import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MgdRegistroComponent } from './mgdRegistro.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { MgdPeticionarioService } from '../../services/mgdPeticionario.service';
import { MgdRemitenteService } from '../../services/mgdRemitente.service';
import { MgdDocumentoService } from '../../services/mgdDocumento.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component'; 
import { NewCiudadanoComponent } from './newCiudadano/newCiudadano.component';
import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [MgdRegistroComponent,NewComponent,EditComponent,ShowComponent,NewCiudadanoComponent],
    exports: [MgdRegistroComponent, NewComponent,EditComponent,ShowComponent,NewCiudadanoComponent],
    providers:[MgdRemitenteService,MgdPeticionarioService,MgdDocumentoService]
})

export class MgdRegistroModule { }
 