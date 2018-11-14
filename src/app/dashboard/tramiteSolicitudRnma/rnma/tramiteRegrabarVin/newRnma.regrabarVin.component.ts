import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { LoginService } from '../../../../services/login.service';
import { VehiculoService } from '../../../../services/vehiculo.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRnma-regrabar-vin',
    templateUrl: './newRnma.regrabarVin.html'
})
export class NewRnmaRegrabarVinComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() factura: any = null;
    public errorMessage;

    public tramiteFacturaSelected: any; 
    public tipoRegrabacionList: string[];
    public motivoList: string[];
    public motivoSelected: any;
    public resumen = {};     
    public datos = {
        'motivo': null,
        'nuevoNumero': null,
        'numeroRunt': null,
        'tramiteFormulario': null,
        'idFactura': null,
        'idVehiculo': null,
        'campos': null,
    };

    constructor(
        private _loginService: LoginService,
        private _VehiculoService: VehiculoService,
    ) { }

    ngOnInit() {
        this.motivoList = ['Pérdida total', 'Deterioro', 'Improntas ilegales', 'Improntas ilegibles', 'Robado'];
    }

    enviarTramite() {
        let token = this._loginService.getToken();

        this.datos.motivo = this.motivoSelected;
        this.datos.idFactura = this.factura.id;
        this.datos.tramiteFormulario = 'rnma-regrabarvin';
        this.datos.idVehiculo = this.vehiculo.id;
        this.datos.campos = ['regrabarvin'];

        this._VehiculoService.update(this.datos,token).subscribe(
        response => {
            if(response.status == 'success'){
                
                this.readyTramite.emit({'foraneas':this.datos, 'resumen':this.resumen});
            }
            error => {
                    this.errorMessage = <any>error;

                    if(this.errorMessage != null){
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