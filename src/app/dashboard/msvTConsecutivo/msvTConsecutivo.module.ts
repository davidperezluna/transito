import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsvTConsecutivoComponent } from './msvTConsecutivo.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { MsvTConsecutivoService } from '../../services/msvTConsecutivo.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
declarations: [MsvTConsecutivoComponent/*,NewComponent,EditComponent*/],
    exports: [MsvTConsecutivoComponent/*, NewComponent,EditComponent*/],
    providers: [MsvTConsecutivoService]
})

export class MsvTConsecutivoModule { }
