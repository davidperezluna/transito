import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvRevisionService } from '../../../../services/svRevision.service';
import { SvEvaluacionService } from '../../../../services/svEvaluacion.service';
import { SvCfgParametroService } from '../../../../services/svCfgParametro.service';
import { SvCfgVariableService } from '../../../../services/svCfgVariable.service';
import { SvCalificacionService } from '../../../../services/svCalificacion.service';
import { SvResultadoService } from "../../../../services/svResultado.service";
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component';
import { EditRevisionComponent } from './editRevision/editRevision.component';
import { SelectModule } from 'angular2-select';
import { NewEmpresaComponent } from './newEmpresa/newEmpresa.component';
import { NewRevisionComponent } from './newRevision/newRevision.component';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [NewComponent, EditComponent, ShowComponent, EditRevisionComponent,NewEmpresaComponent, NewRevisionComponent],
    exports: [NewComponent, EditComponent, ShowComponent, EditRevisionComponent, NewEmpresaComponent, NewRevisionComponent],
    providers: [SvRevisionService, SvEvaluacionService, SvCfgParametroService, SvCfgVariableService, SvCalificacionService, SvResultadoService]
})

export class SvEvaluacionModule { }
