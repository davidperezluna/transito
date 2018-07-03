import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MparqGruaComponent } from './mparqGrua.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { MparqGruaService } from '../../services/mparqGrua.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component';
import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [MparqGruaComponent,NewComponent,EditComponent,ShowComponent],
    exports: [MparqGruaComponent, NewComponent,EditComponent,ShowComponent],
    providers:[MparqGruaService]
})

export class MparqGruaModule { }
