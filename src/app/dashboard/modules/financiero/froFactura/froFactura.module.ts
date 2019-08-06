import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';

import { FroFacturaService } from '../../../../services/froFactura.service';
import { PnalFuncionarioService } from '../../../../services/pnalFuncionario.service';
import { CvCdoComparendoService } from '../../../../services/cvCdoComparendo.service';
import { PqoInmovilizacionService } from '../../../../services/pqoInmovilizacion.service';
import { UserCfgTipoIdentificacionService } from '../../../../services/userCfgTipoIdentificacion.service';
import { UserCiudadanoService } from '../../../../services/userCiudadano.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';

import { UserCiudadanoModule } from '../../usuario/userCiudadano/userCiudadano.module';

@NgModule({
    imports: [
        CommonModule, 
        Ng2BootstrapModule.forRoot(),
        SelectModule,
        UserCiudadanoModule
    ],
    declarations: [
        NewComponent,
        EditComponent,
    ],
    exports: [ 
        NewComponent,
        EditComponent,
    ],
    providers:[
        FroFacturaService,
        PnalFuncionarioService,
        CvCdoComparendoService,
        PqoInmovilizacionService,
        UserCfgTipoIdentificacionService,
        UserCiudadanoService,
    ]
})

export class FroFacturaModule { }
