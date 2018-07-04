import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MparqEntradaComponent } from './mparqEntrada.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { MparqEntradaService } from '../../services/mparqEntrada.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [MparqEntradaComponent,NewComponent,EditComponent],
    exports: [MparqEntradaComponent, NewComponent,EditComponent],
    providers:[MparqEntradaService]
})

export class MparqEntradaModule { }
