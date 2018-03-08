import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Lock3Component } from './lock3.component';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [Lock3Component],
    exports: [Lock3Component]
})

export class Lock3Module { }
