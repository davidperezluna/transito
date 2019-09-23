import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { ChartsModule } from 'ng2-charts';
import {SelectModule} from 'angular2-select';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';

import { VhloRemolqueService } from '../../../../services/vhloRemolque.service';
import { VhloCfgCarroceriaService } from '../../../../services/vhloCfgCarroceria.service';
import { VhloCfgMarcaService } from '../../../../services/vhloCfgMarca.service';
import { VhloCfgLineaService } from '../../../../services/vhloCfgLinea.service';
import { VhloCfgOrigenRegistroService } from '../../../../services/vhloCfgOrigenRegistro.service';
import { VhloCfgCondicionIngresoService } from '../../../../services/vhloCfgCondicionIngreso.service';
import { VhloCfgClaseService } from '../../../../services/vhloCfgClase.service';
import { PnalFuncionarioService } from '../../../../services/pnalFuncionario.service';
import { CfgOrganismoTransitoService } from '../../../../services/cfgOrganismoTransito.service';


@NgModule({
    declarations: [NewComponent,EditComponent],
    imports: [CommonModule, ChartsModule, Ng2BootstrapModule.forRoot(),SelectModule],
    exports: [NewComponent,EditComponent],
    providers:[
        VhloRemolqueService,
        VhloCfgCarroceriaService,
        VhloCfgMarcaService,
        VhloCfgLineaService,
        VhloCfgOrigenRegistroService,
        VhloCfgCondicionIngresoService,
        VhloCfgClaseService,
        PnalFuncionarioService,
        CfgOrganismoTransitoService,
    ]
})
 
export class VhloRnrsPreregistroModule { }
