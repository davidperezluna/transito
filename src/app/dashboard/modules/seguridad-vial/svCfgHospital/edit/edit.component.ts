import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCfgHospitalService } from '../../../../../services/svCfgHospital.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';
import { CfgMunicipioService } from '../../../../../services/cfgMunicipio.service';
import { CfgOrganismoTransitoService } from '../../../../../services/cfgOrganismoTransito.service';

@Component({
    selector: 'app-edit-svcfghospital',
    templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() hospital: any = null;
    public errorMessage;
    public respuesta;

    public organismosTransito: any;
    public organismoTransitoSelected: any;

    public formReady = false;

    constructor(
        private _HospitalService: SvCfgHospitalService,
        private _loginService: LoginService,
        private _OrganismoTransitoService: CfgOrganismoTransitoService,
    ) { }

    ngOnInit() {
        console.log(this.hospital);
        this._OrganismoTransitoService.selectSedes().subscribe(
            response => {
                this.organismosTransito = response;
                setTimeout(() => {
                    this.organismoTransitoSelected = [this.hospital.organismoTransito.id];
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
        this.hospital.organismoTransito = this.organismoTransitoSelected;
        this._HospitalService.edit(this.hospital, token).subscribe(
            response => {
                if (response.code == 200) {
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