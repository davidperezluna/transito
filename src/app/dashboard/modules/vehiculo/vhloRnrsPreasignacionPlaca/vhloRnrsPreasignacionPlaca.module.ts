import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';

import { VhloRnrsPreasignacionPlacaComponent } from './vhloRnrsPreasignacionPlaca.component';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [VhloRnrsPreasignacionPlacaComponent],
    exports: [VhloRnrsPreasignacionPlacaComponent],
    providers:[]
})

export class VhloRnrsPreasignacionPlacaModule { }
