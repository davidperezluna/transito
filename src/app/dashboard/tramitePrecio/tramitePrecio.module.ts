import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TramitePrecioComponent } from './tramitePrecio.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {TramitePrecioService} from '../../services/tramitePrecio.service';
import {TipoVehiculoService} from '../../services/tipoVehiculo.service';
import {ParametroService} from '../../services/parametro.service';

import {ConceptoParametroTramiteService} from '../../services/conceptoParameTrotramite.service';

import { NewComponent } from './new/new.component';
import { NewSmlmvComponent } from './smlmv/smlmv.component';
import { CalculoComponent } from './calculo/calculo.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';
import { SortableModule } from 'ngx-bootstrap/sortable';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule,SortableModule.forRoot()],
    declarations: [TramitePrecioComponent,NewComponent,EditComponent,NewSmlmvComponent,CalculoComponent],
    exports: [TramitePrecioComponent, NewComponent,EditComponent,NewSmlmvComponent,CalculoComponent],
    providers:[TramitePrecioService,TipoVehiculoService,ParametroService,ConceptoParametroTramiteService]
})

export class TramitePrecioModule { }
