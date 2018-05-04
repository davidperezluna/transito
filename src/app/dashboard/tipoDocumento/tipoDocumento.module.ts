import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoDocumentoComponent } from './tipoDocumento.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { TipoDocumentoService} from '../../services/tipoDocumento.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [TipoDocumentoComponent,NewComponent,EditComponent],
    exports: [TipoDocumentoComponent, NewComponent,EditComponent],
    providers:[TipoDocumentoService]
})

export class TipoDocumentoModule { }
