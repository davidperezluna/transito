import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { rpcccInventarioDocumentalComponent } from './rpcccInventarioDocumental.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { CfgComparendoEstadoService } from '../../services/cfgComparendoEstado.service';

import { SelectModule } from 'angular2-select';
import { ExportComponent } from './export/export.component';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [rpcccInventarioDocumentalComponent, ExportComponent],
    exports: [rpcccInventarioDocumentalComponent, ExportComponent],
    providers:[CfgComparendoEstadoService]
})

export class RpcccInventarioDocumentalModule { }
