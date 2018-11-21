import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
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
    public resumen = {};     
    public datos = {
        'numeroRunt': null,
        'tramiteFormulario': null,
        'idFactura': null,
        'numeroLicenciaActual': null,
        'nuevaLicencia': null,

    };

    constructor(
        private _TramiteSolicitudService: TramiteSolicitudService,
        private _loginService: LoginService,
    ) { }

    ngOnInit() {}

    onEnviarTramite() {
        this.datos.idFactura = this.factura.id;
        this.datos.tramiteFormulario = 'rnrs-duplicadolicencia';
        this.readyTramite.emit({'foraneas':this.datos, 'resumen':this.resumen});
    }
    onCancelar(){
        this.cancelarTramite.emit(true);
    }

}