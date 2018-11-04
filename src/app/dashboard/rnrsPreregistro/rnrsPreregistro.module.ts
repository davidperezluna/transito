import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RnrsPreregistroComponent } from './rnrsPreregistro.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { RnrsPreregistroService } from '../../services/rnrsPreregistro.service';
import { UsuarioService } from '../../services/usuario.service';

import { NewRegistroRemolqueComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import {SelectModule} from 'angular2-select';
@NgModule({
    declarations: [RnrsPreregistroComponent,NewRegistroRemolqueComponent,EditComponent],
    imports: [CommonModule, ChartsModule, Ng2BootstrapModule.forRoot(),SelectModule],
    exports: [RnrsPreregistroComponent, NewRegistroRemolqueComponent,EditComponent],
    providers:[RnrsPreregistroService,UsuarioService]
})
 
export class RnrsPreregistroModule { }
