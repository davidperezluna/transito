import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FroTrteSolicitudService } from '../../../../services/froTrteSolicitud.service';
import { FroFacTramiteService } from '../../../../services/froFacTramite.service';
import { PnalFuncionarioService } from '../../../../services/pnalFuncionario.service';
import { VhloCfgClaseService } from '../../../../services/vhloCfgClase.service';
import { VhloCfgServicioService } from '../../../../services/vhloCfgServicio.service';
import { CfgPaisService } from '../../../../services/cfgPais.service';
import { UserLcCfgCategoriaService } from '../../../../services/userLcCfgCategoria.service';
import { UserCiudadanoService } from '../../../../services/userCiudadano.service';
import { LoginService } from '../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRnc-expedicion-licencia-cambio-documento',
    templateUrl: './newRncExpedicionLicenciaCambioDocumento.html'
})
export class NewRncExpedicionLicenciaCambioDocumentoComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() solicitante: any = null;
    @Input() tramiteFactura: any = null;
    public errorMessage;

    public autorizado: any = false;
    public tramiteSolicitud: any = null;
    public funcionario: any = null;
    public clases: any;
    public servicios: any;
    public paises: any;
    public categorias: any;

    public datos = {
        'numero': null,
        'identificacionAnterior': null,
        'identificacionActual': null,
        'numeroRunt': null,
        'vigencia': null,
        'idFuncionario': null,
        'idOrganismoTransito': null,
        'idClase': null,
        'idServicio': null,
        'idCategoria': null,
        'idTramiteFactura': null,
        'idSolicitante': null,
    };

    constructor(
      private _TramiteFacturaService: FroFacTramiteService,
      private _TramiteSolicitudService: FroTrteSolicitudService,
      private _FuncionarioService: PnalFuncionarioService,
      private _ClaseService: VhloCfgClaseService,
      private _ServicioService: VhloCfgServicioService,
      private _CfgPaisService: CfgPaisService,
      private _CategoriaService: UserLcCfgCategoriaService,
      private _LoginService: LoginService,
    ) { }

    ngOnInit() {
      let token = this._LoginService.getToken();

        let identity = this._LoginService.getIdentity();

        this._FuncionarioService.searchLogin({ 'identificacion': identity.identificacion }, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.funcionario = response.data;
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
                        let token = this._LoginService.getToken();

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
                    }else{
                      this.datos.identificacionAnterior = this.solicitante.identificacion;

                      this._ClaseService.select().subscribe(
                          response => {
                            this.clases = response;
                          },
                          error => {
                            this.errorMessage = <any>error;
                            if(this.errorMessage != null){
                              console.log(this.errorMessage);
                              alert('Error en la petición');
                            }
                          }
                      );
              
                      this._ServicioService.select().subscribe(
                          response => {
                            this.servicios = response;
                          },
                          error => {
                            this.errorMessage = <any>error;
                    
                            if(this.errorMessage != null){
                              console.log(this.errorMessage);
                              alert('Error en la petición');
                            }
                          }
                      );
              
                      this._CfgPaisService.select().subscribe(
                          response => {
                            this.paises = response;
                          },
                          error => {
                            this.errorMessage = <any>error;
                    
                            if(this.errorMessage != null){
                              console.log(this.errorMessage);
                              alert('Error en la petición');
                            }
                          }
                      );
              
                      this._CategoriaService.select().subscribe(
                          response => {
                              this.categorias = response;
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
    
    onEnviar() {
        this.datos.numero = this.datos.identificacionActual;
        this.datos.idOrganismoTransito = this.funcionario.organismoTransito.id;
        this.datos.idTramiteFactura = this.tramiteFactura.factura.id;
        this.datos.idSolicitante = this.solicitante.id;

        let resumen = "<b>No. factura</b>" + this.tramiteFactura.factura.numero;
        
        this.readyTramite.emit({'foraneas':this.datos, 'resumen':resumen});
    }
    onCancelar(){
        this.cancelarTramite.emit(true);
    }

}