import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';

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

    public resumen = {

    };     
    
    public datos = {
        'numeroRunt': null,
        'tramiteFormulario': null,
        'idFactura': null,
        'numeroLicenciaActual': null,
        'nuevaLicencia': null,

    };

    constructor(
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