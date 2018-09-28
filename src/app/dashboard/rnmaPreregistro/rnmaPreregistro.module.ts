import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RnmaPreregistroComponent } from './rnmaPreregistro.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { RnmaPreregistroService } from '../../services/rnmaPreregistro.service';
import { NewRegistroMaquinariaComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';

@NgModule({
    declarations: [RnmaPreregistroComponent,NewRegistroMaquinariaComponent,EditComponent],
    imports: [CommonModule, ChartsModule, Ng2BootstrapModule.forRoot(),SelectModule],
    exports: [RnmaPreregistroComponent, NewRegistroMaquinariaComponent,EditComponent],
    providers:[RnmaPreregistroService]
})

export class RnmaPreregistroModule { }
