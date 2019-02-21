import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VhloPlacaSedeComponent } from './vhloPlacaSede.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { VhloPlacaSedeService } from '../../services/vhloPlacaSede.service';

import { NewVhloPlacaSedeComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [VhloPlacaSedeComponent, NewVhloPlacaSedeComponent, EditComponent],
    exports: [VhloPlacaSedeComponent, NewVhloPlacaSedeComponent, EditComponent],
    providers: [VhloPlacaSedeService]
})

export class VhloPlacaSedeModule { }
