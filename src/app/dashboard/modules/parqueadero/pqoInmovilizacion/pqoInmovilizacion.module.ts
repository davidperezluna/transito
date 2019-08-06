import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';

import { PqoInmovilizacionService } from '../../../../services/pqoInmovilizacion.service';
import { PnalFuncionarioService } from '../../../../services/pnalFuncionario.service';
import { CvCdoComparendoService } from '../../../../services/cvCdoComparendo.service';
import { PqoCfgPatioService } from '../../../../services/pqoCfgPatio.service';
import { PqoCfgGruaService } from '../../../../services/pqoCfgGrua.service';
import { VhloCfgMarcaService } from '../../../../services/vhloCfgMarca.service';
import { VhloCfgLineaService } from '../../../../services/vhloCfgLinea.service';
import { VhloCfgClaseService } from '../../../../services/vhloCfgClase.service';
import { VhloCfgColorService } from '../../../../services/vhloCfgColor.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [
        NewComponent,
        EditComponent
    ],
    exports: [
        NewComponent,
        EditComponent
    ],
    providers: [
        PqoInmovilizacionService, 
        CvCdoComparendoService, 
        PnalFuncionarioService,
        PqoCfgPatioService,
        PqoCfgGruaService,
        VhloCfgMarcaService,
        VhloCfgLineaService,
        VhloCfgClaseService,
        VhloCfgColorService,
    ]
})

export class PqoInmovilizacionModule { }
