import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCfgHospital } from '../svCfgHospital.modelo';
import { SvCfgHospitalService } from '../../../services/svCfgHospital.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';
import { CfgMunicipioService } from '../../../services/cfgMunicipio.service';
import { CfgOrganismoTransitoService } from '../../../services/cfgOrganismoTransito.service';

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public hospital: SvCfgHospital;
    public errorMessage;
    public respuesta;

    public organismosTransito: any;
    public organismoTransitoSelected: any;

    constructor(
        private _HospitalService: SvCfgHospitalService,
        private _loginService: LoginService,
        private _OrganismoTransitoService: CfgOrganismoTransitoService,
    ) { }

    ngOnInit() {
        this.hospital = new SvCfgHospital(null, null, null);
        this._OrganismoTransitoService.selectSedes().subscribe(
            response => {
                this.organismosTransito = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
    }

    onCancelar() {
        this.ready.emit(true);
    }

    onEnviar() {
        let token = this._loginService.getToken();
        this.hospital.organismoTransito = this.organismoTransitoSelected;
        
        this._HospitalService.register(this.hospital, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.ready.emit(true);
                    swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    })
                } else {
                    swal({
                        title: 'Error!',
                        text: response.message,
                        type: 'error',
                        confirmButtonText: 'Aceptar'
                    })
                }
                error => {
                    this.errorMessage = <any>error;
                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert("Error en la petición");
                    }
                }

            });
    }
}
