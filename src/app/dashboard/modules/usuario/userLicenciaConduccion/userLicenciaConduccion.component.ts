import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserLicenciaConduccion } from './userLicenciaConduccion.modelo';
import { UserCfgTipoIdentificacionService } from "../../../../services/userCfgTipoIdentificacion.service";
import { UserLicenciaConduccionService } from '../../../../services/userLicenciaConduccion.service';
import { UserCiudadanoService } from "../../../../services/userCiudadano.service";
import { LoginService } from '../../../../services/login.service';

import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-index',
    templateUrl: './userLicenciaConduccion.component.html',
})

export class UserLicenciaConduccionComponent implements OnInit {
    public errorMessage;
    public id;

    public licenciasConduccion;

    public identificacion;
    public ciudadano;

    public tiposIdentificacion: any;
    public tipoIdentificacionSelected: any;

    public formNew = false;
    public formEdit = false;
    public formIndex = true;
    public formShow = false;
    public table: any;
    public licenciaConduccion: UserLicenciaConduccion;

    constructor(
        private _LicenciaConduccionService: UserLicenciaConduccionService,
        private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
        private _UserCiudadanoService: UserCiudadanoService,
        private _loginService: LoginService,
    ) { }

    ngOnInit() {
        swal({
            title: 'Cargando Tabla!',
            text: 'Solo tardara unos segundos por favor espere.',
            timer: 1500,
            onOpen: () => {
                swal.showLoading()
            }
        }).then((result) => {
            if (
                // Read more about handling dismissals
                result.dismiss === swal.DismissReason.timer
            ) {
            }
        })
        this._TipoIdentificacionService.select().subscribe(
            response => {
                this.tiposIdentificacion = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert('Error en la petición');
                }
            });
    }

    onInitTable() {
        this.table = $('#dataTables-example').DataTable({
            responsive: false,
            pageLength: 6,
            sPaginationType: 'full_numbers',
            buttons: 'Excel',
            oLanguage: {
                oPaginate: {
                    sFirst: '<i class="fa fa-step-backward"></i>',
                    sPrevious: '<i class="fa fa-chevron-left"></i>',
                    sNext: '<i class="fa fa-chevron-right"></i>',
                    sLast: '<i class="fa fa-step-forward"></i>'
                }
            }
        });
    }

    onNew() {
        this.formNew = true;
        this.formIndex = false;
        this.formEdit = false;
        if(this.table) {
            this.table.destroy();
        }
    }

    ready(isCreado: any) {
        if (isCreado) {
            this.formNew = false;
            this.formEdit = false;
            this.formIndex = true;
            this.formShow = false;
            this.ngOnInit();
        }
    }

    onDelete(id: any) {
        swal({
            title: '¿Estás seguro?',
            text: "¡Se eliminara este registro!",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#15d4be',
            cancelButtonColor: '#ff6262',
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.value) {
                let token = this._loginService.getToken();

                this._LicenciaConduccionService.delete({ 'id': id }, token).subscribe(
                    response => {
                        swal({
                            title: 'Eliminado!',
                            text: response.message,
                            type: 'success',
                            confirmButtonColor: '#15d4be',
                        });
                        this.ngOnInit();
                        this.table.destroy();
                        this.onSearchCiudadano();
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
        })
    }

    onEdit(licenciaConduccion: any) {
        this.licenciaConduccion = licenciaConduccion;
        this.formEdit = true;
        this.formIndex = false;
    }

    onSearchCiudadano() {
        let token = this._loginService.getToken();

        this._UserCiudadanoService.searchByIdentificacion({ 'idTipoIdentificacion': this.tipoIdentificacionSelected,'identificacion': this.identificacion }, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.ciudadano = response.data.ciudadano;
                    this._LicenciaConduccionService.searchByCiudadanoId({ 'idCiudadano': this.ciudadano.id }, token).subscribe(
                        response => {
                            if (response.status == 'success') {
                                this.licenciasConduccion = response.data;
                                swal({
                                    title: 'Perfecto!',
                                    text: response.message,
                                    type: 'success',
                                    confirmButtonText: 'Aceptar'
                                });
                                let timeoutId = setTimeout(() => {
                                    this.onInitTable();
                                }, 200);
                            } else {
                                swal({
                                    title: 'Alerta!',
                                    text: response.message,
                                    type: 'error',
                                    confirmButtonText: 'Aceptar'
                                });
                            error => {
                                this.errorMessage = <any>error;
                                if (this.errorMessage != null) {
                                    console.log(this.errorMessage);
                                    alert("Error en la petición");
                                }
                            }
                        }
                    }
                );
                } else {
                    swal({
                        title: 'Alerta!',
                        text: response.message,
                        type: 'error',
                        confirmButtonText: 'Aceptar'
                    });
                    error => {
                        this.errorMessage = <any>error;
                        if (this.errorMessage != null) {
                            console.log(this.errorMessage);
                            alert("Error en la petición");
                        }
                    }
                }
        });       
    }
}