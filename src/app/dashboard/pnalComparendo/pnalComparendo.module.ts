import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PnalComparendoComponent } from './pnalComparendo.component';
import { PnalComparendoService } from '../../services/pnalComparendo.service';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [PnalComparendoComponent,NewComponent,EditComponent],
    exports: [PnalComparendoComponent, NewComponent,EditComponent],
    providers:[PnalComparendoService]
})

export class PnalComparendoModule { }
