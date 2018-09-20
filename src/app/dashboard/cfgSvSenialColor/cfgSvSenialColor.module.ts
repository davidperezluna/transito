import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CfgSvSenialColorComponent } from './cfgSvSenialColor.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { CfgSvSenialColorService } from '../../services/cfgSvSenialColor.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [CfgSvSenialColorComponent,NewComponent,EditComponent],
    exports: [CfgSvSenialColorComponent, NewComponent,EditComponent],
    providers:[CfgSvSenialColorService]
})

export class CfgSvSenialColorModule { }
