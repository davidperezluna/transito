import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RnaPreregistroComponent } from './rnaPreregistro.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { RnaPreregistroService } from '../../services/rnaPreregistro.service';
import { CarroceriaService } from '../../services/carroceria.service';
import { CfgRadioAccionService } from '../../services/cfgRadioAccion.service';
import { CfgModalidadTransporteService } from '../../services/cfgModalidadTransporte.service';

import { NewRnaPreregistroComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { NewCiudadanoComponent } from './newCiudadano/newCiudadano.component';
import { NewEmpresaComponent } from './newEmpresa/newEmpresa.component';

import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, ChartsModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [RnaPreregistroComponent,NewRnaPreregistroComponent,EditComponent,NewCiudadanoComponent,NewEmpresaComponent],
    exports: [RnaPreregistroComponent, NewRnaPreregistroComponent,EditComponent,NewCiudadanoComponent,NewEmpresaComponent],
    providers:[RnaPreregistroService,CarroceriaService,CfgRadioAccionService,CfgModalidadTransporteService]
}) 

export class RnaPreregistroModule { }
