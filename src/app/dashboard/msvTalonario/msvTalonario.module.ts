import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MsvTalonarioComponent } from './msvTalonario.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { MsvTalonarioService } from '../../services/msvTalonario.service';

//import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';
// import {SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [MsvTalonarioComponent,/*NewComponent*/EditComponent],
    exports: [MsvTalonarioComponent, /*NewComponent*/EditComponent],
    providers: [MsvTalonarioService]
})

export class MsvTalonarioModule { }
