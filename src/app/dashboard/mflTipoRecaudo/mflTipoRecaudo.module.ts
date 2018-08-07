import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MflTipoRecaudoComponent } from './mflTipoRecaudo.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { MflTipoRecaudoService } from '../../services/mflTipoRecaudo.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [MflTipoRecaudoComponent,NewComponent,EditComponent],
    exports: [MflTipoRecaudoComponent, NewComponent,EditComponent],
    providers:[MflTipoRecaudoService]
})

export class MflTipoRecaudoModule { }
