import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Login2Component } from './login2.component';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [Login2Component],
    exports: [Login2Component]
})

export class Login2Module { }
