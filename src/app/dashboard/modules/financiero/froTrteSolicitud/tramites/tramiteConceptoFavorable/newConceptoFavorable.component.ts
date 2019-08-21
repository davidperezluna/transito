import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { VhloCfgNivelServicioService } from '../../../../../../services/vhloCfgNivelServicio.service';
import { UserEmpresaTransporteService } from "../../../../../../services/userEmpresaTransporte.service";
import { VhloTpAsignacionService } from '../../../../../../services/vhloTpAsignacion.service';
import { LoginService } from '../../../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'app-concepto-favorable',
    templateUrl: './newConceptoFavorable.html'
})

export class NewRnetConceptoFavorableComponent implements OnInit {
    @Output() onReadyTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() funcionario: any = null;
    @Input() tramiteFactura: any = null;
    @Input() tramitesRealizados: any = null;
    public errorMessage;

    public nit: any = null;
    public numeroActo: any = null;

    public empresaEncontrada;
    public empresaActual;
    public idAsignacion;
    public arrayCuposDisponibles = null;
    public mostrarFormulario: any = false;

    public realizado: any = false;
    public tramiteSolicitud: any = null;
    public nivelesServicio: any;

    public datos = {
        'campos': null,
        'documentacion': true,
        'observacion': null,
        'idFuncionario': null,
        'idTramiteFactura': null,
        'idEmpresaActual': null,
        'numeroCupoActual': null,
        'numeroTarjetaOperacionActual': null,
        'numeroConceptoFavorable': null,
        'idEmpresaNueva': null,
        'idCupoNuevo': null,
        'numeroTarjetaOperacionNuevo': null,
        'fechaVigencia': null,
        'idNivelServicioAnterior': null,
        'idVehiculo': null,

    };

    constructor(
        private _VhloTpAsignacionService: VhloTpAsignacionService,
        private _UserEmpresaTransporteService: UserEmpresaTransporteService,
        private _NivelServicioService: VhloCfgNivelServicioService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
        this.datos.idFuncionario = this.funcionario.id;

        let token = this._LoginService.getToken();


        this._UserEmpresaTransporteService.searchByVehiculo({ 'idVehiculo': this.vehiculo.id }, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.mostrarFormulario = true;
                    this.empresaActual = response.data.empresaTransporte.empresa.nombre;
                    this.idAsignacion = response.data.asignacion.id;
                    this.datos.idEmpresaActual = response.data.empresaTransporte.empresa.id;
                    this.datos.numeroCupoActual = response.data.cupo.numero;
                    this.datos.idNivelServicioAnterior = response.data.nivelServicio.id;
                    this.datos.numeroTarjetaOperacionActual = response.data.tarjetaOperacion.numeroTarjetaOperacion;
                } else {
                    this.mostrarFormulario = false;
                    swal({
                        title: response.title,
                        text: response.message,
                        type: response.status,
                        confirmButtonText: 'Aceptar'
                    })
                }
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
        );

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
            this._NivelServicioService.select().subscribe(
                response => {
                    this.nivelesServicio = response;
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
        this.datos.campos = ['conceptoFavorable'];
        this.datos.idTramiteFactura = this.tramiteFactura.factura.id;
        this.datos.idVehiculo = this.vehiculo.id;
        this.datos.idEmpresaNueva = this.empresaEncontrada.id;

        let resumen = "<b>No. factura</b>" + this.tramiteFactura.factura.numero +
            ", numeroConceptoFavorable:" + this.datos.numeroConceptoFavorable;

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

    onSearchEmpresaTransporte() {
        let token = this._LoginService.getToken();

        this._UserEmpresaTransporteService.searchByNitAndNumeroActo({ 'idAsignacion': this.idAsignacion, 'nit': this.nit, 'numeroActo': this.numeroActo }, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.empresaEncontrada = response.data;
                    console.log(this.empresaEncontrada);
                    this._VhloTpAsignacionService.searchCuposDisponibles({ 'idEmpresa': this.empresaEncontrada.id }, token).subscribe(
                        response => {
                            if (response.code == 200) {
                                this.arrayCuposDisponibles = response.data;

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
                                    alert('Error en la petición');
                                }
                            }
                        }
                    );
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
                        alert('Error en la petición');
                    }
                }
            }
        );
    }
}