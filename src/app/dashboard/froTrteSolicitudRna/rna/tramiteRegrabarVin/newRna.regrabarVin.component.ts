import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { LoginService } from '../../../../services/login.service';
import { VehiculoService } from '../../../../services/vehiculo.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRna-regrabar-vin',
    templateUrl: './newRna.regrabarVin.html'
})
export class NewRnaRegrabarVinComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() tramiteFactura: any = null;
    public errorMessage;
    public tramiteFacturaSelected: any; 
    public motivoSelected: any;
    public resumen: any = null;
    
    public motivos = [
        { 'value': 'Pérdida total', 'label': 'Pérdida total' },
        { 'value': 'Deterioro', 'label': 'Deterioro' },
        { 'value': 'Improntas ilegales', 'label': 'Improntas ilegales' },
        { 'value': 'Improntas ilegibles', 'label': 'Improntas ilegibles' },
        { 'value': 'Hurto', 'label': 'Hurto' },
    ];

    public datos = {
        'tipoRegrabacion': null,
        'motivo': null,
        'nuevoNumero': null,
        'numeroRunt': null,
        'campos': null,
        'tramiteFormulario': null,
        'idTramiteFactura': null,
        'idVehiculo': null,
    };

    constructor(
        private _TramiteSolicitudService: TramiteSolicitudService,
        private _LoginService: LoginService,
        private _VehiculoService: VehiculoService,
    ) { }

    ngOnInit() { }

    onEnviar() {
        let token = this._LoginService.getToken();

         this.datos.idTramiteFactura = this.tramiteFactura.id;
        this.datos.tramiteFormulario = 'rna-regrabarvin';
        this.datos.idVehiculo = this.vehiculo.id;
        this.datos.campos = ['regrabarvin'];

        this._VehiculoService.update(this.datos, token).subscribe(
            response => {
                if (response.status == 'success') {

                    this.readyTramite.emit({ 'foraneas': this.datos, 'resumen': this.resumen });
                }
                error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert("Error en la petición");
                    }
                }
            });
    }
    onCancelar(){
        this.cancelarTramite.emit(true);
    }

}