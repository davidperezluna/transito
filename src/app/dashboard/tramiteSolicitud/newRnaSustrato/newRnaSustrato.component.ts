import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitudService } from '../../../services/tramiteSolicitud.service';
import { TramiteFacturaService } from '../../../services/tramiteFactura.service';
import { LoginService } from '../../../services/login.service';
import { SustratoService } from '../../../services/sustrato.service';
import {VehiculoService} from '../../../services/vehiculo.service';
import { CiudadanoService } from '../../../services/ciudadano.service';
import { Sustrato } from '../../sustrato/sustrato.modelo';

import swal from 'sweetalert2';

@Component({
    selector: 'appRna-sustrato',
    templateUrl: './newRnaSustrato.html'
})
export class NewRnaSustratoComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() factura: any = null;
    public errorMessage;
    public respuesta;
    public sustratos: any;
    public sustratoSelected: any;
    public colorSelected: any;
    public identificacion: any;
    public ciudadano:any;
    public estadoImpresion=true;
    public tarjetaEntregada=true;
    public ciudadanoNew = false;
    public isError = false;
    public isExist = false;
    public ciudadanoEncontrado=1;
    public sustrato: Sustrato;
    

    constructor(
        private _SustratoService: SustratoService,
        private _TramiteSolicitudService: TramiteSolicitudService,
        private _loginService: LoginService,
        private _tramiteFacturaService: TramiteFacturaService,
        private _VehiculoService: VehiculoService,
        private _CiudadanoService: CiudadanoService,
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
        this.sustrato.impresion = this.estadoImpresion;
        this.sustrato.entregado = this.tarjetaEntregada;
        this.sustrato.facturaId = this.factura.id;

        if (this.sustrato.impresion) {
           this.sustrato.estado = 'Utilizado'     
        }else{
           this.sustrato.estado = 'Dañado'    
        }

        let token = this._loginService.getToken();
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