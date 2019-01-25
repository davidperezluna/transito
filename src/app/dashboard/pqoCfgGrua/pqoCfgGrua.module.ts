import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PqoCfgGruaComponent } from './pqoCfgGrua.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { PqoCfgGruaService } from '../../services/pqoCfgGrua.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component';
import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [PqoCfgGruaComponent,NewComponent,EditComponent,ShowComponent],
    exports: [PqoCfgGruaComponent, NewComponent,EditComponent,ShowComponent],
    providers:[PqoCfgGruaService]
})

export class PqoCfgGruaModule { }
