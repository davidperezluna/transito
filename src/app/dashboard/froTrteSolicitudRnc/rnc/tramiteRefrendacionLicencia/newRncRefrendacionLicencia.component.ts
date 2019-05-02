import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FroTrteSolicitudService } from '../../../../services/froTrteSolicitud.service';
import { FroFacTramiteService } from '../../../../services/froFacTramite.service';
import { PnalFuncionarioService } from '../../../../services/pnalFuncionario.service';
import { VhloCfgServicioService } from '../../../../services/vhloCfgServicio.service';
import { CfgPaisService } from '../../../../services/cfgPais.service';
import { UserLcCfgCategoriaService } from '../../../../services/userLcCfgCategoria.service';
import { LoginService } from '../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRnc-refrendacion-licencia',
    templateUrl: './newRncRefrendacionLicencia.html'
})
export class NewRncRefrendacionLicenciaComponent implements OnInit {
    @Output() onReadyTramite = new EventEmitter<any>();
    @Input() solicitante: any = null;
    @Input() tramiteFactura: any = null;
    @Input() tramitesRealizados: any = null;
    public errorMessage;

    public autorizado: any = false;
    public realizado: any = false;
    public tramiteSolicitud: any = null;
    public funcionario: any = null;
    public servicios: any;
    public paises: any;
    public categorias: any;
    
    public tramiteFacturaSelected: any;

    public datos = {
        'documentacion': true,
        'observacion': null,
        'numero': null,
        'vigencia': null,
        'idFuncionario': null,
        'idOrganismoTransito': null,
        'idPais': null,
        'idServicio': null,
        'idCategoria': null,
        'idTramiteFactura': null,
        'idSolicitante': null,
    };

    constructor(
      private _TramiteFacturaService: FroFacTramiteService,
      private _TramiteSolicitudService: FroTrteSolicitudService,
      private _FuncionarioService: PnalFuncionarioService,
      private _ServicioService: VhloCfgServicioService,
      private _PaisService: CfgPaisService,
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

                    if ( this.tramitesRealizados.length > 0) {
                        this.tramitesRealizados.forEach(tramiteRealizado => {
                            tramiteRealizado = Object.keys(tramiteRealizado).map(function(key) {
                                return tramiteRealizado[key];
                            });
                            this.realizado = tramiteRealizado.includes(this.tramiteFactura.id, 2);
                        });
                    }

                    if (this.realizado) {
                        swal({
                            title: 'Atención!',
                            text: 'El trámite seleccionado ya fue realizado.',
                            type: 'warning',
                            confirmButtonText: 'Aceptar'
                        });
                    } else {
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
                
                        this._CategoriaService.select().subscribe(
                            response => {
                                this.categorias = response;
                                //this.datos.idCategoriaActual = [this.tramitePrecio.modulo.id];
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
        this.datos.idTramiteFactura = this.tramiteFactura.factura.id;
        this.datos.idSolicitante = this.solicitante.id;

        let resumen = "<b>No. factura</b>" + this.tramiteFactura.factura.numero;

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