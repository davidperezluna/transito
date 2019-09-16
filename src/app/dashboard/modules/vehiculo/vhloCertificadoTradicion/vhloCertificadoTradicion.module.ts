import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'angular2-select';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

import { VhloCfgMarcaService } from '../../../../services/vhloCfgMarca.service';
import { VhloVehiculoService } from '../../../../services/vhloVehiculo.service';
import { PnalFuncionarioService } from '../../../../services/pnalFuncionario.service';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule,],
    declarations: [],
    exports: [],
    providers:[
        VhloCfgMarcaService,
        VhloVehiculoService,
        PnalFuncionarioService,
    ]
})

export class VhloCertificadoTradicionModule { }
