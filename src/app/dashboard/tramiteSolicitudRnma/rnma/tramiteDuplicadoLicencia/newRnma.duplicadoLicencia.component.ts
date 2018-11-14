import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { SustratoService } from '../../../../services/sustrato.service';
import { LoginService } from '../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRnma-duplicado-licencia',
    templateUrl: './newRnma.duplicadoLicencia.html'
})
export class NewRnmaDuplicadoLicenciaComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() factura: any = null;
    public errorMessage;

    public tramiteFacturaSelected: any;
    public numeroRunt: any;
    public documentacion: any;
    public entregada = false;

    public resumen = {

    };     
    
    public datos = {
        'numeroRunt': null,
        'documentacion': null,
        'entregada': null,
        'tramiteFormulario': null,
        'idFactura': null,
    };

    constructor(
        private _loginService: LoginService,
        private _SustratoService: SustratoService,
    ) { }

    ngOnInit() { }

    
    enviarTramite() {
        this.datos.idFactura = this.factura.id;
        this.datos.tramiteFormulario = 'rnma-duplicado-licencia';
        this.readyTramite.emit({'foraneas':this.datos, 'resumen':this.resumen});
    }

    onCancelar(){
        this.cancelarTramite.emit(true);
    }

}