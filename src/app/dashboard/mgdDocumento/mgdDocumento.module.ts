import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MgdDocumentoComponent } from './mgdDocumento.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { MgdDocumentoService } from '../../services/mgdDocumento.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component';
import { PrintComponent } from './print/print.component';
import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [MgdDocumentoComponent,NewComponent,EditComponent,ShowComponent,PrintComponent],
    exports: [MgdDocumentoComponent, NewComponent,EditComponent,ShowComponent,PrintComponent],
    providers:[MgdDocumentoService]
})

export class MgdDocumentoModule { }
