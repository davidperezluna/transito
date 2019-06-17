import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'angular2-select';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

import { BpInsumoComponent } from './bpInsumo.component';
import { BpInsumoService } from '../../services/bpInsumo.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [BpInsumoComponent,NewComponent,EditComponent],
    exports: [BpInsumoComponent, NewComponent,EditComponent],
    providers:[BpInsumoService]
})

export class BpInsumoModule { }
