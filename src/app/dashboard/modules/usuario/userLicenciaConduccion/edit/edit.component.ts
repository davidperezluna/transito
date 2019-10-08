import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserLicenciaConduccionService } from '../../../../../services/userLicenciaConduccion.service';

import { CfgOrganismoTransitoService } from '../../../../../services/cfgOrganismoTransito.service';
import { UserLcCfgCategoriaService } from '../../../../../services/userLcCfgCategoria.service';
import { VhloCfgClaseService } from '../../../../../services/vhloCfgClase.service';
import { VhloCfgServicioService } from '../../../../../services/vhloCfgServicio.service';
import { UserCiudadanoService } from '../../../../../services/userCiudadano.service';
import { CfgPaisService } from '../../../../../services/cfgPais.service';
import { LoginService } from '../../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'app-edit-userlicenciaconduccion',
    templateUrl: './edit.component.html'
})
export class EditComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() licenciaConduccion: any = null;
    public errorMessage;

    public organismosTransito: any;
    public categoriasLicenciaConduccion: any;
    public clases: any;
    public servicios: any;
    public ciudadanos: any;
    public paises: any;

    public organismoTransitoSelected: any;
    public categoriaLicenciaConduccionSelected: any;
    public claseSelected: any;
    public servicioSelected: any;
    public ciudadanoSelected: any;
    public paisSelected: any;

    public estados = [
        { label: 'ACTIVA', value: 'ACTIVA' },
        { label: 'INACTIVA', value: 'INACTIVA' },
        { label: 'SUSPENDIDA', value: 'SUSPENDIDAD' },
    ];

    public formReady = false;

    constructor(
        private _LicenciaConduccionService: UserLicenciaConduccionService,
        private _LoginService: LoginService,
        private _OrganismoTransitoService: CfgOrganismoTransitoService,
        private _CategoriaLicenciaCoduccionService: UserLcCfgCategoriaService,
        private _ClaseService: VhloCfgClaseService,
        private _ServicioService: VhloCfgServicioService,
        private _CiudadanoService: UserCiudadanoService,
        private _PaisService: CfgPaisService,
    ) { }

    ngOnInit() { 
        this._OrganismoTransitoService.select().subscribe(
            response => {
                this.organismosTransito = response;
                setTimeout(() => {
                    this.organismoTransitoSelected = [this.licenciaConduccion.organismoTransito.id];
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
        this._CategoriaLicenciaCoduccionService.select().subscribe(
            response => {
                this.categoriasLicenciaConduccion = response;
                setTimeout(() => {
                    this.categoriaLicenciaConduccionSelected = [this.licenciaConduccion.categoria.id];
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
        this._ClaseService.select().subscribe(
            response => {
                this.clases = response;
                setTimeout(() => {
                    this.claseSelected = [this.licenciaConduccion.clase.id];
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
        this._ServicioService.select().subscribe(
            response => {
                this.servicios = response;
                setTimeout(() => {
                    this.servicioSelected = [this.licenciaConduccion.servicio.id];
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
        this._CiudadanoService.select().subscribe(
            response => {
                this.ciudadanos = response;
                setTimeout(() => {
                    this.ciudadanoSelected = [this.licenciaConduccion.ciudadano.id];
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
        this._PaisService.select().subscribe(
            response => {
                this.paises = response;
                setTimeout(() => {
                    this.paisSelected = [this.licenciaConduccion.pais.id];
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
        let token = this._LoginService.getToken();

        this.licenciaConduccion.idOrganismoTransito = this.organismoTransitoSelected;
        this.licenciaConduccion.idCategoria = this.categoriaLicenciaConduccionSelected;
        this.licenciaConduccion.idClase = this.claseSelected;
        this.licenciaConduccion.idServicio = this.servicioSelected;
        this.licenciaConduccion.idCiudadano = this.ciudadanoSelected;
        this.licenciaConduccion.idPais = this.paisSelected;
        
        this._LicenciaConduccionService.edit(this.licenciaConduccion, token).subscribe(
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