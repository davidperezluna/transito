import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { rnaCertificadoTradicionOficialComponent } from './rnaCertificadoTradicionOficial.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {VhloCfgMarcaService} from '../../services/vhloCfgMarca.service';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot()],
    declarations: [rnaCertificadoTradicionOficialComponent],
    exports: [rnaCertificadoTradicionOficialComponent],
    providers:[VhloCfgMarcaService]
})

export class RnaCertificadoTradicionOficialModule { }
