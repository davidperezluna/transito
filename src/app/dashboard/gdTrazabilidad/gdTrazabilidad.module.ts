import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GdTrazabilidadComponent } from './gdTrazabilidad.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { MgdPeticionarioService } from '../../services/gdPeticionario.service';
import { GdRemitenteService } from '../../services/gdRemitente.service';
import { GdDocumentoService } from '../../services/gdDocumento.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component'; 
import { SelectModule } from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [GdTrazabilidadComponent,NewComponent,EditComponent,ShowComponent],
    exports: [GdTrazabilidadComponent, NewComponent,EditComponent,ShowComponent],
    providers:[GdRemitenteService,MgdPeticionarioService,GdDocumentoService]
})

export class GdTrazabilidadModule { }
 