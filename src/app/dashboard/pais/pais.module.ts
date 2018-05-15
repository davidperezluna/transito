import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaisComponent } from './pais.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { PaisService } from '../../services/pais.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [PaisComponent,NewComponent,EditComponent],
    exports: [PaisComponent, NewComponent,EditComponent],
    providers:[PaisService]
})

export class PaisModule { }
