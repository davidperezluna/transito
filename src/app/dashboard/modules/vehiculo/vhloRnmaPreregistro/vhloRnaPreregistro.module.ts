import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { ChartsModule } from 'ng2-charts';

import { VhloRnaPreregistroService } from '../../../../services/vhloRnaPreregistro.service';
import { VhloCfgCarroceriaService } from '../../../../services/vhloCfgCarroceria.service';
import { VhloCfgRadioAccionService } from '../../../../services/vhloCfgRadioAccion.service';
import { VhloCfgModalidadTransporteService } from '../../../../services/vhloCfgModalidadTransporte.service';
import { VhloRnaPreregistroComponent } from './vhloRnaPreregistro.component';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { NewCiudadanoComponent } from './newCiudadano/newCiudadano.component';
import { NewEmpresaComponent } from './newEmpresa/newEmpresa.component';

import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, ChartsModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [VhloRnaPreregistroComponent,NewComponent,EditComponent,NewCiudadanoComponent,NewEmpresaComponent],
    exports: [VhloRnaPreregistroComponent, NewComponent,EditComponent,NewCiudadanoComponent,NewEmpresaComponent],
    providers:[VhloRnaPreregistroService,VhloCfgCarroceriaService,VhloCfgRadioAccionService,VhloCfgModalidadTransporteService]
}) 

export class VhloRnaPreregistroModule { }
