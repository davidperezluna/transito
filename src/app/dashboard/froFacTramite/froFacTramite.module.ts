import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FroFacTramiteComponent } from './froFacTramite.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { FroFacTramiteService } from '../../services/froFacTramite.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [FroFacTramiteComponent,NewComponent,EditComponent],
    exports: [FroFacTramiteComponent, NewComponent,EditComponent],
    providers:[FroFacTramiteService]
})

export class FroFacTramiteModule { }
