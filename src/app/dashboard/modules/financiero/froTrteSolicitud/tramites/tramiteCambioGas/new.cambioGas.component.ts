import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FroTrteSolicitudService } from '../../../../../../services/froTrteSolicitud.service';
import { FroFacTramiteService } from '../../../../../../services/froFacTramite.service';
import { VhloCfgCombustibleService } from '../../../../../../services/vhloCfgCombustible.service';
import { VhloVehiculoService } from '../../../../../../services/vhloVehiculo.service';
import { PnalFuncionarioService } from '../../../../../../services/pnalFuncionario.service';
import { LoginService } from '../../../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'app-cambio-gas',
    templateUrl: './new.cambioGas.html'
})
export class NewCambioGasComponent implements OnInit {
    @Output() onReadyTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() tramiteFactura: any = null;
    @Input() funcionario: any = null;
    @Input() tramitesRealizados: any = null;
    public errorMessage; 
    
    public realizado: any = false;
    public tramiteSolicitud: any = null;
    public colores: any;
    public colorSelected: any;
    public combustible;
     
    public datos = {
        'documentacion': true,
        'observacion': null,
        'placa': null,
        'linea': null,
        'marca': null,
        'modelo': null,
        'servicio': null,
        'serie': null,
        'motor': null,
        'chasis': null,
        'vin': null,
        'numeroCertificado': null,
        'fechaExpedicion': null,
        'fechaVencimiento': null,
        'numeroChip': null,
        'numeroKIT': null,
        'numeroSerial': null,
        'fechaFabricacion': null,
        'presion': null,
        'campos': null,
        'idFuncionario': null,
        'idVehiculo': null,
        'idCombustibleCambio': null,
        'idTramiteFactura': null,
    };
    

    constructor(
        private _TramiteSolicitudService: FroTrteSolicitudService,
        private _TramiteFacturaService: FroFacTramiteService,
        private _CombustibleService: VhloCfgCombustibleService,
        private _LoginService: LoginService,
    ) { }
  
    ngOnInit() {
        this.datos.idFuncionario  = this.funcionario.id;
        this.datos.placa = this.vehiculo.placa.numero;
        this.datos.linea = this.vehiculo.linea.nombre;
        this.datos.marca = this.vehiculo.linea.marca.nombre;
        this.datos.modelo = this.vehiculo.modelo;
        this.datos.servicio = this.vehiculo.servicio.nombre;
        this.datos.serie = this.vehiculo.serie;
        this.datos.motor = this.vehiculo.motor;
        this.datos.chasis = this.vehiculo.chasis;
        this.datos.vin = this.vehiculo.vin;
        
        if ( this.tramitesRealizados.length > 0) {
            this.tramitesRealizados.forEach(tramiteRealizado => {
                tramiteRealizado = Object.keys(tramiteRealizado).map(function(key) {
                    return tramiteRealizado[key];
                });
                
                if (tramiteRealizado.includes(this.tramiteFactura.id, 2)) {
                    this.realizado = true;
                }
            });
        }

        if (this.realizado) {
            swal({
                title: 'Atención!',
                text: 'El trámite seleccionado ya fue realizado.',
                type: 'warning',
                confirmButtonText: 'Aceptar'
            });
        }
    }
    
   
    onEnviar(){
        let token = this._LoginService.getToken();

        this._CombustibleService.show({ 'id': 4 }, token).subscribe(
            response => {
                if (response.code == 200) {
                    this.combustible = response.data;
                    this.datos.idCombustibleCambio = this.combustible.id;
                }
                error => {
                    this.errorMessage = <any>error;

                    if(this.errorMessage != null){
                        console.log(this.errorMessage);
                        alert("Error en la petición");
                    }
                }
            }
        );

        this.datos.campos = ['gas'];
        this.datos.idVehiculo = this.vehiculo.id;
        this.datos.idTramiteFactura = this.tramiteFactura.id;
        
        let resumen = "No. factura: " + this.tramiteFactura.factura.numero +
        ',Anterior: ' + this.vehiculo.combustible.nombre +
        ',Nuevo: ' + this.datos.idCombustibleCambio;

        this.realizado = true;

        this.onReadyTramite.emit(
            {
                'documentacion':this.datos.documentacion, 
                'observacion':this.datos.observacion, 
                'foraneas':this.datos, 
                'resumen':resumen,
                'idTramiteFactura': this.tramiteFactura.id,
            }
        );


        /*this._TramiteSolicitudService.validations(this.datos, token).subscribe(
            response => {
              if (response.code == 200) {
                this._VehiculoService.update(this.datos, token).subscribe(
                    response => {
                        if(response.status == 'success'){
                            
                        }
                        error => {
                            this.errorMessage = <any>error;
                            
                            if (this.errorMessage != null) {
                                console.log(this.errorMessage);
                                alert("Error en la petición");
                            }
                        }
                    }
                );
              }else{
                swal({
                  title: 'Error!',
                  text: response.message,
                  type: 'error',
                  confirmButtonText: 'Aceptar'
                });
              }
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert('Error en la petición');
                }
            }
        );*/
    }
}