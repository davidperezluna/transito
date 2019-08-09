import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';

import { GdTrazabilidadService } from '../../../../services/gdTrazabilidad.service';
import { GdDocumentoService } from '../../../../services/gdDocumento.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component'; 


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [NewComponent,EditComponent,ShowComponent],
    exports: [NewComponent,EditComponent,ShowComponent],
    providers:[GdTrazabilidadService,GdDocumentoService]
})

export class GdTrazabilidadModule { }
 