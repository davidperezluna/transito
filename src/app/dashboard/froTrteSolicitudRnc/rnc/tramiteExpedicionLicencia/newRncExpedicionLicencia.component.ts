import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserCiudadanoService } from '../../../../services/userCiudadano.service';
import { PnalFuncionarioService } from '../../../../services/pnalFuncionario.service';
import { CfgLicenciaConduccionCategoriaService } from '../../../../services/cfgLicenciaConduccionCategoria.service';
import { CfgPaisService } from '../../../../services/cfgPais.service';
import { VhloCfgClaseService } from '../../../../services/vhloCfgClase.service';
import { VhloCfgServicioService } from '../../../../services/vhloCfgServicio.service';
import { RncLicenciaConduccionService } from '../../../../services/rncLicenciaConduccion.service';
import { LoginService } from '../../../../services/login.service';

import swal from 'sweetalert2';

@Component({
    selector: 'appRnc-expedicion-licencia',
    templateUrl: './newRncExpedicionLicencia.html'
})
export class NewRncExpedicionLicenciaComponent implements OnInit {
    @Output() readyTramite = new EventEmitter<any>();
    @Output() cancelarTramite = new EventEmitter<any>();
    @Input() solicitante: any = null;
    @Input() tramiteFactura: any = null;
    public errorMessage;

    public paises: any;
    public clases: any;
    public servicios: any;
    public categorias: any;
    public tramiteFacturaSelected: any;

    public datos = {
        'numeroLicenciaConduccion': null,
        'numeroRunt': null,
        'fechaExpedicion': null,
        'idPais': null,
        'idClase': null,
        'idServicio': null,
        'idCategoria': null,
        'idOrganismoTransito': null,
        'idTramiteFactura': null,
        'idSolicitante': null,
    };

    constructor(
        private _LoginService: LoginService,
        private _CiudadanoService: UserCiudadanoService,
        private _CfgPaisService: CfgPaisService,
        private _FuncionarioService: PnalFuncionarioService,
        private _ClaseService: VhloCfgClaseService,
        private _ServicioService: VhloCfgServicioService,
        private _CfgLicenciaConduccionCategoriaService: CfgLicenciaConduccionCategoriaService,
        private _LicenciaConduccionService: RncLicenciaConduccionService,
    ) { }

    ngOnInit() {
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

        this._ClaseService.select().subscribe(
            response => {
                this.clases = response;
            },
            error => {
                this.errorMessage = <any>error;

                if (this.errorMessage != null) {
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

    onCancelar(){
        this.cancelarTramite.emit(true);
    }

    onSearchCiudadano(){
        let token = this._LoginService.getToken();

        let datos = {
            'identificacion': this.solicitante.identificacion,
            'idTipoIdentificacion': 1
        }

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

    onEnviar() {
        let token = this._LoginService.getToken();

        let identity = this._LoginService.getIdentity();

        this._FuncionarioService.searchLogin({ 'identificacion': identity.identificacion }, token).subscribe(
            response => {
                if (response.status == 'success') {
                    this.datos.numeroLicenciaConduccion = this.solicitante.identificacion;
                    this.datos.idOrganismoTransito = response.data.organismoTransito.id;
                    this.datos.idTramiteFactura = this.tramiteFactura.id;
                    this.datos.idSolicitante = this.solicitante.id;

                    let resumen = "<b>No. factura</b>" + this.tramiteFactura.factura.numero;

                    this.readyTramite.emit({ 'foraneas': this.datos, 'resumen': resumen });

                    /*this._LicenciaConduccionService.register(this.datos, token).subscribe(
                        response => {
                            if (response.status == 'success') {
                                this.readyTramite.emit({ 'foraneas': this.datos, 'resumen': resumen });
                            } else {
                                swal({
                                    type: 'warning',
                                    title: 'Alerta!',
                                    text: "No se registro el trámite."
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
                    );*/
                } else {
                    swal({
                        type: 'warning',
                        title: 'Alerta!',
                        text: "Usted no tiene permisos para este trámite."
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
}