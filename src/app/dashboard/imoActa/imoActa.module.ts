import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImoActaComponent } from './imoActa.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { ImoCfgTipoService } from '../../services/imoCfgTipo.service';
import { ImoCfgValorService } from '../../services/imoCfgValor.service';


import {SelectModule} from 'angular2-select';
import { TooltipModule } from "ngx-tooltip";


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule, TooltipModule],
    declarations: [ImoActaComponent],
    exports: [ImoActaComponent],
    providers:[ImoCfgTipoService,ImoCfgValorService]
})

export class ImoActaModule { }
