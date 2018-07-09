import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsvAsignacionComponent } from './msvAsignacion.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { MsvAsignacionService } from '../../services/msvAsignacion.service';
import { MsvConsecutivoService } from '../../services/msvConsecutivo.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component';
import { SelectModule } from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [MsvAsignacionComponent,NewComponent,EditComponent,ShowComponent],
    exports: [MsvAsignacionComponent, NewComponent,EditComponent,ShowComponent],
    providers:[MsvAsignacionService,MsvConsecutivoService]
})

export class MsvAsignacionModule { }
