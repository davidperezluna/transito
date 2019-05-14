import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TpAlcaldiaComponent } from './tpAlcaldia.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { UserEmpresaService } from '../../services/userEmpresa.service';
import { SucursalService } from '../../services/sucursal.service';
import { VhloTpConvenioService } from '../../services/vhloTpConvenio.service';
import { UserCfgEmpresaTipoSociedadService } from '../../services/userCfgEmpresaTipoSociedad.service';
import { NewConvenioComponent } from './convenio/new/newConvenio.component';
import { ShowConvenioComponent } from './show/show.component';
import {SelectModule} from 'angular2-select';
import { UserEmpresaRepresentanteService } from '../../services/userEmpresaRepresentante.service';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [TpAlcaldiaComponent,NewConvenioComponent,ShowConvenioComponent],
    exports: [TpAlcaldiaComponent,NewConvenioComponent,ShowConvenioComponent],
    providers:[UserEmpresaService,VhloTpConvenioService,UserCfgEmpresaTipoSociedadService, SucursalService,UserEmpresaRepresentanteService]
})

export class TpAlcaldiaModule { }
