import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VhloCfgCarroceriaComponent } from './vhloCfgCarroceria.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {VhloCfgCarroceriaService} from '../../../../services/vhloCfgCarroceria.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [VhloCfgCarroceriaComponent,NewComponent,EditComponent],
    exports: [VhloCfgCarroceriaComponent, NewComponent,EditComponent],
    providers:[VhloCfgCarroceriaService]
})

export class VhloCfgCarroceriaModule { }
