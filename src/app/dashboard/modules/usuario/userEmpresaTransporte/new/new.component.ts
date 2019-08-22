import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { UserEmpresaTransporte } from "../userEmpresaTransporte.modelo";
import { UserEmpresaTransporteService } from "../../../../../services/userEmpresaTransporte.service";
import { VhloCfgRadioAccionService } from "../../../../../services/vhloCfgRadioAccion.service";
import { VhloCfgModalidadTransporteService } from "../../../../../services/vhloCfgModalidadTransporte.service";
import { VhloCfgServicioService } from "../../../../../services/vhloCfgServicio.service";
import { VhloCfgClaseService } from "../../../../../services/vhloCfgClase.service";
import { VhloCfgColorService } from "../../../../../services/vhloCfgColor.service";
import { VhloCfgCarroceriaService } from "../../../../../services/vhloCfgCarroceria.service";
import { CfgMunicipioService } from "../../../../../services/cfgMunicipio.service";
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-new-userempresatransporte',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() empresa: any = null;
    public errorMessage;
    
    public empresaTransporte;

    public radiosAccion;
    public modalidadesTransporte;
    public servicios;
    public clases;
    public colores;
    public municipios;

    public carrocerias;

    constructor(
        private _LoginService: LoginService,
        private _UserEmpresaTransporteService: UserEmpresaTransporteService,
        private _VhloCfgRadioAccionService: VhloCfgRadioAccionService,
        private _VhloCfgModalidadTransporteService: VhloCfgModalidadTransporteService,
        private _VhloCfgServicioService: VhloCfgServicioService,
        private _VhloCfgClaseService: VhloCfgClaseService,
        private _VhloCfgColorService: VhloCfgColorService,
        private _CfgMunicipioService: CfgMunicipioService,
        
        private _VhloCfgCarroceriaService: VhloCfgCarroceriaService,
    ) { }

    ngOnInit() {
        this.empresaTransporte = new UserEmpresaTransporte(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);
        this._VhloCfgRadioAccionService.select().subscribe(
            response => {
                this.radiosAccion = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
        this._VhloCfgModalidadTransporteService.select().subscribe(
            response => {
                this.modalidadesTransporte = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
        this._VhloCfgServicioService.select().subscribe(
            response => {
                this.servicios = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
        this._VhloCfgClaseService.select().subscribe(
            response => {
                this.clases = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
        this._VhloCfgColorService.select().subscribe(
            response => {
                this.colores = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );
        this._CfgMunicipioService.select().subscribe(
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
        this._VhloCfgCarroceriaService.select().subscribe(
            response => {
                this.carrocerias = response;
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
        let token = this._LoginService.getToken();

        this.empresaTransporte.idEmpresa = this.empresa.id;

        this._UserEmpresaTransporteService.register(this.empresaTransporte, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.ready.emit(true);
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
                        alert("Error en la petición");
                    }
                }

            });
    }
}
