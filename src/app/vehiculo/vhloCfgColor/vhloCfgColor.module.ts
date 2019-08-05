import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VhloCfgColorComponent } from './vhloCfgColor.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {VhloCfgColorService} from '../../services/vhloCfgColor.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
// import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot()],
    declarations: [VhloCfgColorComponent,NewComponent,EditComponent],
    exports: [VhloCfgColorComponent, NewComponent,EditComponent],
    providers:[VhloCfgColorService]
})

export class VhloCfgColorModule { }
