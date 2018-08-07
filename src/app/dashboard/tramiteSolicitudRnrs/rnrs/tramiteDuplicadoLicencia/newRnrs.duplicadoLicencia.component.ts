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
    public errorMessage;
    public respuesta;
    public tramiteFacturaSelected: any;
    public sustratos: any;
    public sustratoSelected: any;
    public entregada = false;
    public datos = {
        'numeroLicencia': null,
        'numeroRunt': null,
        'sustrato': null,
        'documentacion': null,
        'entregada': null,
        'tramiteFactura': null,
    };

    constructor(
        private _TramiteSolicitudService: TramiteSolicitudService,
        private _loginService: LoginService,
        private _SustratoService: SustratoService,
    ) { }

    ngOnInit() {}

    onEnviarTramite() {
        this.datos.tramiteFactura = 28;
        this.readyTramite.emit(this.datos);
    }
    onCancelar(){
        this.cancelarTramite.emit(true);
    }

}