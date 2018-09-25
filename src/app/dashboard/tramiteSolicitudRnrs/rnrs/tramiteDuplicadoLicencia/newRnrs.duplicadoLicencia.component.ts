import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { SustratoService } from '../../../../services/sustrato.service';
import { LoginService } from '../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRnrs-duplicado-licencia',
    templateUrl: './newRnrs.duplicadoLicencia.html'
})
export class NewRnrsDuplicadoLicenciaComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() factura: any = null;
    public errorMessage;
    public respuesta;
    public tramiteFacturaSelected: any;
    public sustratos: any;
    public sustratoSelected: any;
    public entregada = false;
    public resumen = {};     public datos = {
        'numeroLicencia': null,
        'numeroRunt': null,
        'sustrato': null,
        'documentacion': null,
        'entregada': null,
        'tramiteFormulario': null,
        'facturaId': null,
    };

    constructor(
        private _TramiteSolicitudService: TramiteSolicitudService,
        private _loginService: LoginService,
        private _SustratoService: SustratoService,
    ) { }

    ngOnInit() {}

    onEnviarTramite() {
        this.datos.facturaId = this.factura.id;
        this.datos.tramiteFormulario = 'rnrs-duplicadolicencia';
        this.readyTramite.emit({'foraneas':this.datos, 'resumen':this.resumen});
    }
    onCancelar(){
        this.cancelarTramite.emit(true);
    }

}