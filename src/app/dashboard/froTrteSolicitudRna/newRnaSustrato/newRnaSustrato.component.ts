import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { TramiteSolicitudService } from '../../../services/tramiteSolicitud.service';
import { TramiteFacturaService } from '../../../services/tramiteFactura.service';
import { LoginService } from '../../../services/login.service';
import { ImoInsumoService } from '../../../services/imoInsumo.service';
import { PnalFuncionarioService } from '../../../services/pnalFuncionario.service';
import { UserCiudadanoService } from '../../../services/userCiudadano.service';
import { FacturaInsumo } from './facturaInsumo.modelo';
import { FacturaInsumoService } from '../../../services/facturaInsumo.service';
import { CiudadanoVehiculoService } from '../../../services/ciudadanoVehiculo.service';


import swal from 'sweetalert2';
import { log } from 'util';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
    selector: 'appRna-sustrato',
    templateUrl: './newRnaSustrato.html'
})
export class NewRnaInsumoComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() factura: any = null;
    @Input() vehiculo: any = null;
    @Input() idPropietario: any = null;
    public errorMessage;

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
    public numeroInsumo:any;
    public insumo:any;

    public facturaInsumo: FacturaInsumo;
    
    public datos = {
        'licenciaTransito': null,
        'idVehiculo': null,
        'idPropietario': null,
    }
    

    constructor(
        private  _ImoInsumoService: ImoInsumoService,
        private _TramiteSolicitudService: TramiteSolicitudService,
        private _loginService: LoginService,
        private _tramiteFacturaService: TramiteFacturaService,
        private _FuncionarioService: PnalFuncionarioService,
        private _UserCiudadanoService: UserCiudadanoService,
        private _CiudadanoVehiculoService: CiudadanoVehiculoService,
        private _FacturaInsumoService: FacturaInsumoService,
    ) {
        this.facturaInsumo = new FacturaInsumo(null, null, null, null, null);
    } 

    ngOnInit() {
        let token = this._loginService.getToken();

        let identity = this._loginService.getIdentity();

        this._FuncionarioService.searchLogin({ 'identificacion': identity.identificacion }, token).subscribe(
            response => {
              if (response.status == 'success') {
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

    onSearchCiudadano(){
        let token = this._loginService.getToken();

        let identificacion = {
			'numeroIdentificacion' : this.facturaInsumo.idCiudadano,
        };

        this._UserCiudadanoService.searchByIdentificacion(identificacion, token).subscribe(
            response => {
                if(response.status == 'success'){
                    this.ciudadano = response.data;
                    this.ciudadanoNew = false;
            }else{
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
        this.datos.idPropietario  = this.idPropietario;
        this.datos.idVehiculo  = this.vehiculo.id;
        
        this.facturaInsumo.entregado = this.tarjetaEntregada;
        this.facturaInsumo.idFactura = this.factura.id;
        
        this._CiudadanoVehiculoService.editLicenciaTransito(this.datos,token).subscribe(
            response => { 
                if(response.status == 'success'){  
                    this._FacturaInsumoService.register(this.facturaInsumo, token).subscribe(
                        response => {
                            if (response.status == 'success') { 
                                swal({
                                    title: 'Perfecto!',
                                    text: 'Registro exitoso!',
                                    type: 'success',
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

    onSearchInsumo(){
        let token = this._loginService.getToken();

        let datos = {
            'numero': this.numeroInsumo,
            'idModulo': 2,
            'idOrganismoTransito': this.idOrganismoTransito,
        }
        
        this._ImoInsumoService.showNombre(token, datos).subscribe(
            response => {
                if (response.status == 'success') {
                    this.insumo = response.data;
                    this.facturaInsumo.idInsumo = response.data.id;
                }else{
                    this.insumo = null;

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

    ready(){
        
    }

}