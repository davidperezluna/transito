import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { UserCiudadano } from '../../../../userCiudadano/userCiudadano.modelo';
import { UserCiudadanoService } from '../../../../../services/userCiudadano.service';
import { UserCfgTipoIdentificacionService } from '../../../../../services/userCfgTipoIdentificacion.service';
import { UserCfgRoleService } from '../../../../../services/userCfgRole.service';
import { UserCfgGeneroService } from '../../../../../services/userCfgGenero.service';
import { CfgMunicipioService } from '../../../../../services/cfgMunicipio.service';
import { CfgPaisService } from '../../../../../services/cfgPais.service';
import { CfgDepartamentoService } from "../../../../../services/cfgDepartamento.service";
import { LoginService } from '../../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'app-new-propietario-vehiculo',
    templateUrl: './newPropietarioVehiculo.component.html'
})
export class NewPropietarioVehiculoComponent implements OnInit {
    @Output() ready = new EventEmitter<any>();
    @Input() identificacion: any = null;
    @Input() tipoIdentificacion: any = null;
    public ciudadano: UserCiudadano;
    public propietario = false;

    public errorMessage;
    public respuesta;

    public tiposIdentificacion: any;
    public tipoIdentificacionSelected: any;

    public roles: any;
    public roleSelected:any;

    public generos: any;
    public generoSelected: any;

    public gruposSanguineos: any;
    public grupoSanguineoSelected: any;

    public paises: any;
    public paisNacimientoSelected: any;
    public paisResidenciaSelected: any;

    public municipiosNacimiento: any;
    public municipioNacimientoSelected: any;

    public departamentosNacimiento: any;
    public departamentoNacimientoSelected: any;

    public departamentosResidencia: any;
    public departamentoResidenciaSelected: any;

    public municipiosResidencia: any;
    public municipioResidenciaSelected: any;

    public isError: any;
    public isExist: boolean = false;
    public tipoId: boolean = true;



    constructor(
        private _UserCiudadanoService: UserCiudadanoService,
        private _loginService: LoginService,
        private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
        private _RoleService: UserCfgRoleService,
        private _GeneroService: UserCfgGeneroService,
        private _municipioService: CfgMunicipioService,
        private _paisService: CfgPaisService,
        private _CfgDepartamentoService: CfgDepartamentoService,

    ) { }

