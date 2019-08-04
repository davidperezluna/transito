import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BancoProyectoRoutingModule } from './banco-proyecto-routing.module';
import { BancoProyectoComponent } from './banco-proyecto.component';

@NgModule({
  imports: [
    CommonModule,
    BancoProyectoRoutingModule
  ],
  declarations: [BancoProyectoComponent]
})
export class BancoProyectoModule { }
