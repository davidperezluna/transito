import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TramiteSolicitudRpcccComponent } from './tramiteSolicitudRpccc.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { TramiteSolicitudRpcccService } from '../../services/tramiteSolicitudRpccc.service';

import { NewRpcccSustratoComponent } from './newRpcccSustrato/newRpcccSustrato.component';
import { NewRpcccCiudadanoComponent } from './newRpcccCiudadano/newRpcccCiudadano.component';
import { NewRpcccExpedicionPazySalvoComponent } from './rpccc/tramiteExpedicionPazySalvo/newRpcccExpedicionPazySalvo.component';

import { NewRpcccComponent } from './newRpccc/newRpccc.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [
        TramiteSolicitudRpcccComponent,
        NewRpcccComponent,
        EditComponent,
        NewRpcccSustratoComponent,
        NewRpcccCiudadanoComponent,
        NewRpcccExpedicionPazySalvoComponent
    ],
    exports: [
        TramiteSolicitudRpcccComponent,
        NewRpcccComponent,
        EditComponent,
        NewRpcccSustratoComponent,
        NewRpcccCiudadanoComponent,
        NewRpcccExpedicionPazySalvoComponent
    ],
    providers: [TramiteSolicitudRpcccService]
})

export class TramiteSolicitudRpcccModule { }
