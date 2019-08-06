import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SvIpatService } from '../../../../services/svIpat.service';
import { SvIpatConductorService } from '../../../../services/svIpatConductor.services';
import { SvIpatVehiculoService } from '../../../../services/svIpatVehiculo.services';
import { SvIpatVictimaService } from '../../../../services/svIpatVictima.services';

import { NewComponent } from './new/new.component';
import { ShowComponent } from './show/show.component';
import { ExportComponent } from './export/export.component';
import { SelectModule } from 'angular2-select';
import { SortableModule } from 'ngx-bootstrap/sortable';
import { ToolTipModule } from 'angular2-tooltip';

@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(), SelectModule, SortableModule.forRoot(), ToolTipModule],
    declarations: [NewComponent, ShowComponent, ExportComponent],
    exports: [NewComponent, ShowComponent, ExportComponent],
    providers: [SvIpatService, SvIpatConductorService, SvIpatVehiculoService, SvIpatVictimaService]
})

export class SvIpatModule { }
