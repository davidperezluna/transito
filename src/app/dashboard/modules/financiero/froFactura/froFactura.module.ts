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
import { FroTrtePrecioService } from '../../../../services/froTrtePrecio.service';
import { FroFacTramiteService } from '../../../../services/froFacTramite.service';
import { CfgModuloService } from '../../../../services/cfgModulo.service';
import { VhloPropietarioService } from '../../../../services/vhloPropietario.service';
import { VhloVehiculoService } from '../../../../services/vhloVehiculo.service';
import { VhloValorService } from '../../../../services/vholCfgValor.service';

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
        FroTrtePrecioService,
        FroFacTramiteService,
        CfgModuloService,
        VhloPropietarioService,
        VhloVehiculoService,
        VhloValorService,
    ]
})

export class FroFacturaModule { }
