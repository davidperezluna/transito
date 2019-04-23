import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FroTrteSolicitudService } from '../../../../services/froTrteSolicitud.service';
import { FroFacTramiteService } from '../../../../services/froFacTramite.service';
import { VhloCfgCombustibleService } from '../../../../services/vhloCfgCombustible.service';
import { VehiculoService } from '../../../../services/vehiculo.service';
import { PnalFuncionarioService } from '../../../../services/pnalFuncionario.service';
import { LoginService } from '../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRna-cambio-gas',
    templateUrl: './newRna.cambioGas.html'
})
export class NewRnaCambioGasComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() tramiteFactura: any = null;
    public errorMessage; 
    
    public autorizado: any = false;
    public tramiteSolicitud: any = null;
    public colores: any;
    public colorSelected: any;
    public combustibles;
     
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
        'numeroRunt': null,
        'campos': null,
        'idFuncionario': null,
        'idVehiculo': null,
        'idCombustibleCambio': null,
        'idTramiteFactura': null,
    };
    

    constructor(
        private _TramiteSolicitudService: FroTrteSolicitudService,
        private _TramiteFacturaService: FroFacTramiteService,
        private _VehiculoService: VehiculoService,
        private _CombustibleService: VhloCfgCombustibleService,
        private _FuncionarioService: PnalFuncionarioService,
        private _LoginService: LoginService,
    ) { }
  
    ngOnInit() {
        let token = this._LoginService.getToken();
        
        let identity = this._LoginService.getIdentity();

        this._FuncionarioService.searchLogin({ 'identificacion': identity.identificacion }, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.datos.idFuncionario = response.data.id;
                    this.autorizado = true;

                    this.datos.placa = this.vehiculo.placa.numero;
                    this.datos.linea = this.vehiculo.linea.nombre;
                    this.datos.marca = this.vehiculo.linea.marca.nombre;
                    this.datos.modelo = this.vehiculo.modelo;
                    this.datos.servicio = this.vehiculo.servicio.nombre;
                    this.datos.serie = this.vehiculo.serie;
                    this.datos.motor = this.vehiculo.motor;
                    this.datos.chasis = this.vehiculo.chasis;
                    this.datos.vin = this.vehiculo.vin;


                    this._TramiteFacturaService.show({ 'id': this.tramiteFactura.id }, token).subscribe(
                        response => {
                            if (response.code == 200) {
                                this.tramiteFactura = response.data;

                                swal.close();
                            } else {
                                this.tramiteFactura = null;

                                swal({
                                    title: 'Error!',
                                    text: response.message,
                                    type: 'error',
                                    confirmButtonText: 'Aceptar'
                                });
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

                    if (this.tramiteFactura.realizado) {
                        this._TramiteSolicitudService.showByTamiteFactura({ 'idTramiteFactura': this.tramiteFactura.id }, token).subscribe(
                            response => {
                                if (response.code == 200) {
                                    this.tramiteSolicitud = response.data;
                                } else {
                                    this.tramiteSolicitud = null;

                                    swal({
                                        title: 'Error!',
                                        text: response.message,
                                        type: 'error',
                                        confirmButtonText: 'Aceptar'
                                    });
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
                    }
                } else {
                    this.autorizado = false;

                    swal({
                        title: 'Error!',
                        text: 'Usted no tiene permisos para realizar tramites',
                        type: 'error',
                        confirmButtonText: 'Aceptar'
                    });
                }
                error => {
                    this.errorMessage = <any>error;
                    if (this.errorMessage != null) {
                        console.log(this.errorMessage);
                        alert('Error en la petición');
                    }
                }
            }
        );
    }
    
   
    onEnviar(){
        let token = this._LoginService.getToken();
        this._CombustibleService.index().subscribe(
            response => {
                this.combustibles = response;

                this.combustibles.data.forEach(element => { 
                    if(element.id == 4 ){
                        this.datos.idCombustibleCambio = element.id;
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

        this.datos.campos = ['gas'];
        this.datos.idTramiteFactura = this.tramiteFactura.id;
        this.datos.idVehiculo = this.vehiculo.id;

        this._TramiteSolicitudService.validations(this.datos, token).subscribe(
            response => {
              if (response.code == 200) {
                this._VehiculoService.update(this.datos, token).subscribe(
                    response => {
                        if(response.status == 'success'){
                            let resumen = "<b>No. factura: </b>" + this.tramiteFactura.factura.numero +
                                '<br><b>Anterior: </b>' + this.vehiculo.combustible.nombre +
                                '<br><b>Nuevo: </b>' + this.datos.idCombustibleCambio;
        
                            this.readyTramite.emit(
                                {
                                    'documentacion':this.datos.documentacion, 
                                    'observacion':this.datos.observacion, 
                                    'foraneas':this.datos, 
                                    'resumen':resumen,
                                    'idTramiteFactura': this.tramiteFactura.id,
                                }
                            );
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
        );
    }
    onCancelar(){
        this.cancelarTramite.emit(true);
    }

}