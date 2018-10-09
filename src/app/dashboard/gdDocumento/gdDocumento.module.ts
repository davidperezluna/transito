import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GdDocumentoComponent } from './gdDocumento.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { GdDocumentoService } from '../../services/gdDocumento.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component';
import { PrintComponent } from './print/print.component';
import { NewCiudadanoComponent } from './newCiudadano/newCiudadano.component';
import { SelectModule } from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [GdDocumentoComponent,NewComponent,EditComponent,ShowComponent,PrintComponent,NewCiudadanoComponent],
    exports: [GdDocumentoComponent, NewComponent,EditComponent,ShowComponent,PrintComponent,NewCiudadanoComponent],
    providers:[GdDocumentoService]
})

export class GdDocumentoModule { }
