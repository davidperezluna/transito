import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvIpatAsignacionComponent } from './svIpatAsignacion.component';
import { SvIpatAsignacionService } from '../../services/svIpatAsignacion.service';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [SvIpatAsignacionComponent,NewComponent,EditComponent,ShowComponent],
    exports: [SvIpatAsignacionComponent, NewComponent,EditComponent,ShowComponent],
    providers:[SvIpatAsignacionService]
})

export class SvIpatAsignacionModule { }
