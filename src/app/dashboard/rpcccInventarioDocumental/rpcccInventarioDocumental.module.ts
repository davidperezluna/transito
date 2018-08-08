import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { rpcccInventarioDocumentalComponent } from './rpcccInventarioDocumental.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

import { SelectModule } from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [rpcccInventarioDocumentalComponent],
    exports: [rpcccInventarioDocumentalComponent],
    providers:[]
})

export class RpcccInventarioDocumentalModule { }
