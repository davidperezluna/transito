import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { Signup2Component } from './signup2.component';

@NgModule({
    imports: [CommonModule, RouterModule],
    declarations: [Signup2Component],
    exports: [Signup2Component]
})

export class Signup2Module { }
