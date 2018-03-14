import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LineaComponent } from './linea.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {LineaService} from '../../services/linea.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [LineaComponent,NewComponent,EditComponent],
    exports: [LineaComponent, NewComponent,EditComponent],
    providers:[LineaService]
})

export class LineaModule { }
