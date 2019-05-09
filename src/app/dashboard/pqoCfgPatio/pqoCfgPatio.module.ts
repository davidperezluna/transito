import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PqoCfgPatioComponent } from './pqoCfgPatio.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { PqoCfgPatioService } from '../../services/pqoCfgPatio.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [PqoCfgPatioComponent,NewComponent,EditComponent,ShowComponent],
    exports: [PqoCfgPatioComponent, NewComponent,EditComponent,ShowComponent],
    providers:[PqoCfgPatioService]
})

export class PqoCfgPatioModule { }
