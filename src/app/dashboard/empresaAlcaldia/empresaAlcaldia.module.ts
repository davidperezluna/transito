import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmpresaAlcaldiaComponent } from './empresaAlcaldia.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { UserEmpresaService } from '../../services/userEmpresa.service';
import { SucursalService } from '../../services/sucursal.service';
import { VhloTpConvenioService } from '../../services/vhloTpConvenio.service';
import { TipoSociedadService } from '../../services/tipoSociedad.service';
import { NewConvenioComponent } from './convenio/new/newConvenio.component';
import { ShowConvenioComponent } from './show/show.component';
import {SelectModule} from 'angular2-select';
import { RepresentanteUserEmpresaService } from '../../services/representanteEmpresa.service';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [EmpresaAlcaldiaComponent,NewConvenioComponent,ShowConvenioComponent],
    exports: [EmpresaAlcaldiaComponent,NewConvenioComponent,ShowConvenioComponent],
    providers:[UserEmpresaService,VhloTpConvenioService,TipoSociedadService, SucursalService,RepresentanteUserEmpresaService]
})

export class EmpresaAlcaldiaModule { }
