import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FroTrteSolicitudService } from '../../../../services/froTrteSolicitud.service';
import { FroFacTramiteService } from '../../../../services/froFacTramite.service';
import { VhloVehiculoService } from '../../../../services/vhloVehiculo.service';
import { PnalFuncionarioService } from '../../../../services/pnalFuncionario.service';
import { LoginService } from '../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRna-regrabar-vin',
    templateUrl: './newRna.regrabarVin.html'
})
export class NewRnaRegrabarVinComponent implements OnInit {
    @Output() onReadyTramite = new EventEmitter<any>();
    
    @Input() vehiculo: any = null;
    @Input() tramiteFactura: any = null;
    @Input() funcionario: any = null;
    @Input() tramitesRealizados: any = null;
    public errorMessage; 
    
    public realizado: any = false;
    public tramiteSolicitud: any; 
    public motivoSelected: any;
    
    public motivos = [
        { 'value': 'Pérdida total', 'label': 'Pérdida total' },
        { 'value': 'Deterioro', 'label': 'Deterioro' },
        { 'value': 'Improntas ilegales', 'label': 'Improntas ilegales' },
        { 'value': 'Improntas ilegibles', 'label': 'Improntas ilegibles' },
        { 'value': 'Hurto', 'label': 'Hurto' },
    ];

    public datos = {
        'documentacion': true,
        'observacion': null,
        'tipoRegrabacion': null,
        'motivo': null,
        'nuevoNumero': null,
        'campos': null,
        'idFuncionario': null,
        'idVehiculo': null,
        'idTramiteFactura': null,
    };

    constructor(
        private _TramiteSolicitudService: FroTrteSolicitudService,
        private _TramiteFacturaService: FroFacTramiteService,
        private _VehiculoService: VhloVehiculoService,
        private _FuncionarioService: PnalFuncionarioService,
        private _LoginService: LoginService,
    ) { }

    ngOnInit() {
        this.datos.idFuncionario  = this.funcionario.id;
        
        if ( this.tramitesRealizados.length > 0) {
            this.tramitesRealizados.forEach(tramiteRealizado => {
                tramiteRealizado = Object.keys(tramiteRealizado).map(function(key) {
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
        }
    }

    onEnviar() {
        let token = this._LoginService.getToken();

        this.datos.campos = ['regrabarvin'];
        this.datos.idTramiteFactura = this.tramiteFactura.id;
        this.datos.idVehiculo = this.vehiculo.id;

        this._TramiteSolicitudService.validations(this.datos, token).subscribe(
            response => {
              if (response.code == 200) {
                this._VehiculoService.update(this.datos, token).subscribe(
                    response => {
                        if (response.status == 'success') {
                            let resumen = "<b>No. factura: </b>" + this.tramiteFactura.factura.numero +
                                '<br/>Regrabado (SI)' +
                                '<br/>Vin anterior: ' + this.vehiculo.vin +
                                '<br/>Vin nuevo: ' + this.datos.nuevoNumero +
                                '<br/>Motivo: ' + this.datos.motivo;
        
                            this.onReadyTramite.emit(
                                {
                                    'documentacion':this.datos.documentacion, 
                                    'observacion':this.datos.observacion, 
                                    'foraneas':this.datos, 
                                    'resumen':resumen,
                                    'idTramiteFactura': this.tramiteFactura.id,
                                }
                            );
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
              }else{
                swal({
                  title: 'Error!',
                  text: response.message,
                  type: 'error',
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