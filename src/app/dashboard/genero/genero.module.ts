import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GeneroComponent } from './genero.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { GeneroService } from '../../services/genero.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [GeneroComponent,NewComponent,EditComponent],
    exports: [GeneroComponent, NewComponent,EditComponent],
    providers:[GeneroService]
})

export class GeneroModule { }
