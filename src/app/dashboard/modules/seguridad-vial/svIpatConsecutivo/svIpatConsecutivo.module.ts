import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvIpatConsecutivoService } from '../../../../services/svIpatConsecutivo.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
declarations: [NewComponent,EditComponent],
    exports: [NewComponent,EditComponent],
    providers: [SvIpatConsecutivoService]
})

export class SvIpatConsecutivoModule { }
