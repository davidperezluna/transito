import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VhloCfgRadioAccionComponent } from './vhloCfgRadioAccion.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { VhloCfgRadioAccionService } from '../../services/vhloCfgRadioAccion.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [VhloCfgRadioAccionComponent,NewComponent,EditComponent],
    exports: [VhloCfgRadioAccionComponent, NewComponent,EditComponent],
    providers:[VhloCfgRadioAccionService]     
})

export class VhloCfgRadioAccionModule { }
