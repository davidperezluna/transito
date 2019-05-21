import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FroTrteSolicitudService } from '../../../../services/froTrteSolicitud.service';
import { FroFacTramiteService } from '../../../../services/froFacTramite.service';
import { UserCfgTipoIdentificacionService } from '../../../../services/userCfgTipoIdentificacion.service';
import { VhloCfgCombustibleService } from '../../../../services/vhloCfgCombustible.service';
import { VhloVehiculoService } from '../../../../services/vhloVehiculo.service';
import { PnalFuncionarioService } from '../../../../services/pnalFuncionario.service';
import { LoginService } from '../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRna-cambio-motor',
    templateUrl: './newRna.cambioMotor.html'
})
export class NewRnaCambioMotorComponent implements OnInit {
    @Output() onReadyTramite = new EventEmitter<any>();
    
    @Input() vehiculo: any = null;
    @Input() tramitesFactura: any = null;
    @Input() tramiteFactura: any = null;
    @Input() funcionario: any = null;
    @Input() tramitesRealizados: any = null;
    public errorMessage; 
    
    public realizado: any = false;
    public tramiteSolicitud: any = null;

    public tiposIdentificacion: any;
    public tipoIngresoList: string[];
    public combustibles: any;

    public datos = {
        'documentacion': true,
        'observacion': null,
        'numeroMotor': null,
        'numeroAceptacion': null,
        'numeroFactura': null,
        'sijinChequeoNumero': null,
        'sijinChequeoFecha': null,
        'entidad': null,
        'fecha': null,
        'tipoIdentificacion': null,
        'numeroIdentificacion': null,
        'campos': null,
        'idFuncionario': null,
        'idVehiculo': null,
        'idTipoIngreso': null,
        'idCombustible': null,
        'idTramiteFactura': null,
    };

    public tiposIngreso = [
        { value: 'NUEVO', label: 'NUEVO' },
        { value: 'USADO', label: 'USADO' },
    ];

    constructor(
        private _TramiteSolicitudService: FroTrteSolicitudService,
        private _TramiteFacturaService: FroFacTramiteService,
        private _CombustibleService: VhloCfgCombustibleService,
        private _VehiculoService: VhloVehiculoService,
        private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
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
        } else{
            this._CombustibleService.select().subscribe(
                response => {
                    this.combustibles = response;
                },
                error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert('Error en la petición');
                    }
                }
            );

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
        }
    }

    onEnviar() {
        this.datos.campos = ['motor'];
        this.datos.idVehiculo = this.vehiculo.id;
        this.datos.idTramiteFactura = this.tramiteFactura.id;

        let resumen = "<b>No. factura: </b>" + this.tramiteFactura.factura.numero +
                    '<br><b>Motor anterior: </b>' + this.vehiculo.motor.nombre +
                    '<br><b>Motor nuevo: </b>' + this.datos.numeroMotor;

        this.realizado = true;

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
}