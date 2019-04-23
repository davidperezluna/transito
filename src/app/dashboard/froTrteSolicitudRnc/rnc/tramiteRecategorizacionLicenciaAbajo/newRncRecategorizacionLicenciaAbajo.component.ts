import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CfgPaisService } from '../../../../services/cfgPais.service';
import { FroTrteSolicitudService } from '../../../../services/froTrteSolicitud.service';
import { FroFacTramiteService } from '../../../../services/froFacTramite.service';
import { PnalFuncionarioService } from '../../../../services/pnalFuncionario.service';
import { UserLcCfgCategoriaService } from '../../../../services/userLcCfgCategoria.service';
import { VhloCfgServicioService } from '../../../../services/vhloCfgServicio.service';
import { LoginService } from '../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRnc-recategorizacion-licencia-abajo',
    templateUrl: './newRncRecategorizacionLicenciaAbajo.html'
})
export class NewRncRecategorizacionLicenciaAbajoComponent implements OnInit {
    @Output() onReadyTramite = new EventEmitter<any>();
    @Input() solicitante: any = null;
    @Input() tramiteFactura: any = null;
    public errorMessage;

    public autorizado: any = false;
    public tramiteSolicitud: any = null;
    public funcionario: any = null;
    public paises: any;
    public servicios: any;
    public categorias: any;

    public tramiteFacturaSelected: any;

    public datos = {
        'documentacion': true,
        'observacion': null,
        'numero': null,
        'vigencia': null,
        'idFuncionario': null,
        'idOrganismoTransito': null,
        'idCategoriaActual': null,
        'idCategoriaNueva': null,
        'idPais': null,
        'idServicio': null,
        'idTramiteFactura': null,
        'idSolicitante': null,
    };
    

    constructor(
        private _TramiteFacturaService: FroFacTramiteService,
        private _TramiteSolicitudService: FroTrteSolicitudService,
        private _FuncionarioService: PnalFuncionarioService,
        private _PaisService: CfgPaisService,
        private _ServicioService: VhloCfgServicioService,
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
                        this._PaisService.select().subscribe(
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
                
                        this._ServicioService.select().subscribe(
                            response => {
                                this.servicios = response;
                            },
                            error => {
                                this.errorMessage = <any>error;
                
                                if (this.errorMessage != null) {
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
        let token = this._LoginService.getToken();
        
        this.datos.numero = this.solicitante.identificacion;
        this.datos.idOrganismoTransito = this.funcionario.organismoTransito.id;
        this.datos.idTramiteFactura = this.tramiteFactura.factura
        this.datos.idSolicitante = this.solicitante.id;
        
        let resumen = "<b>No. factura<b>" + this.tramiteFactura.factura.numero;

        this.onReadyTramite.emit(
            {
                'documentacion':this.datos.documentacion, 
                'observacion':this.datos.observacion, 
                'foraneas':this.datos,
                'resumen':resumen,
                'idTramiteFactura': this.tramiteFactura.id,
            }
        );
    }
}