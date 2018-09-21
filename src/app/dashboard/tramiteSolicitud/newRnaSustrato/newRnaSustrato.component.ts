import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitudService } from '../../../services/tramiteSolicitud.service';
import { TramiteFacturaService } from '../../../services/tramiteFactura.service';
import { LoginService } from '../../../services/login.service';
import { RnaInsumoService } from '../../../services/rnaInsumos.service';
import { VehiculoService } from '../../../services/vehiculo.service';
import { CiudadanoService } from '../../../services/ciudadano.service';
import { FacturaInsumo } from './facturaInsumo.modelo';
import { FacturaInsumoService } from '../../../services/facturaInsumo.service';
import { CiudadanoVehiculoService } from '../../../services/ciudadanoVehiculo.service';


import swal from 'sweetalert2';
import { log } from 'util';

@Component({
    selector: 'appRna-sustrato',
    templateUrl: './newRnaSustrato.html'
})
export class NewRnaInsumoComponent implements OnInit {
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
    public numeroInsumo:any;
    public insumo:any;
    public ciudadanoEncontrado=1;
    public FacturaInsumo: FacturaInsumo;
    public resumen = {};     public datos = {
        'cedula': 0,
        'licenciaTransito': "",
        'vehiculoId': ""
      }
    

    constructor(
        private _RnaInsumoService: RnaInsumoService,
        private _TramiteSolicitudService: TramiteSolicitudService,
        private _loginService: LoginService,
        private _tramiteFacturaService: TramiteFacturaService,
        private _VehiculoService: VehiculoService,
        private _CiudadanoService: CiudadanoService,
        private _CiudadanoVehiculoService: CiudadanoVehiculoService,
        private _FacturaInsumoService: FacturaInsumoService,
    ) {
        this.FacturaInsumo = new FacturaInsumo(null, null, null, null, null);
        
     } 

    ngOnInit() {
        
    }

    onKeyCiudadano(){
        let token = this._loginService.getToken();
        let identificacion = {
			'numeroIdentificacion' : this.FacturaInsumo.ciudadanoId,
        };
        this._CiudadanoService.searchByIdentificacion(token,identificacion).subscribe(
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

        this.datos.licenciaTransito = this.licenciaTransito;
        this.datos.cedula  = this.ciudadanoPropietario.usuario.identificacion;
        this.datos.vehiculoId  = this.factura.vehiculo.id;
        
        this.FacturaInsumo.entregado = this.tarjetaEntregada;
        this.FacturaInsumo.facturaId = this.factura.id;
        console.log(this.FacturaInsumo);
        
        this._CiudadanoVehiculoService.editLicenciaTransito(this.datos,token).subscribe(
            response => { 
                this.respuesta = response;
                if(this.respuesta.status == 'success'){ 
                    this._FacturaInsumoService.register(this.FacturaInsumo,token).subscribe(
                        response => {
                            if (response.status == 'success') {
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
                error => {
                        this.errorMessage = <any>error;
    
                        if(this.errorMessage != null){
                            console.log(this.errorMessage);
                            alert("Error en la petición");
                        }
                    }
        
            }
            
        );
              
     
    
    }

    onCancelar(){
        this.cancelarTramite.emit(true);
    }

    onKeyValidateInsumo(){
        let token = this._loginService.getToken();
        this._RnaInsumoService.showNombre(token,this.numeroInsumo).subscribe(
            response => {
                if (response.status == 'success') {
                    this.FacturaInsumo.insumoId = response.data.id;
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
        this.ciudadanoEncontrado = 3;
    }

}