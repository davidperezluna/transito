import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Lock6Component } from './lock6.component';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [Lock6Component],
    exports: [Lock6Component]
})

export class Lock6Module { }
