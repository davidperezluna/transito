import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VhloCfgMarcaComponent } from './vhloCfgMarca.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {VhloCfgMarcaService} from '../../services/vhloCfgMarca.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
// import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot()],
    declarations: [VhloCfgMarcaComponent,NewComponent,EditComponent],
    exports: [VhloCfgMarcaComponent, NewComponent,EditComponent],
    providers:[VhloCfgMarcaService]
})

export class VhloCfgMarcaModule { }
