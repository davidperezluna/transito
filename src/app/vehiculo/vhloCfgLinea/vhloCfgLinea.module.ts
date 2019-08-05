import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VhloCfgLineaComponent } from './vhloCfgLinea.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {VhloCfgLineaService} from '../../services/vhloCfgLinea.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [VhloCfgLineaComponent,NewComponent,EditComponent],
    exports: [VhloCfgLineaComponent, NewComponent,EditComponent],
    providers:[VhloCfgLineaService]
})

export class VhloCfgLineaModule { }
