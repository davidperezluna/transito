import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsvConsecutivoComponent } from './msvConsecutivo.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { MsvConsecutivoService } from '../../services/msvConsecutivo.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
declarations: [MsvConsecutivoComponent,NewComponent,EditComponent],
    exports: [MsvConsecutivoComponent, NewComponent,EditComponent],
    providers: [MsvConsecutivoService]
})

export class MsvConsecutivoModule { }
