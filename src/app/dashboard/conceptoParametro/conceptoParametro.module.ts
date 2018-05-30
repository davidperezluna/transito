import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {ConceptoParametroService} from '../../services/conceptoParametro.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { ConceptoParametroComponent } from './conceptoParametro.component';
// import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot()],
    declarations: [ConceptoParametroComponent,NewComponent,EditComponent],
    exports: [ConceptoParametroComponent,NewComponent,EditComponent],
    providers:[ConceptoParametroService]
})

export class ConpetoParametroModule { }
