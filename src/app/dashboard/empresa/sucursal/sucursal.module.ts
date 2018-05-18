import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SucursalComponent } from './sucursal.component';
import { Ng2BootstrapModule } from 'ng2-bootstrap';
import { SucursalService} from '../../services/sucursal.service';



import { MunicipioService} from '../../services/municipio.service';
import { NewSucursalComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { SelectModule} from 'angular2-select';


@NgModule({
    imports: [CommonModule, Ng2BootstrapModule.forRoot(),SelectModule],
    declarations: [SucursalComponent,NewSucursalComponent,EditComponent],
    exports: [SucursalComponent, NewSucursalComponent,EditComponent],
    providers:[SucursalService]
})

export class SucursalModule { }
