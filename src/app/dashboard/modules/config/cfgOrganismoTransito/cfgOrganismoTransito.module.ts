import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CfgOrganismoTransitoComponent } from './cfgOrganismoTransito.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';
import { TooltipModule } from "ngx-tooltip";  

import { CfgOrganismoTransitoService } from '../../../../services/cfgOrganismoTransito.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';



@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule, TooltipModule],
    declarations: [CfgOrganismoTransitoComponent,NewComponent,EditComponent],
    exports: [CfgOrganismoTransitoComponent, NewComponent,EditComponent],
    providers:[CfgOrganismoTransitoService]
})

export class CfgOrganismoTransitoModule { }
