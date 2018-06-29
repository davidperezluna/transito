import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MpersonalTipoContratoComponent } from './mpersonalTipoContrato.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { MpersonalTipoContratoService } from '../../services/mpersonalTipoContrato.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [MpersonalTipoContratoComponent,NewComponent,EditComponent],
    exports: [MpersonalTipoContratoComponent, NewComponent,EditComponent],
    providers:[MpersonalTipoContratoService]
})

export class MpersonalTipoContratoModule { }
