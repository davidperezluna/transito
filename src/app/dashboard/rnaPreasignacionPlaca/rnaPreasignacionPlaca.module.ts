import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RnaPreasignacionPlacaComponent } from './rnaPreasignacionPlaca.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {VhloCfgColorService} from '../../services/vhloCfgColor.service';

import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [RnaPreasignacionPlacaComponent],
    exports: [RnaPreasignacionPlacaComponent],
    providers:[VhloCfgColorService]
})

export class RnaPreasignacionPlacaModule { }
