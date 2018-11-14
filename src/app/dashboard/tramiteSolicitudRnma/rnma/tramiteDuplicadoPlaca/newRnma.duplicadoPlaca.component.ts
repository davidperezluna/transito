import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { TramiteFacturaService } from '../../../../services/tramiteFactura.service';
import { LoginService } from '../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRnma-duplicado-placa',
    templateUrl: './newRnma.duplicadoPlaca.html'
})
export class NewRnmaDuplicadoPlacaComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() factura: any = null;
    public errorMessage;
    public tramiteFacturaSelected: any;
    public motivoList: string[];
    public motivoSelected: any;
    public resumen = {};     public datos = {
        'motivo': null,
        'cantidad': null,
        'numeroRunt': null,
        'sustrato': null,
        'tramiteFormulario': null,
        'idFactura': null,
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
        this.datos.idFactura = this.factura.id;
        this.datos.tramiteFormulario = 'rnma-dupicadoplaca';
        this.readyTramite.emit({'foraneas':this.datos, 'resumen':this.resumen});
    }
    onCancelar(){
        this.cancelarTramite.emit(true);
    }

}