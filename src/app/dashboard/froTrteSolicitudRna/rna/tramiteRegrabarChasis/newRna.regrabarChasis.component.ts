import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { VehiculoService } from '../../../../services/vehiculo.service';
import { LoginService } from '../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRna-regrabar-chasis',
    templateUrl: './newRna.regrabarChasis.html'
})
export class NewRnaRegrabarChasisComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() tramiteFactura: any = null;
    public errorMessage;
    public tramiteFacturaSelected: any;
    public tipoRegrabacionList: string[];
    public tipoRegrabacionSelected: any;
    public motivoList: string[];
    public motivoSelected: any;
    public datos = {
        'motivo': null,
        'nuevoNumero': null,
        'numeroRunt': null,
        'tramiteFormulario': null,
        'idTramiteFactura': null,
        'idVehiculo': null,
        'campos': null,
    };

    constructor(
        private _TramiteSolicitudService: TramiteSolicitudService,
        private _loginService: LoginService,
        private _VehiculoService: VehiculoService,
    ) { }

    ngOnInit() {
        this.motivoList = ['Pérdida total', 'Deterioro', 'Improntas ilegales', 'Improntas ilegibles', 'Robado'];
    }

    enviarTramite() {
        let token = this._loginService.getToken();

        this.datos.motivo = this.motivoSelected;
         this.datos.idTramiteFactura = this.tramiteFactura.id;
        this.datos.tramiteFormulario = 'rna-regrabarchasis';
        this.datos.idVehiculo = this.vehiculo.id;
        this.datos.campos = ['regrabarchasis'];

        this._VehiculoService.update(this.datos, token).subscribe(
            response => {
                if (response.status == 'success') {
                    let resumen = 'Regrabado (SI)' +"<br/>"+
                        'chasis anterior'+ this.vehiculo.chasis +"<br/>"+
                        'chasis nuevo'+ this.datos.nuevoNumero +"<br/>"+
                        'motivo'+ this.datos.motivo +"<br/>"+
                        'numero runt'+ this.datos.numeroRunt;

                    this.readyTramite.emit({ 'foraneas': this.datos, 'resumen': resumen });
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