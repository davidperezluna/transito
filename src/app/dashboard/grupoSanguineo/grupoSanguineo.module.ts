import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GrupoSanguineoComponent } from './grupoSanguineo.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { GrupoSanguineoService } from '../../services/grupoSanguineo.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [GrupoSanguineoComponent,NewComponent,EditComponent],
    exports: [GrupoSanguineoComponent, NewComponent,EditComponent],
    providers:[GrupoSanguineoService]
})

export class GrupoSanguineoModule { }
