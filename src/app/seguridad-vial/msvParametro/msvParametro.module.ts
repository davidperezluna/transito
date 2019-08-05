import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsvParametroComponent } from './msvParametro.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { MsvParametroService } from '../../services/msvParametro.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [MsvParametroComponent, NewComponent, EditComponent],
    exports: [MsvParametroComponent, NewComponent, EditComponent],
    providers: [MsvParametroService]
})

export class MsvParametroModule { }
