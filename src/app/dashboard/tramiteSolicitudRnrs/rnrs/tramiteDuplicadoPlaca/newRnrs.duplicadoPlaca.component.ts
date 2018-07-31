import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { TramiteFacturaService } from '../../../../services/tramiteFactura.service';
import { LoginService } from '../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRnrs-duplicado-placa',
    templateUrl: './newRnrs.duplicadoPlaca.html'
})
export class NewRnrsDuplicadoPlacaComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    public errorMessage;
    public respuesta;
    public tramiteFacturaSelected: any;
    public motivoList: string[];
    public motivoSelected: any;
    public cantidad: any;
    public numeroRunt: any;
    public documentacion: any;
    public entregada = false;
    public datos = {
        'motivo': null,
        'cantidad': null,
        'numeroRunt': null,
        'documentacion': null,
        'entregada': null,
        'sustrato': null,
        'tramiteFactura': null,
    };

    constructor(
        private _TramiteSolicitudService: TramiteSolicitudService,
        private _loginService: LoginService,
        private _tramiteFacturaService: TramiteFacturaService,
    ) { }

    ngOnInit() {
        this.motivoList = ['Destrucción', 'Deterioro', 'Hurto', 'Pérdida'];
    }

   
    enviarTramite() {
        this.datos.motivo = this.motivoSelected;
        this.datos.cantidad = this.cantidad;
        this.datos.numeroRunt = this.numeroRunt;
        this.datos.documentacion = this.documentacion;
        this.datos.entregada = this.entregada;
        this.datos.tramiteFactura =18;
        this.readyTramite.emit(this.datos);
    }
    onCancelar(){
        this.cancelarTramite.emit(true);
    }

}