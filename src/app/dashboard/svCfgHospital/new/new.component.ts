import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCfgHospital } from '../svCfgHospital.modelo';
import { SvCfgHospitalService } from '../../../services/svCfgHospital.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';
import { MunicipioService } from '../../../services/municipio.service';
import { SedeOperativaService } from '../../../services/sedeOperativa.service';

@Component({
    selector: 'app-new',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public hospital: SvCfgHospital;
    public errorMessage;
    public respuesta;

    public municipios: any;
    public sedesOperativas: any;

    public municipioSelected: any;
    public sedeOperativaSelected: any;

    constructor(
        private _HospitalService: SvCfgHospitalService,
        private _loginService: LoginService,
        private _MunicipioService: MunicipioService,
        private _SedeOperativaService: SedeOperativaService,
    ) { }

    ngOnInit() {
        this.hospital = new SvCfgHospital(null, null, null, null);
        this._MunicipioService.getMunicipioSelect().subscribe(
            response => {
                this.municipios = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
        this._SedeOperativaService.getSedeOperativaSelect().subscribe(
            response => {
                this.sedesOperativas = response;
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
        this.hospital.municipio = this.municipioSelected;
        this.hospital.sedeOperativa = this.sedeOperativaSelected;

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
