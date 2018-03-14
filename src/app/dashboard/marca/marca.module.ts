import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MarcaComponent } from './marca.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {MarcaService} from '../../services/marca.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
// import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot()],
    declarations: [MarcaComponent,NewComponent,EditComponent],
    exports: [MarcaComponent, NewComponent,EditComponent],
    providers:[MarcaService]
})

export class MarcaModule { }
