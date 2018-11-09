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
    public nuevoNumero: any;
    public numeroRunt: any;
    public documentacion: any;
    public entregada = false;
    public resumen = {};     
    public datos = {
        'tipoRegrabacion': null,
        'motivo': null,
        'nuevoNumero': null,
        'numeroRunt': null,
        'documentacion': null,
        'entregada': null,
        'tramiteFormulario': null,
        'idFactura': null,
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

        this.vehiculo.servicioId = this.vehiculo.servicio.id    
        this.vehiculo.municipioId = this.vehiculo.municipio.id   
        this.vehiculo.lineaId = this.vehiculo.linea.id   
        this.vehiculo.colorId = this.vehiculo.color.id   
        this.vehiculo.combustibleId = this.vehiculo.combustible.id   
        this.vehiculo.carroceriaId = this.vehiculo.carroceria.id   
        this.vehiculo.sedeOperativaId = this.vehiculo.sedeOperativa.id   
        this.vehiculo.claseId = this.vehiculo.clase.id   
        this.vehiculo.servicioId = this.vehiculo.servicio.id 
        this.vehiculo.vin = this.nuevoNumero
        this._VehiculoService.editVehiculo(this.vehiculo,token).subscribe(
        response => {
            if(response.status == 'success'){
                this.datos.motivo = this.motivoSelected;
                this.datos.nuevoNumero = this.nuevoNumero;
                this.datos.numeroRunt = this.numeroRunt;
                this.datos.documentacion = this.documentacion;
                this.datos.entregada = this.entregada;
                this.datos.idFactura = this.factura.id;
                this.datos.tramiteFormulario = 'rnma-regrabarvin';
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