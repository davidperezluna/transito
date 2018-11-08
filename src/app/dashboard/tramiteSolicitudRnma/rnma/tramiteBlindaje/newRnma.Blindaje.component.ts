import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { LoginService } from '../../../../services/login.service';
import { VehiculoService } from '../../../../services/vehiculo.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRnma-blindaje',
    templateUrl: './newRnma.Blindaje.html'
})
export class NewRnmaBlindajeComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() factura: any = null;
    public errorMessage;
    public respuesta;
    public tramiteFacturaSelected: any;

    public tipoRegrabacionList: string[];
    public tipoBlindajeList: string[];
    public tipoRegrabacionSelected: any;
    public nivelBlindajeList: string[];
    public motivoSelected: any;
    public nuevoNumero: any;
    public numeroRunt: any;
    public documentacion: any;
    public entregada = false;
    public resumen = {};     public datos = {
        'tipoBlindaje': null,
        'nivelBlindaje': null,
        'empresaBlindadora': null,
        'numeroRunt': null,
        'tramiteFormulario': null,
        'facturaId': null,
    };

    constructor(
        private _TramiteSolicitudService: TramiteSolicitudService,
        private _loginService: LoginService,
        private _VehiculoService: VehiculoService,
    ) { }

    ngOnInit() {
        this.nivelBlindajeList = ['UNO', 'DOS', 'TRES', 'CUATRO', 'CINCO','SEIS','SIETE','OCHO'];
        this.tipoBlindajeList = ['Blindaje de un vehículo', 'Desblindaje de un vehículo'];
    }

    enviarTramite() {
        this.datos.facturaId = this.factura.id;
        this.datos.tramiteFormulario = 'rnma-blindaje';
        this.readyTramite.emit({'foraneas':this.datos, 'resumen':this.resumen});
    }
    onCancelar(){
        this.cancelarTramite.emit(true);
    }

}