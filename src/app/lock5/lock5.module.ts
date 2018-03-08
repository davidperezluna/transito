import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Lock5Component } from './lock5.component';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [Lock5Component],
    exports: [Lock5Component]
})

export class Lock5Module { }
