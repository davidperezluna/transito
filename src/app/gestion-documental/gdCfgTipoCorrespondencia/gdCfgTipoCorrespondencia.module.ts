import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GdCfgTipoCorrespondenciaComponent } from './gdCfgTipoCorrespondencia.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { GdCfgTipoCorrespondenciaService } from '../../services/gdCfgTipoCorrespondencia.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [GdCfgTipoCorrespondenciaComponent,NewComponent,EditComponent],
    exports: [GdCfgTipoCorrespondenciaComponent, NewComponent,EditComponent],
    providers:[GdCfgTipoCorrespondenciaService]     
})

export class GdCfgTipoCorrespondenciaModule { }
