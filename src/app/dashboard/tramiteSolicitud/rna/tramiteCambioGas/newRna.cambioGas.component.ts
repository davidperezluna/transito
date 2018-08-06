import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitud } from '../../tramiteSolicitud.modelo';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { TramiteFacturaService } from '../../../../services/tramiteFactura.service';
import { LoginService } from '../../../../services/login.service';
import { ColorService } from '../../../../services/color.service';
import {VehiculoService} from '../../../../services/vehiculo.service';
import{ CombustibleService } from '../../../../services/combustible.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRna-cambio-gas',
    templateUrl: './newRna.cambioGas.html'
})
export class NewRnaCambioGasComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() tramitesFactura: any = null;
    public errorMessage;
    public respuesta;
    public colores: any;
    public tramiteFacturaSelected: any;
    public colorSelected: any;
    public tramiteRealizado: any;
    public vehiculo1;
    public combustibles;
    public datos2 = {
        'combustibleCambioId': null,
        'vehiculoId': null,
    };
    public datos = {
        'numeroCertificado': null,
        'fechaExpedicion': null,
        'fechaVencimiento': null,
        'numeroChip': null,
        'tramiteFactura': null,
        'numeroKIT': null,
        'numeroSerial': null,
        'fechaFabricacion': null,
        'presion': null,
        'numeroRUNT': null,
    };
    

    constructor(
        private _ColorService: ColorService,
        private _TramiteSolicitudService: TramiteSolicitudService,
        private _loginService: LoginService,
        private _tramiteFacturaService: TramiteFacturaService,
        private _VehiculoService: VehiculoService,
        private _CombustibleService: CombustibleService,
    ) { }
  
    ngOnInit() {
        this.vehiculo1 = this.vehiculo;
        
    }
    
   
    enviarTramite(){
        let token = this._loginService.getToken();
        this._CombustibleService.getCombustible().subscribe(
            response => {
                this.combustibles = response; 
                console.log(this.combustibles);
                this.combustibles.data.forEach(element => { 
                    if(element.id == 4 ){
                        this.datos2.combustibleCambioId = element.id;
                        this.datos2.vehiculoId = this.vehiculo1.id;
                        
                        
                    }                  
                });
                error => {
                        this.errorMessage = <any>error;
    
                        if(this.errorMessage != null){
                            console.log(this.errorMessage);
                            alert("Error en la petición");
                        }
                    }
            }
        );
        this._VehiculoService.editCombustibleVehiculo(this.datos2,token).subscribe(
            response => {
                this.respuesta = response; 
                if(this.respuesta.status == 'success'){
                    this.datos.tramiteFactura = 65;
                    this.readyTramite.emit(this.datos);
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