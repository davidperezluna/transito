import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VhloCfgServicioService } from '../../../../../../services/vhloCfgServicio.service';
import { UserLcCfgCategoriaService } from '../../../../../../services/userLcCfgCategoria.service';
import { VhloCfgClaseService } from '../../../../../../services/vhloCfgClase.service';
import { UserLicenciaConduccionService } from 'app/services/userLicenciaConduccion.service';
import { UserLcCfgRestriccionService } from '../../../../../../services/userLcCfgRestriccion.service';
import { LoginService } from '../../../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRnc-expedicion-licencia-cambio-documento',
    templateUrl: './newRncExpedicionLicenciaCambioDocumento.html'
})
export class NewRncExpedicionLicenciaCambioDocumentoComponent implements OnInit {
    @Output() onReadyTramite = new EventEmitter<any>();
    @Input() funcionario: any = null;
    @Input() solicitante: any = null;
    @Input() tramiteFactura: any = null;
    @Input() tramitesRealizados: any = null;
    public errorMessage;

    public realizado: any = false;
    public tramiteSolicitud: any = null;
    public servicios: any;
    public clases: any;
    public categorias: any;
    public restricciones: any;

    public datos = {
        'campos': null,
        'numero': null,
        'documentacion': true,
        'observacion': null,
        'identificacionAnterior': null,
        'identificacionActual': null,
        /* 'vigencia': null, */
        'fechaExpedicion': null,
        'idFuncionario': null,
        'idOrganismoTransito': null,
        'idServicio': null,
        'idRestriccion': null,
        'idCategoria': null,
        'idTramiteFactura': null,
        'idSolicitante': null,
    };

    constructor(
        private _ServicioService: VhloCfgServicioService,
        private _CategoriaService: UserLcCfgCategoriaService,
        private _ClaseService: VhloCfgClaseService,
        private _UserLicenciaConduccionService: UserLicenciaConduccionService,
        private _LcRestriccionService: UserLcCfgRestriccionService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
        let token = this._LoginService.getToken();
        this.datos.idFuncionario = this.funcionario.id;
        console.log(this.solicitante);

        if (this.tramitesRealizados.length > 0) {
            this.tramitesRealizados.forEach(tramiteRealizado => {
                tramiteRealizado = Object.keys(tramiteRealizado).map(function (key) {
                    return tramiteRealizado[key];
                });

                if (tramiteRealizado.includes(this.tramiteFactura.id, 2)) {
                    this.realizado = true;
                }
            });
        }

        if (this.realizado) {
            swal({
                title: 'Atención!',
                text: 'El trámite seleccionado ya fue realizado.',
                type: 'warning',
                confirmButtonText: 'Aceptar'
            });
        } else {
            this.datos.identificacionAnterior = this.solicitante.identificacion;

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

            this._ClaseService.selectByTipoVehiculo({ 'idTipoVehiculo': this.tramiteFactura.precio.tipoVehiculo.id }, token).subscribe(
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

            this._LcRestriccionService.select().subscribe(
                response => {
                    this.restricciones = response;
                },
                error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert('Error en la petición');
                    }
                }
            );

            /* this._UserLicenciaConduccionService.searchByCiudadanoId({ 'idCiudadano': this.solicitante.id }, token).subscribe(
                response => {
                    this.licenciaConduccionActual = response;
                },
                error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert('Error en la petición');
                    }
                }
            ); */
        }
    }

    onChangedServicio(id) {
        if (id) {
            let token = this._LoginService.getToken();

            let datos = {
                'idServicio': id,
                'idTipoVehiculo': this.tramiteFactura.precio.tipoVehiculo.id
            }

            this._CategoriaService.selectByServicioAndTipoVehiculo(datos, token).subscribe(
                response => {
                    if (response.code == 200) {
                        setTimeout(() => {
                            this.categorias = response.data;
                        });
                    } else {
                        this.categorias = null;

                        swal({
                            title: response.title,
                            text: response.message,
                            type: response.status,
                            confirmButtonText: 'Aceptar'
                        });
                    }
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

    onEnviar() {
        this.datos.campos = ['expedicionLicenciaCambioDocumento'];
        this.datos.numero = this.datos.identificacionActual;
        this.datos.idOrganismoTransito = this.funcionario.organismoTransito.id;
        this.datos.idTramiteFactura = this.tramiteFactura.factura.id;
        this.datos.idSolicitante = this.solicitante.id;

        let resumen = "<b>No. factura</b>" + this.tramiteFactura.factura.numero;

        this.realizado = true;

        this.onReadyTramite.emit(
            {
                'documentacion': this.datos.documentacion,
                'observacion': this.datos.observacion,
                'foraneas': this.datos,
                'resumen': resumen,
                'idTramiteFactura': this.tramiteFactura.id,
            }
        );
    }
}