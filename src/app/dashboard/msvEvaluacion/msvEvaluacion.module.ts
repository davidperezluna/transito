import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsvEvaluacionComponent } from './msvEvaluacion.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { MsvRevisionService } from '../../services/msvRevision.service';
import { MsvEvaluacionService } from '../../services/msvEvaluacion.service';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';
import { NewEmpresaComponent } from './newEmpresa/newEmpresa.component';
import { NewRevisionComponent } from './newRevision/newRevision.component';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [MsvEvaluacionComponent,NewComponent,EditComponent,NewEmpresaComponent,NewRevisionComponent],
    exports: [MsvEvaluacionComponent, NewComponent,EditComponent,NewEmpresaComponent,NewRevisionComponent],
    providers:[MsvRevisionService,MsvEvaluacionService]
})

export class MsvEvaluacionModule { }
