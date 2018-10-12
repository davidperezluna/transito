import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCfgHospitalService } from '../../../services/svCfgHospital.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';
import { MunicipioService } from '../../../services/municipio.service';
import { SedeOperativaService } from '../../../services/sedeOperativa.service';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() hospital: any = null;
    public errorMessage;
    public respuesta;

    public municipios: any;
    public sedesOperativas: any;

    public municipioSelected: any;
    public sedeOperativaSelected: any;

    public formReady = false;

    constructor(
        private _HospitalService: SvCfgHospitalService,
        private _loginService: LoginService,
        private _MunicipioService: MunicipioService,
        private _SedeOperativaService: SedeOperativaService,
    ) { }

    ngOnInit() {
        console.log(this.hospital);
        this._MunicipioService.getMunicipioSelect().subscribe(
            response => {
                this.municipios = response;
                setTimeout(() => {
                    this.municipioSelected = [this.hospital.municipio.id];
                });
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
                setTimeout(() => {
                    this.sedeOperativaSelected = [this.hospital.sedeOperativa.id];
                });
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

    onCancelar() { this.ready.emit(true); }

    onEnviar() {
        let token = this._loginService.getToken();
        this.hospital.municipio = this.municipioSelected;
        this.hospital.sedeOperativa = this.sedeOperativaSelected;
        this._HospitalService.edit(this.hospital, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.ready.emit(true);
                    swal({
                        title: 'Perfecto!',
                        text: response.message,
                        type: 'success',
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