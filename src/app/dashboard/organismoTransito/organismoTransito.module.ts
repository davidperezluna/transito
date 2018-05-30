import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganismoTransitoComponent } from './organismoTransito.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {OrganismoTransitoService} from '../../services/organismoTransito.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
// import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot()],
    declarations: [OrganismoTransitoComponent,NewComponent,EditComponent],
    exports: [OrganismoTransitoComponent, NewComponent,EditComponent],
    providers:[OrganismoTransitoService]
})

export class OrganismoTransitoModule { }
