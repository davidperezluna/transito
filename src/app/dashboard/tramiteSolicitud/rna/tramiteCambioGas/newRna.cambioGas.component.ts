import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitud } from '../../tramiteSolicitud.modelo';
import { TramiteSolicitudService } from '../../../../services/tramiteSolicitud.service';
import { TramiteFacturaService } from '../../../../services/tramiteFactura.service';
import { LoginService } from '../../../../services/login.service';
import { VhloCfgColorService } from '../../../../services/vhloCfgColor.service';
import {VehiculoService} from '../../../../services/vehiculo.service';
import{ VhloCfgCombustibleService } from '../../../../services/vhloCfgCombustible.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRna-cambio-gas',
    templateUrl: './newRna.cambioGas.html'
})
export class NewRnaCambioGasComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() factura: any = null;
    public errorMessage;
    public colores: any;
    public tramiteFacturaSelected: any;
    public colorSelected: any;
    public tramiteRealizado: any;
    public vehiculo1;
    public combustibles;
    
    public resumen = {};    
    public datos = {
        'idVehiculo': null,
        'idCombustibleCambio': null,
        'numeroCertificado': null,
        'fechaExpedicion': null,
        'fechaVencimiento': null,
        'numeroChip': null,
        'tramiteFormulario': null,
        'idFactura': null,
        'numeroKIT': null,
        'numeroSerial': null,
        'fechaFabricacion': null,
        'presion': null,
        'numeroRunt': null,
        'campos': null,
    };
    

    constructor(
        private _TramiteSolicitudService: TramiteSolicitudService,
        private _loginService: LoginService,
        private _tramiteFacturaService: TramiteFacturaService,
        private _VehiculoService: VehiculoService,
        private _CombustibleService: VhloCfgCombustibleService,
    ) { }
  
    ngOnInit() {
        this.vehiculo1 = this.vehiculo;
        
    }
    
   
    enviarTramite(){
        let token = this._loginService.getToken();
        this._CombustibleService.getCombustible().subscribe(
            response => {
                this.combustibles = response; 
                this.combustibles.data.forEach(element => { 
                    if(element.id == 4 ){
                        this.datos.idCombustibleCambio = element.id;
                        console.log(this.datos.idCombustibleCambio);
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

        this.datos.idFactura = this.factura.id;
        this.datos.idVehiculo = this.vehiculo.id;
        this.datos.tramiteFormulario = 'rna-cambiogas';
        this.datos.campos = ['gas'];
        this._VehiculoService.update(this.datos,token).subscribe(
            response => {
                if(response.status == 'success'){
                    let resumen = {
                        'Anterior': this.vehiculo.combustible,
                        'Nuevo': this.datos.idCombustibleCambio,
                    };
                    this.readyTramite.emit({'foraneas':this.datos, 'resumen': resumen});
                }
                error => {
                    this.errorMessage = <any>error;

                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert("Error en la petición");
                    }
                }
            });
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
                    console.log(this.errorMessage);
                    alert("Error en la petición");
                }
            }
    }
    onCancelar(){
        this.cancelarTramite.emit(true);
    }

}