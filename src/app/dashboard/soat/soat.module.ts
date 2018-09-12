import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoatComponent } from './soat.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SoatService } from '../../services/soat.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [SoatComponent,NewComponent,EditComponent],
    exports: [SoatComponent, NewComponent,EditComponent],
    providers: [SoatService]
})

export class SoatModule { }
