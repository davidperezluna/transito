import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { rnaRegistroInsumosComponent } from './rnaRegistroInsumos.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {SelectModule} from 'angular2-select';
import { NewComponent } from './new/new.component';
import {RnaLoteInsumoService} from '../../services/rnaloteInsumos.service';
import { CfgCasoInsumoService } from '../../services/cfgCasoInsumo.service';
import { EditComponent } from './edit/edit.component';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [rnaRegistroInsumosComponent,NewComponent,EditComponent],
    exports: [rnaRegistroInsumosComponent,NewComponent,EditComponent],
    providers: [RnaLoteInsumoService,CfgCasoInsumoService]
})

export class rnaRegistroInsumosModule { }