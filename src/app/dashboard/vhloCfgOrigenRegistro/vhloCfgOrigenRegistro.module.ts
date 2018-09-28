import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VhloCfgOrigenRegistroComponent } from './vhloCfgOrigenRegistro.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { VhloCfgOrigenRegistroService } from '../../services/vhloCfgOrigenRegistro.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [VhloCfgOrigenRegistroComponent,NewComponent,EditComponent],
    exports: [VhloCfgOrigenRegistroComponent, NewComponent,EditComponent],
    providers: [VhloCfgOrigenRegistroService]
})

export class VhloCfgOrigenRegistroModule { }
