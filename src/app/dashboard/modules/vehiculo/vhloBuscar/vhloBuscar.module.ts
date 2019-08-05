import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VhloBuscarComponent } from './vhloBuscar.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SelectModule } from 'angular2-select';
import { ShowComponent } from './show/show.component';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [VhloBuscarComponent,ShowComponent],
    exports: [VhloBuscarComponent,ShowComponent],
    providers:[]
})

export class VhloBuscarModule { }
