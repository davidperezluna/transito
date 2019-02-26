import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SvCfgUnidadReceptoraService } from '../../../services/svCfgUnidadReceptora.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';
import { CfgClaseAccidenteService } from '../../../services/cfgClaseAccidente.service';
import { SvCfgEntidadAccidenteService } from '../../../services/svCfgEntidadAccidente.service';
import { CfgMunicipioService } from '../../../services/cfgMunicipio.service';

@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() unidadReceptora: any = null;
    public errorMessage;
    public respuesta;

    public entidadesAccidentes: any;
    public municipios: any;
    public entidadAccidenteSelected: any;
    public municipioSelected: any;

    public formReady = false;

    constructor(
        private _UnidadReceptoraService: SvCfgUnidadReceptoraService,
        private _loginService: LoginService,
        private _EntidadAccidenteService: SvCfgEntidadAccidenteService,
        private _CfgMunicipioService: CfgMunicipioService,
    ) { }

    ngOnInit() {
        console.log(this.unidadReceptora);
        this._EntidadAccidenteService.getEntidadAccidenteSelect().subscribe(
            response => {
                this.entidadesAccidentes = response;
                console.log(this.entidadesAccidentes);
                setTimeout(() => {
                    this.entidadAccidenteSelected = [this.unidadReceptora.entidadAccidente.id];
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
        this._CfgMunicipioService.getMunicipioSelect().subscribe(
            response => {
                this.municipios = response;
                setTimeout(() => {
                    this.municipioSelected = [this.unidadReceptora.municipio.id];
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
        this.unidadReceptora.entidadAccidente = this.entidadAccidenteSelected;
        this.unidadReceptora.municipio = this.municipioSelected;
        this._UnidadReceptoraService.edit(this.unidadReceptora, token).subscribe(
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