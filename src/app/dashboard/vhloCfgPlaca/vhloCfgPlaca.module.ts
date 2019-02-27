import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VhloCfgPlacaComponent } from './vhloCfgPlaca.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { VhloCfgPlacaService } from '../../services/vhloCfgPlaca.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';
// import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [VhloCfgPlacaComponent,NewComponent,EditComponent],
    exports: [VhloCfgPlacaComponent, NewComponent,EditComponent],
    providers:[VhloCfgPlacaService]
})

export class VhloCfgPlacaModule { }
