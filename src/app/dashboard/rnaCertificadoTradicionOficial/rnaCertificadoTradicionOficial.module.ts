import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { rnaCertificadoTradicionOficialComponent } from './rnaCertificadoTradicionOficial.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {MarcaService} from '../../services/marca.service';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot()],
    declarations: [rnaCertificadoTradicionOficialComponent],
    exports: [rnaCertificadoTradicionOficialComponent],
    providers:[MarcaService]
})

export class RnaCertificadoTradicionOficialModule { }
