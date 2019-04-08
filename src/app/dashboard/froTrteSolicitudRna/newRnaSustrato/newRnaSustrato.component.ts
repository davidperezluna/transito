import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FacturaInsumo } from './facturaInsumo.modelo';
import { TramiteSolicitudService } from '../../../services/tramiteSolicitud.service';
import { TramiteFacturaService } from '../../../services/tramiteFactura.service';
import { ImoInsumoService } from '../../../services/imoInsumo.service';
import { PnalFuncionarioService } from '../../../services/pnalFuncionario.service';
import { UserCiudadanoService } from '../../../services/userCiudadano.service';
import { FacturaInsumoService } from '../../../services/facturaInsumo.service';
import { CiudadanoVehiculoService } from '../../../services/ciudadanoVehiculo.service';
import { LoginService } from '../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'appRna-sustrato',
    templateUrl: './newRnaSustrato.html'
})

export class NewRnaInsumoComponent implements OnInit {
    @Input() factura: any = null;
    @Input() vehiculo: any = null;
    @Input() idPropietario: any = null;
    public errorMessage;

    public identificacion: any;
    public ciudadano: any = null;

    public licenciaTransito: any;
    public idOrganismoTransito: any;
    public estadoImpresion=true;
    public tarjetaEntregada = true;

    public numeroInsumo:any;
    public insumo: any = null;

    public facturaInsumo: FacturaInsumo;
    
    public datos = {
        'licenciaTransito': null,
        'idVehiculo': null,
        'idPropietario': null,
    }
    
    constructor(
        private  _ImoInsumoService: ImoInsumoService,
        private _FuncionarioService: PnalFuncionarioService,
        private _UserCiudadanoService: UserCiudadanoService,
        private _CiudadanoVehiculoService: CiudadanoVehiculoService,
        private _FacturaInsumoService: FacturaInsumoService,
        private _LoginService: LoginService,
    ) {
        this.facturaInsumo = new FacturaInsumo(null, null, null, null, null);
    } 

    ngOnInit() {
        let token = this._LoginService.getToken();

        let identity = this._LoginService.getIdentity();

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
        let token = this._LoginService.getToken();

        let datos = {
			'identificacion' : this.facturaInsumo.idCiudadano,
			'idTipoIdentificacion' : 1,
        };

        this._UserCiudadanoService.searchByIdentificacion(datos, token).subscribe(
            response => {
                if(response.status == 'success'){
                    if (response.data.ciudadano) {
                        this.ciudadano = response.data.ciudadano;
                    }else{
                        this.ciudadano = null;
                    }
                }else{
                    this.ciudadano = null;

                    swal({
                        title: 'Error!',
                        text: 'Su usuario no tiene autorización para realizar facturación!',
                        type: 'error',
                        confirmButtonText: 'Aceptar'
                    });
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
   
    onEnviarTramite(){
        let token = this._LoginService.getToken();

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

    onSearchInsumo(){
        let token = this._LoginService.getToken();

        let datos = {
            'numero': this.numeroInsumo,
            'idModulo': 2,
            'idOrganismoTransito': this.idOrganismoTransito,
        }
        
        this._ImoInsumoService.searchByNumeroAndModulo(datos, token).subscribe(
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