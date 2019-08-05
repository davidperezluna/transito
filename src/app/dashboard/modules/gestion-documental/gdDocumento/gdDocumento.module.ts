import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GdDocumentoComponent } from './gdDocumento.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { GdDocumentoService } from '../../../../services/gdDocumento.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component';
import { PrintComponent } from './print/print.component';
import { TemplateComponent } from './template/template.component';
import { SearchComponent } from './search/search.component';
import { RecordComponent } from './record/record.component';
import { NewCiudadanoComponent } from './newCiudadano/newCiudadano.component';
import { SelectModule } from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [GdDocumentoComponent, NewComponent, EditComponent, ShowComponent, PrintComponent, TemplateComponent, SearchComponent, RecordComponent,NewCiudadanoComponent],
    exports: [GdDocumentoComponent, NewComponent, EditComponent, ShowComponent, PrintComponent, TemplateComponent, SearchComponent, RecordComponent, NewCiudadanoComponent],
    providers:[GdDocumentoService]
})

export class GdDocumentoModule { }
