import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImoPreasignacionComponent } from './imoPreasignacion.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';
import { ImoInsumoService } from '../../services/imoInsumo.service';
import { ImoAsignacionService } from '../../services/imoAsignacion.service';
import { ImoCfgTipoService } from '../../services/imoCfgTipo.service';
import { ImoTrazabilidadService } from '../../services/imoTrazabilidad.service';
import { NewComponent } from './new/new.component';
import { ShowComponent } from './show/show.component';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [ImoPreasignacionComponent,NewComponent,ShowComponent],
    exports: [ImoPreasignacionComponent,NewComponent,ShowComponent],
    providers:[ImoInsumoService,ImoCfgTipoService,ImoTrazabilidadService,ImoAsignacionService]
})

export class ImoPreasignacionModule { }