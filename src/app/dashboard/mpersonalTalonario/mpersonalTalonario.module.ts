import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MpersonalTalonarioComponent } from './mpersonalTalonario.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { MpersonalTalonarioService } from '../../services/mpersonalTalonario.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [MpersonalTalonarioComponent,NewComponent,EditComponent],
    exports: [MpersonalTalonarioComponent, NewComponent,EditComponent],
    providers:[MpersonalTalonarioService]
})

export class MpersonalTalonarioModule { }
