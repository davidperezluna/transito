import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvCdoNotificacionComponent } from './cvCdoNotificacion.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { CvCdoNotificacionService } from '../../services/cvCdoNotificacion.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [CvCdoNotificacionComponent,NewComponent,EditComponent],
    exports: [CvCdoNotificacionComponent, NewComponent,EditComponent],
    providers:[CvCdoNotificacionService]
})

export class CvCdoNotificacionModule { }
