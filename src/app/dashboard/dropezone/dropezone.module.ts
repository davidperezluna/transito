import { NgModule } from '@angular/core';
import { DropzoneModule } from 'ngx-dropzone-wrapper';

import { DropezoneComponent } from './dropezone.component';




@NgModule({
    imports: [DropzoneModule],
    declarations: [DropezoneComponent],
    exports: [DropezoneComponent]
})

export class DropezoneModule { }
