import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GdCfgMedioCorrespondenciaComponent } from './gdCfgMedioCorrespondencia.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { GdCfgMedioCorrespondenciaService } from '../../services/gdCfgMedioCorrespondencia.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [GdCfgMedioCorrespondenciaComponent,NewComponent,EditComponent],
    exports: [GdCfgMedioCorrespondenciaComponent, NewComponent,EditComponent],
    providers:[GdCfgMedioCorrespondenciaService]     
})

export class GdCfgMedioCorrespondenciaModule { }
