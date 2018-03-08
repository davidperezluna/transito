import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Lock4Component } from './lock4.component';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [Lock4Component],
    exports: [Lock4Component]
})

export class Lock4Module { }
