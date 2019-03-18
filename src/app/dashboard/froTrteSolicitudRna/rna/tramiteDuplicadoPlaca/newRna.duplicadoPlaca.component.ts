import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { TramiteFacturaService } from '../../../../services/tramiteFactura.service';
import { LoginService } from '../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRna-duplicado-placa',
    templateUrl: './newRna.duplicadoPlaca.html'
})
export class NewRnaDuplicadoPlacaComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() tramiteFactura: any = null;
    public errorMessage;
    public tramiteFacturaSelected: any;
    public motivoList: string[];
    public motivoSelected: any;
    public resumen = {};     
    
    public datos = {
        'motivo': null,
        'cantidad': null,
        'numeroRunt': null,
        'tramiteFormulario': null,
        'idTramiteFactura': null,
    };

    constructor(
        private _TramiteSolicitudService: TramiteSolicitudService,
        private _loginService: LoginService,
        private _tramiteFacturaService: TramiteFacturaService,
    ) { }

    ngOnInit() {
        this.motivoList = ['Destrucción', 'Deterioro', 'Hurto', 'Pérdida'];
    }

   
    onEnviar() {
        this.datos.motivo = this.motivoSelected;
         this.datos.idTramiteFactura = this.tramiteFactura.id;
        this.datos.tramiteFormulario = 'rna-duplicadoplaca';
        this.readyTramite.emit({'foraneas':this.datos, 'resumen':this.resumen});
    }
    onCancelar(){
        this.cancelarTramite.emit(true);
    }

}