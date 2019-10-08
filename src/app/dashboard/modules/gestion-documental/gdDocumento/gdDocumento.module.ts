import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';

import { GdDocumentoService } from '../../../../services/gdDocumento.service';
import { PnalFuncionarioService } from '../../../../services/pnalFuncionario.service';
import { CfgDepartamentoService } from '../../../../services/cfgDepartamento.service';
import { CfgMunicipioService } from '../../../../services/cfgMunicipio.service';
import { GdCfgTipoCorrespondenciaService } from '../../../../services/gdCfgTipoCorrespondencia.service';
import { GdCfgMedioCorrespondenciaService } from '../../../../services/gdCfgMedioCorrespondencia.service';
import { GdTrazabilidadService } from '../../../../services/gdTrazabilidad.service';
import { CfgOrganismoTransitoService } from '../../../../services/cfgOrganismoTransito.service';
import { UserCfgTipoIdentificacionService } from '../../../../services/userCfgTipoIdentificacion.service';
import { CvCdoComparendoService } from '../../../../services/cvCdoComparendo.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component';
import { PrintComponent } from './print/print.component';
import { FinishComponent } from './finish/finish.component';
import { RecordComponent } from './record/record.component';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [
        NewComponent,
        EditComponent,
        ShowComponent,FinishComponent,
        PrintComponent,
        RecordComponent
    ],
    exports: [
        NewComponent,
        EditComponent,
        ShowComponent,FinishComponent,
        PrintComponent,
        RecordComponent
    ],
    providers: [
        GdDocumentoService,
        PnalFuncionarioService,
        CfgDepartamentoService,
        CfgMunicipioService,
        GdCfgTipoCorrespondenciaService,
        GdCfgMedioCorrespondenciaService,
        GdTrazabilidadService,
        CfgOrganismoTransitoService,
        UserCfgTipoIdentificacionService,
        CvCdoComparendoService,
    ]
})

export class GdDocumentoModule { }
