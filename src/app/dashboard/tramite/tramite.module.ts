import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TramiteComponent } from './tramite.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { TramiteService } from '../../services/tramite.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [TramiteComponent,NewComponent,EditComponent],
    exports: [TramiteComponent, NewComponent,EditComponent],
    providers:[TramiteService]
})

export class TramiteModule { }
