import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { UserLicenciaConduccion } from '../userLicenciaConduccion.modelo';
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
    selector: 'app-new-userlicenciaconduccion',
    templateUrl: './new.component.html'
})
export class NewComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    public licenciaConduccion: UserLicenciaConduccion;
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
        this.licenciaConduccion = new UserLicenciaConduccion(null, null, null, null, null, null, null, null, null, null, null, null, null);

        this._OrganismoTransitoService.selectSedes().subscribe(
            response => {
                this.organismosTransito = response;
            },
            error => {
                this.errorMessage = <any>error;
                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert('Error en la petición');
                }
            }
        );

        this._CategoriaLicenciaCoduccionService.select().subscribe(
            response => {
                this.categoriasLicenciaConduccion = response;
            },
            error => {
                this.errorMessage = <any>error;
                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert('Error en la petición');
                }
            }
        );

        this._ClaseService.select().subscribe(
            response => {
                this.clases = response;
            },
            error => {
                this.errorMessage = <any>error;
                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert('Error en la petición');
                }
            }
        );

        this._ServicioService.select().subscribe(
            response => {
                this.servicios = response;
            },
            error => {
                this.errorMessage = <any>error;
                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert('Error en la petición');
                }
            }
        );

        this._CiudadanoService.select().subscribe(
            response => {
                this.ciudadanos = response;
            },
            error => {
                this.errorMessage = <any>error;
                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert('Error en la petición');
                }
            }
        );

        this._PaisService.select().subscribe(
            response => {
                this.paises = response;
            },
            error => {
                this.errorMessage = <any>error;
                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert('Error en la petición');
                }
            }
        );
    }
    onCancelar() {
        this.ready.emit(true);
    }
    // enviar a guarda
    onEnviar() {
        let token = this._LoginService.getToken();

        this.licenciaConduccion.idOrganismoTransito = this.organismoTransitoSelected;
        this.licenciaConduccion.idCategoria = this.categoriaLicenciaConduccionSelected;
        this.licenciaConduccion.idClase = this.claseSelected;
        this.licenciaConduccion.idServicio = this.servicioSelected;
        this.licenciaConduccion.idCiudadano = this.ciudadanoSelected;
        this.licenciaConduccion.idPais = this.paisSelected;

        this._LicenciaConduccionService.register(this.licenciaConduccion, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.ready.emit(true);
                    swal({
                        title: 'Perfecto!',
                        text: 'Registro exitoso!',
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                    });
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
                        alert('Error en la petición');
                    }
                }
            });
    }
}