import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GdTrazabilidadComponent } from './gdTrazabilidad.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { GdTrazabilidadService } from '../../services/gdTrazabilidad.service';
import { GdDocumentoService } from '../../services/gdDocumento.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component'; 
import { SelectModule } from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [GdTrazabilidadComponent,NewComponent,EditComponent,ShowComponent],
    exports: [GdTrazabilidadComponent, NewComponent,EditComponent,ShowComponent],
    providers:[GdTrazabilidadService,GdDocumentoService]
})

export class GdTrazabilidadModule { }
 