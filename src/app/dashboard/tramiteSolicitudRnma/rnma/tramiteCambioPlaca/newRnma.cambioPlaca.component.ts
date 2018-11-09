import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteFacturaService } from '../../../../services/tramiteFactura.service';
import { LoginService } from '../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRnma-cambio-placa',
    templateUrl: './newRnma.cambioPlaca.html'
})
export class NewRnmaCambioPlacaComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() factura: any = null;
    public errorMessage;
    public respuesta;
    public tramiteFacturaSelected: any;
    public tipoCambioList: string[];
    public tipoCambioSelected: any;
    public numeroRunt: any;
    public nuevaPlaca: any;
    public documentacion: any;
    public resumen = {};     public datos = {
        'tipoCambio': null,
        'numeroRunt': null,
        'nuevaPlaca': null,
        'documentacion': null,
        'sustrato': null,
        'tramiteFormulario': null,
        'idFactura': null,
    };

    constructor(
        private _loginService: LoginService,
        private _tramiteFacturaService: TramiteFacturaService,
    ) { }

    ngOnInit() {
        this.tipoCambioList = ['Antiguo', 'Clasico', 'Normal'];
    }
    
    enviarTramite() {
        this.datos.tipoCambio = this.tipoCambioSelected;
        this.datos.numeroRunt = this.numeroRunt;
        this.datos.nuevaPlaca = this.nuevaPlaca;
        this.datos.documentacion = this.documentacion;
        this.datos.idFactura = this.factura.id;
        this.datos.tramiteFormulario = 'rnma-cambioplaca';
        this.readyTramite.emit({'foraneas':this.datos, 'resumen':this.resumen});
    }
    onCancelar(){
        this.cancelarTramite.emit(true);
    }

}