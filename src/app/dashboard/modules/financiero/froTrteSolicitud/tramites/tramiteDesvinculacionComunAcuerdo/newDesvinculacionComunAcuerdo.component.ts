import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { VhloTpAsignacionService } from '../../../../../../services/vhloTpAsignacion.service';
import { VhloCfgServicioService } from "../../../../../../services/vhloCfgServicio.service";
import { VhloPropietarioService } from "../../../../../../services/vhloPropietario.service";
import { LoginService } from '../../../../../../services/login.service';
import { DatePipe, CurrencyPipe } from '@angular/common';
import swal from 'sweetalert2';
declare var $: any;

@Component({
    selector: 'app-desvinculacion-comun-acuerdo',
    templateUrl: './newDesvinculacionComunAcuerdo.html',
    providers: [DatePipe]
})

export class NewRnetDesvinculacionComunAcuerdoComponent implements OnInit {
    @Output() onReadyTramite = new EventEmitter<any>();
    @Input() tramiteFactura: any = null;
    @Input() vehiculo: any = null;
    @Input() funcionario: any = null;
    @Input() tramitesRealizados: any = null;
    public errorMessage;

    public tarjetaOperacion;
    public servicios;
    public propietarios;

    public table: any; 

    public realizado: any = false;
    public tramiteSolicitud: any = null;

    public datos = {
        'documentacion': true,
        'observacion': null,
        'campos': null,
        'idVehiculo': null,
        'representante': null,
        'fechaResolucion': null,
        'fechaSolicitud': null,
        'idFuncionario': null,
        'idTramiteFactura': null,
    };

    constructor(
        private _VhloTpAsignacionService: VhloTpAsignacionService,
        private _VhloPropietarioService: VhloPropietarioService,
        private _ServicioService: VhloCfgServicioService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
        console.log(this.vehiculo);

        let token = this._LoginService.getToken();

        this._VhloTpAsignacionService.searchCupoByVehiculo({ 'idVehiculo': this.vehiculo.id }, token).subscribe(
            response => {
                this.datos.representante = response.data.empresaTransporte.empresa.empresaRepresentante.ciudadano.primerNombre + ' ' + response.data.empresaTransporte.empresa.empresaRepresentante.ciudadano.primerApellido;
                
                this._VhloPropietarioService.searchByVehiculo({ 'idVehiculo': this.vehiculo.id }, token).subscribe(
                    response => {
                        this.propietarios = response.data;
                        let timeoutId = setTimeout(() => {
                            this.onInitTable();
                        }, 100);
                    },
                    error => {
                        this.errorMessage = <any>error;

                        if (this.errorMessage != null) {
                            console.log(this.errorMessage);
                            alert("Error en la petición");
                        }
                    }
                );
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
        }
    }

    onInitTable() {
        this.table = $('#dataTables-example').DataTable({
            destroy: true,
            responsive: false,
            pageLength: 10,
            sPaginationType: 'full_numbers',
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


    onEnviar() {
        this.datos.campos = ['desvinculacionComunAcuerdo'];
        this.datos.idTramiteFactura = this.tramiteFactura.id;
        this.datos.idFuncionario = this.funcionario.id;
        this.datos.idVehiculo = this.vehiculo.id;

        let resumen = "No. factura: " + this.tramiteFactura.factura.numero +
            ", fechaResolucion: " + this.datos.fechaResolucion +
            ", fechaSolicitud: " + this.datos.fechaSolicitud;

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