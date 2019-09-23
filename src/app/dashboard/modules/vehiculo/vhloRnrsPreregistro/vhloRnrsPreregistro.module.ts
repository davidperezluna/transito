import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { ChartsModule } from 'ng2-charts';
import {SelectModule} from 'angular2-select';

import { VhloRnrsPreregistroService } from '../../../../services/vhloRnrsPreregistro.service';
import { UsuarioService } from '../../../../services/usuario.service';

import { NewRegistroRemolqueComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
    declarations: [NewRegistroRemolqueComponent,EditComponent],
    imports: [CommonModule, ChartsModule, Ng2BootstrapModule.forRoot(),SelectModule],
    exports: [NewRegistroRemolqueComponent,EditComponent],
    providers:[VhloRnrsPreregistroService,UsuarioService]
})
 
export class VhloRnrsPreregistroModule { }
