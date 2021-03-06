import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserCfgTipoIdentificacionService } from '../../../../../../services/userCfgTipoIdentificacion.service';
import { VhloCfgCombustibleService } from '../../../../../../services/vhloCfgCombustible.service';
import { LoginService } from '../../../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'app-cambio-motor',
    templateUrl: './new.cambioMotor.html'
})
export class NewCambioMotorComponent implements OnInit {
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
    public combustibles: any;
    public tipoIngresoSelected: any;

    public datos = {
        'documentacion': true,
        'observacion': null,
        'idTipoIngreso': null,
        'idFuncionario': null,
    };

    public datosNuevo = {
        'documentacion': true,
        'observacion': null,
        'numeroMotor': null,
        'numeroFactura': null,
        'fechaFactura': null,
        'declaracionAceptacion': null,
        'fechaImportacion': null,
        'campos': null,
        'idFuncionario': null,
        'idVehiculo': null,
        'idTipoIngreso': null,
        'idCombustible': null,
        'idTramiteFactura': null,
    };

    public datosUsado = {
        'documentacion': true,
        'observacion': null,
        'numeroMotor': null,
        'numeroAceptacion': null,
        'numeroCompraVenta': null,
        'fechaCompraVenta': null,
        'sijinChequeoNumero': null,
        'sijinChequeoFecha': null,
        'entidad': null,
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
        private _CombustibleService: VhloCfgCombustibleService,
        private _TipoIdentificacionService: UserCfgTipoIdentificacionService,
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
        let resumen;

        this.realizado = true;

        if (this.datos.idTipoIngreso == 'NUEVO') {
            this.datosNuevo.campos = ['motor'];
            this.datosNuevo.idVehiculo = this.vehiculo.id;
            this.datosNuevo.idTramiteFactura = this.tramiteFactura.id;
            this.datosNuevo.idTipoIngreso = this.datos.idTipoIngreso;
            this.datosNuevo.idFuncionario = this.datos.idFuncionario;

            resumen = "No. factura: ," + this.tramiteFactura.factura.numero +
                    'Motor anterior: ,' + this.vehiculo.motor +
                    'Motor nuevo: ,' + this.datosNuevo.numeroMotor;

            this.onReadyTramite.emit(
                {
                    'documentacion':this.datos.documentacion, 
                    'observacion':this.datos.observacion, 
                    'foraneas':this.datosNuevo, 
                    'resumen':resumen,
                    'idTramiteFactura': this.tramiteFactura.id,
                }
            );   
        } else {
            this.datosUsado.campos = ['motor'];
            this.datosUsado.idVehiculo = this.vehiculo.id;
            this.datosUsado.idTramiteFactura = this.tramiteFactura.id;
            this.datosUsado.idTipoIngreso = this.datos.idTipoIngreso;
            this.datosUsado.idFuncionario = this.datos.idFuncionario;

            resumen = "No. factura: ," + this.tramiteFactura.factura.numero +
                    'Motor anterior: ,' + this.vehiculo.motor +
                    'Motor nuevo: ,' + this.datosUsado.numeroMotor;

            this.onReadyTramite.emit(
                {
                    'documentacion':this.datos.documentacion, 
                    'observacion':this.datos.observacion, 
                    'foraneas':this.datosUsado, 
                    'resumen':resumen,
                    'idTramiteFactura': this.tramiteFactura.id,
                }
            );   
        }        
    }
}