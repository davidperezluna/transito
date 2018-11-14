import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteFacturaService } from '../../../../services/tramiteFactura.service';
import { LoginService } from '../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRnrs-cambio-placa',
    templateUrl: './newRnrs.cambioPlaca.html'
})
export class NewRnrsCambioPlacaComponent implements OnInit {
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

    public tiposCambio = [
        { value: 'ANTIGUO', label: 'ANTIGUO' },
        { value: 'CLASICO', label: 'CLASICO' },
        { value: 'NORMAL', label: 'NORMAL' },
    ];

    constructor(
        private _loginService: LoginService,
        private _tramiteFacturaService: TramiteFacturaService,
    ) { }

    ngOnInit() { }
    
    enviarTramite() {
        this.datos.tipoCambio = this.tipoCambioSelected;
        this.datos.numeroRunt = this.numeroRunt;
        this.datos.nuevaPlaca = this.nuevaPlaca;
        this.datos.documentacion = this.documentacion;
        this.datos.idFactura = this.factura.id;
        this.datos.tramiteFormulario = 'rnrs-cambioplaca';
        this.readyTramite.emit({'foraneas':this.datos, 'resumen':this.resumen});
    }
    onCancelar(){
        this.cancelarTramite.emit(true);
    }

}