    ngOnInit() {
        this.ciudadano = new UserCiudadano(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null);

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
            }
        );

        this._RoleService.select().subscribe(
            response => {
                this.roles = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert('Error en la petición');
                }
            }
        );

        this._GeneroService.select().subscribe(
            response => {
                this.generos = response;
            },
            error => {
                this.errorMessage = <any>error;
                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert('Error en la petición');
                }
            }
        );

        this._paisService.select().subscribe(
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
        this._municipioService.select().subscribe(
            response => {
                this.municipiosResidencia = response;
                this.municipiosNacimiento = response;
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

    onEnviar() {
        let token = this._loginService.getToken();

        var html = 'Se va a registrar el usuario:<br>' +
            'Primer Nombre: <b>' + this.ciudadano.primerNombre + '</b><br>' +
            'Tipo Identificacion: <b>' + this.ciudadano.idTipoIdentificacion + '</b><br>' +
            'Identificacion: <b>' + this.ciudadano.identificacion + '</b><br>' +
            'Genero: <b>' + this.ciudadano.idGenero + '</b><br>' +
            'Telefono: <b>' + this.ciudadano.telefono + '</b><br>';

        swal({
            title: 'Creacion de persona natural',
            type: 'warning',
            html: html,
            showCancelButton: true,
            focusConfirm: false,
            confirmButtonText:
                '<i class="fa fa-thumbs-up"></i> Crear!',
            confirmButtonAriaLabel: 'Thumbs up, great!',
            cancelButtonText:
                '<i class="fa fa-thumbs-down"></i> No crear',
            cancelButtonAriaLabel: 'Thumbs down',
        }).then((result) => {
            if (result.value) {

                this._UserCiudadanoService.register({ 'ciudadano': this.ciudadano, 'campo': 'importacion-temporal'}, token).subscribe(
                    response => {
                        if (response.status == 'success') {
                            this.ready.emit(true);
                            swal({
                                title: 'Perfecto!',
                                text: 'Registro exitoso!',
                                type: 'success',
                                confirmButtonText: 'Aceptar'
                            })
                        } else {
                            swal({
                                title: 'Error!',
                                text: 'El ciudadano ya se encuentra registrado',
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
            } else if (
                // Read more about handling dismissals
                result.dismiss === swal.DismissReason.cancel
            ) {

            }
        })
    }

    onChangedPaisNacimiento(id) {
        if (id) {
            let token = this._loginService.getToken();

            this._CfgDepartamentoService.selectByPais({ 'idPais':id }, token).subscribe(
                response => {
                    this.departamentosNacimiento = response;
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

    }

    onChangedDepartamentoNacimiento(id) {
        if (id) {
            let token = this._loginService.getToken();
            this._municipioService.selectByDepartamento(this.departamentoNacimientoSelected, token).subscribe(
                response => {
                    this.municipiosNacimiento = response;
                    console.log(this.municipiosNacimiento);

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

    }

    onChangedPaisResidencia(id) {
        if (id) {
            let token = this._loginService.getToken();

            this._CfgDepartamentoService.selectByPais({ 'idPais':id }, token).subscribe(
                response => {
                    this.departamentosResidencia = response;
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
    }

    onChangedDepartamentoResidencia(id) {
        if (id) {
            let token = this._loginService.getToken();
            this._municipioService.selectByDepartamento(this.departamentoResidenciaSelected, token).subscribe(
                response => {
                    this.municipiosResidencia = response;
                    console.log(this.municipiosResidencia);

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

    }

    searchByIdentificacion() {
        console.log(this.tipoIdentificacionSelected);
        let token = this._loginService.getToken();
        let datos = {
            'identificacion': this.ciudadano.identificacion,
            'tipoIdentificacion': this.tipoIdentificacionSelected,
        }

        this._UserCiudadanoService.searchByIdentificacion(datos, token).subscribe(
            response => {
                this.respuesta = response;
                if (this.respuesta.status == 'error') {
                    //identificacion encontrada
                    this.isError = true;
                    this.isExist = false;

                } else {
                    this.isExist = true;
                    this.isError = false;
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

    changedTipoId(event) {
        this.tipoId = false;
    }

    onBuscarCiudadano(){
        let token = this._loginService.getToken();

        if (this.ciudadano.identificacion) {
            this._UserCiudadanoService.searchByIdentificacion({ 'identificacion':this.ciudadano.identificacion }, token).subscribe(
                response => {
                    if (response.status == 'success') {
                        this.propietario = true;
                        this.tipoIdentificacionSelected = [response.data.tipoIdentificacion.id];
                        
                        if (response.data.segundoNombre == null) {
                            this.ciudadano.primerNombre = response.data.primerNombre;
                        } else {
                            this.ciudadano.primerNombre = response.data.primerNombre;
                            this.ciudadano.segundoNombre = response.data.segundoNombre;
                        }
                        if (response.data.segundoApellido == null) {
                            this.ciudadano.primerApellido = response.data.primerApellido;
                        } else {
                            this.ciudadano.primerApellido = response.data.primerApellido;
                            this.ciudadano.segundoApellido = response.data.segundoApellido;
                        }
                        this.generoSelected = [response.data.ciudadano.genero.id];
                        this.ciudadano.fechaNacimiento = response.data.fechaNacimiento;
                        this.paisNacimientoSelected = [response.data.ciudadano.municipioNacimiento.departamento.pais.id];
                        this.municipioNacimientoSelected = [response.data.ciudadano.municipioNacimiento.id];
                        this.municipioResidenciaSelected = [response.data.ciudadano.municipioResidencia.id];
                        this.paisResidenciaSelected = [response.data.ciudadano.municipioResidencia.departamento.pais.id];
                        this.roleSelected = [response.data.cfgRole.id];
                        console.log(response);
                        //swal.close();

                    }  else {
                        swal({
                            title: 'Alerta!',
                            text: response.message,
                            type: 'error',
                            confirmButtonText: 'Aceptar'
                        });
                    } 
                    error => {
                        this.errorMessage = <any>error;
                        if (this.errorMessage != null) {
                            console.log(this.errorMessage);
                            alert('Error en la petición');
                        }
                    }
                }
            );
        }
    }
}