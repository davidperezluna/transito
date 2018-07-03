import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { msvEvaluacionComponent } from './msvEvaluacion.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { msvEvaluacionService } from '../../services/msvEvaluacion.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [msvEvaluacionComponent,NewComponent,EditComponent],
    exports: [msvEvaluacionComponent, NewComponent,EditComponent],
    providers:[msvEvaluacionComponent]
})

export class msvEvaluacionModule { }
