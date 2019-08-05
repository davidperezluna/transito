import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { imoAsignacionComponent } from './imoAsignacion.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {SelectModule} from 'angular2-select';
import { NewComponent } from './new/new.component';
import {ImoInsumoService} from '../../../../services/imoInsumo.service';
import { ImoCfgTipoService } from '../../../../services/imoCfgTipo.service';
import { EditComponent } from './edit/edit.component';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [imoAsignacionComponent,NewComponent,EditComponent],
    exports: [imoAsignacionComponent,NewComponent,EditComponent],
    providers:[ImoInsumoService,ImoCfgTipoService]
})

export class ImoAsignacionModule { }