import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CfgSmlmvComponent } from './cfgSmlmv.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { CfgSmlmvService } from '../../services/cfgSmlmv.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [CfgSmlmvComponent,NewComponent,EditComponent],
    exports: [CfgSmlmvComponent, NewComponent,EditComponent],
    providers:[CfgSmlmvService]
})

export class CfgSmlmvModule { }
