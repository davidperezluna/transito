import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'angular2-select';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { TooltipModule } from "ngx-tooltip"; 

import { SvIpatImpresoMunicipioService } from '../../../../services/svIpatImpresoMunicipio.service';
import { PnalFuncionarioService } from '../../../../services/pnalFuncionario.service';
import { CfgMunicipioService } from '../../../../services/cfgMunicipio.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule, TooltipModule],
    declarations: [NewComponent,EditComponent],
    exports: [NewComponent,EditComponent],
    providers:[
        SvIpatImpresoMunicipioService,
        PnalFuncionarioService,
        CfgMunicipioService,
    ]
})

export class SvIpatImpresoMunicipioModule { }
