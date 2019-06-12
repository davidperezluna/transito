import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VhloCertificadoTradicionComponent } from './vhloCertificadoTradicion.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {VhloCfgMarcaService} from '../../services/vhloCfgMarca.service';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot()],
    declarations: [VhloCertificadoTradicionComponent],
    exports: [VhloCertificadoTradicionComponent],
    providers:[VhloCfgMarcaService]
})

export class VhloCertificadoTradicionModule { }
