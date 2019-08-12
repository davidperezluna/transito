import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';

import { BpCdpService } from '../../../../services/bpCdp.service';
import { BpProyectoService } from '../../../../services/bpProyecto.service';
import { BpActividadService } from '../../../../services/bpActividad.service';
import { BpRegistroCompromisoService } from '../../../../services/bpRegistroCompromiso.service';
import { PnalFuncionarioService } from '../../../../services/pnalFuncionario.service';
import { UserCfgTipoIdentificacionService } from '../../../../services/userCfgTipoIdentificacion.service';
import { UserCiudadanoService } from '../../../../services/userCiudadano.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [NewComponent, EditComponent],
    exports: [NewComponent, EditComponent],
    providers: [
        BpCdpService,
        BpProyectoService,
        BpActividadService,
        BpRegistroCompromisoService,
        PnalFuncionarioService,
        UserCfgTipoIdentificacionService,
        UserCiudadanoService,
    ]
})

export class BpRegistroCompromisoModule { }
