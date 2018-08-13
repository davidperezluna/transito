import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { SustratoService } from '../../../services/sustrato.service';
import { CiudadanoService } from '../../../services/ciudadano.service';
import { CiudadanoVehiculoService } from '../../../services/ciudadanoVehiculo.service';


import swal from 'sweetalert2';
import { log } from 'util';

@Component({
    selector: 'appRpccc-sustrato',
    templateUrl: './newRpcccSustrato.html'
})
export class NewRpcccSustratoComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() factura: any = null;
    @Input() solicitante: any = null;
    public errorMessage;
    public respuesta;
    public sustrato: any;
    public sustratos: any;
    public sustratoSelected: any;
    public usuario:any;
    public estadoImpresion=true;
    public tarjetaEntregada=true;
    public ciudadanoNew = false;
    public isError = false;
    public isExist = false;
    public ciudadanoEncontrado=1;
    public datos = {
        'solicitante': null,
        'cedula': null,
        'licenciaConduccion': null,
        'entregada': null,
        'sustrato': null,
        'solicitanteId': null,
        'vehiculoId': null,
        'facturaId': null,
    }
    
    constructor(
        private _SustratoService: SustratoService,
        private _loginService: LoginService,
        private _CiudadanoService: CiudadanoService,
        private _CiudadanoVehiculoService: CiudadanoVehiculoService,
    ) { } 

    ngOnInit() {
        
    }

    onKeyCiudadano(){
        let token = this._loginService.getToken();
        
        this._CiudadanoService.searchByIdentificacion(token,{ 'numeroIdentificacion' : this.datos.cedula }).subscribe(
            response => {
                this.respuesta = response; 
                if(this.respuesta.status == 'success'){
                    this.usuario = this.respuesta.data;
                    this.datos.solicitante = this.usuario.primerNombre+' '+this.usuario.primerApellido
                    this.datos.solicitanteId = this.usuario.ciudadano.id
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
        
        this.datos.entregada = this.tarjetaEntregada;
        this.datos.facturaId = this.factura.id;

        // if (this.sustrato.impresion) {
        //    this.sustrato.estado = 'Utilizado' 
        // }else{
        //    this.sustrato.estado = 'Dañado'    
        // }

        // console.log(this.identificacion);

        this._CiudadanoVehiculoService.editLicenciaTransito(this.datos,token).subscribe(
            response => {
                this.respuesta = response;
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
        
        this._SustratoService.editEstado(this.sustrato,token).subscribe(
            response => {
                if (response.status == 'success') {
                    console.log(response);
                    swal({
                        title: 'Perfecto!',
                        text: 'Registro exitoso!',
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
    }

    onCancelar(){
        this.cancelarTramite.emit(true);
    }

    onKeyValidateSustrato(){
        let token = this._loginService.getToken();
        this._SustratoService.showNombreSustrato(token,this.datos.sustrato).subscribe(
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