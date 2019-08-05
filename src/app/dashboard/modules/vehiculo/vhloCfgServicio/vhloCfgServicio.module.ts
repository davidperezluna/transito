import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VhloCfgServicioComponent } from './vhloCfgServicio.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {VhloCfgServicioService} from '../../../../services/vhloCfgServicio.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
// import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot()],
    declarations: [VhloCfgServicioComponent,NewComponent,EditComponent],
    exports: [VhloCfgServicioComponent, NewComponent,EditComponent],
    providers:[VhloCfgServicioService]
})

export class VhloCfgServicioModule { }
