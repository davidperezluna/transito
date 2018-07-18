import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { rnaAsignacionInsumosComponent } from './rnaAsignacionInsumos.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {SelectModule} from 'angular2-select';
import { NewComponent } from './new/new.component';
import {RnaInsumoService} from '../../services/rnaInsumos.service';
import { CasoInsumoService } from '../../services/casoInsumo.service';
import { EditComponent } from './edit/edit.component';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [rnaAsignacionInsumosComponent,NewComponent,EditComponent],
    exports: [rnaAsignacionInsumosComponent,NewComponent,EditComponent],
    providers:[RnaInsumoService,CasoInsumoService]
})

export class rnaAsignacionInsumosModule { }