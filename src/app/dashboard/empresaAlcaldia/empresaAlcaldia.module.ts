import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresaAlcaldiaComponent } from './empresaAlcaldia.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { EmpresaService } from '../../services/empresa.service';
import { SucursalService } from '../../services/sucursal.service';
import { VhloTpConvenioService } from '../../services/vhloTpConvenio.service';
import { TipoSociedadService } from '../../services/tipoSociedad.service';
import { NewConvenioComponent } from './convenio/new/newConvenio.component';
import { ShowConvenioComponent } from './show/show.component';
import {SelectModule} from 'angular2-select';
import { RepresentanteEmpresaService } from '../../services/representanteEmpresa.service';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [EmpresaAlcaldiaComponent,NewConvenioComponent,ShowConvenioComponent],
    exports: [EmpresaAlcaldiaComponent,NewConvenioComponent,ShowConvenioComponent],
    providers:[EmpresaService,VhloTpConvenioService,TipoSociedadService, SucursalService,RepresentanteEmpresaService]
})

export class EmpresaAlcaldiaModule { }
