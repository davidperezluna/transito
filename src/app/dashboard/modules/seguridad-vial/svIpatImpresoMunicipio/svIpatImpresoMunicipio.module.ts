import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SvIpatImpresoMunicipioComponent } from './svIpatImpresoMunicipio.component';
import { SvIpatImpresoMunicipioService } from '../../../../services/svIpatImpresoMunicipio.service';
import { Ng2BootstrapModule } from 'ng2-bootstrap';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule } from 'angular2-select';

import { TooltipModule } from "ngx-tooltip"; 

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule, TooltipModule],
    declarations: [SvIpatImpresoMunicipioComponent,NewComponent,EditComponent],
    exports: [SvIpatImpresoMunicipioComponent, NewComponent,EditComponent],
    providers:[SvIpatImpresoMunicipioService]
})

export class SvIpatImpresoMunicipioModule { }
