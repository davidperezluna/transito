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
    selector: 'appRnc-expedicion-licencia-cambio-documento',
    templateUrl: './newRncExpedicionLicenciaCambioDocumento.html'
})
export class NewRncExpedicionLicenciaCambioDocumentoComponent implements OnInit {
    @Output() onReadyTramite = new EventEmitter<any>();
    @Input() funcionario: any = null;
    @Input() solicitante: any = null;
    @Input() tramiteFactura: any = null;
    @Input() tramitesRealizados: any = null;
    public errorMessage;

    public autorizado: any = false;
    public realizado: any = false;
    public tramiteSolicitud: any = null;
    public servicios: any;
    public paises: any;
    public categorias: any;

    public datos = {
        'numero': null,
        'documentacion': true,
        'observacion': null,
        'identificacionAnterior': null,
        'identificacionActual': null,
        'vigencia': null,
        'idFuncionario': null,
        'idOrganismoTransito': null,
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
      private _CfgPaisService: CfgPaisService,
      private _CategoriaService: UserLcCfgCategoriaService,
      private _LoginService: LoginService,
    ) { }

    ngOnInit() {
        if (this.funcionario) {
            this.datos.idFuncionario = this.funcionario.id;
            this.autorizado = true;

            if ( this.tramitesRealizados.length > 0) {
                this.tramitesRealizados.forEach(tramiteRealizado => {
                    tramiteRealizado = Object.keys(tramiteRealizado).map(function(key) {
                        return tramiteRealizado[key];
                    });
                    
                    if (tramiteRealizado.includes(this.tramiteFactura.id, 2)) {
                        this.realizado = true;
                    }
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
                this.datos.identificacionAnterior = this.solicitante.identificacion;
        
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
        }else{
            this.autorizado = false;

            swal({
                title: 'Error!',
                text: 'Usted no tiene permisos para realizar tramites',
                type: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    } 
    
    onEnviar() {
        this.datos.numero = this.datos.identificacionActual;
        this.datos.idOrganismoTransito = this.funcionario.organismoTransito.id;
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