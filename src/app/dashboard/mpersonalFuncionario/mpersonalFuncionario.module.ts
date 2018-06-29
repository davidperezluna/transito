import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MpersonalFuncionarioComponent } from './mpersonalFuncionario.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { MpersonalFuncionarioService } from '../../services/mpersonalFuncionario.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [MpersonalFuncionarioComponent,NewComponent,EditComponent],
    exports: [MpersonalFuncionarioComponent, NewComponent,EditComponent],
    providers:[MpersonalFuncionarioService]
})

export class MpersonalFuncionarioModule { }
