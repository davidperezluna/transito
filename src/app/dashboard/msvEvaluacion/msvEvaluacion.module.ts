import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { msvEvaluacionComponent } from './msvEvaluacion.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { msvRevisionService } from '../../services/msvRevision.service';
import { msvEvaluacionService } from '../../services/msvEvaluacion.service';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';
import { NewEmpresaComponent } from './newEmpresa/newEmpresa.component';
import { NewRevisionComponent } from './newRevision/newRevision.component';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [msvEvaluacionComponent,NewComponent,EditComponent,NewEmpresaComponent,NewRevisionComponent],
    exports: [msvEvaluacionComponent, NewComponent,EditComponent,NewEmpresaComponent,NewRevisionComponent],
    providers:[msvEvaluacionComponent,msvRevisionService,msvEvaluacionService]
})

export class msvEvaluacionModule { }
