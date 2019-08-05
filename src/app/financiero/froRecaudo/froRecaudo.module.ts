import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FroRecaudoComponent } from './froRecaudo.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { FroRecaudoService } from '../../services/froRecaudo.service';
import { FroFacturaService } from '../../services/froFactura.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule],
    declarations: [FroRecaudoComponent, NewComponent, EditComponent],
    exports: [FroRecaudoComponent, NewComponent, EditComponent],
    providers: [FroRecaudoService,FroFacturaService]
})
 
export class FroRecaudoModule { }
