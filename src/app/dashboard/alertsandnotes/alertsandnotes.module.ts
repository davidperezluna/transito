import { NgModule } from '@angular/core';
import { AlertModule } from 'ngx-bootstrap/alert';

import { AlertsandnotesComponent } from './alertsandnotes.component';

@NgModule({
    imports: [AlertModule.forRoot()],
    declarations: [AlertsandnotesComponent],
    exports: [AlertsandnotesComponent]
})

export class AlertsandnotesModule { }
