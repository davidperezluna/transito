import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FroTrteSolicitudService } from '../../../../services/froTrteSolicitud.service';
import { FroFacTramiteService } from '../../../../services/froFacTramite.service';
import { LoginService } from '../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRna-duplicado-placa',
    templateUrl: './newRna.duplicadoPlaca.html'
})
export class NewRnaDuplicadoPlacaComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() tramiteFactura: any = null;
    public errorMessage;

    public tramiteSolicitud: any = null;
    public motivoList: string[];
    public motivoSelected: any;
    
    public datos = {
        'motivo': null,
        'cantidad': null,
        'numeroRunt': null,
        'idTramiteFactura': null,
    };

    constructor(
        private _TramiteSolicitudService: FroTrteSolicitudService,
        private _TramiteFacturaService: FroFacTramiteService,
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
            this.motivoList = ['Destrucción', 'Deterioro', 'Hurto', 'Pérdida'];
        }
    }

   
    onEnviar() {
        this.datos.motivo = this.motivoSelected;
        this.datos.idTramiteFactura = this.tramiteFactura.id;

        let resumen = "<b>No. factura: </b>" + this.tramiteFactura.factura.numero +
            '<br><b>Motivo: </b>' + this.motivoSelected;

        this.readyTramite.emit({'foraneas':this.datos, 'resumen': resumen});
    }
    onCancelar(){
        this.cancelarTramite.emit(true);
    }

}