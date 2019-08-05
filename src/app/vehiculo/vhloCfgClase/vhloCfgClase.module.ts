import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VhloCfgClaseComponent } from './vhloCfgClase.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {VhloCfgClaseService} from '../../services/vhloCfgClase.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';
// import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [VhloCfgClaseComponent,NewComponent,EditComponent],
    exports: [VhloCfgClaseComponent, NewComponent,EditComponent],
    providers:[VhloCfgClaseService]
})

export class VhloCfgClaseModule { }
