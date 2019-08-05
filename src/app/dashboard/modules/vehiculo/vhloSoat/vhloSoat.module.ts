import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VhloSoatComponent } from './vhloSoat.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { VhloSoatService } from '../../../../services/vhloSoat.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [VhloSoatComponent,NewComponent,EditComponent],
    exports: [VhloSoatComponent, NewComponent,EditComponent],
    providers: [VhloSoatService]
})

export class VhloSoatModule { }
