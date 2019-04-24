import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { FroTrteSolicitudService } from '../../../../services/froTrteSolicitud.service';
import { FroFacTramiteService } from '../../../../services/froFacTramite.service';
import { VhloVehiculoService } from '../../../../services/vhloVehiculo.service';
import { VhloCfgCombustibleService } from '../../../../services/vhloCfgCombustible.service';
import { VhloCfgCarroceriaService } from '../../../../services/vhloCfgCarroceria.service';
import { PnalFuncionarioService } from '../../../../services/pnalFuncionario.service';
import { LoginService } from '../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRna-transformacion',
    templateUrl: './newRna.transformacion.html'
})
export class NewRnaTransformacionComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() vehiculo: any = null;
    @Input() tramiteFactura: any = null;
    public errorMessage; 
    
    public autorizado: any = false;
    public tramiteSolicitud: any = null;
    public carrocerias: any = null;
    public combustibles: any = null;

    public cambiosEje = [
        {'value': 1, 'label': 'Agregar'},
        {'value': 2, 'label': 'Restar'},
    ];

    public datos = {
        'documentacion': true,
        'observacion': null,
        'tipoTransformacion': null,
        'modelo': null,
        'ejesActuales': null,
        'ejesTipoCambio': null,
        'ejesCantidad': 0,
        'ejesTotal': null,
        'decripcionModelo': null,
        'tallerRepotenciacion': null,
        'fechaRepotenciacion': null,
        'fichaTecnica': null,
        'numeroFactura': null,
        'fechaFactura': null,
        'campos': null,
        'idFuncionario': null,
        'idVehiculo': null,
        'idCarroceria': null,
        'idCombustible': null,
        'idTramiteFactura': null,
    };

    public tiposTransformacion = [
        {'value': 1, 'label': 'Cambio de carroceria'},
        {'value': 2, 'label': 'Cambio combustible'},
        {'value': 3, 'label': 'Cambio conjunto'},
        {'value': 4, 'label': 'Repotenciación'},
        {'value': 5, 'label': 'Cambio de ejes'},
    ];

    constructor(
        private _TramiteSolicitudService: FroTrteSolicitudService,
        private _TramiteFacturaService: FroFacTramiteService,
        private _CombustibleService: VhloCfgCombustibleService,
        private _CarroceriaService: VhloCfgCarroceriaService,
        private _VehiculoService: VhloVehiculoService,
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
                    } else {
                        this._CarroceriaService.select().subscribe(
                            response => {
                                this.carrocerias = response;
                            },
                            error => {
                                this.errorMessage = <any>error;

                                if (this.errorMessage != null) {
                                    console.log(this.errorMessage);
                                    alert('Error en la petición');
                                }
                            }
                        );

                        this._CombustibleService.select().subscribe(
                            response => {
                                this.combustibles = response;
                            },
                            error => {
                                this.errorMessage = <any>error;

                                if (this.errorMessage != null) {
                                    console.log(this.errorMessage);
                                    alert('Error en la petición');
                                }
                            }
                        );

                        this.datos.ejesActuales = this.vehiculo.numeroEjes;
                        this.datos.ejesTotal = this.vehiculo.numeroEjes;
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

    onChangedTipoTransformacion() {
        this.datos.campos = null;
    }

    onCalcularTotal() {   
        if (this.datos.ejesCantidad > 0) {
          if (this.datos.ejesTipoCambio == 1) {
            this.datos.ejesTotal = this.datos.ejesActuales + this.datos.ejesCantidad;
          }else if(this.datos.ejesTipoCambio == 2){
            if (this.datos.ejesCantidad <= this.datos.ejesActuales) {
                this.datos.ejesTotal = this.datos.ejesActuales - this.datos.ejesCantidad;
            }else{
                swal({
                    title: 'Error!',
                    text: 'La cantidad de ejes a restar no puede ser mayor a la cantidad de ejes actuales.',
                    type: 'error',
                    confirmButtonText: 'Aceptar'
                });
            }
          }
        }else{
          swal({
            title: 'Error!',
            text: 'El la cantidad e ejes no puede ser igual o menor a 0.',
            type: 'error',
            confirmButtonText: 'Aceptar'
          });
        }
      }
    
    onEnviar(){
        let token = this._LoginService.getToken();

        this.datos.idTramiteFactura = this.tramiteFactura.id;
        this.datos.idVehiculo = this.vehiculo.id;
        
        if (this.datos.tipoTransformacion == 1) {
            this.datos.campos = ['carroceria'];
        }else{
            if (this.datos.tipoTransformacion == 2) {
                this.datos.campos = ['combustible'];
            }else{
                if (this.datos.tipoTransformacion == 3) {
                    this.datos.campos = ['conjunto'];
                }else{
                    if (this.datos.tipoTransformacion == 4) {
                        this.datos.campos = ['repotenciacion'];
                    }else{
                        if (this.datos.tipoTransformacion == 5) {
                            this.datos.campos = ['ejes'];
                        }
                    }
                }
            }
        }

        this._TramiteSolicitudService.validations(this.datos, token).subscribe(
            response => {
              if (response.code == 200) {
                this._VehiculoService.update(this.datos, token).subscribe(
                    response => {
                        if (response.status == 'success') {
                            let resumen = "<b>No. factura: </b>" + this.tramiteFactura.factura.numero;
        
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

    onClose() {
        this.datos.tipoTransformacion = null;
    }
}