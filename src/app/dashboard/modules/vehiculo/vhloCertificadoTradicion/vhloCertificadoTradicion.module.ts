import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectModule } from 'angular2-select';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

import { VhloCertificadoTradicionComponent } from './vhloCertificadoTradicion.component';

import { VhloCfgMarcaService } from '../../../../services/vhloCfgMarca.service';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule,],
    declarations: [VhloCertificadoTradicionComponent],
    exports: [VhloCertificadoTradicionComponent],
    providers:[VhloCfgMarcaService]
})

export class VhloCertificadoTradicionModule { }
