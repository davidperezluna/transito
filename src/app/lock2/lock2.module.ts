import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Lock2Component } from './lock2.component';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [Lock2Component],
    exports: [Lock2Component]
})

export class Lock2Module { }
