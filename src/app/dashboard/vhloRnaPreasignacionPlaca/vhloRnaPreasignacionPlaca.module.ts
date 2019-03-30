import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VhloRnaPreasignacionPlacaComponent } from './vhloRnaPreasignacionPlaca.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {SelectModule} from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [VhloRnaPreasignacionPlacaComponent],
    exports: [VhloRnaPreasignacionPlacaComponent],
    providers:[]
})

export class VhloRnaPreasignacionPlacaModule { }
