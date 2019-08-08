import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { UserEmpresaTransporteService } from "../../../../../services/userEmpresaTransporte.service";

import { VhloCfgRadioAccionService } from "../../../../../services/vhloCfgRadioAccion.service";
import { VhloCfgModalidadTransporteService } from "../../../../../services/vhloCfgModalidadTransporte.service";
import { VhloCfgServicioService } from "../../../../../services/vhloCfgServicio.service";
import { VhloCfgTipoVehiculoService } from "../../../../../services/vhloCfgTipoVehiculo.service";
import { VhloCfgColorService } from "../../../../../services/vhloCfgColor.service";
import { CfgMunicipioService } from "../../../../../services/cfgMunicipio.service";

import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-enable-vhlotpconvenio',
    templateUrl: './enable.component.html'
})
export class EnableComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public errorMessage;
    public empresa;
    public nit;

    public radiosAccion;
    public modalidadesTransporte;
    public servicios;
    public tiposVehiculo;
    public colores;
    public municipios;

    constructor(
        private _UserEmpresaTransporteService: UserEmpresaTransporteService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
    }

    onCancelar() {
        this.ready.emit(true);
    }

    onSearchEmpresa() {
        let token = this._LoginService.getToken();
        this._UserEmpresaTransporteService.searchByNit(this.nit, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.empresa = response.data;
                    swal({
                        title: response.title,
                        text: response.message,
                        type: response.status,
                        confirmButtonText: 'Aceptar'
                    })
                } else {
                    swal({
                        title: response.title,
                        text: response.message,
                        type: response.status,
                        confirmButtonText: 'Aceptar'
                    })
                }
                error => {
                    this.errorMessage = <any>error;
                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert('Error en la petición');
                    }
                }
            }
        );
    }
}
