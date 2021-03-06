import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FacturaInsumo } from './facturaInsumo.modelo';
import { ImoInsumoService } from '../../../../../services/imoInsumo.service';
import { PnalFuncionarioService } from '../../../../../services/pnalFuncionario.service';
import { UserCiudadanoService } from '../../../../../services/userCiudadano.service';
//import { FacturaInsumoService } from '../../../../../services/facturaInsumo.service';
import { VhloPropietarioService } from '../../../../../services/vhloPropietario.service';
import { LoginService } from '../../../../../services/login.service';
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
    @Input() vehiculo: any = null;
    @Input() ciudadanoPropietario: any = null;
    public errorMessage;
    public respuesta;
    public sustratos: any;
    public sustratoSelected: any;
    public colorSelected: any;
    public identificacion: any;
    public licenciaTransito: any;
    public idOrganismoTransito: any;
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
    
    public datos = {
        'cedula': 0,
        'licenciaTransito': "",
        'vehiculoId': ""
    }
    
    constructor(
        private  _ImoInsumoService: ImoInsumoService,
        private _FuncionarioService: PnalFuncionarioService,
        private _UserCiudadanoService: UserCiudadanoService,
        private _CiudadanoVehiculoService: VhloPropietarioService,
        //private _FacturaInsumoService: FacturaInsumoService,
        private _LoginService: LoginService,
    ) {
        this.FacturaInsumo = new FacturaInsumo(null, null, null, null, null);
        
     } 

    ngOnInit() {
        let token = this._LoginService.getToken();

        let identity = this._LoginService.getIdentity();

        this._FuncionarioService.searchLogin({ 'identificacion': identity.identificacion }, token).subscribe(
            response => {
              if (response.code == 200) {
                  this.idOrganismoTransito = response.data.organismoTransito.id;
                //   let datos = {
                //         'organismoTransito':1 
                //     }
                //     this._ImoInsumoService.showUltimoSustratoDisponible(datos).subscribe(
                //         responseInsumo => {
                //         if(responseInsumo.status == 'success'){
                //             this.numeroInsumo = responseInsumo.numero;
                //             this.FacturaInsumo.insumoId = responseInsumo.idInsumo;
                //             this.isExist = true;
                //             this.isError = false
                //         }else{
                //             this.isError = true; 
                //             this.isExist = false;
                //             swal({
                //                 title: 'Error!',
                //                 text: 'No tiene asignado sustratos para la sede',
                //                 type: 'error',
                //                 confirmButtonText: 'Aceptar'
                //             });
                //         }
                //         error => {
                //                 this.errorMessage = <any>error;

                //                 if(this.errorMessage != null){
                //                     console.log(this.errorMessage);
                //                     alert("Error en la petición");
                //                 }
                //             }

                //     });
      
              }else{
                swal({
                  title: 'Error!',
                  text: 'Su usuario no tiene autorización para realizar facturación!',
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
            });
    }

    onKeyCiudadano(){
        let token = this._LoginService.getToken();
        let identificacion = {
			'numeroIdentificacion' : this.FacturaInsumo.ciudadanoId,
        };
        this._UserCiudadanoService.searchByIdentificacion(identificacion,token).subscribe(
            response => {
                this.respuesta = response; 
                if(this.respuesta.status == 'success'){
                    this.ciudadano = this.respuesta.data;
                    this.ciudadanoEncontrado= 2;
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
        let token = this._LoginService.getToken();

        this.datos.licenciaTransito = this.licenciaTransito;
        this.datos.cedula  = this.ciudadanoPropietario.usuario.identificacion;
        this.datos.vehiculoId  = this.vehiculo.id;
        
        this.FacturaInsumo.entregado = this.tarjetaEntregada;
        this.FacturaInsumo.idFactura = this.factura.id;
        
        /*this._CiudadanoVehiculoService.edit(this.datos,token).subscribe(
            response => { 
                this.respuesta = response;
                if(this.respuesta.status == 'success'){  
                    this._FacturaInsumoService.register(this.FacturaInsumo,token).subscribe(
                        response => {
                            if (response.code == 200) { 
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
            
        );*/
    }

    onCancelar(){
        this.cancelarTramite.emit(true);
    }

    onKeyValidateInsumo(){
        let token = this._LoginService.getToken();

        let datos = {
            'numero': this.numeroInsumo,
            'idModulo': 2,
            'idOrganismoTransito': this.idOrganismoTransito,
        }
        
        this._ImoInsumoService.searchByNumeroAndModulo(token,datos).subscribe(
            response => {
                if (response.code == 200) {
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