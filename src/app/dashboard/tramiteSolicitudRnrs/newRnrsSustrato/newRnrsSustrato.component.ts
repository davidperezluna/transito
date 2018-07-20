import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitudService } from '../../../services/tramiteSolicitud.service';
import { TramiteFacturaService } from '../../../services/tramiteFactura.service';
import { LoginService } from '../../../services/login.service';
import { SustratoService } from '../../../services/sustrato.service';
import {VehiculoService} from '../../../services/vehiculo.service';
import { CiudadanoService } from '../../../services/ciudadano.service';
import { Sustrato } from '../../sustrato/sustrato.modelo';
import { CiudadanoVehiculoService } from '../../../services/ciudadanoVehiculo.service';


import swal from 'sweetalert2';
import { log } from 'util';

@Component({
    selector: 'appRnrs-sustrato',
    templateUrl: './newRnrsSustrato.html'
})
export class NewRnrsSustratoComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() factura: any = null;
    @Input() ciudadanoPropietario: any = null;
    public errorMessage;
    public respuesta;
    public sustratos: any;
    public sustratoSelected: any;
    public colorSelected: any;
    public identificacion: any;
    public licenciaTransito: any;
    public ciudadano:any;
    public estadoImpresion=true;
    public tarjetaEntregada=true;
    public ciudadanoNew = false;
    public isError = false;
    public isExist = false;
    public ciudadanoEncontrado=1;
    public sustrato: Sustrato;
    public datos = {
        'cedula': 0,
        'licenciaTransito': "",
        'vehiculoId': ""
      }
    

    constructor(
        private _SustratoService: SustratoService,
        private _TramiteSolicitudService: TramiteSolicitudService,
        private _loginService: LoginService,
        private _tramiteFacturaService: TramiteFacturaService,
        private _VehiculoService: VehiculoService,
        private _CiudadanoService: CiudadanoService,
        private _CiudadanoVehiculoService: CiudadanoVehiculoService,
    ) {
        this.sustrato = new Sustrato( null, null, null, null, null, null ,null,null,null,null,null,null);
        
     } 

    ngOnInit() {
        
    }

    onKeyCiudadano(){
        let token = this._loginService.getToken();
        let identificacion = {
			'numeroIdentificacion' : this.sustrato.ciudadanoId,
        };
        console.log(this.tarjetaEntregada);
        
        this._CiudadanoService.showCiudadanoCedula(token,identificacion).subscribe(
            response => {
                this.respuesta = response; 
                if(this.respuesta.status == 'success'){
                    this.ciudadano = this.respuesta.data;
                    this.ciudadanoEncontrado= 2;
                    this.ciudadanoNew = false;
            }else{
                this.ciudadanoEncontrado=3;
                this.ciudadanoNew = true;
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
   
    enviarTramite(){
        let token = this._loginService.getToken();
        
        console.log(this.factura);
        console.log(this.datos);

        this.datos.licenciaTransito = this.licenciaTransito;
        this.datos.cedula  = this.ciudadanoPropietario.usuario.identificacion;
        this.datos.vehiculoId  = this.factura.vehiculo.id;

        // this.sustrato.impresion = this.licenciato;
        
        this.sustrato.entregado = this.tarjetaEntregada;
        this.sustrato.facturaId = this.factura.id;

        // this.ciudadanoPropietario.licenciaTransito = this.datos.vehiculoId;

        // if (this.sustrato.impresion) {
        //    this.sustrato.estado = 'Utilizado' 
        // }else{
        //    this.sustrato.estado = 'Dañado'    
        // }

        // console.log(this.identificacion);

        this._CiudadanoVehiculoService.editLicenciaTransito(this.datos,token).subscribe(
            
            response => {
                
                this.respuesta = response;
                console.log(this.respuesta);
                if(this.respuesta.status == 'success'){
                  swal({
                    title: 'Perfecto!',
                    text: 'El registro se ha modificado con exito',
                    type: 'success',
                    confirmButtonText: 'Aceptar'
                  })
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
        console.log(this.licenciaTransito);
        
        this._SustratoService.editSustrato(this.sustrato,token).subscribe(
            response => {
                if (response.status == 'success') {
                    swal({
                        title: 'Perfecto!',
                        text: 'El registro se ha registrado con exito',
                        type: 'success',
                        confirmButtonText: 'Aceptar'
                      })
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
        console.log(this.sustrato);
    }

    onCancelar(){
        this.cancelarTramite.emit(true);
    }

    onKeyValidateSustrato(){
        let token = this._loginService.getToken();
        this._SustratoService.showNombreSustrato(token,this.sustrato.consecutivo).subscribe(
            response => {
                if (response.status == 'success') {
                    this.sustrato = response.data;
                    this.isExist = true;
                    this.isError = false
                }else{
                    this.isError = true;
                    this.isExist = false;
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
    ready(){
        this.ciudadanoEncontrado === 3;
    }

}