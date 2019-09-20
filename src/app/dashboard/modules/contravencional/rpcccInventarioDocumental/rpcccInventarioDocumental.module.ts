import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { CvCdoCfgEstadoService } from '../../../../services/cvCdoCfgEstado.service';

import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [],
    exports: [],
    providers:[CvCdoCfgEstadoService]
})

export class RpcccInventarioDocumentalModule { }
