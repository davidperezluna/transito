import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarroceriaComponent } from './carroceria.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import {CarroceriaService} from '../../services/carroceria.service';

import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [CarroceriaComponent,NewComponent,EditComponent],
    exports: [CarroceriaComponent, NewComponent,EditComponent],
    providers:[CarroceriaService]
})

export class CarroceriaModule { }
