import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TramiteSolicitudRncComponent } from './tramiteSolicitudRnc.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { TramiteSolicitudRncService } from '../../services/tramiteSolicitudRnc.service';
import { EmpresaService } from '../../services/empresa.service';
import { AlertaService } from '../../services/alerta.service';

import { NewRncComponent } from './newRnc/newRnc.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [
        TramiteSolicitudRncComponent,
        NewRncComponent,
        EditComponent
    ],
    exports: [
        TramiteSolicitudRncComponent,
        NewRncComponent,
        EditComponent
    ],
    providers:[TramiteSolicitudRncService,EmpresaService,AlertaService]
})

export class TramiteSolicitudRncModule { }
