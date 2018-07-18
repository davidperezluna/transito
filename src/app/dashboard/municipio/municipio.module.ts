import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MunicipioComponent } from './municipio.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {MunicipioService} from '../../services/municipio.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [MunicipioComponent,NewComponent,EditComponent],
    exports: [MunicipioComponent, NewComponent,EditComponent], 
    providers:[MunicipioService]
})

export class MunicipioModule { }
