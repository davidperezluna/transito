import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BancoComponent } from './banco.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {BancoService} from '../../services/banco.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
// import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot()],
    declarations: [BancoComponent,NewComponent,EditComponent],
    exports: [BancoComponent, NewComponent,EditComponent],
    providers:[BancoService]
})

export class BancoModule { }
