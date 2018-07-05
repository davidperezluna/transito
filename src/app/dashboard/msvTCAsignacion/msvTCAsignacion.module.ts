import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsvTCAsignacionComponent } from './msvTCAsignacion.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { MsvTCAsignacionService } from '../../services/msvTCAsignacion.service';
import { MsvTConsecutivoService } from '../../services/msvTConsecutivo.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component';
import { SelectModule } from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [MsvTCAsignacionComponent,NewComponent,EditComponent,ShowComponent],
    exports: [MsvTCAsignacionComponent, NewComponent,EditComponent,ShowComponent],
    providers:[MsvTCAsignacionService,MsvTConsecutivoService]
})

export class MsvTCAsignacionModule { }
