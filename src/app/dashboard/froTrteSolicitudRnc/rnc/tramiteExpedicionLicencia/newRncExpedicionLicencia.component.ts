import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserCiudadanoService } from '../../../../services/userCiudadano.service';
import { FroTrteSolicitudService } from '../../../../services/froTrteSolicitud.service';
import { FroFacTramiteService } from '../../../../services/froFacTramite.service';
import { PnalFuncionarioService } from '../../../../services/pnalFuncionario.service';
import { UserLcCfgCategoriaService } from '../../../../services/userLcCfgCategoria.service';
import { CfgPaisService } from '../../../../services/cfgPais.service';
import { VhloCfgServicioService } from '../../../../services/vhloCfgServicio.service';
import { LoginService } from '../../../../services/login.service';
import swal from 'sweetalert2';

@Component({
    selector: 'appRnc-expedicion-licencia',
    templateUrl: './newRncExpedicionLicencia.html'
})
export class NewRncExpedicionLicenciaComponent implements OnInit {
    @Output() onReadyTramite = new EventEmitter<any>();
    @Input() funcionario: any = null;
    @Input() solicitante: any = null;
    @Input() tramiteFactura: any = null;
    @Input() tramitesRealizados: any = null;
    public errorMessage;

    public autorizado: any = false;
    public realizado: any = false;
    public tramiteSolicitud: any = null;
    public paises: any;
    public servicios: any;
    public categorias: any;
    public radio: any;

    public datos = {
        'documentacion': true,
        'observacion': null,
        'numero': null,
        'restriccion': null,
        'fechaExpedicion': null,
        'idFuncionario': null,
        'idPais': null,
        'idCategoria': null,
        'idServicio': null,
        'idOrganismoTransito': null,
        'idTramiteFactura': null,
        'idSolicitante': null,
    };

    constructor(
        private _TramiteFacturaService: FroFacTramiteService,
        private _TramiteSolicitudService: FroTrteSolicitudService,
        private _FuncionarioService: PnalFuncionarioService,
        private _CiudadanoService: UserCiudadanoService,
        private _CfgPaisService: CfgPaisService,
        private _ServicioService: VhloCfgServicioService,
        private _CfgLicenciaConduccionCategoriaService: UserLcCfgCategoriaService,
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
                this._CfgLicenciaConduccionCategoriaService.select().subscribe(
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
            }
        }else {
            this.autorizado = false;

            swal({
                title: 'Error!',
                text: 'Usted no tiene permisos para realizar tramites',
                type: 'error',
                confirmButtonText: 'Aceptar'
            });
        }
    }

    onSearchCiudadano(){
        let token = this._LoginService.getToken();

        let datos = {
            'identificacion': this.solicitante.identificacion,
            'idTipoIdentificacion': 1
        }

        if (!this.solicitante.identificacion) {
            swal({
                title: 'Error!',
                text: 'El número de identificación no puede estar vacio.',
                type: 'error',
                confirmButtonText: 'Aceptar'
            });
        }else{
            this._CiudadanoService.searchByIdentificacion(datos,token).subscribe(
                response => {
                    if(response.code == 200){
                        this.solicitante = response.data.ciudadano;
                    }else{
                        swal({
                            title: 'Error!',
                            text: response.message,
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
                }
            ); 
        }
    }

    onEnviar() {
        let token = this._LoginService.getToken();

        this.datos.numero = this.solicitante.identificacion;
        this.datos.idOrganismoTransito = this.funcionario.organismoTransito.id;
        this.datos.idTramiteFactura = this.tramiteFactura.id;
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