import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FroTrteSolicitudService } from '../../../../services/froTrteSolicitud.service';
import { FroFacTramiteService } from '../../../../services/froFacTramite.service';
import { VhloVehiculoService } from '../../../../services/vhloVehiculo.service';
import { CfgEntidadJudicialService } from "../../../../services/cfgEntidadJudicial.service";
import { LoginService } from '../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRna-cancelacion-matricula',
    templateUrl: './newRna.CancelacionMatricula.html'
})
export class NewRnaCancelacionMatriculaComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() tramiteFactura: any = null;
    public errorMessage;

    public tramiteSolicitud: any = null;
    public entidadesJudiciales: any;
    public tipoRegrabacionList: string[];
    public tipoRegrabacionSelected: any;
    public motivoSelected: any;

    public datos = {
        'idMotivoCancelacion': null,
        'idEntidadJudicial': null,
        'numeroOficio': null, 
        'declaracion':null,  
        'fechaDeclaracion':null,
        'ipat':null,
        'fechaHechos':null,
        'recuperarMotor':null,         
        'campos': null,
        'idVehiculo': null,
        'idTramiteFactura': null,
    };
    public motivosCancelacion = [
        { value: 'DESAPARICIÓN DOCUMENTAL', label: 'DESAPARICIÓN DOCUMENTAL' },
        { value: 'HURTO', label: 'HURTO' },
        { value: 'PERDIDA DEFINITIVA', label: 'PERDIDA DEFINITIVA' },
        { value: 'EXPORTACIÓN O REEXPORTACIÓN', label: 'EXPORTACIÓN O REEXPORTACIÓN' },
        { value: 'DESTRUCCIÓN O PERDIDA TOTAL', label: 'DESTRUCCIÓN O PERDIDA TOTAL' },
    ];

    constructor(
        private _TramiteSolicitudService: FroTrteSolicitudService,
        private _TramiteFacturaService: FroFacTramiteService,
        private _VehiculoService: VhloVehiculoService,
        private _EntidadJudicialService: CfgEntidadJudicialService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() { 
        let token = this._LoginService.getToken();

        this._TramiteFacturaService.show({ 'id': this.tramiteFactura.id }, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.tramiteFactura = response.data;

                    swal.close();
                } else {
                    this.tramiteFactura = null;

                    swal({
                        title: 'Error!',
                        text: response.message,
                        type: 'error',
                        confirmButtonText: 'Aceptar'
                    });
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

        if (this.tramiteFactura.realizado) {
            this._TramiteSolicitudService.showByTamiteFactura({ 'idTramiteFactura': this.tramiteFactura.id }, token).subscribe(
                response => {
                    if (response.code == 200) {
                        this.tramiteSolicitud = response.data;
                    } else {
                        this.tramiteSolicitud = null;

                        swal({
                            title: 'Error!',
                            text: response.message,
                            type: 'error',
                            confirmButtonText: 'Aceptar'
                        });
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
        } else {
            this._EntidadJudicialService.getEntidadJudicialSelect().subscribe(
                response => {
                    this.entidadesJudiciales = response;
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
        this.datos.campos = ['cancelacionmatricula'];
        this.datos.idTramiteFactura = this.tramiteFactura.id;
        this.datos.idVehiculo = this.vehiculo.id;

        let token = this._LoginService.getToken();

        this._VehiculoService.update(this.datos, token).subscribe(
            response => {
                if (response.status == 'success') {
                    let resumen = "<b>No. factura: </b>" + this.tramiteFactura.factura.numero;

                    this.readyTramite.emit({ 'foraneas': this.datos, 'resumen': resumen });
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

    onCancelar(){
        this.cancelarTramite.emit(true);
    }
}