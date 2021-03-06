import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SvCfgUnidadReceptora } from '../svCfgUnidadReceptora.modelo';
import { SvCfgUnidadReceptoraService } from '../../../../../services/svCfgUnidadReceptora.service';
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';
import { SvCfgEntidadAccidenteService } from '../../../../../services/svCfgEntidadAccidente.service';
import { CfgMunicipioService } from '../../../../../services/cfgMunicipio.service';

@Component({
    selector: 'app-new-svcfgunidadreceptora',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public unidadReceptora: SvCfgUnidadReceptora;
    public errorMessage;
    public respuesta;

    public entidadesAccidente: any;
    public entidadAccidenteSelected: any;
    public municipios: any;
    public municipioSelected: any;

    

    constructor(
        private _UnidadReceptoraService: SvCfgUnidadReceptoraService,
        private _loginService: LoginService,
        private _EntidadAccidenteService: SvCfgEntidadAccidenteService,
        private _MunicipioService: CfgMunicipioService,
    ) { }

    ngOnInit() {
        this.unidadReceptora = new SvCfgUnidadReceptora(null,null, null, null, null);
        this._EntidadAccidenteService.getEntidadAccidenteSelect().subscribe(
            response => {
                this.entidadesAccidente = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
        this._MunicipioService.select().subscribe(
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
    }

    onCancelar() {
        this.ready.emit(true);
    }

    onEnviar() {
        let token = this._loginService.getToken();
        this.unidadReceptora.entidadAccidente = this.entidadAccidenteSelected;
        this.unidadReceptora.municipio = this.municipioSelected;
        this._UnidadReceptoraService.register(this.unidadReceptora, token).subscribe(
            response => {
                if (response.code == 200) {
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
            }
        );
    }

}